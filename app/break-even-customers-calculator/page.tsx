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
  title: 'Break-Even Customers Calculator | Commercial Rent and Daily Trade',
  description:
    'Estimate customers per day needed to cover rent, operating costs, and lease pressure before signing a commercial lease.',
  alternates: {
    canonical: '/break-even-customers-calculator',
  },
  openGraph: {
    title: 'Break-Even Customers Calculator | Commercial Rent and Daily Trade | YieldLens UK',
    description:
      'Estimate customers per day needed to cover rent, operating costs, and lease pressure before signing a commercial lease.',
    url: 'https://yieldlens.co.uk/break-even-customers-calculator',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are break-even customers per day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Break-even customers per day estimates how many customers a commercial site needs each trading day to cover its monthly cost base, based on average spend and opening days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should be included in monthly cost base?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monthly cost base should include rent, staff, utilities, business rates, service charge, insurance, and other regular costs where applicable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is break-even enough to judge a commercial lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Break-even customers are a useful screen, but lease viability also needs rent burden, upfront cash, fit-out risk, downside revenue, monthly burn, and survival runway.',
      },
    },
  ],
};

const whatToInclude = [
  {
    title: 'Rent',
    text: 'Use the monthly rent figure, not just the annual headline rent.',
  },
  {
    title: 'Service charge and business rates',
    text: 'Include recurring lease and property costs that still need to be paid every month.',
  },
  {
    title: 'Staffing',
    text: 'Include realistic rota cover, employer costs, and owner pay if the site depends on it.',
  },
  {
    title: 'Stock or cost of sales',
    text: 'Use a realistic margin assumption so the customer target is not too optimistic.',
  },
  {
    title: 'Utilities and other monthly costs',
    text: 'Add electricity, gas, water, broadband, waste, insurance, and any other regular operating costs.',
  },
  {
    title: 'Opening hours and trading days',
    text: 'The target changes if the site opens fewer days or shorter hours than expected.',
  },
  {
    title: 'Average spend',
    text: 'The calculation is only useful if the average spend is realistic for the site and operator.',
  },
  {
    title: 'Realistic customer volume',
    text: 'Footfall, conversion rate, and repeat trade all affect whether the target is believable.',
  },
];

const operatorExamples = [
  {
    title: 'Cafe',
    text: 'Average coffee and lunch spend, seating, takeaway mix, and morning peak trade can make the daily customer target feel very different from the monthly number.',
  },
  {
    title: 'Restaurant',
    text: 'Covers per service, table turns, daypart demand, and staff rota pressure all affect how many customers are needed each day.',
  },
  {
    title: 'Salon',
    text: 'Treatment duration, chairs or rooms, booking utilisation, and no-shows can change the achievable daily customer volume.',
  },
  {
    title: 'Retailer',
    text: 'Footfall, conversion rate, basket size, and repeat trade are often more useful than a simple average spend assumption.',
  },
];

const improveTarget = [
  'Lower rent',
  'Longer rent-free period',
  'Lower fixed costs',
  'Higher average spend',
  'Better margin',
  'Stronger repeat trade',
  'Longer opening hours only if staffing still works',
  'Staged staffing or fit-out',
];

const relatedLinks = [
  { href: '/check?mode=commercial', label: 'Commercial lease viability check' },
  { href: '/commercial-rent-affordability-calculator', label: 'Commercial rent affordability calculator' },
  { href: '/commercial-rent-burden-calculator', label: 'Commercial rent burden calculator' },
  { href: '/commercial-lease-survival-calculator', label: 'Commercial lease survival calculator' },
  { href: '/sample-commercial-viability-file', label: 'Sample viability file' },
  { href: '/viability-file', label: 'Viability file' },
  { href: '/how-it-works', label: 'How it works' },
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

export default function BreakEvenCustomersCalculatorPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial trading pressure
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Break-even customers calculator
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                How many customers per day do you need to cover rent and costs? Break-even customers turn rent and costs into a daily trade target, making optimistic revenue assumptions easier to challenge before signing.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use it when you want to know whether a cafe, salon, restaurant, or shop can realistically carry the lease before you commit.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="break_even_page_cta_clicked"
                  pagePath="/break-even-customers-calculator"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_tool"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="break_even_page_cta_clicked"
                  pagePath="/break-even-customers-calculator"
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
                Quick break-even screen
              </p>
              <div className={tableShellClass}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="p-4 border-b border-r border-[var(--yieldlens-border)]">
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] font-medium">
                      Monthly cost base
                    </p>
                    <p className="text-2xl font-bold mt-1">£17,600</p>
                  </div>
                  <div className="p-4 border-b border-[var(--yieldlens-border)]">
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] font-medium">
                      Average spend
                    </p>
                    <p className="text-2xl font-bold mt-1">£12.50</p>
                  </div>
                  <div className="p-4 border-b border-r border-[var(--yieldlens-border)]">
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] font-medium">
                      Opening days/month
                    </p>
                    <p className="text-2xl font-bold mt-1">26</p>
                  </div>
                  <div className="p-4 border-b border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)]">
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-caution)] font-medium">
                      Customers/day
                    </p>
                    <p className="text-2xl font-bold mt-1">55</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                <p className="text-sm text-stone-700 leading-6">
                  55 customers per trading day is the target needed just to cover the known monthly cost base in this example. The full check should test rent burden, cash after opening, downside revenue, and six-month survival before signing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} mt-8`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What it should include"
            title="Break-even customers should reflect the real monthly cost base."
            description="The calculation is only useful if it includes the costs that the lease and trading model will actually carry."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatToInclude.map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-positive)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-fragile)]'
                          : index === 4
                            ? 'border-t-[var(--yieldlens-risk)]'
                            : index === 5
                              ? 'border-t-[var(--yieldlens-caution)]'
                              : index === 6
                                ? 'border-t-[var(--yieldlens-primary)]'
                                : 'border-t-[var(--yieldlens-positive)]'
                }`}
              >
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why daily targets matter"
            title="A monthly forecast becomes sharper when it turns into a customer target."
            description="Monthly revenue can sound reasonable until it becomes a number of customers per day. That matters when trade is seasonal, weather-dependent, or still building."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'A daily target is easier to compare with real footfall and trading hours.',
              'It shows whether the site depends on heroic assumptions to work.',
              'It exposes where seasonal or weather-driven demand makes the lease harder to carry.',
              'It helps separate busy-looking units from units that can actually pay the bills.',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-fragile)]'
                        : 'border-t-[var(--yieldlens-risk)]'
                }`}
              >
                <p className="text-sm text-stone-700 leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Operator examples"
            title="The customer target depends on the business model."
            description="The same rent and cost base can feel very different depending on how the site trades."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operatorExamples.map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-fragile)]'
                        : 'border-t-[var(--yieldlens-risk)]'
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
            eyebrow="What can improve the target"
            title="These levers can lower the daily customer requirement."
            description="A better lease structure or a stronger margin profile can make the same site more realistic."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {improveTarget.map((item, index) => (
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
                            ? 'border-t-[var(--yieldlens-risk)]'
                            : index === 5
                              ? 'border-t-[var(--yieldlens-positive)]'
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
            eyebrow="Connected checks"
            title="Break-even works best when read alongside rent burden."
            description="One view gives the daily target, the other shows how much revenue rent absorbs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: 'Rent burden',
                text: 'Shows whether rent is taking too much of expected revenue before staff and other costs are considered.',
                href: '/commercial-rent-burden-calculator',
                label: 'View rent burden calculator',
              },
              {
                title: 'Commercial lease viability',
                text: 'Connects the daily target to opening cash, downside trading, and six-month survival.',
                href: '/commercial-lease-viability-check',
                label: 'View lease viability check',
              },
            ].map((item, index) => (
              <div key={item.title} className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${index === 0 ? 'border-t-[var(--yieldlens-positive)]' : 'border-t-[var(--yieldlens-caution)]'}`}>
                <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6 mb-4">{item.text}</p>
                <TrackedCtaLink
                  href={item.href}
                  eventName="break_even_page_cta_clicked"
                  pagePath="/break-even-customers-calculator"
                  ctaLabel={item.label}
                  pageType="seo_tool"
                  className={heroSecondaryCtaClass}
                >
                  {item.label}
                </TrackedCtaLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What the full check adds"
            title="The free check gives a fast daily target view."
            description="The £49 Standard file turns the result into a decision memo with stress-test interpretation, negotiation levers, evidence checklist, and lease questions."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <BulletList
                items={[
                  'Daily customer target, monthly cost base, average spend, and trading days.',
                  'A fast view of whether the target feels realistic.',
                  'Useful when the question is whether the site deserves deeper work.',
                ]}
              />
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Standard file
              </p>
              <BulletList
                items={[
                  'Stress-test interpretation, negotiation levers, evidence checklist, and lease questions.',
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
                Related pages
              </p>
              <div className="grid grid-cols-1 gap-3">
                {relatedLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${surfaceCardSoftClass} border-t-4 p-4 transition-all hover:border-t-[var(--yieldlens-caution)] hover:shadow-sm ${
                      index === 0
                        ? 'border-t-[var(--yieldlens-positive)]'
                        : index === 1
                          ? 'border-t-[var(--yieldlens-primary)]'
                          : index === 2
                            ? 'border-t-[var(--yieldlens-fragile)]'
                            : index === 3
                              ? 'border-t-[var(--yieldlens-risk)]'
                              : index === 4
                                ? 'border-t-[var(--yieldlens-caution)]'
                                : index === 5
                                  ? 'border-t-[var(--yieldlens-primary)]'
                                  : 'border-t-[var(--yieldlens-positive)]'
                    }`}
                  >
                    <p className="font-semibold text-stone-900 mb-1">{link.label}</p>
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
                  'How many customers per day are needed to carry the lease?',
                  'Is the target realistic for the location and trading hours?',
                  'What average spend is needed to make the numbers work?',
                  'Do staffing and cost assumptions leave enough room?',
                  'Should the lease be renegotiated before signing?',
                  'Is the site worth a deeper commercial check?',
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
            Pressure-test the daily target before you commit.
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Run a free commercial check, then decide whether the site deserves deeper work.
          </h2>
          <p className="text-sm text-[var(--yieldlens-muted)] leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge break-even customers, rent pressure, opening cash, and downside trading before a lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="break_even_page_cta_clicked"
              pagePath="/break-even-customers-calculator"
              ctaLabel="Run a free commercial check"
              pageType="seo_tool"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              eventName="break_even_page_cta_clicked"
              pagePath="/break-even-customers-calculator"
              ctaLabel="View sample viability file"
              pageType="seo_tool"
              className={heroSecondaryCtaClass}
            >
              View sample viability file
            </TrackedCtaLink>
            <Link
              href="/commercial-rent-affordability-calculator"
              className={secondaryCtaClass}
            >
              Commercial rent affordability calculator
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
