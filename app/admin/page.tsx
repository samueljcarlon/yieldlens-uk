'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type {
  CommercialResult,
  PropertyMode,
  ResidentialResult,
  Submission,
} from '@/types/property';
import { clearSubmissions, getSubmissions } from '@/lib/storage';
import { getRemoteSubmissions } from '@/lib/remoteSubmissions';
import VerdictBadge from '@/components/VerdictBadge';

type ViewSource = 'local' | 'remote';
type VerdictFilter = 'all' | 'Strong candidate' | 'Worth investigating' | 'Marginal' | 'Weak' | 'Avoid';

interface LeadTag {
  label: string;
  className: string;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getInputRecord(submission: Submission): Record<string, unknown> {
  return submission.input as Record<string, unknown>;
}

function getTextValue(submission: Submission, key: string): string {
  const value = getInputRecord(submission)[key];
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function getLocationLabel(submission: Submission): string {
  return (
    getTextValue(submission, 'postcode') ||
    getTextValue(submission, 'address') ||
    'No location provided'
  );
}

function getAddressLabel(submission: Submission): string {
  return getTextValue(submission, 'address') || 'No address provided';
}

function getEmailLabel(submission: Submission): string {
  return getTextValue(submission, 'email') || 'No email provided';
}

function getUseCaseLabel(submission: Submission): string {
  if (submission.mode === 'residential') {
    return getTextValue(submission, 'userObjective') || 'Residential check';
  }

  return getTextValue(submission, 'businessType') || 'Commercial check';
}

function getLeadTags(submission: Submission): LeadTag[] {
  const tags: LeadTag[] = [];
  const email = getTextValue(submission, 'email');

  if (submission.score >= 80) {
    tags.push({
      label: 'Strong candidate',
      className: 'bg-green-50 text-green-800 border-green-200',
    });
  }

  if (submission.score >= 65 && email) {
    tags.push({
      label: 'Hot lead',
      className: 'bg-teal-50 text-teal-800 border-teal-200',
    });
  }

  if (!email) {
    tags.push({
      label: 'No contact',
      className: 'bg-red-50 text-red-800 border-red-200',
    });
  }

  if (submission.mode === 'residential') {
    const result = submission.result as ResidentialResult;

    if (
      typeof result.monthlyCashFlow === 'number' &&
      result.monthlyCashFlow < 100
    ) {
      tags.push({
        label: 'Fragile cash flow',
        className: 'bg-orange-50 text-orange-800 border-orange-200',
      });
    }
  }

  if (submission.mode === 'commercial') {
    const result = submission.result as CommercialResult;

    if (
      typeof result.rentBurdenPercentage === 'number' &&
      result.rentBurdenPercentage > 18
    ) {
      tags.push({
        label: 'High rent burden',
        className: 'bg-orange-50 text-orange-800 border-orange-200',
      });
    }

    if (
      typeof result.breakEvenCustomersPerDay === 'number' &&
      typeof result.expectedCustomersPerDay === 'number' &&
      result.breakEvenCustomersPerDay > result.expectedCustomersPerDay
    ) {
      tags.push({
        label: 'Break-even risk',
        className: 'bg-red-50 text-red-800 border-red-200',
      });
    }
  }

  if (tags.length === 0) {
    tags.push({
      label: 'Review',
      className: 'bg-stone-50 text-stone-700 border-stone-200',
    });
  }

  return tags;
}

function csvEscape(value: unknown): string {
  if (value === undefined || value === null) return '';

  const text =
    typeof value === 'object' ? JSON.stringify(value) : String(value);

  return `"${text.replace(/"/g, '""')}"`;
}

function exportSubmissionsToCsv(submissions: Submission[]) {
  const headers = [
    'createdAt',
    'mode',
    'email',
    'address',
    'postcode',
    'useCase',
    'score',
    'verdict',
    'leadTags',
  ];

  const rows = submissions.map((submission) => {
    const tags = getLeadTags(submission)
      .map((tag) => tag.label)
      .join(', ');

    return [
      submission.createdAt,
      submission.mode,
      getEmailLabel(submission),
      getAddressLabel(submission),
      getTextValue(submission, 'postcode'),
      getUseCaseLabel(submission),
      submission.score,
      submission.verdict.label,
      tags,
    ];
  });

  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => row.map(csvEscape).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `yieldlens-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [modeFilter, setModeFilter] = useState<'all' | PropertyMode>('all');
  const [verdictFilter, setVerdictFilter] = useState<VerdictFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [source, setSource] = useState<ViewSource>('local');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const filteredSubmissions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return submissions.filter((submission) => {
      const matchesMode =
        modeFilter === 'all' || submission.mode === modeFilter;

      const matchesVerdict =
        verdictFilter === 'all' || submission.verdict.label === verdictFilter;

      const searchableText = [
        getEmailLabel(submission),
        getAddressLabel(submission),
        getLocationLabel(submission),
        getUseCaseLabel(submission),
        submission.mode,
        submission.verdict.label,
        String(submission.score),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      return matchesMode && matchesVerdict && matchesSearch;
    });
  }, [submissions, modeFilter, verdictFilter, searchTerm]);

  const counts = useMemo(() => {
    return {
      total: submissions.length,
      residential: submissions.filter((submission) => submission.mode === 'residential').length,
      commercial: submissions.filter((submission) => submission.mode === 'commercial').length,
      hotLeads: submissions.filter((submission) =>
        getLeadTags(submission).some((tag) => tag.label === 'Hot lead')
      ).length,
    };
  }, [submissions]);

  const handleClearLocal = () => {
    clearSubmissions();
    setSubmissions([]);
    setSelectedSubmission(null);
    setSource('local');
  };

  const handleLoadRemote = async () => {
    setError('');
    setLoading(true);
    setSelectedSubmission(null);

    try {
      const remoteSubmissions = await getRemoteSubmissions(adminPin);
      setSubmissions(remoteSubmissions);
      setSource('remote');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load submissions.';
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
          Lead dashboard
        </h1>

        <p className="text-sm text-stone-500 max-w-2xl">
          View saved property checks, load remote Supabase submissions, search leads,
          filter by verdict, and export visible rows as CSV.
        </p>

        <div className="mt-4">
          <Link href="/admin/reports" className="text-sm text-teal-700 font-medium hover:underline">
            View report requests →
          </Link>
        </div>

        <div className="mt-2">
          <Link href="/admin/events" className="text-sm text-teal-700 font-medium hover:underline">
            View tool events →
          </Link>
        </div>

        <div className="mt-2">
          <Link href="/admin/funnel" className="text-sm text-teal-700 font-medium hover:underline">
            View commercial funnel →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Total</p>
          <p className="text-2xl font-bold text-stone-900">{counts.total}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Residential</p>
          <p className="text-2xl font-bold text-stone-900">{counts.residential}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Commercial</p>
          <p className="text-2xl font-bold text-stone-900">{counts.commercial}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Hot leads</p>
          <p className="text-2xl font-bold text-stone-900">{counts.hotLeads}</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-900 mb-2">Load remote submissions</p>

        <p className="text-sm text-stone-500 mb-4">
          Enter the admin PIN to view all submissions saved in the Supabase database.
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
            onClick={handleLoadRemote}
            disabled={loading || !adminPin}
            className="bg-teal-700 text-white px-5 py-2 rounded text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load remote'}
          </button>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <p className="text-xs text-stone-400 mt-3">
          Current view: {source === 'remote' ? 'Supabase remote submissions' : 'local browser submissions'}
        </p>
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
              Verdict
            </label>

            <select
              value={verdictFilter}
              onChange={(event) => setVerdictFilter(event.target.value as VerdictFilter)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All verdicts</option>
              <option value="Strong candidate">Strong candidate</option>
              <option value="Worth investigating">Worth investigating</option>
              <option value="Marginal">Marginal</option>
              <option value="Weak">Weak</option>
              <option value="Avoid">Avoid</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => exportSubmissionsToCsv(filteredSubmissions)}
              disabled={filteredSubmissions.length === 0}
              className="bg-stone-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-stone-800 disabled:opacity-50"
            >
              Export visible CSV
            </button>

            {source === 'local' && submissions.length > 0 && (
              <button
                type="button"
                onClick={handleClearLocal}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear local checks
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-stone-400 mt-4">
          Showing {filteredSubmissions.length} of {submissions.length} submissions.
        </p>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            No saved checks found
          </h2>

          <p className="text-sm text-stone-500 mb-5">
            Run a property check, load remote submissions, or adjust your filters.
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
          {filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">
                    {submission.mode === 'residential'
                      ? 'Residential return check'
                      : 'Commercial site check'}
                  </p>

                  <h2 className="text-lg font-semibold text-stone-900">
                    {getLocationLabel(submission)}
                  </h2>

                  <p className="text-sm text-stone-500 mt-1">
                    {getAddressLabel(submission)}
                  </p>

                  <p className="text-sm text-stone-500 mt-1">
                    {getEmailLabel(submission)}
                  </p>

                  <p className="text-sm text-stone-500 mt-1">
                    Created {formatDate(submission.createdAt)}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {getLeadTags(submission).map((tag) => (
                      <span
                        key={tag.label}
                        className={`border rounded-full px-3 py-1 text-xs font-medium ${tag.className}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col lg:items-end gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-stone-900">
                      {submission.score}
                      <span className="text-sm text-stone-400">/100</span>
                    </p>

                    <VerdictBadge verdict={submission.verdict} />
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedSubmission(submission)}
                    className="text-sm text-teal-700 font-medium hover:underline"
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSubmission && (
        <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
                Submission detail
              </p>

              <h2 className="text-xl font-bold text-stone-900">
                {getLocationLabel(selectedSubmission)}
              </h2>

              <p className="text-sm text-stone-500 mt-1">
                {getEmailLabel(selectedSubmission)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSubmission(null)}
              className="text-sm text-stone-500 hover:text-stone-700"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Mode</p>
              <p className="font-semibold text-stone-900 capitalize">
                {selectedSubmission.mode}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Score</p>
              <p className="font-semibold text-stone-900">
                {selectedSubmission.score}/100
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Verdict</p>
              <p className="font-semibold text-stone-900">
                {selectedSubmission.verdict.label}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-stone-900 mb-2">Lead tags</p>
            <div className="flex flex-wrap gap-2">
              {getLeadTags(selectedSubmission).map((tag) => (
                <span
                  key={tag.label}
                  className={`border rounded-full px-3 py-1 text-xs font-medium ${tag.className}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-stone-900 mb-2">Input data</p>
              <pre className="bg-stone-950 text-stone-100 rounded-lg p-4 text-xs overflow-auto max-h-80">
                {JSON.stringify(selectedSubmission.input, null, 2)}
              </pre>
            </div>

            <div>
              <p className="font-semibold text-stone-900 mb-2">Result data</p>
              <pre className="bg-stone-950 text-stone-100 rounded-lg p-4 text-xs overflow-auto max-h-80">
                {JSON.stringify(selectedSubmission.result, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex gap-4">
        <Link href="/check" className="text-sm text-teal-700 font-medium hover:underline">
          Run another check →
        </Link>

        <Link href="/" className="text-sm text-stone-500 hover:text-stone-700">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
