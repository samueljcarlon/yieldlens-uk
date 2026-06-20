import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'How YieldLens UK Works',
  description:
    'Learn how YieldLens UK turns commercial lease assumptions into an indicative rent burden, break-even, upfront cash, downside trading, and viability file before signing a commercial lease.',
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

const whoItIsFor = [
  'Cafe founders',
  'Restaurant operators',
  'Salon owners',
  'Small retailers',
  'First-time commercial tenants',
  'People comparing commercial sites',
  'People checking whether a lease looks too heavy before signing',
];

const freeCheckIncludes = [
  'Rent',
  'Expected customers/day',
  'Average spend',
  'Opening days',
  'Staff costs',
  'Business rates',
  'Utilities and other costs',
  'Fit-out and setup costs',
  'Starting cash',
  'Downside revenue percentage',
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

const paidFileIncludes = [
  'Executive summary',
  'Site snapshot',
  'Key viability metrics',
  'Upfront cash and survival',
  'What would need to improve',
  'Stress-test scenarios',
  'Negotiation levers',
  'Evidence needed before signing',
  'Lease questions',
  'Due diligence checklist',
  'Methodology note',
  'Ranked actions before committing',
  'Final view',
];

const notIncluded = [
  'Property valuation',
  'Financial advice',
  'Legal advice',
  'Tax advice',
  'Mortgage advice',
  'Surveyor report',
  'Lease verification',
  'Footfall verification',
  'Broker replacement',
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
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">{title}</h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
                How it works
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Commercial lease pressure-tests before you commit.
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                YieldLens UK helps early-stage tenants pressure-test whether a
                commercial site can carry the rent, opening costs, and downside
                trading assumptions before spending serious time or money on a
                lease.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-it-works"
                  ctaLabel="Run a free commercial check"
                  pageType="trust_page"
                  className="bg-teal-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-teal-400 transition-colors text-sm text-center"
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link
                  href="/sample-commercial-viability-file"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View sample file
                </Link>
              </div>
              <p className="text-xs text-stone-400 mt-5">
                YieldLens UK provides indicative decision-support only. It is not
                a valuation, financial advice, mortgage advice, legal advice,
                tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-3">
                In one line
              </p>
              <p className="text-2xl font-bold leading-tight text-white">
                It turns lease assumptions into a structured early warning view.
              </p>
              <p className="mt-4 text-sm text-stone-300 leading-7">
                The point is not to promise certainty. The point is to make the
                rent, trading, opening cash, and lease questions easy to review
                before you commit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Who it is for"
          title="Built for people comparing commercial sites before signing."
          description="YieldLens UK is aimed at early-stage commercial tenants who need a quick, structured pressure-test before committing to a lease."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whoItIsFor.map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="The problem it solves"
            title="Headline rent is only one part of the risk."
            description="A site can look affordable until you add staffing, fit-out, deposit, legal fees, opening stock, starting cash, weaker trading, and the lease clauses that change the real cost base."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              'Rent burden can look manageable until it is compared with actual expected revenue.',
              'Opening costs can absorb more cash than a leaseholder expects before trading begins.',
              'A weaker trading case can expose whether the concept works only in the best case.',
              'Lease wording can shift the economics even when the headline rent looks acceptable.',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-700 leading-7">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="The free commercial check"
          title="A quick pressure-test before you spend serious time on a site."
          description="The free check is the first screen. It turns your inputs into a score, a verdict, and the key lease metrics you need to judge whether the site deserves more attention."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-stone-900 mb-3">Inputs</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {freeCheckIncludes.map((item) => (
                <div key={item} className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900 mb-3">Outputs</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {freeCheckOutputs.map((item) => (
                <div key={item} className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="The £49 file"
            title="The paid Standard commercial viability file is the next step after a saved check."
            description="It expands the free result into the report structure users can review, print, save, and use as a due diligence prompt before committing."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paidFileIncludes.map((item) => (
              <div key={item} className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm font-medium text-stone-800 shadow-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/sample-commercial-viability-file"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm text-center"
            >
              View sample file
            </Link>
            <Link
              href="/viability-file"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
            >
              Learn about the £49 file
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="How the file is built"
          title="Generated from the assumptions entered into the commercial check."
          description="The file uses standard arithmetic on rent, expected revenue, known costs, upfront cash items, and downside trading assumptions. It does not use live market data, inspect the property, verify lease documents, or validate the user’s figures."
        />
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
        The goal is to structure the early decision and highlight what needs
        checking, not to pretend to be a valuation or professional advice.
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What it does not do"
            title="The limits are deliberate."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notIncluded.map((item) => (
              <div key={item} className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-700 leading-7">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Why it is still useful"
          title="It helps users challenge the assumptions before committing."
          description="YieldLens UK is useful when you need to know whether a lease looks too heavy before the due diligence work gets expensive."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Is rent too high relative to expected revenue?',
            'How many customers/day are needed to break even?',
            'Does starting cash survive fit-out and deposit?',
            'What happens if revenue is 40% weaker?',
            'Which lease terms matter most for this case?',
            'What evidence should be gathered before committing?',
          ].map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 text-sm text-stone-700 leading-7 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Example walkthrough"
            title="A redacted cafe example shows the shape of the file."
            description="The sample uses fictional and redacted inputs so the structure can be seen without exposing a real tenant or property."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium mb-3">Sample case</p>
              <div className="space-y-3 text-sm text-stone-700 leading-6">
                <p>Business type: Cafe</p>
                <p>Address: Redacted high street site</p>
                <p>Postcode: NW6 sample</p>
                <p>Annual rent: £60,000</p>
                <p>Expected customers/day: 80</p>
                <p>Average spend: £12</p>
                <p>Monthly revenue: £24,960</p>
                <p>Rent burden: 20%</p>
                <p>Break-even: about 45 customers/day</p>
                <p>Upfront cash needed: £81,000</p>
                <p>Starting cash: £90,000</p>
                <p>Opening buffer: £9,000</p>
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              <p>
                The site may work month to month, but the rent burden is high and
                the opening buffer is thin. The file would push the user to
                renegotiate rent, verify footfall, confirm fit-out costs, and
                check lease risk clauses before committing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Trust and privacy"
          title="The public sample is fictional. Paid files are access-protected."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            'The public sample uses fictional and redacted inputs only.',
            'Paid customer files are unlocked securely with a private link and cookie.',
            'Report access is not public by ID alone.',
            'Users should not enter information they are not comfortable using for decision-support analysis.',
          ].map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 text-sm text-stone-700 leading-7 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Pressure-test a lease before you commit."
            title="Make the lease question easier to answer."
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/how-it-works"
              ctaLabel="Run a free commercial check"
              pageType="trust_page"
              className="bg-teal-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-teal-400 transition-colors text-sm text-center"
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link
              href="/sample-commercial-viability-file"
              className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
            >
              View sample file
            </Link>
            <Link
              href="/viability-file"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
            >
              Learn about the £49 file
            </Link>
            <Link
              href="/how-much-rent-can-a-cafe-afford"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
            >
              Cafe rent guide
            </Link>
          </div>
          <div className="mt-5 text-sm text-stone-300">
            <Link href="/commercial-lease-checklist-before-signing" className="text-teal-300 hover:text-teal-200 font-medium">
              Commercial lease checklist before signing
            </Link>
            {' '}
            <Link href="/restaurant-lease-viability-check" className="text-teal-300 hover:text-teal-200 font-medium ml-4">
              Restaurant lease viability check
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
