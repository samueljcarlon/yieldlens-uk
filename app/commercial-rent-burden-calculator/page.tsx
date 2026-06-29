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
  surfaceCardClass,
  surfaceCardSoftClass,
  supportingTextClass,
  tableShellClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Commercial Rent Burden Calculator | Can the Site Carry the Rent?',
  description:
    'See commercial rent as a share of revenue, judge rent pressure, and pressure-test whether a cafe, salon, restaurant, or shop can carry the lease before signing.',
  alternates: {
    canonical: '/commercial-rent-burden-calculator',
  },
  openGraph: {
    title: 'Commercial Rent Burden Calculator | Can the Site Carry the Rent? | YieldLens UK',
    description:
      'See commercial rent as a share of revenue, judge rent pressure, and pressure-test whether a commercial lease can carry the rent before signing.',
    url: 'https://yieldlens.co.uk/commercial-rent-burden-calculator',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is commercial rent burden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial rent burden is monthly rent divided by estimated monthly revenue, multiplied by 100. It shows how much expected revenue is absorbed by rent before other costs are considered.',
      },
    },
    {
      '@type': 'Question',
      name: 'What rent burden is too high for a commercial lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no universal rule. As a rough screen, a lower burden leaves more room for costs and weaker months, a higher burden needs stronger evidence and better margins, and a very high burden should trigger deeper checks before committing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is rent burden enough to judge a commercial site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Rent burden is one screening metric. A lease decision should also test break-even customers, staff costs, rates, utilities, fit-out, opening cash, downside revenue, and survival runway.',
      },
    },
  ],
};

const interpretationBands = [
  {
    range: 'Lower burden',
    label: 'More room for the rest of the cost base',
    text: 'A lighter burden may leave more room for staff, rates, utilities, stock, service charge, and weaker months. The rest of the lease still matters.',
  },
  {
    range: 'Mid range',
    label: 'Can work if the margins are real',
    text: 'This can be workable for some sites, but only if revenue, gross margin, staffing, and utility assumptions are sensible.',
  },
  {
    range: 'Higher burden',
    label: 'Needs stronger evidence',
    text: 'A heavier burden can still work, but it usually needs better margins, better lease terms, or a stronger trading base to support it.',
  },
  {
    range: 'Very high burden',
    label: 'Treat as a warning sign',
    text: 'When rent absorbs too much revenue, the site needs deeper testing before you rely on it, especially if fit-out or deposits are large.',
  },
];

const operatorExamples = [
  {
    title: 'Cafe',
    text: 'Morning and lunch peaks can make rent look fine on a weekly average, but slower afternoons or quieter weekdays still need coverage. The rent burden should be checked against staffing, coffee margin, waste, and opening cash.',
  },
  {
    title: 'Restaurant',
    text: 'Covers per service, kitchen staff, food cost, and quieter trading periods can make rent feel heavier than the headline number suggests. A good service night does not automatically carry a full month of rent pressure.',
  },
  {
    title: 'Salon',
    text: 'Chair utilisation, treatment-room bookings, no-shows, and slower ramp-up can all reduce the room available for rent. The rent burden should sit alongside staffing, water, utilities, and booking consistency.',
  },
];

const pressurePoints = [
  {
    title: 'Staff, rates, and utilities',
    text: 'Rent is only one fixed cost. A site with acceptable rent burden can still fail if staff costs, business rates, utilities, insurance, or service charge are incomplete.',
  },
  {
    title: 'Break-even customers',
    text: 'Rent burden shows pressure as a percentage. Break-even customers translate that pressure into a daily trading target the operator can judge.',
  },
  {
    title: 'Fit-out and opening cash',
    text: 'A site can look workable month to month but still be fragile if deposits, fit-out, legal fees, stock, and setup costs use too much cash before opening.',
  },
  {
    title: 'Downside trading',
    text: 'The full check tests what happens if revenue is weaker than expected and whether the site can survive six difficult early months.',
  },
];

const verificationChecks = [
  'Realistic monthly revenue',
  'VAT treatment where relevant',
  'Service charge',
  'Business rates',
  'Staffing',
  'Stock or cost of sales',
  'Utilities',
  'Opening cash',
  'Seasonality',
  'Lease terms',
];

const funnelLinks = [
  {
    title: 'Commercial rent affordability calculator',
    text: 'Check whether the rent still fits after costs and trading pressure are added.',
    href: '/commercial-rent-affordability-calculator',
  },
  {
    title: 'Commercial lease viability check',
    text: 'Pressure-test rent, opening cash, downside trading, and lease survival before signing.',
    href: '/check?mode=commercial',
  },
  {
    title: 'Sample commercial viability file',
    text: 'See the £49 decision memo structure before unlocking it.',
    href: '/sample-commercial-viability-file',
  },
  {
    title: 'How it works',
    text: 'Learn how YieldLens turns rent and costs into a practical decision view.',
    href: '/how-it-works',
  },
];

function SectionTitle({
  eyebrow,
  title,
  description,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <div className="max-w-3xl mb-10">
      <p className={`text-xs font-medium uppercase tracking-[0.22em] mb-3 ${dark ? 'text-[#D6C7A2]' : 'text-[var(--yieldlens-caution)]'}`}>
        {eyebrow}
      </p>
      <h2 className={`${sectionHeadingClass} ${dark ? '!text-white' : ''} mb-3`}>
        {title}
      </h2>
      {description && (
        <p className={`${supportingTextClass} ${dark ? '!text-stone-300' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function BulletList({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className={`space-y-2 text-sm leading-6 ${dark ? 'text-stone-300' : 'text-[var(--yieldlens-muted)]'}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className={`mt-2 h-1.5 w-1.5 rounded-full ${dark ? 'bg-[#D6C7A2]' : 'bg-[var(--yieldlens-caution)]'} shrink-0`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CommercialRentBurdenCalculatorPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial rent pressure
              </p>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial rent burden calculator
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                How much of revenue should commercial rent take? Rent burden shows how much expected revenue is absorbed by rent before staff, stock, utilities, service charge, and quieter trading months are considered.
              </p>

              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                If you are asking whether a cafe, salon, restaurant, or shop can carry the lease, this is the first screen. The full commercial check goes further and tests opening cash, break-even customers, and downside trading.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="rent_burden_page_cta_clicked"
                  pagePath="/commercial-rent-burden-calculator"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_tool"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="rent_burden_page_cta_clicked"
                  pagePath="/commercial-rent-burden-calculator"
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
                <Link href="/how-it-works" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  How it works
                </Link>
              </div>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 text-stone-900 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
                Quick screen
              </p>
              <div className={tableShellClass}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="p-4 border-b border-r border-[var(--yieldlens-border)]">
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] font-medium">
                      Annual rent
                    </p>
                    <p className="text-2xl font-bold mt-1">£60,000</p>
                  </div>

                  <div className="p-4 border-b border-[var(--yieldlens-border)]">
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] font-medium">
                      Monthly rent
                    </p>
                    <p className="text-2xl font-bold mt-1">£5,000</p>
                  </div>

                  <div className="p-4 border-b border-r border-[var(--yieldlens-border)]">
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] font-medium">
                      Monthly revenue
                    </p>
                    <p className="text-2xl font-bold mt-1">£24,960</p>
                  </div>

                  <div className="p-4 border-b border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)]">
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-caution)] font-medium">
                      Rent burden
                    </p>
                    <p className="text-2xl font-bold mt-1">20%</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                <p className="text-sm text-stone-700 leading-6">
                  A 20% rent burden is high pressure in this rough screen. The full check should test break-even customers, upfront cash, downside revenue, and six-month survival before signing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} mt-8`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Formula"
            title="What commercial rent burden means"
            description="Commercial rent burden shows how much estimated revenue is absorbed by rent before staff, rates, utilities, insurance, stock, tax, and quieter trading periods are considered."
          />

          <div className={`${surfaceCardClass} p-6 sm:p-8`}>
            <p className="text-lg sm:text-2xl font-bold text-stone-900">
              Rent burden = monthly rent ÷ monthly revenue × 100
            </p>
            <p className="text-sm text-[var(--yieldlens-muted)] leading-7 mt-4 max-w-4xl">
              If annual rent is £60,000, monthly rent is £5,000. If estimated monthly revenue is £24,960, rent burden is about 20%. That means rent absorbs roughly one fifth of expected revenue before the rest of the cost base is covered.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Interpretation"
            title="Rough rent burden screening ranges"
            description="These bands are not rules. They are a starting point for deciding whether the site deserves deeper pressure-testing."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {interpretationBands.map((band, index) => (
              <div
                key={band.range}
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
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                  {band.range}
                </p>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {band.label}
                </h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                  {band.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Operator examples"
            title="Rent burden reads differently for each operator."
            description="The same percentage can mean very different pressure once the trading model is stripped back to staff, margins, and quiet periods."
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
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                  {item.title}
                </p>
                <p className="text-sm text-stone-700 leading-7">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why it matters"
            title="High rent burden can make a good-looking site fragile."
            description="A busy-looking unit can still struggle if fixed rent absorbs too much revenue. The danger is not just the rent level, but the pressure rent creates when trading is weaker than expected."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pressurePoints.map((item, index) => (
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
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 items-start">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                What to verify before relying on rent burden
              </p>
              <BulletList items={verificationChecks} />
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-caution)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Where rent burden fits in the funnel
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {funnelLinks.map((link, index) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`${surfaceCardSoftClass} border-t-4 p-4 transition-all hover:border-t-[var(--yieldlens-caution)] hover:shadow-sm ${
                      index === 0
                        ? 'border-t-[var(--yieldlens-positive)]'
                        : index === 1
                          ? 'border-t-[var(--yieldlens-primary)]'
                          : index === 2
                            ? 'border-t-[var(--yieldlens-fragile)]'
                            : 'border-t-[var(--yieldlens-caution)]'
                    }`}
                  >
                    <p className="font-semibold text-stone-900 mb-1">{link.title}</p>
                    <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{link.text}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#D6C7A2] font-medium mb-3">
                Full viability check
              </p>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Rent burden is only the first screen.
              </h2>
              <p className="text-sm text-stone-300 leading-7">
                YieldLens UK goes further by testing break-even customers, monthly cost base, upfront cash needed, cash after opening, downside revenue, monthly burn, and six-month survival.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white p-5 sm:p-6 text-stone-900`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Break-even customers per day',
                  'Upfront cash and fit-out risk',
                  'Cash after opening',
                  'Downside monthly revenue',
                  'Monthly burn or surplus',
                  'Six-month survival test',
                ].map((item) => (
                  <div
                    key={item}
                    className={`${surfaceCardSoftClass} border-t-4 border-t-[var(--yieldlens-caution)] p-4 text-sm font-medium text-stone-800`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="rent_burden_page_cta_clicked"
                  pagePath="/commercial-rent-burden-calculator"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_tool"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="rent_burden_page_cta_clicked"
                  pagePath="/commercial-rent-burden-calculator"
                  ctaLabel="View sample viability file"
                  pageType="seo_tool"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
            Next step
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Pressure-test the full lease, not just the rent.
          </h2>
          <p className="text-sm text-[var(--yieldlens-muted)] leading-7 max-w-2xl mx-auto mb-8">
            The full commercial check connects rent burden to break-even customers, opening cash, downside trading, and six-month survival.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="rent_burden_page_cta_clicked"
              pagePath="/commercial-rent-burden-calculator"
              ctaLabel="Run a free commercial check"
              pageType="seo_tool"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              eventName="rent_burden_page_cta_clicked"
              pagePath="/commercial-rent-burden-calculator"
              ctaLabel="View sample viability file"
              pageType="seo_tool"
              className={heroSecondaryCtaClass}
            >
              View sample viability file
            </TrackedCtaLink>

            <Link
              href="/commercial-rent-affordability-calculator"
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-[var(--yieldlens-caution)] hover:bg-[#F7F6F3]"
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
            YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
