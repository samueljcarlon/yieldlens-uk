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
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-[#fffaf0] border border-stone-200 rounded-xl p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">
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
          financial advice, legal advice, tax advice, a valuation, or a substitute
          for professional due diligence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/check?mode=commercial"
            className="bg-green-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-green-800"
          >
            Run another commercial check
          </Link>

          {thankYouHref ? (
            <Link
              href={thankYouHref}
              className="bg-[#fffaf0] text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
            >
              Return to saved result
            </Link>
          ) : (
            <Link
              href="/commercial-lease-viability-check"
              className="bg-[#fffaf0] text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
            >
              Return to commercial lease viability check
            </Link>
          )}

          <Link
            href="/sample-commercial-viability-file"
            className="bg-[#fffaf0] text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            View sample file
          </Link>

          <Link
            href="/"
            className="bg-[#fffaf0] text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
