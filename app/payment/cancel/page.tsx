import Link from 'next/link';

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ request_id?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestId = Array.isArray(params.request_id)
    ? params.request_id[0]
    : params.request_id;
  const thankYouHref = requestId
    ? `/thank-you?request_id=${encodeURIComponent(requestId)}`
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white border border-[var(--yieldlens-border)] rounded-2xl p-8 shadow-sm text-center">
        <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-3">
          Checkout not completed
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-4">
          You can return to the saved result or sample file when ready.
        </h1>

        <p className="text-sm text-stone-600 leading-7 max-w-2xl mx-auto">
          No payment was taken. You can return to the saved result handoff, view
          the sample file, or run another commercial check.
        </p>

        <p className="text-sm text-stone-600 leading-7 max-w-2xl mx-auto mt-3">
          The Standard file is only unlocked after checkout completes. If you
          want to compare the output first, the sample file is still available.
        </p>

        <p className="text-sm text-stone-500 leading-7 max-w-2xl mx-auto mt-4">
          YieldLens UK provides indicative decision-support only. It is not
          financial advice, legal advice, tax advice, a valuation, or a
          substitute for professional due diligence.
        </p>

        <p className="text-sm text-stone-600 leading-7 max-w-2xl mx-auto mt-4">
          If you need support with checkout, the saved result, or the sample
          file, use the{' '}
          <Link href="/contact" className="text-[var(--yieldlens-caution)] font-medium hover:underline">
            contact page
          </Link>
          .
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/check?mode=commercial"
            className="bg-[var(--yieldlens-primary)] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[var(--yieldlens-primary-hover)]"
          >
            Run another commercial check
          </Link>

          {thankYouHref ? (
            <Link
              href={thankYouHref}
              className="bg-white text-stone-700 border border-[var(--yieldlens-border)] px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
            >
              Return to saved result
            </Link>
          ) : (
            <Link
              href="/commercial-lease-viability-check"
              className="bg-white text-stone-700 border border-[var(--yieldlens-border)] px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
            >
              Return to commercial lease viability check
            </Link>
          )}

          <Link
            href="/sample-commercial-viability-file"
            className="bg-white text-stone-700 border border-[var(--yieldlens-border)] px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            View sample file
          </Link>

          <Link
            href="/"
            className="bg-white text-stone-700 border border-[var(--yieldlens-border)] px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
