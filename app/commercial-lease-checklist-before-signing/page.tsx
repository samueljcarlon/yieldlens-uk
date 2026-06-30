import type { Metadata } from 'next';
import Link from 'next/link';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import FaqSection from '@/components/FaqSection';
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
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Commercial Lease Checklist Before Signing | Rent and Viability Checks',
  description:
    'Check rent, service charge, business rates, fit-out, deposit, break clause, repair obligations, and affordability before signing a commercial lease.',
  alternates: {
    canonical: '/commercial-lease-checklist-before-signing',
  },
  openGraph: {
    title: 'Commercial Lease Checklist Before Signing | Rent and Viability Checks | YieldLens UK',
    description:
      'Check rent, service charge, business rates, fit-out, deposit, break clause, repair obligations, and affordability before signing a commercial lease.',
    url: 'https://yieldlens.co.uk/commercial-lease-checklist-before-signing',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I check before signing a commercial lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start with rent burden, break-even customers or sales, opening cash, downside trading, service charge, rent review, repairing obligations, break clauses, and permitted use. Then ask a solicitor to review the legal terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I sign a lease based only on rent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Rent is only one part of the risk. Fit-out, deposit, staffing, rates, utilities, and lease clauses can change the real economics materially.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is rent burden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is monthly rent divided by expected monthly revenue. YieldLens uses 12% as a healthier screen and 18% as a caution threshold. Those are YieldLens screening thresholds, not universal rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can YieldLens review my lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YieldLens does not review legal documents. It helps you structure the commercial numbers and questions before you commit to a lease.',
      },
    },
  ],
};

const checklistSections = [
  {
    title: 'Rent and affordability',
    items: [
      'Annual and monthly rent',
      'Rent as share of expected revenue',
      'Rent review terms',
      'Rent-free period',
      'Deposit',
      'Service charge',
      'Business rates',
    ],
  },
  {
    title: 'Setup and opening cash',
    items: [
      'Fit-out quotes',
      'Equipment',
      'Legal and professional fees',
      'Launch stock',
      'Utilities',
      'Insurance',
      'Cash buffer after opening',
    ],
  },
  {
    title: 'Trading assumptions',
    items: [
      'Realistic revenue',
      'Customers per day',
      'Average spend',
      'Seasonality',
      'Opening hours',
      'Staffing pattern',
      'Supplier costs',
    ],
  },
  {
    title: 'Lease terms',
    items: [
      'Break clause',
      'Repair obligations',
      'Permitted use',
      'Assignment and subletting',
      'Personal guarantees if relevant',
      'Opening delays',
      'Landlord works',
    ],
  },
  {
    title: 'Evidence to gather',
    items: [
      'Comparable rents',
      'Footfall',
      'Local competition',
      'Contractor quotes',
      'Service charge history',
      'Rates estimate',
      'Licensing or planning requirements',
    ],
  },
];

const questionGroups = [
  {
    title: 'Rent and cash',
    text: 'What happens if fit-out delays opening? Is the rent-free period long enough? Can the opening cash buffer survive deposits, stock, and setup costs?',
  },
  {
    title: 'Lease terms',
    text: 'Is service charge capped or variable? Who pays for repairs? Can rent increase at review? Is there a break clause? Are landlord works documented?',
  },
  {
    title: 'Trading evidence',
    text: 'What evidence supports expected trade? Are footfall, competitor demand, customer volume, and average spend realistic for the unit?',
  },
];

const bridgeLinks = [
  {
    title: 'Commercial lease viability check',
    href: '/commercial-lease-viability-check',
    text: 'Pressure-test whether the site can carry the rent before you sign.',
  },
  {
    title: 'Commercial lease costs before signing',
    href: '/commercial-lease-costs-before-signing',
    text: 'Check the full cost stack before the lease becomes expensive to unwind.',
  },
  {
    title: 'Commercial lease deposit before signing',
    href: '/commercial-lease-deposit-before-signing',
    text: 'Check how the deposit changes opening cash and working capital.',
  },
  {
    title: 'Commercial rent-free period before signing',
    href: '/commercial-rent-free-period-before-signing',
    text: 'Check whether the incentive preserves enough opening cash.',
  },
  {
    title: 'Commercial rent affordability calculator',
    href: '/commercial-rent-affordability-calculator',
    text: 'Check whether the business can afford the rent and operating costs.',
  },
  {
    title: 'Commercial rent burden calculator',
    href: '/commercial-rent-burden-calculator',
    text: 'See how much of expected revenue rent is absorbing.',
  },
  {
    title: 'Commercial lease survival calculator',
    href: '/commercial-lease-survival-calculator',
    text: 'Check whether the site can survive a weak opening period.',
  },
  {
    title: 'Sample commercial viability file',
    href: '/sample-commercial-viability-file',
    text: 'See the kind of output the £49 paid file produces.',
  },
  {
    title: 'Viability file',
    href: '/viability-file',
    text: 'Read what the paid Standard commercial viability file includes.',
  },
  {
    title: 'How it works',
    href: '/how-it-works',
    text: 'Learn how the free check, paid file, and sample report fit together.',
  },
];

const faqItems = [
  {
    q: 'What should I check before signing a commercial lease?',
    a: 'Start with rent burden, break-even customers or sales, upfront cash, downside trading, service charge, rent review, repairing obligations, break clauses, and permitted use. Then ask a solicitor to review the legal terms.',
  },
  {
    q: 'Should I sign a lease based only on rent?',
    a: 'No. Rent is only one part of the risk. Fit-out, deposit, staffing, rates, utilities, and lease clauses can change the real economics materially.',
  },
  {
    q: 'What is rent burden?',
    a: 'It is monthly rent divided by expected monthly revenue. YieldLens uses 12% as a healthier screen and 18% as a caution threshold. Those are YieldLens screening thresholds, not universal rules.',
  },
  {
    q: 'What is a break clause?',
    a: 'A break clause is a contractual exit point. It matters because it can reduce the downside if the site underperforms after opening.',
  },
  {
    q: 'Why do repairing obligations matter?',
    a: 'Repairing obligations can create hidden costs and responsibility for damage or upkeep that are not obvious from the headline rent.',
  },
  {
    q: 'Can YieldLens tell me whether to sign?',
    a: 'No. YieldLens UK provides indicative decision-support only. It helps you pressure-test the numbers and questions, but it does not tell you to sign or not sign.',
  },
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

export default function CommercialLeaseChecklistPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-lease-checklist-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial lease checklist viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial lease checklist
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial lease checklist before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                What should I check before signing a commercial lease? Cover both lease terms and commercial affordability. A unit can look attractive but become fragile once rent, service charge, business rates, fit-out, deposit, stock, staffing, and weak early trade are included.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                This page gives a practical pre-signing checklist, then points you towards the free commercial check and the £49 Standard file if you want a structured decision memo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-checklist-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-checklist-before-signing"
                  ctaLabel="View sample viability file"
                  pageType="seo_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
                <Link href="/commercial-lease-viability-check" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease viability check
                </Link>
                <Link href="/commercial-rent-affordability-calculator" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial rent affordability calculator
                </Link>
                <Link href="/how-it-works" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  How it works
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Quick answer
              </p>
              <BulletList
                items={[
                  'Check whether the site can carry the rent.',
                  'Verify whether opening cash is enough after fit-out and deposits.',
                  'Test whether the lease still works if trade starts slowly.',
                  'Ask whether the lease terms create hidden cost pressure.',
                ]}
              />
              <div className="mt-5 rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                A checklist is most useful when it includes both lease wording and affordability pressure. Numbers without lease terms, or lease terms without numbers, miss the real risk.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} mt-8`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why the checklist matters"
            title="Commercial lease mistakes are expensive because the lease is only one part of the risk."
            description="The headline rent is easy to focus on. The weaker point is often the full cost stack and the lease obligations that sit around it."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Fit-out costs can drain cash before trading starts.',
              'Service charge can narrow the margin after the site opens.',
              'Repairing obligations can create hidden cost exposure.',
              'Rent reviews can make a borderline site worse later.',
              'Weak trading can expose a site that only works in the base case.',
              'A lack of break clause can trap a tenant in a weak site.',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 text-sm text-stone-700 leading-7 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-fragile)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-risk)]'
                          : index === 4
                            ? 'border-t-[var(--yieldlens-primary)]'
                            : 'border-t-[var(--yieldlens-caution)]'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Checklist sections"
            title="What should the commercial lease checklist cover?"
            description="A useful checklist should cover affordability, setup cash, trading assumptions, lease terms, and the evidence behind them."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {checklistSections.map((section, index) => (
              <div
                key={section.title}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-positive)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-fragile)]'
                          : 'border-t-[var(--yieldlens-risk)]'
                }`}
              >
                <h3 className="text-lg font-semibold text-stone-900 mb-3">{section.title}</h3>
                <BulletList items={section.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="Ask the questions that turn the checklist into a real decision."
            description="These are the questions that should be answered before rent, fit-out, and legal costs become sunk."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {questionGroups.map((group, index) => (
              <div
                key={group.title}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : 'border-t-[var(--yieldlens-fragile)]'
                }`}
              >
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{group.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{group.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Evidence to gather"
            title="Collect the evidence that makes the checklist real."
            description="A checklist is stronger when it is tied to actual figures, quotes, and trading evidence."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Trading evidence',
                items: ['Footfall', 'Local competition', 'Customer demand', 'Trading hours', 'Average spend'],
              },
              {
                title: 'Cost evidence',
                items: ['Service charge history', 'Rates estimate', 'Supplier quotes', 'Contractor quotes', 'Utility estimate'],
              },
              {
                title: 'Lease evidence',
                items: ['Draft lease', 'Break clause wording', 'Repair obligations', 'Permitted use', 'Licensing or planning requirements'],
              },
            ].map((group, index) => (
              <div
                key={group.title}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : 'border-t-[var(--yieldlens-positive)]'
                }`}
              >
                <h3 className="text-lg font-semibold text-stone-900 mb-3">{group.title}</h3>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={item} className={`${surfaceCardSoftClass} p-3 text-sm text-[var(--yieldlens-muted)]`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="How YieldLens helps"
            title="Use YieldLens to pressure-test the numbers before signing."
            description="The free check gives a viability snapshot. The £49 Standard file turns the result into a decision memo with negotiation levers, evidence checklist, and lease questions."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <BulletList
                items={[
                  'Rent burden, break-even customers, opening cash, downside trading, and six-month survival.',
                  'A fast viability snapshot before you commit.',
                  'Helpful when you need to know whether the site deserves deeper work.',
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
                {bridgeLinks.map((link, index) => (
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
                    <p className="font-semibold text-stone-900 mb-1">{link.title}</p>
                    <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{link.text}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                What to verify before signing
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'What happens if fit-out delays opening?',
                  'Is service charge capped or variable?',
                  'Who pays for repairs?',
                  'Can rent increase at review?',
                  'Is there a break clause?',
                  'Are landlord works documented?',
                  'What evidence supports expected trade?',
                  'Can the site survive a weak opening period?',
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
                                : index === 5
                                  ? 'border-t-[var(--yieldlens-caution)]'
                                  : index === 6
                                    ? 'border-t-[var(--yieldlens-primary)]'
                                    : 'border-t-[var(--yieldlens-positive)]'
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

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial lease checklist FAQs"
        description="Practical answers for operators who need to pressure-test a unit before heads of terms become a commitment."
        faqs={faqItems.map((item) => ({ question: item.q, answer: item.a }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
            Pressure-test the lease before the numbers become a commitment.
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Run a free commercial check, then decide whether the site deserves deeper work.
          </h2>
          <p className="text-sm text-[var(--yieldlens-muted)] leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge the rent, setup costs, lease terms, and opening cash before a commercial lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-lease-checklist-before-signing"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-lease-checklist-before-signing"
              ctaLabel="View sample viability file"
              pageType="seo_page"
              className={heroSecondaryCtaClass}
            >
              View sample viability file
            </TrackedCtaLink>
            <Link
              href="/how-it-works"
              className={secondaryCtaClass}
            >
              How it works
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
