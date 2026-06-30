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
  title: 'Commercial Rent Review Before Signing | YieldLens UK',
  description:
    'Check how rent review clauses, future rent increases and lease wording can affect commercial rent affordability before signing.',
  alternates: {
    canonical: '/commercial-rent-review-before-signing',
  },
  openGraph: {
    title: 'Commercial Rent Review Before Signing | YieldLens UK',
    description:
      'Check how rent review clauses, future rent increases and lease wording can affect commercial rent affordability before signing.',
    url: 'https://yieldlens.co.uk/commercial-rent-review-before-signing',
  },
};

const faqItems = [
  {
    question: 'What is a commercial rent review?',
    answer:
      'A commercial rent review is a clause that allows the rent to be checked and potentially changed at a future point in the lease. The exact effect depends on the wording of the lease.',
  },
  {
    question: 'Why does rent review wording matter before signing?',
    answer:
      'The starting rent is not the only rent risk. If the review wording allows a higher future rent, the site can become tighter later even if it looks manageable on day one.',
  },
  {
    question: 'Is starting rent enough to judge affordability?',
    answer:
      'No. A starting rent can look fine while the review timing, indexation, or market review clause creates a stronger cost later on.',
  },
  {
    question: 'Should I check rent review timing against a break clause?',
    answer:
      'Yes. The timing matters because a lease can feel very different if the break clause comes before or after the first review date.',
  },
  {
    question: 'Can a rent review affect commercial lease viability?',
    answer:
      'Yes. If the current rent burden is already tight, a future increase can narrow the margin for staff, rates, utilities, and slower trading months.',
  },
  {
    question: 'Is YieldLens giving rent review or legal advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It does not replace legal, lease, valuation, tax, or financial advice.',
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
      name: 'Commercial Rent Review Before Signing',
      item: 'https://yieldlens.co.uk/commercial-rent-review-before-signing',
    },
  ],
};

const riskRows = [
  {
    title: 'Starting rent is not the full story',
    text: 'A site can look affordable today and still become tighter if the review clause allows the rent to rise later.',
  },
  {
    title: 'Future rent affects the margin of safety',
    text: 'Higher rent reduces room for staff, rates, utilities, insurance, and slower trading months.',
  },
  {
    title: 'Timing matters',
    text: 'The break clause, review date, and rent-free timing should be considered together before signing.',
  },
  {
    title: 'Lease wording matters',
    text: 'Indexation, market review, or upward-only wording can all change how the lease behaves after opening.',
  },
];

const compareRows = [
  {
    title: 'Starting headline rent',
    text: 'The rent shown at the start of the lease.',
  },
  {
    title: 'Rent-free period',
    text: 'Delays some rent, but does not remove future rent review risk.',
  },
  {
    title: 'Stepped rent',
    text: 'Raises rent in stages rather than all at once.',
  },
  {
    title: 'Rent review clause',
    text: 'Sets out how and when the rent can change later.',
  },
  {
    title: 'Index-linked review',
    text: 'Adjusts rent by reference to an index if the lease uses that method.',
  },
  {
    title: 'Market review or upward-only wording',
    text: 'Can lead to a higher rent later depending on lease terms and market conditions.',
  },
  {
    title: 'Break clause timing',
    text: 'The lease may be more flexible if the break arrives before a review date.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Rent burden', value: '20.0%' },
  { label: 'Break-even customers/day', value: '45.2' },
  { label: 'Opening cash buffer', value: '£9,000' },
];

const relatedLinks = [
  { href: '/commercial-lease-checklist-before-signing', label: 'Commercial lease checklist before signing' },
  { href: '/commercial-break-clause-before-signing', label: 'Commercial break clause before signing' },
  { href: '/commercial-lease-viability-check', label: 'Commercial lease viability check' },
  { href: '/commercial-service-charge-before-signing', label: 'Commercial service charge before signing' },
  { href: '/commercial-rent-affordability-calculator', label: 'Commercial rent affordability calculator' },
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

export default function CommercialRentReviewBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-rent-review-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial rent review before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial rent review
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial rent reviews before signing a lease
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A commercial lease can look affordable at the starting rent but become tighter later if rent review wording, review dates, indexation or future increases are not understood before signing.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to check how the rent may move later, then run the free commercial check if you want to pressure-test the lease together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-rent-review-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-rent-review-before-signing"
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
                Why rent reviews matter
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
            eyebrow="Rent review versus starting rent"
            title="The question is not just whether the site can afford rent today."
            description="It is what happens if the rent changes while the business is still proving itself."
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
            title="A fictional site becomes harder to judge once future rent is part of the picture."
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
                At a 20.0% starting rent burden, even a future rent increase can matter because the lease already has limited room for error.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                The useful question is not only whether the rent works now. It is whether the starting rent, rent review timing, and break clause still leave enough headroom if trading is slower than expected.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="What should you check before relying on the starting rent?"
            description="These are questions to verify with appropriate professional support."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'When is the first rent review?',
              'How is the reviewed rent calculated?',
              'Is the review fixed, indexed, market-based or another method?',
              'Is there upward-only wording?',
              'Is there a cap or collar?',
              'Does the break clause fall before or after the review?',
              'Does the rent-free period affect review timing?',
              'Is service charge reviewed separately?',
              'What happens if trading is weaker by the review date?',
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
            title="Use the free commercial check to test the starting rent pressure."
            description="Rent review only matters in context. The free check puts the rent next to opening cash, downside trading, and the rest of the lease pressure."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Starting rent burden',
                text: 'See how much expected revenue the rent absorbs at the outset.',
              },
              {
                title: 'Break-even customers',
                text: 'Translate the lease into a daily trading target.',
              },
              {
                title: 'Opening cash pressure',
                text: 'Check whether the buffer still works if trading starts slowly.',
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
              pagePath="/commercial-rent-review-before-signing"
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
              If rent review wording changes the picture enough to keep the site in play, the sample file shows the format and the Standard file turns the result into a decision-support memo after the free check.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/commercial-rent-review-before-signing"
                ctaLabel="See sample viability file"
                pageType="seo_page"
                className={heroPrimaryCtaClass}
              >
                See sample viability file
              </TrackedCtaLink>
              <Link href="/commercial-lease-costs-before-signing" className={heroSecondaryCtaClass}>
                Commercial lease costs before signing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial rent review FAQs"
        description="Short answers for people comparing future rent risk, affordability, and lease viability."
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
