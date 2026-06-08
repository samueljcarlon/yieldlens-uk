import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <p className="font-semibold text-stone-900">
              YieldLens <span className="text-teal-700">UK</span>
            </p>

            <p className="text-sm text-stone-500 mt-2 max-w-xl leading-6">
              Independent UK property return checks for residential and commercial
              decisions. Indicative decision-support only, not a formal valuation
              or financial advice.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/check" className="text-stone-500 hover:text-stone-900">
              Property check
            </Link>

            <Link href="/privacy" className="text-stone-500 hover:text-stone-900">
              Privacy
            </Link>

            <Link href="/terms" className="text-stone-500 hover:text-stone-900">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-stone-100 text-xs text-stone-400 leading-6">
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
