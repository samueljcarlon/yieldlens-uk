'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getRemoteToolEvents, type ToolEvent } from '@/lib/toolEvents';

type DateRange = 'today' | '7d' | '30d' | 'all';

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
  const start = new Date(now);

  if (range === 'today') {
    start.setHours(0, 0, 0, 0);
    return start;
  }

  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  return start;
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
    'destination',
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

function funnelStageValue(allTime: number, rangeCount: number): string {
  if (allTime === 0) return 'Not tracked yet';
  if (rangeCount === 0) return '0';
  return String(rangeCount);
}

function stageStatus(allTime: number, rangeCount: number): string {
  if (allTime === 0) return 'Not tracked yet';
  if (rangeCount === 0) return 'No events in range';
  return 'Tracked';
}

function safeModeLabel(mode: string): string {
  if (mode === 'commercial') return 'Commercial';
  if (mode === 'residential') return 'Residential';
  if (mode === 'admin') return 'Admin';
  return 'Unknown';
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

  const rangeStart = useMemo(() => toDateRange(dateRange), [dateRange]);

  const rangeEvents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      if (rangeStart && new Date(event.createdAt) < rangeStart) return false;
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
  }, [events, rangeStart, searchTerm]);

  const stageCards = useMemo(
    () =>
      stageDefinitions.map((stage) => {
        const allTime = getStageCount(events, stage.key);
        const inRange = getStageCount(rangeEvents, stage.key);

        return {
          ...stage,
          allTime,
          inRange,
          status: stageStatus(allTime, inRange),
        };
      }),
    [events, rangeEvents]
  );

  const pageRows = useMemo(() => {
    return inboundPages.map((page) => {
      const pageEvents = rangeEvents.filter((event) => getPageKey(event) === page.path);
      const allTimePageEvents = events.filter((event) => getPageKey(event) === page.path);
      const rangeAttributedSubmissions = pageEvents.filter((event) => event.eventName === 'commercial_check_submitted').length;
      const allTimeAttributedSubmissions = allTimePageEvents.filter((event) => event.eventName === 'commercial_check_submitted').length;
      const rangeAttributedRequests = pageEvents.filter((event) => event.eventName === 'results_viability_file_requested_clicked').length;
      const allTimeAttributedRequests = allTimePageEvents.filter((event) => event.eventName === 'results_viability_file_requested_clicked').length;
      const hasAnyRangeSubmissions = rangeEvents.some((event) => event.eventName === 'commercial_check_submitted');
      const hasAnyRangeRequests = rangeEvents.some((event) => event.eventName === 'results_viability_file_requested_clicked');

      const views = pageEvents.filter((event) => event.eventName === 'inbound_page_view').length;
      const viewsAllTime = allTimePageEvents.filter((event) => event.eventName === 'inbound_page_view').length;
      const ctaClicks = pageEvents.filter((event) => ctaEventNames.has(event.eventName)).length;
      const ctaClicksAllTime = allTimePageEvents.filter((event) => ctaEventNames.has(event.eventName)).length;

      return {
        ...page,
        views: funnelStageValue(viewsAllTime, views),
        ctaClicks: funnelStageValue(ctaClicksAllTime, ctaClicks),
        submissions:
          rangeAttributedSubmissions > 0
            ? String(rangeAttributedSubmissions)
            : hasAnyRangeSubmissions
              ? 'Not tracked yet'
              : funnelStageValue(allTimeAttributedSubmissions, rangeAttributedSubmissions),
        requests:
          rangeAttributedRequests > 0
            ? String(rangeAttributedRequests)
            : hasAnyRangeRequests
              ? 'Not tracked yet'
              : funnelStageValue(allTimeAttributedRequests, rangeAttributedRequests),
      };
    });
  }, [events, rangeEvents]);

  const attributionRows = useMemo(() => {
    const groupEvents = (sourceEvents: ToolEvent[], keys: string[]) => {
      const groups = new Map<string, number>();

      for (const event of sourceEvents) {
        const path = getPathMeta(event, keys);
        const nextCount = groups.get(path) ?? 0;
        groups.set(path, nextCount + 1);
      }

      return [...groups.entries()]
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    };

    const inboundLandingRows = groupEvents(
      rangeEvents.filter((event) => event.eventName === 'inbound_page_view'),
      ['first_page_path', 'page_path']
    );

    const firstTouchPriority = [
      'first_page_path',
      'source_page',
      'last_page_path',
      'current_page_path',
      'page_path',
    ];

    const submissionSourceRows = groupEvents(
      rangeEvents.filter((event) => event.eventName === 'commercial_check_submitted'),
      firstTouchPriority
    );

    const checkoutSourceRows = groupEvents(
      rangeEvents.filter((event) => event.eventName === 'checkout_started'),
      firstTouchPriority
    );

    return {
      inboundLandingRows,
      submissionSourceRows,
      checkoutSourceRows,
    };
  }, [rangeEvents]);

  const latestEvents = useMemo(() => rangeEvents.slice(0, 20), [rangeEvents]);

  const missingStages = useMemo(() => {
    return stageCards
      .filter((stage) => stage.allTime === 0)
      .map((stage) => stage.label);
  }, [stageCards]);

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
  }, [stageCards]);

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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stageCards.map((stage) => (
          <div key={stage.key} className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-stone-400">{stage.label}</p>
            <p className="text-3xl font-bold text-stone-950 mt-1">{stage.inRange}</p>
            <p className="text-xs text-stone-500 mt-2 leading-5">
              {stage.helper} {stage.allTime === 0 ? 'Not tracked yet.' : `All time: ${stage.allTime}.`}
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 mt-3">
              {stage.status}
            </p>
          </div>
        ))}
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
            {(['today', '7d', '30d', 'all'] as DateRange[]).map((range) => (
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
                {range === 'today' ? 'Today' : range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'All time'}
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
          Attribution
        </p>

        <p className="text-xs text-stone-500 leading-6 mb-4 max-w-4xl">
          Attribution rows use first_page_path where available, so newer conversion events can be tied back to the first public landing page.
          Older events may fall back to current or source page metadata.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold mb-3">
              Top landing pages
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
                  {attributionRows.inboundLandingRows.length === 0 ? (
                    <tr>
                      <td className="px-4 py-3 text-sm text-stone-500" colSpan={2}>
                        No inbound page views in the current range.
                      </td>
                    </tr>
                  ) : (
                    attributionRows.inboundLandingRows.map((row) => (
                      <tr key={row.path} className="border-b border-stone-100 align-top">
                        <td className="px-4 py-3">
                          <div className="font-medium text-stone-950">{row.path}</div>
                        </td>
                        <td className="px-4 py-3 text-stone-700">{row.count}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold mb-3">
                First-touch pages for commercial submissions
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
                    {attributionRows.submissionSourceRows.length === 0 ? (
                      <tr>
                        <td className="px-4 py-3 text-sm text-stone-500" colSpan={2}>
                          No commercial submissions in the current range.
                        </td>
                      </tr>
                    ) : (
                      attributionRows.submissionSourceRows.map((row) => (
                        <tr key={row.path} className="border-b border-stone-100 align-top">
                          <td className="px-4 py-3">
                            <div className="font-medium text-stone-950">{row.path}</div>
                          </td>
                          <td className="px-4 py-3 text-stone-700">{row.count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold mb-3">
                First-touch pages for checkout started
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
                    {attributionRows.checkoutSourceRows.length === 0 ? (
                      <tr>
                        <td className="px-4 py-3 text-sm text-stone-500" colSpan={2}>
                          No checkout starts in the current range.
                        </td>
                      </tr>
                    ) : (
                      attributionRows.checkoutSourceRows.map((row) => (
                        <tr key={row.path} className="border-b border-stone-100 align-top">
                          <td className="px-4 py-3">
                            <div className="font-medium text-stone-950">{row.path}</div>
                          </td>
                          <td className="px-4 py-3 text-stone-700">{row.count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
          Latest relevant events
        </p>

        {latestEvents.length === 0 ? (
          <p className="text-sm text-stone-500">
            Load events, run the commercial funnel, or adjust your filters.
          </p>
        ) : (
          <div className="space-y-3">
            {latestEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold mb-1">
                      {formatDate(event.createdAt)}
                    </p>
                    <h3 className="text-sm font-semibold text-stone-950">
                      {event.eventName}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Page: {event.pagePath ?? 'Unknown'} · Mode: {safeModeLabel(getSafeMode(event))}
                    </p>
                  </div>

                  <div className="max-w-xl text-xs text-stone-600 leading-6">
                    {summarizeSafeMetadata(event) || 'No safe metadata captured.'}
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
