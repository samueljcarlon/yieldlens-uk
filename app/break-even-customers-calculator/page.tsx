import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'Break-Even Customers Calculator UK',
  description:
    'Estimate customers per day from average spend, commercial rent, monthly cost base, and lease viability before committing to a site.',
  alternates: {
    canonical: '/break-even-customers-calculator',
  },
  openGraph: {
    title: 'Break-Even Customers Calculator UK | YieldLens UK',
    description:
      'Estimate how many customers per day a commercial site needs to cover rent and known monthly costs before signing a lease.',
    url: 'https://yieldlens.co.uk/break-even-customers-calculator',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are break-even customers per day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Break-even customers per day estimates how many customers a commercial site needs each trading day to cover its monthly cost base, based on average spend and opening days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should be included in monthly cost base?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monthly cost base should include rent, staff, utilities, business rates, service charge, insurance, and other regular costs where applicable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is break-even enough to judge a commercial lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Break-even customers are a useful screen, but lease viability also needs rent burden, upfront cash, fit-out risk, downside revenue, monthly burn, and survival runway.',
      },
    },
  ],
};

const costItems = [
  {
    title: 'Rent',
    text: 'Use the monthly rent figure, not just the annual headline rent.',
  },
  {
    title: 'Staff',
    text: 'Include realistic rota cover, employer costs, and any founder drawings if they must come from the site.',
  },
  {
    title: 'Utilities',
    text: 'Add electricity, gas, water, broadband, waste, and other regular operating costs.',
  },
  {
    title: 'Business rates',
    text: 'Use the expected monthly rates cost after any relief you are confident applies.',
  },
  {
    title: 'Service charge or other regular costs',
    text: 'Include service charge, insurance, maintenance, licence costs, subscriptions, and other recurring items where applicable.',
  },
];

const riskItems = [
  {
    title: 'Average spend can be optimistic',
    text: 'A small overestimate in average spend can make the daily customer target look easier than it really is.',
  },
  {
    title: 'Opening days change the target',
    text: 'Fewer trading days push more pressure onto each day. Holidays, quiet days, and restricted hours matter.',
  },
  {
    title: 'Break-even is not profit',
    text: 'Covering known monthly costs does not automatically create enough margin for tax, stock variation, owner income, repairs, or weak months.',
  },
  {
    title: 'Cash risk sits outside the formula',
    text: 'Fit-out, deposits, legal fees, opening stock, and setup costs need separate modelling before the site is treated as viable.',
  },
];

const fullCheckItems = [
  'Rent burden as a share of revenue',
  'Break-even customers per day',
  'Upfront cash needed',
  'Cash after opening',
  'Downside monthly revenue',
  'Monthly burn or surplus',
  'Six-month survival test',
  'Fit-out and opening cost risk',
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

export default function BreakEvenCustomersCalculatorPage() {
  return (
    <div className="bg-stone-50">
      <JsonLd data={faqStructuredData} />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-300 mb-4">
                Commercial trading pressure
              </p>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Break-even customers calculator
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Estimate how many customers per day a commercial site needs to
                cover rent and known monthly costs before you commit to a lease.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="break_even_page_cta_clicked"
                  pagePath="/break-even-customers-calculator"
                  ctaLabel="Run full commercial lease check"
                  pageType="seo_tool"
                  className="bg-green-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-green-400 transition-colors text-sm text-center"
                >
                  Run full commercial lease check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/commercial-rent-burden-calculator"
                  eventName="break_even_page_cta_clicked"
                  pagePath="/break-even-customers-calculator"
                  ctaLabel="View commercial rent burden calculator"
                  pageType="seo_tool"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View commercial rent burden calculator
                </TrackedCtaLink>
              </div>
            </div>

            <div className="bg-white text-stone-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-stone-200">
                <p className="text-xs uppercase tracking-widest text-green-700 font-semibold">
                  Quick break-even screen
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  Example only. Use the full check for the wider survival model.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-4 border-b border-r border-stone-200">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                    Monthly rent
                  </p>
                  <p className="text-2xl font-bold mt-1">£5,000</p>
                </div>

                <div className="p-4 border-b border-stone-200">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                    Other monthly costs
                  </p>
                  <p className="text-2xl font-bold mt-1">£12,600</p>
                </div>

                <div className="p-4 border-b border-r border-stone-200">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                    Average spend
                  </p>
                  <p className="text-2xl font-bold mt-1">£12.50</p>
                </div>

                <div className="p-4 border-b border-stone-200">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                    Opening days
                  </p>
                  <p className="text-2xl font-bold mt-1">26</p>
                </div>

                <div className="p-4 border-b border-r border-stone-200">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                    Monthly cost base
                  </p>
                  <p className="text-2xl font-bold mt-1">£17,600</p>
                </div>

                <div className="p-4 border-b border-stone-200 bg-green-50">
                  <p className="text-xs uppercase tracking-wide text-green-700 font-medium">
                    Customers per day
                  </p>
                  <p className="text-2xl font-bold mt-1">55</p>
                </div>
              </div>

              <div className="p-5 bg-stone-50">
                <p className="text-sm text-stone-700 leading-6">
                  This site needs roughly 55 customers per trading day just to
                  cover known monthly costs. The full check should test rent
                  burden, cash after opening, downside revenue, and six-month
                  survival before signing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Formula"
          title="What break-even customers per day means"
          description="Break-even customers per day translates the monthly cost base into a practical daily trading target. It asks how many customers are needed each opening day before the site has covered known monthly costs."
        />

        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
          <p className="text-lg sm:text-2xl font-bold text-stone-900">
            Break-even customers per day = monthly cost base ÷ average spend ÷
            opening days per month
          </p>

          <p className="text-sm text-stone-600 leading-7 mt-4">
            If the monthly cost base is £17,600, average spend is £12.50, and
            the site opens 26 days per month, the break-even target is about 55
            customers per day. That is the customer volume needed before the
            known monthly cost base is covered.
          </p>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Cost base"
            title="What should go into the monthly cost base"
            description="The calculation is only useful if the cost base is complete enough. Missing regular costs can make a fragile site look workable."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {costItems.map((item) => (
              <div
                key={item.title}
                className="bg-stone-50 border border-stone-200 rounded-lg p-5"
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
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Before signing"
          title="Why the daily customer target matters"
          description="A lease can feel attractive until the required customer volume is expressed per day. The number helps you compare the site against likely footfall, opening hours, staffing cover, and local demand."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {riskItems.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm"
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
                Rent pressure
              </p>

              <h2 className="text-3xl font-bold mb-4">
                Rent burden and break-even customers should be checked together.
              </h2>

              <p className="text-sm text-stone-300 leading-7">
                Rent burden shows how much revenue is absorbed by rent.
                Break-even customers show the daily trading target needed to
                cover rent and known costs. One gives the percentage pressure,
                the other gives the operational target.
              </p>
            </div>

            <div className="bg-white text-stone-900 rounded-lg p-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Rent burden asks
                  </p>
                  <p className="text-sm font-semibold mt-2 leading-6">
                    Is rent taking too much of expected revenue?
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Break-even asks
                  </p>
                  <p className="text-sm font-semibold mt-2 leading-6">
                    Can the site realistically attract enough customers each
                    day?
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/commercial-rent-burden-calculator"
                  eventName="break_even_page_cta_clicked"
                  pagePath="/break-even-customers-calculator"
                  ctaLabel="View rent burden calculator"
                  pageType="seo_tool"
                  className="bg-green-700 text-white px-5 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm text-center"
                >
                  View rent burden calculator
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/commercial-lease-viability-check"
                  eventName="break_even_page_cta_clicked"
                  pagePath="/break-even-customers-calculator"
                  ctaLabel="View viability guide"
                  pageType="seo_tool"
                  className="bg-white text-stone-700 border border-stone-300 px-5 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
                >
                  View viability guide
                </TrackedCtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Limits"
          title="Break-even does not include upfront cash unless you model it separately."
          description="The daily customer target helps test monthly trading pressure, but it does not show whether the site has enough cash to open, fit out, absorb deposits, or survive a weak start."
        />

        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-stone-700">
            {[
              'Fit-out, furniture, equipment, and signage can use cash before trading starts.',
              'Rent deposits, legal fees, opening stock, and setup costs can reduce the buffer.',
              'A site can hit break-even later but still run out of cash during the first weak months.',
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

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Full check"
            title="How the YieldLens commercial check goes further"
            description="The full commercial lease check connects the customer target to rent pressure, opening cash, downside trading, and six-month survival."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {fullCheckItems.map((item) => (
              <div
                key={item}
                className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-sm font-medium text-stone-800"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="break_even_page_cta_clicked"
              pagePath="/break-even-customers-calculator"
              ctaLabel="Run full commercial lease check"
              pageType="seo_tool"
              className="bg-green-700 text-white px-6 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm text-center"
            >
              Run full commercial lease check
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/viability-file"
              eventName="break_even_page_cta_clicked"
              pagePath="/break-even-customers-calculator"
              ctaLabel="View viability file"
              pageType="seo_tool"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
            >
              View viability file
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <section className="bg-green-50 border-y border-green-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
            Next step
          </p>

          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Test whether the lease can survive the real numbers.
          </h2>

          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            Use the full commercial check to connect break-even customers, rent
            burden, upfront cash, downside revenue, and six-month survival in
            one decision-support view.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="break_even_page_cta_clicked"
              pagePath="/break-even-customers-calculator"
              ctaLabel="Run full commercial lease check"
              pageType="seo_tool"
              className="bg-green-700 text-white px-6 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm"
            >
              Run full commercial lease check
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/commercial-rent-burden-calculator"
              eventName="break_even_page_cta_clicked"
              pagePath="/break-even-customers-calculator"
              ctaLabel="View rent burden calculator"
              pageType="seo_tool"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              View rent burden calculator
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
