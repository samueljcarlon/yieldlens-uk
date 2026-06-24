import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'Commercial Lease Survival Calculator UK',
  description:
    'Estimate upfront cash, fit-out costs, downside revenue, monthly burn, survival runway, and lease viability before signing a commercial lease.',
  alternates: {
    canonical: '/commercial-lease-survival-calculator',
  },
  openGraph: {
    title: 'Commercial Lease Survival Calculator UK | YieldLens UK',
    description:
      'Estimate whether a commercial site can survive weak early trading after fit-out, deposit, opening costs, and rent pressure.',
    url: 'https://yieldlens.co.uk/commercial-lease-survival-calculator',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is commercial lease survival?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial lease survival checks whether a site has enough cash after fit-out, deposits, opening costs, and known monthly costs to survive weak early trading.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the six-month survival test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The six-month survival test passes only if cash after opening is not negative and either the downside case has no monthly burn or cash covers at least six months of downside burn.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is survival runway enough to sign a lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Survival runway is an indicative decision-support screen. Lease decisions should also test rent burden, break-even customers, lease terms, evidence quality, fit-out risk, and professional due diligence.',
      },
    },
  ],
};

const formulas = [
  {
    title: 'Upfront cash needed',
    formula:
      'Upfront cash needed = fit-out + rent deposit + legal fees + opening stock + other setup costs',
    text: 'This is the cash required before the site can trade properly. It should include all obvious opening commitments, not just fit-out.',
  },
  {
    title: 'Cash after opening',
    formula: 'Cash after opening = starting cash - upfront cash needed',
    text: 'This is the buffer left after the opening spend has been funded. A site can look attractive but still start trading with too little cash.',
  },
  {
    title: 'Downside monthly position',
    formula:
      'Downside monthly position = downside revenue - known monthly cost base',
    text: 'This tests the site under weaker trading assumptions, before optimism has had a chance to hide the risk.',
  },
  {
    title: 'Survival runway',
    formula: 'Survival runway = cash after opening ÷ monthly downside burn',
    text: 'If the downside case burns cash each month, runway estimates how many weak months the remaining cash can cover.',
  },
];

const exampleMetrics = [
  {
    label: 'Upfront cash needed',
    value: '£81,000',
    tone: 'plain',
  },
  {
    label: 'Cash after opening',
    value: '£9,000',
    tone: 'plain',
  },
  {
    label: 'Downside revenue',
    value: '£14,976',
    tone: 'plain',
  },
  {
    label: 'Cost base',
    value: '£14,100',
    tone: 'plain',
  },
  {
    label: 'Downside burn',
    value: '£0',
    tone: 'positive',
  },
  {
    label: 'Six-month test',
    value: 'Pass',
    tone: 'positive',
  },
];

const upfrontRisks = [
  {
    title: 'Fit-out spend lands before revenue',
    text: 'Furniture, equipment, signage, fixtures, decoration, extraction, and works often need funding before the site proves demand.',
  },
  {
    title: 'Deposits reduce the buffer',
    text: 'Rent deposits, advance rent, legal fees, opening stock, licences, and setup costs can leave less cash for the first months.',
  },
  {
    title: 'Thin cash makes small misses painful',
    text: 'If the opening buffer is small, a quiet launch, delayed works, or one missing cost can quickly change the decision.',
  },
];

const fragilityChecks = [
  {
    title: 'The monthly model looks fine',
    text: 'Rent burden and break-even customers may look workable on expected trading, especially when revenue assumptions are confident.',
  },
  {
    title: 'Opening cash is quietly tight',
    text: 'The same site can be fragile if fit-out, deposits, fees, and stock consume almost all starting cash before opening day.',
  },
  {
    title: 'Weak trading exposes the gap',
    text: 'A downside case shows whether the site can handle quieter weeks, slower ramp-up, or a lower average spend.',
  },
  {
    title: 'No burn is not the whole answer',
    text: 'If cash after opening is thin, the site may pass the monthly downside case but still have little room for delays or missed costs.',
  },
];

const connectionItems = [
  {
    title: 'Rent burden',
    text: 'Rent burden shows how much expected revenue is absorbed by rent before the rest of the cost base is considered.',
    href: '/commercial-rent-burden-calculator',
    label: 'View rent burden calculator',
  },
  {
    title: 'Break-even customers',
    text: 'Break-even customers translate rent and known monthly costs into a daily customer target.',
    href: '/break-even-customers-calculator',
    label: 'View break-even calculator',
  },
];

const fullCheckItems = [
  'Executive verdict',
  'Rent burden analysis',
  'Break-even customers per day',
  'Upfront cash needed',
  'Cash after opening',
  'Downside monthly revenue',
  'Monthly burn or surplus',
  'Six-month survival test',
  'Fit-out and opening cost risk',
  'Recommended next checks',
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
      <p className="text-xs font-medium uppercase tracking-widest text-green-700 mb-3">
        {eyebrow}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-stone-600 max-w-3xl leading-7">
          {description}
        </p>
      )}
    </div>
  );
}

export default function CommercialLeaseSurvivalCalculatorPage() {
  return (
    <div className="bg-stone-50">
      <JsonLd data={faqStructuredData} />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-300 mb-4">
                Commercial survival pressure
              </p>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Commercial lease survival calculator
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Estimate whether a commercial site can survive weak early
                trading after fit-out, deposit, opening costs, and rent
                pressure.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="lease_survival_page_cta_clicked"
                  pagePath="/commercial-lease-survival-calculator"
                  ctaLabel="Run full commercial lease check"
                  pageType="seo_tool"
                  className="bg-green-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-green-400 transition-colors text-sm text-center"
                >
                  Run full commercial lease check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/commercial-lease-viability-check"
                  eventName="lease_survival_page_cta_clicked"
                  pagePath="/commercial-lease-survival-calculator"
                  ctaLabel="View commercial lease viability guide"
                  pageType="seo_tool"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View commercial lease viability guide
                </TrackedCtaLink>
              </div>
            </div>

            <div className="bg-[#fffaf0] text-stone-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-stone-200">
                <p className="text-xs uppercase tracking-widest text-green-700 font-semibold">
                  Worked survival screen
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  Example only. Use the full check before relying on a site
                  decision.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {exampleMetrics.map((item) => (
                  <div
                    key={item.label}
                    className={`p-4 border-b border-stone-200 ${
                      item.tone === 'positive' ? 'bg-green-50' : ''
                    }`}
                  >
                    <p
                      className={`text-xs uppercase tracking-wide font-medium ${
                        item.tone === 'positive'
                          ? 'text-green-700'
                          : 'text-stone-400'
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-stone-50">
                <p className="text-sm text-stone-700 leading-6">
                  This example passes because cash after opening is positive
                  and the downside case has no monthly burn. The cash buffer is
                  still thin, so the decision needs fit-out, lease terms, and
                  evidence checked carefully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Survival model"
          title="What commercial lease survival means"
          description="Commercial lease survival asks whether the site has enough cash left after opening costs to withstand weak early trading. It is not just a monthly profit question."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formulas.map((item) => (
            <div
              key={item.title}
              className="bg-[#fffaf0] border border-stone-200 rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-semibold text-stone-900 mb-3">
                {item.title}
              </h3>

              <p className="text-base font-bold text-stone-900 leading-7">
                {item.formula}
              </p>

              <p className="text-sm text-stone-600 leading-6 mt-4">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf7ef] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Six-month test"
            title="The survival test needs both opening cash and downside resilience."
            description="The site passes only if cash after opening is not negative and either the downside case has no monthly burn or cash covers at least six months of downside burn."
          />

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 shadow-sm">
            <p className="text-lg sm:text-2xl font-bold text-stone-900 leading-9">
              Six-month survival test: cash after opening must be positive, then
              the downside case must either have no monthly burn or enough cash
              to cover six months of downside burn.
            </p>

            <p className="text-sm text-stone-600 leading-7 mt-4">
              A no-burn downside case is useful, but it is not the full answer
              if opening cash is short. A site still needs enough buffer for
              timing delays, missing costs, and early trading uncertainty.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Upfront cash"
          title="Why upfront cash matters before signing"
          description="A lease decision can become risky before the first sale. The opening cash requirement shows how much capital is locked into the site before trading can prove the idea."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {upfrontRisks.map((item) => (
            <div
              key={item.title}
              className="bg-[#fffaf0] border border-stone-200 rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-semibold text-stone-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-stone-600 leading-6">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-green-300 font-medium mb-3">
                Fragility
              </p>

              <h2 className="text-3xl font-bold mb-4">
                A site can look viable but still be fragile.
              </h2>

              <p className="text-sm text-stone-300 leading-7">
                Expected trading can hide weak opening cash. The survival view
                connects fit-out, deposit, revenue risk, and monthly cost base
                so the lease is tested before it becomes expensive to walk away.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fragilityChecks.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#fffaf0] text-stone-900 border border-white/10 rounded-lg p-5"
                >
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-6">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Downside case"
          title="How downside revenue changes the decision"
          description="The downside case asks what happens if customer numbers, average spend, or trading ramp-up are weaker than expected. That can turn a comfortable-looking plan into monthly burn."
        />

        <div className="bg-[#fffaf0] border border-stone-200 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-stone-700">
            {[
              'If downside revenue still covers the monthly cost base, survival depends heavily on cash after opening.',
              'If downside revenue falls below known monthly costs, the monthly burn needs a cash runway calculation.',
              'If cash after opening is negative, the site fails before the trading case has been tested.',
            ].map((item) => (
              <div
                key={item}
                className="bg-stone-50 border border-stone-200 rounded-lg p-4 leading-6"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ef] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Connected checks"
            title="Survival should sit alongside rent burden and break-even customers."
            description="Survival runway is strongest when it is read with the two earlier pressure screens. Together they show rent pressure, daily trading target, and opening cash resilience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {connectionItems.map((item) => (
              <div
                key={item.title}
                className="bg-stone-50 border border-stone-200 rounded-lg p-6"
              >
                <h3 className="font-semibold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 leading-6 mb-5">
                  {item.text}
                </p>
                <TrackedCtaLink
                  href={item.href}
                  eventName="lease_survival_page_cta_clicked"
                  pagePath="/commercial-lease-survival-calculator"
                  ctaLabel={item.label}
                  pageType="seo_tool"
                  className="inline-flex bg-[#fffaf0] text-stone-700 border border-stone-300 px-5 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
                >
                  {item.label}
                </TrackedCtaLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Full check"
          title="How the YieldLens commercial check goes further"
          description="The full commercial lease check connects opening cash, rent pressure, break-even customers, downside trading, and six-month survival in one decision-support view."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {fullCheckItems.map((item) => (
            <div
              key={item}
              className="bg-[#fffaf0] border border-stone-200 rounded-lg p-4 text-sm font-medium text-stone-800 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <TrackedCtaLink
            href="/check?mode=commercial"
            eventName="lease_survival_page_cta_clicked"
            pagePath="/commercial-lease-survival-calculator"
            ctaLabel="Run full commercial lease check"
            pageType="seo_tool"
            className="bg-green-700 text-white px-6 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm text-center"
          >
            Run full commercial lease check
          </TrackedCtaLink>

          <TrackedCtaLink
            href="/viability-file"
            eventName="lease_survival_page_cta_clicked"
            pagePath="/commercial-lease-survival-calculator"
            ctaLabel="View viability file"
            pageType="seo_tool"
            className="bg-[#fffaf0] text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
          >
            View viability file
          </TrackedCtaLink>
        </div>
      </section>

      <section className="bg-green-50 border-y border-green-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
            Next step
          </p>

          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Pressure-test the lease before opening costs lock you in.
          </h2>

          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            Run the full commercial check to test rent burden, break-even
            customers, upfront cash, downside revenue, monthly burn, and
            six-month survival before signing.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="lease_survival_page_cta_clicked"
              pagePath="/commercial-lease-survival-calculator"
              ctaLabel="Run full commercial lease check"
              pageType="seo_tool"
              className="bg-green-700 text-white px-6 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm"
            >
              Run full commercial lease check
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/commercial-lease-viability-check"
              eventName="lease_survival_page_cta_clicked"
              pagePath="/commercial-lease-survival-calculator"
              ctaLabel="View commercial lease viability guide"
              pageType="seo_tool"
              className="bg-[#fffaf0] text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              View commercial lease viability guide
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-stone-600 leading-6">
          <p className="font-semibold text-stone-800 mb-2">
            Important disclaimer
          </p>

          <p>
            YieldLens UK provides indicative decision-support only. It is not
            financial advice, legal advice, tax advice, a valuation, or a substitute
            for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
