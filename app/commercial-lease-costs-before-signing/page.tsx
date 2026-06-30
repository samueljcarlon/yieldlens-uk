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
  title: 'Commercial Lease Costs Before Signing | YieldLens UK',
  description:
    'Check the rent, deposit, fit-out, service charge, legal fees, opening cash and downside trading pressure before committing to a commercial lease.',
  alternates: {
    canonical: '/commercial-lease-costs-before-signing',
  },
  openGraph: {
    title: 'Commercial Lease Costs Before Signing | YieldLens UK',
    description:
      'Check the rent, deposit, fit-out, service charge, legal fees, opening cash and downside trading pressure before committing to a commercial lease.',
    url: 'https://yieldlens.co.uk/commercial-lease-costs-before-signing',
  },
};

const faqItems = [
  {
    question: 'What costs should I check before signing a commercial lease?',
    answer:
      'Check the rent, deposit, fit-out, legal fees, service charge, business rates, insurance, utilities, opening stock, staffing before full trading, repairs, and any licensing or planning costs.',
  },
  {
    question: 'Is rent the biggest cost in a commercial lease?',
    answer:
      'Rent is often the headline number, but the full commitment can be larger once deposit, fit-out, legal work, stock, staffing, and weak opening months are included.',
  },
  {
    question: 'How much cash should I have before signing?',
    answer:
      'There is no universal number. The important point is whether the starting cash still leaves a workable buffer after deposit, fit-out, legal fees, and launch costs are paid.',
  },
  {
    question: 'What commercial lease costs are often missed?',
    answer:
      'Service charge, repairs, business rates, utilities, insurance, opening stock, staffing before full trading, and licensing or planning costs are common misses.',
  },
  {
    question: 'Should I include fit-out costs in the decision?',
    answer:
      'Yes. Fit-out can be one of the largest early cash calls and can change whether the site is still viable once trading starts.',
  },
  {
    question: 'Is YieldLens a valuation or advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It is not a valuation or professional advice and does not replace due diligence.',
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
      name: 'Commercial Lease Costs Before Signing',
      item: 'https://yieldlens.co.uk/commercial-lease-costs-before-signing',
    },
  ],
};

const upfrontCosts = [
  {
    title: 'Rent deposit',
    what: 'Cash held by the landlord at the start of the lease.',
    why: 'It reduces the amount left after signing and can tighten the opening buffer.',
    verify: 'Check the amount, when it is returned, and what can reduce or forfeit it.',
  },
  {
    title: 'Fit-out and setup costs',
    what: 'Works, equipment, and practical setup needed before opening.',
    why: 'This is often the biggest early cash call and can make an affordable rent feel expensive.',
    verify: 'Use contractor quotes, not rough guesses, before heads of terms become expensive.',
  },
  {
    title: 'Legal fees',
    what: 'Solicitor and professional costs around the lease and related checks.',
    why: 'They add to the upfront commitment before the site has proved itself.',
    verify: 'Ask for a realistic legal budget, including lease review and any specialist advice needed.',
  },
  {
    title: 'Opening stock',
    what: 'Initial inventory or stock needed to start trading.',
    why: 'Stock uses cash before there is any trading income.',
    verify: 'Base the figure on launch volumes, supplier terms, and the likely opening mix.',
  },
  {
    title: 'Licensing or planning costs',
    what: 'Any cost linked to permissions, approvals, or required changes before opening.',
    why: 'These can delay launch and increase the cash needed before trading begins.',
    verify: 'Check whether planning, licensing, or landlord consent is needed and what it may cost.',
  },
  {
    title: 'Opening cash buffer',
    what: 'Cash left after the upfront costs are paid.',
    why: 'This is the buffer that has to carry early trading pressure and any delay in opening.',
    verify: 'Check whether the buffer still looks reasonable after the start-up stack has been paid.',
  },
];

const ongoingCosts = [
  {
    title: 'Monthly rent',
    what: 'The regular rent payable under the lease.',
    why: 'This is the core fixed commitment and the main driver of rent burden.',
    verify: 'Confirm the annual rent, payment pattern, and any stepped increases or reviews.',
  },
  {
    title: 'Service charge',
    what: 'Landlord or estate costs passed through to the tenant.',
    why: 'A variable service charge can make the real cost of occupation less predictable.',
    verify: 'Ask for recent history, caps if any, and what the charge actually covers.',
  },
  {
    title: 'Business rates',
    what: 'The local tax on the occupied property.',
    why: 'It can materially change monthly occupancy costs and is often missed in early thinking.',
    verify: 'Use a current estimate, not a rough memory from a similar unit.',
  },
  {
    title: 'Insurance',
    what: 'Cover required by the tenant or lease terms.',
    why: 'It is a real monthly or annual cost and should be included in the occupancy stack.',
    verify: 'Check what the lease requires and whether the quote matches the use type.',
  },
  {
    title: 'Utilities',
    what: 'Electricity, gas, water, broadband, and related running costs.',
    why: 'These can rise quickly when the site opens and trades harder than expected.',
    verify: 'Use a conservative launch estimate rather than a best-case assumption.',
  },
  {
    title: 'Staffing before full trading',
    what: 'Labour needed while trade is still building.',
    why: 'Early staffing pressure can be heavy even before the site reaches steady sales.',
    verify: 'Model the ramp-up, not only the later steady-state rota.',
  },
  {
    title: 'Repairs and maintenance',
    what: 'Routine upkeep and any lease-linked repair obligation.',
    why: 'A unit that looks fine on day one can still carry hidden maintenance pressure.',
    verify: 'Read the repair wording and ask what is tenant responsibility versus landlord responsibility.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Fit-out', value: '£50,000' },
  { label: 'Deposit', value: '£15,000' },
  { label: 'Legal fees', value: '£3,000' },
  { label: 'Opening stock', value: '£8,000' },
  { label: 'Other setup', value: '£5,000' },
  { label: 'Starting cash', value: '£90,000' },
  { label: 'Opening cash buffer', value: '£9,000' },
];

const relatedLinks = [
  {
    href: '/commercial-lease-checklist-before-signing',
    label: 'Commercial lease checklist before signing',
    description: 'Move from costs to the wider signing checklist.',
  },
  {
    href: '/commercial-lease-deposit-before-signing',
    label: 'Commercial lease deposit before signing',
    description: 'Check how the deposit changes opening cash and working capital.',
  },
  {
    href: '/commercial-service-charge-before-signing',
    label: 'Commercial service charge before signing',
    description: 'Check how shared costs change the true occupancy cost.',
  },
  {
    href: '/commercial-fit-out-costs-before-signing',
    label: 'Commercial fit-out costs before signing',
    description: 'Check how opening spend changes the cash buffer.',
  },
  {
    href: '/commercial-repairing-obligations-before-signing',
    label: 'Commercial repairing obligations before signing',
    description: 'Check whether repair risk changes the opening cost stack.',
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
      {description && <p className={`${supportingTextClass}`}>{description}</p>}
    </div>
  );
}

export default function CommercialLeaseCostsBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-lease-costs-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial lease costs before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial lease costs
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial lease costs to check before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Before signing a commercial lease, the rent is only one part of the commitment. Fit-out, deposit, service charge, legal fees, business rates, utilities, insurance, stock, staffing, and weak opening months can all affect whether the site can carry the lease.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to check the costs before signing, then run the free commercial check if you want to pressure-test whether the unit still looks workable.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-costs-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-costs-before-signing"
                  ctaLabel="View sample viability file"
                  pageType="seo_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
                <Link href="/commercial-lease-checklist-before-signing" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease checklist
                </Link>
                <Link href="/commercial-lease-viability-check" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease viability check
                </Link>
                <Link href="/commercial-rent-affordability-calculator" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial rent affordability calculator
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                What usually gets missed
              </p>
              <div className="space-y-3 text-sm text-[var(--yieldlens-muted)] leading-6">
                <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                  Rent is the headline, but the full commitment usually includes deposit, fit-out, legal costs, and launch cash.
                </div>
                <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4">
                  A site can look manageable on rent alone and still be fragile once opening costs and weak trading are included.
                </div>
                <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                  Use the free commercial check to see whether the rent pressure, cash buffer, and downside trading still look workable.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} mt-8`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Core cost checklist"
            title="What costs should you check before signing a commercial lease?"
            description="A sensible lease decision should separate upfront costs from ongoing occupation costs, then check whether the opening cash buffer still looks usable."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CostBlock title="Upfront costs" items={upfrontCosts} />
            <CostBlock title="Ongoing costs" items={ongoingCosts} />
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why rent alone is not enough"
            title="A rent can look manageable and still leave too little room to trade."
            description="The lease decision changes once deposit, fit-out, legal fees, stock, staffing, and slow opening months are added to the picture."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
            <div className={`${surfaceCardSoftClass} p-5 sm:p-6`}>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                A useful lease check asks whether the business can still breathe after the upfront costs are paid. If the opening cash buffer is thin, the site can become fragile before trade has had time to settle.
              </p>
              <div className="mt-4 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                This is the pressure point to verify first: not whether the rent sounds fair in isolation, but whether the full cash stack still leaves room for weaker early trading.
              </div>
            </div>
            <div className={`${surfaceCardClass} p-5 sm:p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">Illustrative example</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7 mb-4">
                A fictional site can be easy to like on footfall alone and still be thin once the opening costs are stacked together.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exampleRows.map((row) => (
                  <div key={row.label} className={`${surfaceCardSoftClass} p-3`}>
                    <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)]">{row.label}</p>
                    <p className="text-lg font-semibold text-stone-900 mt-1">{row.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7 mt-4">
                In this example, the site may still have revenue potential, but the opening cash buffer is thin once the upfront costs are included.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="How YieldLens helps"
            title="Use the free commercial check to pressure-test the lease costs."
            description="The check looks at the pressure points that matter before the numbers become a commitment."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Rent burden',
                text: 'See how much expected revenue the rent absorbs before other costs are added.',
              },
              {
                title: 'Break-even customers',
                text: 'Translate the lease into a daily trading target that is easier to judge.',
              },
              {
                title: 'Opening cash and downside trading',
                text: 'Check whether the opening buffer still works if trade starts slowly.',
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
              pagePath="/commercial-lease-costs-before-signing"
              ctaLabel="Check a commercial lease before signing"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Check a commercial lease before signing
            </TrackedCtaLink>
            <Link href="/commercial-lease-viability-check" className={heroSecondaryCtaClass}>
              Commercial lease viability check
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Paid file"
            title="The £49 Standard commercial viability file turns the check into a printable memo."
            description="It is built to organise the assumptions, stress tests, negotiation levers, evidence checklist, and lease questions in one place."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-center">
            <div className={`${surfaceCardClass} p-5 sm:p-6`}>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                Use the sample file to see the output first, then unlock the Standard commercial viability file if you want the memo version after the free check.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_home_cta_clicked"
                pagePath="/commercial-lease-costs-before-signing"
                ctaLabel="See sample viability file"
                pageType="seo_page"
                className={heroPrimaryCtaClass}
              >
                See sample viability file
              </TrackedCtaLink>
              <Link href="/viability-file" className={secondaryCtaClass}>
                View viability file
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial lease costs FAQs"
        description="Short answers for people comparing the real cost of taking on a commercial lease."
        faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Use the page that matches the question you are actually asking."
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

function CostBlock({
  title,
  items,
}: {
  title: string;
  items: { title: string; what: string; why: string; verify: string }[];
}) {
  return (
    <div className={`${surfaceCardClass} p-5 sm:p-6`}>
      <h3 className="text-xl font-semibold text-stone-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className={`${surfaceCardSoftClass} p-4`}>
            <p className="text-sm font-semibold text-stone-900 mb-2">{item.title}</p>
            <div className="grid grid-cols-1 sm:grid-cols-[0.8fr_1fr] gap-3 text-sm leading-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] mb-1">What it is</p>
                <p className="text-[var(--yieldlens-muted)]">{item.what}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] mb-1">Why it matters / verify</p>
                <p className="text-[var(--yieldlens-muted)]">{`${item.why} ${item.verify}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
