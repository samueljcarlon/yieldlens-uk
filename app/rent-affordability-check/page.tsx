import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import RentAffordabilityTool from '@/components/RentAffordabilityTool';
import ToolConversionPanel from '@/components/ToolConversionPanel';

export const metadata: Metadata = {
  title: 'Rent Affordability Calculator UK | YieldLens UK',
  description:
    'Use the YieldLens UK rent affordability calculator to estimate rent-to-income ratio, housing cost pressure, disposable income, and monthly rent risk.',
  alternates: {
    canonical: '/rent-affordability-check',
  },
  openGraph: {
    title: 'Rent Affordability Calculator UK | YieldLens UK',
    description:
      'Estimate whether monthly rent looks comfortable, manageable, stretched, or high risk using income, bills, council tax, transport, and commitments.',
    url: 'https://yieldlens.co.uk/rent-affordability-check',
  },
};

const faqs = [
  {
    question: 'How much rent can I afford?',
    answer:
      'A quick way to screen affordability is to compare monthly rent with monthly take-home income, then add bills, council tax, transport, and regular commitments. YieldLens UK shows rent-to-income ratio, housing cost ratio, disposable income, and a simple verdict.',
  },
  {
    question: 'Should rent be 30% of income?',
    answer:
      'The 30% rent-to-income figure is a rough screening guide, not a rule. Some people can manage more, while others need a lower ratio because of bills, debt, travel costs, deposits, or unstable income.',
  },
  {
    question: 'Does the calculator include bills?',
    answer:
      'Yes. You can add estimated bills, council tax, transport, debt payments, and other monthly costs to see a more realistic picture than rent alone.',
  },
  {
    question: 'Is this financial advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It is not financial advice, debt advice, legal advice, or a substitute for professional guidance.',
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
      name: 'Rent Affordability Calculator',
      item: 'https://yieldlens.co.uk/rent-affordability-check',
    },
  ],
};

const useCases = [
  'Checking if a flat is affordable',
  'Comparing London rental options',
  'Understanding rent-to-income pressure',
  'Checking bills and council tax impact',
];

const riskItems = [
  'Rent looks affordable before bills, but stretched after council tax and utilities.',
  'Transport or commuting costs make the property less affordable than expected.',
  'Debt payments or regular commitments reduce the monthly buffer.',
  'A deposit, moving costs, or furniture spend makes the first months expensive.',
  'Rent takes too much of take-home income and leaves little emergency buffer.',
  'The property is manageable only if all other costs stay unusually low.',
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

export default function RentAffordabilityCheckPage() {
  return (
    <div>
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-4">
            Rent affordability calculator UK
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 leading-tight mb-6">
            Check how much rent you can afford before you commit.
          </h1>

          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-8 leading-8">
            Use YieldLens UK to estimate rent-to-income ratio, total housing cost
            pressure, disposable income, and whether a rent looks comfortable,
            manageable, stretched, or high risk.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#calculator"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
            >
              Use rent affordability calculator
            </a>

            <Link
              href="/property-cash-flow-calculator"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              Compare property cash flow tool
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-5">
            Indicative decision-support only. Not financial advice or debt advice.
          </p>
        </div>
      </section>

      <section id="calculator" className="max-w-6xl mx-auto px-4 py-16">
        <RentAffordabilityTool />

        <div className="mt-8">
          <ToolConversionPanel
            sourceTool="rent_affordability"
            title="Want to check the property itself, not just the rent?"
            description="The rent affordability calculator checks your monthly pressure. The full residential check looks at the property numbers, rent assumptions, ownership costs, yield, cash flow, and downside risk."
            primaryLabel="Run full residential check"
            primaryHref="/check?mode=residential"
            secondaryLabel="Compare property cash flow"
            secondaryHref="/property-cash-flow-calculator"
          />
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why rent affordability matters"
            title="Rent alone is not the full monthly cost."
            description="A property can look affordable until bills, council tax, transport, debt payments, moving costs, and emergency savings are included."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <p className="text-sm font-semibold text-stone-900 mb-2">
                Rent-to-income ratio
              </p>
              <p className="text-sm text-stone-600 leading-6">
                Shows how much of monthly take-home income goes directly to rent.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <p className="text-sm font-semibold text-stone-900 mb-2">
                Housing cost ratio
              </p>
              <p className="text-sm text-stone-600 leading-6">
                Adds bills and council tax to show a more realistic housing cost burden.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <p className="text-sm font-semibold text-stone-900 mb-2">
                Disposable income
              </p>
              <p className="text-sm text-stone-600 leading-6">
                Shows what is left after rent, bills, transport, commitments, and other entered costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Who it is for"
          title="Useful when comparing rental options."
          description="The calculator is designed for quick screening before you book viewings, pay a holding deposit, or commit to a tenancy."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((item) => (
            <div
              key={item}
              className="bg-white border border-stone-200 rounded-xl p-5 text-sm font-medium text-stone-800 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Risk flags"
            title="Common affordability problems the calculator can expose."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskItems.map((item) => (
              <div
                key={item}
                className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-sm text-stone-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="FAQ"
          title="Rent affordability calculator questions"
        />

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
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
      </section>
    </div>
  );
}
