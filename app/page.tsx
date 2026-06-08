import Link from 'next/link';
import PricingCards from '@/components/PricingCards';
import VerdictBadge from '@/components/VerdictBadge';

const exampleVerdict = {
  label: 'Worth investigating' as const,
  score: 72,
  colour: 'teal' as const,
};

const valueCards = [
  {
    title: 'Yield estimate',
    desc: 'Indicative gross yield calculated from your purchase price and expected rent.',
  },
  {
    title: 'Cash flow snapshot',
    desc: 'Estimated monthly and annual cash flow against known ownership costs.',
  },
  {
    title: 'Risk flags',
    desc: 'Automatic flags for weak yields, negative cash flow, and missing data.',
  },
  {
    title: 'Clear verdict',
    desc: 'A decision-support score and plain-English verdict from Avoid to Strong candidate.',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-4">
            UK property return screening
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">
            Check whether a UK property actually makes financial sense.
          </h1>

          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
            Paste a listing or enter a postcode to get an indicative yield estimate,
            risk score, cash flow snapshot, and clear verdict before you view, buy,
            rent, invest, or sign.
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
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-stone-900 text-center mb-10">
          What you get
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
            >
              <p className="font-semibold text-stone-900 mb-2">{card.title}</p>
              <p className="text-sm text-stone-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-stone-900 text-center mb-2">
            Residential or commercial?
          </h2>

          <p className="text-stone-500 text-center text-sm mb-10">
            YieldLens UK covers both buy-to-let and commercial site checks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="border border-stone-200 rounded-xl p-6">
              <p className="font-semibold text-stone-900 mb-1">
                Residential return check
              </p>

              <p className="text-sm text-stone-600 mb-4">
                Buy-to-let investors, first-time landlords, overseas buyers, and
                renters checking rent reasonableness.
              </p>

              <Link
                href="/check?mode=residential"
                className="inline-block text-sm text-teal-700 font-medium hover:underline"
              >
                Run residential check →
              </Link>
            </div>

            <div className="border border-stone-200 rounded-xl p-6">
              <p className="font-semibold text-stone-900 mb-1">
                Commercial site check
              </p>

              <p className="text-sm text-stone-600 mb-4">
                Cafes, bars, restaurants, salons, gyms, retail units, and offices
                checking site viability before signing a lease.
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
              Numbers first. Waffle later.
            </h2>

            <p className="text-stone-600 text-sm leading-6">
              YieldLens UK is built around practical decision support. The
              first screen should tell the user whether the property is worth
              investigating, what the key return estimate looks like, and what
              could break the deal.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 font-medium">
                  Indicative score
                </p>
                <p className="text-4xl font-bold text-stone-900">
                  72<span className="text-xl text-stone-400">/100</span>
                </p>
              </div>

              <VerdictBadge verdict={exampleVerdict} />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                <p className="text-xs text-stone-400 uppercase tracking-wide">
                  Gross yield
                </p>
                <p className="text-xl font-semibold text-stone-900">5.2%</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                <p className="text-xs text-stone-400 uppercase tracking-wide">
                  Verdict
                </p>
                <p className="text-xl font-semibold text-stone-900">
                  Investigate
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold text-stone-900">Main upside:</span>{' '}
                Return profile looks plausible on the current assumptions.
              </p>

              <p>
                <span className="font-semibold text-stone-900">Main risk:</span>{' '}
                Net yield depends heavily on service charge, mortgage cost, and
                achievable rent.
              </p>

              <p>
                <span className="font-semibold text-stone-900">Next step:</span>{' '}
                Confirm comparable rents and full running costs.
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
            Start with the free check. Paid reports come later once the workflow is proven.
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
