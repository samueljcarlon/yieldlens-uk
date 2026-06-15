'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Submission } from '@/types/property';
import { logToolEvent } from '@/lib/logToolEvent';

export default function ReportInterestButton({
  submission,
}: {
  submission: Submission;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    setStatus('loading');
    setMessage('');

    try {
      if (submission.mode === 'commercial') {
        void logToolEvent({
          event_name: 'results_viability_file_requested_clicked',
          page_path: '/results',
          tool_name: 'commercial_funnel',
          result_label: 'Request full viability file',
          result_band: 'cta_click',
          metadata: {
            page_path: '/results',
            cta_label: 'Request full viability file',
            destination: '/thank-you',
            funnel_area: 'commercial',
            page_type: 'results',
          },
        });
      }

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

      router.push('/thank-you');
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
        disabled={status === 'loading'}
        className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-center"
      >
        {status === 'loading' ? 'Saving request...' : 'Request full viability file'}
      </button>

      {message && (
        <p className="text-xs mt-2 text-red-600">
          {message}
        </p>
      )}
    </div>
  );
}
