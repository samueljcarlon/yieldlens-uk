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
        : 'standard_pdf';

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
