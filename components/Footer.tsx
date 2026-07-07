import Link from 'next/link';

const linkClass = 'block text-sm text-stone-300 transition-colors hover:text-white';
const supportHref = 'mailto:yieldlensuk@gmail.com?subject=YieldLens%20support';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[var(--yieldlens-hero)] text-white">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_0.9fr]">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              YieldLens <span className="text-[#DCCDA8]">UK</span>
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-stone-300">
              YieldLens UK is a commercial rent affordability and lease
              viability decision-support tool for UK commercial sites. It is
              not financial advice, legal advice, tax advice, a valuation, or a
              substitute for professional due diligence.
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-stone-400">
              For support, email{' '}
              <a href={supportHref} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                yieldlensuk@gmail.com
              </a>
              . If the numbers look off, rerun the check with revised
              assumptions before paying or signing.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#DCCDA8] mb-3">
              Commercial
            </p>

            <div className="space-y-2.5">
              <Link href="/check?mode=commercial" className={linkClass}>
                Free commercial check
              </Link>
              <Link href="/commercial-lease-viability-check" className={linkClass}>
                Commercial lease viability check
              </Link>
              <Link href="/compare" className={linkClass}>
                Compare two sites
              </Link>
              <Link href="/sample-commercial-viability-file" className={linkClass}>
                Sample viability file
              </Link>
              <Link href="/viability-file" className={linkClass}>
                £49 Standard Commercial Viability File
              </Link>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
              <Link href="/how-it-works" className={linkClass}>
                How it works
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#DCCDA8] mb-3">
              Commercial calculators
            </p>

            <div className="space-y-2.5">
              <Link href="/commercial-rent-burden-calculator" className={linkClass}>
                Rent burden calculator
              </Link>
              <Link href="/break-even-customers-calculator" className={linkClass}>
                Break-even customers calculator
              </Link>
              <Link href="/commercial-lease-survival-calculator" className={linkClass}>
                Lease survival calculator
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#DCCDA8] mb-3">
              Commercial guides
            </p>

            <div className="space-y-2.5">
              <Link href="/commercial-lease-checklist-before-signing" className={linkClass}>
                Commercial lease checklist
              </Link>
              <Link href="/how-much-rent-can-a-cafe-afford" className={linkClass}>
                Cafe rent affordability
              </Link>
              <Link href="/how-much-rent-can-a-coffee-shop-afford" className={linkClass}>
                Coffee shop rent affordability
              </Link>
              <Link href="/restaurant-lease-viability-check" className={linkClass}>
                Restaurant lease viability
              </Link>
              <Link href="/salon-lease-viability-check" className={linkClass}>
                Salon lease viability
              </Link>
              <Link href="/how-much-rent-can-a-nail-salon-afford" className={linkClass}>
                Nail salon rent affordability
              </Link>
              <Link href="/how-much-rent-can-a-gym-afford" className={linkClass}>
                Gym rent affordability
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#DCCDA8] mb-3">
              Site
            </p>

            <div className="space-y-2.5">
              <Link href="/check?mode=commercial" className={linkClass}>
                Commercial check
              </Link>
              <Link href="/about" className={linkClass}>
                About
              </Link>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
              <Link href="/buy-to-let-yield-calculator" className={linkClass}>
                Buy-to-let yield calculator
              </Link>
              <Link href="/property-cash-flow-calculator" className={linkClass}>
                Property cash flow calculator
              </Link>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
              <Link href="/terms" className={linkClass}>
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-stone-400">
          <p>
            YieldLens UK is a commercial rent affordability and lease
            viability decision-support tool for UK commercial sites. It is not
            financial advice, legal advice, tax advice, a valuation, or a
            substitute for professional due diligence.
          </p>

          <p className="mt-2">
            © 2026 YieldLens UK. Commercial rent affordability and lease
            viability decision-support tool for UK commercial sites.
          </p>
        </div>
      </div>
    </footer>
  );
}
