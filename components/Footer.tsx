import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_0.8fr] gap-8">
          <div>
            <p className="font-semibold text-stone-950">
              YieldLens <span className="text-[var(--yieldlens-caution)]">UK</span>
            </p>

            <p className="text-sm text-stone-500 mt-3 leading-7 max-w-sm">
              YieldLens UK provides indicative property pressure-tests and decision-support
              analysis only. It is not financial advice, legal advice, tax advice, a
              valuation, or a substitute for professional due diligence.
            </p>

            <p className="text-sm text-stone-500 mt-3 leading-7 max-w-sm">
              For support, contact us through the website. If the numbers look off,
              rerun the check with revised assumptions before paying or signing.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400 font-medium mb-3">
              Commercial
            </p>

            <div className="space-y-2 text-sm">
              <Link href="/commercial-lease-viability-check" className="block text-stone-500 hover:text-stone-900">
                Commercial lease viability check
              </Link>

              <Link href="/commercial-rent-affordability-calculator" className="block text-stone-500 hover:text-stone-900">
                Commercial rent affordability calculator
              </Link>

              <Link href="/sample-commercial-viability-file" className="block text-stone-500 hover:text-stone-900">
                Sample viability file
              </Link>

              <Link href="/how-it-works" className="block text-stone-500 hover:text-stone-900">
                How it works
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400 font-medium mb-3">
              Commercial calculators
            </p>

            <div className="space-y-2 text-sm">
              <Link href="/commercial-rent-burden-calculator" className="block text-stone-500 hover:text-stone-900">
                Rent burden calculator
              </Link>

              <Link href="/break-even-customers-calculator" className="block text-stone-500 hover:text-stone-900">
                Break-even customers calculator
              </Link>

              <Link href="/commercial-lease-survival-calculator" className="block text-stone-500 hover:text-stone-900">
                Lease survival calculator
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400 font-medium mb-3">
              Commercial guides
            </p>

            <div className="space-y-2 text-sm">
              <Link href="/commercial-lease-checklist-before-signing" className="block text-stone-500 hover:text-stone-900">
                Commercial lease checklist
              </Link>

              <Link href="/how-much-rent-can-a-cafe-afford" className="block text-stone-500 hover:text-stone-900">
                Cafe rent affordability
              </Link>

              <Link href="/restaurant-lease-viability-check" className="block text-stone-500 hover:text-stone-900">
                Restaurant lease viability
              </Link>

              <Link href="/salon-lease-viability-check" className="block text-stone-500 hover:text-stone-900">
                Salon lease viability
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400 font-medium mb-3">
              Residential
            </p>

            <div className="space-y-2 text-sm">
              <Link href="/buy-to-let-yield-calculator" className="block text-stone-500 hover:text-stone-900">
                Buy-to-let yield calculator
              </Link>

              <Link href="/property-cash-flow-calculator" className="block text-stone-500 hover:text-stone-900">
                Property cash flow calculator
              </Link>

              <Link href="/rent-affordability-check" className="block text-stone-500 hover:text-stone-900">
                Rent affordability calculator
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400 font-medium mb-3">
              Site
            </p>

            <div className="space-y-2 text-sm">
              <Link href="/check?mode=commercial" className="block text-stone-500 hover:text-stone-900">
                Commercial check
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

        <div className="mt-10 pt-6 border-t border-stone-200 text-xs text-stone-500 leading-6">
          <p>
            YieldLens UK provides indicative property pressure-tests and
            decision-support analysis only. It is not financial advice, legal advice,
            tax advice, a valuation, or a substitute for professional due diligence.
          </p>

          <p className="mt-2">
            © 2026 YieldLens UK. Independent UK property decision-support tool.
          </p>
        </div>
      </div>
    </footer>
  );
}
