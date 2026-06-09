import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Property Viability File UK | YieldLens UK',
  description:
    'See what a YieldLens UK property viability file includes, including risk flags, downside checks, cash flow pressure, commercial rent burden, and decision questions.',
  alternates: {
    canonical: '/viability-file',
  },
  openGraph: {
    title: 'Property Viability File UK | YieldLens UK',
    description:
      'A structured property decision file for pressure-testing residential and commercial property decisions before committing.',
    url: 'https://yieldlens.co.uk/viability-file',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a YieldLens UK viability file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A YieldLens UK viability file is a structured property decision file that expands on the free check by organising the key metrics, risk flags, downside assumptions, missing data, and decision questions in one place.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a viability file a formal valuation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A viability file is indicative decision-support only. It is not a formal valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use it before signing a lease or buying a property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The file is designed to help users organise the main checks before committing more time, money, legal fees, or negotiation effort.',
      },
    },
  ],
};

const residentialItems = [
  'Headline yield and cash flow summary',
  'Ownership cost pressure, including mortgage cost, service charge, and ground rent',
  'Void period and maintenance risk',
  'Comparable rent evidence checklist',
  'Downside scenario questions',
  'Missing data warnings',
];

const commercialItems = [
  'Rent burden and monthly cost pressure',
  'Break-even customers per day',
  'Fit-out and upfront capital risk',
  'Downside trading scenario',
  'Lease questions, including break clauses and repairing obligations',
  'Footfall, competition, and local demand checklist',
];

const notIncluded = [
  'Formal valuation',
  'Legal advice',
  'Mortgage advice',
  'Tax advice',
  'Guaranteed investment recommendation',
  'Replacement for professional due diligence',
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

export default function ViabilityFilePage() {
  return (
    <div>
      <JsonLd data={faqStructuredData} />

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-4">
            Property viability file
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 leading-tight mb-6">
            Turn a quick property result into a structured decision file.
          </h1>

          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-8 leading-8">
            A YieldLens UK viability file organises the key numbers, assumptions,
            risks, missing data, and next checks before you commit to a property,
            lease, rental decision, or investment.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/check"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
            >
              Run free property check
            </Link>

            <Link
              href="/commercial-lease-viability-check"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              Commercial lease check
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-5">
            Indicative decision-support only. Not a formal valuation or professional advice.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Why it exists"
          title="The free check gives the signal. The viability file organises the decision."
          description="The point is not to produce generic commentary. The point is to make the key property risks harder to ignore."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <p className="font-semibold text-stone-900 mb-2">Clarify the numbers</p>
            <p className="text-sm text-stone-600 leading-6">
              Summarise the key return, affordability, rent burden, cash flow, or break-even metrics.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <p className="font-semibold text-stone-900 mb-2">Expose weak assumptions</p>
            <p className="text-sm text-stone-600 leading-6">
              Highlight where the result depends on optimistic rent, low costs, strong demand, or missing data.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <p className="font-semibold text-stone-900 mb-2">Structure next checks</p>
            <p className="text-sm text-stone-600 leading-6">
              Turn the result into a practical checklist before negotiations, viewings, legal work, or further due diligence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Residential version"
            title="For rental, buy-to-let, and residential property decisions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {residentialItems.map((item) => (
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
          eyebrow="Commercial version"
          title="For commercial lease and site viability decisions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commercialItems.map((item) => (
            <div
              key={item}
              className="bg-white border border-stone-200 rounded-xl p-5 text-sm text-stone-700 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Important limits"
            title="What it is not"
            description="This distinction matters. YieldLens UK is a decision-support system, not a regulated advice service."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notIncluded.map((item) => (
              <div
                key={item}
                className="bg-white/5 border border-white/10 rounded-xl p-5 text-sm text-stone-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-50 border-y border-teal-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-3">
            Start free
          </p>

          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Run a free check first, then request a fuller viability file from your result.
          </h2>

          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            The free check gives you the initial score, metrics, risk flags, assumptions,
            and next steps. The viability file is the next layer for users who want
            the decision organised more clearly.
          </p>

          <Link
            href="/check"
            className="inline-block bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
          >
            Run free property check
          </Link>
        </div>
      </section>
    </div>
  );
}
