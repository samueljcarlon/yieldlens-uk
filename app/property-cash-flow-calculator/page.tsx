import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PropertyCashFlowTool from '@/components/PropertyCashFlowTool';
import ToolConversionPanel from '@/components/ToolConversionPanel';
import { heroPrimaryCtaClass, surfaceCardClass, surfaceCardSoftClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Property Cash Flow Calculator | Rent, Costs and Monthly Surplus | YieldLens UK',
  description:
    'Check whether rental income still leaves monthly surplus after mortgage, service charge, ground rent, insurance, maintenance, management fees, and void periods. YieldLens UK does not provide a valuation.',
  alternates: {
    canonical: '/property-cash-flow-calculator',
  },
  openGraph: {
    title: 'Property Cash Flow Calculator | Rent, Costs and Monthly Surplus | YieldLens UK',
    description:
      'Check whether rental income still leaves monthly surplus after mortgage costs, service charge, ground rent, management, maintenance, and void periods.',
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
      'No. YieldLens UK provides indicative decision-support only. It is not financial advice, mortgage advice, tax advice, legal advice, or a valuation.',
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
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';

  return (
    <div className="text-center mb-10">
      <p className={`text-xs font-medium uppercase tracking-widest mb-3 ${isDark ? 'text-[#DCCDA8]' : 'text-[var(--yieldlens-caution)]'}`}>
        {eyebrow}
      </p>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-sm max-w-2xl mx-auto leading-6 ${isDark ? 'text-stone-300' : 'text-[var(--yieldlens-muted)]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function accentClass(index: number) {
  const accents = [
    'border-l-[var(--yieldlens-caution)]',
    'border-l-[var(--yieldlens-primary)]',
    'border-l-[var(--yieldlens-positive)]',
    'border-l-[var(--yieldlens-fragile)]',
    'border-l-[var(--yieldlens-risk)]',
  ];
  return accents[index % accents.length];
}

export default function PropertyCashFlowCalculatorPage() {
  return (
    <div className="bg-[var(--yieldlens-page)]">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />

      <section className="bg-[var(--yieldlens-panel)] border-b border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-4">
            Property cash flow calculator UK
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 leading-tight mb-6">
            Check whether a rental property produces real monthly cash flow.
          </h1>
          <p className="text-lg text-[var(--yieldlens-muted)] max-w-3xl mx-auto mb-8 leading-8">
            Cash flow is different from rental valuation. Use YieldLens UK to
            estimate rental property cash flow after mortgage costs, service
            charge, ground rent, insurance, maintenance, management fees, void
            periods, and other monthly costs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#calculator"
              className="bg-[var(--yieldlens-primary)] text-white px-6 py-3 rounded font-medium hover:bg-[var(--yieldlens-primary-hover)] transition-colors text-sm"
            >
              Use cash flow calculator
            </a>
            <Link
              href="/buy-to-let-yield-calculator"
              className="bg-white text-stone-700 border border-[var(--yieldlens-border)] px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              Compare buy-to-let yield
            </Link>
          </div>

          <p className="text-xs text-[var(--yieldlens-muted)] mt-5">
            Indicative decision-support only. Not a valuation or financial advice.
          </p>
        </div>
      </section>

      <section id="calculator" className="max-w-6xl mx-auto px-4 py-16">
        <PropertyCashFlowTool />
        <div className="mt-8">
          <ToolConversionPanel
            sourceTool="property_cash_flow"
            title="Want a fuller property return check?"
            description="The cash flow calculator checks whether rent survives regular costs. The full residential check saves a property-specific result with yield, risk flags, assumptions, downside pressure, and a viability file request option."
            primaryLabel="Run full residential check"
            primaryHref="/check?mode=residential"
            secondaryLabel="Compare buy-to-let yield"
            secondaryHref="/buy-to-let-yield-calculator"
          />
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why cash flow matters"
            title="A property can have a decent yield and still be a weak cash flow deal."
            description="Cash flow shows whether the rent leaves a real monthly surplus after regular costs. It is the practical reality check behind the headline yield."
            tone="dark"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white mb-2">Rent is not profit</p>
              <p className="text-sm text-stone-300 leading-6">
                Mortgage cost, service charge, ground rent, repairs, management, and
                voids can remove much of the rental income.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white mb-2">Thin buffers are fragile</p>
              <p className="text-sm text-stone-300 leading-6">
                A property with £20 monthly cash flow can become negative after one
                repair, higher rates, a service charge increase, or a void period.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white mb-2">Void periods matter</p>
              <p className="text-sm text-stone-300 leading-6">
                Empty months are easy to ignore in a quick yield calculation, but
                they can materially change annual returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Risk flags"
          title="Common cash flow problems the calculator can expose."
          description="The free check is designed to show where a property could disappoint before you waste time on a poor deal."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskItems.map((item, index) => (
            <div
              key={item}
              className={`bg-white border border-[var(--yieldlens-border)] rounded-2xl p-5 text-sm text-stone-700 shadow-sm border-l-4 ${accentClass(index)}`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Property cash flow calculator questions"
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className={`bg-white border border-[var(--yieldlens-border)] rounded-2xl p-5 border-l-4 ${accentClass(
                  faqs.findIndex((item) => item.question === faq.question)
                )}`}
              >
                <h3 className="font-semibold text-stone-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
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
