import Link from 'next/link';

function NotFoundButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const className = primary
    ? 'inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-all hover:border-[var(--yieldlens-primary-hover)] hover:bg-[var(--yieldlens-primary-hover)]'
    : 'inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-[var(--yieldlens-caution)] hover:bg-[#F7F6F3]';

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
      <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-white p-8 sm:p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
          Not found
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-950 mb-4">
          We could not find that page.
        </h1>

        <p className="text-sm sm:text-base text-[var(--yieldlens-muted)] leading-7 max-w-2xl">
          The page may have moved, or the link may be out of date. Start again
          with a free commercial check, review the sample file, or read how the
          product works before continuing.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <NotFoundButton href="/check?mode=commercial" primary>
            Run a free commercial check
          </NotFoundButton>
          <NotFoundButton href="/sample-commercial-viability-file">
            View sample viability file
          </NotFoundButton>
          <NotFoundButton href="/how-it-works">
            Read how it works
          </NotFoundButton>
          <NotFoundButton href="/contact">
            Contact support
          </NotFoundButton>
        </div>
      </div>
    </div>
  );
}
