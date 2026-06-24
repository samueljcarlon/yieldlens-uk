import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'Standard Commercial Viability File | YieldLens UK',
  description:
    'Turn a free commercial check into a £49 decision memo covering rent burden, break-even customers, opening cash, downside trading, negotiation levers, and the evidence to verify before committing.',
  alternates: {
    canonical: '/viability-file',
  },
  openGraph: {
    title: 'Standard Commercial Viability File | YieldLens UK',
    description:
      'A £49 decision-support file for pressure-testing commercial rent, cash, downside trading, and lease viability before signing.',
    url: 'https://yieldlens.co.uk/viability-file',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a YieldLens UK commercial viability file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A YieldLens UK commercial viability file is a structured decision-support file that organises the key lease metrics, risk flags, downside assumptions, missing evidence, lease questions, and recommended next checks in one place.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a viability file a valuation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A viability file is indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I request a full viability file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run a free commercial check first. From the results page, users can unlock the Standard commercial viability file or view the sample file for the latest saved result.',
      },
    },
  ],
};

const commercialFileItems = [
  'Executive summary and verdict',
  'Rent burden and break-even customers',
  'Opening cash and six-month survival',
  'Downside trading stress test',
  'Negotiation levers',
  'Evidence checklist before signing',
];

const survivalMetrics = [
  {
    label: 'Rent burden',
    value: '20%',
    helper: 'Rent as a share of expected monthly revenue',
  },
  {
    label: 'Break-even/day',
    value: '45',
    helper: 'Customers needed per day to cover known costs',
  },
  {
    label: 'Upfront cash',
    value: '£81k',
    helper: 'Fit-out, deposit, legal fees, stock, and setup',
  },
  {
    label: 'Cash after opening',
    value: '£9k',
    helper: 'Starting cash minus upfront cash needed',
  },
  {
    label: 'Downside burn',
    value: '£0',
    helper: 'Monthly burn in the downside case',
  },
  {
    label: 'Six-month test',
    value: 'Pass',
    helper: 'Whether the site survives six weak trading months',
  },
];

const workflowSteps = [
  {
    step: '1',
    title: 'Run a free commercial check',
    text: 'Enter rent, trading assumptions, known costs, upfront cash items, starting cash, and downside revenue.',
  },
  {
    step: '2',
    title: 'Review the saved result',
    text: 'The results page shows the score, rent burden, break-even customers, upfront cash, downside case, risk flags, and next steps.',
  },
  {
    step: '3',
    title: 'Unlock the Standard file for £49',
    text: 'Use the saved result to unlock the fuller viability file or view the sample file.',
  },
];

const compareRows = [
  ['Rent burden', 'Headline numbers and risk flags', 'Detailed interpretation with next checks'],
  ['Break-even customers/day', 'Shown', 'Shown with context and evidence prompts'],
  ['Monthly revenue and cost base', 'Shown', 'Shown and explained'],
  ['Opening cash needed', 'Shown', 'Shown with buffer or shortfall framing'],
  ['Downside trading', 'Shown', 'Shown with survival context'],
  ['Stress-test scenarios', 'Not included', 'Included'],
  ['Negotiation levers', 'Not included', 'Included'],
  ['Lease questions', 'Not included', 'Included'],
  ['Due diligence checklist', 'Not included', 'Included'],
  ['Ranked action plan', 'Not included', 'Included'],
  ['Printable file', 'Not included', 'Included'],
];

const notIncluded = [
  'Valuation',
  'Financial advice',
  'Mortgage advice',
  'Legal advice',
  'Tax advice',
  'Debt advice',
  'Broker input',
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
    <div className="mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
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

export default function ViabilityFilePage() {
  return (
    <div className="bg-stone-50">
      <JsonLd data={faqStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/viability-file"
        pageType="product_page"
        mode="commercial"
        eventLabel="Viability file page viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
                Standard commercial viability file
              </p>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Turn a commercial lease check into a decision memo before you sign.
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Get a structured £49 viability file showing rent burden,
                break-even customers, opening cash, downside trading,
                negotiation levers, and the evidence to verify before
                committing.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="viability_file_page_cta_clicked"
                  pagePath="/viability-file"
                  ctaLabel="Run a free commercial check first"
                  pageType="product_page"
                  className="bg-teal-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-teal-400 transition-colors text-sm text-center"
                >
                  Run a free commercial check first
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="viability_file_page_cta_clicked"
                  pagePath="/viability-file"
                  ctaLabel="View sample file"
                  pageType="product_page"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                  >
                  View sample file
                </TrackedCtaLink>

                <Link
                  href="/how-it-works"
                  className="text-sm font-medium text-teal-300 hover:text-teal-200 self-center sm:self-auto"
                >
                  How it works
                </Link>
              </div>

              <p className="text-xs text-stone-400 mt-5">
                Indicative decision-support only. Not advice, not a valuation, and not a substitute for professional due diligence.
              </p>

              <p className="text-xs text-stone-400 mt-3">
                Checkout appears after a commercial report request.
              </p>
            </div>

              <div className="bg-white text-stone-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-stone-200">
                <p className="text-xs uppercase tracking-widest text-teal-700 font-semibold">
                  Example commercial file
                </p>
                <p className="text-2xl font-bold mt-1">
                  Needs caution: rent burden is high and the opening buffer is thin.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {survivalMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border-b border-stone-200 p-4 sm:odd:border-r"
                  >
                    <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-bold text-stone-900 mt-1">
                      {metric.value}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 leading-5">
                      {metric.helper}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-stone-50">
                <p className="text-sm text-stone-700 leading-6">
                  The downside month covers known operating costs, but a £9k opening buffer is thin relative to setup risk and early trading friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What it can include"
          title="What the £49 file gives you."
          description="The paid version turns the free check into a printable decision memo. It keeps the main numbers visible, then adds the interpretation, stress tests, and questions that help with negotiation and due diligence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commercialFileItems.map((item) => (
            <div
              key={item}
              className="bg-white border border-stone-200 rounded-3xl p-5 text-sm font-medium text-stone-800 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Free vs paid"
            title="The free check gives the numbers. The paid file turns them into a decision memo."
            description="The comparison below keeps the offer honest. The free check is the screen. The paid file is the printable pressure-test and action plan."
          />

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left">
                  <th className="px-4 py-3 font-semibold text-stone-700">What you get</th>
                  <th className="px-4 py-3 font-semibold text-stone-700">Free check</th>
                  <th className="px-4 py-3 font-semibold text-stone-700">Standard file, £49</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(([label, freeValue, paidValue]) => (
                  <tr key={label} className="border-b border-stone-100 align-top">
                    <td className="px-4 py-3 font-medium text-stone-950">{label}</td>
                    <td className="px-4 py-3 text-stone-700 leading-6">{freeValue}</td>
                    <td className="px-4 py-3 text-stone-700 leading-6">{paidValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="How the flow works"
          title="Free check first. Fuller file after there is a saved result."
          description="The viability file is tied to a specific saved check. That keeps the output grounded in the rent, costs, opening cash, and downside trading assumptions entered for the site. Checkout appears after the commercial report request."
        />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {workflowSteps.map((item) => (
              <div
                key={item.step}
                className="bg-stone-50 border border-stone-200 rounded-3xl p-6 shadow-sm"
              >
                <p className="w-9 h-9 rounded-full bg-teal-700 text-white text-sm font-semibold flex items-center justify-center mb-5">
                  {item.step}
                </p>

                <h3 className="font-semibold text-stone-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-stone-600 leading-6">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="Run a free commercial check first"
              pageType="product_page"
              className="bg-teal-700 text-white px-5 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm text-center"
              >
              Run a free commercial check first
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="View sample file"
              pageType="product_page"
              className="bg-white text-stone-700 border border-stone-300 px-5 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
            >
              View sample file
            </TrackedCtaLink>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 hover:border-stone-400"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-4">
        <div className="rounded-3xl border border-stone-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-sm text-stone-700 leading-7">
            YieldLens also includes residential calculators, but the Standard viability file is currently focused on commercial lease pressure-testing.
          </p>
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-3">
                Important limits
              </p>

              <h2 className="text-3xl font-bold mb-3">
                What it is not
              </h2>

              <p className="text-sm text-stone-300 leading-7">
                This distinction matters. YieldLens UK is a decision-support
                tool for early screening, not a regulated advice service or a
                substitute for professional due diligence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notIncluded.map((item) => (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-3xl p-4 text-sm text-stone-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-50 border-y border-teal-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-3">
            Unlock the Standard file from your result
          </p>

          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Start with the free commercial check, then unlock the fuller file from your result.
          </h2>

          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            The check creates the saved result that powers the file. From the
            results page, you can unlock the Standard commercial viability file,
            view the sample file, or rerun the check with different assumptions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="Run a free commercial check first"
              pageType="product_page"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
            >
              Run a free commercial check first
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="View sample file"
              pageType="product_page"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              View sample file
            </TrackedCtaLink>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 hover:border-stone-400"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
