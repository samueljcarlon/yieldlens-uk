'use client';

import { useState } from 'react';
import type { Submission } from '@/types/property';

export default function ReportInterestButton({
  submission,
}: {
  submission: Submission;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/report-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission,
          requestedReportType: 'standard_pdf',
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || 'Failed to request report.');
      }

      setStatus('success');
      setMessage('Report interest saved. We will use your email for launch access.');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to request report.';

      setStatus('error');
      setMessage(errorMessage);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === 'loading' || status === 'success'}
        className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-center"
      >
        {status === 'loading'
          ? 'Saving request...'
          : status === 'success'
            ? 'Report request saved'
            : 'Request full report access'}
      </button>

      {message && (
        <p
          className={`text-xs mt-2 ${
            status === 'error' ? 'text-red-600' : 'text-teal-700'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
