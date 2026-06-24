import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import { disclaimerClass, heroSecondaryCtaClass, primaryCtaClass, surfaceCardClass, surfaceCardSoftClass, tableShellClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Commercial Rent Affordability Calculator | YieldLens UK',
  description:
    'Check whether a business can afford commercial rent by pressure-testing rent burden, break-even customers, monthly costs, opening cash, and downside trading before signing a lease.',
  alternates: {
    canonical: '/commercial-rent-affordability-calculator',
  },
  openGraph: {
    title: 'Commercial Rent Affordability Calculator | YieldLens UK',
    description:
      'Check whether a business can afford commercial rent by pressure-testing rent burden, break-even customers, monthly costs, opening cash, and downside trading before signing a lease.',
    url: 'https://yieldlens.co.uk/commercial-rent-affordability-calculator',
  },
};

const faqItems = [
  {
    question: 'What is a commercial rent affordability calculator?',
    answer:
      'It is an indicative pressure test that asks whether the business can carry the rent once monthly revenue, costs, opening cash, and downside trading are taken into account.',
  },
  {
    question: 'How is this different from a rental valuation?',
    answer:
      'A rental valuation estimates market rent. A rent affordability check tests whether your business model can carry that rent before you commit to the lease.',
  },
  {
    question: 'What rent burden is too high?',
    answer:
      'YieldLens uses 12% as a healthier screening level and 18% as a caution threshold. Those are indicative screening thresholds, not universal rules.',
  },
  {
    question: 'What should I include in the check?',
    answer:
      'Include expected customers, average spend, opening days, staff costs, business rates, utilities, fit-out, deposit, legal fees, opening stock, and starting cash.',
  },
  {
    question: 'Can this tell me whether to sign the lease?',
    answer:
      'No. It helps structure the commercial questions and highlights where the risk sits, but it does not replace professional due diligence.',
  },
  {
    question: 'Does YieldLens review the lease documents?',
    answer:
      'No. YieldLens does not inspect the property or verify lease wording. It turns the assumptions you enter into an early warning view.',
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

const quickAnswerBullets = [
  'Rent is not taking too much expected revenue.',
  'Break-even customers/day sits below realistic customers/day.',
  'Monthly staff, rates, utilities, and known costs are included.',
  'Fit-out, deposit, legal fees, stock, and setup costs leave enough opening cash.',
  'Downside trading does not exhaust the buffer too quickly.',
  'Lease terms do not create hidden cost pressure.',
];

const differencePoints = [
  {
    label: 'Rental valuation',
    text: 'Estimates what rent a property might command in the market.',
  },
  {
    label: 'Rent affordability',
    text: 'Tests whether the business can carry that rent once costs and opening cash are included.',
  },
  {
    label: 'Why it matters',
    text: 'A site can be fairly priced in the market and still be unaffordable for a specific business.',
  },
];

const exampleCards = [
  {
    label: 'Rent burden',
    value: '20.0%',
    helper: '£5,000 rent against £24,960 expected monthly revenue.',
    tone: 'border-amber-200 bg-amber-50 text-amber-950',
  },
  {
    label: 'Break-even/day',
    value: '45.2',
    helper: 'Customers needed per day to cover the monthly cost base.',
    tone: 'border-stone-200 bg-white text-stone-950',
  },
  {
    label: 'Opening buffer',
    value: '£9,000',
    helper: 'Starting cash after fit-out, deposit, fees, stock, and setup.',
    tone: 'border-orange-200 bg-orange-50 text-orange-950',
  },
  {
    label: 'Downside test',
    value: 'Pass',
    helper: 'The weaker case still covers known monthly costs.',
    tone: 'border-green-200 bg-green-50 text-green-950',
  },
];

const whatChangesAffordability = [
  'Lower headline rent',
  'Rent-free period',
  'Lower deposit',
  'Service charge cap',
  'Fit-out contribution',
  'Higher average spend',
  'Higher customer volume',
  'Lower staff or operating costs',
  'Stronger starting cash',
];

const relatedLinks = [
  { href: '/commercial-lease-viability-check', label: 'Commercial lease viability check' },
  { href: '/commercial-rent-burden-calculator', label: 'Commercial rent burden calculator' },
  { href: '/break-even-customers-calculator', label: 'Break-even customers calculator' },
  { href: '/commercial-lease-survival-calculator', label: 'Commercial lease survival calculator' },
  { href: '/rental-valuation-vs-rent-affordability', label: 'Rental valuation vs rent affordability' },
  { href: '/commercial-lease-checklist-before-signing', label: 'Commercial lease checklist before signing' },
  { href: '/restaurant-lease-viability-check', label: 'Restaurant lease viability check' },
  { href: '/salon-lease-viability-check', label: 'Salon lease viability check' },
  { href: '/how-much-rent-can-a-cafe-afford', label: 'How much rent can a cafe afford?' },
  { href: '/viability-file', label: 'Viability file' },
  { href: '/sample-commercial-viability-file', label: 'Sample viability file' },
  { href: '/how-it-works', label: 'How it works' },
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

export default function CommercialRentAffordabilityCalculatorPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <JsonLd data={faqStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-rent-affordability-calculator"
        pageType="calculator_page"
        mode="commercial"
        eventLabel="Commercial rent affordability calculator viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-300 mb-4">
                Commercial rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Check whether your business can afford the rent before signing.
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Commercial rent is not affordable just because it looks normal for the area. You need to test rent burden, break-even customers, monthly costs, opening cash, and weaker trading before committing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-rent-affordability-calculator"
                  ctaLabel="Run a free commercial check"
                  pageType="calculator_page"
                  className={primaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link
                  href="/sample-commercial-viability-file"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/5 p-5 sm:p-6 shadow-[0_20px_40px_rgba(15,23,42,0.18)]`}>
              <p className="text-xs uppercase tracking-widest text-green-300 font-medium mb-3">
                Commercial rent burden
              </p>
              <p className="text-2xl font-bold leading-tight text-white">
                A rent affordability check asks whether the business can carry the rent.
              </p>
              <p className="mt-4 text-sm text-stone-300 leading-7">
                A rental valuation estimates market rent. A business affordability check asks whether the entered assumptions can support that rent once costs and opening cash are included.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: '12%', value: 'Healthier', tone: 'bg-green-50 text-green-950 border-green-200' },
                  { label: '18%', value: 'Caution', tone: 'bg-amber-50 text-amber-950 border-amber-200' },
                  { label: '20%+', value: 'Pressure', tone: 'bg-orange-50 text-orange-950 border-orange-200' },
                ].map((item) => (
                  <div key={item.label} className={`rounded-3xl border p-4 ${item.tone}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-1">{item.label}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Quick answer"
          title="A business is more likely to afford the rent when the numbers leave room to breathe."
          description="Use 12% as a healthier screening level and 18% as a caution threshold. Those are indicative YieldLens screening thresholds, not universal rules."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-4">The business is more likely to carry the rent when:</p>
            <ul className="space-y-3 text-sm text-stone-700 leading-7">
              {quickAnswerBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-4">Why this page exists</p>
            <p className="text-sm text-stone-700 leading-7">
              Search results often mix rent affordability queries with rental valuation queries. YieldLens is focused on the tenant side of the question. It helps you work out whether the business can carry the rent before you sign, rather than estimating what the market rent should be.
            </p>
            <div className="mt-5 rounded-3xl border border-stone-200 bg-white p-4 text-sm text-stone-700 leading-7">
              A site can be fairly priced in the market and still be unaffordable for a specific business.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Commercial rent affordability vs rental valuation"
            title="These are not the same question."
            description="A rental valuation estimates what rent a property might command in the market. A commercial rent affordability check tests whether the tenant's business model can carry that rent."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {differencePoints.map((item) => (
              <div key={item.label} className="rounded-3xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.label}</p>
                <p className="mt-2 text-sm text-stone-600 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Core calculation"
          title="Rent burden shows how much of expected revenue goes to rent."
          description="Rent burden = monthly rent / expected monthly revenue. The lower the burden, the more room the business has for staffing, rates, utilities, stock, and quieter trading."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                ['Annual rent', '£60,000'],
                ['Monthly rent', '£5,000'],
                ['Expected customers/day', '80'],
                ['Average spend', '£12'],
                ['Opening days/month', '26'],
                ['Expected monthly revenue', '£24,960'],
                ['Rent burden', '20.0%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">{label}</p>
                  <p className="text-lg font-bold text-stone-950">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-900 font-semibold mb-2">Interpretation</p>
            <p className="text-sm text-amber-950 leading-7">
              At 20.0%, rent is above the YieldLens caution threshold, so the site needs stronger trading evidence or better lease terms before it feels comfortable.
            </p>
            <p className="mt-4 text-sm text-amber-950 leading-7">
              Use the commercial rent burden calculator when you want a faster rent-only screen. Use the free commercial check when you want rent, customers, costs, opening cash, and downside trading reviewed together.
            </p>
            <div className="mt-5">
              <Link href="/commercial-rent-burden-calculator" className="text-sm font-medium text-green-800 hover:text-green-900">
                Open the commercial rent burden calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Break-even customers/day"
            title="Translate fixed monthly costs into a daily trading target."
            description="Break-even customers/day = monthly cost base / average spend / opening days per month. This helps show whether the rent and overheads can be covered without heroic assumptions."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  ['Monthly cost base', '£14,100'],
                  ['Average spend', '£12'],
                  ['Opening days/month', '26'],
                  ['Break-even customers/day', '45.2'],
                  ['Expected customers/day', '80'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl border border-stone-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">{label}</p>
                    <p className="text-lg font-bold text-stone-950">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-green-900 font-semibold mb-2">Interpretation</p>
              <p className="text-sm text-green-950 leading-7">
                There is headroom on paper, but the 80 customers/day assumption needs evidence through footfall counts, competitor observation, and trading assumptions.
              </p>
              <div className="mt-5">
                <Link href="/break-even-customers-calculator" className="text-sm font-medium text-green-800 hover:text-green-900">
                  Open the break-even customers calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Opening cash affordability"
          title="Month-to-month affordability is not enough if the launch cash is too thin."
          description="A business can look affordable on operating numbers and still fail because fit-out, deposit, fees, stock, and setup costs leave too little cash after opening."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                ['Starting cash', '£90,000'],
                ['Fit-out', '£50,000'],
                ['Rent deposit', '£15,000'],
                ['Legal fees', '£3,000'],
                ['Opening stock', '£8,000'],
                ['Other setup costs', '£5,000'],
                ['Upfront cash needed', '£81,000'],
                ['Cash after opening', '£9,000'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">{label}</p>
                  <p className="text-lg font-bold text-stone-950">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-orange-900 font-semibold mb-2">Interpretation</p>
            <p className="text-sm text-orange-950 leading-7">
              The site has a positive buffer, but £9,000 is thin relative to setup risk and early trading friction.
            </p>
            <p className="mt-4 text-sm text-orange-950 leading-7">
              More starting cash, lower setup costs, or better landlord terms can make the same rent feel materially easier to carry.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Downside trading"
            title="Test the rent against weaker revenue, not only the base case."
            description="A commercial rent affordability check should show what happens if revenue is 40 percent softer than expected."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  ['Base monthly revenue', '£24,960'],
                  ['60% downside revenue', '£14,976'],
                  ['Monthly cost base', '£14,100'],
                  ['Downside monthly position', '£876 surplus'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl border border-stone-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">{label}</p>
                    <p className="text-lg font-bold text-stone-950">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-green-900 font-semibold mb-2">Interpretation</p>
              <p className="text-sm text-green-950 leading-7">
                The downside month still covers known costs, but the rent burden and opening buffer still need caution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What changes affordability?"
          title="These are the levers that can move the result."
          description="The answer is not only about rent. Lease terms, setup spend, trading assumptions, and starting cash all change whether the site feels affordable."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatChangesAffordability.map((item) => (
            <div key={item} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Worked example"
            title="A redacted cafe site example with numbers that are easy to pressure-test."
            description="This is a fictional redacted example, not a real address or live case."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exampleCards.map((item) => (
              <div key={item.label} className={`rounded-3xl border p-5 shadow-sm ${item.tone}`}>
                <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-1">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs leading-5 mt-2 opacity-80">{item.helper}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-stone-300 leading-7">
            Indicative view: needs caution. The rent is high enough to demand stronger evidence on customers, spend, opening cash, and lease terms.
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="How YieldLens helps"
          title="The free check shows the tenant side of the equation."
          description="Use the free commercial check when you want the rent, costs, opening cash, and downside trading reviewed together. Use the paid file when you want the analysis organised into a report you can print, save, and use in negotiation."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">Free check includes</p>
            <ul className="space-y-3 text-sm text-stone-700 leading-7">
              {[
                'Rent burden',
                'Break-even customers/day',
                'Monthly cost base',
                'Upfront cash needed',
                'Cash after opening',
                'Downside monthly position',
                'Six-month survival test',
                'Risk flags',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">Paid file adds</p>
            <ul className="space-y-3 text-sm text-stone-700 leading-7">
              {[
                'Visual decision-support',
                'Stress-test scenarios',
                'Negotiation levers',
                'Lease questions',
                'Due diligence checklist',
                'Ranked actions before committing',
                'Final view',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-stone-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <TrackedCtaLink
            href="/check?mode=commercial"
            eventName="commercial_home_cta_clicked"
            pagePath="/commercial-rent-affordability-calculator"
            ctaLabel="Run a free commercial check"
            pageType="calculator_page"
            className="bg-green-700 text-white px-6 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm text-center"
          >
            Run a free commercial check
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
            See how it works
          </Link>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Common questions about commercial rent affordability."
            description="These answers are short, practical, and intentionally limited to early decision support."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-3xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.question}</p>
                <p className="mt-2 text-sm text-stone-600 leading-7">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Related pages"
          title="Use these when you want the wider commercial picture."
          description="The calculator sits inside the broader commercial lease viability workflow."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm text-sm font-medium text-stone-800 hover:border-green-200 hover:text-green-800 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-green-300 font-medium mb-3">
            Pressure-test the rent before you commit.
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Run a free commercial check, then decide whether the site deserves deeper work.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge rent burden, break-even customers, opening cash, and downside trading before a lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-rent-affordability-calculator"
              ctaLabel="Run a free commercial check"
              pageType="calculator_page"
              className="bg-green-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-green-400 transition-colors text-sm"
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link
              href="/sample-commercial-viability-file"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              View sample viability file
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
