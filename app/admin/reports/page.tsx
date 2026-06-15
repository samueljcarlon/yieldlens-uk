'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  getRemoteReportRequests,
  updateReportRequest,
  updateReportRequestStatus,
  type ReportRequest,
  type ReportRequestFulfilmentStatus,
  type ReportRequestLeadQuality,
  type ReportRequestStatus,
} from '@/lib/reportRequests';

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

function exportReportRequestsToCsv(requests: ReportRequest[]) {
  const headers = [
    'createdAt',
    'email',
    'mode',
    'address',
    'postcode',
    'score',
    'verdict',
    'reportType',
    'status',
  ];

  const rows = requests.map((request) => [
    request.createdAt,
    request.email,
    request.mode,
    request.address ?? '',
    request.postcode ?? '',
    request.score,
    request.verdictLabel,
    request.requestedReportType,
    request.status,
  ]);

  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => row.map(csvEscape).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `yieldlens-report-requests-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getLocation(request: ReportRequest): string {
  return request.postcode || request.address || 'No location provided';
}

const reportStatuses: ReportRequestStatus[] = [
  'requested',
  'reviewed',
  'contacted',
  'awaiting_info',
  'converted',
  'closed',
  'quoted',
  'lost',
];

const visibleStatuses: Array<'requested' | 'reviewed' | 'contacted' | 'awaiting_info' | 'converted' | 'closed'> = [
  'requested',
  'reviewed',
  'contacted',
  'awaiting_info',
  'converted',
  'closed',
];

const fulfilmentStatuses: ReportRequestFulfilmentStatus[] = [
  'not_started',
  'awaiting_info',
  'in_review',
  'ready',
  'sent',
  'closed',
];

const leadQualityOptions: Array<ReportRequestLeadQuality | null> = [
  null,
  'unqualified',
  'low',
  'warm',
  'high',
  'priority',
];

function getCommercialVerdictLabel(verdictLabel: string): string {
  const normalized = verdictLabel.trim().toLowerCase();

  if (normalized === 'strong candidate') return 'Stronger case';
  if (normalized === 'worth investigating') return 'Worth investigating';
  if (normalized === 'marginal') return 'Needs caution';
  if (normalized === 'weak') return 'Fragile';
  if (normalized === 'avoid') return 'Weaker case';

  return verdictLabel;
}

function getStatusLabel(status: string): string {
  const normalized = status.trim().toLowerCase();

  if (normalized === 'awaiting_info') return 'Awaiting info';

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function getFulfilmentStatusLabel(status: string): string {
  const normalized = status.trim().toLowerCase();

  if (normalized === 'not_started') return 'Not started';
  if (normalized === 'awaiting_info') return 'Awaiting info';
  if (normalized === 'in_review') return 'In review';
  if (normalized === 'closed') return 'Closed';

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function getLeadQualityLabel(value: ReportRequestLeadQuality | null | undefined): string {
  if (!value) return 'Not set';

  const labels: Record<ReportRequestLeadQuality, string> = {
    unqualified: 'Unqualified',
    low: 'Low',
    warm: 'Warm',
    high: 'High',
    priority: 'Priority',
  };

  return labels[value];
}

function formatFieldValue(value: unknown): string {
  if (value === undefined || value === null || value === '') return 'Not provided';

  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-GB', {
      maximumFractionDigits: 2,
    }).format(value);
  }

  return String(value);
}

function getUpdatedDate(request: ReportRequest): string {
  const raw = (request as ReportRequest & { updatedAt?: string; updated_at?: string }).updatedAt
    ?? (request as ReportRequest & { updatedAt?: string; updated_at?: string }).updated_at;

  return raw ? formatDate(raw) : 'Not available';
}

function getCommercialInputRows(input: unknown): Array<{ label: string; value: string }> {
  if (!input || typeof input !== 'object') return [];

  const record = input as Record<string, unknown>;

  return [
    { label: 'Business type', value: formatFieldValue(record.businessType) },
    { label: 'Annual rent', value: formatFieldValue(record.annualRent) },
    { label: 'Average spend', value: formatFieldValue(record.averageSpendPerCustomer) },
    { label: 'Expected customers/day', value: formatFieldValue(record.expectedCustomersPerDay) },
    { label: 'Opening days/month', value: formatFieldValue(record.openingDaysPerMonth) },
    { label: 'Monthly staff costs', value: formatFieldValue(record.monthlyStaffCosts) },
    { label: 'Utilities and other costs', value: formatFieldValue(record.monthlyUtilitiesAndOtherCosts) },
    { label: 'Business rates', value: formatFieldValue(record.monthlyBusinessRates) },
    { label: 'Fit-out budget', value: formatFieldValue(record.fitOutBudget) },
    { label: 'Rent deposit', value: formatFieldValue(record.rentDeposit) },
    { label: 'Starting cash', value: formatFieldValue(record.startingCash) },
    { label: 'Downside revenue %', value: formatFieldValue(record.downsideRevenuePercentage) },
  ];
}

function getCommercialResultRows(result: unknown): Array<{ label: string; value: string }> {
  if (!result || typeof result !== 'object') return [];

  const record = result as Record<string, unknown>;

  return [
    { label: 'Rent burden', value: formatFieldValue(record.rentBurdenPercentage) },
    { label: 'Break-even customers/day', value: formatFieldValue(record.breakEvenCustomersPerDay) },
    { label: 'Upfront cash needed', value: formatFieldValue(record.upfrontCashNeeded) },
    { label: 'Cash after opening', value: formatFieldValue(record.availableCashAfterOpening) },
    { label: 'Downside monthly position', value: formatFieldValue(record.downsideMonthlyPosition) },
    { label: 'Six-month test', value: formatFieldValue(record.survivesSixBadMonths ? 'Pass' : 'Fail') },
  ];
}

function formatOptionalDate(value?: string | null): string {
  return value ? formatDate(value) : 'Not available';
}

function getPriorityLabel(request: ReportRequest): {
  label: string;
  className: string;
} {
  if (request.score >= 80) {
    return {
      label: 'High priority',
      className: 'bg-green-50 text-green-800 border-green-200',
    };
  }

  if (request.score >= 65) {
    return {
      label: 'Warm lead',
      className: 'bg-teal-50 text-teal-800 border-teal-200',
    };
  }

  if (request.score >= 50) {
    return {
      label: 'Needs review',
      className: 'bg-orange-50 text-orange-800 border-orange-200',
    };
  }

  return {
    label: 'Low fit',
    className: 'bg-stone-50 text-stone-700 border-stone-200',
  };
}

export default function ReportRequestsAdminPage() {
  const [adminPin, setAdminPin] = useState('');
  const [requests, setRequests] = useState<ReportRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ReportRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | typeof visibleStatuses[number]>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [detailStatus, setDetailStatus] = useState<ReportRequestStatus>('requested');
  const [detailFulfilmentStatus, setDetailFulfilmentStatus] = useState<ReportRequestFulfilmentStatus>('not_started');
  const [detailLeadQuality, setDetailLeadQuality] = useState<ReportRequestLeadQuality | null>(null);
  const [detailInternalNotes, setDetailInternalNotes] = useState('');
  const [detailSaveError, setDetailSaveError] = useState('');
  const [detailSaving, setDetailSaving] = useState(false);

  useEffect(() => {
    if (!selectedRequest) return;

    setDetailStatus(selectedRequest.status);
    setDetailFulfilmentStatus(selectedRequest.fulfilmentStatus);
    setDetailLeadQuality(selectedRequest.leadQuality ?? null);
    setDetailInternalNotes(selectedRequest.internalNotes ?? '');
    setDetailSaveError('');
  }, [selectedRequest]);

  const filteredRequests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesMode = modeFilter === 'all' || request.mode === modeFilter;
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

      const searchable = [
        request.email,
        request.mode,
        request.address ?? '',
        request.postcode ?? '',
        request.verdictLabel,
        String(request.score),
        request.status,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);

      return matchesMode && matchesStatus && matchesSearch;
    });
  }, [requests, searchTerm, modeFilter, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: requests.length,
      residential: requests.filter((request) => request.mode === 'residential').length,
      commercial: requests.filter((request) => request.mode === 'commercial').length,
      warmOrBetter: requests.filter((request) => request.score >= 65).length,
    };
  }, [requests]);

  const handleStatusChange = async (requestId: string, nextStatus: ReportRequestStatus) => {
    setError('');

    try {
      await updateReportRequestStatus({
        id: requestId,
        status: nextStatus,
        adminPin,
      });

      const now = new Date().toISOString();

      setRequests((current) =>
        current.map((request) => {
          if (request.id !== requestId) return request;

          return {
            ...request,
            status: nextStatus,
            updatedAt: now,
            contactedAt:
              nextStatus === 'contacted' && !request.contactedAt
                ? now
                : request.contactedAt,
          };
        })
      );

      setSelectedRequest((current) =>
        current && current.id === requestId
          ? {
              ...current,
              status: nextStatus,
              updatedAt: now,
              contactedAt:
                nextStatus === 'contacted' && !current.contactedAt
                  ? now
                  : current.contactedAt,
            }
          : current
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update status.';
      setError(message);
    }
  };

  const updateLocalRequest = (requestId: string, patch: Partial<ReportRequest>) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? { ...request, ...patch }
          : request
      )
    );

    setSelectedRequest((current) =>
      current && current.id === requestId
        ? { ...current, ...patch }
        : current
    );
  };

  const handleSaveDetails = async () => {
    if (!selectedRequest) return;

    setDetailSaveError('');
    setDetailSaving(true);

    try {
      await updateReportRequest({
        id: selectedRequest.id,
        adminPin,
        status: detailStatus,
        fulfilmentStatus: detailFulfilmentStatus,
        leadQuality: detailLeadQuality,
        internalNotes: detailInternalNotes.trim() ? detailInternalNotes.trim() : null,
      });

      const contactedAt =
        detailStatus === 'contacted' && !selectedRequest.contactedAt
          ? new Date().toISOString()
          : selectedRequest.contactedAt;

      updateLocalRequest(selectedRequest.id, {
        status: detailStatus,
        fulfilmentStatus: detailFulfilmentStatus,
        leadQuality: detailLeadQuality,
        internalNotes: detailInternalNotes.trim() ? detailInternalNotes.trim() : null,
        updatedAt: new Date().toISOString(),
        contactedAt,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to save request details.';
      setDetailSaveError(message);
    } finally {
      setDetailSaving(false);
    }
  };

  const handleLoad = async () => {
    setError('');
    setLoading(true);
    setSelectedRequest(null);

    try {
      const remoteRequests = await getRemoteReportRequests(adminPin);
      setRequests(remoteRequests);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load report requests.';
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
          Report requests
        </h1>

        <p className="text-sm text-stone-500 max-w-2xl">
          These are users who ran a check and actively requested access to a fuller
          report. This is your strongest monetisation signal so far.
        </p>

        <div className="mt-4 flex gap-4 text-sm">
          <Link href="/admin" className="text-teal-700 font-medium hover:underline">
            Back to lead dashboard →
          </Link>

          <Link href="/" className="text-stone-500 hover:text-stone-700">
            Homepage
          </Link>
        </div>

        <div className="mt-2">
          <Link href="/admin/events" className="text-sm text-teal-700 font-medium hover:underline">
            View tool events →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Total</p>
          <p className="text-2xl font-bold text-stone-900">{stats.total}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Residential</p>
          <p className="text-2xl font-bold text-stone-900">{stats.residential}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Commercial</p>
          <p className="text-2xl font-bold text-stone-900">{stats.commercial}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Warm+</p>
          <p className="text-2xl font-bold text-stone-900">{stats.warmOrBetter}</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-900 mb-2">
          Load report requests
        </p>

        <p className="text-sm text-stone-500 mb-4">
          Enter the admin PIN to load report requests from Supabase.
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
            {loading ? 'Loading...' : 'Load requests'}
          </button>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          <div className="lg:col-span-2">
            <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
              Search
            </label>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search email, postcode, address, verdict, or score"
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
              Export
            </label>

            <button
              type="button"
              onClick={() => exportReportRequestsToCsv(filteredRequests)}
              disabled={filteredRequests.length === 0}
              className="w-full bg-stone-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-stone-800 disabled:opacity-50"
            >
              Export visible CSV
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setModeFilter('all')}
            className={filterButtonClass(modeFilter === 'all')}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setModeFilter('residential')}
            className={filterButtonClass(modeFilter === 'residential')}
          >
            Residential
          </button>

          <button
            type="button"
            onClick={() => setModeFilter('commercial')}
            className={filterButtonClass(modeFilter === 'commercial')}
          >
            Commercial
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={filterButtonClass(statusFilter === 'all')}
          >
            All statuses
          </button>

          {visibleStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={filterButtonClass(statusFilter === status)}
            >
              {getStatusLabel(status)}
            </button>
          ))}
        </div>

        <p className="text-xs text-stone-400 mt-4">
          Showing {filteredRequests.length} of {requests.length} requests.
        </p>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            No report requests found
          </h2>

          <p className="text-sm text-stone-500 mb-5">
            Load requests, run a check, request a report, or adjust your filters.
          </p>

          <Link
            href="/check"
            className="inline-block bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            Run a property check
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const priority = getPriorityLabel(request);

            return (
              <div
                key={request.id}
                className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">
                      {request.mode === 'residential'
                        ? 'Residential report request'
                        : 'Commercial report request'}
                    </p>

                    <h2 className="text-lg font-semibold text-stone-900">
                      {getLocation(request)}
                    </h2>

                    <p className="text-sm text-stone-500 mt-1">
                      {request.address || 'No address provided'}
                    </p>

                    <p className="text-sm text-stone-500 mt-1">
                      {request.email}
                    </p>

                    <p className="text-sm text-stone-500 mt-1">
                      Requested {formatDate(request.createdAt)}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`border rounded-full px-3 py-1 text-xs font-medium ${priority.className}`}>
                        {priority.label}
                      </span>

                      <span className="border rounded-full px-3 py-1 text-xs font-medium bg-stone-50 text-stone-700 border-stone-200">
                        {request.status}
                      </span>

                      <span className="border rounded-full px-3 py-1 text-xs font-medium bg-stone-50 text-stone-700 border-stone-200">
                        {request.requestedReportType}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-stone-900">
                        {request.score}
                        <span className="text-sm text-stone-400">/100</span>
                      </p>

                      <p className="text-sm font-medium text-teal-700">
                        {request.mode === 'commercial'
                          ? getCommercialVerdictLabel(request.verdictLabel)
                          : request.verdictLabel}
                      </p>
                    </div>

                    <select
                      value={request.status}
                      onChange={(event) => handleStatusChange(request.id, event.target.value as ReportRequestStatus)}
                      disabled={!adminPin}
                      className="border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                    >
                      {reportStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => setSelectedRequest(request)}
                      className="text-sm text-teal-700 font-medium hover:underline"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedRequest && (
        <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
                Report request detail
              </p>

              <h2 className="text-xl font-bold text-stone-900">
                {getLocation(selectedRequest)}
              </h2>

              <p className="text-sm text-stone-500 mt-1">
                {selectedRequest.email}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="text-sm text-stone-500 hover:text-stone-700"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Mode</p>
              <p className="font-semibold text-stone-900 capitalize">{selectedRequest.mode}</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Score</p>
              <p className="font-semibold text-stone-900">{selectedRequest.score}/100</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Verdict</p>
              <p className="font-semibold text-stone-900">
                {selectedRequest.mode === 'commercial'
                  ? getCommercialVerdictLabel(selectedRequest.verdictLabel)
                  : selectedRequest.verdictLabel}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Status</p>
              <select
                value={selectedRequest.status}
                onChange={(event) => handleStatusChange(selectedRequest.id, event.target.value as ReportRequestStatus)}
                disabled={!adminPin}
                className="border border-stone-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {reportStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-stone-900 mb-3">Request details</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Email</p>
                  <p className="font-medium text-stone-900 break-words">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Mode</p>
                  <p className="font-medium text-stone-900 capitalize">{selectedRequest.mode}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Postcode</p>
                  <p className="font-medium text-stone-900">{selectedRequest.postcode || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Address</p>
                  <p className="font-medium text-stone-900">{selectedRequest.address || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Requested type</p>
                  <p className="font-medium text-stone-900">{selectedRequest.requestedReportType}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Created</p>
                  <p className="font-medium text-stone-900">{formatDate(selectedRequest.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Updated</p>
                  <p className="font-medium text-stone-900">{getUpdatedDate(selectedRequest)}</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-stone-900 mb-3">Commercial summary</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Score</p>
                  <p className="font-medium text-stone-900">{selectedRequest.score}/100</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Mapped verdict</p>
                  <p className="font-medium text-stone-900">
                    {selectedRequest.mode === 'commercial'
                      ? getCommercialVerdictLabel(selectedRequest.verdictLabel)
                      : selectedRequest.verdictLabel}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Stored status</p>
                  <p className="font-medium text-stone-900">{getStatusLabel(selectedRequest.status)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
            <p className="font-semibold text-stone-900 mb-3">CRM fields</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
                  Lead quality
                </span>

                <select
                  value={detailLeadQuality ?? ''}
                  onChange={(event) =>
                    setDetailLeadQuality(
                      event.target.value === '' ? null : (event.target.value as ReportRequestLeadQuality)
                    )
                  }
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={!adminPin}
                >
                  {leadQualityOptions.map((option) => (
                    <option key={option ?? 'none'} value={option ?? ''}>
                      {option === null ? 'Not set' : getLeadQualityLabel(option)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
                  Fulfilment status
                </span>

                <select
                  value={detailFulfilmentStatus}
                  onChange={(event) =>
                    setDetailFulfilmentStatus(event.target.value as ReportRequestFulfilmentStatus)
                  }
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={!adminPin}
                >
                  {fulfilmentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getFulfilmentStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
                  CRM status
                </span>

                <select
                  value={detailStatus}
                  onChange={(event) => setDetailStatus(event.target.value as ReportRequestStatus)}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={!adminPin}
                >
                  {reportStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
                  Internal notes
                </span>

                <textarea
                  value={detailInternalNotes}
                  onChange={(event) => setDetailInternalNotes(event.target.value)}
                  rows={5}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Add follow-up context, lease questions, or handover notes"
                  disabled={!adminPin}
                />
              </label>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={handleSaveDetails}
                disabled={!adminPin || detailSaving}
                className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
              >
                {detailSaving ? 'Saving...' : 'Save CRM changes'}
              </button>

              {detailSaveError && (
                <p className="text-sm text-red-600">{detailSaveError}</p>
              )}
            </div>
          </div>

          {selectedRequest.mode === 'commercial' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="font-semibold text-stone-900 mb-2">Commercial inputs</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getCommercialInputRows(selectedRequest.input).map((row) => (
                    <div key={row.label} className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                      <p className="text-xs uppercase tracking-wide text-stone-400">{row.label}</p>
                      <p className="font-semibold text-stone-900 mt-1">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-stone-900 mb-2">Commercial outputs</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getCommercialResultRows(selectedRequest.result).map((row) => (
                    <div key={row.label} className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                      <p className="text-xs uppercase tracking-wide text-stone-400">{row.label}</p>
                      <p className="font-semibold text-stone-900 mt-1">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
