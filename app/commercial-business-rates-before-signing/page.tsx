import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
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
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
  supportingTextClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Commercial Business Rates Before Signing | YieldLens UK',
  description:
    'Check how business rates can affect commercial rent affordability, monthly cost base and lease viability before signing.',
  alternates: {
    canonical: '/commercial-business-rates-before-signing',
  },
  openGraph: {
    title: 'Commercial Business Rates Before Signing | YieldLens UK',
    description:
      'Check how business rates can affect commercial rent affordability, monthly cost base and lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-business-rates-before-signing',
  },
};

const faqItems = [
  {
    question: 'Why should I check business rates before signing a commercial lease?',
    answer:
      'Business rates can materially change the monthly cost base. If they are understated, the lease can look affordable on rent alone but still be too tight once the full occupancy stack is included.',
  },
  {
    question: 'Are business rates included in commercial rent?',
    answer:
      'Usually not. Business rates are typically separate from rent, so they should be checked as part of the wider occupancy cost before you sign.',
  },
  {
    question: 'Can business rates affect rent affordability?',
    answer:
      'Yes. If rates are higher than expected, the business has less room for rent, staff, stock, utilities, and weak trading months.',
  },
  {
    question: 'Should I include business rates in my break-even calculation?',
    answer:
      'Yes. If they are part of the occupied cost base, they should be included when you test break-even customers or sales level.',
  },
  {
    question: 'Where should I verify business rates before signing?',
    answer:
      'Verify the figure with official and local sources, and get professional support where needed. YieldLens does not confirm rates liability or tax treatment.',
  },
  {
    question: 'Is YieldLens giving business rates or tax advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It does not give tax advice, does not confirm relief eligibility, and does not replace professional due diligence.',
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
      name: 'Commercial Business Rates Before Signing',
      item: 'https://yieldlens.co.uk/commercial-business-rates-before-signing',
    },
  ],
};

const compareRows = [
  {
    title: 'Headline rent',
    text: 'The obvious lease figure, but only one part of the cost base.',
  },
  {
    title: 'Business rates',
    text: 'A separate recurring property cost that can materially change affordability.',
  },
  {
    title: 'Service charge',
    text: 'Shared estate or building costs that sit on top of rent and rates.',
  },
  {
    title: 'Insurance',
    text: 'The lease may require building or occupier insurance as an extra cost.',
  },
  {
    title: 'Utilities and staffing',
    text: 'Running costs and labour can tighten the monthly cost base quickly.',
  },
  {
    title: 'Opening cash buffer',
    text: 'Upfront spend matters because the business needs room before trade settles.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Rent burden', value: '20.0%' },
  { label: 'Known monthly cost base', value: '£14,100' },
  { label: 'Break-even customers/day', value: '45.2' },
  { label: 'Opening cash buffer', value: '£9,000' },
];

const verificationChecks = [
  'What business rates figure is being assumed?',
  'Is the figure based on an official or local source, or only an estimate?',
  'Does the figure assume relief, and is that assumption current?',
  'When does the tenant become responsible for paying?',
  'Are rates payable during fit-out or before trading starts?',
  'Does the cost change if the use or occupation changes?',
  'Has the figure been checked against current property details?',
  'Has professional support been used where the position is unclear?',
];

const relatedLinks = [
  {
    href: '/commercial-lease-checklist-before-signing',
    label: 'Commercial lease checklist before signing',
    description: 'Use the hub when you want the full pre-signing sequence.',
  },
  {
    href: '/commercial-lease-costs-before-signing',
    label: 'Commercial lease costs before signing',
    description: 'Check the broader cost stack around the rent figure.',
  },
  {
    href: '/commercial-service-charge-before-signing',
    label: 'Commercial service charge before signing',
    description: 'Check another recurring occupancy cost that sits beside rates.',
  },
  {
    href: '/commercial-rent-affordability-calculator',
    label: 'Commercial rent affordability calculator',
    description: 'See whether the site still fits after costs and trading pressure.',
  },
  {
    href: '/commercial-rent-burden-calculator',
    label: 'Commercial rent burden calculator',
    description: 'Turn rent pressure into a share-of-revenue screen.',
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

export default function CommercialBusinessRatesBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-business-rates-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial business rates before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial business rates
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial business rates before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Business rates can materially change the true monthly cost of a commercial site. A unit can look affordable on headline rent, but become tighter once rates, service charge, insurance, utilities and opening costs are included.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Treat business rates as part of the cost stack, then run the free commercial check if you want to see whether the lease still carries after the full occupancy cost is added in.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-business-rates-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-business-rates-before-signing"
                  ctaLabel="View sample viability file"
                  pageType="seo_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
                <Link href="/commercial-lease-checklist-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                Commercial lease checklist before signing
                </Link>
                <Link href="/commercial-lease-costs-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease costs before signing
                </Link>
                <Link href="/commercial-lease-viability-check" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease viability check
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Why business rates matter
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: 'Monthly cost base',
                    text: 'Rates sit alongside rent and can shift the total monthly occupancy cost quickly.',
                  },
                  {
                    title: 'Break-even customers',
                    text: 'If rates are understated, the daily trading target moves up.',
                  },
                  {
                    title: 'Opening cash pressure',
                    text: 'Higher recurring costs leave less room for fit-out, deposit, stock, and weak opening months.',
                  },
                  {
                    title: 'Verification first',
                    text: 'Treat the rates figure as an assumption until it is checked against official or local sources.',
                  },
                ].map((row) => (
                  <div key={row.title} className={`${surfaceCardSoftClass} p-4`}>
                    <p className="text-sm font-semibold text-stone-900 mb-1">{row.title}</p>
                    <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{row.text}</p>
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
            title="Business rates are part of the full occupancy cost, not a side note."
            description="The relevant question is not just whether rent is affordable. It is whether the whole monthly cost base still works once rates are included."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Monthly cost base',
                text: 'Rates sit beside rent, service charge, insurance, utilities, and staffing when you judge whether the site can carry itself.',
              },
              {
                title: 'Break-even pressure',
                text: 'If rates are higher than expected, the business needs more revenue or stronger margins to stay on track.',
              },
              {
                title: 'Downside trading',
                text: 'Extra recurring cost makes it harder for the site to survive a slow opening or weak early trade.',
              },
              {
                title: 'Cash buffer',
                text: 'A thin opening buffer means there is less room for the business to absorb surprise occupancy costs.',
              },
              {
                title: 'Assumption risk',
                text: 'If the rates figure is only an estimate, treat it as a key assumption that needs verification before signing.',
              },
              {
                title: 'Lease viability',
                text: 'A lease can look fine on rent alone and still be too tight once rates are added.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
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
            eyebrow="Headroom"
            title="Headline rent can look fine and still leave little room once rates are added."
            description="This is a recurring occupancy cost issue. The lease needs to survive the full monthly cost stack, not just the rent headline."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compareRows.map((row, index) => (
              <div
                key={row.title}
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
                <h3 className="text-base font-semibold text-stone-900 mb-2">{row.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Illustrative example"
            title="If business rates are understated, the break-even target moves up."
            description="This is an illustrative scenario, not a real case study."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 items-start">
            <div className={`${surfaceCardClass} p-5 sm:p-6`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exampleRows.map((row) => (
                  <div key={row.label} className={`${surfaceCardSoftClass} p-3`}>
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)]">{row.label}</p>
                    <p className="text-lg font-semibold text-stone-900 mt-1">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${surfaceCardSoftClass} p-5 sm:p-6`}>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                In this example, the rates figure sits inside the monthly cost base. If it is understated, the business needs more revenue to support the same lease. That is why the rates assumption should be checked before the site feels committed.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                The useful question is not only whether the rent feels manageable. It is whether the full cost base still leaves a workable margin of safety after business rates are included.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to verify"
            title="What should you check before relying on a business rates assumption?"
            description="Verify the figure with official or local sources and get professional support where needed. Do not treat an estimate as settled without checking it."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verificationChecks.map((item, index) => (
              <div
                key={item}
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
                                : 'border-t-[var(--yieldlens-fragile)]'
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
            eyebrow="How YieldLens helps"
            title="The free commercial check tests business rates alongside the rest of the cost base."
            description="Business rates only matter in context. The free check shows whether the lease still works once rent, recurring costs, opening cash, and downside trading are all considered."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Rent burden, break-even customers, monthly cost pressure, opening cash, and downside trading.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Fast pressure test for whether the site deserves deeper work.</span>
                </li>
              </ul>
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                £49 Standard Commercial Viability File
              </p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Stress-test interpretation, negotiation levers, evidence checklist, and lease questions.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>A printable decision memo tied to the saved result.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Useful when the figures need to become a decision path before signing.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-business-rates-before-signing"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/viability-file" className={secondaryCtaClass}>
              £49 Standard Commercial Viability File
            </Link>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Use the next page that matches the cost question."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${surfaceCardClass} p-5 sm:p-6 border border-[var(--yieldlens-border)] hover:-translate-y-0.5 transition-transform`}
              >
                <p className="text-base font-semibold text-stone-900 mb-2">{link.label}</p>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial business rates FAQs"
        description="Short answers for people comparing recurring occupancy costs before they sign."
        faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

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
