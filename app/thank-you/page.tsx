import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-3">
          Request received
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-4">
          Your viability file request has been saved.
        </h1>

        <p className="text-sm text-stone-600 leading-7 max-w-2xl mx-auto">
          Thanks. Your property check and email have been saved. As YieldLens UK
          develops the full report workflow, we’ll use this request to prioritise
          early access and follow-up.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/check"
            className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            Run another check
          </Link>

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
