'use client';

import { useEffect, useRef } from 'react';
import { captureFunnelTouch } from '@/lib/funnelAttribution';
import { logToolEvent } from '@/lib/logToolEvent';

interface FunnelEventTrackerProps {
  eventName: string;
  pagePath: string;
  pageType: string;
  mode?: 'commercial' | 'residential' | 'mixed';
  sourcePage?: string;
  eventLabel?: string;
  eventBand?: string;
}

export default function FunnelEventTracker({
  eventName,
  pagePath,
  pageType,
  mode = 'commercial',
  sourcePage,
  eventLabel,
  eventBand = 'page_view',
}: FunnelEventTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    captureFunnelTouch({
      pagePath,
      pageType,
      mode,
    });

    void logToolEvent({
      event_name: eventName,
      page_path: pagePath,
      tool_name: 'commercial_funnel',
      result_label: eventLabel ?? pagePath,
      result_band: eventBand,
      metadata: {
        page_path: pagePath,
        page_type: pageType,
        funnel_area: 'commercial',
        mode,
        source_page: sourcePage ?? pagePath,
        current_page_path: pagePath,
        current_page_type: pageType,
        current_mode: mode,
      },
    });
  }, [eventBand, eventLabel, eventName, mode, pagePath, pageType, sourcePage]);

  return null;
}
