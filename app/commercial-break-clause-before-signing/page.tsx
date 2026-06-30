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
  title: 'Commercial Break Clause Before Signing | YieldLens UK',
  description:
    'Check how a commercial lease break clause, rent review timing and exit flexibility can affect lease viability before signing.',
  alternates: {
    canonical: '/commercial-break-clause-before-signing',
  },
  openGraph: {
    title: 'Commercial Break Clause Before Signing | YieldLens UK',
    description:
      'Check how a commercial lease break clause, rent review timing and exit flexibility can affect lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-break-clause-before-signing',
  },
};

const faqItems = [
  {
    question: 'What is a break clause in a commercial lease?',
    answer:
      'A break clause is a lease term that can allow either the tenant or the landlord to end the lease early if the clause conditions are met. The exact wording matters.',
  },
  {
    question: 'Why does a break clause matter before signing?',
    answer:
      'It can reduce long-term downside if the site underperforms, especially when early trading is uncertain or the opening cash buffer is thin.',
  },
  {
    question: 'Should I compare break clause timing with rent review?',
    answer:
      'Yes. The timing matters because a break clause can be more useful if it arrives before a rent review or other cost increase.',
  },
  {
    question: 'Can a break clause improve commercial lease viability?',
    answer:
      'Yes. Exit flexibility can make the downside easier to bear if the business is still proving demand or if the cost base becomes too tight.',
  },
  {
    question: 'What should I check before relying on a break clause?',
    answer:
      'Check the notice period, any payment conditions, vacant possession requirements, repair obligations, and whether a solicitor has reviewed the wording.',
  },
  {
    question: 'Is YieldLens giving legal advice on break clauses?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It helps you pressure-test the commercial impact, but it does not replace legal, tax, valuation, or financial advice.',
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
      name: 'Commercial Break Clause Before Signing',
      item: 'https://yieldlens.co.uk/commercial-break-clause-before-signing',
    },
  ],
};

const riskRows = [
  {
    title: 'Long-term downside can be the real issue',
    text: 'A break clause can matter more than a neat starting rent if the site underperforms after opening.',
  },
  {
    title: 'Thin opening cash increases the value of exit flexibility',
    text: 'If the buffer is small, a weaker opening can make the lease harder to carry for long enough.',
  },
  {
    title: 'Rent review timing changes the downside',
    text: 'If a review comes before the break, the tenant may be carrying a higher rent before the exit point arrives.',
  },
  {
    title: 'Clause conditions can be the trap',
    text: 'Notice, vacant possession, repair obligations, or payment conditions can make a break harder to use than it first sounds.',
  },
];

const compareRows = [
  {
    title: 'Break clause',
    text: 'May allow early exit if the stated conditions are met.',
  },
  {
    title: 'Rent review',
    text: 'Can increase rent later, which raises the downside if the business is still proving itself.',
  },
  {
    title: 'Lease length',
    text: 'A longer term can increase exposure if the site underperforms.',
  },
  {
    title: 'Rent-free period',
    text: 'Helps launch cash, but does not solve the long-term exit question.',
  },
  {
    title: 'Deposit',
    text: 'Ties up cash before trading and can make the opening period tighter.',
  },
  {
    title: 'Repairing obligations',
    text: 'Can create hidden cost pressure if the site needs ongoing works.',
  },
  {
    title: 'Assignment and subletting',
    text: 'May provide another route out, depending on the lease wording.',
  },
  {
    title: 'Service charge uncertainty',
    text: 'Can reduce the margin of safety even if the break clause looks helpful.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Rent burden', value: '20.0%' },
  { label: 'Opening cash buffer', value: '£9,000' },
  { label: 'Six-month test', value: 'Pass' },
];

const relatedLinks = [
  { href: '/commercial-lease-checklist-before-signing', label: 'Commercial lease checklist before signing' },
  { href: '/commercial-rent-review-before-signing', label: 'Commercial rent review before signing' },
  { href: '/commercial-lease-viability-check', label: 'Commercial lease viability check' },
  { href: '/commercial-lease-survival-calculator', label: 'Commercial lease survival calculator' },
  { href: '/viability-file', label: 'Viability file' },
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

export default function CommercialBreakClauseBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-break-clause-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial break clause before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial break clause
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial break clauses before signing a lease
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A break clause can change the downside of a commercial lease. If trading is weaker than expected, opening cash is tight, or rent review risk is unclear, exit flexibility can matter as much as the starting rent.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to judge how the break clause changes the downside, then run the free commercial check if you want to pressure-test the lease together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-break-clause-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-break-clause-before-signing"
                  ctaLabel="View sample viability file"
                  pageType="seo_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
                <Link href="/commercial-rent-review-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial rent review before signing
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
                Why a break clause matters
              </p>
              <div className="space-y-3">
                {riskRows.map((row) => (
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
            eyebrow="Break clause versus other terms"
            title="A break clause is not just about leaving."
            description="It changes how much downside the tenant carries if the commercial case weakens."
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
                              : index === 6
                                ? 'border-t-[var(--yieldlens-primary)]'
                                : 'border-t-[var(--yieldlens-positive)]'
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
            title="A fictional site can still be fragile even when the downside month passes."
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
                Even where the downside month passes, a thin opening buffer and high rent burden can make exit flexibility important if trading, costs or rent review terms move against the tenant.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                The useful question is not whether the clause sounds normal. It is whether the clause meaningfully reduces downside when the business is still proving itself.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="What should you check before relying on a break clause?"
            description="These are points to verify with a solicitor or appropriate professional."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'When can the break be exercised?',
              'Who can exercise it?',
              'What notice period applies?',
              'Are there payment conditions?',
              'Are there repair or vacant possession conditions?',
              'Does the break date fall before or after rent review?',
              'Does the break interact with rent-free period clawback?',
              'What happens if notice is served incorrectly?',
              'Has a solicitor reviewed the clause?',
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
            title="Use the free commercial check to test the downside pressure."
            description="The free check puts the rent, opening cash, and downside trading together. The £49 Standard file turns the result into a decision memo."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Rent burden',
                text: 'See how much expected revenue rent absorbs before other costs are considered.',
              },
              {
                title: 'Opening cash pressure',
                text: 'Check whether the buffer still works if the site opens slowly.',
              },
              {
                title: 'Downside trading',
                text: 'Test whether the site can still cope if the early months are weak.',
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
              pagePath="/commercial-break-clause-before-signing"
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
              If the break clause changes the downside enough to keep the site in play, the sample file shows the format and the Standard file turns the result into a decision-support memo after the free check.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/commercial-break-clause-before-signing"
                ctaLabel="See sample viability file"
                pageType="seo_page"
                className={heroPrimaryCtaClass}
              >
                See sample viability file
              </TrackedCtaLink>
              <Link href="/commercial-rent-review-before-signing" className={heroSecondaryCtaClass}>
                Commercial rent review before signing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial break clause FAQs"
        description="Short answers for people comparing exit flexibility, rent review risk, and lease viability."
        faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Move to the page that matches the next lease question."
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
                  {link.href === '/commercial-lease-checklist-before-signing'
                    ? 'Use the hub page for the wider signing checklist.'
                    : link.href === '/commercial-lease-viability-check'
                      ? 'Pressure-test whether the site can carry the rent.'
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
