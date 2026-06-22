import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { insertServerToolEvent } from '@/lib/serverToolEvents';

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

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error('Missing site URL.');
  }

  return siteUrl.replace(/\/$/, '');
}

function buildRedirectUrl(baseUrl: string, path: string, reportRequestId: string) {
  const url = new URL(path, `${baseUrl}/`);
  url.searchParams.set('request_id', reportRequestId);
  return url.toString();
}

function addTokenToRedirectUrl(url: string, customerAccessToken: string) {
  const parsed = new URL(url);
  parsed.searchParams.set('token', customerAccessToken);
  return parsed.toString();
}

function getSourcePage(body: Record<string, unknown>): string {
  const sourcePage = body.sourcePage;

  return typeof sourcePage === 'string' && sourcePage.trim() !== ''
    ? sourcePage.trim()
    : '/thank-you';
}

const allowedRequestedReportTypes = new Set(['standard_pdf', 'standard_viability_file']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const reportRequestId =
      typeof body.reportRequestId === 'string' ? body.reportRequestId.trim() : '';
    const sourcePage = getSourcePage(body as Record<string, unknown>);

    if (!reportRequestId) {
      return NextResponse.json(
        { error: 'Report request id is required.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const stripe = getStripeClient();
    const siteUrl = getSiteUrl();

    const { data: reportRequest, error: fetchError } = await supabase
      .from('report_requests')
      .select(
        'id, mode, email, requested_report_type, payment_status, stripe_checkout_session_id, customer_access_token'
      )
      .eq('id', reportRequestId)
      .maybeSingle();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!reportRequest) {
      return NextResponse.json(
        { error: 'Report request not found.' },
        { status: 404 }
      );
    }

    if (reportRequest.mode !== 'commercial') {
      return NextResponse.json(
        { error: 'Stripe checkout is only available for commercial requests.' },
        { status: 400 }
      );
    }

    if (!allowedRequestedReportTypes.has(reportRequest.requested_report_type)) {
      return NextResponse.json(
        { error: 'Requested report type is not supported.' },
        { status: 400 }
      );
    }

    if (reportRequest.payment_status === 'paid') {
      return NextResponse.json(
        { error: 'This report request is already marked as paid.' },
        { status: 409 }
      );
    }

    const amountDuePence = 4900;
    const currency = 'GBP';
    const productName = 'Standard commercial viability file';
    let customerAccessToken = reportRequest.customer_access_token as string | null;

    if (!customerAccessToken) {
      customerAccessToken = randomBytes(32).toString('hex');

      const { error: tokenUpdateError } = await supabase
        .from('report_requests')
        .update({
          customer_access_token: customerAccessToken,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reportRequest.id);

      if (tokenUpdateError) {
        return NextResponse.json({ error: tokenUpdateError.message }, { status: 500 });
      }
    }

    const successUrl = addTokenToRedirectUrl(
      buildRedirectUrl(siteUrl, '/payment/success', reportRequestId),
      customerAccessToken
    );
    const cancelUrl = addTokenToRedirectUrl(
      buildRedirectUrl(siteUrl, '/payment/cancel', reportRequestId),
      customerAccessToken
    );

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: reportRequest.email || undefined,
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: reportRequest.id,
      metadata: {
        report_request_id: reportRequest.id,
        mode: reportRequest.mode,
        requested_report_type: reportRequest.requested_report_type,
      },
      payment_intent_data: {
        metadata: {
          report_request_id: reportRequest.id,
          mode: reportRequest.mode,
          requested_report_type: reportRequest.requested_report_type,
        },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'gbp',
            unit_amount: amountDuePence,
            product_data: {
              name: productName,
            },
          },
        },
      ],
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe checkout session did not return a URL.' },
        { status: 500 }
      );
    }

    const { error: updateError } = await supabase
      .from('report_requests')
      .update({
        payment_status: 'checkout_started',
        amount_due_pence: amountDuePence,
        amount_paid_pence: null,
        currency,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reportRequestId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    await insertServerToolEvent({
      eventName: 'checkout_started',
      pagePath: sourcePage,
      toolName: 'commercial_funnel',
      resultLabel: 'Secure checkout started',
      resultBand: 'checkout_started',
      metadata: {
        page_path: sourcePage,
        page_type: sourcePage.startsWith('/admin') ? 'admin' : 'checkout',
        funnel_area: 'commercial',
        mode: reportRequest.mode,
        source_page: sourcePage,
      },
      userAgent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer'),
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
      paymentStatus: 'checkout_started',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
