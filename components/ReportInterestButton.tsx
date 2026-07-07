'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Submission } from '@/types/property';
import { logToolEvent } from '@/lib/logToolEvent';
import { primaryCtaClass } from '@/components/yieldLensUi';
import {
  getCommercialBusinessTypeLabel,
  getCommercialBusinessTypeValue,
} from '@/lib/commercialBusinessType';

function getSubmissionTextValue(submission: Submission, key: string): string {
  const input = submission.input as Record<string, unknown>;
  const value = input[key];
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function hasSubmissionAddress(submission: Submission): boolean {
  return getSubmissionTextValue(submission, 'address') !== '';
}

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
        const rawBusinessType = getCommercialBusinessTypeValue(submission.input);
        const businessType =
          typeof rawBusinessType === 'string' && rawBusinessType.trim()
            ? getCommercialBusinessTypeLabel(rawBusinessType)
            : '';

        void logToolEvent({
          event_name: 'results_viability_file_requested_clicked',
          page_path: '/results',
          tool_name: 'commercial_funnel',
          result_label: 'Unlock the £49 viability file',
          result_band: 'cta_click',
            metadata: {
              source_path: '/results',
              page_path: '/results',
              cta_label: 'Unlock the £49 viability file',
              cta_location: 'results',
              destination: '/thank-you',
              destination_path: '/thank-you',
              funnel_area: 'commercial',
              page_type: 'results',
              mode: submission.mode,
              source_page: '/results',
              product_area: 'results_paid_bridge',
              postcode: getSubmissionTextValue(submission, 'postcode'),
              has_address: hasSubmissionAddress(submission),
              ...(businessType ? { business_type: businessType } : {}),
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

      const data = (await response.json()) as { requestId?: string };

      if (!data.requestId) {
        throw new Error('Failed to request report.');
      }

      router.push(`/thank-you?request_id=${encodeURIComponent(data.requestId)}`);
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
        className={`${primaryCtaClass} text-center`}
      >
        {status === 'loading'
          ? 'Preparing your file...'
          : submission.mode === 'commercial'
            ? 'Unlock the £49 viability file'
            : 'Request full viability file'}
      </button>

      {message && (
        <p className="text-xs mt-2 text-red-600">
          {message}
        </p>
      )}
    </div>
  );
}
