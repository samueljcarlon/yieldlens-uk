import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-semibold text-stone-900">
              YieldLens <span className="text-teal-700">UK</span>
            </p>

            <p className="text-sm text-stone-500 mt-2 leading-6">
              Independent UK property return checks for residential and commercial
              decisions. Indicative decision-support only.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400 font-medium mb-3">
              Tools
            </p>

            <div className="space-y-2 text-sm">
              <Link href="/commercial-lease-viability-check" className="block text-stone-500 hover:text-stone-900">
                Commercial lease viability check
              </Link>

              <Link href="/buy-to-let-yield-calculator" className="block text-stone-500 hover:text-stone-900">
                Buy-to-let yield calculator
              </Link>

              <Link href="/property-cash-flow-calculator" className="block text-stone-500 hover:text-stone-900">
                Property cash flow calculator
              </Link>

              <Link href="/rent-affordability-check" className="block text-stone-500 hover:text-stone-900">
                Rent and property decision check
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400 font-medium mb-3">
              Site
            </p>

            <div className="space-y-2 text-sm">
              <Link href="/check" className="block text-stone-500 hover:text-stone-900">
                Property check
              </Link>

              <Link href="/privacy" className="block text-stone-500 hover:text-stone-900">
                Privacy
              </Link>

              <Link href="/terms" className="block text-stone-500 hover:text-stone-900">
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 text-xs text-stone-400 leading-6">
          <p>
            YieldLens UK provides indicative property return checks and
            decision-support analysis only. It is not a formal valuation, financial
            advice, mortgage advice, legal advice, tax advice, or a substitute for
            professional due diligence.
          </p>

          <p className="mt-2">
            © 2026 YieldLens UK. Independent UK property analysis tool.
          </p>
        </div>
      </div>
    </footer>
  );
}
