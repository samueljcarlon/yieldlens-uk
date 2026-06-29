'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-white p-8 sm:p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
          Access issue
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-950 mb-4">
          We could not load this viability file.
        </h1>

        <p className="text-sm sm:text-base text-[var(--yieldlens-muted)] leading-7 max-w-2xl">
          The page may need to be reopened, or the saved file may not be ready
          yet. Try again, or return to the free commercial check if you need to
          start over.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-all hover:border-[var(--yieldlens-primary-hover)] hover:bg-[var(--yieldlens-primary-hover)]"
          >
            Try again
          </button>
          <Link
            href="/check?mode=commercial"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-[var(--yieldlens-caution)] hover:bg-[#F7F6F3]"
          >
            Run a free commercial check
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-400 hover:bg-[var(--yieldlens-panel)]"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
