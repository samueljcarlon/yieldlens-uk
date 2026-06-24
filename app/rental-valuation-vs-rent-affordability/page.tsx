import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import { disclaimerClass, heroSecondaryCtaClass, primaryCtaClass, surfaceCardClass, surfaceCardSoftClass, tableShellClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Rental Valuation vs Rent Affordability | YieldLens UK',
  description:
    'Understand the difference between rental valuation, rent affordability, cash flow, and commercial rent viability before relying on a rent figure.',
  alternates: {
    canonical: '/rental-valuation-vs-rent-affordability',
  },
  openGraph: {
    title: 'Rental Valuation vs Rent Affordability | YieldLens UK',
    description:
      'Understand the difference between rental valuation, rent affordability, cash flow, and commercial rent viability before relying on a rent figure.',
    url: 'https://yieldlens.co.uk/rental-valuation-vs-rent-affordability',
  },
};

const faqItems = [
  {
    question: 'Does YieldLens provide rental valuations?',
    answer:
      'No. YieldLens UK does not provide a valuation. It pressure-tests whether the entered rent and costs work for the tenant or business model.',
  },
  {
    question: 'What is a rental valuation?',
    answer:
      'A rental valuation estimates what rent a property might achieve in the market based on comparable evidence and valuation judgment.',
  },
  {
    question: 'What is the difference between valuation and affordability?',
    answer:
      'A valuation asks what the market might pay. An affordability check asks whether the tenant, business, or ownership structure can carry that rent in practice.',
  },
  {
    question: 'Can a market rent still be unaffordable?',
    answer:
      'Yes. A rent can be normal for the area and still be too heavy for the tenant once cash flow, costs, setup cash, or downside trading are considered.',
  },
  {
    question: 'Which YieldLens tool should I use?',
    answer:
      'Use the residential affordability check for tenant affordability, the buy-to-let yield and cash flow tools for residential property, and the commercial affordability or viability tools for business premises.',
  },
  {
    question: 'Should I still speak to a professional?',
    answer:
      'Yes. YieldLens structures the numbers and questions, but it does not replace an agent, solicitor, accountant, surveyor, or other professional due diligence.',
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

const comparisonRows = [
  {
    question: 'Rental valuation',
    answer: 'Estimates what rent the property might achieve in the market.',
    user: 'Owners, agents, valuers, landlords',
    tool: 'YieldLens does not provide a valuation.',
  },
  {
    question: 'Rent affordability',
    answer: 'Checks whether the tenant can reasonably carry the rent.',
    user: 'Tenants, renters, first-time movers',
    tool: {
      label: 'Rent affordability check',
      href: '/rent-affordability-check',
    },
  },
  {
    question: 'Buy-to-let yield',
    answer: 'Checks rental return against purchase price.',
    user: 'Residential investors',
    tool: {
      label: 'Buy-to-let yield calculator',
      href: '/buy-to-let-yield-calculator',
    },
  },
  {
    question: 'Property cash flow',
    answer: 'Checks whether rent covers financing and ownership costs.',
    user: 'Residential investors and landlords',
    tool: {
      label: 'Property cash flow calculator',
      href: '/property-cash-flow-calculator',
    },
  },
  {
    question: 'Commercial rent affordability',
    answer: 'Checks whether a business can carry the rent and opening costs.',
    user: 'Cafe, restaurant, salon, retail, and similar operators',
    tool: {
      label: 'Commercial rent affordability calculator',
      href: '/commercial-rent-affordability-calculator',
    },
  },
  {
    question: 'Commercial lease viability',
    answer: 'Checks whether the lease, costs, cash, and downside trading still look workable.',
    user: 'Commercial tenants before committing',
    tool: {
      label: 'Commercial lease viability check',
      href: '/commercial-lease-viability-check',
    },
  },
];

const residentialExamplePoints = [
  'Expected rent: £1,800/month',
  'Mortgage and ownership costs: £1,550/month',
  'Monthly cash flow: £250',
  'Gross yield still depends on the purchase price',
];

const tenantExamplePoints = [
  'Monthly rent: £1,800',
  'Monthly income: £4,800',
  'Rent-to-income ratio: 37.5%',
  'A market-normal rent can still be stretched for the tenant',
];

const commercialExamplePoints = [
  'Annual rent: £60,000',
  'Monthly rent: £5,000',
  'Expected monthly revenue: £24,960',
  'Rent burden: 20.0%',
  'Break-even customers/day: 45.2',
  'Opening buffer: £9,000',
];

const toolCards = [
  {
    title: 'Residential tenant affordability',
    text: 'Check whether monthly rent fits income and regular costs.',
    href: '/rent-affordability-check',
  },
  {
    title: 'Residential buy-to-let return',
    text: 'Screen yield and cash flow on a rental property purchase.',
    href: '/buy-to-let-yield-calculator',
  },
  {
    title: 'Residential property cash flow',
    text: 'Check whether ownership costs still leave a monthly surplus.',
    href: '/property-cash-flow-calculator',
  },
  {
    title: 'Commercial rent affordability',
    text: 'Check whether a business can carry the rent before signing.',
    href: '/commercial-rent-affordability-calculator',
  },
  {
    title: 'Commercial lease viability',
    text: 'Check rent burden, break-even, opening cash, and downside trading.',
    href: '/commercial-lease-viability-check',
  },
  {
    title: 'Sample commercial file',
    text: 'See the paid file structure before unlocking it.',
    href: '/sample-commercial-viability-file',
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
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">{title}</h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
    </div>
  );
}

export default function RentalValuationVsRentAffordabilityPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <JsonLd data={faqStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/rental-valuation-vs-rent-affordability"
        pageType="bridge_page"
        mode="mixed"
        eventLabel="Rental valuation vs rent affordability viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
                Rental valuation vs rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                A rent figure is not the same as a rent decision.
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Rental valuation, rent affordability, cash flow, and commercial lease viability answer different questions. YieldLens helps pressure-test whether the numbers work before you rely on them.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check"
                  className={primaryCtaClass}
                  eventName="bridge_page_cta_clicked"
                  pagePath="/rental-valuation-vs-rent-affordability"
                  ctaLabel="Run a free check"
                  pageType="bridge_page"
                >
                  Run a free check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/commercial-rent-affordability-calculator"
                  className={heroSecondaryCtaClass}
                  eventName="bridge_page_cta_clicked"
                  pagePath="/rental-valuation-vs-rent-affordability"
                  ctaLabel="Commercial rent affordability calculator"
                  pageType="bridge_page"
                >
                  Commercial rent affordability calculator
                </TrackedCtaLink>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative property pressure-tests and decision-support analysis only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/5 p-5 sm:p-6`}>
              <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-3">
                Core distinction
              </p>
              <p className="text-2xl font-bold leading-tight text-white">
                A valuation estimates market rent. A pressure test asks whether the rent works for the person or business.
              </p>
              <p className="mt-4 text-sm text-stone-300 leading-7">
                That difference matters when the market rent feels normal, but the tenant affordability, cash flow, opening cash, or downside trading still makes the decision fragile.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className={`${surfaceCardSoftClass} bg-white/5 border-white/10 p-4`}>
                  <p className="text-xs uppercase tracking-widest text-teal-300 mb-1">Valuation</p>
                  <p className="text-stone-200">What rent might the market support?</p>
                </div>
                <div className={`${surfaceCardSoftClass} bg-white/5 border-white/10 p-4`}>
                  <p className="text-xs uppercase tracking-widest text-teal-300 mb-1">Affordability</p>
                  <p className="text-stone-200">Can the user or business carry that rent?</p>
                </div>
                <div className={`${surfaceCardSoftClass} bg-white/5 border-white/10 p-4`}>
                  <p className="text-xs uppercase tracking-widest text-teal-300 mb-1">Viability</p>
                  <p className="text-stone-200">Does the deal still work after costs and downside trading?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Quick answer"
          title="The same rent figure can mean different things to different people."
          description="A rental valuation estimates market rent. A rent affordability check asks whether a tenant can carry that rent. A buy-to-let check asks whether rent covers ownership costs. A commercial viability check asks whether the business can survive the lease."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className={`${surfaceCardClass} p-6`}>
            <ul className="space-y-3 text-sm text-stone-700 leading-7">
              <li>A rental valuation estimates market rent.</li>
              <li>A rent affordability check asks whether a tenant can carry the rent.</li>
              <li>A buy-to-let cash flow check asks whether rent covers mortgage and ownership costs.</li>
              <li>A commercial rent viability check asks whether a business can carry rent, setup cash, and downside trading.</li>
              <li>YieldLens does not provide a valuation.</li>
            </ul>
          </div>

          <div className={`${surfaceCardClass} bg-stone-950 p-6 text-white`}>
            <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-3">
              When to use this page
            </p>
            <p className="text-lg font-semibold leading-8">
              Use this page if you searched for rent valuation but actually need to know whether the rent makes sense for the tenant, landlord, investor, or business model.
            </p>
            <p className="mt-4 text-sm text-stone-300 leading-7">
              YieldLens helps pressure-test assumptions, then points you to the right residential or commercial tool.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Comparison table"
            title="Different questions need different tools."
            description="The same rent figure can be useful for market comparison, affordability screening, cash-flow analysis, or lease viability. The table below shows which YieldLens tool fits each job."
          />

          <div className={tableShellClass}>
            <table className="min-w-full text-sm">
              <thead className="bg-stone-50 text-stone-700">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Question</th>
                  <th className="px-4 py-4 text-left font-semibold">What it answers</th>
                  <th className="px-4 py-4 text-left font-semibold">Who uses it</th>
                  <th className="px-4 py-4 text-left font-semibold">YieldLens tool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {comparisonRows.map((row) => (
                  <tr key={row.question} className="align-top">
                    <td className="px-4 py-4 font-medium text-stone-900">{row.question}</td>
                    <td className="px-4 py-4 text-stone-600 leading-6">{row.answer}</td>
                    <td className="px-4 py-4 text-stone-600 leading-6">{row.user}</td>
                    <td className="px-4 py-4 text-stone-700 leading-6">
                      {typeof row.tool === 'string' ? (
                        row.tool
                      ) : (
                        <Link href={row.tool.href} className="text-teal-700 font-medium hover:text-teal-800">
                          {row.tool.label}
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Why valuation alone is not enough"
          title="A rent can look normal in the market and still be the wrong decision."
          description="The market figure is only one part of the question. The user still needs to check affordability, cash flow, opening costs, and the lease terms that can change the real burden."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${surfaceCardClass} p-6`}>
            <p className="text-sm font-semibold text-stone-900 mb-3">When it goes wrong</p>
            <ul className="space-y-3 text-sm text-stone-600 leading-7">
              <li>The tenant cannot afford the rent after other costs are included.</li>
              <li>The landlord assumes a rent figure that ignores practical affordability.</li>
              <li>The investor ignores mortgage cost, service charge, repairs, voids, or tax.</li>
              <li>The commercial tenant ignores staff, rates, utilities, fit-out, deposit, and downside trading.</li>
              <li>The lease terms create hidden pressure that does not show up in a headline rent figure.</li>
            </ul>
          </div>

          <div className={`${surfaceCardClass} bg-stone-950 p-6 text-white`}>
            <p className="text-sm font-semibold text-white mb-3">What YieldLens does instead</p>
            <p className="text-sm text-stone-300 leading-7">
              YieldLens turns the entered assumptions into a pressure test. That means rent burden, affordability, cash flow, and downside trading are checked before the user relies on the figure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Examples"
            title="The same figure can tell a different story depending on the use case."
            description="These fictional examples show why a rent figure alone is not enough to make a decision."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className={`${surfaceCardSoftClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-3">Residential example</p>
              <ul className="space-y-2 text-sm text-stone-600 leading-7">
                {residentialExamplePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-stone-700 leading-7">
                The rent may look reasonable, but the decision still depends on cash flow, costs, voids, and financing.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/property-cash-flow-calculator" className="text-sm font-medium text-teal-700 hover:text-teal-800">
                  Property cash flow calculator
                </Link>
                <span className="text-stone-300">·</span>
                <Link href="/buy-to-let-yield-calculator" className="text-sm font-medium text-teal-700 hover:text-teal-800">
                  Buy-to-let yield calculator
                </Link>
              </div>
            </div>

            <div className={`${surfaceCardSoftClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-3">Tenant affordability example</p>
              <ul className="space-y-2 text-sm text-stone-600 leading-7">
                {tenantExamplePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-stone-700 leading-7">
                A market-normal rent can still be stretched if income, deposits, or other commitments leave too little buffer.
              </p>
              <div className="mt-5">
                <Link href="/rent-affordability-check" className="text-sm font-medium text-teal-700 hover:text-teal-800">
                  Rent affordability check
                </Link>
              </div>
            </div>

            <div className={`${surfaceCardSoftClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-3">Commercial example</p>
              <ul className="space-y-2 text-sm text-stone-600 leading-7">
                {commercialExamplePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-stone-700 leading-7">
                The rent may be a market rent, but the business still needs to test rent burden, break-even customers, upfront cash, downside trading, and lease terms.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/commercial-rent-affordability-calculator" className="text-sm font-medium text-teal-700 hover:text-teal-800">
                  Commercial rent affordability calculator
                </Link>
                <span className="text-stone-300">·</span>
                <Link href="/commercial-lease-viability-check" className="text-sm font-medium text-teal-700 hover:text-teal-800">
                  Commercial lease viability check
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What it can and cannot do"
          title="Use the right tool for the question."
          description="YieldLens is designed to structure the numbers and the questions. It is not designed to replace specialist advice or specialist valuation work."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${surfaceCardClass} p-6`}>
            <p className="text-sm font-semibold text-stone-900 mb-3">Can</p>
            <ul className="space-y-2 text-sm text-stone-600 leading-7">
              <li>Structure rent and cash-flow assumptions</li>
              <li>Calculate affordability ratios</li>
              <li>Estimate gross yield</li>
              <li>Estimate cash flow</li>
              <li>Pressure-test commercial rent burden</li>
              <li>Calculate break-even customers/day</li>
              <li>Test opening cash and downside trading</li>
              <li>Organise questions before due diligence</li>
            </ul>
          </div>

          <div className={`${surfaceCardClass} bg-stone-950 p-6 text-white`}>
            <p className="text-sm font-semibold text-white mb-3">Cannot</p>
            <ul className="space-y-2 text-sm text-stone-300 leading-7">
              <li>Value a property</li>
              <li>Verify market rent</li>
              <li>Inspect a property</li>
              <li>Review lease documents</li>
              <li>Give financial advice</li>
              <li>Give legal advice</li>
              <li>Replace professional due diligence</li>
            </ul>
            <p className="mt-4 text-xs text-stone-400 leading-6">
              YieldLens UK provides indicative property pressure-tests and decision-support analysis only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Which tool should you use?"
            title="Choose the question, then use the matching tool."
            description="These cards point users to the most relevant YieldLens page without making them guess which calculator is appropriate."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {toolCards.map((card) => (
              <div key={card.title} className={`${surfaceCardSoftClass} p-6`}>
                <p className="text-sm font-semibold text-stone-900 mb-2">{card.title}</p>
                <p className="text-sm text-stone-600 leading-7">{card.text}</p>
                <div className="mt-4">
                  <Link href={card.href} className="text-sm font-medium text-teal-700 hover:text-teal-800">
                    {card.href}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="FAQ"
          title="Common questions about rental valuation and affordability."
          description="Short answers that keep the distinction clear and point users to the right YieldLens tool."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {faqItems.map((item) => (
            <div key={item.question} className={`${surfaceCardClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-3">{item.question}</p>
              <p className="text-sm text-stone-600 leading-7">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
            Final step
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            Do not stop at the rent figure.
          </h2>
          <p className="text-stone-300 max-w-3xl leading-8 mb-8">
            Use YieldLens to pressure-test whether the rent works in context, from tenant affordability to commercial lease viability.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check"
              className={primaryCtaClass}
              eventName="bridge_page_cta_clicked"
              pagePath="/rental-valuation-vs-rent-affordability"
              ctaLabel="Run a free check"
              pageType="bridge_page"
            >
              Run a free check
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/commercial-rent-affordability-calculator"
              className={heroSecondaryCtaClass}
              eventName="bridge_page_cta_clicked"
              pagePath="/rental-valuation-vs-rent-affordability"
              ctaLabel="Commercial rent affordability calculator"
              pageType="bridge_page"
            >
              Commercial rent affordability
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              className={heroSecondaryCtaClass}
              eventName="bridge_page_cta_clicked"
              pagePath="/rental-valuation-vs-rent-affordability"
              ctaLabel="View sample commercial file"
              pageType="bridge_page"
            >
              View sample commercial file
            </TrackedCtaLink>
          </div>
        </div>
      </section>
    </div>
  );
}
