import Link from 'next/link';

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
          Preparing your results
        </p>

        <h1 className="text-3xl font-bold text-stone-950 mb-4">
          Preparing your commercial check.
        </h1>

        <p className="text-sm text-[var(--yieldlens-muted)] leading-7 max-w-2xl">
          The saved result is being loaded. If you have just completed the free
          check, this page should show your rent burden, break-even customers,
          opening cash pressure, and next steps.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/check?mode=commercial"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-all hover:border-[var(--yieldlens-primary-hover)] hover:bg-[var(--yieldlens-primary-hover)]"
          >
            Run a free commercial check
          </Link>
          <Link
            href="/sample-commercial-viability-file"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-[var(--yieldlens-caution)] hover:bg-[#F7F6F3]"
          >
            View sample viability file
          </Link>
        </div>
      </div>
    </div>
  );
}
