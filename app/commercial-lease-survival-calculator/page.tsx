import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import {
  disclaimerClass,
  heroBackdropClass,
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  memoBandClass,
  sectionBandClass,
  sectionHeadingClass,
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
  supportingTextClass,
  tableShellClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Commercial Lease Survival Calculator | Weak Trading Stress Test',
  description:
    'Stress-test whether a commercial lease can survive a weak start after rent, fit-out, deposit, staffing, supplier costs, and other setup pressure are included.',
  alternates: {
    canonical: '/commercial-lease-survival-calculator',
  },
  openGraph: {
    title: 'Commercial Lease Survival Calculator | Weak Trading Stress Test | YieldLens UK',
    description:
      'Stress-test whether a commercial lease can survive a weak start after rent, fit-out, deposit, staffing, supplier costs, and other setup pressure are included.',
    url: 'https://yieldlens.co.uk/commercial-lease-survival-calculator',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is commercial lease survival?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial lease survival checks whether a site has enough cash after fit-out, deposits, opening costs, and known monthly costs to survive weak early trading.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the six-month survival test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The six-month survival test passes only if cash after opening is not negative and either the downside case has no monthly burn or cash covers at least six months of downside burn.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is survival runway enough to sign a lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Survival runway is an indicative decision-support screen. Lease decisions should also test rent burden, break-even customers, lease terms, evidence quality, fit-out risk, and professional due diligence.',
      },
    },
  ],
};

const survivalBlocks = [
  {
    title: 'Starting cash',
    text: 'Shows how much cash is available before the opening spend is funded.',
    accent: 'border-t-[var(--yieldlens-caution)]',
  },
  {
    title: 'Upfront setup costs',
    text: 'Adds fit-out, deposit, legal fees, opening stock, and other launch costs.',
    accent: 'border-t-[var(--yieldlens-primary)]',
  },
  {
    title: 'Monthly rent',
    text: 'Measures the fixed lease commitment that the business has to carry every month.',
    accent: 'border-t-[var(--yieldlens-positive)]',
  },
  {
    title: 'Monthly operating costs',
    text: 'Includes staff, rates, utilities, supplier costs, and other known monthly pressure.',
    accent: 'border-t-[var(--yieldlens-fragile)]',
  },
  {
    title: 'Downside revenue',
    text: 'Tests what happens if early trade is slower than expected.',
    accent: 'border-t-[var(--yieldlens-risk)]',
  },
  {
    title: 'Six-month pressure',
    text: 'Checks whether the opening cash buffer can survive a weak start.',
    accent: 'border-t-[var(--yieldlens-caution)]',
  },
];

const openingRiskCards = [
  {
    title: 'Fit-out spend lands before revenue',
    text: 'Furniture, equipment, signage, fixtures, decoration, extraction, and works often need funding before the site proves demand.',
  },
  {
    title: 'Deposits reduce the buffer',
    text: 'Rent deposits, advance rent, legal fees, opening stock, licences, and setup costs can leave less cash for the first months.',
  },
  {
    title: 'Thin cash makes small misses painful',
    text: 'If the opening buffer is small, a quiet launch, delayed works, or one missing cost can quickly change the decision.',
  },
];

const fragilityChecks = [
  {
    title: 'Base case looks fine',
    text: 'The monthly model can look workable when assumptions are confident and trading is steady.',
  },
  {
    title: 'Opening cash is quietly tight',
    text: 'The site becomes fragile if fit-out, deposits, fees, and stock consume almost all starting cash before opening day.',
  },
  {
    title: 'Weak trading exposes the gap',
    text: 'A downside case shows whether the site can handle quieter weeks, slower ramp-up, or a lower average spend.',
  },
  {
    title: 'No burn is not the whole answer',
    text: 'If cash after opening is thin, the site may pass the downside month but still have little room for delays or missed costs.',
  },
];

const operatorExamples = [
  {
    title: 'Cafe',
    text: 'A cafe may need time to build repeat morning trade. Equipment, seating, waste, and labour can create a heavy opening month even when the location feels strong.',
  },
  {
    title: 'Restaurant',
    text: 'A restaurant can face delayed opening, kitchen fit-out, extraction work, and rota costs before it sees stable covers.',
  },
  {
    title: 'Salon',
    text: 'A salon may need a booking ramp-up, strong chair utilisation, and low no-shows before the rent feels comfortable.',
  },
];

const improveSurvival = [
  'Rent-free period',
  'Staged fit-out',
  'Landlord contribution',
  'Lower deposit',
  'Phased staffing',
  'Renegotiated rent',
  'Break clause',
  'Stronger opening cash buffer',
];

const connectionItems = [
  {
    title: 'Rent burden',
    text: 'Rent burden shows how much expected revenue is absorbed by rent before the rest of the cost base is considered.',
    href: '/commercial-rent-burden-calculator',
    label: 'View rent burden calculator',
  },
  {
    title: 'Break-even customers',
    text: 'Break-even customers translate rent and known monthly costs into a daily trading target.',
    href: '/break-even-customers-calculator',
    label: 'View break-even calculator',
  },
];

const fullCheckItems = [
  'Executive verdict',
  'Rent burden analysis',
  'Break-even customers per day',
  'Upfront cash needed',
  'Cash after opening',
  'Downside monthly revenue',
  'Monthly burn or surplus',
  'Six-month survival test',
  'Fit-out and opening cost risk',
  'Recommended next checks',
];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl mb-10">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
        {eyebrow}
      </p>
      <h2 className={`${sectionHeadingClass} mb-3`}>{title}</h2>
      {description && <p className={`${supportingTextClass}`}>{description}</p>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CommercialLeaseSurvivalCalculatorPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial survival pressure
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial lease survival calculator
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Can this commercial lease survive a weak start? Survival is about whether the business can absorb slower early trade after rent, fit-out, deposit, staffing, supplier costs, and other operating costs are included.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use it when you want to know how much cash buffer you need before signing and whether the opening spend leaves enough room to survive the first six months.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="lease_survival_page_cta_clicked"
                  pagePath="/commercial-lease-survival-calculator"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_tool"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="lease_survival_page_cta_clicked"
                  pagePath="/commercial-lease-survival-calculator"
                  ctaLabel="View sample viability file"
                  pageType="seo_tool"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
                <Link href="/commercial-rent-affordability-calculator" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial rent affordability calculator
                </Link>
                <Link href="/commercial-rent-burden-calculator" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial rent burden calculator
                </Link>
                <Link href="/how-it-works" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  How it works
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                What the check tests
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {survivalBlocks.map((item) => (
                  <div key={item.title} className={`${surfaceCardSoftClass} ${item.accent} border-t-4 p-4`}>
                    <p className="font-semibold text-stone-900 mb-2">{item.title}</p>
                    <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} mt-8`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What a survival check should test"
            title="The question is not just whether the business can make a monthly profit."
            description="Survival is about how much cash is left after the opening spend is funded, and whether that buffer is enough to absorb a weak start."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {openingRiskCards.map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : 'border-t-[var(--yieldlens-fragile)]'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                  {item.title}
                </p>
                <p className="text-sm text-stone-700 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why weak opening months matter"
            title="A site can look workable in the base case and still be fragile at launch."
            description="If trade starts slower than expected, fit-out costs increase, the opening is delayed, or the rent-free period is too short, the same lease can become much harder to carry."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fragilityChecks.map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-fragile)]'
                        : 'border-t-[var(--yieldlens-risk)]'
                }`}
              >
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Operator examples"
            title="Survival looks different for each operator."
            description="The same rent pressure can feel more or less dangerous depending on how the site trades."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {operatorExamples.map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : 'border-t-[var(--yieldlens-fragile)]'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">{item.title}</p>
                <p className="text-sm text-stone-700 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What can improve survival"
            title="These levers can make the same lease much easier to carry."
            description="Better lease terms or a stronger opening cash buffer can turn a fragile plan into a more workable one."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {improveSurvival.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-4 sm:p-5 text-sm font-medium text-stone-800 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-primary)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-fragile)]'
                          : index === 4
                            ? 'border-t-[var(--yieldlens-positive)]'
                            : index === 5
                              ? 'border-t-[var(--yieldlens-risk)]'
                              : index === 6
                                ? 'border-t-[var(--yieldlens-caution)]'
                                : 'border-t-[var(--yieldlens-primary)]'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Six-month test"
            title="The survival test needs both opening cash and downside resilience."
            description="The site passes only if cash after opening is not negative and either the downside case has no monthly burn or cash covers at least six months of downside burn."
          />

          <div className={`${tableShellClass} bg-white`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                'If cash after opening is negative, the site fails before the trading case is tested.',
                'If downside revenue still covers known costs, the buffer matters more than the monthly burn.',
                'If downside revenue falls below the cost base, survival depends on how long the opening cash lasts.',
              ].map((item, index) => (
                <div
                  key={item}
                  className={`p-5 sm:p-6 border-b md:border-b-0 md:border-r last:border-r-0 border-[var(--yieldlens-border)] text-sm leading-7 text-stone-700 ${
                    index === 0
                      ? 'bg-[var(--yieldlens-panel)]'
                      : index === 1
                        ? 'bg-white'
                        : 'bg-[var(--yieldlens-panel)]'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What YieldLens helps with"
            title="The free check gives a fast survival snapshot."
            description="The £49 Standard file turns the result into a decision memo with downside interpretation, negotiation levers, evidence checklist, and lease questions."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <BulletList
                items={[
                  'Upfront cash needed, cash after opening, downside revenue, monthly burn or surplus, and six-month survival.',
                  'A fast snapshot that highlights whether the opening buffer looks thin.',
                  'Useful when the key question is whether the lease deserves deeper work.',
                ]}
              />
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Standard file
              </p>
              <BulletList
                items={[
                  'Downside interpretation, negotiation levers, evidence checklist, and lease questions.',
                  'A printable commercial decision memo tied to the saved result.',
                  'Useful when the numbers need to become a decision path before signing.',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-caution)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Related checks
              </p>
              <div className="grid grid-cols-1 gap-3">
                {connectionItems.map((item, index) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`${surfaceCardSoftClass} border-t-4 p-4 transition-all hover:border-t-[var(--yieldlens-caution)] hover:shadow-sm ${
                      index === 0
                        ? 'border-t-[var(--yieldlens-positive)]'
                        : 'border-t-[var(--yieldlens-primary)]'
                    }`}
                  >
                    <p className="font-semibold text-stone-900 mb-1">{item.title}</p>
                    <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{item.text}</p>
                    <p className="mt-3 text-sm font-semibold text-[var(--yieldlens-primary)]">{item.label}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                How the result should help you decide
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Can this unit survive a weak start?',
                  'How much cash buffer is needed before signing?',
                  'Do the opening costs leave enough runway?',
                  'Should the lease terms be renegotiated?',
                  'Is the site worth a deeper commercial check?',
                  'Should you move to the viability file?',
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`${surfaceCardSoftClass} border-t-4 p-4 text-sm font-medium text-stone-800 ${
                      index === 0
                        ? 'border-t-[var(--yieldlens-caution)]'
                        : index === 1
                          ? 'border-t-[var(--yieldlens-primary)]'
                          : index === 2
                            ? 'border-t-[var(--yieldlens-fragile)]'
                            : index === 3
                              ? 'border-t-[var(--yieldlens-risk)]'
                              : index === 4
                                ? 'border-t-[var(--yieldlens-positive)]'
                                : 'border-t-[var(--yieldlens-caution)]'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
            Pressure-test the lease before opening costs lock you in.
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Run a free commercial check, then decide whether the site deserves deeper work.
          </h2>
          <p className="text-sm text-[var(--yieldlens-muted)] leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge opening cash, downside trading, and survival runway before a lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="lease_survival_page_cta_clicked"
              pagePath="/commercial-lease-survival-calculator"
              ctaLabel="Run a free commercial check"
              pageType="seo_tool"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              eventName="lease_survival_page_cta_clicked"
              pagePath="/commercial-lease-survival-calculator"
              ctaLabel="View sample viability file"
              pageType="seo_tool"
              className={heroSecondaryCtaClass}
            >
              View sample viability file
            </TrackedCtaLink>
            <Link href="/commercial-lease-viability-check" className={secondaryCtaClass}>
              Commercial lease viability check
            </Link>
          </div>
        </div>
      </section>

      <section className={`${memoBandClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-5xl my-14`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8 text-sm text-stone-300 leading-7 text-center">
          <p className="font-semibold text-[#D6C7A2] mb-2">Important disclaimer</p>
          <p className={disclaimerClass}>
            YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
