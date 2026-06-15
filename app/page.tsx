import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import VerdictBadge from '@/components/VerdictBadge';

export const metadata: Metadata = {
  title: 'YieldLens UK | Commercial Lease Viability Check',
  description:
    'Check whether a commercial site can carry the rent before you sign. YieldLens UK pressure-tests rent burden, break-even customers, upfront cash, downside trading, and lease questions before a commercial commitment.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'YieldLens UK | Commercial Lease Viability Check',
    description:
      'Check whether a commercial site can carry the rent before you sign. YieldLens UK pressure-tests rent burden, break-even customers, upfront cash, downside trading, and lease questions before a commercial commitment.',
    url: 'https://yieldlens.co.uk',
  },
};

const exampleVerdict = {
  label: 'Worth investigating' as const,
  score: 67,
  colour: 'teal' as const,
};

const featureCards = [
  {
    title: 'Rent burden',
    desc: 'Compare monthly rent with expected monthly revenue before the lease becomes a fixed obligation.',
  },
  {
    title: 'Break-even customers',
    desc: 'Estimate how many customers per day are needed to cover rent and known operating costs.',
  },
  {
    title: 'Upfront cash needed',
    desc: 'Add fit-out, deposit, legal fees, opening stock, and setup costs before judging the site.',
  },
  {
    title: 'Downside revenue',
    desc: 'Test whether the site still works when revenue is weaker than expected.',
  },
  {
    title: 'Six-month survival',
    desc: 'Check whether cash after opening can cover a difficult early trading period.',
  },
];

const howItWorks = [
  {
    step: '1',
    title: 'Enter the lease and trading assumptions',
    desc: 'Add rent, customers, average spend, opening days, staff costs, rates, utilities, fit-out, deposit, fees, stock, starting cash, and downside revenue.',
  },
  {
    step: '2',
    title: 'Pressure-test the commitment',
    desc: 'YieldLens turns the inputs into rent burden, break-even customers, upfront cash needed, cash after opening, downside burn, and survival runway.',
  },
  {
    step: '3',
    title: 'Decide what to check next',
    desc: 'Use the result to spot weak assumptions and identify the questions to raise before viewings, heads of terms, legal work, or signing.',
  },
];

const supportingTools = [
  {
    title: 'Commercial lease viability',
    desc: 'Read how the commercial lease survival model works before running the check.',
    href: '/commercial-lease-viability-check',
    cta: 'Explore commercial viability',
    featured: true,
  },
  {
    title: 'Residential property check',
    desc: 'Screen a residential rent, purchase, or buy-to-let decision with yield, cash flow, assumptions, and risk flags.',
    href: '/check?mode=residential',
    cta: 'Run residential check',
  },
  {
    title: 'Rent affordability calculator',
    desc: 'Sanity-check rent against income and wider living-cost pressure before committing to a residential tenancy.',
    href: '/rent-affordability-check',
    cta: 'Explore rent affordability',
  },
  {
    title: 'Property cash flow calculator',
    desc: 'Check whether a property produces monthly surplus after mortgage, service charge, ground rent, and known ownership costs.',
    href: '/property-cash-flow-calculator',
    cta: 'Explore cash flow',
  },
  {
    title: 'Buy-to-let yield calculator',
    desc: 'Estimate gross yield, ownership costs, monthly cash flow, and downside risk before spending serious time on a rental property.',
    href: '/buy-to-let-yield-calculator',
    cta: 'Explore buy-to-let',
  },
];

export default function HomePage() {
  return (
    <div className="bg-stone-50">
      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
                Commercial lease survival model
              </p>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Check whether a commercial site can carry the rent before you sign.
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                YieldLens UK pressure-tests rent burden, break-even customers,
                upfront cash, downside trading, and lease questions before a
                commercial commitment.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/"
                  ctaLabel="Run commercial site check"
                  pageType="homepage"
                  className="bg-teal-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-teal-400 transition-colors text-sm text-center"
                >
                  Run commercial site check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/"
                  ctaLabel="View viability file"
                  pageType="homepage"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View viability file
                </TrackedCtaLink>
              </div>

              <Link
                href="/sample-commercial-viability-file"
                className="inline-flex mt-4 text-sm font-medium text-teal-300 hover:text-teal-200"
              >
                View sample file
              </Link>

              <p className="text-xs text-stone-400 mt-5">
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.
              </p>

              <p className="text-xs text-stone-400 mt-3">
                Standard commercial viability file is £49 after a commercial report request.
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/5 overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-medium">
                    Example output
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    67<span className="text-lg text-stone-400">/100</span>
                  </p>
                </div>

                <VerdictBadge verdict={exampleVerdict} />
              </div>

              <div className="grid grid-cols-2 border-b border-white/10">
                <div className="p-4 border-r border-white/10">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Rent burden
                  </p>
                  <p className="text-2xl font-bold mt-1">20%</p>
                </div>

                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Break-even/day
                  </p>
                  <p className="text-2xl font-bold mt-1">45</p>
                </div>

                <div className="p-4 border-t border-r border-white/10">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Upfront cash
                  </p>
                  <p className="text-2xl font-bold mt-1">£81k</p>
                </div>

                <div className="p-4 border-t border-white/10">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Six-month test
                  </p>
                  <p className="text-2xl font-bold mt-1 text-teal-300">Pass</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-stone-200 leading-6">
                  Risk flag: the site covers downside monthly costs, but cash
                  left after opening is thin relative to expected revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="border border-stone-200 bg-stone-50 rounded-lg p-4 shadow-sm"
              >
                <p className="font-semibold text-stone-900 mb-2">{card.title}</p>
                <p className="text-sm text-stone-600 leading-6">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
            How it works
          </p>

          <h2 className="text-3xl font-bold text-stone-900 mb-3">
            Turn a lease decision into numbers you can challenge.
          </h2>

          <p className="text-sm text-stone-600 leading-7">
            Use the check as an initial screen before the site absorbs legal
            fees, fit-out planning, negotiation time, or a deposit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {howItWorks.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm"
            >
              <p className="w-9 h-9 rounded-full bg-teal-700 text-white text-sm font-semibold flex items-center justify-center mb-5">
                {item.step}
              </p>

              <h3 className="font-semibold text-stone-900 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-stone-600 leading-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="property-tools" className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
                Property tools
              </p>

              <h2 className="text-3xl font-bold text-stone-900 mb-3">
                Commercial is the main wedge. Other checks stay secondary.
              </h2>

              <p className="text-sm text-stone-600 leading-7">
                YieldLens UK is built around commercial lease viability. The
                supporting tools remain available for residential rent, yield,
                and cash flow questions.
              </p>
            </div>

            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/"
              ctaLabel="Run commercial check"
              pageType="homepage"
              className="bg-teal-700 text-white px-5 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm text-center"
            >
              Run commercial check
            </TrackedCtaLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportingTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className={`border rounded-lg p-6 shadow-sm transition-colors ${
                  tool.featured
                    ? 'bg-teal-50 border-teal-200 hover:border-teal-300'
                    : 'bg-white border-stone-200 hover:border-teal-300'
                }`}
              >
                <p className="font-semibold text-stone-900 mb-2">
                  {tool.title}
                </p>

                <p className="text-sm text-stone-600 leading-6 mb-4">
                  {tool.desc}
                </p>

                <span className="text-sm text-teal-700 font-medium">
                  {tool.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
              Viability file
            </p>

            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Save the result as a structured commercial viability file.
            </h2>

            <p className="text-sm text-stone-600 leading-7 mb-6">
              The free check gives the first signal. The fuller file organises
              the key metrics, assumptions, risk flags, missing evidence, and
              next questions before you commit.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/"
                ctaLabel="View viability file"
                pageType="homepage"
                className="bg-stone-950 text-white px-5 py-3 rounded font-medium hover:bg-stone-800 transition-colors text-sm text-center"
              >
                View viability file
              </TrackedCtaLink>

              <TrackedCtaLink
                href="/check?mode=commercial"
                eventName="commercial_home_cta_clicked"
                pagePath="/"
                ctaLabel="Run free check first"
                pageType="homepage"
                className="bg-white text-stone-700 border border-stone-300 px-5 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
              >
                Run free check first
              </TrackedCtaLink>
            </div>

            <p className="text-xs text-stone-500 mt-4">
              The standard commercial viability file is £49 and appears after a commercial report request.
            </p>
          </div>

          <div className="bg-stone-950 text-white rounded-lg overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-white/10">
              <p className="text-xs uppercase tracking-widest text-teal-300 font-medium">
                Commercial viability file
              </p>
            </div>

            <div className="divide-y divide-white/10">
              {[
                'Executive verdict and site snapshot',
                'Rent burden and break-even customers',
                'Upfront cash and cash after opening',
                'Downside trading and six-month survival',
                'Lease questions and missing evidence checklist',
              ].map((item) => (
                <p key={item} className="px-6 py-4 text-sm text-stone-200">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-stone-600 leading-6">
          <p className="font-semibold text-stone-800 mb-2">Important disclaimer</p>

          <p>
            YieldLens UK provides indicative commercial lease viability checks,
            property pressure-tests, and decision-support analysis only. It is
            not financial advice, legal advice, tax advice, a valuation, or a
            substitute for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
