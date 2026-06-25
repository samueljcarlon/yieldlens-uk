'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLatestSubmission } from '@/lib/storage';
import { getFunnelAttributionSnapshot } from '@/lib/funnelAttribution';

export default function ThankYouClient({ requestId }: { requestId: string }) {
  const [continueHref, setContinueHref] = useState('/check');
  const [continueLabel, setContinueLabel] = useState('Run another check');
  const [mode, setMode] = useState<'residential' | 'commercial' | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [checkoutError, setCheckoutError] = useState('');

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

  const handleProceedToCheckout = async () => {
    if (!requestId || mode !== 'commercial') return;

    setCheckoutStatus('loading');
    setCheckoutError('');

    try {
      const response = await fetch('/api/report-payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportRequestId: requestId,
          sourcePage: '/thank-you',
          attribution: getFunnelAttributionSnapshot(),
        }),
      });

      if (!response.ok) {
        throw new Error('Could not start checkout. Please try again.');
      }

      const data = (await response.json()) as { checkoutUrl?: string };

      if (!data.checkoutUrl) {
        throw new Error('Could not start checkout. Please try again.');
      }

      window.location.href = data.checkoutUrl;
    } catch {
      setCheckoutStatus('error');
      setCheckoutError('Could not start checkout. Please try again.');
    } finally {
      setCheckoutStatus('idle');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
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

        {mode === 'commercial' && requestId && (
          <div className="mt-8 max-w-2xl mx-auto border border-stone-200 rounded-xl bg-green-50 p-5 text-left">
            <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-2">
              Secure checkout
            </p>

            <h2 className="text-xl font-bold text-stone-900">
              Standard commercial viability file
            </h2>

            <p className="text-lg font-semibold text-stone-900 mt-1">
              £49
            </p>

            <p className="text-sm text-stone-700 leading-7 mt-3">
              Get a fuller commercial viability file covering rent burden,
              break-even customers, upfront cash, downside trading, lease
              questions, and due diligence checks before committing.
            </p>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              disabled={checkoutStatus === 'loading'}
              className="mt-4 inline-flex items-center justify-center bg-green-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkoutStatus === 'loading'
                ? 'Starting secure checkout...'
                : 'Proceed to secure checkout'}
            </button>

            {checkoutError && (
              <p className="text-sm text-red-600 mt-3">{checkoutError}</p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={continueHref}
            className="bg-green-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-green-800"
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
