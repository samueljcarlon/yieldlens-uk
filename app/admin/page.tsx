'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { PropertyMode, Submission } from '@/types/property';
import { clearSubmissions, getSubmissions } from '@/lib/storage';
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

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<'all' | PropertyMode>('all');

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const filteredSubmissions =
    filter === 'all'
      ? submissions
      : submissions.filter((submission) => submission.mode === filter);

  const handleClear = () => {
    clearSubmissions();
    setSubmissions([]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
          Internal MVP admin
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          Saved property checks
        </h1>

        <p className="text-sm text-stone-500 max-w-2xl">
          This page reads saved checks from localStorage only. Authentication and
          persistent database storage must be added before production.
        </p>
      </div>

      <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-xl p-4 text-sm mb-8">
        MVP admin view. Authentication and persistent database storage must be added before production.
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

        {submissions.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear saved checks
          </button>
        )}
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            No saved checks yet
          </h2>

          <p className="text-sm text-stone-500 mb-5">
            Run a residential or commercial check first, then it will appear here.
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
