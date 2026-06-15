import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Submission } from '@/types/property';

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
    const status = typeof body.status === 'string' ? body.status : '';

    const allowedStatuses = [
      'requested',
      'reviewed',
      'contacted',
      'awaiting_info',
      'converted',
      'closed',
      'quoted',
      'lost',
    ];

    if (!id || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid report request update.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from('report_requests')
      .update({ status })
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
