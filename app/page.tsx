import Link from 'next/link';
import PricingCards from '@/components/PricingCards';
import VerdictBadge from '@/components/VerdictBadge';

const exampleVerdict = {
  label: 'Worth investigating' as const,
  score: 67,
  colour: 'teal' as const,
};

const valueCards = [
  {
    title: 'Yield estimate',
    desc: 'See the indicative gross yield from the purchase price and expected rent.',
  },
  {
    title: 'Cash flow check',
    desc: 'Check whether the deal still works after mortgage costs, service charge, and known ownership costs.',
  },
  {
    title: 'Commercial break-even',
    desc: 'Estimate the customers per day needed to cover rent, staff, rates, and other costs.',
  },
  {
    title: 'Risk flags',
    desc: 'Spot thin cash flow, high rent burden, missing data, and fragile assumptions before you commit.',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-4">
            London-first UK property return checks
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 leading-tight mb-6">
            Check whether a property actually makes financial sense.
          </h1>

          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-8 leading-8">
            YieldLens UK helps buyers, renters, landlords, and small business owners
            screen residential and commercial property decisions before they view,
            buy, rent, invest, or sign a lease.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/check"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
            >
              Start a free property check
            </Link>

            <Link
              href="/report"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              See example report
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-5">
            Indicative decision-support only. Not a formal valuation or financial advice.
          </p>
        </div>
      </section>

      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3 text-center">
            Tools
          </p>

          <h2 className="text-2xl font-bold text-stone-900 text-center mb-3">
            Start with the check that matches your decision.
          </h2>

          <p className="text-stone-500 text-center text-sm max-w-2xl mx-auto mb-10">
            YieldLens UK is built around specific property decisions, not generic
            property content. Pick the route closest to what you are trying to work out.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              href="/commercial-lease-viability-check"
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:border-teal-300 transition-colors"
            >
              <p className="font-semibold text-stone-900 mb-2">
                Commercial lease viability check
              </p>

              <p className="text-sm text-stone-600 leading-6 mb-4">
                Check whether a cafe, salon, gym, shop, restaurant, or office site
                can realistically carry the rent before you sign a lease.
              </p>

              <span className="text-sm text-teal-700 font-medium">
                Explore commercial lease checks →
              </span>
            </Link>

            <Link
              href="/buy-to-let-yield-calculator"
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:border-teal-300 transition-colors"
            >
              <p className="font-semibold text-stone-900 mb-2">
                Buy-to-let yield calculator
              </p>

              <p className="text-sm text-stone-600 leading-6 mb-4">
                Estimate gross yield, ownership costs, monthly cash flow, and
                downside risk before spending serious time on a rental property.
              </p>

              <span className="text-sm text-teal-700 font-medium">
                Explore buy-to-let checks →
              </span>
            </Link>

            <Link
              href="/property-cash-flow-calculator"
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:border-teal-300 transition-colors"
            >
              <p className="font-semibold text-stone-900 mb-2">
                Property cash flow calculator
              </p>

              <p className="text-sm text-stone-600 leading-6 mb-4">
                Check whether the property produces real monthly surplus after
                mortgage costs, service charge, ground rent, and other costs.
              </p>

              <span className="text-sm text-teal-700 font-medium">
                Explore cash flow checks →
              </span>
            </Link>

            <Link
              href="/rent-affordability-check"
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:border-teal-300 transition-colors"
            >
              <p className="font-semibold text-stone-900 mb-2">
                Rent and property decision check
              </p>

              <p className="text-sm text-stone-600 leading-6 mb-4">
                Sanity-check rent, area assumptions, and property numbers before
                committing to a residential decision.
              </p>

              <span className="text-sm text-teal-700 font-medium">
                Explore rent checks →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-stone-900 text-center mb-3">
          A faster way to sanity-check the numbers
        </h2>

        <p className="text-stone-500 text-center text-sm max-w-2xl mx-auto mb-10">
          Start with the core question: does the property look worth investigating,
          or are the numbers already too fragile?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
            >
              <p className="font-semibold text-stone-900 mb-2">{card.title}</p>
              <p className="text-sm text-stone-600 leading-6">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-stone-900 text-center mb-2">
            Two checks, one clear verdict
          </h2>

          <p className="text-stone-500 text-center text-sm mb-10">
            Residential for yields and cash flow. Commercial for rent burden and break-even risk.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="border border-stone-200 rounded-xl p-6 shadow-sm">
              <p className="font-semibold text-stone-900 mb-1">
                Residential return check
              </p>

              <p className="text-sm text-stone-600 mb-4 leading-6">
                For buy-to-let investors, first-time landlords, renters, buyers,
                overseas buyers, and students checking whether the rent or purchase
                price makes sense.
              </p>

              <Link
                href="/check?mode=residential"
                className="inline-block text-sm text-teal-700 font-medium hover:underline"
              >
                Run residential check →
              </Link>
            </div>

            <div className="border border-stone-200 rounded-xl p-6 shadow-sm">
              <p className="font-semibold text-stone-900 mb-1">
                Commercial site check
              </p>

              <p className="text-sm text-stone-600 mb-4 leading-6">
                For cafes, bars, restaurants, salons, gyms, retail units, offices,
                and small businesses checking if a site can carry the rent.
              </p>

              <Link
                href="/check?mode=commercial"
                className="inline-block text-sm text-teal-700 font-medium hover:underline"
              >
                Run commercial check →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
              Example output
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              A score is useful only if the risk is obvious.
            </h2>

            <p className="text-stone-600 text-sm leading-6">
              YieldLens UK highlights the number that matters, then explains what
              could break the deal. A property with thin cash flow may still be
              worth investigating, but it should not be mistaken for a clean win.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 font-medium">
                  Indicative score
                </p>
                <p className="text-4xl font-bold text-stone-900">
                  67<span className="text-xl text-stone-400">/100</span>
                </p>
              </div>

              <VerdictBadge verdict={exampleVerdict} />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                <p className="text-xs text-stone-400 uppercase tracking-wide">
                  Gross yield
                </p>
                <p className="text-xl font-semibold text-stone-900">5.3%</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                <p className="text-xs text-stone-400 uppercase tracking-wide">
                  Cash flow
                </p>
                <p className="text-xl font-semibold text-stone-900">£29/mo</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-700">
              <p>
                <span className="font-semibold text-stone-900">Verdict:</span>{' '}
                Worth investigating, but the margin is thin.
              </p>

              <p>
                <span className="font-semibold text-stone-900">Main risk:</span>{' '}
                Small changes in rates, service charge, voids, or maintenance could
                wipe out the return.
              </p>

              <p>
                <span className="font-semibold text-stone-900">Next step:</span>{' '}
                Confirm comparable rents and stress-test the full cost base.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-stone-900 text-center mb-2">
            Launch pricing
          </h2>

          <p className="text-stone-500 text-center text-sm mb-10">
            The basic check is free. Detailed PDF reports and human-reviewed reports
            will come later once the workflow is proven.
          </p>

          <PricingCards />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-6 text-sm text-stone-600">
          <p className="font-semibold text-stone-800 mb-2">Important disclaimer</p>

          <p>
            YieldLens UK provides indicative property return checks and
            decision-support analysis only. It is not a formal valuation, financial
            advice, mortgage advice, legal advice, tax advice, or a substitute for
            professional due diligence.
          </p>

          <p className="mt-3">
            YieldLens UK is an independent UK property analysis tool.
          </p>
        </div>
      </section>
    </div>
  );
}
