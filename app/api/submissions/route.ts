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
    const submission = (await request.json()) as Submission;

    if (!submission || !submission.mode || !submission.result || !submission.verdict) {
      return NextResponse.json(
        { error: 'Invalid submission payload.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const row = {
      mode: submission.mode,
      address: getTextField(submission.input, 'address'),
      postcode: getTextField(submission.input, 'postcode'),
      email: getTextField(submission.input, 'email'),
      score: submission.score,
      verdict_label: submission.verdict.label,
      verdict_json: submission.verdict,
      input_json: submission.input,
      result_json: submission.result,
    };

    const { error } = await supabase.from('submissions').insert(row);

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
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const submissions: Submission[] = (data ?? []).map((row) => ({
      id: row.id,
      mode: row.mode,
      createdAt: row.created_at,
      input: row.input_json,
      result: row.result_json,
      score: row.score,
      verdict: row.verdict_json,
    }));

    return NextResponse.json({ submissions });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
