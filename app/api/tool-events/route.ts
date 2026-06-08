import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[tool-events] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return NextResponse.json({ ok: false, error: 'Server misconfiguration' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const {
      event_name,
      page_path,
      tool_name,
      result_label,
      result_band,
      metadata,
    } = body;

    if (!event_name || typeof event_name !== 'string') {
      return NextResponse.json({ ok: false, error: 'event_name is required' }, { status: 400 });
    }

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
    console.error('[tool-events] Unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
