import type { Metadata } from 'next';
import Link from 'next/link';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import {
  disclaimerClass,
  heroSecondaryCtaClass,
  heroPrimaryCtaClass,
  memoBandClass,
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'How YieldLens UK Works',
  description:
    'Learn how YieldLens UK pressure-tests commercial leases with rent burden, break-even customers, opening cash, downside trading, and a paid decision memo before signing.',
  alternates: {
    canonical: '/how-it-works',
  },
  openGraph: {
    title: 'How YieldLens UK Works',
    description:
      'Commercial lease pressure-tests before you commit. See how the free check, paid file, and sample report fit together.',
    url: 'https://yieldlens.co.uk/how-it-works',
  },
};

const freeCheckMetrics = [
  {
    label: 'Rent burden',
    detail: 'Shows whether rent still leaves room for staff, stock, service charge, and slower early trade.',
  },
  {
    label: 'Break-even customers',
    detail: 'Turns the rent and cost base into a daily customer target so optimistic trade assumptions are easier to challenge.',
  },
  {
    label: 'Opening cash',
    detail: 'Shows whether fit-out, deposit, legal fees, stock, and launch costs leave enough buffer.',
  },
  {
    label: 'Downside trading',
    detail: 'Checks what happens if early trade lands below the best case.',
  },
  {
    label: 'Six-month survival',
    detail: 'Shows whether the site can absorb a weak start or needs better terms before signing.',
  },
  {
    label: 'Risk flags',
    detail: 'Surfaces the pressure points that deserve another look before the lease gets expensive to unwind.',
  },
];

const methodologyPoints = [
  'YieldLens uses the assumptions entered by the user.',
  'It compares rent, revenue, costs, opening cash, and downside trading pressure.',
  'Thresholds are caution bands, not approvals or recommendations.',
  'It does not estimate market value or replace comparables, legal review, tax advice, finance advice, surveys, or professional due diligence.',
];

const verificationPoints = [
  'Comparable rents',
  'Footfall',
  'Competitor density',
  'Service charge',
  'Business rates',
  'Utility costs',
  'Supplier costs',
  'Staffing assumptions',
  'Fit-out quotes',
  'Deposit terms',
  'Rent-free period',
  'Break clause',
  'Repair obligations',
  'Rent review terms',
  'Planning and licensing',
];

const proofPoints = [
  {
    title: 'Rent burden',
    text: 'Checks whether rent still leaves room for staff, stock, service charge, and quieter early trade.',
  },
  {
    title: 'Break-even customers',
    text: 'Turns the rent and cost base into a daily customer target so optimistic footfall assumptions are easier to challenge.',
  },
  {
    title: 'Opening cash',
    text: 'Shows whether fit-out, deposit, legal fees, launch stock, and setup costs leave enough breathing room.',
  },
  {
    title: 'Downside survival',
    text: 'Checks whether a weaker start still gives the operator time to adjust.',
  },
  {
    title: 'Evidence checklist',
    text: 'Reduces assumption risk by showing what should be verified before signing.',
  },
];

const exampleJourney = [
  'A fictional cafe operator is comparing a unit with strong footfall but a rent level that looks heavy once the full cost stack is included.',
  'YieldLens points to a high rent burden, a break-even target that needs checking against real footfall, and an opening cash buffer that looks thin after launch costs.',
  'That pushes the operator to ask about rent-free time, landlord contribution, fit-out scope, service charge, and evidence for demand before signing.',
];

const beforeAfterPoints = [
  {
    title: 'Before: high rent burden',
    text: 'Rent absorbs too much of the monthly revenue, leaving less room for staff, stock, service charge, and quieter weeks.',
  },
  {
    title: 'Before: demanding break-even target',
    text: 'The daily customer target only becomes useful when it is compared with seating, opening hours, and realistic trade patterns.',
  },
  {
    title: 'After: better opening terms',
    text: 'A rent-free period, lower deposit, or landlord contribution can improve the opening buffer and make launch pressure easier to carry.',
  },
  {
    title: 'After: stronger negotiation position',
    text: 'A break clause and clearer evidence for demand turn the result into a better conversation before signing.',
  },
];

const whatThePaidFileAdds = [
  'Executive summary',
  'Stress-test interpretation',
  'Rent burden interpretation',
  'Break-even customer context',
  'Opening cash and buffer view',
  'Six-month downside survival',
  'Negotiation levers',
  'Evidence checklist',
  'Lease questions',
  'Printable memo',
];

const whatToVerify = [
  'Can the site carry the rent after fit-out and deposit?',
  'Is the daily customer target realistic for the location and offer?',
  'What happens if trade starts slower than planned?',
  'Which lease terms need to be challenged before heads of terms?',
  'What evidence still needs to be collected before signing?',
];

const noDoClaims = [
  'Not financial advice.',
  'Not legal advice.',
  'Not tax advice.',
  'Not a valuation.',
  'Not a substitute for due diligence.',
  'Not a replacement for reviewing the lease, speaking to advisers, or checking local evidence.',
];

const beforeSigningLinks = [
  {
    href: '/commercial-lease-checklist-before-signing',
    label: 'Commercial lease checklist before signing',
    description: 'Use the hub that groups the main lease checks.',
  },
  {
    href: '/commercial-heads-of-terms-before-signing',
    label: 'Commercial heads of terms before signing',
    description: 'Check the early deal points before the lease gets expensive.',
  },
  {
    href: '/commercial-lease-costs-before-signing',
    label: 'Commercial lease costs before signing',
    description: 'Check the full cost stack before you commit to the lease.',
  },
  {
    href: '/commercial-break-clause-before-signing',
    label: 'Commercial break clause before signing',
    description: 'Check the exit route if trading weakens after opening.',
  },
];

function SectionTitle({
  eyebrow,
  title,
  description,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';

  return (
    <div className="mb-10">
      <p
        className={`text-xs font-medium uppercase tracking-widest mb-3 ${
          isDark ? 'text-[#DCCDA8]' : 'text-[var(--yieldlens-caution)]'
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-sm max-w-3xl leading-7 ${isDark ? 'text-stone-300' : 'text-[var(--yieldlens-muted)]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function accentClass(index: number) {
  const accents = [
    'border-l-[var(--yieldlens-caution)]',
    'border-l-[var(--yieldlens-primary)]',
    'border-l-[var(--yieldlens-positive)]',
    'border-l-[var(--yieldlens-fragile)]',
    'border-l-[var(--yieldlens-risk)]',
  ];

  return accents[index % accents.length];
}

export default function HowItWorksPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/how-it-works"
        pageType="trust_page"
        mode="commercial"
        eventLabel="How it works viewed"
      />

      <section className="bg-[var(--yieldlens-hero)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                How it works
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                How YieldLens UK works
              </h1>
              <p className="text-base sm:text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Commercial lease pressure-testing before you sign. YieldLens UK turns rent,
                revenue, costs, opening cash, and downside assumptions into an indicative
                viability view before a lease becomes expensive to unwind.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-it-works"
                  ctaLabel="Run a free commercial check"
                  pageType="trust_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
                  View sample file
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not a valuation,
                financial advice, mortgage advice, legal advice, tax advice, or a substitute
                for professional due diligence.
              </p>
            </div>

            <div className={`${memoBandClass} p-6 sm:p-7`}>
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                In one line
              </p>
              <p className="text-2xl font-bold leading-tight text-white">
                It turns lease assumptions into a structured early warning view.
              </p>
              <p className="mt-4 text-sm text-stone-300 leading-7">
                The point is not to promise certainty. The point is to make the rent,
                trading, opening cash, and lease questions easy to review before you commit.
              </p>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#DCCDA8] font-semibold mb-3">
                  What it asks
                </p>
                <ul className="space-y-2 text-sm text-stone-300 leading-6">
                  <li>Can the business carry the rent?</li>
                  <li>Does the opening buffer look thin?</li>
                  <li>What happens if trade starts weak?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why this exists"
            title="A lease can look fine until the real costs are added."
            description="Commercial tenants often focus on whether a site looks good. The harder question is whether the site can carry the rent after fit-out, deposits, staff, supplier costs, and a weaker-than-planned start."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'A rent figure can look acceptable until it is measured against expected revenue.',
              'Setup costs can absorb more cash than the business expected before trading begins.',
              'A weak start can expose whether the site works in real trading, not only in the best case.',
              'Lease wording can shift the economics even when the headline rent looks reasonable.',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5 text-sm leading-7 text-stone-700`}
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
            eyebrow="What the free commercial check does"
            title="The free result is the fast viability snapshot."
            description="It gives the headline numbers you need to decide whether a site deserves more time."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeCheckMetrics.map((item, index) => (
              <div
                key={item.label}
                className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5`}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                  {item.label}
                </p>
                <p className="text-sm text-stone-700 leading-7">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="How to read the result"
            title="The score is a screening signal, not a final answer."
            description="A good score means the entered assumptions look more workable. A caution or fragile result means the assumptions, rent terms, evidence, and cash buffer need more checking. The result is only as useful as the numbers entered."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Good scores suggest the current lease shape looks more workable on the entered assumptions.',
              'Caution or fragile results suggest the rent, opening capital, or trading assumptions deserve a closer look.',
              'The model does not create certainty. It helps the user see which assumption is carrying the weight.',
              'A result is only as strong as the evidence behind the inputs.',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-5 text-sm leading-7 text-stone-700`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${memoBandClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl my-16`}>
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <SectionTitle
            eyebrow="What the £49 Standard file adds"
            title="The paid file turns the snapshot into a decision memo."
            description="It keeps the same numbers but organises them into a printable report the user can use for negotiation and due diligence before signing."
            tone="dark"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatThePaidFileAdds.map((item, index) => (
              <div
                key={item}
                className={`rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm font-medium leading-6 text-stone-200 ${
                  index % 3 === 0 ? 'shadow-[0_16px_32px_rgba(0,0,0,0.12)]' : ''
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
            eyebrow="Proof in practice"
            title="The metrics work together, not in isolation."
            description="Each check answers a different part of the lease question, and together they show where the pressure sits."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {proofPoints.map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-5`}
              >
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="mt-2 text-sm text-stone-700 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Methodology and thresholds"
            title="The model is built for early screening."
            description="It is designed to pressure-test the lease decision, not to model the whole property market."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methodologyPoints.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5 text-sm leading-7 text-stone-700`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="max-w-3xl mb-5">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">
              Before signing guides
            </p>
            <p className="text-sm text-stone-600 leading-7">
              Before the assumptions harden, check the lease questions that sit behind the numbers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {beforeSigningLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-3xl border border-stone-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--yieldlens-caution)] ${
                  index === 0
                    ? 'shadow-[0_10px_24px_rgba(15,23,42,0.04)]'
                    : 'shadow-sm'
                }`}
              >
                <p className="font-semibold text-stone-900 mb-1">{link.label}</p>
                <p className="text-sm text-stone-600 leading-6">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What users should verify before signing"
            title="The checks that matter before the lease becomes hard to unwind."
            description="These are the items that should be checked after the commercial result but before commitment."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verificationPoints.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-5 text-sm text-stone-700 leading-7`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Illustrative example"
            title="A fictional cafe example shows how the questions sharpen."
            description="The example is fictional and redacted so the reasoning path can be seen without exposing a real tenant or property."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
            <div className={`${surfaceCardSoftClass} border-l-4 border-l-[var(--yieldlens-caution)] p-5`}>
              <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] font-medium mb-3">
                Fictional case
              </p>
              <div className="space-y-3 text-sm text-stone-700 leading-6">
                {exampleJourney.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div className={`${surfaceCardClass} border-l-4 border-l-[var(--yieldlens-primary)] p-5 text-sm text-stone-700 leading-7`}>
              <p className="font-semibold text-stone-900 mb-3">Before and after pressure-test</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {beforeAfterPoints.map((item, index) => (
                  <div key={item.title} className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-4`}>
                    <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                    <p className="mt-2 text-sm text-stone-700 leading-7">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                YieldLens would push the user to challenge the rent, confirm footfall, verify fit-out costs, and review lease clauses before committing. The paid file then organises the same result into the memo used for negotiation and due diligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What YieldLens does not do"
            title="The limits are deliberate."
            description="The tool is there to help with early screening and decision support, not to replace the people and evidence that close the deal."
            tone="dark"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {noDoClaims.map((item, index) => (
              <div
                key={item}
                className={`rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-stone-300 ${
                  index % 2 === 0 ? 'shadow-[0_16px_32px_rgba(0,0,0,0.12)]' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Final CTA"
            title="Run the free check before the lease becomes expensive to unwind."
            tone="dark"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/how-it-works"
              ctaLabel="Run a free commercial check"
              pageType="trust_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
              View sample file
            </Link>
            <Link href="/about" className={secondaryCtaClass}>
              About YieldLens
            </Link>
            <Link href="/viability-file" className={secondaryCtaClass}>
              Learn about the £49 file
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
