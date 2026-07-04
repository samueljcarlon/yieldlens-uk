'use client';

import { useEffect, useRef } from 'react';
import {
  trackGoogleAdsConversion,
  type GoogleAdsConversionEventName,
} from '@/lib/googleAds';

interface GoogleAdsConversionTrackerProps {
  eventName: GoogleAdsConversionEventName;
  value?: number;
  dedupeKey?: string;
  enabled?: boolean;
}

export default function GoogleAdsConversionTracker({
  eventName,
  value,
  dedupeKey,
  enabled = true,
}: GoogleAdsConversionTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!enabled || hasTracked.current) return;
    hasTracked.current = true;
    trackGoogleAdsConversion(eventName, value, dedupeKey);
  }, [dedupeKey, enabled, eventName, value]);

  return null;
}
