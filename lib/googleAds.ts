'use client';

export type GoogleAdsConversionEventName =
  | 'commercial_check_started'
  | 'commercial_check_submitted'
  | 'results_viability_file_requested_clicked'
  | 'checkout_started'
  | 'payment_completed'
  | 'paid_file_opened';

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? '';
const GOOGLE_ADS_LABELS: Record<GoogleAdsConversionEventName, string> = {
  commercial_check_started: process.env.NEXT_PUBLIC_GOOGLE_ADS_CHECK_STARTED_LABEL?.trim() ?? '',
  commercial_check_submitted:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CHECK_SUBMITTED_LABEL?.trim() ?? '',
  results_viability_file_requested_clicked:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_SAMPLE_CLICK_LABEL?.trim() ?? '',
  checkout_started: process.env.NEXT_PUBLIC_GOOGLE_ADS_CHECKOUT_STARTED_LABEL?.trim() ?? '',
  payment_completed: process.env.NEXT_PUBLIC_GOOGLE_ADS_PAYMENT_COMPLETED_LABEL?.trim() ?? '',
  paid_file_opened: process.env.NEXT_PUBLIC_GOOGLE_ADS_PAID_FILE_OPENED_LABEL?.trim() ?? '',
};

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function getSendTo(eventName: GoogleAdsConversionEventName): string {
  if (!GOOGLE_ADS_ID) return '';

  const label = GOOGLE_ADS_LABELS[eventName];
  if (!label) return '';

  if (label.startsWith('AW-') && label.includes('/')) {
    return label;
  }

  return `${GOOGLE_ADS_ID}/${label}`;
}

function getDedupeStorageKey(eventName: GoogleAdsConversionEventName, dedupeKey?: string): string {
  const safeKey = typeof dedupeKey === 'string' ? dedupeKey.trim() : '';
  if (!safeKey) return '';

  return `yieldlens:google-ads:${eventName}:${safeKey}`;
}

function hasTracked(storageKey: string): boolean {
  if (!isBrowser()) return false;

  try {
    return window.localStorage.getItem(storageKey) === '1';
  } catch {
    return false;
  }
}

function markTracked(storageKey: string): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(storageKey, '1');
  } catch {
    // Ignore storage failures. Ads tracking must never block the funnel.
  }
}

function ensureGtag(): ((...args: unknown[]) => void) | null {
  if (!isBrowser()) return null;

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }

  if (typeof window.gtag === 'function') {
    return window.gtag;
  }

  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  return window.gtag;
}

export function trackGoogleAdsConversion(
  eventName: GoogleAdsConversionEventName,
  optionalValue?: number,
  dedupeKey?: string
): void {
  if (!GOOGLE_ADS_ID || !GOOGLE_ADS_LABELS[eventName] || !isBrowser()) {
    return;
  }

  const storageKey = getDedupeStorageKey(eventName, dedupeKey);
  if (storageKey && hasTracked(storageKey)) {
    return;
  }

  const gtag = ensureGtag();
  if (!gtag) return;

  const payload: Record<string, unknown> = {
    send_to: getSendTo(eventName),
  };

  if (typeof optionalValue === 'number' && Number.isFinite(optionalValue)) {
    payload.value = optionalValue;
    payload.currency = 'GBP';
  }

  gtag('event', 'conversion', payload);

  if (storageKey) {
    markTracked(storageKey);
  }
}
