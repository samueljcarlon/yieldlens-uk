import Link from 'next/link';
import { primaryCtaClass, secondaryCtaClass, surfaceCardClass } from '@/components/yieldLensUi';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" aria-label="YieldLens — Carlon Investment Group" className="flex flex-col shrink-0 leading-none">
          <span className="text-lg font-semibold text-stone-900 tracking-tight">
            YieldLens
          </span>
          <span className="mt-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--yieldlens-caution)]">
            Carlon Investment Group
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-stone-600">
          <Link
            href="/check?mode=commercial"
            className="hover:text-stone-900 transition-colors"
          >
            Free commercial check
          </Link>

          <Link
            href="/compare"
            className="hover:text-stone-900 transition-colors"
          >
            Compare sites
          </Link>

          <Link
            href="/sample-commercial-viability-file"
            className="hover:text-stone-900 transition-colors"
          >
            Sample file
          </Link>

          <Link
            href="/how-it-works"
            className="hover:text-stone-900 transition-colors"
          >
            How it works
          </Link>

          <Link
            href="/about"
            className="hover:text-stone-900 transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <details className="relative md:hidden">
            <summary className={`${secondaryCtaClass} list-none cursor-pointer px-3.5 py-2`}>
              Menu
            </summary>

            <div className={`absolute right-0 top-[calc(100%+0.5rem)] w-[min(18rem,calc(100vw-1rem))] max-h-[calc(100vh-6rem)] overflow-y-auto p-2 ${surfaceCardClass} shadow-[0_18px_44px_rgba(15,23,42,0.10)]`}>
              <Link href="/check?mode=commercial" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                Free commercial check
              </Link>
              <Link href="/compare" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                Compare sites
              </Link>
              <Link href="/sample-commercial-viability-file" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                Sample file
              </Link>
              <Link href="/how-it-works" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                How it works
              </Link>
              <Link href="/about" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                About
              </Link>
            </div>
          </details>

          <Link
            href="/check?mode=commercial"
            className={`${primaryCtaClass} shrink-0 px-4 py-2.5 shadow-[0_12px_30px_rgba(22,101,52,0.20)]`}
          >
            Run a free commercial check
          </Link>
        </div>
      </div>
    </header>
  );
}
