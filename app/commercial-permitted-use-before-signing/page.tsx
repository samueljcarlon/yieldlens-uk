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
  title: 'Commercial Permitted Use Before Signing | YieldLens UK',
  description:
    'Check how permitted use, planning, licensing and lease restrictions can affect commercial lease viability before signing.',
  alternates: {
    canonical: '/commercial-permitted-use-before-signing',
  },
  openGraph: {
    title: 'Commercial Permitted Use Before Signing | YieldLens UK',
    description:
      'Check how permitted use, planning, licensing and lease restrictions can affect commercial lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-permitted-use-before-signing',
  },
};

const faqItems = [
  {
    question: 'What is permitted use in a commercial lease?',
    answer:
      'Permitted use is the type of business or activity the lease allows at the property. The exact wording matters because it can limit what the tenant can actually do at the site.',
  },
  {
    question: 'Why should I check permitted use before signing?',
    answer:
      'A site can look financially viable and still be unsuitable if the intended use is not allowed or needs further permission. Checking early helps avoid spending on a unit that cannot operate as planned.',
  },
  {
    question: 'Can planning or licensing affect lease viability?',
    answer:
      'Yes. Planning constraints, licences, landlord consent, or lease wording can all affect whether the intended business can open and trade as planned.',
  },
  {
    question: 'Should permitted use be checked before fit-out?',
    answer:
      'Yes. It is safer to check before fit-out, deposit, and legal costs are fully committed, because those costs can be hard to unwind.',
  },
  {
    question: 'Can YieldLens confirm whether a business use is allowed?',
    answer:
      'No. YieldLens does not confirm permitted use, planning position, licensing position, or landlord consent. It helps you identify where the commercial risk sits so the right checks can be made.',
  },
  {
    question: 'Is YieldLens giving legal, planning or licensing advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It does not provide legal, planning, licensing, valuation, tax, or financial advice.',
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
      name: 'Commercial Permitted Use Before Signing',
      item: 'https://yieldlens.co.uk/commercial-permitted-use-before-signing',
    },
  ],
};

const comparisonRows = [
  {
    title: 'Rent burden',
    text: 'Shows whether the headline rent is too much for the expected revenue.',
  },
  {
    title: 'Permitted use',
    text: 'Shows whether the intended business can actually operate at the site.',
  },
  {
    title: 'Planning and licensing',
    text: 'Shows whether the business may need further permission before trading.',
  },
  {
    title: 'Landlord consent',
    text: 'Shows whether the intended use or works may need approval before opening.',
  },
  {
    title: 'Fit-out and opening cash',
    text: 'Shows whether upfront spend is still sensible if the use is not yet settled.',
  },
  {
    title: 'Lease restrictions',
    text: 'Shows whether use wording, hours, extraction, signage, or exclusivity could limit the concept.',
  },
];

const exampleRows = [
  { label: 'Business type', value: 'Cafe' },
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Expected customers/day', value: '80' },
  { label: 'Fit-out', value: '£50,000' },
  { label: 'Opening cash buffer', value: '£9,000' },
];

const verificationChecks = [
  'Does the lease permit the intended business use?',
  'Is the permitted use wide enough if the concept changes later?',
  'Is landlord consent needed for the intended operation?',
  'Are planning constraints or separate permissions to check?',
  'Are licences needed before trading starts?',
  'Are opening hours restricted?',
  'Are extraction, signage, seating, or outdoor trading assumptions allowed?',
  'Are there exclusivity or neighbouring-use restrictions?',
  'Could permitted use affect assignment or subletting later?',
  'Has a solicitor or appropriate professional reviewed the wording?',
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
    href: '/commercial-lease-costs-before-signing',
    label: 'Commercial lease costs before signing',
    description: 'Check whether the cost stack still works if use is constrained.',
  },
  {
    href: '/commercial-assignment-subletting-before-signing',
    label: 'Commercial assignment and subletting before signing',
    description: 'Check whether exit flexibility matters if the concept changes.',
  },
  {
    href: '/commercial-lease-viability-check',
    label: 'Commercial lease viability check',
    description: 'Pressure-test the numbers after the use question is understood.',
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

export default function CommercialPermittedUseBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-permitted-use-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial permitted use before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial permitted use
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial permitted use before signing a lease
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                The numbers can look workable, but the site still needs to be usable for the intended business. Permitted use, planning restrictions, licensing, lease wording and landlord consent can all affect whether a commercial unit can actually trade as planned.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to check the use assumptions before fit-out, deposit, and legal costs are committed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-permitted-use-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-permitted-use-before-signing"
                  ctaLabel="View sample viability file"
                  pageType="seo_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-stone-300">
                <Link href="/commercial-lease-checklist-before-signing" className="underline decoration-stone-400/70 underline-offset-4">
                  Commercial lease checklist before signing
                </Link>
                <Link href="/commercial-heads-of-terms-before-signing" className="underline decoration-stone-400/70 underline-offset-4">
                  Commercial heads of terms before signing
                </Link>
                <Link href="/commercial-lease-viability-check" className="underline decoration-stone-400/70 underline-offset-4">
                  Commercial lease viability check
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, planning advice, licensing advice, a valuation, a RICS valuation, building survey advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Why permitted use matters
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: 'Use may be restricted',
                    text: 'The lease can limit what the property may be used for, which affects whether the concept can operate there.',
                  },
                  {
                    title: 'Planning and licensing may still matter',
                    text: 'A viable unit can still need further permission before it is ready to trade.',
                  },
                  {
                    title: 'Costs are easier to avoid early',
                    text: 'It is safer to check use assumptions before fit-out, deposit, and legal costs are committed.',
                  },
                  {
                    title: 'Revenue assumptions can break',
                    text: 'If the intended use is not allowed, the revenue case may not be realistic even if the rent model looks fine.',
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
            title="A site can look financially viable and still be the wrong use."
            description="Use restrictions matter before fit-out, deposit and legal costs are committed. The commercial case only works if the intended business can actually operate there."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Use and tradeability',
                text: 'The lease may restrict how the property can be used, which can stop the intended concept before it starts.',
              },
              {
                title: 'Planning and licensing',
                text: 'Separate permissions may still be needed before the site can open and trade as planned.',
              },
              {
                title: 'Upfront spend',
                text: 'If use is not settled, fit-out, deposit, and legal costs can be sunk into the wrong site.',
              },
              {
                title: 'Revenue realism',
                text: 'Revenue assumptions only work if the planned service, layout, hours, and operating model are actually allowed.',
              },
              {
                title: 'Landlord consent',
                text: 'Some changes or uses may need landlord approval before they can proceed.',
              },
              {
                title: 'Lease viability',
                text: 'A site can look affordable on rent and still fail the practical use check.',
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
            eyebrow="Commercial comparison"
            title="Financial viability is not the same as permitted use."
            description="YieldLens can test the commercial pressure points, but it cannot confirm that the intended use is legally or practically permitted."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonRows.map((row, index) => (
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
            title="If the use is wrong, the revenue case may not be realistic."
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
                If the cafe use, opening hours, extraction, signage, alcohol licence, seating, outdoor space or other operational assumptions are not permitted, the revenue case may not be realistic even if the rent model appears workable.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                The useful question is not only whether the site can carry the rent. It is whether the intended business can actually operate there under the lease, planning, and licensing position that needs to be verified.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to verify"
            title="What should you check before relying on the use assumption?"
            description="These are the points to verify with a solicitor, the landlord, or the relevant official source before the deal moves forward."
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
                                : index === 7
                                  ? 'border-t-[var(--yieldlens-positive)]'
                                  : index === 8
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
            eyebrow="How YieldLens helps"
            title="The free commercial check tests the pressure points around the use question."
            description="YieldLens can help you see whether the lease still looks viable once the commercial assumptions are tested, but it cannot confirm permissions or wording."
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
                £49 Standard Commercial Viability File
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
              pagePath="/commercial-permitted-use-before-signing"
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
            eyebrow="Related pages"
            title="Use the next page that matches the question you are asking."
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
        title="Commercial permitted use FAQs"
        description="Short answers for people checking whether the intended use is actually workable at the site."
        faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className={`${memoBandClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-5xl my-14`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8 text-sm text-stone-300 leading-7 text-center">
          <p className="font-semibold text-[#D6C7A2] mb-2">Important disclaimer</p>
          <p className={disclaimerClass}>
            YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, planning advice, licensing advice, valuation, building survey advice, or a substitute for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
