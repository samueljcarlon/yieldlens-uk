'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getRemoteToolEvents, type ToolEvent } from '@/lib/toolEvents';

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function csvEscape(value: unknown): string {
  if (value === undefined || value === null) return '';

  const text = typeof value === 'object' ? JSON.stringify(value) : String(value);

  return `"${text.replace(/"/g, '""')}"`;
}

function exportEventsToCsv(events: ToolEvent[]) {
  const headers = [
    'createdAt',
    'eventName',
    'toolName',
    'pagePath',
    'resultLabel',
    'resultBand',
    'metadata',
    'referrer',
  ];

  const rows = events.map((event) => [
    event.createdAt,
    event.eventName,
    event.toolName ?? '',
    event.pagePath ?? '',
    event.resultLabel ?? '',
    event.resultBand ?? '',
    event.metadata ?? '',
    event.referrer ?? '',
  ]);

  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => row.map(csvEscape).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `yieldlens-tool-events-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function countBy(events: ToolEvent[], key: keyof ToolEvent): Array<[string, number]> {
  const counts = new Map<string, number>();

  for (const event of events) {
    const rawValue = event[key];
    const value = typeof rawValue === 'string' && rawValue.trim()
      ? rawValue
      : 'unknown';

    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

function getEventLabel(eventName: string): string {
  return eventName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const commercialCtaEventNames = [
  'commercial_home_cta_clicked',
  'commercial_viability_page_cta_clicked',
  'rent_burden_page_cta_clicked',
  'break_even_page_cta_clicked',
  'lease_survival_page_cta_clicked',
  'viability_file_page_cta_clicked',
];

function isCommercialCtaEvent(event: ToolEvent): boolean {
  return event.toolName === 'commercial_funnel';
}

function isCommercialSeoEvent(event: ToolEvent): boolean {
  return [
    'commercial_viability_page_cta_clicked',
    'rent_burden_page_cta_clicked',
    'break_even_page_cta_clicked',
    'lease_survival_page_cta_clicked',
  ].includes(event.eventName);
}

function isCommercialHomepageEvent(event: ToolEvent): boolean {
  return event.eventName === 'commercial_home_cta_clicked';
}

function isViabilityFilePageEvent(event: ToolEvent): boolean {
  return event.eventName === 'viability_file_page_cta_clicked';
}

export default function ToolEventsAdminPage() {
  const [adminPin, setAdminPin] = useState('');
  const [events, setEvents] = useState<ToolEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ToolEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [toolFilter, setToolFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const eventNames = useMemo(() => {
    return Array.from(new Set(events.map((event) => event.eventName))).sort();
  }, [events]);

  const toolNames = useMemo(() => {
    return Array.from(
      new Set(events.map((event) => event.toolName).filter(Boolean))
    ).sort() as string[];
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      const matchesEvent =
        eventFilter === 'all' || event.eventName === eventFilter;

      const matchesTool =
        toolFilter === 'all' || event.toolName === toolFilter;

      const searchable = [
        event.eventName,
        event.toolName ?? '',
        event.pagePath ?? '',
        event.resultLabel ?? '',
        event.resultBand ?? '',
        event.referrer ?? '',
        JSON.stringify(event.metadata ?? {}),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);

      return matchesEvent && matchesTool && matchesSearch;
    });
  }, [events, searchTerm, eventFilter, toolFilter]);

  const eventCounts = useMemo(() => countBy(events, 'eventName'), [events]);
  const toolCounts = useMemo(() => countBy(events, 'toolName'), [events]);

  const commercialSummary = useMemo(() => {
    const commercialCtaClicks = events.filter(isCommercialCtaEvent).length;
    const homepageCommercialClicks = events.filter(isCommercialHomepageEvent).length;
    const seoToolClicks = events.filter(isCommercialSeoEvent).length;
    const viabilityFilePageClicks = events.filter(isViabilityFilePageEvent).length;

    return {
      commercialCtaClicks,
      homepageCommercialClicks,
      seoToolClicks,
      viabilityFilePageClicks,
    };
  }, [events]);

  const handleLoad = async () => {
    setError('');
    setLoading(true);
    setSelectedEvent(null);

    try {
      const remoteEvents = await getRemoteToolEvents(adminPin);
      setEvents(remoteEvents);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load tool events.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const filterButtonClass = (active: boolean) =>
    `px-4 py-2 rounded text-sm border ${
      active
        ? 'bg-teal-700 text-white border-teal-700'
        : 'bg-white text-stone-700 border-stone-300 hover:border-teal-500'
    }`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
          Internal admin
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          Tool events
        </h1>

        <p className="text-sm text-stone-500 max-w-2xl">
          View product usage events from the public calculators. These events use
          broad result bands, not raw standalone calculator inputs.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link href="/admin" className="text-teal-700 font-medium hover:underline">
            Lead dashboard →
          </Link>

          <Link href="/admin/reports" className="text-teal-700 font-medium hover:underline">
            Report requests →
          </Link>

          <Link href="/" className="text-stone-500 hover:text-stone-700">
            Homepage
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Total events</p>
          <p className="text-2xl font-bold text-stone-900">{events.length}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Visible</p>
          <p className="text-2xl font-bold text-stone-900">{filteredEvents.length}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Event types</p>
          <p className="text-2xl font-bold text-stone-900">{eventNames.length}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Tools</p>
          <p className="text-2xl font-bold text-stone-900">{toolNames.length}</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-900 mb-4">
          Commercial funnel summary
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-stone-400">Commercial funnel events</p>
            <p className="text-2xl font-bold text-stone-900 mt-1">{commercialSummary.commercialCtaClicks}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-stone-400">Homepage commercial clicks</p>
            <p className="text-2xl font-bold text-stone-900 mt-1">{commercialSummary.homepageCommercialClicks}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-stone-400">SEO tool clicks</p>
            <p className="text-2xl font-bold text-stone-900 mt-1">{commercialSummary.seoToolClicks}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-stone-400">Viability file clicks</p>
            <p className="text-2xl font-bold text-stone-900 mt-1">{commercialSummary.viabilityFilePageClicks}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-900 mb-2">
          Load tool events
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
            className="border border-stone-300 rounded px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="button"
            onClick={handleLoad}
            disabled={loading || !adminPin}
            className="bg-teal-700 text-white px-5 py-2 rounded text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load events'}
          </button>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>

      {events.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
            <p className="font-semibold text-stone-900 mb-4">Events by type</p>

            <div className="space-y-3">
              {eventCounts.map(([name, count]) => (
                <div key={name} className="flex justify-between text-sm border-b border-stone-100 pb-2">
                  <span className="text-stone-600">{getEventLabel(name)}</span>
                  <span className="font-semibold text-stone-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
            <p className="font-semibold text-stone-900 mb-4">Events by tool</p>

            <div className="space-y-3">
              {toolCounts.map(([name, count]) => (
                <div key={name} className="flex justify-between text-sm border-b border-stone-100 pb-2">
                  <span className="text-stone-600">{getEventLabel(name)}</span>
                  <span className="font-semibold text-stone-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
          <div className="lg:col-span-2">
            <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
              Search
            </label>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search event, tool, page, result, or metadata"
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
              Event
            </label>

            <select
              value={eventFilter}
              onChange={(event) => setEventFilter(event.target.value)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All events</option>
              {eventNames.map((name) => (
                <option key={name} value={name}>
                  {getEventLabel(name)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
              Tool
            </label>

            <select
              value={toolFilter}
              onChange={(event) => setToolFilter(event.target.value)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All tools</option>
              {toolNames.map((name) => (
                <option key={name} value={name}>
                  {getEventLabel(name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setEventFilter('all')}
            className={filterButtonClass(eventFilter === 'all' && toolFilter === 'all')}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('all');
              setToolFilter('commercial_funnel');
            }}
            className={filterButtonClass(toolFilter === 'commercial_funnel')}
          >
            All commercial CTA clicks
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('commercial_home_cta_clicked');
              setToolFilter('all');
            }}
            className={filterButtonClass(eventFilter === 'commercial_home_cta_clicked')}
          >
            Homepage commercial CTA
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('commercial_viability_page_cta_clicked');
              setToolFilter('all');
            }}
            className={filterButtonClass(eventFilter === 'commercial_viability_page_cta_clicked')}
          >
            Commercial viability page CTA
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('rent_burden_page_cta_clicked');
              setToolFilter('all');
            }}
            className={filterButtonClass(eventFilter === 'rent_burden_page_cta_clicked')}
          >
            Rent burden page CTA
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('break_even_page_cta_clicked');
              setToolFilter('all');
            }}
            className={filterButtonClass(eventFilter === 'break_even_page_cta_clicked')}
          >
            Break-even page CTA
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('lease_survival_page_cta_clicked');
              setToolFilter('all');
            }}
            className={filterButtonClass(eventFilter === 'lease_survival_page_cta_clicked')}
          >
            Lease survival page CTA
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('viability_file_page_cta_clicked');
              setToolFilter('all');
            }}
            className={filterButtonClass(eventFilter === 'viability_file_page_cta_clicked')}
          >
            Viability file page CTA
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('rent_affordability_calculated');
              setToolFilter('all');
            }}
            className={filterButtonClass(eventFilter === 'rent_affordability_calculated')}
          >
            Rent affordability
          </button>

          <button
            type="button"
            onClick={() => {
              setEventFilter('property_cash_flow_calculated');
              setToolFilter('all');
            }}
            className={filterButtonClass(eventFilter === 'property_cash_flow_calculated')}
          >
            Property cash flow
          </button>

          <button
            type="button"
            onClick={() => exportEventsToCsv(filteredEvents)}
            disabled={filteredEvents.length === 0}
            className="bg-stone-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-stone-800 disabled:opacity-50"
          >
            Export visible CSV
          </button>
        </div>

        <p className="text-xs text-stone-400 mt-4">
          Showing {filteredEvents.length} of {events.length} events.
        </p>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            No tool events found
          </h2>

          <p className="text-sm text-stone-500 mb-5">
            Load events, run one of the public calculators, or adjust your filters.
          </p>

          <Link
            href="/rent-affordability-check"
            className="inline-block bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            Open rent affordability calculator
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">
                    {event.toolName ? getEventLabel(event.toolName) : 'Unknown tool'}
                  </p>

                  <h2 className="text-lg font-semibold text-stone-900">
                    {getEventLabel(event.eventName)}
                  </h2>

                  <p className="text-sm text-stone-500 mt-1">
                    {event.pagePath ?? 'No page path'} · {formatDate(event.createdAt)}
                  </p>

                  <p className="text-sm text-stone-500 mt-1">
                    Result: {event.resultLabel ?? 'No result'} · Band: {event.resultBand ?? 'No band'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  className="text-sm text-teal-700 font-medium hover:underline"
                >
                  View metadata
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
                Event detail
              </p>

              <h2 className="text-xl font-bold text-stone-900">
                {getEventLabel(selectedEvent.eventName)}
              </h2>

              <p className="text-sm text-stone-500 mt-1">
                {formatDate(selectedEvent.createdAt)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="text-sm text-stone-500 hover:text-stone-700"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Tool</p>
              <p className="font-semibold text-stone-900">
                {selectedEvent.toolName ?? 'Unknown'}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Result</p>
              <p className="font-semibold text-stone-900">
                {selectedEvent.resultLabel ?? 'Unknown'}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Band</p>
              <p className="font-semibold text-stone-900">
                {selectedEvent.resultBand ?? 'Unknown'}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Page</p>
              <p className="font-semibold text-stone-900 break-words">
                {selectedEvent.pagePath ?? 'Unknown'}
              </p>
            </div>
          </div>

          <p className="font-semibold text-stone-900 mb-2">Metadata</p>

          <pre className="bg-stone-950 text-stone-100 rounded-lg p-4 text-xs overflow-auto max-h-80">
            {JSON.stringify(selectedEvent.metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
