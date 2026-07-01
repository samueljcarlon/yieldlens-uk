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
  surfaceCardClass,
  surfaceCardSoftClass,
  supportingTextClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Commercial Assignment and Subletting Before Signing | YieldLens UK',
  description:
    'Check how assignment, subletting and exit restrictions can affect commercial lease viability before signing.',
  alternates: {
    canonical: '/commercial-assignment-subletting-before-signing',
  },
  openGraph: {
    title: 'Commercial Assignment and Subletting Before Signing | YieldLens UK',
    description:
      'Check how assignment, subletting and exit restrictions can affect commercial lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-assignment-subletting-before-signing',
  },
};

const faqItems = [
  {
    question: 'What is assignment in a commercial lease?',
    answer:
      'Assignment is the transfer of the tenant’s lease interest to another occupier. The exact conditions matter because they can affect how easily the tenant can exit later.',
  },
  {
    question: 'What is subletting in a commercial lease?',
    answer:
      'Subletting is when the tenant lets the premises, or part of them, to another party under a separate agreement. The lease wording determines whether that is allowed and on what terms.',
  },
  {
    question: 'Why should I check assignment and subletting before signing?',
    answer:
      'They affect exit flexibility. If the site underperforms or the concept changes, the lease may be harder to manage if assignment or subletting is limited.',
  },
  {
    question: 'Should assignment be checked alongside the break clause?',
    answer:
      'Yes. The break clause gives one exit route on a date. Assignment and subletting can affect what happens if the tenant needs more flexibility between those dates.',
  },
  {
    question: 'Can assignment or subletting affect lease viability?',
    answer:
      'Yes. If exit options are too tight, the downside of the lease is greater, especially when fit-out spend and opening cash are already stretched.',
  },
  {
    question: 'Is YieldLens giving legal advice on assignment or subletting?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It does not review legal wording or replace legal, lease, valuation, tax, or financial advice.',
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
      name: 'Commercial Assignment and Subletting Before Signing',
      item: 'https://yieldlens.co.uk/commercial-assignment-subletting-before-signing',
    },
  ],
};

const comparisonRows = [
  {
    title: 'Assignment',
    text: 'Shows whether the lease can be transferred to another tenant if the business needs to exit.',
  },
  {
    title: 'Subletting',
    text: 'Shows whether the tenant can lease the unit, or part of it, to someone else later.',
  },
  {
    title: 'Break clause',
    text: 'Shows whether there is a contractual exit date if the clause conditions are met.',
  },
  {
    title: 'Lease length',
    text: 'Shows how long the tenant is committed before any other exit route is considered.',
  },
  {
    title: 'Permitted use',
    text: 'Shows whether the future occupier or use would still fit the lease wording.',
  },
  {
    title: 'Repair obligations',
    text: 'Shows whether condition risk could make assignment or exit more difficult later.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Rent burden', value: '20.0%' },
  { label: 'Fit-out', value: '£50,000' },
  { label: 'Opening cash buffer', value: '£9,000' },
];

const relatedLinks = [
  {
    href: '/commercial-lease-checklist-before-signing',
    label: 'Commercial lease checklist before signing',
    description: 'Use the hub to step through the wider pre-signing checks.',
  },
  {
    href: '/commercial-heads-of-terms-before-signing',
    label: 'Commercial heads of terms before signing',
    description: 'Check the early deal points before the lease gets expensive.',
  },
  {
    href: '/commercial-lease-length-before-signing',
    label: 'Commercial lease length before signing',
    description: 'See how the commitment period changes the exit question.',
  },
  {
    href: '/commercial-break-clause-before-signing',
    label: 'Commercial break clause before signing',
    description: 'Compare the clause that gives a date-based exit route.',
  },
  {
    href: '/commercial-permitted-use-before-signing',
    label: 'Commercial permitted use before signing',
    description: 'Check whether the intended business still fits the lease.',
  },
  {
    href: '/commercial-personal-guarantee-before-signing',
    label: 'Commercial personal guarantee before signing',
    description: 'Check whether personal downside is also part of the exit picture.',
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
      {description && <p className={supportingTextClass}>{description}</p>}
    </div>
  );
}

export default function CommercialAssignmentSublettingBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-assignment-subletting-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial assignment and subletting before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial assignment and subletting
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial assignment and subletting before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Assignment and subletting clauses can affect how much flexibility a tenant has if the site does not trade as expected. A lease can look viable at the start, but become harder to manage if the business cannot assign, sublet, adapt, or exit cleanly.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to think about exit flexibility before you sign, then run the free commercial check if you want to pressure-test the numbers as well.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-assignment-subletting-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-assignment-subletting-before-signing"
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
                <Link href="/viability-file" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Standard commercial viability file
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, building survey advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Quick answer
              </p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Check whether the lease can be assigned if the business changes.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Check whether subletting is allowed and on what terms.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Read assignment together with the break clause, lease length, and permitted use.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Exit flexibility matters more when fit-out spend and opening cash are already tight.</span>
                </li>
              </ul>
              <div className="mt-5 rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                A site can look workable on rent alone and still be hard to manage if the lease does not leave a clean exit path.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why the clause matters"
            title="Assignment and subletting are part of the downside, not just a legal footnote."
            description="If the business changes, the site underperforms, or the concept needs to pivot, the lease needs a practical exit route."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'They affect exit flexibility.',
              'They matter if trading weakens.',
              'They matter if the concept changes.',
              'They interact with permitted use.',
              'They interact with lease length and break clauses.',
              'They can change the downside of committing to a site.',
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

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Compare the terms"
            title="Assignment and subletting should be read with the rest of the lease."
            description="The key question is not only whether the site works on day one, but whether the tenant can still manage the downside if assumptions change."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {comparisonRows.map((row, index) => (
              <div
                key={row.title}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
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
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{row.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Illustrative example"
            title="Exit flexibility matters more when the opening cash buffer is thin."
            description="This is a safe fictional example, not a real case study."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exampleRows.map((row) => (
                  <div key={row.label} className={`${surfaceCardSoftClass} p-4`}>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] mb-2">{row.label}</p>
                    <p className="text-lg font-semibold text-stone-900">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${surfaceCardSoftClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                If the site has high fit-out spend and a limited opening buffer, exit flexibility matters if trading is weaker than expected. Assignment, subletting, permitted use, and break clause wording should be read together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="Ask the questions that make the exit route concrete."
            description="These are the checks that should be answered before fit-out, deposit, and legal work become sunk."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Can the lease be assigned?',
              'Can the premises be sublet?',
              'Is landlord consent required?',
              'Can consent be refused or delayed?',
              'Are there conditions attached to assignment or subletting?',
              'Does permitted use restrict likely future occupiers?',
              'Are guarantees or ongoing liabilities required after assignment?',
              'Does subletting have to be of the whole premises or part only?',
              'How does assignment or subletting interact with repair obligations?',
              'Has a solicitor reviewed the wording?',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 text-sm text-stone-700 leading-7 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-primary)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-fragile)]'
                          : index === 4
                            ? 'border-t-[var(--yieldlens-risk)]'
                            : index === 5
                              ? 'border-t-[var(--yieldlens-positive)]'
                              : index === 6
                                ? 'border-t-[var(--yieldlens-caution)]'
                                : index === 7
                                  ? 'border-t-[var(--yieldlens-primary)]'
                                  : index === 8
                                    ? 'border-t-[var(--yieldlens-fragile)]'
                                    : 'border-t-[var(--yieldlens-risk)]'
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
            eyebrow="How YieldLens helps"
            title="The free commercial check tests the pressure points around the exit question."
            description="YieldLens can show whether the site still looks viable once the commercial assumptions are tested, but it cannot confirm assignment, subletting, landlord consent, or legal wording."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Rent burden, opening cash pressure, break-even customers, downside trading, and lease pressure points.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>A quick screen for whether the site deserves deeper work.</span>
                </li>
              </ul>
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Standard file
              </p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Assumption review, stress-test interpretation, negotiation levers, evidence checklist, and lease questions.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>A printable decision memo tied to the saved result.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Useful when the commercial questions need to be organised before signing.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-assignment-subletting-before-signing"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/viability-file" className={heroSecondaryCtaClass}>
              View viability file
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--yieldlens-muted)] leading-7">
            For the full lease pressure test, see the{' '}
            <Link href="/commercial-lease-viability-check" className="text-[var(--yieldlens-caution)] font-medium hover:underline">
              commercial lease viability check
            </Link>
            .
          </p>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Use the next page that matches the lease question you are asking."
            description="These pages stay close to lease flexibility, timing, and the commercial downside of signing."
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
        title="Commercial assignment and subletting FAQs"
        description="Short answers for people checking whether the lease leaves a practical exit route."
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
