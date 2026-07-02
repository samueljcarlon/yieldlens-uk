import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
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
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Rental Valuation vs Rent Affordability | What a Valuation Misses',
  description:
    'Understand the difference between estimated rental value, rent affordability, and commercial lease viability before relying on a rent figure. YieldLens focuses on affordability, not valuation.',
  alternates: {
    canonical: '/rental-valuation-vs-rent-affordability',
  },
  openGraph: {
    title: 'Rental Valuation vs Rent Affordability | What a Valuation Misses',
    description:
      'Understand the difference between estimated rental value, rent affordability, and commercial lease viability before relying on a rent figure. YieldLens focuses on affordability, not valuation.',
    url: 'https://yieldlens.co.uk/rental-valuation-vs-rent-affordability',
  },
};

const faqItems = [
  {
    question: 'Does YieldLens provide a rental valuation?',
    answer:
      'No. YieldLens UK does not provide a valuation or a formal market rent figure. It helps pressure-test whether a rent estimate still works after costs, voids, and cash flow are included.',
  },
  {
    question: 'What is a rental valuation?',
    answer:
      'A rental valuation is an estimate of what rent a property might achieve in the market, based on comparable evidence and professional judgment.',
  },
  {
    question: 'What is rent affordability?',
    answer:
      'Rent affordability asks whether the rent still fits the budget after costs, voids, finance, and other real monthly pressures are included.',
  },
  {
    question: 'Why does this matter for commercial units?',
    answer:
      'A commercial rent can look reasonable on paper and still be too heavy for a cafe, restaurant, salon, or retailer once fit-out, staffing, deposits, service charge, and a slower opening period are included.',
  },
  {
    question: 'Which YieldLens page should I use?',
    answer:
      'Use this bridge page if you are comparing rent terms or trying to understand the difference between valuation and affordability. For commercial units, run the commercial lease viability check. For residential affordability, use the rent affordability check or cash flow tools.',
  },
  {
    question: 'Should I still speak to a professional?',
    answer:
      'Yes. YieldLens structures the numbers and questions, but it does not replace an agent, valuer, surveyor, solicitor, accountant, or other due diligence.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const comparisonCards = [
  {
    title: 'Rental valuation',
    eyebrow: 'What it asks',
    summary: 'What rent might be achievable in the market.',
    points: ['Comparable evidence', 'Valuer or agent judgment', 'Likely market rent'],
    note: 'Useful when you already need a rent estimate.',
  },
  {
    title: 'Rent affordability',
    eyebrow: 'What it asks',
    summary: 'Whether the rent still works after costs, voids, and finance.',
    points: ['Cash flow after costs', 'Rent burden', 'Budget pressure'],
    note: 'Useful when you need to know if the figure is workable.',
  },
  {
    title: 'Commercial lease viability',
    eyebrow: 'What it asks',
    summary: 'Whether the site, lease, and trading assumptions can carry the rent.',
    points: ['Opening cash stack', 'Break-even customers', 'Downside survival'],
    note: 'This is the core YieldLens commercial check.',
  },
];

const commercialChecks = [
  'Rent can look normal and still be too heavy after staffing and stock.',
  'Fit-out, deposit, legal costs, and service charge can drain opening cash.',
  'A weak opening period can make the lease fragile even if the market rent is sensible.',
  'The real question is whether the business can carry the lease before you sign.',
];

const practicalChecks = [
  'Comparable rents',
  'Local demand',
  'Void periods',
  'Service charge',
  'Ground rent where relevant',
  'Management costs',
  'Maintenance',
  'Finance costs',
  'Business rates for commercial',
  'Fit-out and setup costs for commercial',
  'Lease terms for commercial',
];

const commercialLinks = [
  {
    title: 'Commercial rent affordability calculator',
    text: 'Check whether a business can carry the rent after costs and trading pressure are added.',
    href: '/commercial-rent-affordability-calculator',
  },
  {
    title: 'Commercial lease viability check',
    text: 'Pressure-test the lease, opening cash, and downside trading before signing.',
    href: '/check?mode=commercial',
  },
  {
    title: 'Sample commercial viability file',
    text: 'See the structure of the £49 decision memo before paying.',
    href: '/sample-commercial-viability-file',
  },
];

const residentialLinks = [
  {
    title: 'Rent affordability check',
    text: 'Check whether a rent estimate still fits the rest of the monthly budget.',
    href: '/rent-affordability-check',
  },
  {
    title: 'Property cash flow calculator',
    text: 'Check whether rent covers financing and ownership costs.',
    href: '/property-cash-flow-calculator',
  },
  {
    title: 'Buy-to-let yield calculator',
    text: 'Screen the return on a residential rental property purchase.',
    href: '/buy-to-let-yield-calculator',
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
  const isDark = tone === 'dark';
  return (
    <div className="max-w-3xl mb-10">
      <p className={`text-xs font-medium uppercase tracking-[0.22em] mb-3 ${isDark ? 'text-[#D6C7A2]' : 'text-[var(--yieldlens-caution)]'}`}>
        {eyebrow}
      </p>
      <h2 className={`${sectionHeadingClass} ${isDark ? '!text-white' : ''} mb-3`}>
        {title}
      </h2>
      {description && (
        <p className={`${supportingTextClass} ${isDark ? '!text-stone-300' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function CardBulletList({ items, dark = false }: { items: string[]; dark?: boolean }) {
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

export default function RentalValuationVsRentAffordabilityPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/rental-valuation-vs-rent-affordability"
        pageType="bridge_page"
        mode="mixed"
        eventLabel="Rental valuation vs rent affordability viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_38%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Rental valuation vs rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Rental valuation vs rent affordability
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A rental valuation asks what rent might be achievable. A rent affordability check asks whether the rent still works after costs, voids, and finance.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                For commercial units, the real question is whether the business can carry the lease before you sign. That is where YieldLens focuses.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  className={heroPrimaryCtaClass}
                  eventName="bridge_page_cta_clicked"
                  pagePath="/rental-valuation-vs-rent-affordability"
                  ctaLabel="Run a free commercial check"
                  pageType="bridge_page"
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  className={heroSecondaryCtaClass}
                  eventName="bridge_page_cta_clicked"
                  pagePath="/rental-valuation-vs-rent-affordability"
                  ctaLabel="View sample viability file"
                  pageType="bridge_page"
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>

              <p className={`${disclaimerClass} mt-5 text-stone-400 max-w-2xl`}>
                YieldLens provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 text-stone-900 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
                Decision map
              </p>
              <div className="space-y-4">
                <div className="rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                  <p className="text-sm font-semibold text-stone-900 mb-1">Rental valuation</p>
                  <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                    What rent might the market support?
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--yieldlens-border)] bg-white p-4">
                  <p className="text-sm font-semibold text-stone-900 mb-1">Rent affordability</p>
                  <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                    Does the rent still fit after costs and finance?
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                  <p className="text-sm font-semibold text-stone-900 mb-1">Commercial lease viability</p>
                  <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                    Can the site, lease, and opening cash stack survive in practice?
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-[var(--yieldlens-muted)] leading-7">
                YieldLens is not a valuation tool. It helps you pressure-test the rent figure after you already have an estimate to work with.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} mt-8`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Three different questions"
            title="The same rent figure can mean three very different things."
            description="A valuation estimates the number. Affordability checks the budget. Commercial viability checks whether the lease can survive real trading pressure."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparisonCards.map((card, index) => (
              <div
                key={card.title}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : 'border-t-[var(--yieldlens-positive)]'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                  {card.eyebrow}
                </p>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">{card.title}</h3>
                <p className="text-sm text-stone-700 leading-6 mb-4">{card.summary}</p>
                <CardBulletList items={card.points} />
                <p className="mt-4 text-sm font-medium text-stone-900">{card.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Commercial bridge"
            title="For commercial units, affordability matters before you sign."
            description="A commercial rent may look reasonable on paper and still be too heavy for a cafe, restaurant, salon, or retailer once fit-out, staffing, deposit, service charge, stock, utilities, and a slower opening period are included."
            tone="dark"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5 sm:p-6">
                <CardBulletList items={commercialChecks} dark />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/commercial-rent-affordability-calculator"
                  className={heroPrimaryCtaClass}
                  eventName="bridge_page_cta_clicked"
                  pagePath="/rental-valuation-vs-rent-affordability"
                  ctaLabel="Commercial rent affordability calculator"
                  pageType="bridge_page"
                >
                  Commercial rent affordability calculator
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  className={heroSecondaryCtaClass}
                  eventName="bridge_page_cta_clicked"
                  pagePath="/rental-valuation-vs-rent-affordability"
                  ctaLabel="Commercial lease viability check"
                  pageType="bridge_page"
                >
                  Commercial lease viability check
                </TrackedCtaLink>
              </div>
            </div>

            <div className={`${surfaceCardClass} bg-white p-5 sm:p-6 text-stone-900`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Related tools
              </p>
              <div className="space-y-3">
                {commercialLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="block rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4 transition-all hover:border-[var(--yieldlens-caution)] hover:shadow-sm"
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

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Residential bridge"
            title="For residential checks, keep the affordability test separate from valuation."
            description="If you are looking at a home or a rental property, the useful next step is usually affordability, cash flow, or yield. Commercial lease pressure belongs in a separate decision path."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {residentialLinks.map((link, index) => (
              <div
                key={link.title}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : 'border-t-[var(--yieldlens-positive)]'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                  Residential check
                </p>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{link.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6 mb-4">{link.text}</p>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-[var(--yieldlens-primary)] hover:text-[var(--yieldlens-caution)]"
                >
                  Open tool
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What to verify"
            title="Before relying on a rent estimate, check the evidence behind it."
            description="A rent figure is only useful if the supporting assumptions are sensible. The weaker the evidence, the more care you need before relying on the number."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practicalChecks.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardClass} border-t-4 p-4 sm:p-5 ${
                  index % 3 === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index % 3 === 1
                      ? 'border-t-[var(--yieldlens-positive)]'
                      : 'border-t-[var(--yieldlens-fragile)]'
                }`}
              >
                <p className="text-sm font-medium text-stone-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                What YieldLens does
              </p>
              <CardBulletList
                items={[
                  'Pressures-test rent assumptions against costs and cash flow.',
                  'Highlights weak assumptions before you rely on the figure.',
                  'Helps you ask sharper questions about the deal or lease.',
                  'Turns the result into a clearer commercial decision path.',
                ]}
              />
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                What YieldLens does not do
              </p>
              <CardBulletList
                items={[
                  'Provide a valuation or formal market rent figure.',
                  'Replace professional due diligence or legal review.',
                  'Replace tax, finance, or valuation advice.',
                  'Decide whether you should sign a lease or commit to the property.',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Frequently asked questions"
            title="Quick answers for users comparing valuation, affordability, and viability."
            description="These are the most common questions when people search for rental valuation or rent affordability terms."
          />

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div
                key={faq.question}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index % 3 === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index % 3 === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : 'border-t-[var(--yieldlens-fragile)]'
                }`}
              >
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${memoBandClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-5xl my-14`}>
        <div className="px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
            Next step
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            If the rent matters commercially, run the check before you commit.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-6">
            The commercial lease viability check shows whether the rent, opening cash, and downside trading still look workable. If you are checking a rental property instead, use the residential tools below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              className={heroPrimaryCtaClass}
              eventName="bridge_page_cta_clicked"
              pagePath="/rental-valuation-vs-rent-affordability"
              ctaLabel="Run a free commercial check"
              pageType="bridge_page"
            >
              Run a free commercial check
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              className={heroSecondaryCtaClass}
              eventName="bridge_page_cta_clicked"
              pagePath="/rental-valuation-vs-rent-affordability"
              ctaLabel="View sample viability file"
              pageType="bridge_page"
            >
              View sample viability file
            </TrackedCtaLink>
            <Link
              href="/rent-affordability-check"
              className="inline-flex items-center justify-center px-1 py-3 text-sm font-semibold text-white/80 hover:text-white"
            >
              Check residential cash flow
            </Link>
          </div>
          <p className={`${disclaimerClass} mt-5 text-stone-400`}>
            YieldLens provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
