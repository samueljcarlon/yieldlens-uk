import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PropertyCashFlowTool from '@/components/PropertyCashFlowTool';

export const metadata: Metadata = {
  title: 'Property Cash Flow Calculator UK | YieldLens UK',
  description:
    'Use the YieldLens UK property cash flow calculator to estimate rental income, mortgage costs, service charge, ground rent, management fees, void allowance, and monthly cash flow.',
  alternates: {
    canonical: '/property-cash-flow-calculator',
  },
  openGraph: {
    title: 'Property Cash Flow Calculator UK | YieldLens UK',
    description:
      'Estimate rental property cash flow after mortgage costs, service charge, ground rent, management, maintenance, and void periods.',
    url: 'https://yieldlens.co.uk/property-cash-flow-calculator',
  },
};

const faqs = [
  {
    question: 'What is a property cash flow calculator?',
    answer:
      'A property cash flow calculator estimates rental income after regular property costs. YieldLens UK includes mortgage cost, service charge, ground rent, insurance, maintenance, management fees, void allowance, and other entered costs.',
  },
  {
    question: 'Is cash flow different from rental yield?',
    answer:
      'Yes. Rental yield compares annual rent with purchase price. Cash flow estimates whether rent leaves money after regular monthly costs.',
  },
  {
    question: 'Why include a void allowance?',
    answer:
      'A void allowance helps account for months where the property is empty and no rent is received. Ignoring void periods can make a deal look stronger than it is.',
  },
  {
    question: 'Is this financial advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It is not financial advice, mortgage advice, tax advice, legal advice, or a formal valuation.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
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
      name: 'Property Cash Flow Calculator',
      item: 'https://yieldlens.co.uk/property-cash-flow-calculator',
    },
  ],
};

const riskItems = [
  'Monthly cash flow is positive before void periods, but weak after a realistic vacancy allowance.',
  'Service charge or ground rent makes the property less attractive than the headline rent suggests.',
  'Mortgage payments absorb most of the rental income.',
  'Management fees and maintenance costs remove the monthly buffer.',
  'Gross yield looks fine, but cash flow is thin or negative.',
  'A small rent reduction or cost increase wipes out the return.',
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
    <div className="text-center mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
        {eyebrow}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-stone-500 max-w-2xl mx-auto leading-6">
          {description}
        </p>
      )}
    </div>
  );
}

export default function PropertyCashFlowCalculatorPage() {
  return (
    <div>
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-4">
            Property cash flow calculator UK
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 leading-tight mb-6">
            Check whether a rental property produces real monthly cash flow.
          </h1>

          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-8 leading-8">
            Use YieldLens UK to estimate rental property cash flow after mortgage
            costs, service charge, ground rent, insurance, maintenance, management
            fees, void periods, and other monthly costs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#calculator"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
            >
              Use cash flow calculator
            </a>

            <Link
              href="/buy-to-let-yield-calculator"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              Compare buy-to-let yield
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-5">
            Indicative decision-support only. Not a formal valuation or financial advice.
          </p>
        </div>
      </section>

      <section id="calculator" className="max-w-6xl mx-auto px-4 py-16">
        <PropertyCashFlowTool />
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why cash flow matters"
            title="A property can have a decent yield and still be a weak cash flow deal."
            description="Cash flow shows whether the rent leaves a real monthly surplus after regular costs. It is the practical reality check behind the headline yield."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <p className="text-sm font-semibold text-stone-900 mb-2">
                Rent is not profit
              </p>
              <p className="text-sm text-stone-600 leading-6">
                Mortgage cost, service charge, ground rent, repairs, management,
                and voids can remove much of the rental income.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <p className="text-sm font-semibold text-stone-900 mb-2">
                Thin buffers are fragile
              </p>
              <p className="text-sm text-stone-600 leading-6">
                A property with £20 monthly cash flow can become negative after one
                repair, higher rates, a service charge increase, or a void period.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <p className="text-sm font-semibold text-stone-900 mb-2">
                Void periods matter
              </p>
              <p className="text-sm text-stone-600 leading-6">
                Empty months are easy to ignore in a quick yield calculation, but
                they can materially change annual returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Risk flags"
          title="Common cash flow problems the calculator can expose."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskItems.map((item) => (
            <div
              key={item}
              className="bg-white border border-stone-200 rounded-xl p-5 text-sm text-stone-700 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Property cash flow calculator questions"
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-stone-50 border border-stone-200 rounded-xl p-5"
              >
                <h3 className="font-semibold text-stone-900 mb-2">
                  {faq.question}
                </h3>

                <p className="text-sm text-stone-600 leading-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
