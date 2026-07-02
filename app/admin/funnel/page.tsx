'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getRemoteToolEvents, type ToolEvent } from '@/lib/toolEvents';

type DateRange = '24h' | '7d' | '30d' | 'all';

type FunnelStageKey =
  | 'inbound_page_view'
  | 'commercial_check_started'
  | 'commercial_check_submitted'
  | 'results_viability_file_requested_clicked'
  | 'checkout_started'
  | 'payment_completed'
  | 'paid_file_opened';

type StageSnapshot = {
  key: FunnelStageKey;
  label: string;
  helper: string;
  count: number;
  rate: string;
};

type RangeSnapshot = {
  key: Exclude<DateRange, 'all'>;
  label: string;
  pageViews: number;
  commercialCtaClicks: number;
  checkStarts: number;
  submissions: number;
  paidCtaClicks: number;
  checkoutStarts: number;
  paymentsCompleted: number;
  paidFilesOpened: number;
  stageCards: StageSnapshot[];
};

const inboundPages = [
  { path: '/how-it-works', label: 'How it works' },
  { path: '/how-much-rent-can-a-cafe-afford', label: 'Cafe rent guide' },
  { path: '/commercial-lease-checklist-before-signing', label: 'Lease checklist' },
  { path: '/restaurant-lease-viability-check', label: 'Restaurant viability' },
  { path: '/salon-lease-viability-check', label: 'Salon viability' },
  { path: '/commercial-lease-viability-check', label: 'Commercial viability' },
  { path: '/sample-commercial-viability-file', label: 'Sample file' },
  { path: '/viability-file', label: 'Viability file' },
  { path: '/', label: 'Homepage' },
];

const stageDefinitions = [
  {
    key: 'inbound_page_view',
    label: 'Inbound page views',
    helper: 'Tracked on the public commercial pages.',
  },
  {
    key: 'commercial_check_started',
    label: 'Commercial check started',
    helper: 'Tracked when the commercial form opens.',
  },
  {
    key: 'commercial_check_submitted',
    label: 'Commercial check submitted',
    helper: 'Tracked when a commercial result is saved.',
  },
  {
    key: 'results_viability_file_requested_clicked',
    label: 'Paid file requested',
    helper: 'Tracked from the results page request button.',
  },
  {
    key: 'checkout_started',
    label: 'Checkout started',
    helper: 'Tracked when Stripe Checkout is created.',
  },
  {
    key: 'payment_completed',
    label: 'Payment completed',
    helper: 'Tracked from the Stripe webhook.',
  },
  {
    key: 'paid_file_opened',
    label: 'Customer file opened',
    helper: 'Tracked when the unlocked paid file loads.',
  },
];

const relevantEventNames = new Set([
  'inbound_page_view',
  'commercial_check_started',
  'commercial_check_submitted',
  'results_viability_file_requested_clicked',
  'checkout_started',
  'payment_completed',
  'paid_file_opened',
  'commercial_home_cta_clicked',
  'commercial_viability_page_cta_clicked',
  'commercial_lead_cta_clicked',
  'commercial_funnel_cta_clicked',
  'rent_burden_page_cta_clicked',
  'break_even_page_cta_clicked',
  'lease_survival_page_cta_clicked',
  'viability_file_page_cta_clicked',
  'conversion_cta_clicked',
]);

const ctaEventNames = new Set([
  'commercial_home_cta_clicked',
  'commercial_viability_page_cta_clicked',
  'commercial_lead_cta_clicked',
  'commercial_funnel_cta_clicked',
  'rent_burden_page_cta_clicked',
  'break_even_page_cta_clicked',
  'lease_survival_page_cta_clicked',
  'viability_file_page_cta_clicked',
  'conversion_cta_clicked',
]);

const rangeOptions: Exclude<DateRange, 'all'>[] = ['24h', '7d', '30d'];

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function toDateRange(range: DateRange): Date | null {
  if (range === 'all') return null;

  const now = new Date();

  if (range === '24h') {
    return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  if (range === '7d') {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
}

function getMetadataObject(event: ToolEvent): Record<string, unknown> {
  if (!event.metadata || typeof event.metadata !== 'object' || Array.isArray(event.metadata)) {
    return {};
  }

  return event.metadata as Record<string, unknown>;
}

function getStringMeta(event: ToolEvent, key: string): string {
  const value = getMetadataObject(event)[key];
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function getPathMeta(event: ToolEvent, keys: string[]): string {
  for (const key of keys) {
    const value = getStringMeta(event, key);
    if (value) return value;
  }

  return event.pagePath ?? 'unknown';
}

function getFirstTouchPath(event: ToolEvent): string {
  return getPathMeta(event, ['first_page_path', 'source_page', 'current_page_path', 'page_path']);
}

function getCurrentTouchPath(event: ToolEvent): string {
  return getPathMeta(event, ['current_page_path', 'page_path', 'source_page', 'first_page_path']);
}

function getSafeMode(event: ToolEvent): string {
  const mode = getStringMeta(event, 'mode');
  if (mode) return mode;

  if (event.pagePath?.startsWith('/admin')) return 'admin';
  if (event.pagePath?.startsWith('/commercial-') || event.toolName === 'commercial_funnel') return 'commercial';

  return 'unknown';
}

function getStageCount(events: ToolEvent[], eventName: string): number {
  return events.filter((event) => event.eventName === eventName).length;
}

function getPageKey(event: ToolEvent): string {
  const currentPage = getStringMeta(event, 'current_page_path');
  const lastPage = getStringMeta(event, 'last_page_path');
  const sourcePage = getStringMeta(event, 'source_page');
  return currentPage || lastPage || sourcePage || event.pagePath || 'unknown';
}

function isRelevantEvent(event: ToolEvent): boolean {
  if (event.pagePath?.startsWith('/admin')) return false;
  return relevantEventNames.has(event.eventName);
}

function summarizeSafeMetadata(event: ToolEvent): string {
  const metadata = getMetadataObject(event);
  const allowedKeys = [
    'page_path',
    'page_type',
    'funnel_area',
    'mode',
    'source_page',
    'source_path',
    'landing_page',
    'current_page_path',
    'current_page_type',
    'current_mode',
    'first_page_path',
    'first_page_type',
    'first_mode',
    'last_page_path',
    'last_page_type',
    'last_mode',
    'referrer_type',
    'referrer_host',
    'cta_label',
    'cta_location',
    'destination',
    'destination_path',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'result_band',
  ];

  return allowedKeys
    .map((key) => {
      const value = metadata[key];
      return typeof value === 'string' && value.trim() ? `${key}: ${value.trim()}` : '';
    })
    .filter(Boolean)
    .join(' · ');
}

function formatCount(value: number): string {
  return value.toLocaleString('en-GB');
}

function formatRate(numerator: number, denominator: number): string {
  if (denominator === 0) return 'No data yet';

  const rate = (numerator / denominator) * 100;
  if (!Number.isFinite(rate)) return 'No data yet';

  return `${rate.toFixed(rate >= 10 ? 0 : 1)}%`;
}

function safeModeLabel(mode: string): string {
  if (mode === 'commercial') return 'Commercial';
  if (mode === 'residential') return 'Residential';
  if (mode === 'admin') return 'Admin';
  return 'Unknown';
}

function buildStageSnapshots(events: ToolEvent[]): StageSnapshot[] {
  return stageDefinitions.map((stage) => ({
    key: stage.key as FunnelStageKey,
    label: stage.label,
    helper: stage.helper,
    count: getStageCount(events, stage.key),
    rate: 'No data yet',
  }));
}

function decorateStageRates(stages: StageSnapshot[]): StageSnapshot[] {
  return stages.map((stage, index) => {
    if (index === 0) {
      return { ...stage, rate: '100%' };
    }

    const previousCount = stages[index - 1]?.count ?? 0;
    return { ...stage, rate: formatRate(stage.count, previousCount) };
  });
}

function buildRangeSnapshot(events: ToolEvent[], range: Exclude<DateRange, 'all'>): RangeSnapshot {
  const cutoff = toDateRange(range);
  const filtered = events.filter((event) => {
    if (!isRelevantEvent(event)) return false;
    if (!cutoff) return true;
    return new Date(event.createdAt) >= cutoff;
  });

  const stageCards = decorateStageRates(buildStageSnapshots(filtered));

  return {
    key: range,
    label: range === '24h' ? 'Last 24 hours' : range === '7d' ? 'Last 7 days' : 'Last 30 days',
    pageViews: getStageCount(filtered, 'inbound_page_view'),
    commercialCtaClicks: filtered.filter((event) => ctaEventNames.has(event.eventName)).length,
    checkStarts: getStageCount(filtered, 'commercial_check_started'),
    submissions: getStageCount(filtered, 'commercial_check_submitted'),
    paidCtaClicks: getStageCount(filtered, 'results_viability_file_requested_clicked'),
    checkoutStarts: getStageCount(filtered, 'checkout_started'),
    paymentsCompleted: getStageCount(filtered, 'payment_completed'),
    paidFilesOpened: getStageCount(filtered, 'paid_file_opened'),
    stageCards,
  };
}

function countFirstTouchRows(sourceEvents: ToolEvent[], keys: string[]) {
  const counts = new Map<string, number>();

  for (const event of sourceEvents) {
    const path = getPathMeta(event, keys);
    counts.set(path, (counts.get(path) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function PathList({
  title,
  helper,
  rows,
}: {
  title: string;
  helper: string;
  rows: Array<{ path: string; count: number }>;
}) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
      <p className="font-semibold text-stone-950 mb-1">{title}</p>
      <p className="text-xs text-stone-500 mb-4">{helper}</p>
      <div className="space-y-3">
        {rows.length > 0 ? (
          rows.map((row) => (
            <div key={row.path} className="flex items-start justify-between gap-3 text-sm border-b border-stone-100 pb-2">
              <span className="text-stone-600 break-all">{row.path}</span>
              <span className="font-semibold text-stone-950 shrink-0">{row.count}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-stone-500">No data yet.</p>
        )}
      </div>
    </div>
  );
}

export default function AdminFunnelPage() {
  const [adminPin, setAdminPin] = useState('');
  const [events, setEvents] = useState<ToolEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoad = async () => {
    setLoading(true);
    setError('');

    try {
      const remoteEvents = await getRemoteToolEvents(adminPin);
      setEvents(remoteEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load funnel events.');
    } finally {
      setLoading(false);
    }
  };

  const selectedRangeStart = useMemo(() => toDateRange(dateRange), [dateRange]);

  const selectedRangeEvents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      if (selectedRangeStart && new Date(event.createdAt) < selectedRangeStart) return false;
      if (!isRelevantEvent(event)) return false;

      const searchable = [
        event.eventName,
        event.pagePath ?? '',
        getSafeMode(event),
        summarizeSafeMetadata(event),
      ]
        .join(' ')
        .toLowerCase();

      return !search || searchable.includes(search);
    });
  }, [events, selectedRangeStart, searchTerm]);

  const allTimeRelevantEvents = useMemo(() => events.filter(isRelevantEvent), [events]);

  const rangeSnapshots = useMemo(
    () => rangeOptions.map((range) => buildRangeSnapshot(events, range)),
    [events]
  );

  const stageCards = useMemo(
    () => buildStageSnapshots(allTimeRelevantEvents),
    [allTimeRelevantEvents]
  );

  const missingStages = useMemo(() => {
    return stageCards
      .filter((stage) => stage.count === 0)
      .map((stage) => stage.label);
  }, [stageCards]);

  const pageRows = useMemo(() => {
    return inboundPages.map((page) => {
      const pageEvents = selectedRangeEvents.filter((event) => getPageKey(event) === page.path);
      const rangeAttributedSubmissions = pageEvents.filter((event) => event.eventName === 'commercial_check_submitted').length;
      const rangeAttributedRequests = pageEvents.filter((event) => event.eventName === 'results_viability_file_requested_clicked').length;
      const views = pageEvents.filter((event) => event.eventName === 'inbound_page_view').length;
      const ctaClicks = pageEvents.filter((event) => ctaEventNames.has(event.eventName)).length;

      return {
        ...page,
        views: formatCount(views),
        ctaClicks: formatCount(ctaClicks),
        submissions: formatCount(rangeAttributedSubmissions),
        requests: formatCount(rangeAttributedRequests),
      };
    });
  }, [selectedRangeEvents]);

  const attributionRows = useMemo(() => {
    const inboundLandingRows = countFirstTouchRows(
      selectedRangeEvents.filter((event) => event.eventName === 'inbound_page_view'),
      ['first_page_path', 'page_path']
    );

    const firstTouchPriority = ['first_page_path', 'source_page', 'current_page_path', 'page_path'];

    const commercialStartLandingRows = countFirstTouchRows(
      selectedRangeEvents.filter((event) => event.eventName === 'commercial_check_started'),
      ['landing_page', ...firstTouchPriority]
    );

    const sampleClickLandingRows = countFirstTouchRows(
      selectedRangeEvents.filter((event) => event.eventName === 'results_viability_file_requested_clicked'),
      ['landing_page', ...firstTouchPriority]
    );

    const submissionSourceRows = countFirstTouchRows(
      selectedRangeEvents.filter((event) => event.eventName === 'commercial_check_submitted'),
      ['source_page', 'current_page_path', 'page_path', 'landing_page', 'first_page_path']
    );

    const checkoutSourceRows = countFirstTouchRows(
      selectedRangeEvents.filter((event) => event.eventName === 'checkout_started'),
      ['source_page', 'current_page_path', 'page_path', 'landing_page', 'first_page_path']
    );

    const paymentSourceRows = countFirstTouchRows(
      selectedRangeEvents.filter((event) => event.eventName === 'payment_completed'),
      ['source_page', 'current_page_path', 'page_path', 'landing_page', 'first_page_path']
    );

    return {
      inboundLandingRows,
      commercialStartLandingRows,
      sampleClickLandingRows,
      submissionSourceRows,
      checkoutSourceRows,
      paymentSourceRows,
    };
  }, [selectedRangeEvents]);

  const recentEvents = useMemo(() => selectedRangeEvents.slice(0, 20), [selectedRangeEvents]);

  const interpretationPoints = useMemo(() => {
    const points = [
      'Page views but no check starts usually point to a landing page or CTA issue.',
      'Check starts but no submissions usually point to form friction.',
      'Submissions but no paid CTA clicks usually point to a results-page value issue.',
      'Paid CTA clicks but no checkout starts usually point to a paid-flow clarity issue.',
      'Checkout starts but no payments usually point to price, trust, or Stripe hesitation.',
      'Payments but no paid file opens usually point to an access flow issue.',
    ];

    return points;
  }, []);

  const trackingGaps = useMemo(() => {
    const gaps = [
      'Older events may not have first_page_path, last_page_path, or referrer_host.',
      'inbound_page_view now stores first-touch and last-touch attribution, but legacy rows can still be incomplete.',
      'commercial_check_started and commercial_check_submitted now carry safe attribution metadata, but earlier rows may not.',
      'results_viability_file_requested_clicked now carries safe attribution metadata, but earlier rows may not.',
      'checkout_started and payment_completed now carry safe attribution metadata, but earlier Stripe-linked rows may not.',
      'paid_file_opened now carries safe attribution metadata, but earlier rows may not.',
    ];

    return gaps;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-teal-700 font-semibold mb-2">
          Internal admin
        </p>

        <h1 className="text-3xl font-bold text-stone-950 mb-3">
          Commercial funnel
        </h1>

        <p className="text-sm text-stone-600 max-w-3xl leading-7">
          See whether inbound commercial visitors are moving from the public pages into the free check,
          the paid request, checkout, payment, and unlocked file view. Counts are based on tracked events only.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link href="/admin" className="text-teal-700 font-medium hover:underline">
            Lead dashboard →
          </Link>
          <Link href="/admin/funnel" className="text-teal-700 font-medium hover:underline">
            Commercial funnel →
          </Link>
          <Link href="/admin/events" className="text-teal-700 font-medium hover:underline">
            All tool events →
          </Link>
          <Link href="/admin/reports" className="text-teal-700 font-medium hover:underline">
            Report requests →
          </Link>
          <Link href="/" className="text-stone-500 hover:text-stone-700">
            Homepage
          </Link>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-950 mb-4">
          Load funnel data
        </p>

        <p className="text-sm text-stone-500 mb-4">
          Enter the admin PIN to load recent tool events from Supabase.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="password"
            value={adminPin}
            onChange={(event) => setAdminPin(event.target.value)}
            placeholder="Admin PIN"
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />

          <button
            type="button"
            onClick={handleLoad}
            disabled={loading || !adminPin}
            className="bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load funnel'}
          </button>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>

      <div className="mb-8">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.24em] text-teal-700 font-semibold mb-2">
            Funnel snapshots
          </p>

          <h2 className="text-xl font-bold text-stone-950">
            Stage counts and conversion rates across the three most useful windows
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {rangeSnapshots.map((snapshot) => (
            <div key={snapshot.key} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
                {snapshot.label}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-stone-400">Page views</p>
                  <p className="text-xl font-bold text-stone-950 mt-1">{formatCount(snapshot.pageViews)}</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-stone-400">CTA clicks</p>
                  <p className="text-xl font-bold text-stone-950 mt-1">{formatCount(snapshot.commercialCtaClicks)}</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-stone-400">Commercial starts</p>
                  <p className="text-xl font-bold text-stone-950 mt-1">{formatCount(snapshot.checkStarts)}</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-stone-400">Submissions</p>
                  <p className="text-xl font-bold text-stone-950 mt-1">{formatCount(snapshot.submissions)}</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-stone-400">Paid-file CTA</p>
                  <p className="text-xl font-bold text-stone-950 mt-1">{formatCount(snapshot.paidCtaClicks)}</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-stone-400">Checkout starts</p>
                  <p className="text-xl font-bold text-stone-950 mt-1">{formatCount(snapshot.checkoutStarts)}</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-stone-400">Payments</p>
                  <p className="text-xl font-bold text-stone-950 mt-1">{formatCount(snapshot.paymentsCompleted)}</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-stone-400">File opens</p>
                  <p className="text-xl font-bold text-stone-950 mt-1">{formatCount(snapshot.paidFilesOpened)}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-stone-700">
                <p>Views → starts: {formatRate(snapshot.checkStarts, snapshot.pageViews)}</p>
                <p>Starts → submissions: {formatRate(snapshot.submissions, snapshot.checkStarts)}</p>
                <p>Submissions → paid CTA: {formatRate(snapshot.paidCtaClicks, snapshot.submissions)}</p>
                <p>Paid CTA → checkout: {formatRate(snapshot.checkoutStarts, snapshot.paidCtaClicks)}</p>
                <p>Checkout → payment: {formatRate(snapshot.paymentsCompleted, snapshot.checkoutStarts)}</p>
                <p>Payment → file open: {formatRate(snapshot.paidFilesOpened, snapshot.paymentsCompleted)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-950 mb-2">
          Organic landing pages
        </p>

        <p className="text-sm text-stone-600 mb-4">
          Where visitors land before starting the commercial flow, plus the pages that lead to sample and checkout clicks.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PathList
            title="Check starts by landing page"
            helper="Uses the earliest recorded landing page for each check-start event."
            rows={attributionRows.commercialStartLandingRows}
          />

          <PathList
            title="Sample-file clicks by landing page"
            helper="Shows which landing pages most often lead to the sample click."
            rows={attributionRows.sampleClickLandingRows}
          />

          <PathList
            title="Checkout starts by source page"
            helper="Shows the page used when checkout is created."
            rows={attributionRows.checkoutSourceRows}
          />
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-950 mb-3">
          How to read the funnel
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {interpretationPoints.map((item, index) => (
            <div
              key={item}
              className={`rounded-xl border p-4 text-sm leading-6 ${
                index % 3 === 0
                  ? 'border-teal-200 bg-teal-50 text-teal-900'
                  : index % 3 === 1
                    ? 'border-stone-200 bg-stone-50 text-stone-700'
                    : 'border-amber-200 bg-amber-50 text-amber-900'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mb-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-teal-700 font-semibold mb-2">
              Date range
            </p>

            <h2 className="text-xl font-bold text-stone-950">
              Filter the funnel by time window
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['24h', '7d', '30d', 'all'] as DateRange[]).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setDateRange(range)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  dateRange === range
                    ? 'bg-stone-950 text-white border-stone-950'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-teal-500'
                }`}
              >
                {range === '24h' ? 'Last 24 hours' : range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'All time'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
            Search
          </label>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search event name, page, mode, or safe metadata"
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-950 mb-4">
          Inbound page breakdown
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-left">
                <th className="px-4 py-3 font-semibold text-stone-700">Page</th>
                <th className="px-4 py-3 font-semibold text-stone-700">Views</th>
                <th className="px-4 py-3 font-semibold text-stone-700">CTA clicks</th>
                <th className="px-4 py-3 font-semibold text-stone-700">Check submissions</th>
                <th className="px-4 py-3 font-semibold text-stone-700">Paid file requests</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.path} className="border-b border-stone-100 align-top">
                  <td className="px-4 py-3">
                    <div className="font-medium text-stone-950">{row.label}</div>
                    <div className="text-xs text-stone-500 mt-1">{row.path}</div>
                  </td>
                  <td className="px-4 py-3 text-stone-700">{row.views}</td>
                  <td className="px-4 py-3 text-stone-700">{row.ctaClicks}</td>
                  <td className="px-4 py-3 text-stone-700">{row.submissions}</td>
                  <td className="px-4 py-3 text-stone-700">{row.requests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-stone-500 mt-4 leading-6">
          Page views and CTA clicks are tracked on the public pages. Landing and source-page attribution now uses safe first-touch and current-page metadata where available. Older events without attribution still show as partial or not tracked yet.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-950 mb-4">
          First-touch source pages
        </p>

        <p className="text-xs text-stone-500 leading-6 mb-4 max-w-4xl">
          Use first_page_path first, then source_page, then current_page_path, then page_path. Older events may not have every field, so the table falls back safely rather than exposing raw metadata.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {[
            {
              title: 'Commercial submissions',
              rows: attributionRows.submissionSourceRows,
              empty: 'No commercial submissions in the current range.',
            },
            {
              title: 'Checkout starts',
              rows: attributionRows.checkoutSourceRows,
              empty: 'No checkout starts in the current range.',
            },
            {
              title: 'Payment completed',
              rows: attributionRows.paymentSourceRows,
              empty: 'No payments completed in the current range.',
            },
          ].map((section) => (
            <div key={section.title}>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold mb-3">
                {section.title}
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50 text-left">
                      <th className="px-4 py-3 font-semibold text-stone-700">Page</th>
                      <th className="px-4 py-3 font-semibold text-stone-700">In range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.length === 0 ? (
                      <tr>
                        <td className="px-4 py-3 text-sm text-stone-500" colSpan={2}>
                          {section.empty}
                        </td>
                      </tr>
                    ) : (
                      section.rows.map((row) => (
                        <tr key={row.path} className="border-b border-stone-100 align-top">
                          <td className="px-4 py-3">
                            <div className="font-medium text-stone-950">{row.path}</div>
                          </td>
                          <td className="px-4 py-3 text-stone-700">{formatCount(row.count)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
          <p className="font-semibold text-stone-950 mb-4">Tracking gaps</p>
          <ul className="space-y-2 text-sm text-stone-700">
            {trackingGaps.map((gap) => (
              <li key={gap} className="rounded-xl border border-stone-200 bg-stone-50 p-3 leading-6">
                {gap}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
          <p className="font-semibold text-stone-950 mb-4">Missing or weak events</p>
          {missingStages.length === 0 ? (
            <p className="text-sm text-teal-700 leading-6">
              The tracked funnel stages all have at least one event in history.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-stone-700">
              {missingStages.map((item) => (
                <li key={item} className="rounded-xl border border-amber-200 bg-amber-50 p-3 leading-6">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-950 mb-4">
          Recent relevant events
        </p>

        {recentEvents.length === 0 ? (
          <p className="text-sm text-stone-500">
            Load events, run the commercial funnel, or adjust your filters.
          </p>
        ) : (
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[180px_1fr_1fr]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold mb-1">
                      {formatDate(event.createdAt)}
                    </p>
                    <p className="text-sm font-semibold text-stone-950">
                      {event.eventName}
                    </p>
                  </div>

                  <div className="text-xs text-stone-600 leading-6">
                    <p><span className="font-semibold text-stone-700">Page path:</span> {event.pagePath ?? 'Unknown'}</p>
                    <p><span className="font-semibold text-stone-700">First touch:</span> {getFirstTouchPath(event)}</p>
                  </div>

                  <div className="text-xs text-stone-600 leading-6">
                    <p><span className="font-semibold text-stone-700">Current page:</span> {getCurrentTouchPath(event)}</p>
                    <p><span className="font-semibold text-stone-700">Mode:</span> {safeModeLabel(getSafeMode(event))}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
