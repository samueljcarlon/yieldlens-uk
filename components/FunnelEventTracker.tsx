'use client';

import { useEffect, useRef } from 'react';
import { captureFunnelTouch } from '@/lib/funnelAttribution';
import { logToolEvent } from '@/lib/logToolEvent';
import { trackGoogleAdsConversion, type GoogleAdsConversionEventName } from '@/lib/googleAds';

interface FunnelEventTrackerProps {
  eventName: string;
  pagePath: string;
  pageType: string;
  mode?: 'commercial' | 'residential' | 'mixed';
  sourcePage?: string;
  eventLabel?: string;
  eventBand?: string;
  googleAdsConversion?: GoogleAdsConversionEventName;
  googleAdsValue?: number;
  googleAdsDedupeKey?: string;
}

export default function FunnelEventTracker({
  eventName,
  pagePath,
  pageType,
  mode = 'commercial',
  sourcePage,
  eventLabel,
  eventBand = 'page_view',
  googleAdsConversion,
  googleAdsValue,
  googleAdsDedupeKey,
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

    if (googleAdsConversion) {
      trackGoogleAdsConversion(googleAdsConversion, googleAdsValue, googleAdsDedupeKey);
    }

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
  }, [
    eventBand,
    eventLabel,
    eventName,
    googleAdsConversion,
    googleAdsDedupeKey,
    googleAdsValue,
    mode,
    pagePath,
    pageType,
    sourcePage,
  ]);

  return null;
}
