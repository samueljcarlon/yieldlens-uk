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
  title: 'Commercial Heads of Terms Before Signing | YieldLens UK',
  description:
    'Check rent, deposit, rent-free period, lease length, service charge, break clause, rent review and opening cash before agreeing commercial lease heads of terms.',
  alternates: {
    canonical: '/commercial-heads-of-terms-before-signing',
  },
  openGraph: {
    title: 'Commercial Heads of Terms Before Signing | YieldLens UK',
    description:
      'Check rent, deposit, rent-free period, lease length, service charge, break clause, rent review and opening cash before agreeing commercial lease heads of terms.',
    url: 'https://yieldlens.co.uk/commercial-heads-of-terms-before-signing',
  },
};

const faqItems = [
  {
    question: 'What are heads of terms in a commercial lease?',
    answer:
      'Heads of terms are the key commercial points agreed before the final lease is drafted. They usually cover rent, incentives, deposit, timing, and other major deal terms.',
  },
  {
    question: 'What should I check before agreeing heads of terms?',
    answer:
      'Check the rent, rent-free period, deposit, service charge, break clause, rent review, repair obligations, permitted use, and the opening cash impact before treating the deal as settled.',
  },
  {
    question: 'Should I test rent affordability before heads of terms?',
    answer:
      'Yes. The earlier the affordability and viability check happens, the easier it is to spot whether the deal is still workable before legal work becomes expensive.',
  },
  {
    question: 'Do heads of terms include rent-free period and deposit?',
    answer:
      'Often they do, but the exact wording and level of detail can vary. The important point is to test the commercial effect before the final documents are prepared.',
  },
  {
    question: 'Can heads of terms affect commercial lease viability?',
    answer:
      'Yes. The agreed commercial terms can lock in assumptions that change opening cash, downside risk, and whether the site can carry the lease.',
  },
  {
    question: 'Is YieldLens giving legal advice on heads of terms?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It helps you pressure-test the commercial numbers and questions, but it does not replace legal, tax, valuation, or financial advice.',
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
      name: 'Commercial Heads of Terms Before Signing',
      item: 'https://yieldlens.co.uk/commercial-heads-of-terms-before-signing',
    },
  ],
};

const termRows = [
  {
    title: 'Headline rent',
    text: 'The starting rent should be tested against the revenue the site can realistically support.',
  },
  {
    title: 'Rent-free period',
    text: 'The timing of any incentive matters because it affects whether launch cash survives the opening period.',
  },
  {
    title: 'Lease length',
    text: 'The term sets the commitment period and changes how long the business has to recover setup cost.',
  },
  {
    title: 'Assignment and subletting',
    text: 'If the concept changes, ask how easy it will be to transfer or let the lease later.',
  },
  {
    title: 'Deposit',
    text: 'Cash tied up at the start reduces working capital before trade has proved itself.',
  },
  {
    title: 'Permitted use',
    text: 'The site still needs to be usable for the intended business before the paperwork gets expensive.',
  },
  {
    title: 'Service charge and insurance',
    text: 'These can change the true occupancy cost even when the rent looks manageable.',
  },
  {
    title: 'Break clause and rent review',
    text: 'Exit flexibility and future rent increases should be read together, not in isolation.',
  },
  {
    title: 'Opening date and handover condition',
    text: 'If the unit is not ready or the condition is worse than expected, the opening capital stack can become tight fast.',
  },
];

const checkRows = [
  {
    title: 'Commercial deal shape',
    text: 'What rent is being assumed, what incentive is being offered, and what date does the rent start from?',
  },
  {
    title: 'Cash exposure',
    text: 'How much cash is tied up in deposit, fit-out, legal fees, and launch costs before the site trades?',
  },
  {
    title: 'Downside risk',
    text: 'If trading starts slowly, do the terms still leave enough room to absorb the first weak months?',
  },
  {
    title: 'Legal review',
    text: 'If the wording is being treated as settled, has a solicitor checked the draft first?',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Rent burden', value: '20.0%' },
  { label: 'Starting cash', value: '£90,000' },
  { label: 'Opening cash buffer', value: '£9,000' },
];

const relatedLinks = [
  {
    href: '/commercial-lease-costs-before-signing',
    label: 'Commercial lease costs before signing',
    description: 'Check the full cost stack before the lease is drafted.',
  },
  {
    href: '/commercial-rent-free-period-before-signing',
    label: 'Commercial rent-free period before signing',
    description: 'See whether the incentive really protects opening cash.',
  },
  {
    href: '/commercial-lease-deposit-before-signing',
    label: 'Commercial lease deposit before signing',
    description: 'Check how the deposit changes working capital.',
  },
  {
    href: '/commercial-rent-review-before-signing',
    label: 'Commercial rent review before signing',
    description: 'Check whether future rent increases could tighten the deal.',
  },
  {
    href: '/commercial-assignment-subletting-before-signing',
    label: 'Commercial assignment and subletting before signing',
    description: 'Check whether the lease can still be transferred if the concept changes.',
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

export default function CommercialHeadsOfTermsBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-heads-of-terms-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial heads of terms before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial heads of terms
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial heads of terms before signing a lease
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Heads of terms can make a commercial lease feel real before the tenant has fully tested the numbers. Rent, rent-free period, lease length, deposit, service charge, repair obligations, break clause and rent review wording can all affect whether the site can carry the lease.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to pressure-test the commercial assumptions before the lease process becomes expensive.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-heads-of-terms-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-heads-of-terms-before-signing"
                  ctaLabel="View sample viability file"
                  pageType="seo_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-stone-300">
                <Link href="/commercial-service-charge-before-signing" className="underline decoration-stone-400/70 underline-offset-4">
                  Commercial service charge before signing
                </Link>
                <Link href="/commercial-break-clause-before-signing" className="underline decoration-stone-400/70 underline-offset-4">
                  Commercial break clause before signing
                </Link>
                <Link href="/commercial-rent-review-before-signing" className="underline decoration-stone-400/70 underline-offset-4">
                  Commercial rent review before signing
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {termRows.map((row) => (
                <div key={row.title} className={`${surfaceCardClass} border-t border-t-[var(--yieldlens-caution)]`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
                    Heads of terms
                  </p>
                  <h2 className="text-lg font-semibold text-stone-950 mb-2">{row.title}</h2>
                  <p className={`${supportingTextClass}`}>{row.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Why it matters"
            title="Heads of terms shape the lease before the documents do"
            description="The legal effect depends on the wording, so the commercial assumptions should be checked before the deal is treated as settled."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {checkRows.map((row) => (
              <div key={row.title} className={`${surfaceCardClass} border-t border-t-[var(--yieldlens-caution)]`}>
                <h2 className="text-lg font-semibold text-stone-950 mb-2">{row.title}</h2>
                <p className={`${supportingTextClass}`}>{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${memoBandClass}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Illustrative example"
            title="Worked example using the current YieldLens scenario"
            description="This is illustrative only. It is not a real case study."
          />
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className={`${surfaceCardClass} border-l-4 border-l-[var(--yieldlens-risk)]`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {exampleRows.map((row) => (
                  <div key={row.label} className={`${surfaceCardSoftClass} p-4`}>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 mb-2">{row.label}</p>
                    <p className="text-lg font-semibold text-stone-950">{row.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-stone-100 p-5">
                <p className="text-sm text-stone-700 leading-7">
                  If heads of terms fix the rent, deposit and fit-out timetable before the operator has tested the full opening capital stack, the lease can become fragile even where the trading case looks plausible.
                </p>
              </div>
            </div>

            <div className={`${surfaceCardSoftClass} p-6`}>
              <h2 className="text-2xl font-semibold text-stone-950 mb-3">Questions to ask before heads of terms are agreed</h2>
              <ul className="space-y-3 text-sm text-stone-700 leading-7">
                <li>What rent is being assumed and from what date?</li>
                <li>Is the rent-free period for fit-out only or trading too?</li>
                <li>How much deposit is required and when is it released?</li>
                <li>Is service charge capped, estimated or variable?</li>
                <li>Who pays for landlord works and fit-out works?</li>
                <li>What is the first break date?</li>
                <li>Does the break date fall before or after rent review?</li>
                <li>What repairing obligations are expected?</li>
                <li>What condition will the unit be handed over in?</li>
                <li>Has a solicitor reviewed the wording before it is treated as settled?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="How YieldLens helps"
            title="Use the free check before heads of terms become expensive"
            description="YieldLens cannot review the heads of terms or replace legal review. It helps you structure the commercial numbers before you commit to a lease."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className={`${surfaceCardClass} border-t border-t-[var(--yieldlens-primary)]`}>
              <h2 className="text-lg font-semibold text-stone-950 mb-3">Free commercial check</h2>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>Rent burden</li>
                <li>Opening cash pressure</li>
                <li>Break-even customers</li>
                <li>Downside trading</li>
                <li>Lease pressure points</li>
              </ul>
            </div>
            <div className={`${surfaceCardClass} border-t border-t-[var(--yieldlens-caution)]`}>
              <h2 className="text-lg font-semibold text-stone-950 mb-3">Standard file</h2>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>Assumption review</li>
                <li>Stress-test interpretation</li>
                <li>Negotiation levers</li>
                <li>Evidence checklist</li>
                <li>Lease questions and printable memo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${memoBandClass}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className={`${surfaceCardClass} flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6`}>
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
                Related guides
              </p>
              <h2 className={`${sectionHeadingClass} mb-3`}>Before-signing lease guides</h2>
              <p className={supportingTextClass}>
                Use the checklist hub for the wider picture, then read the focused guides where a clause or cost line needs closer attention.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[44rem]">
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`${surfaceCardSoftClass} p-4 hover:-translate-y-0.5 transition-transform`}>
                  <p className="font-medium text-stone-950 mb-1">{link.label}</p>
                  <p className="text-sm text-stone-600 leading-6">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} pb-24`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FaqSection
            eyebrow="FAQs"
            title="Commercial heads of terms FAQs"
            description="Short answers for people comparing rent, incentives, and lease viability before the final lease is drafted."
            faqs={faqItems}
          />
          <div className={`${disclaimerClass} mt-8`}>
            YieldLens UK provides indicative decision-support only. It is not legal, lease, valuation, tax, or financial advice, and it does not replace professional due diligence.
          </div>
        </div>
      </section>
    </div>
  );
}
