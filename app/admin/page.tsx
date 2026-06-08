'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { PropertyMode, Submission } from '@/types/property';
import { clearSubmissions, getSubmissions } from '@/lib/storage';
import { getRemoteSubmissions } from '@/lib/remoteSubmissions';
import VerdictBadge from '@/components/VerdictBadge';

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getLocationLabel(submission: Submission): string {
  const input = submission.input;

  if ('postcode' in input && input.postcode) return input.postcode;
  if ('address' in input && input.address) return input.address;

  return 'No location provided';
}

function getEmailLabel(submission: Submission): string {
  const input = submission.input;

  if ('email' in input && input.email) return input.email;

  return 'No email provided';
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<'all' | PropertyMode>('all');
  const [adminPin, setAdminPin] = useState('');
  const [status, setStatus] = useState<'local' | 'remote'>('local');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const filteredSubmissions =
    filter === 'all'
      ? submissions
      : submissions.filter((submission) => submission.mode === filter);

  const handleClearLocal = () => {
    clearSubmissions();
    setSubmissions([]);
    setStatus('local');
  };

  const handleLoadRemote = async () => {
    setError('');
    setLoading(true);

    try {
      const remoteSubmissions = await getRemoteSubmissions(adminPin);
      setSubmissions(remoteSubmissions);
      setStatus('remote');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load submissions.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
          Internal admin
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          Saved property checks
        </h1>

        <p className="text-sm text-stone-500 max-w-2xl">
          Local checks are stored in this browser. Remote checks are stored in Supabase
          and require the admin PIN.
        </p>
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
          Current view: {status === 'remote' ? 'Supabase remote submissions' : 'local browser submissions'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded text-sm border ${
              filter === 'all'
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-white text-stone-700 border-stone-300'
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter('residential')}
            className={`px-4 py-2 rounded text-sm border ${
              filter === 'residential'
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-white text-stone-700 border-stone-300'
            }`}
          >
            Residential
          </button>

          <button
            type="button"
            onClick={() => setFilter('commercial')}
            className={`px-4 py-2 rounded text-sm border ${
              filter === 'commercial'
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-white text-stone-700 border-stone-300'
            }`}
          >
            Commercial
          </button>
        </div>

        {status === 'local' && submissions.length > 0 && (
          <button
            type="button"
            onClick={handleClearLocal}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear local checks
          </button>
        )}
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            No saved checks found
          </h2>

          <p className="text-sm text-stone-500 mb-5">
            Run a property check first, or load remote submissions using the admin PIN.
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
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
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
                    {getEmailLabel(submission)}
                  </p>

                  <p className="text-sm text-stone-500 mt-1">
                    Created {formatDate(submission.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-stone-900">
                    {submission.score}
                    <span className="text-sm text-stone-400">/100</span>
                  </p>

                  <VerdictBadge verdict={submission.verdict} />
                </div>
              </div>
            </div>
          ))}
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
