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
  title: 'Commercial Lease Checklist Before Signing',
  description:
    'Compare the main commercial lease issues before signing: costs, heads of terms, rent-free timing, deposit, service charge, fit-out, business rates, rent review, break clause, repairing obligations, permitted use, lease length, assignment, and personal guarantees.',
  alternates: {
    canonical: '/commercial-lease-checklist-before-signing',
  },
  openGraph: {
    title: 'Commercial Lease Checklist Before Signing',
    description:
      'Compare the main commercial lease issues before signing: costs, heads of terms, rent-free timing, deposit, service charge, fit-out, business rates, rent review, break clause, repairing obligations, permitted use, lease length, assignment, and personal guarantees.',
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
        text: 'Start with rent burden, break-even customers or sales, opening cash, downside trading, service charge, rent review, lease length, repairing obligations, break clauses, and permitted use. Then ask a solicitor to review the legal terms.',
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

const itemListStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Commercial lease issues to check before signing',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Commercial lease costs before signing',
      url: 'https://yieldlens.co.uk/commercial-lease-costs-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Commercial heads of terms before signing',
      url: 'https://yieldlens.co.uk/commercial-heads-of-terms-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Commercial rent-free period before signing',
      url: 'https://yieldlens.co.uk/commercial-rent-free-period-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Commercial lease deposit before signing',
      url: 'https://yieldlens.co.uk/commercial-lease-deposit-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Commercial service charge before signing',
      url: 'https://yieldlens.co.uk/commercial-service-charge-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Commercial fit-out costs before signing',
      url: 'https://yieldlens.co.uk/commercial-fit-out-costs-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 7,
      name: 'Commercial business rates before signing',
      url: 'https://yieldlens.co.uk/commercial-business-rates-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 8,
      name: 'Commercial rent review before signing',
      url: 'https://yieldlens.co.uk/commercial-rent-review-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 9,
      name: 'Commercial break clause before signing',
      url: 'https://yieldlens.co.uk/commercial-break-clause-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 10,
      name: 'Commercial repairing obligations before signing',
      url: 'https://yieldlens.co.uk/commercial-repairing-obligations-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 11,
      name: 'Commercial permitted use before signing',
      url: 'https://yieldlens.co.uk/commercial-permitted-use-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 12,
      name: 'Commercial lease length before signing',
      url: 'https://yieldlens.co.uk/commercial-lease-length-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 13,
      name: 'Commercial assignment and subletting before signing',
      url: 'https://yieldlens.co.uk/commercial-assignment-subletting-before-signing',
    },
    {
      '@type': 'ListItem',
      position: 14,
      name: 'Commercial personal guarantee before signing',
      url: 'https://yieldlens.co.uk/commercial-personal-guarantee-before-signing',
    },
  ],
};

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://yieldlens.co.uk',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Commercial lease checklist before signing',
      item: 'https://yieldlens.co.uk/commercial-lease-checklist-before-signing',
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
      'Lease length',
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
    text: 'Is service charge capped or variable? Who pays for repairs? Is the lease length right for the plan? Can rent increase at review? Is there a break clause? Can the lease be assigned or sublet? Is a personal guarantee required? Are landlord works documented?',
  },
  {
    title: 'Trading evidence',
    text: 'What evidence supports expected trade? Are footfall, competitor demand, customer volume, and average spend realistic for the unit?',
  },
];

const guideIndexRows = [
  {
    issue: 'Total lease costs',
    why: 'Rent is only part of the commitment.',
    href: '/commercial-lease-costs-before-signing',
    label: 'Commercial lease costs before signing',
  },
  {
    issue: 'Heads of terms',
    why: 'Deal points are harder to change later.',
    href: '/commercial-heads-of-terms-before-signing',
    label: 'Commercial heads of terms before signing',
  },
  {
    issue: 'Lease length',
    why: 'The term sets the commitment period and fit-out payback window.',
    href: '/commercial-lease-length-before-signing',
    label: 'Commercial lease length before signing',
  },
  {
    issue: 'Rent-free period',
    why: 'It affects launch cash and early trading runway.',
    href: '/commercial-rent-free-period-before-signing',
    label: 'Commercial rent-free period before signing',
  },
  {
    issue: 'Rent deposit',
    why: 'It ties up cash before trading starts.',
    href: '/commercial-lease-deposit-before-signing',
    label: 'Commercial lease deposit before signing',
  },
  {
    issue: 'Service charge',
    why: 'It changes the true occupancy cost.',
    href: '/commercial-service-charge-before-signing',
    label: 'Commercial service charge before signing',
  },
  {
    issue: 'Business rates',
    why: 'They can materially change the monthly cost base.',
    href: '/commercial-business-rates-before-signing',
    label: 'Commercial business rates before signing',
  },
  {
    issue: 'Permitted use',
    why: 'It decides whether the intended business can actually operate there.',
    href: '/commercial-permitted-use-before-signing',
    label: 'Commercial permitted use before signing',
  },
  {
    issue: 'Fit-out costs',
    why: 'They drain cash before revenue starts.',
    href: '/commercial-fit-out-costs-before-signing',
    label: 'Commercial fit-out costs before signing',
  },
  {
    issue: 'Rent review',
    why: 'Future rent can change viability later.',
    href: '/commercial-rent-review-before-signing',
    label: 'Commercial rent review before signing',
  },
  {
    issue: 'Break clause',
    why: 'Exit flexibility affects downside risk.',
    href: '/commercial-break-clause-before-signing',
    label: 'Commercial break clause before signing',
  },
  {
    issue: 'Assignment and subletting',
    why: 'Exit flexibility matters if the business changes or the site underperforms.',
    href: '/commercial-assignment-subletting-before-signing',
    label: 'Commercial assignment and subletting before signing',
  },
  {
    issue: 'Personal guarantee',
    why: 'It can turn a lease problem into a personal downside.',
    href: '/commercial-personal-guarantee-before-signing',
    label: 'Commercial personal guarantee before signing',
  },
  {
    issue: 'Repairing obligations',
    why: 'Hidden repair exposure can change the economics.',
    href: '/commercial-repairing-obligations-before-signing',
    label: 'Commercial repairing obligations before signing',
  },
];

const faqItems = [
  {
    q: 'What should I check before signing a commercial lease?',
    a: 'Start with rent burden, break-even customers or sales, upfront cash, downside trading, service charge, rent review, lease length, repairing obligations, break clauses, assignment and subletting, personal guarantees, and permitted use. Then ask a solicitor to review the legal terms.',
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
      <JsonLd data={[faqStructuredData, itemListStructuredData, breadcrumbStructuredData]} />
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
                Use this hub to compare the main lease questions before signing. A unit can look attractive but become fragile once rent, lease length, service charge, business rates, fit-out, deposit, stock, staffing, and weak early trade are included.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Start with the issue that matters most, then use the free commercial check and the £49 Standard Commercial Viability File if you want a structured decision memo.
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
                <Link href="/how-much-rent-can-a-takeaway-afford" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  How much rent can a takeaway afford
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
              <p className="text-sm text-stone-700 leading-7 mb-4">
                Use the hub when you need a fast route into the lease issues that can change viability. YieldLens helps pressure-test rent burden, opening cash, break-even pressure, downside trading, and the key lease terms before signing, so you can decide which guide deserves deeper work first.
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

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Before-signing guides"
            title="Commercial lease issues to check before signing"
            description="Use the hub to pick the guide that matches the clause or cost line you need to pressure-test first."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {guideIndexRows.map((row, index) => (
              <div
                key={row.href}
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
                                : index === 7
                                  ? 'border-t-[var(--yieldlens-positive)]'
                                  : 'border-t-[var(--yieldlens-fragile)]'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                  {row.issue}
                </p>
                <p className="text-sm text-stone-700 leading-7 mb-4">
                  {row.why}
                </p>
                <Link href={row.href} className="text-sm font-medium text-[var(--yieldlens-primary)] underline decoration-[var(--yieldlens-primary)]/25 underline-offset-4 hover:decoration-[var(--yieldlens-primary)]">
                  Read next: {row.label}
                </Link>
              </div>
            ))}
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
            eyebrow="The key checks"
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
            description="The free check gives a viability snapshot. The £49 Standard Commercial Viability File turns the result into a decision memo with negotiation levers, evidence checklist, and lease questions."
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
                £49 Standard Commercial Viability File
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
          <SectionTitle
            eyebrow="Business-type rent checks"
            title="Use the page that matches the unit type."
            description="The checklist hub sits alongside the business-type affordability checks so the cluster stays connected."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'How much rent can a cafe afford', href: '/how-much-rent-can-a-cafe-afford' },
              { title: 'How much rent can a shop afford', href: '/how-much-rent-can-a-shop-afford' },
              { title: 'How much rent can a takeaway afford', href: '/how-much-rent-can-a-takeaway-afford' },
              { title: 'How much rent can a barber shop afford', href: '/how-much-rent-can-a-barber-shop-afford' },
              { title: 'Salon lease viability check', href: '/salon-lease-viability-check' },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`${surfaceCardClass} p-4 transition-all hover:-translate-y-0.5`}
              >
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 items-start">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-caution)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Product bridge
              </p>
              <h2 className="text-2xl font-bold text-stone-900 mb-3">
                After reviewing the lease points, run a free commercial check.
              </h2>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7 mb-5">
                Test rent burden, opening cash, and downside pressure before the lease gets expensive to unwind.
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
