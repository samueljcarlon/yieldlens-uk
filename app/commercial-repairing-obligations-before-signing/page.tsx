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
  title: 'Commercial Repairing Obligations Before Signing | YieldLens UK',
  description:
    'Check how repairing obligations, FRI wording, condition risk and dilapidations can affect commercial lease viability before signing.',
  alternates: {
    canonical: '/commercial-repairing-obligations-before-signing',
  },
  openGraph: {
    title: 'Commercial Repairing Obligations Before Signing | YieldLens UK',
    description:
      'Check how repairing obligations, FRI wording, condition risk and dilapidations can affect commercial lease viability before signing.',
    url: 'https://yieldlens.co.uk/commercial-repairing-obligations-before-signing',
  },
};

const faqs = [
  {
    question: 'What are repairing obligations in a commercial lease?',
    answer:
      'They are the lease terms that set out who must repair, maintain, reinstate, or hand back the property in a certain condition. The exact wording matters.',
  },
  {
    question: 'What is a full repairing and insuring lease?',
    answer:
      'A full repairing and insuring lease is a lease where the tenant can be responsible for repair and insurance-related costs, depending on the wording.',
  },
  {
    question: 'Why do repairing obligations matter before signing?',
    answer:
      'Repairing obligations can add hidden costs beyond rent and can reduce the margin of safety if the property needs work or the opening buffer is thin.',
  },
  {
    question: 'Should repair risk be included in a lease affordability check?',
    answer:
      'Yes. Repair exposure can change the real cost of occupation and affect whether the site still feels workable after opening.',
  },
  {
    question: 'What is a schedule of condition?',
    answer:
      'It is a record of the property condition at handover. It can help frame the repair position, but the effect depends on the lease wording and professional review.',
  },
  {
    question: 'Is YieldLens giving legal or building survey advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It helps you understand the commercial risk, but it does not replace legal or survey advice.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
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
      name: 'Commercial Repairing Obligations Before Signing',
      item: 'https://yieldlens.co.uk/commercial-repairing-obligations-before-signing',
    },
  ],
};

const riskRows = [
  {
    title: 'Repair risk can sit above rent',
    text: 'A unit can look affordable on rent but still carry hidden repair and reinstatement costs.',
  },
  {
    title: 'Condition at handover matters',
    text: 'If the property needs work, the real cost can be higher than the rent screen suggests.',
  },
  {
    title: 'FRI wording shifts the burden',
    text: 'Full repairing and insuring wording can move more upkeep and insurance responsibility to the tenant.',
  },
  {
    title: 'Opening cash can be the buffer that absorbs the shock',
    text: 'When the opening cash buffer is thin, unexpected repair exposure can narrow the margin of safety fast.',
  },
];

const compareRows = [
  {
    title: 'Headline rent',
    text: 'The obvious lease figure, but not the whole cost picture.',
  },
  {
    title: 'Service charge and insurance recovery',
    text: 'These can sit on top of rent and shift the occupancy cost upward.',
  },
  {
    title: 'Fit-out and reinstatement',
    text: 'If the unit needs works now or later, the capital stack gets tighter.',
  },
  {
    title: 'Repair obligations',
    text: 'The lease may pass upkeep, renewal, or maintenance risk to the tenant.',
  },
  {
    title: 'Dilapidations and schedule of condition',
    text: 'The handback position can matter just as much as the opening position.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Rent burden', value: '20.0%' },
  { label: 'Opening cash buffer', value: '£9,000' },
  { label: 'Fit-out', value: '£50,000' },
];

const relatedLinks = [
  {
    href: '/commercial-service-charge-before-signing',
    label: 'Commercial service charge before signing',
    description: 'Check whether shared costs and recoveries sit above the rent line.',
  },
  {
    href: '/commercial-break-clause-before-signing',
    label: 'Commercial break clause before signing',
    description: 'Check whether exit flexibility changes the downside if the site weakens.',
  },
  {
    href: '/commercial-lease-costs-before-signing',
    label: 'Commercial lease costs before signing',
    description: 'Check the full cost stack before the lease becomes expensive to unwind.',
  },
  {
    href: '/commercial-permitted-use-before-signing',
    label: 'Commercial permitted use before signing',
    description: 'Check whether the intended use is actually allowed at the site.',
  },
  {
    href: '/commercial-lease-checklist-before-signing',
    label: 'Commercial lease checklist before signing',
    description: 'Use the hub for the wider pre-signing checklist.',
  },
  {
    href: '/commercial-lease-viability-check',
    label: 'Commercial lease viability check',
    description: 'Pressure-test whether the site can still carry the rent after costs.',
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
      <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">{title}</h2>
      {description && <p className={supportingTextClass}>{description}</p>}
    </div>
  );
}

export default function CommercialRepairingObligationsBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-repairing-obligations-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial repairing obligations before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial repairing obligations
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial repairing obligations before signing a lease
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Repairing obligations can change the real cost of a commercial lease. A site can look affordable on rent, but become much riskier if the tenant is responsible for repairs, condition issues, reinstatement, or dilapidations that were not priced in before signing.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to judge the hidden repair risk, then run the free commercial check if you want to test rent and opening cash pressure together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-repairing-obligations-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-repairing-obligations-before-signing"
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
                <Link href="/commercial-service-charge-before-signing" className="underline decoration-stone-400/70 underline-offset-4">
                  Commercial service charge before signing
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {riskRows.map((row) => (
                <div key={row.title} className={`${surfaceCardClass} border-t border-t-[var(--yieldlens-caution)]`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
                    Repair risk
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
            title="Repairing obligations can change the lease decision"
            description="Repair risk is not always visible in the rent figure. It can shift cost and risk onto the tenant after the lease is signed."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {compareRows.map((row) => (
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
                  With only £9,000 left after opening costs, unexpected repair or reinstatement exposure could materially reduce the margin of safety. The site may still trade, but repair obligations should be understood before commitment.
                </p>
              </div>
            </div>

            <div className={`${surfaceCardSoftClass} p-6`}>
              <h2 className="text-2xl font-semibold text-stone-950 mb-3">Questions to ask before relying on the rent figure</h2>
              <ul className="space-y-3 text-sm text-stone-700 leading-7">
                <li>What parts of the property is the tenant responsible for repairing?</li>
                <li>Is the lease full repairing and insuring?</li>
                <li>Is there a schedule of condition?</li>
                <li>Does the tenant have to put the property into better condition than at handover?</li>
                <li>Who pays for structural repairs?</li>
                <li>Are plant, extraction, roof, electrics, plumbing or shopfront included?</li>
                <li>What reinstatement obligations apply at the end?</li>
                <li>Could repair obligations affect a break clause?</li>
                <li>Has a solicitor reviewed the wording?</li>
                <li>Has a surveyor checked the condition?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="How YieldLens helps"
            title="Use the free check first, then the paid file if the site still deserves work"
            description="YieldLens cannot inspect the property or review the lease wording. It helps you structure the commercial questions before you commit."
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
                Use the checklist hub for the wider picture, then open the focused guides where a clause or cost line needs closer attention.
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
            title="Commercial repairing obligations FAQs"
            description="Short answers for operators comparing repair exposure, hidden costs, and lease viability before signing."
            faqs={faqs}
          />
          <div className={`${disclaimerClass} mt-8`}>
            YieldLens UK provides indicative decision-support only. It is not legal, lease, valuation, building survey, tax, or financial advice, and it does not replace professional due diligence.
          </div>
        </div>
      </section>
    </div>
  );
}
