'use client';

import { sanitizeToolEventMetadata } from '@/lib/safeToolEventMetadata';
import { buildFunnelAttributionMetadata } from '@/lib/funnelAttribution';
import { trackGoogleAdsConversion } from '@/lib/googleAds';

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

    switch (payload.event_name) {
      case 'commercial_check_started':
      case 'commercial_check_submitted':
      case 'results_viability_file_requested_clicked':
        trackGoogleAdsConversion(payload.event_name);
        break;
      default:
        break;
    }

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
