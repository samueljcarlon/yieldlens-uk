import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import FaqSection from '@/components/FaqSection';
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
  title: 'Commercial Rent Affordability Calculator | Can the Business Carry the Rent?',
  description:
    'Check whether a business can carry the rent by pressure-testing revenue, operating costs, opening cash, and downside trading before signing a commercial lease.',
  alternates: {
    canonical: '/commercial-rent-affordability-calculator',
  },
  openGraph: {
    title: 'Commercial Rent Affordability Calculator | Can the Business Carry the Rent? | YieldLens UK',
    description:
      'Check whether a business can carry the rent by pressure-testing revenue, operating costs, opening cash, and downside trading before signing a commercial lease.',
    url: 'https://yieldlens.co.uk/commercial-rent-affordability-calculator',
  },
};

const faqItems = [
  {
    question: 'What is a commercial rent affordability calculator?',
    answer:
      'It is an indicative pressure test that asks whether the business can carry the rent once monthly revenue, costs, opening cash, and downside trading are taken into account.',
  },
  {
    question: 'How is this different from a rental valuation?',
    answer:
      'A rental valuation estimates market rent. A rent affordability check tests whether the business model can carry that rent before you commit to the lease.',
  },
  {
    question: 'What rent burden is too high?',
    answer:
      'YieldLens uses 12% as a healthier screening level and 18% as a caution threshold. Those are indicative screening thresholds, not universal rules.',
  },
  {
    question: 'What should I include in the check?',
    answer:
      'Include expected customers, average spend, opening days, staff costs, business rates, utilities, fit-out, deposit, legal fees, opening stock, and starting cash.',
  },
  {
    question: 'Can this tell me whether to sign the lease?',
    answer:
      'No. It helps structure the commercial questions and highlights where the risk sits, but it does not replace professional due diligence.',
  },
  {
    question: 'Does YieldLens review the lease documents?',
    answer:
      'No. YieldLens does not inspect the property or verify lease wording. It turns the assumptions you enter into an early warning view.',
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

const quickAnswerBullets = [
  'Rent is not taking too much expected revenue.',
  'Break-even customers/day sits below realistic customers/day.',
  'Monthly staff, rates, utilities, and known costs are included.',
  'Fit-out, deposit, legal fees, stock, and setup costs leave enough opening cash.',
  'Downside trading does not exhaust the buffer too quickly.',
  'Lease terms do not create hidden cost pressure.',
];

const operatorExamples = [
  {
    title: 'Cafe',
    text: 'Morning and lunch peaks, seating, takeaway mix, coffee margin, staffing, and waste all change what the rent feels like in practice.',
  },
  {
    title: 'Restaurant',
    text: 'Covers, gross margin, kitchen fit-out, utilities, and rota pressure can make a rent look harder to carry than the headline number suggests.',
  },
  {
    title: 'Salon',
    text: 'Chair or room utilisation, repeat bookings, no-shows, and staff productivity all affect how much rent the business can carry.',
  },
];

const whatToVerify = [
  'Realistic revenue evidence',
  'Comparable rents',
  'Service charge',
  'Business rates',
  'Utilities',
  'Staffing',
  'Supplier costs',
  'Fit-out quotes',
  'Deposit terms',
  'Rent-free period',
  'Break clause',
];

const relatedLinks = [
  { href: '/commercial-lease-costs-before-signing', label: 'Commercial lease costs before signing' },
  { href: '/commercial-service-charge-before-signing', label: 'Commercial service charge before signing' },
  { href: '/commercial-fit-out-costs-before-signing', label: 'Commercial fit-out costs before signing' },
  { href: '/check?mode=commercial', label: 'Commercial lease viability check' },
  { href: '/commercial-lease-viability-check', label: 'Commercial lease viability page' },
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

export default function CommercialRentAffordabilityCalculatorPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-rent-affordability-calculator"
        pageType="calculator_page"
        mode="commercial"
        eventLabel="Commercial rent affordability calculator viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial rent affordability calculator
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                How much commercial rent can your business afford? Rent affordability is not just the market rent. It is whether the business can carry the rent after staff, stock, utilities, service charge, setup costs, and weaker early trade.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this when you need to know whether a unit can carry the rent before you sign. If the answer needs more context, the free commercial check and the £49 Standard file turn the result into a practical decision path.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-rent-affordability-calculator"
                  ctaLabel="Run a free commercial check"
                  pageType="calculator_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
                  View sample viability file
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
                <Link href="/commercial-lease-viability-check" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease viability check
                </Link>
                <Link href="/commercial-rent-burden-calculator" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial rent burden calculator
                </Link>
                <Link href="/how-it-works" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  How it works
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Rent affordability in practice
              </p>
              <div className="space-y-4">
                <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                  <p className="text-sm font-semibold text-stone-900 mb-1">What it asks</p>
                  <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                    Can the business carry the rent after costs and weak trading are included?
                  </p>
                </div>
                <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4">
                  <p className="text-sm font-semibold text-stone-900 mb-1">What it checks</p>
                  <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                    Rent burden, break-even customers, monthly costs, opening cash, and downside trading.
                  </p>
                </div>
                <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                  <p className="text-sm font-semibold text-stone-900 mb-1">What comes next</p>
                  <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                    The free check gives a fast snapshot. The Standard file turns it into a decision memo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} mt-8`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Quick answer"
            title="A business is more likely to afford the rent when there is room to breathe."
            description="The rent should leave enough room for staff, stock, utilities, service charge, and weaker trading months. Use 12% as a healthier screen and 18% as a caution threshold."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${surfaceCardClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">The business is more likely to carry the rent when:</p>
              <BulletList items={quickAnswerBullets} />
            </div>
            <div className={`${surfaceCardSoftClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">Why this page exists</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                Search results often mix commercial rent affordability, rent burden, and rental valuation terms. YieldLens is focused on the tenant side of the question. It helps you work out whether the business can carry the rent before you sign, rather than estimating what the market rent should be.
              </p>
              <div className="mt-5 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                A site can be fairly priced in the market and still be unaffordable for a specific business.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What rent affordability should include"
            title="The result should cover the full lease pressure, not just the rent number."
            description="A practical affordability check needs to include revenue, costs, opening cash, and the weaker parts of trading."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Rent as a share of revenue',
                text: 'Shows how much of expected turnover goes straight to rent before the rest of the cost base is paid.',
              },
              {
                title: 'Break-even sales or customers',
                text: 'Turns the rent and cost base into a daily target the operator can judge against real footfall.',
              },
              {
                title: 'Monthly fixed costs',
                text: 'Staff, rates, utilities, insurance, and other known costs all affect whether the site is really affordable.',
              },
              {
                title: 'Opening cash buffer',
                text: 'Fit-out, deposit, legal fees, stock, and setup costs can make an affordable rent feel expensive in practice.',
              },
              {
                title: 'Weak trading months',
                text: 'A site must survive slower periods, not only best-case weeks and launch enthusiasm.',
              },
              {
                title: 'Lease terms to verify',
                text: 'Break clauses, permitted use, repair obligations, and deposit terms can change the risk materially.',
              },
            ].map((item, index) => (
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
                            : 'border-t-[var(--yieldlens-caution)]'
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
            title="Affordable rent depends on the trading model."
            description="The same rent can feel manageable for one operator and too heavy for another."
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
            eyebrow="What to verify"
            title="Before using the result, check that the assumptions are real."
            description="A rent affordability check is only as useful as the evidence behind the numbers."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatToVerify.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-4 sm:p-5 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-positive)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-primary)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-fragile)]'
                          : index === 4
                            ? 'border-t-[var(--yieldlens-risk)]'
                            : 'border-t-[var(--yieldlens-caution)]'
                }`}
              >
                <p className="text-sm font-medium text-stone-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#D6C7A2] font-medium mb-3">
                Worked example
              </p>
              <h2 className="text-3xl font-bold text-white mb-4">
                A redacted cafe example with numbers that are easy to pressure-test.
              </h2>
              <p className="text-sm text-stone-300 leading-7 max-w-2xl">
                This is a fictional redacted example, not a real address or live case. It shows how the screen works when rent looks high but service charge, staffing, and opening cash still need to be counted together.
              </p>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-stone-300 leading-7">
                Indicative view: needs caution. The rent is high enough to demand stronger evidence on customers, spend, opening cash, and lease terms.
              </div>
            </div>

            <div className={`${surfaceCardClass} bg-white p-5 sm:p-6 text-stone-900`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['Rent burden', '20.0%', '£5,000 rent against £24,960 expected monthly revenue.'],
                  ['Break-even/day', '45.2', 'Customers needed per day to cover the monthly cost base.'],
                  ['Opening buffer', '£9,000', 'Starting cash after fit-out, deposit, fees, stock, and setup.'],
                  ['Downside test', 'Pass', 'The weaker case still covers known monthly costs.'],
                ].map(([label, value, helper], index) => (
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
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs leading-5 mt-2 opacity-80">{helper}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="How YieldLens helps"
            title="The free check gives a fast affordability snapshot."
            description="The £49 Standard file turns the result into a decision memo with stress-test interpretation, negotiation levers, evidence checklist, and lease questions."
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
                What the result should help you decide
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Can this unit carry the rent?',
                  'What revenue is needed to support the lease?',
                  'Do the opening costs leave enough cash?',
                  'Do the lease terms need to be renegotiated?',
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
            Pressure-test the rent before you commit.
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Run a free commercial check, then decide whether the site deserves deeper work.
          </h2>
          <p className="text-sm text-[var(--yieldlens-muted)] leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge rent burden, break-even customers, opening cash, and downside trading before a lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-rent-affordability-calculator"
              ctaLabel="Run a free commercial check"
              pageType="calculator_page"
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
            <Link
              href="/commercial-lease-viability-check"
              className={secondaryCtaClass}
            >
              Commercial lease viability check
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Common questions about commercial rent affordability."
        description="Practical answers for operators who need a clearer view of rent, cash flow, and lease pressure before signing."
        faqs={faqItems}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D6C7A2] font-medium mb-3">
            Important disclaimer
          </p>
          <p className={disclaimerClass}>
            YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
