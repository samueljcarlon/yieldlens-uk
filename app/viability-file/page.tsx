import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import { disclaimerClass, heroSecondaryCtaClass, heroPrimaryCtaClass, surfaceCardClass, surfaceCardSoftClass, tableShellClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Standard Commercial Viability File',
  description:
    'Turn a free commercial check into a £49 decision memo for negotiation and due diligence before signing a commercial lease.',
  alternates: {
    canonical: '/viability-file',
  },
  openGraph: {
    title: 'Standard Commercial Viability File',
    description:
      'A £49 decision memo for pressure-testing commercial rent, cash, downside trading, and lease viability before signing.',
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

const proofBlocks = [
  {
    title: 'Why the checks matter',
    text: 'Rent burden checks affordability pressure. Break-even customers check trading realism. Opening cash checks setup strain. Downside survival checks weak-start resilience. The evidence checklist reduces assumption risk.',
  },
  {
    title: 'What the memo helps you do',
    text: 'It helps the user see what to challenge before signing, what to verify, and where negotiation effort is most likely to change the result.',
  },
];

const illustrativeExample = [
  {
    title: 'Before negotiation',
    points: [
      'High rent burden',
      'Thin opening buffer',
      'Demanding break-even customers',
      'Weak downside survival',
    ],
  },
  {
    title: 'Possible improvements',
    points: [
      'Rent-free period',
      'Lower deposit',
      'Staged fit-out',
      'Landlord contribution',
      'Better revenue evidence',
    ],
  },
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
    text: 'Use the saved result to unlock the Standard file for £49, then print or save it as PDF.',
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
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">
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

      <section className="bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Standard commercial viability file
              </p>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Turn a commercial lease check into a decision memo before you sign.
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Get a structured £49 viability file that turns the free
                commercial check into a decision memo for negotiation and due
                diligence before you sign. It is unlocked from a saved result,
                then opens as a memo you can print or save as PDF. If your
                assumptions change, rerun the free commercial check so the file
                reflects the latest numbers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="viability_file_page_cta_clicked"
                  pagePath="/viability-file"
                  ctaLabel="Run a free commercial check first"
                  pageType="product_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check first
                </TrackedCtaLink>

                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="viability_file_page_cta_clicked"
                  pagePath="/viability-file"
                  ctaLabel="View sample file"
                  pageType="product_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample file
                </TrackedCtaLink>

              </div>

              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                Indicative decision-support only. Not advice, not a valuation, and not a substitute for professional due diligence.
              </p>

            </div>

            <div className={`${surfaceCardClass} overflow-hidden bg-white text-stone-900 shadow-2xl`}>
              <div className="px-5 py-4 border-b border-stone-200">
                <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-semibold">
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
          title="What the £49 file includes"
          description="The Standard commercial viability file turns the free check into a concise decision memo."
        />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commercialFileItems.map((item) => (
            <div
              key={item}
              className="rounded-[28px] border border-stone-200 bg-white p-5 text-sm font-medium text-stone-800 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Methodology proof"
            title="The memo is built from practical lease pressure points."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {proofBlocks.map((item) => (
              <div key={item.title} className={`${surfaceCardSoftClass} p-5`}>
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="mt-2 text-sm text-stone-700 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Illustrative example"
            title="A fictional cafe lease becomes easier to judge once the levers are visible."
            description="This is not a real case. It shows the kind of pressure-test the paid memo is built to organise."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {illustrativeExample.map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-fragile)]'
                    : 'border-t-[var(--yieldlens-positive)]'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  {item.title}
                </p>
                <ul className="space-y-2 text-sm text-stone-700 leading-7">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Free vs paid"
            title="The free check gives the numbers. The paid file turns them into a decision memo."
            description="The comparison below keeps the offer honest. The free check is the screen. The paid file is the printable pressure-test and action plan."
          />

          <div className={tableShellClass}>
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

      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="How the flow works"
          title="Three steps from snapshot to memo."
          description="The file is unlocked from a saved commercial result."
        />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {workflowSteps.map((item) => (
              <div
                key={item.step}
                className={`${surfaceCardSoftClass} p-6`}
              >
                <p className="w-9 h-9 rounded-full bg-[var(--yieldlens-primary)] text-white text-sm font-semibold flex items-center justify-center mb-5">
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

        </div>
      </section>

      <section className="bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
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

      <section className="bg-stone-100 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-3">
            Unlock the Standard file from your result
          </p>

          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Start with the free commercial check, then unlock the Standard file from the results page.
          </h2>

          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            The check creates the saved result that powers the file. From the results page, you can unlock the Standard commercial viability file for that result or view the sample file.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="Run a free commercial check first"
              pageType="product_page"
              className="bg-[#5e7f5b] text-white px-6 py-3 rounded font-medium hover:bg-[#4f6d4c] transition-colors text-sm"
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

          </div>
        </div>
      </section>
    </div>
  );
}
