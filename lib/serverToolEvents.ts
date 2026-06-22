import { createClient } from '@supabase/supabase-js';
import { sanitizeToolEventMetadata } from '@/lib/safeToolEventMetadata';

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

export interface ServerToolEventPayload {
  eventName: string;
  pagePath?: string | null;
  toolName?: string | null;
  resultLabel?: string | null;
  resultBand?: string | null;
  metadata?: Record<string, unknown> | null;
  userAgent?: string | null;
  referrer?: string | null;
}

export async function insertServerToolEvent(payload: ServerToolEventPayload): Promise<void> {
  const supabase = getSupabaseAdmin();
  const metadata = sanitizeToolEventMetadata(payload.metadata);

  const { error } = await supabase.from('tool_events').insert({
    event_name: payload.eventName,
    page_path: payload.pagePath ?? null,
    tool_name: payload.toolName ?? null,
    result_label: payload.resultLabel ?? null,
    result_band: payload.resultBand ?? null,
    metadata,
    user_agent: payload.userAgent ?? null,
    referrer: payload.referrer ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
