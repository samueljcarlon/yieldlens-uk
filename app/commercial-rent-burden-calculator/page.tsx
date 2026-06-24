import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'Commercial Rent Burden Calculator UK',
  description:
    'Estimate commercial rent as a percentage of revenue, understand rent pressure, and pressure-test commercial lease viability before signing.',
  alternates: {
    canonical: '/commercial-rent-burden-calculator',
  },
  openGraph: {
    title: 'Commercial Rent Burden Calculator UK | YieldLens UK',
    description:
      'Estimate rent as a percentage of revenue and see why high rent burden can make a commercial lease fragile before you sign.',
    url: 'https://yieldlens.co.uk/commercial-rent-burden-calculator',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is commercial rent burden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial rent burden is monthly rent divided by estimated monthly revenue, multiplied by 100. It shows how much revenue is absorbed by rent before other costs are considered.',
      },
    },
    {
      '@type': 'Question',
      name: 'What rent burden is too high for a commercial lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no universal rule. As a rough screen, under 8% may be lighter pressure, 8% to 12% may be manageable, 12% to 18% may be stretched, and over 18% needs careful testing against margins and costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is rent burden enough to judge a commercial site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Rent burden is only one screening metric. A lease decision should also test break-even customers, staff costs, rates, utilities, fit-out, opening cash, downside revenue, and survival runway.',
      },
    },
  ],
};

const interpretationBands = [
  {
    range: 'Under 8%',
    label: 'Lighter pressure',
    text: 'Rent may leave more room for staff, rates, utilities, stock, tax, and quieter trading. The rest of the cost base still matters.',
  },
  {
    range: '8% to 12%',
    label: 'Manageable, but check costs',
    text: 'This can be workable for some sites, but only if margins, staffing, rates, and utilities are realistic.',
  },
  {
    range: '12% to 18%',
    label: 'Stretched depending on margins',
    text: 'The site may need strong customer volume or healthy margins. Break-even customers and downside trading need testing.',
  },
  {
    range: 'Over 18%',
    label: 'High pressure',
    text: 'Rent is taking a large share of revenue. This needs careful testing before signing, especially if fit-out or deposits are significant.',
  },
];

const pressurePoints = [
  {
    title: 'Staff, rates, and utilities',
    text: 'Rent is only one fixed cost. A site with acceptable rent burden can still fail if staff costs, business rates, utilities, insurance, or service charge are incomplete.',
  },
  {
    title: 'Break-even customers',
    text: 'Rent burden shows pressure as a percentage. Break-even customers translate that pressure into a daily trading target.',
  },
  {
    title: 'Fit-out and opening cash',
    text: 'A site can look workable month to month but still be fragile if deposits, fit-out, legal fees, stock, and setup costs use too much cash before opening.',
  },
  {
    title: 'Downside trading',
    text: 'The full check tests what happens if revenue is weaker than expected and whether the site can survive six difficult early months.',
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

export default function CommercialRentBurdenCalculatorPage() {
  return (
    <div className="bg-stone-50">
      <JsonLd data={faqStructuredData} />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-300 mb-4">
                Commercial rent pressure
              </p>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Commercial rent burden calculator
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Estimate rent as a share of monthly revenue and see why high
                rent burden can make a commercial lease fragile before you sign.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="rent_burden_page_cta_clicked"
                  pagePath="/commercial-rent-burden-calculator"
                  ctaLabel="Run full commercial lease check"
                  pageType="seo_tool"
                  className="bg-green-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-green-400 transition-colors text-sm text-center"
                >
                  Run full commercial lease check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/commercial-lease-viability-check"
                  eventName="rent_burden_page_cta_clicked"
                  pagePath="/commercial-rent-burden-calculator"
                  ctaLabel="View commercial lease viability guide"
                  pageType="seo_tool"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View commercial lease viability guide
                </TrackedCtaLink>
              </div>
            </div>

            <div className="bg-white text-stone-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-stone-200">
                <p className="text-xs uppercase tracking-widest text-green-700 font-semibold">
                  Quick rent burden screen
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  Example only. Use the full check for the wider survival model.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-4 border-b border-r border-stone-200">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                    Annual rent
                  </p>
                  <p className="text-2xl font-bold mt-1">£60,000</p>
                </div>

                <div className="p-4 border-b border-stone-200">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                    Monthly rent
                  </p>
                  <p className="text-2xl font-bold mt-1">£5,000</p>
                </div>

                <div className="p-4 border-b border-r border-stone-200">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                    Monthly revenue
                  </p>
                  <p className="text-2xl font-bold mt-1">£24,960</p>
                </div>

                <div className="p-4 border-b border-stone-200 bg-green-50">
                  <p className="text-xs uppercase tracking-wide text-green-700 font-medium">
                    Rent burden
                  </p>
                  <p className="text-2xl font-bold mt-1">20%</p>
                </div>
              </div>

              <div className="p-5 bg-stone-50">
                <p className="text-sm text-stone-700 leading-6">
                  A 20% rent burden is high pressure in this rough screen. The
                  full check should test break-even customers, upfront cash,
                  downside revenue, and six-month survival before signing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Formula"
          title="What commercial rent burden means"
          description="Commercial rent burden shows how much estimated revenue is absorbed by rent before staff, rates, utilities, insurance, stock, tax, and quieter trading periods are considered."
        />

        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
          <p className="text-lg sm:text-2xl font-bold text-stone-900">
            Rent burden = monthly rent ÷ monthly revenue × 100
          </p>

          <p className="text-sm text-stone-600 leading-7 mt-4">
            If annual rent is £60,000, monthly rent is £5,000. If estimated
            monthly revenue is £24,960, rent burden is about 20%. That means
            rent absorbs roughly one fifth of expected revenue before the rest
            of the cost base is covered.
          </p>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Interpretation"
            title="Rough rent burden screening ranges"
            description="These bands are not rules. They are a starting point for deciding whether the site deserves deeper pressure-testing."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {interpretationBands.map((band) => (
              <div
                key={band.range}
                className="bg-stone-50 border border-stone-200 rounded-lg p-5"
              >
                <p className="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2">
                  {band.range}
                </p>
                <h3 className="font-semibold text-stone-900 mb-2">
                  {band.label}
                </h3>
                <p className="text-sm text-stone-600 leading-6">
                  {band.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Why it matters"
          title="High rent burden can make a good-looking site fragile."
          description="A busy-looking unit can still struggle if fixed rent absorbs too much revenue. The danger is not just the rent level, but the pressure rent creates when trading is weaker than expected."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pressurePoints.map((item) => (
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
                Full viability check
              </p>

              <h2 className="text-3xl font-bold mb-4">
                Rent burden is only the first screen.
              </h2>

              <p className="text-sm text-stone-300 leading-7">
                YieldLens UK goes further by testing break-even customers,
                monthly cost base, upfront cash needed, cash after opening,
                downside revenue, monthly burn, and six-month survival.
              </p>
            </div>

            <div className="bg-white text-stone-900 rounded-lg p-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Break-even customers per day',
                  'Upfront cash and fit-out risk',
                  'Cash after opening',
                  'Downside monthly revenue',
                  'Monthly burn or surplus',
                  'Six-month survival test',
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-sm font-medium text-stone-800"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="rent_burden_page_cta_clicked"
                  pagePath="/commercial-rent-burden-calculator"
                  ctaLabel="Run full commercial lease check"
                  pageType="seo_tool"
                  className="bg-green-700 text-white px-5 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm text-center"
                >
                  Run full commercial lease check
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/viability-file"
                  eventName="rent_burden_page_cta_clicked"
                  pagePath="/commercial-rent-burden-calculator"
                  ctaLabel="View viability file"
                  pageType="seo_tool"
                  className="bg-white text-stone-700 border border-stone-300 px-5 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
                >
                  View viability file
                </TrackedCtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Before you sign"
          title="Use rent burden to decide what to challenge next."
          description="A high rent burden does not automatically mean avoid the site, and a low rent burden does not make the lease safe. It tells you which assumptions deserve closer testing."
        />

        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-stone-700">
            {[
              'Can expected revenue realistically support the rent?',
              'How many customers per day are needed to break even?',
              'Are staff, rates, utilities, insurance, and stock fully included?',
              'How much cash is needed before opening?',
              'What happens if revenue is lower than expected?',
              'Does the site survive six weak trading months?',
            ].map((item) => (
              <li
                key={item}
                className="bg-stone-50 border border-stone-200 rounded-lg p-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-green-50 border-y border-green-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
            Next step
          </p>

          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Pressure-test the full lease, not just the rent.
          </h2>

          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            The full commercial check connects rent burden to break-even
            customers, opening cash, downside trading, and six-month survival.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="rent_burden_page_cta_clicked"
              pagePath="/commercial-rent-burden-calculator"
              ctaLabel="Run full commercial lease check"
              pageType="seo_tool"
              className="bg-green-700 text-white px-6 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm"
            >
              Run full commercial lease check
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/commercial-lease-viability-check"
              eventName="rent_burden_page_cta_clicked"
              pagePath="/commercial-rent-burden-calculator"
              ctaLabel="View commercial lease viability guide"
              pageType="seo_tool"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              View commercial lease viability guide
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-stone-600 leading-6">
          <p className="font-semibold text-stone-800 mb-2">Important disclaimer</p>

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
