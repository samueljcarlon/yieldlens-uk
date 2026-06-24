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

const freeCheckOutputs = [
  'Score',
  'Verdict',
  'Rent burden',
  'Break-even customers/day',
  'Upfront cash needed',
  'Cash after opening',
  'Downside monthly position',
  'Six-month survival test',
  'Risk flags',
];

const paidFileAdds = [
  'Decision memo',
  'Stress-test interpretation',
  'Negotiation levers',
  'Evidence checklist',
  'Lease questions',
  'Printable memo',
];

const methodologyPoints = [
  'YieldLens uses the assumptions entered by the user.',
  'It pressure-tests affordability and operating pressure, not market value.',
  'It does not replace comparables, legal review, tax advice, finance advice, surveys, or professional due diligence.',
  'Thresholds are caution bands, not approvals or recommendations.',
];

const verificationPoints = [
  'Comparable rents',
  'Service charge',
  'Business rates',
  'Fit-out quotes',
  'Supplier costs',
  'Staffing assumptions',
  'Footfall',
  'Planning and licensing',
  'Repair obligations',
  'Rent review terms',
  'Break clause terms',
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
                Commercial lease pressure-testing before you sign.
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                YieldLens UK turns rent, revenue, cost, opening cash, and downside assumptions into an indicative viability view before a lease becomes expensive to unwind.
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
                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-3">What it asks</p>
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
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {freeCheckOutputs.map((item) => (
            <div key={item} className={`${surfaceCardSoftClass} p-4 text-sm text-stone-700 leading-7`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf7ef] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why each metric matters"
            title="Each metric answers a different part of the lease question."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freeCheckMetrics.map((item) => (
              <div key={item.label} className={`${surfaceCardSoftClass} p-5`}>
                <p className="text-sm font-semibold text-stone-900">{item.label}</p>
                <p className="mt-2 text-sm text-stone-700 leading-7">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What the £49 file adds"
          title="The Standard file turns the snapshot into a decision memo."
          description="It is the next step when the free result says the site deserves more scrutiny."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paidFileAdds.map((item) => (
            <div key={item} className={`${surfaceCardClass} p-5 text-sm font-medium text-stone-800`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf7ef] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Methodology and thresholds"
            title="The model is simple on purpose."
            description="It is built to pressure-test a lease decision, not to model the whole property market."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {methodologyPoints.map((item) => (
              <div key={item} className={`${surfaceCardSoftClass} p-5 text-sm text-stone-700 leading-7`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What users should verify before signing"
          title="The checks that matter before the lease becomes hard to unwind."
          description="These are the items that should be verified after the commercial check but before commitment."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verificationPoints.map((item) => (
            <div key={item} className={`${surfaceCardClass} p-5 text-sm text-stone-700 leading-7`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Final CTA"
            title="Run the free check, then view the sample memo."
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
