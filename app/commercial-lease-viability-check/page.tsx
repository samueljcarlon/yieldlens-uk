import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import ToolConversionPanel from '@/components/ToolConversionPanel';
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
  title: 'Commercial Lease Viability Check | Can the Site Carry the Rent?',
  description:
    'Pressure-test whether a commercial site can carry the rent before you sign. YieldLens checks rent burden, break-even customers, opening cash, downside trading, lease questions, and survival runway.',
  alternates: {
    canonical: '/commercial-lease-viability-check',
  },
  openGraph: {
    title: 'Commercial Lease Viability Check | Can the Site Carry the Rent? | YieldLens UK',
    description:
      'Pressure-test whether a commercial site can carry the rent before you sign. YieldLens checks rent burden, break-even customers, opening cash, downside trading, lease questions, and survival runway.',
    url: 'https://yieldlens.co.uk/commercial-lease-viability-check',
  },
};

const faqs = [
  {
    question: 'What is a commercial lease viability check?',
    answer:
      'A commercial lease viability check is an indicative pressure test of whether a site can support its rent, opening costs, and trading costs. It looks at rent burden, revenue, break-even customers, opening cash, downside trading, and survival runway.',
  },
  {
    question: 'Is this advice or a valuation?',
    answer:
      'YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.',
  },
  {
    question: 'Why does rent burden matter?',
    answer:
      'Rent burden shows how much of expected revenue is absorbed by rent. If rent takes too much of revenue, the business has less room for staff, rates, utilities, insurance, stock, tax, and quieter trading periods.',
  },
  {
    question: 'Why calculate break-even customers per day?',
    answer:
      'Break-even customers per day translates fixed costs into a practical trading target. It helps show whether the site needs realistic footfall or very strong assumptions just to cover the lease and cost base.',
  },
  {
    question: 'What is the six-month survival test?',
    answer:
      'The six-month survival test checks whether the site has enough cash after opening to withstand a weak trading period. A site only passes if opening costs are funded and the downside case either covers monthly costs or has enough runway for six weak months.',
  },
  {
    question: 'Why include upfront cash?',
    answer:
      'A site can look workable month to month but still be fragile if fit-out, rent deposit, legal fees, opening stock, and setup costs use too much cash before trading starts.',
  },
  {
    question: 'Can this be used before heads of terms?',
    answer:
      'Yes. The check is most useful before you commit to legal work, fit-out planning, or full lease negotiations. It helps decide whether the site deserves deeper investigation.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
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
      name: 'Commercial Lease Viability Check',
      item: 'https://yieldlens.co.uk/commercial-lease-viability-check',
    },
  ],
};

const checkBlocks = [
  {
    title: 'Rent burden',
    text: 'Shows how much expected revenue is absorbed by rent before the rest of the cost base is paid.',
    accent: 'border-t-[var(--yieldlens-caution)]',
  },
  {
    title: 'Break-even customers or sales level',
    text: 'Turns the lease into a daily trading target the operator can actually judge.',
    accent: 'border-t-[var(--yieldlens-primary)]',
  },
  {
    title: 'Monthly cost base',
    text: 'Pulls staff, rates, utilities, insurance, stock, and other known costs into the decision.',
    accent: 'border-t-[var(--yieldlens-positive)]',
  },
  {
    title: 'Opening cash and fit-out pressure',
    text: 'Shows whether deposits, fit-out, legal fees, and launch costs leave enough cash to trade.',
    accent: 'border-t-[var(--yieldlens-fragile)]',
  },
  {
    title: 'Downside trading',
    text: 'Checks what happens if revenue starts slower or stays weaker than expected.',
    accent: 'border-t-[var(--yieldlens-risk)]',
  },
  {
    title: 'Six-month survival and lease questions',
    text: 'Tests whether the opening cash buffer and lease terms leave enough room to survive a weak start.',
    accent: 'border-t-[var(--yieldlens-caution)]',
  },
];

const operatorExamples = [
  {
    title: 'Cafe',
    text: 'A cafe can have healthy footfall and still be fragile if morning staffing, equipment, waste, and slow afternoons leave little room for rent.',
  },
  {
    title: 'Restaurant',
    text: 'Covers, kitchen fit-out, extraction, and rota pressure can make rent harder to carry than the headline market rent suggests.',
  },
  {
    title: 'Salon',
    text: 'Chair utilisation, booking ramp-up, and treatment-room productivity can determine whether the lease is manageable or too tight.',
  },
];

const verifyItems = [
  'Comparable commercial rents',
  'Service charge',
  'Business rates',
  'Fit-out quotes',
  'Deposit terms',
  'Rent-free period',
  'Landlord contribution',
  'Break clause',
  'Repair obligations',
  'Permitted use',
  'Licensing or planning where relevant',
  'Realistic revenue evidence',
];

const commercialLinks = [
  {
    title: 'Commercial lease costs before signing',
    text: 'Check the full cost stack before you commit to the lease.',
    href: '/commercial-lease-costs-before-signing',
  },
  {
    title: 'Commercial lease deposit before signing',
    text: 'Check how the deposit affects opening cash and working capital.',
    href: '/commercial-lease-deposit-before-signing',
  },
  {
    title: 'Commercial service charge before signing',
    text: 'Check how shared costs change the true occupancy cost.',
    href: '/commercial-service-charge-before-signing',
  },
  {
    title: 'Commercial fit-out costs before signing',
    text: 'Check how opening spend changes the cash buffer.',
    href: '/commercial-fit-out-costs-before-signing',
  },
  {
    title: 'Commercial rent-free period before signing',
    text: 'Check whether the incentive actually improves launch cash.',
    href: '/commercial-rent-free-period-before-signing',
  },
  {
    title: 'Commercial rent affordability calculator',
    text: 'Check whether the rent still fits after costs and trading pressure are added.',
    href: '/commercial-rent-affordability-calculator',
  },
  {
    title: 'Commercial rent burden calculator',
    text: 'See whether rent absorbs too much revenue before staff and other costs are considered.',
    href: '/commercial-rent-burden-calculator',
  },
  {
    title: 'Commercial lease survival calculator',
    text: 'Pressure-test survival runway after opening.',
    href: '/commercial-lease-survival-calculator',
  },
  {
    title: 'Sample commercial viability file',
    text: 'See the £49 decision memo structure before unlocking it.',
    href: '/sample-commercial-viability-file',
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

function BulletList({ items, dark = false }: { items: string[]; dark?: boolean }) {
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

export default function CommercialLeaseViabilityPage() {
  return (
    <div className="bg-[var(--yieldlens-page)]">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-lease-viability-check"
        pageType="commercial_landing"
        mode="commercial"
        eventLabel="Commercial lease viability page viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_38%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial lease viability check
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
                Commercial lease viability check
              </h1>
              <p className="text-lg text-stone-300 max-w-3xl mb-6 leading-8">
                A commercial lease viability check pressure-tests whether a site can carry the rent after expected revenue, operating costs, opening cash, and weaker early trading are considered.
              </p>
              <p className="text-sm text-stone-300 max-w-3xl mb-8 leading-7">
                It is built for people who need to know whether a cafe, restaurant, salon, shop, or other small commercial unit deserves a deeper look before they sign heads of terms.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/commercial-lease-viability-check"
                  ctaLabel="Run a free commercial check"
                  pageType="commercial_landing"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/commercial-lease-viability-check"
                  ctaLabel="View sample viability file"
                  pageType="commercial_landing"
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
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 text-stone-900 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
                What the check covers
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {checkBlocks.map((item) => (
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
            eyebrow="Why it matters"
            title="A market rent can still be commercially difficult."
            description="A rent can look reasonable against other units but still be hard for a cafe, salon, restaurant, or retailer if fit-out, staffing, deposit, service charge, stock, utilities, and slow opening trade absorb the cash buffer."
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
            eyebrow="What to test"
            title="What a lease viability check should test"
            description="The check should answer the questions that matter before the lease becomes expensive to unwind."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {checkBlocks.map((item, index) => (
              <div
                key={`${item.title}-detail`}
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
                            : 'border-t-[var(--yieldlens-caution)]'
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
          <SectionTitle
            eyebrow="The gap"
            title="A commercial lease can look normal and still be too heavy."
            description="The issue is not only the rent level. It is whether the opening cash stack and the first months of trading can survive the pressure the lease creates."
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <BulletList
                items={[
                  'Break-even customers can be reasonable on paper but too demanding in the real world.',
                  'A site can look busy and still be fragile if staff, rates, utilities, or stock are underestimated.',
                  'Deposit, fit-out, and setup spend can drain the cash that a weak start would need.',
                  'The lease needs to survive slower trading, not only best-case assumptions.',
                ]}
              />
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-caution)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                What to verify before signing
              </p>
              <BulletList items={verifyItems} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What YieldLens does"
            title="The free check gives a fast viability snapshot."
            description="The £49 Standard file turns the result into a structured decision memo with stress-test interpretation, negotiation levers, evidence checklist, and lease questions."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <BulletList
                items={[
                  'Rent burden, break-even customers, opening cash, downside trading, and six-month survival.',
                  'A quick view of the headline pressure points before you commit.',
                  'Helpful when the question is whether the site deserves deeper work.',
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
                  'Useful when the numbers need to be turned into a decision path before signing.',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Checklist"
            title="Questions the site should answer before you sign."
            description="These are the questions a commercial viability file should force into the open before you spend serious money or negotiation effort."
          />

          <div className={`${surfaceCardClass} p-6`}>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-stone-700 list-decimal list-inside">
              {verifyItems.map((item) => (
                <li key={item} className={`${surfaceCardSoftClass} p-3`}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Worked example
              </p>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">
                Example: 40-cover cafe lease
              </h2>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7 mb-5">
                This illustrative example shows how YieldLens pressure-tests a cafe unit before signing. It is not a real property assessment.
              </p>
              <div className={`${surfaceCardSoftClass} border-t-4 border-t-[var(--yieldlens-caution)] p-5`}>
                <p className="text-sm font-semibold text-stone-900 mb-2">
                  Why the verdict needs caution
                </p>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                  The downside case does not show monthly burn, but the site still looks fragile because only £9,000 is left after opening costs. That is the kind of issue a basic rent calculator misses.
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/commercial-lease-viability-check"
                  ctaLabel="Run a free commercial check"
                  pageType="commercial_landing"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/commercial-lease-viability-check"
                  ctaLabel="View sample viability file"
                  pageType="commercial_landing"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
            </div>

            <div className={`${surfaceCardClass} bg-white p-5 sm:p-6 text-stone-900`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Verdict', value: 'Needs caution', helper: 'Passes the downside case, but the opening cash buffer is thin.', tone: 'bg-[var(--yieldlens-panel)] border-[var(--yieldlens-border)]' },
                  { label: 'Rent burden', value: '20.0%', helper: '£5,000 rent against £24,960 estimated monthly revenue.', tone: 'bg-white border-[var(--yieldlens-border)]' },
                  { label: 'Break-even/day', value: '45.2', helper: 'Customers per day needed to cover the known monthly cost base.', tone: 'bg-white border-[var(--yieldlens-border)]' },
                  { label: 'Six-month test', value: 'Pass', helper: 'No downside monthly burn, but opening cash still matters.', tone: 'bg-[var(--yieldlens-panel)] border-[var(--yieldlens-border)]' },
                ].map((item) => (
                  <div key={item.label} className={`border p-4 rounded-2xl ${item.tone}`}>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] font-semibold mb-1">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-stone-900">{item.value}</p>
                    <p className="text-xs leading-5 mt-2 text-[var(--yieldlens-muted)]">
                      {item.helper}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-muted)] font-semibold mb-3">
                    Trading assumptions
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)]">
                    {[
                      { label: 'Location', value: 'South London cafe unit' },
                      { label: 'Annual rent', value: '£60,000' },
                      { label: 'Monthly rent', value: '£5,000' },
                      { label: 'Average spend', value: '£12' },
                      { label: 'Expected customers/day', value: '80' },
                      { label: 'Opening days/month', value: '26' },
                      { label: 'Estimated monthly revenue', value: '£24,960' },
                      { label: 'Staff, utilities, rates, rent', value: '£14,100 total cost base' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-4 border-b border-white/60 last:border-b-0 px-3 py-2.5"
                      >
                        <p className="text-xs text-[var(--yieldlens-muted)]">{item.label}</p>
                        <p className="text-xs font-semibold text-stone-900 text-right">
                          {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                  What this makes you ask
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 leading-6">
                  <p>Can the landlord support a rent-free period or contribution?</p>
                  <p>Is the service charge capped or still an estimate?</p>
                  <p>What evidence supports the expected footfall and spend?</p>
                  <p>What happens if opening is delayed or fit-out changes?</p>
                </div>
              </div>
            </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-muted)] font-semibold mb-3">
                    Opening cash
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)]">
                    {[
                      { label: 'Fit-out', value: '£50,000' },
                      { label: 'Rent deposit', value: '£15,000' },
                      { label: 'Legal fees', value: '£3,000' },
                      { label: 'Opening stock', value: '£8,000' },
                      { label: 'Other setup costs', value: '£5,000' },
                      { label: 'Upfront cash needed', value: '£81,000' },
                      { label: 'Starting cash', value: '£90,000' },
                      { label: 'Cash after opening', value: '£9,000' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-4 border-b border-white/60 last:border-b-0 px-3 py-2.5"
                      >
                        <p className="text-xs text-[var(--yieldlens-muted)]">{item.label}</p>
                        <p className="text-xs font-semibold text-stone-900 text-right">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-muted)] font-semibold mb-3">
                    Downside case
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)]">
                    {[
                      { label: 'Downside case', value: '60% of expected revenue' },
                      { label: 'Downside revenue', value: '£14,976' },
                      { label: 'Downside monthly position', value: '£876 surplus' },
                      { label: 'Survival runway', value: 'No monthly burn in downside case' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-4 border-b border-white/60 last:border-b-0 px-3 py-2.5"
                      >
                        <p className="text-xs text-[var(--yieldlens-muted)]">{item.label}</p>
                        <p className="text-xs font-semibold text-stone-900 text-right">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 mt-4">
                    <p className="text-xs font-semibold text-amber-950 mb-1">
                      Sample diagnostic note
                    </p>
                    <p className="text-xs text-amber-900 leading-5">
                      Pass, but the opening cash buffer is thin. The assumptions need evidence before signing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What YieldLens does"
            title="The free check gives a fast viability snapshot."
            description="The £49 Standard file turns the result into a structured decision memo with stress-test interpretation, negotiation levers, evidence checklist, and lease questions."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <BulletList
                items={[
                  'Rent burden, break-even customers, opening cash, downside trading, and six-month survival.',
                  'A quick view of the headline pressure points before you commit.',
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
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                What to verify before signing
              </p>
              <BulletList
                items={[
                  'Comparable commercial rents',
                  'Service charge',
                  'Business rates',
                  'Fit-out quotes',
                  'Deposit terms',
                  'Rent-free period',
                  'Landlord contribution',
                  'Break clause',
                  'Repair obligations',
                  'Permitted use',
                  'Licensing or planning where relevant',
                  'Realistic revenue evidence',
                ]}
              />
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-caution)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Where it fits in the funnel
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {commercialLinks.map((link, index) => (
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

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial lease viability FAQs"
        description="Practical answers for operators checking whether a site can carry the lease before they sign."
        faqs={faqs}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className="bg-stone-950 text-white border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-8 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#D6C7A2] font-medium mb-3">
                Why the file exists
              </p>
              <h2 className="text-3xl font-bold mb-4 text-white">
                A fast snapshot is useful, but the lease needs a decision memo.
              </h2>
              <p className="text-sm text-stone-300 leading-7 max-w-2xl">
                The free check gives the headline viability view. The Standard file turns that result into stress-test interpretation, negotiation levers, evidence questions, and a printable memo you can use before signing.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/commercial-lease-viability-check"
                  ctaLabel="Run a free commercial check"
                  pageType="commercial_landing"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/commercial-lease-viability-check"
                  ctaLabel="View sample viability file"
                  pageType="commercial_landing"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
            </div>

            <div className={`${surfaceCardClass} bg-white p-5 sm:p-6 text-stone-900`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Standard commercial viability file
              </p>
              <p className="text-3xl font-bold text-stone-900 mb-3">£49</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                The paid file is tied to the saved commercial result and can be opened, printed, or saved as PDF after checkout.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/viability-file" className={secondaryCtaClass}>
                  View viability file
                </Link>
                <Link href="/how-it-works" className={secondaryCtaClass}>
                  Learn how it works
                </Link>
              </div>
            </div>
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

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <ToolConversionPanel
            sourceTool="commercial_lease_page"
            title="Run the free commercial check before you sign the lease."
            description="Enter the rent, trading assumptions, known costs, upfront cash items, starting cash, and downside revenue. YieldLens UK will return the headline viability score, rent burden, break-even customers, risk flags, and six-month survival view."
            primaryLabel="Run free commercial check"
            primaryHref="/check?mode=commercial"
            secondaryLabel="View sample viability file"
            secondaryHref="/sample-commercial-viability-file"
          />
        </div>
      </section>
    </div>
  );
}
