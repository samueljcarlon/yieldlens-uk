import Link from 'next/link';
import { primaryCtaClass, secondaryCtaClass, surfaceCardClass } from '@/components/yieldLensUi';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-semibold text-stone-900 tracking-tight">
            YieldLens <span className="text-teal-700">UK</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-stone-600">
          <Link
            href="/check?mode=commercial"
            className="hover:text-stone-900 transition-colors"
          >
            Commercial check
          </Link>

          <Link
            href="/buy-to-let-yield-calculator"
            className="hover:text-stone-900 transition-colors"
          >
            Buy-to-let
          </Link>

          <Link
            href="/property-cash-flow-calculator"
            className="hover:text-stone-900 transition-colors"
          >
            Cash flow
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
        </nav>

        <div className="flex items-center gap-3">
          <details className="relative md:hidden">
            <summary className={`${secondaryCtaClass} list-none cursor-pointer px-3.5 py-2`}>
              Menu
            </summary>

            <div className={`absolute right-0 top-[calc(100%+0.5rem)] w-60 p-2 ${surfaceCardClass}`}>
              <Link href="/check?mode=commercial" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                Commercial check
              </Link>
              <Link href="/buy-to-let-yield-calculator" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                Buy-to-let
              </Link>
              <Link href="/property-cash-flow-calculator" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                Cash flow
              </Link>
              <Link href="/sample-commercial-viability-file" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                Sample file
              </Link>
              <Link href="/how-it-works" className="block rounded-2xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
                How it works
              </Link>
            </div>
          </details>

          <Link
            href="/check?mode=commercial"
            className={`${primaryCtaClass} shrink-0 px-4 py-2.5`}
          >
            Run commercial check
          </Link>
        </div>
      </div>
    </header>
  );
}
