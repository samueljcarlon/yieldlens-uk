'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLatestSubmission } from '@/lib/storage';

export default function ThankYouPage() {
  const [continueHref, setContinueHref] = useState('/check');
  const [continueLabel, setContinueLabel] = useState('Run another check');
  const [mode, setMode] = useState<'residential' | 'commercial' | null>(null);

  useEffect(() => {
    const submission = getLatestSubmission();

    if (submission?.mode === 'commercial') {
      setMode('commercial');
      setContinueHref('/check?mode=commercial');
      setContinueLabel('Run another commercial check');
      return;
    }

    if (submission?.mode === 'residential') {
      setMode('residential');
      setContinueHref('/check?mode=residential');
      setContinueLabel('Run another residential check');
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-3">
          Request received
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-4">
          Your report request has been received.
        </h1>

        <p className="text-sm text-stone-600 leading-7 max-w-2xl mx-auto">
          Thanks. Your submitted assumptions have been saved. We will use the
          request to continue the viability file workflow, and we may ask for
          lease details or a few extra assumptions before the next step.
        </p>

        <p className="text-sm text-stone-500 leading-7 max-w-2xl mx-auto mt-4">
          YieldLens UK provides indicative decision-support only. It is not
          financial advice, legal advice, tax advice, a valuation, or a substitute
          for professional due diligence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={continueHref}
            className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            {continueLabel}
          </Link>

          {mode === 'commercial' && (
            <Link
              href="/commercial-lease-viability-check"
              className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
            >
              View commercial lease viability check
            </Link>
          )}

          <Link
            href="/"
            className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
