import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Submission } from '@/types/property';
import type {
  ReportRequestFulfilmentStatus,
  ReportRequestLeadQuality,
  ReportRequestStatus,
} from '@/lib/reportRequests';

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

function getTextField(input: unknown, key: string): string | null {
  if (!input || typeof input !== 'object') return null;

  const value = (input as Record<string, unknown>)[key];

  if (typeof value !== 'string' || value.trim() === '') return null;

  return value.trim();
}

function getOptionalTextField(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== 'string') return undefined;

  const trimmed = value.trim();

  return trimmed === '' ? null : trimmed;
}

const allowedStatuses: ReportRequestStatus[] = [
  'requested',
  'reviewed',
  'contacted',
  'awaiting_info',
  'converted',
  'closed',
  'quoted',
  'lost',
];

const allowedFulfilmentStatuses: ReportRequestFulfilmentStatus[] = [
  'not_started',
  'awaiting_info',
  'in_review',
  'ready',
  'sent',
  'closed',
];

const allowedLeadQuality: Array<ReportRequestLeadQuality> = [
  'unqualified',
  'low',
  'warm',
  'high',
  'priority',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const submission = body.submission as Submission;
    const requestedReportType =
      typeof body.requestedReportType === 'string'
        ? body.requestedReportType
        : 'standard_viability_file';

    if (!submission || !submission.mode || !submission.result || !submission.verdict) {
      return NextResponse.json(
        { error: 'Invalid report request payload.' },
        { status: 400 }
      );
    }

    const email = getTextField(submission.input, 'email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required to request a report.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const row = {
      submission_id: submission.id,
      mode: submission.mode,
      address: getTextField(submission.input, 'address'),
      postcode: getTextField(submission.input, 'postcode'),
      email,
      score: submission.score,
      verdict_label: submission.verdict.label,
      requested_report_type: requestedReportType,
      input_json: submission.input,
      result_json: submission.result,
      status: 'requested',
      fulfilment_status: 'not_started',
      lead_quality: null,
      internal_notes: null,
      payment_status: 'not_required',
      amount_due_pence: null,
      amount_paid_pence: null,
      currency: 'GBP',
      stripe_checkout_session_id: null,
      stripe_payment_intent_id: null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('report_requests').insert(row);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const adminPin = process.env.ADMIN_PIN;
    const providedPin = request.headers.get('x-admin-pin');

    if (!adminPin || providedPin !== adminPin) {
      return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('report_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const reportRequests = (data ?? []).map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      submissionId: row.submission_id,
      mode: row.mode,
      address: row.address,
      postcode: row.postcode,
      email: row.email,
      score: row.score,
      verdictLabel: row.verdict_label,
      requestedReportType: row.requested_report_type,
      status: row.status,
      fulfilmentStatus: row.fulfilment_status,
      leadQuality: row.lead_quality,
      internalNotes: row.internal_notes,
      paymentStatus: row.payment_status,
      amountDuePence: row.amount_due_pence,
      amountPaidPence: row.amount_paid_pence,
      currency: row.currency,
      stripeCheckoutSessionId: row.stripe_checkout_session_id,
      stripePaymentIntentId: row.stripe_payment_intent_id,
      updatedAt: row.updated_at,
      contactedAt: row.contacted_at,
      input: row.input_json,
      result: row.result_json,
    }));

    return NextResponse.json({ reportRequests });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest) {
  try {
    const adminPin = process.env.ADMIN_PIN;
    const providedPin = request.headers.get('x-admin-pin');

    if (!adminPin || providedPin !== adminPin) {
      return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
    }

    const body = await request.json();

    const id = typeof body.id === 'string' ? body.id : '';
    const rawStatus = body.status;
    if (rawStatus !== undefined && (typeof rawStatus !== 'string' || !allowedStatuses.includes(rawStatus as ReportRequestStatus))) {
      return NextResponse.json(
        { error: 'Invalid report request update.' },
        { status: 400 }
      );
    }
    const status = typeof rawStatus === 'string' ? (rawStatus as ReportRequestStatus) : undefined;

    const rawFulfilmentStatus = body.fulfilment_status;
    if (
      rawFulfilmentStatus !== undefined &&
      (typeof rawFulfilmentStatus !== 'string' ||
        !allowedFulfilmentStatuses.includes(rawFulfilmentStatus as ReportRequestFulfilmentStatus))
    ) {
      return NextResponse.json(
        { error: 'Invalid report request update.' },
        { status: 400 }
      );
    }
    const fulfilmentStatus =
      typeof rawFulfilmentStatus === 'string'
        ? (rawFulfilmentStatus as ReportRequestFulfilmentStatus)
        : undefined;

    const leadQualityRaw = body.lead_quality;
    if (
      leadQualityRaw !== undefined &&
      leadQualityRaw !== null &&
      (typeof leadQualityRaw !== 'string' || !allowedLeadQuality.includes(leadQualityRaw as ReportRequestLeadQuality))
    ) {
      return NextResponse.json(
        { error: 'Invalid report request update.' },
        { status: 400 }
      );
    }
    const leadQuality =
      leadQualityRaw === null
        ? null
        : typeof leadQualityRaw === 'string'
          ? (leadQualityRaw as ReportRequestLeadQuality)
          : undefined;

    const internalNotes = getOptionalTextField(body.internal_notes);

    if (!id || (status === undefined && fulfilmentStatus === undefined && leadQuality === undefined && internalNotes === undefined)) {
      return NextResponse.json(
        { error: 'Invalid report request update.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (status !== undefined) updates.status = status;
    if (fulfilmentStatus !== undefined) updates.fulfilment_status = fulfilmentStatus;
    if (leadQuality !== undefined) updates.lead_quality = leadQuality;
    if (internalNotes !== undefined) updates.internal_notes = internalNotes;

    if (status === 'contacted') {
      const { data: existingRow, error: existingError } = await supabase
        .from('report_requests')
        .select('contacted_at')
        .eq('id', id)
        .maybeSingle();

      if (existingError) {
        return NextResponse.json({ error: existingError.message }, { status: 500 });
      }

      if (existingRow && !existingRow.contacted_at) {
        updates.contacted_at = new Date().toISOString();
      }
    }

    const { error } = await supabase
      .from('report_requests')
      .update(updates)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
