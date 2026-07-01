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
  title: 'Commercial Lease Length Before Signing | YieldLens UK',
  description:
    'Check how lease length, break clauses, rent reviews and fit-out payback can affect commercial lease viability before signing.',
  alternates: {
    canonical: '/commercial-lease-length-before-signing',
  },
  openGraph: {
    title: 'Commercial Lease Length Before Signing | YieldLens UK',
    description:
      'Check how lease length, break clauses, rent reviews and fit-out payback can affect commercial lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-lease-length-before-signing',
  },
};

const faqItems = [
  {
    question: 'Why does commercial lease length matter before signing?',
    answer:
      'Lease length changes the commitment period. It affects how long the business has to recover fit-out and setup costs, and how much downside it carries if trading is weaker than expected.',
  },
  {
    question: 'Is a shorter commercial lease always safer?',
    answer:
      'Not always. A shorter term can reduce commitment, but it may also leave less time to recover fit-out spend or build trading momentum.',
  },
  {
    question: 'How does lease length affect fit-out payback?',
    answer:
      'A longer term can give more time to recover fit-out costs, but only if the business has enough cash and trading room to get there.',
  },
  {
    question: 'Should I compare lease length with the break clause?',
    answer:
      'Yes. The first break date, rent review timing, and lease term should be read together because they change the downside profile of the deal.',
  },
  {
    question: 'Can lease length affect commercial lease viability?',
    answer:
      'Yes. If the term is long relative to the business plan, the tenant may carry more downside than the concept can comfortably support.',
  },
  {
    question: 'Is YieldLens giving legal advice on lease terms?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It does not tell you the right lease length and does not replace legal, lease, valuation, tax, or financial advice.',
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
      name: 'Commercial Lease Length Before Signing',
      item: 'https://yieldlens.co.uk/commercial-lease-length-before-signing',
    },
  ],
};

const leaseLengthRows = [
  {
    title: 'Commitment period',
    text: 'The lease term sets how long the tenant is tied to the site if the business does not perform as expected.',
  },
  {
    title: 'Fit-out payback',
    text: 'A longer term can give more time to recover the initial build and setup cost, but only if the business survives long enough.',
  },
  {
    title: 'Break clause timing',
    text: 'The first break date changes how much downside the tenant carries if early trading is weak.',
  },
  {
    title: 'Rent review exposure',
    text: 'A lease can become tighter if rent reviews arrive before the business is fully stable.',
  },
  {
    title: 'Exit flexibility',
    text: 'Assignment, subletting, and break rights matter more when the term is long or the concept is still unproven.',
  },
];

const compareRows = [
  {
    title: 'Lease term',
    text: 'The length of time the tenant is committed to the site.',
  },
  {
    title: 'Break clause',
    text: 'The contractual exit point, if one is included and usable.',
  },
  {
    title: 'Rent review date',
    text: 'The point at which the rent can change later in the term.',
  },
  {
    title: 'Rent-free period',
    text: 'Can ease launch cash, but does not remove commitment risk.',
  },
  {
    title: 'Deposit',
    text: 'Ties up cash at the start and can reduce the opening buffer.',
  },
  {
    title: 'Fit-out cost',
    text: 'Needs enough trading time to justify the spend.',
  },
  {
    title: 'Assignment and subletting',
    text: 'May help if the tenant needs an exit route later.',
  },
  {
    title: 'Repairing obligations',
    text: 'Can add downside if the tenant is also exposed to condition risk.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Fit-out', value: '£50,000' },
  { label: 'Opening cash buffer', value: '£9,000' },
  { label: 'Rent burden', value: '20.0%' },
];

const relatedLinks = [
  {
    href: '/commercial-assignment-subletting-before-signing',
    label: 'Commercial assignment and subletting before signing',
    description: 'See whether exit flexibility is enough if the concept changes.',
  },
  {
    href: '/commercial-rent-review-before-signing',
    label: 'Commercial rent review before signing',
    description: 'Check whether rent can increase before the business is ready.',
  },
  {
    href: '/commercial-fit-out-costs-before-signing',
    label: 'Commercial fit-out costs before signing',
    description: 'Check whether the setup spend needs more time to pay back.',
  },
  {
    href: '/commercial-lease-viability-check',
    label: 'Commercial lease viability check',
    description: 'Pressure-test the site after the lease term is understood.',
  },
  {
    href: '/commercial-personal-guarantee-before-signing',
    label: 'Commercial personal guarantee before signing',
    description: 'Check whether the downside is also personal.',
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

export default function CommercialLeaseLengthBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-lease-length-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial lease length before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial lease length
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial lease length before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Lease length changes the risk of a commercial site. A longer term can give more time to recover fit-out costs, but it can also leave the tenant exposed if trading is weaker than expected, rent reviews increase the cost, or exit flexibility is limited.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to judge the commitment period, then run the free commercial check if you want to pressure-test the lease together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-length-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-length-before-signing"
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
                <Link href="/commercial-heads-of-terms-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial heads of terms before signing
                </Link>
                <Link href="/commercial-break-clause-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial break clause before signing
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Why lease length matters
              </p>
              <div className="space-y-3">
                {leaseLengthRows.map((row) => (
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
            eyebrow="Lease term check"
            title="Lease length is not a rule of thumb. It is a risk trade-off."
            description="The right term depends on the opening cash buffer, fit-out spend, trade profile, and how much downside the business can carry."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="text-sm font-semibold text-stone-900 mb-2">{row.title}</p>
                <p className="text-sm text-stone-700 leading-7">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Illustrative example"
            title="A longer term can help pay back fit-out, but it also increases commitment."
            description="This is a fictional example. It shows how lease length should be read alongside break clauses, rent reviews, and the opening cash buffer."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                A high fit-out cost may need enough trading time to justify the spend, but a thin opening buffer and 20.0% rent burden also make downside protection important. Lease length should be read alongside break clause timing and rent review wording.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                A site can still be viable, but the commitment period should match the business plan rather than a generic lease term.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="Ask the questions that turn the lease term into a real decision."
            description="These questions are about commitment and timing, not legal drafting advice."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'How long is the initial lease term?',
              'Is there a break clause?',
              'When is the first break date?',
              'Does the break date fall before or after rent review?',
              'How long will it take to recover fit-out and setup costs?',
              'What happens if trading is weaker than expected?',
              'Are assignment or subletting options available?',
              'Does the lease term match the business plan?',
              'Has a solicitor reviewed the wording?',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 text-sm font-medium text-stone-800 leading-7 ${
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
                            : index === 5
                              ? 'border-t-[var(--yieldlens-caution)]'
                              : index === 6
                                ? 'border-t-[var(--yieldlens-primary)]'
                                : index === 7
                                  ? 'border-t-[var(--yieldlens-positive)]'
                                  : 'border-t-[var(--yieldlens-fragile)]'
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
            title="Use the free commercial check to pressure-test the lease term."
            description="The check looks at the pressure points that matter before the numbers become a commitment."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <ul className="space-y-2 text-sm text-[var(--yieldlens-muted)] leading-7">
                <li>• Rent burden, break-even customers, opening cash, downside trading, and six-month survival.</li>
                <li>• A fast viability snapshot before you commit.</li>
                <li>• Helpful when the lease term needs to be tested against the business plan.</li>
              </ul>
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                £49 Standard Commercial Viability File
              </p>
              <ul className="space-y-2 text-sm text-[var(--yieldlens-muted)] leading-7">
                <li>• Stress-test interpretation, negotiation levers, evidence checklist, and lease questions.</li>
                <li>• A printable commercial decision memo tied to the saved result.</li>
                <li>• Useful when the term, break clause, and rent review need one decision path.</li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-sm text-[var(--yieldlens-muted)] leading-7 max-w-4xl">
            YieldLens cannot decide the right lease length or review lease wording. It helps you see whether the term, cash buffer, and trading plan still line up before you sign.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-lease-length-before-signing"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-lease-length-before-signing"
              ctaLabel="View sample viability file"
              pageType="seo_page"
              className={heroSecondaryCtaClass}
            >
              View sample viability file
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related guides"
            title="Use the guide that matches the lease question you are checking."
            description="These pages stay close to lease length, commitment period, and the cash implications of signing."
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
          <p className="mt-5 text-sm text-[var(--yieldlens-muted)] leading-7">
            For the printable memo format, see the{' '}
            <Link href="/viability-file" className="text-[var(--yieldlens-caution)] font-medium hover:underline">
              Standard commercial viability file
            </Link>
            .
          </p>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial lease length FAQs"
        description="Short answers for operators who need to judge the commitment period before they sign."
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
