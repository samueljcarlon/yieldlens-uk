import type { Metadata } from 'next';
import Link from 'next/link';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import RentBurdenGauge from '@/components/visuals/RentBurdenGauge';
import BreakEvenComparison from '@/components/visuals/BreakEvenComparison';
import OpeningCashWaterfall from '@/components/visuals/OpeningCashWaterfall';
import DownsideSurvivalCard from '@/components/visuals/DownsideSurvivalCard';
import { disclaimerClass, heroSecondaryCtaClass, primaryCtaClass, surfaceCardClass, surfaceCardSoftClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Sample Commercial Viability File | YieldLens UK',
  description:
    'View a sample YieldLens UK Standard commercial viability file for pressure-testing rent burden, break-even customers, upfront cash, downside trading, and lease questions before signing a commercial lease.',
  alternates: {
    canonical: '/sample-commercial-viability-file',
  },
  openGraph: {
    title: 'Sample Commercial Viability File | YieldLens UK',
    description:
      'See what the £49 Standard commercial viability file looks like using a redacted sample case before running a free commercial check.',
    url: 'https://yieldlens.co.uk/sample-commercial-viability-file',
  },
};

const sampleSummary = [
  {
    label: 'Verdict',
    value: 'Fragile',
    helper:
      'The downside month covers operating costs, but upfront cash is the real issue.',
    tone: 'bg-orange-50 border-orange-200 text-orange-950',
  },
  {
    label: 'Score',
    value: '49/100',
    helper: 'The site needs caution because the opening capital stack is weak.',
    tone: 'bg-white border-stone-200 text-stone-950',
  },
  {
    label: 'Opening shortfall',
    value: '£36,000',
    helper: 'Upfront cash needed is higher than starting cash before trading begins.',
    tone: 'bg-rose-50 border-rose-200 text-rose-950',
  },
  {
    label: 'Rent burden',
    value: '20.0%',
    helper: 'Rent takes a high share of expected monthly revenue.',
    tone: 'bg-white border-stone-200 text-stone-950',
  },
];

const siteSnapshot = [
  { label: 'Business type', value: 'Cafe' },
  { label: 'Address', value: 'Redacted high street site' },
  { label: 'Postcode', value: 'NW6 sample' },
  { label: 'Reference', value: 'SAMPLE-FILE' },
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Average spend', value: '£12' },
  { label: 'Expected customers/day', value: '80' },
  { label: 'Opening days/month', value: '26' },
  { label: 'Email', value: 'Redacted' },
];

const keyMetrics = [
  { label: 'Monthly revenue', value: '£24,960' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Rent burden', value: '20%' },
  { label: 'Monthly cost base', value: '£14,100' },
  { label: 'Break-even customers/day', value: '45.2' },
  { label: 'Expected customers/day', value: '80' },
];

const upfrontCash = [
  { label: 'Fit-out budget', value: '£50,000' },
  { label: 'Rent deposit', value: '£15,000' },
  { label: 'Legal fees', value: '£3,000' },
  { label: 'Opening stock', value: '£8,000' },
  { label: 'Other setup costs', value: '£50,000' },
  { label: 'Starting cash', value: '£90,000' },
  { label: 'Upfront cash needed', value: '£126,000' },
  { label: 'Cash after opening', value: '-£36,000' },
  { label: 'Downside revenue case', value: '60%' },
  { label: 'Downside monthly revenue', value: '£14,976' },
  { label: 'Downside monthly position', value: '£876' },
  { label: 'Monthly burn in downside', value: '£0' },
  { label: 'Six-month survival test', value: 'Fail' },
];

const improvementPoints = [
  'Increase starting cash so the opening capital stack can absorb fit-out and setup costs.',
  'Reduce fit-out, deposit, or other setup costs so less cash leaves the business before trading begins.',
  'Seek a landlord contribution or rent-free period to improve the opening position.',
  'Renegotiate deposit terms if the current structure is too aggressive for the business.',
  'Push rent closer to a healthier burden level, with 18% as the caution threshold and 12% as a better target.',
  'Increase expected customers per day or average spend if there is evidence the site can support it.',
];

const stressScenarios = [
  {
    label: 'Base case',
    revenue: '£24,960',
    position: '£10,860 surplus',
    breakEven: '45.2',
    interpretation: 'Current assumptions are workable month to month, but the opening shortfall remains the main issue.',
  },
  {
    label: 'Revenue down 20%',
    revenue: '£19,968',
    position: '£5,868 surplus',
    breakEven: '56.5',
    interpretation: 'Trading is weaker, but the site still covers the cost base on these inputs.',
  },
  {
    label: 'Revenue down 40%',
    revenue: '£14,976',
    position: '£876 surplus',
    breakEven: '75.4',
    interpretation: 'The downside case still covers operating costs, which is why the opening capital stack matters more than monthly burn.',
  },
  {
    label: 'Costs up 15%',
    revenue: '£24,960',
    position: '£8,745 surplus',
    breakEven: '52.1',
    interpretation: 'Higher costs narrow the margin and make trading assumptions more fragile.',
  },
  {
    label: 'Rent reduced 10%',
    revenue: '£24,960',
    position: '£11,360 surplus',
    breakEven: '43.3',
    interpretation: 'A lower rent improves the operating margin and eases break-even pressure.',
  },
];

const negotiationLevers = [
  {
    title: 'Lower headline rent',
    text: 'A lower rent reduces the monthly burden and improves the room available for staff, rates, stock, and quieter trading.',
  },
  {
    title: 'Rent-free period',
    text: 'A rent-free start gives the business breathing room while the site is being fitted out and early trading stabilises.',
  },
  {
    title: 'Landlord fit-out contribution',
    text: 'A contribution reduces the amount of cash that leaves the business before trading begins.',
  },
  {
    title: 'Reduced deposit',
    text: 'A smaller deposit keeps more cash in the business for opening stock and launch working capital.',
  },
  {
    title: 'Break clause',
    text: 'A break clause lowers the downside if the trading case fails to improve after launch.',
  },
  {
    title: 'Service charge cap',
    text: 'A cap helps stop shared costs from drifting beyond the numbers used in the initial check.',
  },
  {
    title: 'Repairing obligations',
    text: 'Clear repair terms reduce the risk of hidden costs after the lease is signed.',
  },
  {
    title: 'Permitted use flexibility',
    text: 'Flexible permitted use helps the business adapt if the original concept needs to change.',
  },
];

const evidenceSections = [
  {
    title: 'Trading evidence',
    items: ['Footfall counts', 'Competitor observations', 'Average spend validation', 'Opening-hours assumption', 'Local demand'],
  },
  {
    title: 'Cost evidence',
    items: ['Business rates bill or estimate', 'Utility estimate', 'Insurance', 'Service charge', 'Fit-out quotes', 'Legal fees'],
  },
  {
    title: 'Lease/legal evidence',
    items: ['Rent review', 'Break clause', 'Repairing obligations', 'Assignment and subletting', 'Planning and licensing', 'Handover condition'],
  },
];

const decisionMatrix = [
  {
    area: 'Rent burden',
    current: '20.0% of expected revenue',
    improve: 'Move closer to 12% if possible, or at least reduce pressure below the caution threshold.',
    priority: 'High',
  },
  {
    area: 'Customer assumptions',
    current: '45.2 break-even/day vs 80 expected',
    improve: 'Keep expected footfall and spend supported by evidence rather than optimism.',
    priority: 'Medium',
  },
  {
    area: 'Upfront cash',
    current: '£36,000 opening shortfall',
    improve: 'Raise starting cash, lower setup costs, or negotiate landlord support.',
    priority: 'High',
  },
  {
    area: 'Downside survival',
    current: 'No monthly burn in downside case, but opening cash fails',
    improve: 'Fix the opening capital stack before focusing on operating burn.',
    priority: 'High',
  },
  {
    area: 'Lease terms',
    current: 'Still worth checking carefully',
    improve: 'Improve rent, deposit, break clause, service charge, and permitted use terms.',
    priority: 'Medium',
  },
  {
    area: 'Missing evidence',
    current: 'Some assumptions are still redacted',
    improve: 'Gather trading, cost, and lease evidence before signing.',
    priority: 'Medium',
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
    <div className="mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
        {title}
      </h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
    </div>
  );
}

export default function SampleCommercialViabilityFilePage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/sample-commercial-viability-file"
        pageType="sample_file"
        mode="commercial"
        eventLabel="Sample commercial viability file viewed"
      />
      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
                Sample paid file
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Sample Standard commercial viability file
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                See the kind of analysis included in the £49 paid file after a free commercial check.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/sample-commercial-viability-file"
                  ctaLabel="Start free commercial check"
                  pageType="sample_file"
                  className={primaryCtaClass}
                >
                  Start free commercial check
                </TrackedCtaLink>
                <Link
                  href="/viability-file"
                  className={heroSecondaryCtaClass}
                >
                  View paid file details
                </Link>
                <Link
                  href="/how-it-works"
                  className={heroSecondaryCtaClass}
                >
                  How it works
                </Link>
              </div>
            </div>
            <div className={`${surfaceCardClass} bg-white p-5 sm:p-6 text-stone-900 shadow-[0_24px_64px_rgba(15,23,42,0.18)]`}>
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-teal-700 font-semibold mb-1">
                    Sample report cover
                  </p>
                  <p className="text-2xl font-bold text-stone-950">Fragile</p>
                  <p className="text-sm text-stone-500 mt-1">
                    Reference SAMPLE-FILE · Sample date
                  </p>
                </div>
                <div className="rounded-3xl border border-orange-200 bg-orange-50 px-3 py-2 text-right text-orange-950">
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold">Score</p>
                  <p className="text-3xl font-bold tabular-nums">49</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sampleSummary.map((item) => (
                  <div key={item.label} className={`${surfaceCardSoftClass} p-4 ${item.tone}`}>
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-xs leading-5 mt-2 opacity-80">{item.helper}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`${surfaceCardClass} mt-6 bg-white/5 p-4 text-sm text-stone-300 leading-7`}>
            This is a sample decision-support file using fictional and redacted inputs. YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Executive summary"
          title="A fragile site that fails the opening capital test."
          description="The downside month still covers operating costs, but the site does not have enough cash after opening to absorb the fit-out and setup burden."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleSummary.map((item) => (
            <div key={item.label} className="bg-white border rounded-3xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
              <p className="text-2xl font-bold mt-2 text-stone-900">{item.value}</p>
              <p className="text-sm text-stone-600 leading-6 mt-2">{item.helper}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Decision-support visuals"
            title="The fast read before the written detail."
            description="The sample mirrors the paid file’s visual language: rent burden, break-even gap, opening capital stack, and downside survival."
          />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="rounded-3xl border border-stone-200 bg-white shadow-sm p-1">
              <RentBurdenGauge rentBurdenPercentage={20} />
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white shadow-sm p-1">
              <BreakEvenComparison breakEvenCustomersPerDay={45.2} expectedCustomersPerDay={80} />
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white shadow-sm p-1">
              <OpeningCashWaterfall
                startingCash={90000}
                fitOutBudget={50000}
                rentDeposit={15000}
                legalFees={3000}
                openingStock={8000}
                otherSetupCosts={5000}
                upfrontCashNeeded={81000}
                cashAfterOpening={9000}
              />
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white shadow-sm p-1">
              <DownsideSurvivalCard
                downsideRevenuePercentage={60}
                downsideMonthlyRevenue={14976}
                monthlyCostBase={14100}
                downsideMonthlyPosition={876}
                monthlyBurnInDownside={0}
                survivalMonths={undefined}
                survivesSixBadMonths={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Site snapshot"
            title="The basic assumptions behind the sample case."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteSnapshot.map((item) => (
              <div key={item.label} className="rounded-3xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-stone-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Key viability metrics"
          title="The core numbers the paid file makes easy to review."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyMetrics.map((item) => (
            <div key={item.label} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
              <p className="text-2xl font-bold mt-2 text-stone-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Upfront cash and survival"
            title="The opening capital stack is the weak point."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upfrontCash.map((item) => (
              <div key={item.label} className="rounded-3xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-stone-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What would need to improve?"
          title="The deal needs a stronger opening capital position."
          description="The site is not failing because the downside month burns cash. It is failing because upfront cash needed exceeds available starting cash before trading begins."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {improvementPoints.map((item) => (
            <div key={item} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Stress-test scenarios"
            title="How the site behaves under weaker trading or improved lease terms."
          />
          <div className="overflow-x-auto rounded-3xl border border-stone-200">
            <table className="w-full border-collapse text-sm bg-white">
              <thead>
                <tr className="bg-stone-50 text-left border-b border-stone-200">
                  <th className="py-3 px-4 font-semibold text-stone-700">Scenario</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Monthly revenue</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Monthly position</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Break-even/day</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {stressScenarios.map((row) => (
                  <tr key={row.label} className="border-b border-stone-100 align-top">
                    <td className="py-3 px-4 font-medium text-stone-900">{row.label}</td>
                    <td className="py-3 px-4 text-stone-700">{row.revenue}</td>
                    <td className="py-3 px-4 text-stone-700">{row.position}</td>
                    <td className="py-3 px-4 text-stone-700">{row.breakEven}</td>
                    <td className="py-3 px-4 text-stone-600 leading-6">{row.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Negotiation levers"
          title="Practical lease points worth testing before signing."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {negotiationLevers.map((item) => (
            <div key={item.title} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-stone-900">{item.title}</p>
              <p className="text-sm text-stone-600 leading-7 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Evidence needed before signing"
            title="Trading, cost, and lease evidence that should be checked first."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {evidenceSections.map((section) => (
              <div key={section.title} className="rounded-3xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{section.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-stone-700 leading-6">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Ranked actions before committing"
          title="A quick read on what matters most in the sample case."
        />
        <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-stone-50 text-left border-b border-stone-200">
                <th className="py-3 px-4 font-semibold text-stone-700">Area</th>
                <th className="py-3 px-4 font-semibold text-stone-700">Current signal</th>
                <th className="py-3 px-4 font-semibold text-stone-700">What would improve it</th>
                <th className="py-3 px-4 font-semibold text-stone-700">Priority</th>
              </tr>
            </thead>
            <tbody>
              {decisionMatrix.map((row) => (
                <tr key={row.area} className="border-b border-stone-100 align-top">
                  <td className="py-3 px-4 font-medium text-stone-900">{row.area}</td>
                  <td className="py-3 px-4 text-stone-700 leading-6">{row.current}</td>
                  <td className="py-3 px-4 text-stone-700 leading-6">{row.improve}</td>
                  <td className="py-3 px-4 text-stone-700">{row.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Final view"
            title="Pause unless the opening capital position improves."
            description="The model does not fail because the downside month burns cash; it fails because upfront cash needed exceeds available starting cash."
          />
          <div className="max-w-3xl text-stone-300 leading-7 text-sm space-y-3">
            <p>
              The priority is to renegotiate fit-out, deposit, rent-free terms,
              landlord contribution, or increase available starting cash before
              treating the site as viable.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-teal-50 border-y border-teal-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-3">
            Next step
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Run your own commercial check, then request the paid file if the site still looks worth pursuing.
          </h2>
          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            The sample shows the kind of pressure-test, negotiation prompts, and due diligence structure that appears in the Standard commercial viability file.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/sample-commercial-viability-file"
              ctaLabel="Start free commercial check"
              pageType="sample_file"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
            >
              Start free commercial check
            </TrackedCtaLink>
            <Link
              href="/viability-file"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              Get your own £49 viability file
            </Link>
            <Link
              href="/how-it-works"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
