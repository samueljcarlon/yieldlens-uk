import { sanitizeToolEventMetadata } from '@/lib/safeToolEventMetadata';
import { buildFunnelAttributionMetadata } from '@/lib/funnelAttribution';

export interface ToolEventPayload {
  event_name: string;
  page_path?: string;
  tool_name?: string;
  result_label?: string;
  result_band?: string;
  metadata?: Record<string, unknown>;
}

export async function logToolEvent(payload: ToolEventPayload): Promise<void> {
  try {
    const mergedMetadata = buildFunnelAttributionMetadata({
      pagePath: payload.page_path,
      metadata: payload.metadata,
    });

    await fetch('/api/tool-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        metadata: sanitizeToolEventMetadata(mergedMetadata),
      }),
      keepalive: true,
    });
  } catch {
    // Fail silently. The UI must never crash due to analytics.
  }
}
