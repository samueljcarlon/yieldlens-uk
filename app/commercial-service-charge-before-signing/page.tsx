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
  title: 'Commercial Service Charge Before Signing',
  description:
    'Check how service charge, insurance, shared costs and variable lease costs affect commercial rent affordability before signing a lease.',
  alternates: {
    canonical: '/commercial-service-charge-before-signing',
  },
  openGraph: {
    title: 'Commercial Service Charge Before Signing',
    description:
      'Check how service charge, insurance, shared costs and variable lease costs affect commercial rent affordability before signing a lease.',
    url: 'https://yieldlens.co.uk/commercial-service-charge-before-signing',
  },
};

const faqItems = [
  {
    question: 'What is service charge in a commercial lease?',
    answer:
      'Service charge is the tenant contribution to shared building or estate costs. It can sit on top of rent and increase the true occupancy cost.',
  },
  {
    question: 'Is service charge included in commercial rent?',
    answer:
      'Not always. Some leases quote rent separately and then recover service charge, insurance, or other costs on top.',
  },
  {
    question: 'Can commercial service charge change after signing?',
    answer:
      'Yes, depending on the lease wording, the budget, the actual recoverable costs, and how the service charge is reconciled. The amount can move if the estimate differs from actual costs.',
  },
  {
    question: 'Should I include service charge in rent affordability?',
    answer:
      'Yes. If service charge is ignored, the occupancy cost can look smaller than it really is, which can make a lease seem easier to carry than it is.',
  },
  {
    question: 'What should I check before signing a lease with service charge?',
    answer:
      'Check whether it is fixed, capped, estimated, or variable; what it covers; whether major works or landlord fees are included; and how the estimate is reconciled.',
  },
  {
    question: 'Is YieldLens giving legal or lease advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It helps you understand the commercial pressure points, but it does not replace legal, tax, finance, or lease advice.',
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
      name: 'Commercial Service Charge Before Signing',
      item: 'https://yieldlens.co.uk/commercial-service-charge-before-signing',
    },
  ],
};

const impactRows = [
  {
    title: 'True occupancy cost',
    text: 'Service charge sits on top of rent and changes the real monthly cost of being in the unit.',
  },
  {
    title: 'Variable recovery risk',
    text: 'If the charge is estimated or reconciled later, the cost can move after the lease is signed.',
  },
  {
    title: 'Opening cash pressure',
    text: 'A higher occupancy stack leaves less room for fit-out, stock, staff, and weak opening months.',
  },
  {
    title: 'Downside trading',
    text: 'Unexpected recoveries can narrow the margin of safety if trading starts slowly.',
  },
  {
    title: 'Lease viability',
    text: 'The question is not only whether rent is affordable, but whether the full occupancy cost still works.',
  },
];

const compareRows = [
  {
    title: 'Headline rent',
    text: 'The obvious lease figure, but only one part of the full occupancy cost.',
  },
  {
    title: 'Service charge',
    text: 'Shared costs for the building or estate, which may be fixed, estimated, or variable.',
  },
  {
    title: 'Insurance recovery',
    text: 'The landlord may recover building insurance separately from rent.',
  },
  {
    title: 'Utilities',
    text: 'Running costs that can sit beside rent and service charge.',
  },
  {
    title: 'Business rates',
    text: 'A separate property cost that can be missed in a quick rent-only screen.',
  },
  {
    title: 'Repairs and maintenance',
    text: 'Lease wording can create exposure to upkeep or building costs beyond the headline rent.',
  },
  {
    title: 'Sinking fund / major works',
    text: 'If relevant, these can add another layer of recoverable or episodic cost.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Rent burden', value: '20.0%' },
  { label: 'Opening cash buffer', value: '£9,000' },
];

const relatedLinks = [
  { href: '/commercial-rent-burden-calculator', label: 'Commercial rent burden calculator' },
  { href: '/commercial-rent-affordability-calculator', label: 'Commercial rent affordability calculator' },
  { href: '/commercial-lease-costs-before-signing', label: 'Commercial lease costs before signing' },
  { href: '/commercial-business-rates-before-signing', label: 'Commercial business rates before signing' },
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

export default function CommercialServiceChargeBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-service-charge-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial service charge before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial service charge
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial service charge before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Service charge can materially change the true cost of a commercial lease. A site can look affordable on headline rent, but become much tighter once service charge, insurance, utilities, rates, repairs and opening costs are included.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to judge the hidden costs in the lease, then run the free commercial check if you want to test rent and occupancy pressure together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-service-charge-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-service-charge-before-signing"
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
                Why service charge matters
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
            eyebrow="Headline rent versus occupancy cost"
            title="The combined cost base matters more than headline rent alone."
            description="A good-looking rent can still hide a tighter deal once service charge and other occupancy costs are included."
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
            title="A simple example shows how service charge narrows the margin of safety."
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
                If service charge or other occupancy costs are understated, the margin of safety narrows further. At a 20.0% rent burden, extra recurring costs can materially change the decision.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                The useful question is not just whether rent looks manageable. It is whether the full occupancy cost still leaves enough working capital after the lease begins to bite.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="What should you check before signing a lease with service charge?"
            description="These are practical questions to verify with appropriate professional support."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Is the service charge fixed, capped, estimated or variable?',
              'What did previous years cost?',
              'Are major works or sinking funds included?',
              'Are landlord management fees included?',
              'Is insurance recovered separately?',
              'Are utilities separately metered?',
              'Are there exclusions or one-off costs?',
              'Does the lease allow unexpected recoveries?',
              'Is VAT payable?',
              'What happens if the estimate is wrong?',
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
            title="Use the free commercial check to test the full occupancy cost."
            description="Service charge only matters in context. The free check puts it next to rent, opening cash, and downside trading."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Rent burden',
                text: 'See how much expected revenue the combined rent stack absorbs.',
              },
              {
                title: 'Monthly cost pressure',
                text: 'Check whether the service charge leaves enough room for the rest of the cost base.',
              },
              {
                title: 'Opening cash and downside trading',
                text: 'Test whether the buffer survives weak early trade.',
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
              pagePath="/commercial-service-charge-before-signing"
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
            description="It organises the assumption review, stress-test interpretation, negotiation levers, evidence checklist, and lease questions in one place."
          />
          <div className={`${surfaceCardClass} p-5 sm:p-6`}>
            <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
              If the service charge changes the picture enough to keep the site in play, the sample file shows the format and the £49 Standard Commercial Viability File turns the result into a decision-support memo after the free check.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/commercial-service-charge-before-signing"
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
        title="Commercial service charge FAQs"
        description="Short answers for people comparing hidden lease costs and occupancy pressure."
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
