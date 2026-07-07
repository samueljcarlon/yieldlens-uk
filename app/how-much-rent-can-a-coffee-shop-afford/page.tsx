import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import BusinessTypeCtaBand from '@/components/BusinessTypeCtaBand';
import FaqSection from '@/components/FaqSection';
import {
  disclaimerClass,
  heroBackdropClass,
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  sectionBandClass,
  sectionHeadingClass,
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
  supportingTextClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'How Much Rent Can a Coffee Shop Afford?',
  description:
    'Check whether a coffee shop can afford the rent before signing by testing daily customers, average spend, gross margin, staffing, service charge, rates, fit-out, and opening cash.',
  alternates: {
    canonical: '/how-much-rent-can-a-coffee-shop-afford',
  },
  openGraph: {
    title: 'How Much Rent Can a Coffee Shop Afford?',
    description:
      'Pressure-test whether a coffee shop lease can carry the rent by checking daily customers, average spend, staffing, service charge, rates, opening cash, and downside trading.',
    url: 'https://yieldlens.co.uk/how-much-rent-can-a-coffee-shop-afford',
  },
};

const faqItems = [
  {
    question: 'How much rent can a coffee shop afford?',
    answer:
      'A coffee shop can usually afford rent only if expected daily customers, average spend and gross margin leave enough cash after staffing, stock, service charge, rates and quieter trading periods.',
  },
  {
    question: 'What should I include before signing a coffee shop lease?',
    answer:
      'Include rent, service charge, business rates, staffing, stock, fit-out, equipment, opening cash, legal fees, rent-free periods, and downside trading assumptions.',
  },
  {
    question: 'Why does quieter weekday trade matter?',
    answer:
      'Coffee shops often rely on weekday peaks, so the rent has to work when mornings are busy and the quieter parts of the week are slower than planned.',
  },
  {
    question: 'Is YieldLens a valuation or advice service?',
    answer:
      'No. YieldLens provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, or a substitute for professional due diligence.',
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
      name: 'Commercial rent affordability',
      item: 'https://yieldlens.co.uk/commercial-rent-affordability-calculator',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'How much rent can a coffee shop afford',
      item: 'https://yieldlens.co.uk/how-much-rent-can-a-coffee-shop-afford',
    },
  ],
};

const quickAnswerPoints = [
  'A coffee shop can usually afford rent only if expected daily customers, average spend and gross margin leave enough cash after staffing, stock, service charge, rates and quieter trading periods.',
  'A first-pass check should test rent burden, break-even customers, opening cash and downside trading before the lease is taken further.',
];

const keyInputs = [
  {
    title: 'Daily customers',
    text: 'Morning peak trade and lunchtime demand usually do the heavy lifting, so the daily volume assumption has to be realistic rather than optimistic.',
  },
  {
    title: 'Average spend and gross margin',
    text: 'Small changes in basket size, coffee margin, pastry sales, and upsells can move the rent answer quickly.',
  },
  {
    title: 'Staffing and stock',
    text: 'Barista cover, till cover, milk, pastry, and food waste all affect the monthly cost base the rent has to sit on top of.',
  },
  {
    title: 'Service charge and business rates',
    text: 'The monthly occupancy cost is usually higher than the headline rent once shared building costs and rates are included.',
  },
  {
    title: 'Fit-out and equipment',
    text: 'Counters, seating, extraction, espresso kit, grinders, refrigeration and signage can absorb a large opening budget before trade stabilises.',
  },
  {
    title: 'Opening cash and quieter weekdays',
    text: 'The business should still hold together when weekday trade is softer and the opening buffer has been reduced by setup costs.',
  },
];

const illustrativeNumbers = [
  { label: 'Expected monthly revenue', value: '£28,800' },
  { label: 'Monthly rent', value: '£4,200' },
  { label: 'Monthly service charge', value: '£380' },
  { label: 'Business rates estimate', value: '£690' },
  { label: 'Staffing and operating costs', value: '£11,200' },
  { label: 'Coffee, food and packaging', value: '£5,250' },
  { label: 'Fit-out and equipment', value: '£48,000' },
  { label: 'Opening cash before trading', value: '£72,000' },
  { label: 'Opening cash after setup', value: '£6,400' },
  { label: 'Rent burden', value: '14.6%' },
  { label: 'Break-even customers/day', value: '58.4' },
  { label: 'Downside trading', value: 'Still positive, but tight' },
];

const pressurePoints = [
  'A coffee shop can be volume-sensitive, so weaker weekday footfall can change the rent answer quickly.',
  'Equipment, counters and refrigeration can use cash before the concept has proven itself.',
  'Service charge and rates can make the true occupancy cost feel much higher than the rent alone.',
  'If average spend slips, the break-even customer target moves up even when the rent stays the same.',
];

const leaseChecks = [
  'Rent-free period',
  'Service charge',
  'Business rates',
  'Repairing obligations',
  'Permitted use',
  'Break clause',
  'Rent review',
  'Assignment and subletting',
  'Handover condition',
  'Personal guarantee',
];

const evidenceToGather = [
  'Observed weekday customer counts',
  'Comparable local commercial rents',
  'Service charge details',
  'Business rates estimate',
  'Fit-out and espresso equipment quotes',
  'Staffing plan by shift',
  'Supplier and waste assumptions',
  'Rent-free and deposit terms',
  'Break clause wording',
  'Revenue evidence behind the spend assumption',
];

const relatedLinks = [
  {
    title: 'Commercial rent affordability calculator',
    href: '/commercial-rent-affordability-calculator',
    text: 'Use the calculator if you want the broader rent burden screen first.',
  },
  {
    title: 'Commercial lease checklist before signing',
    href: '/commercial-lease-checklist-before-signing',
    text: 'Check the lease items that can change the result before you commit.',
  },
  {
    title: 'Cafe rent affordability',
    href: '/how-much-rent-can-a-cafe-afford',
    text: 'Use the cafe page when coffee-led trade is part of a broader cafe model.',
  },
  {
    title: 'Restaurant lease viability check',
    href: '/restaurant-lease-viability-check',
    text: 'Use the restaurant page if covers, extraction and kitchen fit-out are central.',
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
    <div className="mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">{eyebrow}</p>
      <h2 className={`${sectionHeadingClass} mb-3`}>{title}</h2>
      {description && <p className={supportingTextClass}>{description}</p>}
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

export default function CoffeeShopRentAffordabilityPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/how-much-rent-can-a-coffee-shop-afford"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Coffee shop rent guide viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Coffee shop rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                How much rent can a coffee shop afford?
              </h1>
              <div className="space-y-4 text-lg text-stone-300 max-w-2xl leading-8 mb-6">
                {quickAnswerPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this when coffee-led trade, weekday peaks and average spend are driving the decision.
                If the answer needs deeper pressure-testing, the free commercial check and the £49 Standard Commercial Viability File turn the result into a practical next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-much-rent-can-a-coffee-shop-afford"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
                  View sample viability file
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Coffee shop pressure points
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['Daily customers', 'Does the weekday footfall support the rent?'],
                  ['Average spend', 'Can the basket size hold the margin?'],
                  ['Opening cash', 'Is there enough left after fit-out and kit?'],
                  ['Downside trading', 'Does the site still work when mornings are softer?'],
                ].map(([label, helper], index) => (
                  <div
                    key={label}
                    className={`border p-4 rounded-3xl ${
                      index === 0
                        ? 'border-amber-200 bg-amber-50 text-amber-950'
                        : index === 2
                          ? 'border-orange-200 bg-orange-50 text-orange-950'
                          : 'border-[var(--yieldlens-border)] bg-white text-stone-950'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-1">{label}</p>
                    <p className="text-sm leading-6 opacity-90">{helper}</p>
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
            eyebrow="Quick answer"
            title="A coffee shop needs volume, margin and a cash buffer to carry the rent."
            description="The rent should leave room for staffing, stock, service charge, rates, equipment and quieter trading periods."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${surfaceCardClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">Key inputs to test</p>
              <BulletList items={keyInputs.map((item) => `${item.title}: ${item.text}`)} />
            </div>
            <div className={`${surfaceCardSoftClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">Why this matters</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                Coffee-led sites often rely on a short set of busy trading hours. If the rent only works when the day is busy, the lease is fragile rather than comfortably affordable.
              </p>
              <div className="mt-5 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                YieldLens helps compare the rent with daily customer volume, average spend, opening cash, and the weaker parts of the week before the lease becomes expensive to unwind.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Worked example"
            title="This fictional example shows the kind of pressure test a coffee shop needs."
            description="It is illustrative only, not a real case. It shows how the free check can surface the numbers that matter before payment."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 items-start">
            <div className={`${surfaceCardSoftClass} p-5 sm:p-6`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {illustrativeNumbers.map((item, index) => (
                  <div
                    key={item.label}
                    className={`rounded-3xl border p-4 ${
                      index === 0
                        ? 'border-[var(--yieldlens-border)] bg-white'
                        : index === 2
                          ? 'border-amber-200 bg-amber-50'
                          : index === 7
                            ? 'border-orange-200 bg-orange-50'
                            : 'border-[var(--yieldlens-border)] bg-white'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] font-semibold text-stone-500 mb-1">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-stone-950">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-caution)]`}>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] font-medium mb-3">
                What the numbers suggest
              </p>
              <p className="text-sm text-stone-700 leading-7 mb-4">
                The coffee shop still has room after rent on these fictional assumptions, but the opening buffer is not large enough to ignore weaker weekday trade or higher-than-expected setup costs.
              </p>
              <BulletList
                items={[
                  'Break-even customers stay below the expected daily count, but only by a modest margin.',
                  'Opening cash remains positive after setup, yet a slower launch would tighten the buffer.',
                  'Service charge and rates are big enough to matter alongside the headline rent.',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Pressure points"
            title="A coffee shop can look fine on average and still be weak on quieter days."
            description="The practical question is whether the business survives the weaker side of the week, not only the strongest trading windows."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pressurePoints.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
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

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Lease checks before signing"
            title="These lease points can change the answer even when the rent looks manageable."
            description="A coffee shop decision should still be checked against the practical lease terms that affect opening cash and exit flexibility."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {leaseChecks.map((item) => (
              <div key={item} className={`${surfaceCardClass} p-4`}>
                <p className="text-sm font-semibold text-stone-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Evidence to gather"
            title="Before relying on the result, check that the assumptions are real."
            description="The affordability view is only as useful as the evidence behind it."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidenceToGather.map((item) => (
              <div key={item} className={`${surfaceCardSoftClass} p-4`}>
                <p className="text-sm font-medium text-stone-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Use the free check, the calculator and the sample file together."
            description="The route to a better decision is to review the fast screen, then decide whether the site deserves deeper work."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${surfaceCardSoftClass} border-t-4 p-5 transition-all hover:-translate-y-0.5 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-fragile)]'
                        : 'border-t-[var(--yieldlens-positive)]'
                }`}
              >
                <p className="font-semibold text-stone-900 mb-1">{link.title}</p>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D6C7A2] font-medium mb-3">
            Pressure-test the rent before you commit
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Run a free commercial check, then decide whether the coffee shop deserves deeper work.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge rent burden, break-even customers, opening cash and downside trading before a lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/how-much-rent-can-a-coffee-shop-afford"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
              View sample viability file
            </Link>
            <Link href="/commercial-lease-viability-check" className={secondaryCtaClass}>
              Commercial lease viability check
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Common questions about coffee shop rent affordability."
        description="Short answers for people who need a clearer view of rent, cash flow and lease pressure before signing."
        faqs={faqItems}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <BusinessTypeCtaBand
        pagePath="/how-much-rent-can-a-coffee-shop-afford"
        businessType="coffee_shop"
        copy="Use the free commercial check to test daily customers, average spend, gross margin, and opening cash before spending time or money on the next stage."
        compareLabel="Comparing two possible sites? Compare two sites before taking one further."
      />
    </div>
  );
}
