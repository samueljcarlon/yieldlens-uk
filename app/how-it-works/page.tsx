import type { Metadata } from 'next';
import Link from 'next/link';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import {
  disclaimerClass,
  heroSecondaryCtaClass,
  primaryCtaClass,
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
    detail: 'Shows whether rent is taking too much of expected revenue.',
  },
  {
    label: 'Break-even customers',
    detail: 'Shows whether the daily trading assumption is realistic.',
  },
  {
    label: 'Opening cash',
    detail: 'Shows whether setup costs leave enough buffer before trading begins.',
  },
  {
    label: 'Downside trading',
    detail: 'Shows what happens if early revenue is weaker than planned.',
  },
  {
    label: 'Six-month survival',
    detail: 'Shows whether the site can absorb a weak start.',
  },
  {
    label: 'Risk flags',
    detail: 'Highlights the pressure points that need another look.',
  },
];

const methodologyPoints = [
  'YieldLens uses the assumptions entered by the user.',
  'It compares rent, revenue, costs, opening cash, and downside trading pressure.',
  'Thresholds are caution bands, not approvals or recommendations.',
  'It does not estimate market value or replace professional due diligence.',
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
    <div className="mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-green-700 mb-3">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">{title}</h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/how-it-works"
        pageType="trust_page"
        mode="commercial"
        eventLabel="How it works viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-300 mb-4">
                How it works
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                How YieldLens UK works
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Commercial lease pressure-testing before you sign. YieldLens UK turns rent, revenue, costs, opening cash, and downside assumptions into an indicative viability view before a lease becomes expensive to unwind.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-it-works"
                  ctaLabel="Run a free commercial check"
                  pageType="trust_page"
                  className={primaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
                  View sample file
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/5 p-5 sm:p-6`}>
              <p className="text-xs uppercase tracking-widest text-green-300 font-medium mb-3">
                In one line
              </p>
              <p className="text-2xl font-bold leading-tight text-white">
                It turns lease assumptions into a structured early warning view.
              </p>
              <p className="mt-4 text-sm text-stone-300 leading-7">
                The point is not to promise certainty. The point is to make the rent, trading, opening cash, and lease questions easy to review before you commit.
              </p>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-3">
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

      <section className="max-w-6xl mx-auto px-4 py-16">
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
          ].map((item) => (
            <div key={item} className={`${surfaceCardSoftClass} p-5 text-sm text-stone-700 leading-7`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf7ef] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What the free commercial check does"
            title="The free result is the fast viability snapshot."
            description="It gives the headline numbers you need to decide whether a site deserves more time."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeCheckMetrics.map((item) => (
              <div key={item.label} className={`${surfaceCardClass} p-5`}>
                <p className="text-xs uppercase tracking-[0.18em] text-green-700 font-semibold mb-2">{item.label}</p>
                <p className="text-sm text-stone-700 leading-7">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
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
          ].map((item) => (
            <div key={item} className={`${surfaceCardSoftClass} p-5 text-sm text-stone-700 leading-7`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf7ef] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What the £49 Standard file adds"
            title="The paid file turns the snapshot into a decision memo."
            description="It keeps the same numbers but organises them into a printable report the user can use for negotiation and due diligence before signing."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
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
            ].map((item) => (
              <div key={item} className={`${surfaceCardSoftClass} p-5 text-sm font-medium text-stone-800`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Methodology and thresholds"
          title="The model is built for early screening."
          description="It is designed to pressure-test the lease decision, not to model the whole property market."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {methodologyPoints.map((item) => (
            <div key={item} className={`${surfaceCardClass} p-5 text-sm text-stone-700 leading-7`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf7ef] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What users should verify before signing"
            title="The checks that matter before the lease becomes hard to unwind."
            description="These are the items that should be checked after the commercial result but before commitment."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verificationPoints.map((item) => (
              <div key={item} className={`${surfaceCardSoftClass} p-5 text-sm text-stone-700 leading-7`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Example journey"
          title="A generic cafe example shows how the tools fit together."
          description="The example is fictional and redacted so the structure can be seen without exposing a real tenant or property."
        />
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className={`${surfaceCardSoftClass} p-5`}>
            <p className="text-xs uppercase tracking-wide text-stone-400 font-medium mb-3">Fictional case</p>
            <div className="space-y-3 text-sm text-stone-700 leading-6">
              <p>Business type: Cafe</p>
              <p>Address: Redacted high street site</p>
              <p>Rent is high relative to the expected trade.</p>
              <p>Opening costs leave the buffer thin.</p>
              <p>Downside trading still matters, but the main question is whether the opening stack is strong enough.</p>
            </div>
          </div>
          <div className={`${surfaceCardClass} p-5 text-sm text-stone-700 leading-7`}>
            <p>
              YieldLens would push the user to challenge the rent, confirm footfall,
              verify fit-out costs, and review lease clauses before committing.
              The paid file then organises the same result into the memo used for
              negotiation and due diligence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ef] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What YieldLens does not do"
            title="The limits are deliberate."
            description="The tool is there to help with early screening and decision support, not to replace the people and evidence that close the deal."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Not financial advice.',
              'Not legal advice.',
              'Not tax advice.',
              'Not a valuation.',
              'Not a substitute for due diligence.',
              'Not a replacement for reviewing the lease, speaking to advisers, or checking local evidence.',
            ].map((item) => (
              <div key={item} className={`${surfaceCardClass} p-5 text-sm text-stone-700 leading-7`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Final CTA"
            title="Run the free check before the lease becomes expensive to unwind."
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/how-it-works"
              ctaLabel="Run a free commercial check"
              pageType="trust_page"
              className={primaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
              View sample file
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
