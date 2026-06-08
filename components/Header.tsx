import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-stone-900 tracking-tight">
            YieldLens <span className="text-teal-700">UK</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-stone-600">
          <Link href="/check" className="hover:text-stone-900 transition-colors">
            Property check
          </Link>

          <Link
            href="/check"
            className="bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-800 transition-colors"
          >
            Start free check
          </Link>
        </nav>
      </div>
    </header>
  );
}
