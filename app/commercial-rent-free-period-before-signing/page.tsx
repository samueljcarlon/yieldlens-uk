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
  title: 'Commercial Rent-Free Period Before Signing | YieldLens UK',
  description:
    'Understand how a rent-free period, fit-out period or landlord incentive can affect opening cash, rent burden and commercial lease viability before signing.',
  alternates: {
    canonical: '/commercial-rent-free-period-before-signing',
  },
  openGraph: {
    title: 'Commercial Rent-Free Period Before Signing | YieldLens UK',
    description:
      'Understand how a rent-free period, fit-out period or landlord incentive can affect opening cash, rent burden and commercial lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-rent-free-period-before-signing',
  },
};

const faqItems = [
  {
    question: 'What is a rent-free period in a commercial lease?',
    answer:
      'A rent-free period is a period at the start of a lease when rent is reduced or waived. It is often used to support fit-out, launch, or early trading.',
  },
  {
    question: 'Is a rent-free period better than lower rent?',
    answer:
      'Not always. Lower headline rent helps every month, while a rent-free period helps most at the start. Which is better depends on the cash profile of the deal.',
  },
  {
    question: 'Does a rent-free period cover service charge?',
    answer:
      'Not necessarily. Some rent-free periods cover rent only, while service charge, insurance, VAT, or other costs may still apply. The wording matters.',
  },
  {
    question: 'Can a rent-free period improve commercial lease viability?',
    answer:
      'Yes. If it preserves cash at the point when fit-out and launch costs are highest, it can improve opening cash, reduce early pressure, and make the lease easier to carry.',
  },
  {
    question: 'How long should a rent-free period be?',
    answer:
      'There is no universal answer. The useful question is whether the period covers the realistic fit-out and opening timetable, not just a neat number in the heads of terms.',
  },
  {
    question: 'Is YieldLens giving lease negotiation advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It helps you understand the commercial pressure points, but it does not replace legal, tax, finance, or lease negotiation advice.',
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
      name: 'Commercial Rent-Free Period Before Signing',
      item: 'https://yieldlens.co.uk/commercial-rent-free-period-before-signing',
    },
  ],
};

const changesRows = [
  {
    title: 'Cash retained before trading',
    text: 'A rent-free period can preserve cash during the most expensive part of the launch.',
  },
  {
    title: 'Fit-out breathing room',
    text: 'It can reduce the gap between paying for works and actually opening the doors.',
  },
  {
    title: 'Working capital after opening',
    text: 'If the incentive is structured well, more cash can remain available after launch.',
  },
  {
    title: 'Weak first-month trading',
    text: 'The early runway matters because revenue often arrives later than the costs.',
  },
  {
    title: 'Timing mismatch',
    text: 'The real question is whether the lease timing matches the opening timetable and cash plan.',
  },
];

const comparisonRows = [
  {
    title: 'Lower headline rent',
    text: 'Reduces the monthly fixed commitment.',
  },
  {
    title: 'Rent-free period',
    text: 'Preserves cash at the start and during launch.',
  },
  {
    title: 'Landlord contribution',
    text: 'Helps with fit-out cash directly.',
  },
  {
    title: 'Reduced deposit',
    text: 'Leaves more working capital after signing.',
  },
  {
    title: 'Stepped rent',
    text: 'Reduces early pressure by phasing the rent up over time.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Starting cash', value: '£90,000' },
  { label: 'Upfront cash needed', value: '£81,000' },
  { label: 'Opening buffer', value: '£9,000' },
];

const relatedLinks = [
  { href: '/commercial-heads-of-terms-before-signing', label: 'Commercial heads of terms before signing' },
  { href: '/commercial-lease-checklist-before-signing', label: 'Commercial lease checklist before signing' },
  { href: '/commercial-lease-deposit-before-signing', label: 'Commercial lease deposit before signing' },
  { href: '/commercial-lease-costs-before-signing', label: 'Commercial lease costs before signing' },
  { href: '/commercial-rent-review-before-signing', label: 'Commercial rent review before signing' },
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

export default function CommercialRentFreePeriodBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-rent-free-period-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial rent-free period before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial rent-free period
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial rent-free period before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A rent-free period can be more than a small incentive. For a new commercial tenant, it can change the opening cash buffer, fit-out pressure, early trading runway and whether the site can carry the rent after launch.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to judge whether the timing of the incentive actually helps the deal, then run the free commercial check if you want to test the rent and cash pressure together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-rent-free-period-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-rent-free-period-before-signing"
                  ctaLabel="View sample viability file"
                  pageType="seo_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
                <Link href="/commercial-lease-costs-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease costs before signing
                </Link>
                <Link href="/commercial-lease-checklist-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease checklist before signing
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
                What the incentive changes
              </p>
              <div className="space-y-3">
                {changesRows.map((row) => (
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
            eyebrow="What it changes"
            title="A rent-free period changes timing, not just cost."
            description="The useful question is whether it buys enough breathing room to survive fit-out, launch, and weak early trading."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {comparisonRows.map((row, index) => (
              <div
                key={row.title}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-primary)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-fragile)]'
                          : 'border-t-[var(--yieldlens-risk)]'
                }`}
              >
                <h3 className="text-base font-semibold text-stone-900 mb-2">{row.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Illustrative example"
            title="A simple example shows why the timing matters."
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
                A 3-month rent-free period could preserve up to £15,000 of early cash if it is applied to the right period, but the real impact depends on lease wording, timing, service charge, fit-out dates and the trading start date.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                The point is not that every tenant will get the same incentive. The point is that the wording and timing can materially change whether the lease still looks workable once the site opens.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="What should you ask before relying on a rent-free period?"
            description="The small print matters because a rent-free period can be narrower than it first sounds."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Does it cover the fit-out period only or trading period too?',
              'Does rent still accrue later?',
              'Are service charge and insurance still payable?',
              'Does the rent-free period depend on signing quickly?',
              'What happens if opening is delayed?',
              'Is the deposit based on full rent?',
              'Is VAT payable?',
              'Are there conditions attached?',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index % 4 === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index % 4 === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : index % 4 === 2
                        ? 'border-t-[var(--yieldlens-positive)]'
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
            title="Use the free commercial check to test whether the incentive actually improves viability."
            description="A rent-free period only matters if the rest of the cash stack and trading assumptions still work."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Rent burden',
                text: 'See whether the monthly rent pressure is still manageable.',
              },
              {
                title: 'Opening cash pressure',
                text: 'Check whether the launch buffer still survives fit-out and deposits.',
              },
              {
                title: 'Downside trading',
                text: 'Test whether weak opening months still leave room to trade.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : 'border-t-[var(--yieldlens-fragile)]'
                }`}
              >
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-rent-free-period-before-signing"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/viability-file" className={heroSecondaryCtaClass}>
                £49 Standard Commercial Viability File
            </Link>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Paid file"
            title="The £49 Standard commercial viability file turns the free check into a printable memo."
            description="It organises the assumptions, stress tests, negotiation levers, evidence checklist, and lease questions in one place."
          />
          <div className={`${surfaceCardClass} p-5 sm:p-6`}>
            <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
              If the rent-free period changes the picture enough to keep the site in play, the sample file shows the format and the £49 Standard Commercial Viability File turns the result into a decision-support memo after the free check.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/commercial-rent-free-period-before-signing"
                ctaLabel="View sample viability file"
                pageType="seo_page"
                className={heroPrimaryCtaClass}
              >
                View sample viability file
              </TrackedCtaLink>
              <Link href="/commercial-lease-costs-before-signing" className={secondaryCtaClass}>
                Commercial lease costs before signing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial rent-free period FAQs"
        description="Practical answers for people comparing incentives, fit-out periods, and launch cash."
        faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Move to the page that matches the next question."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${surfaceCardClass} p-5 sm:p-6 border border-[var(--yieldlens-border)] hover:-translate-y-0.5 transition-transform`}
              >
                <p className="text-base font-semibold text-stone-900 mb-2">{link.label}</p>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                  {link.href === '/check?mode=commercial'
                    ? 'Run the rent, cash, and lease pressure test.'
                    : link.href === '/sample-commercial-viability-file'
                      ? 'See the printed memo format before paying.'
                      : 'Continue the commercial lease decision path.'}
                </p>
              </Link>
            ))}
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
