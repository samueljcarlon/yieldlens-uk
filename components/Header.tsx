import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-semibold text-stone-900 tracking-tight">
            YieldLens <span className="text-teal-700">UK</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm text-stone-600">
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
        </nav>

        <Link
          href="/check?mode=commercial"
          className="bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors shrink-0"
        >
          Run commercial check
        </Link>
      </div>
    </header>
  );
}
