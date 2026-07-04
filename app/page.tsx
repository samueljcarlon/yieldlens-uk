import type { Metadata } from 'next';
import Link from 'next/link';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import VerdictBadge from '@/components/VerdictBadge';
import { primaryCtaClass, secondaryCtaClass, heroPrimaryCtaClass, heroSecondaryCtaClass, surfaceCardClass, surfaceCardSoftClass, disclaimerClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'YieldLens UK | Commercial Rent and Lease Viability Decision-Support',
  description:
    'A commercial rent affordability and lease viability decision-support tool for UK commercial sites. Run a free commercial check first, then unlock the optional £49 Standard Commercial Viability File if the site still deserves deeper scrutiny.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'YieldLens UK | Commercial Rent and Lease Viability Decision-Support',
    description:
      'A commercial rent affordability and lease viability decision-support tool for UK commercial sites. Run a free commercial check first, then unlock the optional £49 Standard Commercial Viability File if the site still deserves deeper scrutiny.',
    url: 'https://yieldlens.co.uk',
  },
};

const exampleVerdict = {
  label: 'Worth investigating' as const,
  score: 67,
  colour: 'green' as const,
};

const featureCards = [
  {
    title: 'Rent and trade pressure',
    desc: 'See whether rent leaves enough room for staffing, stock, service charge, and the break-even volume the site really needs.',
  },
  {
    title: 'Opening capital stack',
    desc: 'Add fit-out, deposit, legal fees, stock, and setup costs before deciding whether the unit still feels workable.',
  },
  {
    title: 'Downside survival',
    desc: 'Test whether the site still holds together when launch trade is softer than expected.',
  },
  {
    title: 'Lease pressure points',
    desc: 'Keep service charge, repairs, rent review, and permitted use in view before heads of terms become expensive.',
  },
];

const builtFor = [
  'Cafes before heads of terms',
  'Restaurants checking rent and covers',
  'Salons testing bookings and cash',
  'Small operators comparing units',
];

const freeCheckShows = [
  'Rent burden',
  'Break-even customers',
  'Opening cash pressure',
  'Downside trading',
  'Six-month survival',
  'Lease questions to verify',
];

const whyThisMatters = [
  'Rent only looks manageable once fit-out, deposit, legal fees, staffing, and utilities are all in the stack.',
  'A good-looking unit can still be commercially fragile if the opening start is weaker than planned.',
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
    title: 'Commercial lease viability guide',
    desc: 'Read about the commercial lease viability check and how it works, then run the free check when ready.',
    href: '/commercial-lease-viability-check',
    cta: 'Read the guide',
    featured: true,
  },
  {
    title: 'Compare two sites',
    desc: 'Compare two possible premises side by side before spending on deeper legal or survey work.',
    href: '/compare',
    cta: 'Compare two sites',
  },
  {
    title: 'How it works',
    desc: 'Learn how the free check, paid file, and sample report fit together before you start.',
    href: '/how-it-works',
    cta: 'Read the methodology',
  },
  {
    title: 'Cafe rent affordability',
    desc: 'Use the cafe guide to compare rent burden, break-even customers, opening cash, and the paid memo.',
    href: '/how-much-rent-can-a-cafe-afford',
    cta: 'Read cafe rent guide',
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

const beforeSigningLinks = [
  {
    href: '/commercial-lease-checklist-before-signing',
    label: 'Commercial lease checklist before signing',
    description: 'Start with the hub that groups the main lease checks.',
  },
  {
    href: '/commercial-lease-costs-before-signing',
    label: 'Commercial lease costs before signing',
    description: 'Check the full cost stack before the lease gets expensive.',
  },
  {
    href: '/commercial-heads-of-terms-before-signing',
    label: 'Commercial heads of terms before signing',
    description: 'Check the early deal points before they are treated as settled.',
  },
  {
    href: '/commercial-break-clause-before-signing',
    label: 'Commercial break clause before signing',
    description: 'Check the exit route if trading weakens after opening.',
  },
];

export default function HomePage() {
  return (
    <div className="bg-stone-50">
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/"
        pageType="homepage"
        mode="commercial"
        eventLabel="Homepage viewed"
      />
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(120,113,108,0.12),transparent_30%)]" />
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Commercial rent and lease viability
              </p>

              <h1 className="text-3xl sm:text-6xl font-bold leading-tight mb-6 max-w-3xl">
                Can this commercial site carry the rent before I sign?
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Free commercial check first. Optional £49 Standard Commercial
                Viability File if the site deserves deeper scrutiny.
              </p>

              <p className="text-sm sm:text-base text-stone-300 max-w-2xl mb-8 leading-7">
                YieldLens UK helps users pressure-test commercial rent, opening
                cash, break-even pressure, and downside trading before deciding
                whether a site is worth taking further.
              </p>

              <p className="text-sm text-stone-400 max-w-2xl mb-8 leading-7">
                No account required. Takes around 2 minutes. Sample available before payment.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Rent burden', 'Break-even customers', 'Opening cash', 'Downside trading', 'Lease questions'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-stone-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/"
                  ctaLabel="Run a free commercial check"
                  pageType="homepage"
                className={heroPrimaryCtaClass}
              >
                Run a free commercial check
              </TrackedCtaLink>

                <Link
                  href="/sample-commercial-viability-file"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </Link>
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                  Who it is for
                </p>
                <div className="flex flex-wrap gap-2">
                  {builtFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:block sm:p-5">
                <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-2">
                  Illustrative use
                </p>
                <p className="text-sm text-stone-200 leading-7">
                  A unit can look attractive on footfall but still be fragile if
                  rent burden, fit-out, deposit, and weak opening months leave too
                  little cash buffer.
                </p>
              </div>

              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not
                financial advice, legal advice, tax advice, a valuation, or a
                substitute for professional due diligence. The Standard commercial
                viability file is £49 and opens from the saved result.
              </p>
            </div>

            <div className={`${surfaceCardClass} overflow-hidden border-white/15 bg-white/5 shadow-[0_12px_28px_rgba(15,23,42,0.12)]`}>
              <div className="border-b border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-amber-400/10 px-5 py-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-medium">
                    Example snapshot
                  </p>
                  <p className="text-3xl font-bold mt-1 tracking-tight">
                    67<span className="text-lg text-stone-400">/100</span>
                  </p>
                  <p className="mt-2 text-sm text-stone-300 max-w-xs leading-6">
                    Worth investigating. Rent burden is elevated, but the site still
                    has room to prove itself if the assumptions are real.
                  </p>
                </div>

                <VerdictBadge verdict={exampleVerdict} />
              </div>

              <div className="grid grid-cols-2 border-b border-white/10">
                <div className="p-4 border-r border-white/10 bg-white/[0.03]">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Rent burden
                  </p>
                  <p className="text-2xl font-bold mt-1 text-[#DCCDA8]">20%</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-5/6 rounded-full bg-gradient-to-r from-green-400 via-white to-amber-400" />
                  </div>
                </div>

                <div className="p-4 bg-white/[0.03]">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Break-even/day
                  </p>
                  <p className="text-2xl font-bold mt-1 text-white">45</p>
                  <p className="mt-3 text-xs text-stone-400">Customers/day needed to cover the current cost base.</p>
                </div>

                <div className="p-4 border-t border-r border-white/10 bg-white/[0.03]">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Upfront cash
                  </p>
                  <p className="text-2xl font-bold mt-1 text-white">£81k</p>
                  <p className="mt-3 text-xs text-stone-400">Fit-out, deposit, fees, stock, and setup costs.</p>
                </div>

                <div className="p-4 border-t border-white/10 bg-white/[0.03]">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Six-month test
                  </p>
                  <p className="text-2xl font-bold mt-1 text-[#DCCDA8]">Lower pressure</p>
                  <p className="mt-3 text-xs text-stone-400">The downside month still needs a buffer, not confidence alone.</p>
                </div>
              </div>

              <div className="p-5 bg-stone-950/40">
                <p className="text-sm text-stone-200 leading-6">
                  Risk flag: the site covers downside monthly costs, but cash
                  left after opening is thin relative to expected revenue.
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm text-stone-500 leading-6">
              See the full paid file format in the{' '}
              <Link href="/sample-commercial-viability-file" className="underline underline-offset-4 hover:text-stone-700">
                sample Standard Commercial Viability File
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-4 items-start">
          <div className={`${surfaceCardClass} p-6 border-t-4 border-t-[var(--yieldlens-caution)]`}>
            <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-3">
              Value comparison
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              Spend £49 before you spend £2,500+.
            </h2>
            <p className="text-sm text-stone-600 leading-7">
              Professional lease reviews, surveys and pre-signing checks can quickly cost £2,500+ before you commit to a site. YieldLens gives you a £49 first-pass viability screen so you can pressure-test rent burden, opening cash, break-even pressure and downside risk before deciding whether to take the lease further.
            </p>
          </div>

          <div className={`${surfaceCardSoftClass} bg-[#F4F3F1] border border-stone-200 p-6`}>
            <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-3">
              Important limits
            </p>
            <p className="text-sm text-stone-600 leading-7">
              YieldLens does not replace solicitors, surveyors, valuations or professional due diligence. It helps you test whether the numbers are worth taking further.
            </p>
            <p className="mt-3 text-xs text-stone-500 leading-6">
              Professional costs vary by lease, property, location and scope. £2,500+ is an indicative comparison for legal review, surveys and pre-signing checks, not a guaranteed cost or saving.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/check?mode=commercial"
                eventName="commercial_home_cta_clicked"
                pagePath="/"
                ctaLabel="Run a free commercial check"
                pageType="homepage"
                className={heroPrimaryCtaClass}
              >
                Run a free commercial check
              </TrackedCtaLink>
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/"
                ctaLabel="View sample viability file"
                pageType="homepage"
                className={heroSecondaryCtaClass}
              >
                View sample viability file
              </TrackedCtaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          <div className={`${surfaceCardClass} p-6`}>
            <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-3">
              Free commercial check
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              What the free check shows
            </h2>
            <p className="text-sm text-stone-600 leading-7 mb-5">
              The free result gives the headline pressure points so you can decide
              whether the unit deserves more time, better terms, or a deeper look in
              the £49 Standard Commercial Viability File.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {freeCheckShows.map((item) => (
                <div key={item} className="rounded-xl border border-stone-200 bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-stone-900">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${surfaceCardSoftClass} bg-[#F4F3F1] border border-stone-200 p-6`}>
            <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-3">
              Why this matters before signing
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              A good-looking unit can still be commercially fragile.
            </h2>
            <div className="space-y-3 text-sm text-stone-600 leading-7">
              {whyThisMatters.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden max-w-6xl mx-auto px-4 py-16">
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">
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
              className={`${surfaceCardClass} p-6 transition-shadow hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]`}
            >
              <p className="w-9 h-9 rounded-full bg-[var(--yieldlens-primary)] text-white text-sm font-semibold flex items-center justify-center mb-5">
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

      <section id="property-tools" className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">
                Property tools
              </p>

              <h2 className="text-3xl font-bold text-stone-900 mb-3">
                Commercial lease viability is the core product.
              </h2>

            <p className="text-sm text-stone-600 leading-7">
              Start with commercial lease viability. Use the quick checks when
              you need a fast rent, yield, or cash-flow view.
            </p>
          </div>

              <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/"
              ctaLabel="Run a free commercial check"
              pageType="homepage"
              className={primaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportingTools.map((tool, index) => (
              <Link
                key={tool.title}
                href={tool.href}
                className={`${surfaceCardClass} border-l-4 p-6 transition-all hover:-translate-y-0.5 ${
                  index % 4 === 0
                    ? 'border-l-[var(--yieldlens-caution)]'
                    : index % 4 === 1
                      ? 'border-l-[var(--yieldlens-primary)]'
                      : index % 4 === 2
                        ? 'border-l-[var(--yieldlens-positive)]'
                        : 'border-l-[var(--yieldlens-fragile)]'
                } ${
                  tool.featured
                    ? 'bg-gradient-to-br from-white via-white to-amber-50 border-[var(--yieldlens-border)] hover:border-[var(--yieldlens-caution)] shadow-[0_18px_42px_rgba(15,23,42,0.08)]'
                    : 'bg-white border-stone-200 hover:border-[var(--yieldlens-caution)]'
                }`}
              >
                {tool.featured ? (
                  <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-3">
                    Core product
                  </p>
                ) : (
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-3">
                    Quick check
                  </p>
                )}
                <p className="font-semibold text-stone-900 mb-2">
                  {tool.title}
                </p>

                <p className="text-sm text-stone-600 leading-6 mb-4">
                  {tool.desc}
                </p>

                <span className="text-sm text-[var(--yieldlens-caution)] font-medium">
                  {tool.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="max-w-3xl mb-5">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">
              Before signing guides
            </p>
            <p className="text-sm text-stone-600 leading-7">
              If a commercial site is still under consideration, start with the checklist hub and the lease guides that shape opening cash and downside risk.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {beforeSigningLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${surfaceCardClass} border-t-4 p-4 transition-all hover:border-t-[var(--yieldlens-caution)] hover:shadow-sm ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-fragile)]'
                        : 'border-t-[var(--yieldlens-risk)]'
                }`}
              >
                <p className="font-semibold text-stone-900 mb-1">{link.label}</p>
                <p className="text-sm text-stone-600 leading-6">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">
              Viability file
            </p>

            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Save the result as a structured commercial viability file.
            </h2>

            <p className="text-sm text-stone-600 leading-7 mb-6">
              The free check gives the first signal. The fuller file organises the
              key metrics, assumptions, risk flags, missing evidence, and next
              questions before you commit.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/"
                ctaLabel="£49 Standard Commercial Viability File"
                pageType="homepage"
                className={secondaryCtaClass}
              >
                £49 Standard Commercial Viability File
              </TrackedCtaLink>

              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/"
                ctaLabel="View sample viability file"
                pageType="homepage"
                className={secondaryCtaClass}
              >
                View sample viability file
              </TrackedCtaLink>
            </div>

            <p className="text-xs text-stone-500 mt-4">
              The Standard Commercial Viability File is £49 and opens from the saved result.
            </p>
          </div>

          <div className="bg-stone-950 text-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
            <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-amber-400/10">
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium">
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
