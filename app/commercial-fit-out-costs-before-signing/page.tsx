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
  title: 'Commercial Fit-Out Costs Before Signing | YieldLens UK',
  description:
    'Check how fit-out costs, setup costs, opening cash and launch delays can affect commercial lease viability before signing.',
  alternates: {
    canonical: '/commercial-fit-out-costs-before-signing',
  },
  openGraph: {
    title: 'Commercial Fit-Out Costs Before Signing | YieldLens UK',
    description:
      'Check how fit-out costs, setup costs, opening cash and launch delays can affect commercial lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-fit-out-costs-before-signing',
  },
};

const faqItems = [
  {
    question: 'Why do fit-out costs matter before signing a commercial lease?',
    answer:
      'Fit-out costs are often paid before the site starts trading. They can absorb working capital and make a lease feel much tighter than the headline rent suggests.',
  },
  {
    question: 'Should fit-out costs be included in a lease affordability check?',
    answer:
      'Yes. A rent-only check can miss the cash strain created by works, equipment, and launch costs before revenue begins.',
  },
  {
    question: 'Can a rent-free period help with fit-out costs?',
    answer:
      'It can help with timing if the wording and dates line up with the works and opening plan, but it does not remove the underlying fit-out cost.',
  },
  {
    question: 'What fit-out costs are often missed?',
    answer:
      'Landlord works, utilities, extraction, fire safety, access works, compliance work, signage, professional fees, and contingencies are often missed.',
  },
  {
    question: 'What happens if fit-out costs overrun?',
    answer:
      'If the budget is too optimistic, the opening cash buffer can be used up before trading settles. That can make a site harder to carry if early revenue is slow.',
  },
  {
    question: 'Is YieldLens giving construction or lease advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It helps you understand the commercial pressure points, but it does not replace legal, tax, finance, construction, or lease advice.',
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
      name: 'Commercial Fit-Out Costs Before Signing',
      item: 'https://yieldlens.co.uk/commercial-fit-out-costs-before-signing',
    },
  ],
};

const impactRows = [
  {
    title: 'Paid before revenue',
    text: 'Fit-out is usually paid before the business has any meaningful trading income.',
  },
  {
    title: 'Working capital drain',
    text: 'The works can absorb cash that would otherwise support staffing, stock, or opening months.',
  },
  {
    title: 'Launch delay risk',
    text: 'If the build takes longer, more cash is burned before the site can trade.',
  },
  {
    title: 'Lease interaction',
    text: 'Fit-out pressure matters even more when rent-free timing, deposit, and service charge are also in play.',
  },
  {
    title: 'Lease viability',
    text: 'The question is not just whether the works are affordable, but whether enough cash remains to survive after opening.',
  },
];

const compareRows = [
  {
    title: 'Fit-out works',
    text: 'The core build or conversion work needed to get the unit trading.',
  },
  {
    title: 'Landlord works',
    text: 'Any landlord-provided works or contributions that affect the scope of tenant spend.',
  },
  {
    title: 'Equipment',
    text: 'Commercial equipment or machinery needed for the business model.',
  },
  {
    title: 'Furniture and fixtures',
    text: 'Chairs, counters, shelving, and fixed items required to open.',
  },
  {
    title: 'Signage and branding',
    text: 'External or internal signage, brand setup, and display costs.',
  },
  {
    title: 'Opening stock',
    text: 'Initial stock or inventory needed to start trading.',
  },
  {
    title: 'Professional fees and contingency',
    text: 'The budget should include fees and a buffer for surprises.',
  },
];

const exampleRows = [
  { label: 'Starting cash', value: '£90,000' },
  { label: 'Fit-out', value: '£50,000' },
  { label: 'Rent deposit', value: '£15,000' },
  { label: 'Legal fees', value: '£3,000' },
  { label: 'Opening stock', value: '£8,000' },
  { label: 'Other setup costs', value: '£5,000' },
  { label: 'Upfront cash needed', value: '£81,000' },
  { label: 'Opening cash buffer', value: '£9,000' },
];

const relatedLinks = [
  { href: '/commercial-lease-costs-before-signing', label: 'Commercial lease costs before signing' },
  { href: '/commercial-lease-deposit-before-signing', label: 'Commercial lease deposit before signing' },
  { href: '/commercial-rent-free-period-before-signing', label: 'Commercial rent-free period before signing' },
  { href: '/commercial-service-charge-before-signing', label: 'Commercial service charge before signing' },
  { href: '/commercial-lease-checklist-before-signing', label: 'Commercial lease checklist before signing' },
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

export default function CommercialFitOutCostsBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-fit-out-costs-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial fit-out costs before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial fit-out costs
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial fit-out costs before signing a lease
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Fit-out can be one of the biggest cash drains before a commercial site starts trading. A lease can look affordable on monthly rent, but still become fragile if fit-out, deposit, legal fees, opening stock and early trading losses leave too little cash buffer.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to understand the opening spend before signing, then run the free commercial check if you want to test the lease pressure together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-fit-out-costs-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-fit-out-costs-before-signing"
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
                <Link href="/commercial-lease-deposit-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease deposit before signing
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
                Why fit-out matters
              </p>
              <div className="space-y-3">
                {impactRows.map((row) => (
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
            eyebrow="Fit-out versus opening cash"
            title="The question is not just whether you can afford the fit-out."
            description="It is what cash remains after fit-out and lease costs are paid."
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
                            : index === 5
                              ? 'border-t-[var(--yieldlens-caution)]'
                              : 'border-t-[var(--yieldlens-primary)]'
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
            title="A simple example shows why the opening buffer matters."
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
                The fit-out cost is the largest single opening item. Even if the lease passes a monthly downside test, the opening buffer can still be thin if fit-out costs overrun.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                The useful question is not only whether the site will work after opening. It is whether enough cash remains after the build, deposits, and other lease costs have been paid.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="What should you check before relying on a fit-out budget?"
            description="These are practical checks to verify with appropriate professional support."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Is the fit-out quote fixed or estimated?',
              'What is excluded from the quote?',
              'Are landlord works included?',
              'Who pays for utilities, extraction, fire safety, access works or compliance works?',
              'Does the lease allow the intended works?',
              'Is landlord consent needed?',
              'What happens if opening is delayed?',
              'Does the rent-free period cover fit-out only or early trading too?',
              'Is there a contingency?',
              'What cash remains after fit-out, deposit and stock?',
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
            title="Use the free commercial check to test the opening cash pressure."
            description="Fit-out only matters in context. The free check puts it next to rent, deposit, and downside trading."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Opening cash pressure',
                text: 'See whether the cash left after fit-out still looks usable.',
              },
              {
                title: 'Rent burden',
                text: 'Check whether the rent still fits once the opening cash stack is paid.',
              },
              {
                title: 'Downside trading',
                text: 'Test whether a slower start still leaves room to survive.',
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
              pagePath="/commercial-fit-out-costs-before-signing"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/commercial-lease-viability-check" className={heroSecondaryCtaClass}>
              Commercial lease viability check
            </Link>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Paid file"
            title="The £49 Standard commercial viability file turns the check into a printable memo."
            description="It organises the opening capital stack, assumption review, stress-test interpretation, negotiation levers, evidence checklist, and lease questions in one place."
          />
          <div className={`${surfaceCardClass} p-5 sm:p-6`}>
            <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
              If fit-out is the main question, the sample file shows the format and the Standard file turns the result into a decision-support memo after the free check.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/commercial-fit-out-costs-before-signing"
                ctaLabel="See sample viability file"
                pageType="seo_page"
                className={heroPrimaryCtaClass}
              >
                See sample viability file
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
        title="Commercial fit-out costs FAQs"
        description="Short answers for people comparing opening spend, working capital and lease viability."
        faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Move to the page that matches the next cost question."
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
