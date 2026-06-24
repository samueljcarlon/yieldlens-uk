export type FunnelReferrerType = 'direct' | 'internal' | 'external' | 'search' | 'social' | 'unknown';

export interface FunnelAttributionSnapshot {
  first_page_path?: string;
  first_page_type?: string;
  first_mode?: string;
  first_seen_at?: string;
  last_page_path?: string;
  last_page_type?: string;
  last_mode?: string;
  last_seen_at?: string;
  referrer_type?: FunnelReferrerType;
  referrer_host?: string;
}

interface CaptureFunnelTouchInput {
  pagePath: string;
  pageType: string;
  mode?: string;
  referrer?: string | null;
}

interface BuildFunnelMetadataInput {
  metadata?: Record<string, unknown>;
  pagePath?: string;
  pageType?: string;
  mode?: string;
  currentPagePath?: string;
  currentPageType?: string;
  currentMode?: string;
}

const STORAGE_KEY = 'yieldlens:funnel-attribution';
const SEARCH_HOSTS = [
  'google.',
  'bing.',
  'duckduckgo.',
  'yahoo.',
  'ecosia.',
  'baidu.',
  'yandex.',
  'naver.',
  'brave.com',
];
const SOCIAL_HOSTS = [
  'facebook.com',
  'instagram.com',
  'linkedin.com',
  'x.com',
  'twitter.com',
  'tiktok.com',
  'youtube.com',
  'reddit.com',
  'threads.net',
];

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function safeString(value: unknown): string {
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

export function normalizeFunnelPath(value: string | null | undefined): string {
  const raw = safeString(value);
  if (!raw) return '';

  try {
    const url = new URL(raw, 'https://yieldlens.co.uk');
    return url.pathname || '/';
  } catch {
    const path = raw.split(/[?#]/)[0] ?? '';
    return path || '';
  }
}

function getReferrerHost(referrer: string | null | undefined): string {
  const raw = safeString(referrer);
  if (!raw) return '';

  try {
    return new URL(raw).host.toLowerCase();
  } catch {
    return '';
  }
}

function classifyReferrer(
  referrer: string | null | undefined,
  currentHost?: string
): FunnelReferrerType {
  const raw = safeString(referrer);
  if (!raw) return 'direct';

  const host = getReferrerHost(raw);
  if (!host) return 'unknown';

  const current = safeString(currentHost).toLowerCase();
  if (current && host === current) return 'internal';
  if (SEARCH_HOSTS.some((needle) => host.includes(needle))) return 'search';
  if (SOCIAL_HOSTS.some((needle) => host.includes(needle))) return 'social';

  return 'external';
}

function readSnapshot(): FunnelAttributionSnapshot {
  if (!isClient()) return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as Record<string, unknown>;

    return {
      first_page_path: normalizeFunnelPath(parsed.first_page_path as string | undefined),
      first_page_type: safeString(parsed.first_page_type),
      first_mode: safeString(parsed.first_mode),
      first_seen_at: safeString(parsed.first_seen_at),
      last_page_path: normalizeFunnelPath(parsed.last_page_path as string | undefined),
      last_page_type: safeString(parsed.last_page_type),
      last_mode: safeString(parsed.last_mode),
      last_seen_at: safeString(parsed.last_seen_at),
      referrer_type: (safeString(parsed.referrer_type) as FunnelReferrerType) || undefined,
      referrer_host: safeString(parsed.referrer_host).toLowerCase(),
    };
  } catch {
    return {};
  }
}

function writeSnapshot(snapshot: FunnelAttributionSnapshot): void {
  if (!isClient()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore storage errors.
  }
}

export function captureFunnelTouch({
  pagePath,
  pageType,
  mode,
  referrer,
}: CaptureFunnelTouchInput): FunnelAttributionSnapshot {
  if (!isClient()) {
    return {};
  }

  const now = new Date().toISOString();
  const existing = readSnapshot();
  const normalizedPagePath = normalizeFunnelPath(pagePath) || window.location.pathname || '/';
  const currentHost = window.location.host.toLowerCase();
  const referrerValue = typeof referrer === 'string' ? referrer : document.referrer;
  const referrerHost = getReferrerHost(referrerValue);
  const previousPagePath = normalizeFunnelPath(existing.last_page_path);
  const inferredReferrerType = classifyReferrer(referrerValue, currentHost);
  const referrerType =
    inferredReferrerType === 'direct' && previousPagePath && previousPagePath !== normalizedPagePath
      ? 'internal'
      : inferredReferrerType;

  const snapshot: FunnelAttributionSnapshot = {
    first_page_path: existing.first_page_path || normalizedPagePath,
    first_page_type: existing.first_page_type || safeString(pageType),
    first_mode: existing.first_mode || safeString(mode),
    first_seen_at: existing.first_seen_at || now,
    last_page_path: normalizedPagePath,
    last_page_type: safeString(pageType),
    last_mode: safeString(mode) || existing.last_mode,
    last_seen_at: now,
    referrer_type: referrerType,
    referrer_host:
      referrerHost ||
      (referrerType === 'internal' ? currentHost : '') ||
      existing.referrer_host,
  };

  writeSnapshot(snapshot);
  return snapshot;
}

export function getFunnelAttributionSnapshot(): FunnelAttributionSnapshot {
  return readSnapshot();
}

function getCurrentPageType(input: BuildFunnelMetadataInput): string {
  return (
    safeString(input.currentPageType) ||
    safeString(input.metadata?.page_type) ||
    safeString(input.pageType)
  );
}

function getCurrentMode(input: BuildFunnelMetadataInput): string {
  return (
    safeString(input.currentMode) ||
    safeString(input.metadata?.mode) ||
    safeString(input.mode)
  );
}

function getSourcePageFromMetadata(input: BuildFunnelMetadataInput, fallbackPath: string): string {
  const sourcePage = normalizeFunnelPath(input.metadata?.source_page as string | undefined);
  return sourcePage || fallbackPath;
}

export function buildFunnelAttributionMetadata(
  input: BuildFunnelMetadataInput
): Record<string, unknown> {
  const snapshot = getFunnelAttributionSnapshot();
  const currentPagePath = normalizeFunnelPath(input.currentPagePath ?? input.pagePath);
  const currentPageType = getCurrentPageType(input);
  const currentMode = getCurrentMode(input);
  const timestamp = new Date().toISOString();
  const sourcePage = getSourcePageFromMetadata(input, currentPagePath);

  return {
    ...(input.metadata ?? {}),
    page_path: currentPagePath || normalizeFunnelPath(input.pagePath),
    page_type: currentPageType || undefined,
    mode: currentMode || undefined,
    source_page: sourcePage || undefined,
    current_page_path: currentPagePath || undefined,
    current_page_type: currentPageType || undefined,
    current_mode: currentMode || undefined,
    current_seen_at: timestamp,
    first_page_path: snapshot.first_page_path || undefined,
    first_page_type: snapshot.first_page_type || undefined,
    first_mode: snapshot.first_mode || undefined,
    first_seen_at: snapshot.first_seen_at || undefined,
    last_page_path: snapshot.last_page_path || undefined,
    last_page_type: snapshot.last_page_type || undefined,
    last_mode: snapshot.last_mode || undefined,
    last_seen_at: snapshot.last_seen_at || undefined,
    referrer_type: snapshot.referrer_type || undefined,
    referrer_host: snapshot.referrer_host || undefined,
  };
}

export function getFunnelSnapshotForCheckout(): FunnelAttributionSnapshot {
  return getFunnelAttributionSnapshot();
}
