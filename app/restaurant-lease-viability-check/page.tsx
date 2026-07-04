import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'Restaurant Lease Viability Check',
  description:
    'Check whether a restaurant lease can carry the rent, break-even covers, average spend, staffing, upfront cash, downside trading, and lease risks before committing.',
  alternates: {
    canonical: 'https://yieldlens.co.uk/restaurant-lease-viability-check',
  },
  openGraph: {
    title: 'Restaurant Lease Viability Check',
    description:
      'Pressure-test whether a restaurant lease can carry the rent, covers, opening cash, staffing, and lease obligations before you commit.',
    url: 'https://yieldlens.co.uk/restaurant-lease-viability-check',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much rent can a restaurant afford?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YieldLens UK treats rent burden as monthly rent divided by expected monthly revenue. It uses 12% as a healthier screen and 18% as a caution threshold. Those are indicative screening thresholds, not universal rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I check before signing a restaurant lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check rent burden, break-even covers, staffing, rates, utilities, fit-out, opening cash, weaker trading, and lease terms such as service charge, repair obligations, break clauses, extraction, licensing, and planning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can YieldLens tell me whether to sign a restaurant lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. YieldLens UK provides indicative decision-support only. It helps structure the commercial numbers and questions before you commit, but it does not tell you to sign or not sign a lease.',
      },
    },
  ],
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
      name: 'Commercial rent affordability',
      item: 'https://yieldlens.co.uk/commercial-rent-affordability-calculator',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Restaurant lease viability check',
      item: 'https://yieldlens.co.uk/restaurant-lease-viability-check',
    },
  ],
};

const quickAnswerPoints = [
  'A restaurant lease looks more viable when rent is not taking too much expected revenue.',
  'Break-even covers should sit comfortably below realistic covers, not just below the best case.',
  'Staffing, rates, utilities, fit-out, opening cash, and lease terms can all change the result materially.',
  '12% rent burden is a healthier screen, 18% is a caution threshold, and above 18% needs stronger evidence or sharper lease terms.',
];

const restaurantOperatorChecks = [
  {
    title: 'Covers per service',
    text: 'Lunch and dinner demand can look healthy on paper but still fail if the number of covers per service does not justify the kitchen, front-of-house, and delivery overheads.',
  },
  {
    title: 'Gross margin mix',
    text: 'Wet-led and food-led trading behave differently. Drinks, desserts, lunch specials, and add-ons can change the margin picture more than rent alone.',
  },
  {
    title: 'Kitchen fit-out and extraction',
    text: 'A restaurant site can need more capital than the rent suggests once extraction, ventilation, gas, refrigeration, prep space, and back-of-house layout are included.',
  },
  {
    title: 'Licensing and planning',
    text: 'Alcohol, late hours, planning use, and any restrictions on the premises can change whether the concept is even workable at the intended trading pattern.',
  },
  {
    title: 'Utilities and food waste',
    text: 'Energy, water, and stock waste can move quickly in a restaurant, especially when the menu is broad or early trade is uneven.',
  },
  {
    title: 'Staff rota and daypart revenue',
    text: 'A site can need different staffing across lunch, dinner, and quieter shoulder hours, so the lease must work across the whole week, not only the busiest night.',
  },
];

const leaseTerms = [
  {
    title: 'Rent-free period',
    text: 'A rent-free period at the start of the lease gives the restaurant time to fit out and reach trading stability before the full rent obligation begins. Confirm the length, whether it applies to all lease costs, and whether the landlord can claw it back if the lease ends early.',
  },
  {
    title: 'Service charge',
    text: 'A variable service charge can drift above the figure used in the check. Ask for the last two or three years of actual service charge demands and confirm whether the lease includes a cap or a schedule of services the charge must cover.',
  },
  {
    title: 'Extraction and ventilation',
    text: 'Restaurant extraction is often the most expensive and restricted element of the fit-out. Confirm whether the building can support the extraction load the concept requires, and who is responsible for the cost and maintenance of any shared flue or roof-level equipment.',
  },
  {
    title: 'Permitted use',
    text: 'The permitted use clause defines what the site can be used for. A tightly worded clause can prevent menu changes, concept pivots, or subletting. Confirm the class and whether there is flexibility within it.',
  },
  {
    title: 'Repairing obligations',
    text: 'A full repairing and insuring lease passes the cost of repairs to the tenant. Confirm the current condition of the site, ask for a schedule of condition, and understand what repair obligations could arise during the lease term.',
  },
  {
    title: 'Break clause',
    text: 'A break clause gives the business the option to exit the lease early if the trading case does not improve. Confirm when the break falls, what conditions must be met to exercise it, and whether any rent-free or incentive terms are tied to not triggering it.',
  },
  {
    title: 'Rent review',
    text: 'Understand when the first review falls and what mechanism applies, for example open market, RPI, or fixed uplift. An upward-only open market review can significantly increase the rent burden beyond the numbers used in the check.',
  },
  {
    title: 'Lease length',
    text: 'A longer lease increases total exposure if the site underperforms. Weigh the length against the break clause position and any landlord incentives that are linked to accepting a longer term.',
  },
  {
    title: 'Assignment and subletting',
    text: 'Confirm whether the lease can be assigned or sublet if the business needs to exit before the break clause. Restrictions on assignment can make an underperforming site difficult to exit without landlord consent.',
  },
  {
    title: 'Handover condition',
    text: 'Agree in writing what condition the site will be handed over in, including any existing fit-out that remains, outstanding repairs, and whether a schedule of condition will be prepared before the lease starts.',
  },
  {
    title: 'Personal guarantee',
    text: 'A personal guarantee makes the individual tenant personally liable for rent obligations if the business fails. Confirm whether the landlord requires one, whether it can be capped in time or amount, and what the implications are if the business structure changes.',
  },
];

const commonMistakes = [
  'Judging the site by rent alone',
  'Forgetting fit-out and equipment',
  'Underestimating staffing',
  'Ignoring business rates',
  'Not checking service charge',
  'Assuming every day trades like the best day',
  'Ignoring lunch and dinner split',
  'Not checking extraction, licensing, or planning',
  'Ignoring repairing obligations',
  'Not modelling downside revenue',
];

const relatedPages = [
  {
    title: 'How much rent can a cafe afford',
    href: '/how-much-rent-can-a-cafe-afford',
    text: 'Use the cafe page when daytime trade, covers, and staffing shape the question.',
  },
  {
    title: 'How much rent can a shop afford',
    href: '/how-much-rent-can-a-shop-afford',
    text: 'Use the shop page when footfall, stock turnover, and retail margin drive the decision.',
  },
  {
    title: 'Salon lease viability check',
    href: '/salon-lease-viability-check',
    text: 'Use the salon page when treatment rooms, chair capacity, or chair-rent assumptions matter.',
  },
  {
    title: 'How much rent can a takeaway afford',
    href: '/how-much-rent-can-a-takeaway-afford',
    text: 'Use the takeaway page when delivery demand and extraction matter more than covers.',
  },
  {
    title: 'Commercial lease checklist before signing',
    href: '/commercial-lease-checklist-before-signing',
    text: 'Use the checklist to review rent, cash, and lease terms before you commit.',
  },
  {
    title: 'Commercial lease viability check',
    href: '/commercial-lease-viability-check',
    text: 'Read the core commercial lease pressure-test before you run the check.',
  },
];

const exampleSummary = [
  { label: 'Business type', value: 'Restaurant' },
  { label: 'Address', value: 'Redacted city centre site' },
  { label: 'Postcode', value: 'SW1 sample' },
  { label: 'Annual rent', value: '£96,000' },
  { label: 'Monthly rent', value: '£8,000' },
  { label: 'Expected covers/day', value: '100' },
  { label: 'Average spend', value: '£28' },
  { label: 'Opening days/month', value: '26' },
  { label: 'Monthly revenue', value: '£72,800' },
  { label: 'Rent burden', value: 'about 11.0%' },
  { label: 'Known monthly cost base', value: '£48,000' },
  { label: 'Break-even covers/day', value: 'about 66' },
  { label: 'Upfront cash needed', value: '£195,000' },
  { label: 'Starting cash', value: '£220,000' },
  { label: 'Opening buffer', value: '£25,000' },
  { label: 'Downside monthly position', value: '£4,320 burn' },
  { label: 'Indicative runway', value: 'about 5.8 months' },
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
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">{title}</h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
    </div>
  );
}

export default function RestaurantLeaseViabilityPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <JsonLd data={faqStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/restaurant-lease-viability-check"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Restaurant lease viability page viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Restaurant lease viability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Check whether a restaurant lease can carry the numbers.
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                A restaurant lease is not only a rent decision. You need to
                pressure-test rent burden, daily covers, average spend, staffing,
                rates, fit-out, opening cash, weaker trading, and lease terms
                before committing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/restaurant-lease-viability-check"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className="bg-[var(--yieldlens-primary)] text-stone-950 px-6 py-3 rounded font-semibold hover:bg-[var(--yieldlens-primary-hover)] transition-colors text-sm text-center"
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link
                  href="/sample-commercial-viability-file"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View sample viability file
                </Link>
              </div>
              <p className="text-xs text-stone-400 mt-5">
                YieldLens UK provides indicative decision-support only. It is not
                a valuation, financial advice, mortgage advice, legal advice,
                tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                Quick answer
              </p>
              <p className="text-sm text-stone-300 leading-7 mb-4">
                A restaurant lease is more viable when rent, fit-out, staffing, service charge, business rates, and downside trading still leave enough room after opening. The real question is whether the concept can carry the site in normal and weaker trading scenarios.
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
          eyebrow="Why restaurants need a separate pressure-test"
          title="Restaurants can be more exposed than simple retail or cafe assumptions."
          description="The cost structure is often heavier, the opening process is more complex, and the downside case can move quickly if the trading pattern is weaker than expected."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Fit-out intensity',
            'Kitchen equipment',
            'Staffing',
            'Prep and service complexity',
            'Licensing and planning',
            'Utility costs',
            'Stock and waste',
            'Variable trading by daypart',
            'Service charge and repairs',
            'Long lead time before opening',
          ].map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-16">
        <SectionTitle
          eyebrow="The key checks"
          title="Restaurant rent has to survive more than a single busy service."
          description="These are the checks that matter before the rent number becomes a commitment."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurantOperatorChecks.map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="font-semibold text-stone-900 mb-2">{item.title}</p>
              <p className="text-sm text-stone-600 leading-6">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Core formula"
            title="Rent burden is monthly rent divided by expected monthly revenue."
            description="For a restaurant, covers/day can be treated as customers/day for the commercial check."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm font-semibold text-stone-900 mb-3">Worked example</p>
              <div className="space-y-3 text-sm text-stone-700 leading-7">
                <p>Annual rent: £96,000</p>
                <p>Monthly rent: £8,000</p>
                <p>Expected covers/day: 100</p>
                <p>Average spend: £28</p>
                <p>Opening days/month: 26</p>
                <p>Expected monthly revenue: £72,800</p>
                <p>Rent burden: about 11.0%</p>
              </div>
              <div className="mt-4">
                <Link href="/commercial-rent-burden-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)] text-sm">
                  Commercial rent burden calculator
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Interpretation</p>
              <p className="text-sm text-stone-700 leading-7">
                This rent burden is healthier on paper than a high-burden site,
                but the rest of the cost base, fit-out, and downside trading
                still need checking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Break-even covers"
          title="Convert fixed monthly costs into a daily covers target."
          description="Affordability becomes clearer when the known cost base becomes a break-even number the trading plan has to beat."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold text-stone-900 mb-3">Break-even example</p>
            <p className="text-sm text-stone-700 leading-7">
              If the known monthly cost base is £48,000 and average spend is £28
              across 26 opening days, break-even is about 66 covers/day.
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">What it means</p>
            <p className="text-sm text-stone-700 leading-7">
              If expected covers/day is 100, there is headroom on paper, but the
              100-cover assumption needs evidence by daypart, weekpart,
              competitor observation, and capacity.
            </p>
            <div className="mt-4">
              <Link href="/break-even-customers-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)] text-sm">
                Break-even customers calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Upfront cash and fit-out"
            title="Restaurants can fail before opening if the launch costs absorb too much cash."
            description="Fit-out, equipment, deposit, legal fees, licensing, stock, and launch costs can overwhelm the opening budget."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 leading-7">
                <p>Fit-out and equipment: £140,000</p>
                <p>Rent deposit: £24,000</p>
                <p>Legal/professional fees: £6,000</p>
                <p>Opening stock: £15,000</p>
                <p>Other setup costs: £10,000</p>
                <p>Starting cash: £220,000</p>
                <p>Upfront cash needed: £195,000</p>
                <p>Opening buffer: £25,000</p>
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Why it matters</p>
              <p className="text-sm text-stone-700 leading-7">
                The opening buffer is positive, but it may still be thin relative
                to restaurant fit-out overruns and early trading friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Downside trading"
          title="Test the lease against weaker revenue, not only the expected case."
          description="Restaurants should be checked against a weaker trading scenario so you can see whether the opening buffer is enough."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <div className="space-y-3 text-sm text-stone-700 leading-7">
              <p>Base monthly revenue: £72,800</p>
              <p>60% downside revenue: £43,680</p>
              <p>Known monthly cost base: £48,000</p>
              <p>Downside monthly position: £4,320 burn</p>
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">Interpretation</p>
            <p className="text-sm text-stone-700 leading-7">
              In this downside case, the site burns cash. With a £25,000 opening
              buffer, that gives about 5.8 months before the buffer is exhausted,
              before allowing for other shocks.
            </p>
            <div className="mt-4">
              <Link href="/commercial-lease-survival-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)] text-sm">
                Commercial lease survival calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Restaurant lease terms that matter"
            title="Use the lease questions before the rent number becomes a commitment."
            description="Ask a solicitor to review the lease wording before committing."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {leaseTerms.map((item) => (
              <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="text-sm text-stone-700 leading-7 mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Worked restaurant example"
          title="Redacted restaurant site"
          description="This example is fictional and redacted. It shows the shape of the restaurant affordability question without exposing a real tenant or address."
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
              The rent burden is not the main problem in this example. The bigger
              issue is downside trading and the size of the opening cash buffer
              relative to restaurant setup risk. The site needs evidence for
              covers, average spend, staffing costs, fit-out costs, and lease
              clauses before committing.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Common restaurant lease mistakes"
          title="The lease question often goes wrong for predictable reasons."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonMistakes.map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="How YieldLens helps"
            title="Turn the restaurant lease into numbers you can challenge."
            description="The free commercial check can be used for restaurants by treating covers/day as customers/day and average spend as spend per cover."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Free check outputs</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 leading-7">
                {[
                  'Rent burden',
                  'Break-even covers/day',
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
                  'Ranked actions before committing',
                  'Final view',
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-stone-200 bg-white p-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <Link href="/commercial-lease-viability-check" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Commercial lease viability check
            </Link>
            <Link href="/commercial-lease-checklist-before-signing" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Commercial lease checklist before signing
            </Link>
            <Link href="/salon-lease-viability-check" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Salon lease viability check
            </Link>
            <Link href="/how-it-works" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              See how YieldLens works
            </Link>
            <Link href="/sample-commercial-viability-file" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Sample viability file
            </Link>
            <Link href="/viability-file" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Viability file
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Business-type rent checks"
          title="Use the page that matches the site type."
          description="Restaurant decisions usually sit alongside the other business-type affordability checks."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            {
              title: 'How much rent can a cafe afford',
              href: '/how-much-rent-can-a-cafe-afford',
            },
            {
              title: 'How much rent can a shop afford',
              href: '/how-much-rent-can-a-shop-afford',
            },
            {
              title: 'How much rent can a takeaway afford',
              href: '/how-much-rent-can-a-takeaway-afford',
            },
            {
              title: 'Salon lease viability check',
              href: '/salon-lease-viability-check',
            },
            {
              title: 'How much rent can a barber shop afford',
              href: '/how-much-rent-can-a-barber-shop-afford',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 transition-colors"
            >
              <p className="text-sm font-semibold text-stone-900">{item.title}</p>
            </Link>
          ))}
        </div>
        <SectionTitle
          eyebrow="Related pages"
          title="Use the restaurant page alongside the other commercial guides."
          description="These pages keep the same pressure-test framing but focus on different site types."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedPages.map((item) => (
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

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Restaurant lease viability questions"
            description="Short answers for people deciding whether a restaurant site deserves a deeper look."
          />
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                q: 'How much rent can a restaurant afford?',
                a: 'There is no universal number. YieldLens uses rent burden as a screen, with 12% as a healthier threshold and 18% as a caution threshold. Those are indicative screening thresholds, not universal rules.',
              },
              {
                q: 'What is a good rent burden for a restaurant?',
                a: 'Lower is generally easier to carry. YieldLens treats around 12% as healthier and around 18% as a caution threshold. The right level still depends on the rest of the cost base and opening cash.',
              },
              {
                q: 'How do I calculate restaurant break-even covers?',
                a: 'Add the known monthly cost base, then divide it by average spend and opening days to get a daily covers target. The commercial check helps turn that into a practical figure.',
              },
              {
                q: 'Should I include fit-out before judging a restaurant lease?',
                a: 'Yes. Fit-out, equipment, deposits, fees, and stock can determine whether the site survives the opening phase.',
              },
              {
                q: 'What lease clauses matter most for restaurants?',
                a: 'Service charge, repairing obligations, rent review, break clauses, extraction, licensing, planning, and permitted use usually deserve close attention.',
              },
              {
                q: 'Can YieldLens tell me whether to sign a restaurant lease?',
                a: 'No. YieldLens UK provides indicative decision-support only. It helps structure the commercial numbers and questions before you commit, but it does not tell you to sign or not sign.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.q}</p>
                <p className="text-sm text-stone-700 leading-7 mt-3">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Pressure-test the restaurant lease before you commit."
          title="Start with the free check, then review the sample and methodology."
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <TrackedCtaLink
            href="/check?mode=commercial"
            eventName="commercial_home_cta_clicked"
            pagePath="/restaurant-lease-viability-check"
            ctaLabel="Run a free restaurant lease check"
            pageType="seo_page"
            className="bg-[var(--yieldlens-primary)] text-stone-950 px-6 py-3 rounded font-semibold hover:bg-[var(--yieldlens-primary-hover)] transition-colors text-sm text-center"
          >
            Run a free restaurant lease check
          </TrackedCtaLink>
          <Link
            href="/sample-commercial-viability-file"
            className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
          >
            View sample viability file
          </Link>
          <Link
            href="/how-it-works"
            className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
          >
            How it works
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/commercial-lease-checklist-before-signing" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Commercial lease checklist before signing
          </Link>
          <Link href="/commercial-rent-burden-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Commercial rent burden calculator
          </Link>
          <Link href="/break-even-customers-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Break-even customers calculator
          </Link>
          <Link href="/commercial-lease-survival-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Commercial lease survival calculator
          </Link>
          <Link href="/viability-file" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Viability file
          </Link>
        </div>
      </section>
    </div>
  );
}
