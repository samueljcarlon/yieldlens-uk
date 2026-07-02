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
  title: 'Commercial Lease Deposit Before Signing',
  description:
    'Check how a commercial lease deposit affects opening cash, working capital, fit-out pressure and lease viability before signing.',
  alternates: {
    canonical: '/commercial-lease-deposit-before-signing',
  },
  openGraph: {
    title: 'Commercial Lease Deposit Before Signing',
    description:
      'Check how a commercial lease deposit affects opening cash, working capital, fit-out pressure and lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-lease-deposit-before-signing',
  },
};

const faqItems = [
  {
    question: 'What is a commercial lease deposit?',
    answer:
      'It is cash held by the landlord at the start of the lease, usually to secure the tenant’s obligations. It can be a fixed amount or linked to rent.',
  },
  {
    question: 'How much deposit is normal for a commercial lease?',
    answer:
      'There is no universal answer. It depends on the tenant, the landlord’s risk view, the lease terms, and the wider deal structure.',
  },
  {
    question: 'Can a commercial lease deposit be negotiated?',
    answer:
      'Sometimes, but not always. The result depends on the landlord, covenant strength, fit-out risk, the proposed term, and the wider commercial position.',
  },
  {
    question: 'Should I include the deposit in my opening cash calculation?',
    answer:
      'Yes. The deposit reduces the cash available after signing and can materially change the opening buffer.',
  },
  {
    question: 'Is a rent-free period the same as a lower deposit?',
    answer:
      'No. A rent-free period affects rent timing, while a deposit affects cash tied up at the start. They can help in different ways and should be considered together.',
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
      name: 'Commercial Lease Deposit Before Signing',
      item: 'https://yieldlens.co.uk/commercial-lease-deposit-before-signing',
    },
  ],
};

const impactRows = [
  {
    title: 'Opening cash',
    text: 'The deposit reduces cash available immediately after signing, which can leave less room for trading errors.',
  },
  {
    title: 'Working capital',
    text: 'Cash tied up in the deposit cannot be used for stock, payroll, utilities, or early trading pressure.',
  },
  {
    title: 'Fit-out pressure',
    text: 'The deposit sits alongside fit-out, legal fees, and launch costs in the same upfront stack.',
  },
  {
    title: 'Downside risk',
    text: 'If trade starts slower than expected, a smaller buffer can make the lease harder to carry.',
  },
  {
    title: 'Lease viability',
    text: 'The deposit is not just a line item; it can change whether the site still looks workable after opening.',
  },
];

const compareRows = [
  {
    title: 'Rent deposit',
    text: 'Cash held by the landlord before and during the lease.',
  },
  {
    title: 'Fit-out/setup costs',
    text: 'Works and equipment needed before opening.',
  },
  {
    title: 'Legal fees',
    text: 'Costs for solicitor and professional checks.',
  },
  {
    title: 'Opening stock',
    text: 'Initial inventory needed to start trading.',
  },
  {
    title: 'Service charge / insurance',
    text: 'May still be payable even if part of the rent is eased.',
  },
  {
    title: 'Rent-free period timing',
    text: 'Can improve cash timing, but it is not the same as a lower deposit.',
  },
  {
    title: 'Working capital after opening',
    text: 'This is the cash that has to survive the first trading period.',
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
  { href: '/commercial-heads-of-terms-before-signing', label: 'Commercial heads of terms before signing' },
  { href: '/commercial-lease-costs-before-signing', label: 'Commercial lease costs before signing' },
  { href: '/commercial-rent-free-period-before-signing', label: 'Commercial rent-free period before signing' },
  { href: '/commercial-personal-guarantee-before-signing', label: 'Commercial personal guarantee before signing' },
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

export default function CommercialLeaseDepositBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-lease-deposit-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial lease deposit before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial lease deposit
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial lease deposit before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A rent deposit can make a commercial lease feel much tighter before trading begins. Even if the monthly rent looks manageable, deposit, fit-out, legal fees, stock and early operating costs can leave too little cash buffer after opening.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to understand how the deposit affects opening cash and working capital, then run the free commercial check if you want to test the lease pressure together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-deposit-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-deposit-before-signing"
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
                <Link href="/commercial-rent-free-period-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial rent-free period before signing
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
                Why the deposit matters
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
            eyebrow="Deposit versus other costs"
            title="The opening capital stack matters more than any single cost."
            description="The real question is how the deposit sits alongside the rest of the cash required to get open."
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
            title="A simple example shows how the deposit tightens the buffer."
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
                The deposit may be only one line item, but it materially affects how much cash remains after opening. A lower or staged deposit could improve working capital, but the impact depends on the lease terms and the wider cost stack.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                The useful question is not whether a deposit sounds normal in isolation. It is whether the deposit still leaves enough working capital once the site is fitted out and opened.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="What should you ask before relying on the deposit assumption?"
            description="The wording and structure matter because the deposit can behave differently across leases."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'How many months of rent is the deposit based on?',
              'Is VAT included?',
              'Is it held for the whole lease term or released later?',
              'What conditions allow release?',
              'Is it tied to rent reviews or assignment?',
              'Is it protected or documented clearly?',
              'Can it be reduced, staged or replaced with another structure?',
              'How does it interact with a rent-free period?',
              'Does the lease require other upfront payments?',
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
            title="Use the free commercial check to test the full opening cash pressure."
            description="The deposit only matters in context. The free check puts it next to the rent, fit-out, and downside trading assumptions."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Opening cash pressure',
                text: 'See whether the cash left after the deposit still looks usable.',
              },
              {
                title: 'Rent burden',
                text: 'Check whether the rent still fits the business once the deposit is paid.',
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
              pagePath="/commercial-lease-deposit-before-signing"
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
            description="It organises the opening capital stack, assumption review, negotiation levers, evidence checklist, and lease questions in one place."
          />
          <div className={`${surfaceCardClass} p-5 sm:p-6`}>
            <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
              If the deposit changes the cash picture enough to keep the site in play, the sample file shows the format and the £49 Standard Commercial Viability File turns the result into a decision-support memo after the free check.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/commercial-lease-deposit-before-signing"
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
        title="Commercial lease deposit FAQs"
        description="Practical answers for people comparing deposits, working capital, and opening cash."
        faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Use the page that matches the next pressure point."
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
