import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'How Much Rent Can a Cafe Afford? | YieldLens UK',
  description:
    'Work out whether a cafe rent is affordable by checking rent burden, break-even customers, average spend, upfront cash, downside trading, and lease risk before signing.',
  alternates: {
    canonical: 'https://yieldlens.co.uk/how-much-rent-can-a-cafe-afford',
  },
  openGraph: {
    title: 'How Much Rent Can a Cafe Afford? | YieldLens UK',
    description:
      'Pressure-test whether a cafe lease can carry the rent before signing by checking rent burden, customers, cash, downside trading, and lease risk.',
    url: 'https://yieldlens.co.uk/how-much-rent-can-a-cafe-afford',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What percentage of revenue should cafe rent be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YieldLens UK uses 12% rent burden as a healthier screening target and 18% as a caution threshold. These are indicative screening thresholds, not universal rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate cafe rent affordability?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide monthly rent by expected monthly revenue to get rent burden. Then compare that result with the customers, average spend, opening days, staffing, rates, utilities, and opening costs that support the lease.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can YieldLens tell me whether to sign a lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. YieldLens UK provides indicative decision-support only. It helps structure the numbers and questions before committing, but it does not tell someone to sign or not sign a lease.',
      },
    },
  ],
};

const quickAnswerPoints = [
  'A cafe usually carries rent only if the rent leaves enough room for staff, business rates, utilities, stock, fit-out, opening costs, and quieter trading periods.',
  '12% rent burden is a healthier screen, 18% is a caution threshold, and anything above that needs stronger trading evidence or better lease terms.',
  'These are YieldLens screening thresholds, not universal industry rules.',
];

const leaseTerms = [
  'Rent-free period',
  'Rent review',
  'Break clause',
  'Service charge',
  'Repairing obligations',
  'Deposit terms',
  'Permitted use',
  'Handover condition',
  'Landlord fit-out contribution',
];

const commonMistakes = [
  'Judging rent without revenue',
  'Ignoring business rates',
  'Underestimating fit-out',
  'Forgetting deposit and legal fees',
  'Assuming every day trades like a good day',
  'Not checking downside revenue',
  'Treating footfall as certain',
  'Ignoring service charge and repairing obligations',
];

const checklist = [
  'Count footfall manually',
  'Observe competitors',
  'Validate average spend',
  'Confirm rates and utilities',
  'Get fit-out quotes',
  'Check service charge',
  'Check break clause',
  'Check repairing obligations',
  'Ask about rent-free period',
  'Retest the numbers after revised terms',
];

const relatedTools = [
  {
    title: 'Commercial lease checklist',
    href: '/commercial-lease-checklist-before-signing',
    text: 'Check the lease items before you commit.',
  },
  {
    title: 'Restaurant lease viability',
    href: '/restaurant-lease-viability-check',
    text: 'Use the restaurant page for a fuller dining concept pressure-test.',
  },
  {
    title: 'Salon lease viability',
    href: '/salon-lease-viability-check',
    text: 'Use the salon page when chair capacity and treatment demand drive the decision.',
  },
  {
    title: 'Commercial lease viability',
    href: '/commercial-lease-viability-check',
    text: 'Read the core commercial lease pressure-test before running the check.',
  },
  {
    title: 'Commercial rent burden calculator',
    href: '/commercial-rent-burden-calculator',
    text: 'See how monthly rent compares with expected revenue.',
  },
  {
    title: 'Break-even customers calculator',
    href: '/break-even-customers-calculator',
    text: 'Convert rent and costs into a daily customer target.',
  },
  {
    title: 'Commercial lease survival calculator',
    href: '/commercial-lease-survival-calculator',
    text: 'Check whether the site can survive weaker trading and opening pressure.',
  },
  {
    title: 'How it works',
    href: '/how-it-works',
    text: 'Learn how the free check, paid file, and sample report fit together.',
  },
  {
    title: 'Sample commercial viability file',
    href: '/sample-commercial-viability-file',
    text: 'See the kind of output the £49 paid file produces.',
  },
  {
    title: 'Viability file',
    href: '/viability-file',
    text: 'Read what the paid Standard commercial viability file includes.',
  },
];

const exampleSummary = [
  { label: 'Business type', value: 'Cafe' },
  { label: 'Address', value: 'Redacted high street site' },
  { label: 'Postcode', value: 'NW6 sample' },
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected customers/day', value: '80' },
  { label: 'Average spend', value: '£12' },
  { label: 'Opening days/month', value: '26' },
  { label: 'Monthly revenue', value: '£24,960' },
  { label: 'Monthly cost base', value: '£14,100' },
  { label: 'Rent burden', value: '20%' },
  { label: 'Break-even customers/day', value: '45.2' },
  { label: 'Upfront cash needed', value: '£81,000' },
  { label: 'Starting cash', value: '£90,000' },
  { label: 'Opening buffer', value: '£9,000' },
  { label: 'Downside monthly position', value: '£876 surplus' },
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

export default function CafeRentAffordabilityPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <JsonLd data={faqStructuredData} />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
                Cafe rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                How much rent can a cafe afford?
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                A cafe lease is not just about whether you can pay the monthly
                rent. You need to check rent burden, daily customers, average
                spend, staffing, rates, opening costs, downside trading, and
                lease terms before committing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-much-rent-can-a-cafe-afford"
                  ctaLabel="Run a free cafe rent check"
                  pageType="seo_page"
                  className="bg-teal-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-teal-400 transition-colors text-sm text-center"
                >
                  Run a free cafe rent check
                </TrackedCtaLink>
                <Link
                  href="/sample-commercial-viability-file"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View sample viability file
                </Link>
              </div>
              <p className="text-xs text-stone-400 mt-5">
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-3">
                Quick answer
              </p>
              <div className="space-y-3 text-sm text-stone-300 leading-7">
                {quickAnswerPoints.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Core formula"
          title="Rent burden is rent as a share of expected monthly revenue."
          description="That makes the rent question easier to judge because it compares the lease with the income the site is expected to generate."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-4">Worked example</p>
            <div className="space-y-3 text-sm text-stone-700 leading-7">
              <p>Annual rent: £60,000</p>
              <p>Monthly rent: £5,000</p>
              <p>Expected customers/day: 80</p>
              <p>Average spend: £12</p>
              <p>Opening days/month: 26</p>
              <p>Expected monthly revenue: £24,960</p>
              <p>Rent burden: about 20%</p>
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold text-stone-900 mb-4">Interpretation</p>
            <p className="text-sm text-stone-700 leading-7">
              Twenty percent means the rent takes a high share of expected
              revenue. The site might still work, but it needs stronger confidence
              in footfall, average spend, and lease terms.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Healthier', value: '12%' },
                { label: 'Caution', value: '18%' },
                { label: 'High pressure', value: 'Above 18%' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-stone-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
                  <p className="text-lg font-bold text-stone-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Break-even customers"
            title="Convert the rent problem into a customer problem."
            description="Rent affordability is easier to understand when the monthly cost base becomes a daily customer target."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm font-semibold text-stone-900 mb-3">Break-even example</p>
              <p className="text-sm text-stone-700 leading-7">
                If the known monthly cost base is £14,100 and average spend is
                £12 across 26 opening days, break-even is about 45 customers/day.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">What it means</p>
              <p className="text-sm text-stone-700 leading-7">
                If expected customers/day is 80, the site has headroom on paper,
                but the 80/day assumption needs evidence. Rent can look affordable
                only if trading is real, not just optimistic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Upfront cash matters"
          title="A cafe can fail on opening cash even if the monthly rent looks manageable."
          description="Fit-out, deposit, legal fees, opening stock, launch costs, and starting cash all matter because they can drain cash before the site starts trading."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 leading-7">
              <p>Fit-out: £50,000</p>
              <p>Rent deposit: £15,000</p>
              <p>Legal fees: £3,000</p>
              <p>Opening stock: £8,000</p>
              <p>Other setup costs: £5,000</p>
              <p>Starting cash: £90,000</p>
              <p>Upfront cash needed: £81,000</p>
              <p>Opening buffer: £9,000</p>
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold text-stone-900 mb-3">Why it matters</p>
            <p className="text-sm text-stone-700 leading-7">
              A £9,000 buffer is thin if fit-out overruns, trading starts slowly,
              or lease costs are higher than expected. The monthly rent may be
              manageable, but the opening cash stack still needs room to breathe.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Downside trading"
            title="Check whether the site still covers known costs when revenue is weaker."
            description="A cafe should be checked against weaker trading, not only the base case."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <div className="space-y-3 text-sm text-stone-700 leading-7">
                <p>Base monthly revenue: £24,960</p>
                <p>60% downside revenue: £14,976</p>
                <p>Known cost base: £14,100</p>
                <p>Downside monthly position: £876 surplus</p>
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Interpretation</p>
              <p className="text-sm text-stone-700 leading-7">
                The downside month still covers known costs, but the opening buffer
                can still be the main risk. That is why cafe rent affordability
                needs both trading and opening-cost checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Lease terms that affect affordability"
          title="Headline rent is only one part of the lease."
          description="At higher rent burden, service charge caps and rent review terms matter more because extra costs quickly narrow the margin."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaseTerms.map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Worked example"
            title="Redacted cafe site"
            description="This example is fictional and redacted. It shows the shape of the affordability question without exposing a real tenant or address."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 leading-7">
                {exampleSummary.map((item) => (
                  <div key={item.label} className="rounded-lg border border-stone-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
                    <p className="text-sm font-semibold text-stone-900 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Verdict</p>
              <p className="text-sm text-stone-700 leading-7">
                This site is not automatically unworkable, but the rent burden is
                high and the opening buffer is thin. It needs footfall evidence,
                confirmed fit-out costs, and sharper lease terms before the
                numbers feel comfortable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Common mistakes"
          title="The rent question often goes wrong for predictable reasons."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commonMistakes.map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 text-sm text-stone-700 leading-7 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What to check before signing"
            title="Pressure-test the numbers before the lease becomes a commitment."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {checklist.map((item) => (
              <div key={item} className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-700 leading-7">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Related tools"
          title="Use the cafe guide alongside the other commercial pages."
          description="These pages keep the same pressure-test framing but break the problem into simpler parts."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 transition-colors"
            >
              <p className="text-sm font-semibold text-stone-900">{item.title}</p>
              <p className="text-sm text-stone-700 leading-7 mt-2">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="How YieldLens helps"
          title="Turn a cafe lease into numbers you can challenge."
          description="The free commercial check produces the key metrics. The £49 file adds deeper analysis and action items."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">Free check outputs</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 leading-7">
              {[
                'Rent burden',
                'Break-even customers/day',
                'Upfront cash needed',
                'Cash after opening',
                'Downside monthly position',
                'Six-month survival test',
                'Risk flags',
              ].map((item) => (
                <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold text-stone-900 mb-3">£49 file adds</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 leading-7">
              {[
                'Stress-test scenarios',
                'Negotiation levers',
                'Evidence needed',
                'Lease questions',
                'Due diligence checklist',
                'Ranked actions',
                'Final view',
              ].map((item) => (
                <div key={item} className="rounded-lg border border-stone-200 bg-white p-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <TrackedCtaLink
            href="/check?mode=commercial"
            eventName="commercial_home_cta_clicked"
            pagePath="/how-much-rent-can-a-cafe-afford"
            ctaLabel="Run a free cafe rent check"
            pageType="seo_page"
            className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm text-center"
          >
            Run a free cafe rent check
          </TrackedCtaLink>
          <Link
            href="/sample-commercial-viability-file"
            className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
          >
            View sample file
          </Link>
          <Link
            href="/how-it-works"
            className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
          >
            See how YieldLens works
          </Link>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related tools"
            title="Use the cafe guide alongside the other commercial pages."
            description="These pages keep the same pressure-test framing but break the problem into simpler parts."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm hover:border-stone-300 transition-colors"
              >
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="text-sm text-stone-700 leading-7 mt-2">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Common questions about cafe rent affordability."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                q: 'What percentage of revenue should cafe rent be?',
                a: 'YieldLens UK uses 12% rent burden as a healthier screen and 18% as a caution threshold. These are indicative screening thresholds, not universal rules.',
              },
              {
                q: 'How do I calculate cafe rent affordability?',
                a: 'Divide monthly rent by expected monthly revenue to get rent burden, then compare the result with trading evidence, opening cash, and lease terms.',
              },
              {
                q: 'How many customers does a cafe need to cover rent?',
                a: 'That depends on the rent, the monthly cost base, the average spend, and the number of opening days. Convert the lease into a break-even customers/day figure to see what the site needs.',
              },
              {
                q: 'Is annual rent enough to judge a cafe lease?',
                a: 'No. Annual rent is only one part of the risk. You also need fit-out, deposit, legal fees, staffing, rates, utilities, downside trading, and lease terms.',
              },
              {
                q: 'What costs should I include before signing a cafe lease?',
                a: 'Include staffing, rates, utilities, stock, fit-out, deposit, legal fees, launch costs, and starting cash so the opening position is not underestimated.',
              },
              {
                q: 'Can YieldLens tell me whether to sign a lease?',
                a: 'No. YieldLens UK provides indicative decision-support only. It helps structure the numbers and questions before committing, but it does not tell you whether to sign.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.q}</p>
                <p className="text-sm text-stone-700 leading-7 mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Pressure-test the cafe rent before you commit."
            title="Start with the free check, then explore the sample and methodology."
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/how-much-rent-can-a-cafe-afford"
              ctaLabel="Run a free cafe rent check"
              pageType="seo_page"
              className="bg-teal-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-teal-400 transition-colors text-sm text-center"
            >
              Run a free cafe rent check
            </TrackedCtaLink>
            <Link
              href="/sample-commercial-viability-file"
              className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
            >
              View sample viability file
            </Link>
            <Link
              href="/how-it-works"
              className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
