import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      event_name,
      page_path,
      tool_name,
      result_label,
      result_band,
      metadata,
    } = body;

    if (!event_name || typeof event_name !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'event_name is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const user_agent = req.headers.get('user-agent') ?? null;
    const referrer = req.headers.get('referer') ?? null;

    const { error } = await supabase.from('tool_events').insert({
      event_name,
      page_path: page_path ?? null,
      tool_name: tool_name ?? null,
      result_label: result_label ?? null,
      result_band: result_band ?? null,
      metadata: metadata ?? null,
      user_agent,
      referrer,
    });

    if (error) {
      console.error('[tool-events] Insert error:', error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[tool-events] Unexpected POST error:', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
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
      .from('tool_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error('[tool-events] Select error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const events = (data ?? []).map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      eventName: row.event_name,
      pagePath: row.page_path,
      toolName: row.tool_name,
      resultLabel: row.result_label,
      resultBand: row.result_band,
      metadata: row.metadata,
      userAgent: row.user_agent,
      referrer: row.referrer,
    }));

    return NextResponse.json({ events });
  } catch (error) {
    console.error('[tool-events] Unexpected GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
