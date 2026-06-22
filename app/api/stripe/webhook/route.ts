import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import type { ReportRequestFulfilmentStatus } from '@/lib/reportRequests';
import { insertServerToolEvent } from '@/lib/serverToolEvents';

export const runtime = 'nodejs';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getStripeClient() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error('Missing Stripe secret key.');
  }

  return new Stripe(stripeSecretKey);
}

function getWebhookSecret() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('Missing Stripe webhook secret.');
  }

  return webhookSecret;
}

function getStripeObjectId(value: string | Stripe.PaymentIntent | null | undefined): string | null {
  if (!value) return null;

  return typeof value === 'string' ? value : value.id;
}

function getReportRequestIdFromMetadata(
  metadata: Stripe.Metadata | null | undefined
): string | null {
  if (!metadata) return null;

  const reportRequestId = metadata.report_request_id;

  return typeof reportRequestId === 'string' && reportRequestId.trim() !== ''
    ? reportRequestId.trim()
    : null;
}

async function updatePaidRequest({
  reportRequestId,
  sessionId,
  paymentIntentId,
  amountTotal,
  currency,
  fulfilmentStatus,
}: {
  reportRequestId: string;
  sessionId: string;
  paymentIntentId: string | null;
  amountTotal: number | null | undefined;
  currency: string | null | undefined;
  fulfilmentStatus: ReportRequestFulfilmentStatus | null;
}) {
  const supabase = getSupabaseAdmin();

  const updates: Record<string, unknown> = {
    payment_status: 'paid',
    updated_at: new Date().toISOString(),
    stripe_checkout_session_id: sessionId,
    stripe_payment_intent_id: paymentIntentId,
  };

  if (typeof amountTotal === 'number') {
    updates.amount_paid_pence = amountTotal;
  }

  if (typeof currency === 'string' && currency.trim() !== '') {
    updates.currency = currency.toUpperCase();
  } else {
    updates.currency = 'GBP';
  }

  if (fulfilmentStatus === 'not_started' || fulfilmentStatus === 'awaiting_info') {
    updates.fulfilment_status = 'in_review';
  }

  const { error } = await supabase
    .from('report_requests')
    .update(updates)
    .eq('id', reportRequestId);

  if (error) {
    throw new Error(error.message);
  }
}

async function logPaymentCompletedEvent() {
  await insertServerToolEvent({
    eventName: 'payment_completed',
    pagePath: '/payment/success',
    toolName: 'commercial_funnel',
    resultLabel: 'Payment completed',
    resultBand: 'payment_completed',
    metadata: {
      page_path: '/payment/success',
      page_type: 'payment',
      funnel_area: 'commercial',
      mode: 'commercial',
      source_page: '/payment/success',
      report_request_stage: 'paid',
    },
  });
}

async function markPaymentFailed({
  reportRequestId,
  sessionId,
  paymentIntentId,
}: {
  reportRequestId: string;
  sessionId?: string | null;
  paymentIntentId?: string | null;
}) {
  const supabase = getSupabaseAdmin();

  const updates: Record<string, unknown> = {
    payment_status: 'failed',
    updated_at: new Date().toISOString(),
  };

  if (sessionId) {
    updates.stripe_checkout_session_id = sessionId;
  }

  if (paymentIntentId) {
    updates.stripe_payment_intent_id = paymentIntentId;
  }

  const { error } = await supabase
    .from('report_requests')
    .update(updates)
    .eq('id', reportRequestId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = getWebhookSecret();
    const stripe = getStripeClient();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 });
    }

    const rawBody = await request.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid Stripe webhook payload.';
      return NextResponse.json({ error: message }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const reportRequestId = getReportRequestIdFromMetadata(session.metadata);

      if (!reportRequestId) {
        console.warn('Stripe webhook received checkout.session.completed without report_request_id.');
        return NextResponse.json({ ok: true });
      }

      const fulfilmentStatus = await getCurrentFulfilmentStatus(reportRequestId);

      try {
        await updatePaidRequest({
          reportRequestId,
          sessionId: session.id,
          paymentIntentId: getStripeObjectId(session.payment_intent),
          amountTotal: session.amount_total,
          currency: session.currency,
          fulfilmentStatus,
        });
        await logPaymentCompletedEvent();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update report request.';
        return NextResponse.json({ error: message }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const reportRequestId = getReportRequestIdFromMetadata(session.metadata);

      if (!reportRequestId) {
        console.warn('Stripe webhook received checkout.session.expired without report_request_id.');
        return NextResponse.json({ ok: true });
      }

      try {
        await markPaymentFailed({
          reportRequestId,
          sessionId: session.id,
          paymentIntentId: getStripeObjectId(session.payment_intent),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update report request.';
        return NextResponse.json({ error: message }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const reportRequestId = getReportRequestIdFromMetadata(paymentIntent.metadata);

      if (!reportRequestId) {
        console.warn('Stripe webhook received payment_intent.payment_failed without report_request_id.');
        return NextResponse.json({ ok: true });
      }

      try {
        await markPaymentFailed({
          reportRequestId,
          paymentIntentId: paymentIntent.id,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update report request.';
        return NextResponse.json({ error: message }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown webhook error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function getCurrentFulfilmentStatus(
  reportRequestId: string
): Promise<ReportRequestFulfilmentStatus | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('report_requests')
    .select('fulfilment_status')
    .eq('id', reportRequestId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.fulfilment_status ?? null;
}
