import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import { disclaimerClass, heroSecondaryCtaClass, heroPrimaryCtaClass, surfaceCardClass, surfaceCardSoftClass, tableShellClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Standard Commercial Viability File | YieldLens UK',
  description:
    'Standard commercial viability file, £49. A printable decision-support memo built from the saved commercial check assumptions.',
  alternates: {
    canonical: '/viability-file',
  },
  openGraph: {
    title: 'Standard Commercial Viability File | YieldLens UK',
    description:
      'A £49 printable decision-support memo built from the saved commercial check assumptions before signing.',
    url: 'https://yieldlens.co.uk/viability-file',
  },
};

const productStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Standard commercial viability file',
  description:
    'A £49 decision-support file that organises the saved commercial result, stress-test interpretation, negotiation levers, evidence checklist, lease questions, and printable memo before signing a commercial lease.',
  brand: {
    '@type': 'Brand',
    name: 'YieldLens UK',
  },
  category: 'Decision-support file',
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/OnlineOnly',
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
          text: 'A YieldLens UK commercial viability file is a structured decision-support file that organises the key lease metrics, risk flags, downside assumptions, missing evidence, lease questions, and next checks in one place.',
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
  'Rent-free periods and lease incentives',
  'Negotiation levers',
  'Evidence checklist before signing',
];

const proofBlocks = [
  {
    title: 'Why the checks matter',
    text: 'Rent burden checks affordability pressure. Break-even customers check trading realism. Opening cash checks setup strain. Business rates and service charge can move the cost base. Lease length shapes commitment risk. Assignment and subletting affect exit flexibility. Permitted use can stop the concept before it starts. Downside survival checks weak-start resilience. Rent-free periods and fit-out incentives can change the cash picture. The evidence checklist reduces assumption risk.',
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

function ComparisonRowCard({
  label,
  freeValue,
  paidValue,
}: {
  label: string;
  freeValue: string;
  paidValue: string;
}) {
  return (
    <div className={`${surfaceCardSoftClass} p-4`}>
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-2">
        {label}
      </p>
      <div className="grid grid-cols-1 gap-3 text-sm leading-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">
            Free check
          </p>
          <p className="text-stone-700">{freeValue}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">
            Standard file
          </p>
          <p className="text-stone-700">{paidValue}</p>
        </div>
      </div>
    </div>
  );
}

export default function ViabilityFilePage() {
  return (
    <div className="bg-stone-50">
      <JsonLd data={productStructuredData} />
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
                Standard commercial viability file, £49.
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                A printable decision-support memo built from the saved
                commercial check assumptions. It helps organise rent burden,
                cash pressure, downside risk, evidence gaps, lease questions,
                and any rent-free period, deposit, or fit-out incentive before
                you sign. It is unlocked from a saved result, then opens as a
                memo you can print or save as PDF. If your assumptions change,
                rerun the free commercial check so the file reflects the latest
                numbers.
              </p>

              <p className="text-sm text-stone-300 max-w-2xl mb-4 leading-7">
                If you are still comparing sites, start with the before-signing guides for heads of terms, costs, rent-free timing, lease length, assignment and subletting, deposit pressure, repair risk, and exit flexibility.
              </p>

              <div className="mb-6 flex flex-wrap gap-3 text-sm text-stone-300">
                <Link href="/commercial-heads-of-terms-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial heads of terms before signing
                </Link>
                <Link href="/commercial-lease-costs-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease costs before signing
                </Link>
                <Link href="/commercial-business-rates-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial business rates before signing
                </Link>
                <Link href="/commercial-rent-free-period-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial rent-free period before signing
                </Link>
                <Link href="/commercial-lease-length-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease length before signing
                </Link>
                <Link href="/commercial-assignment-subletting-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial assignment and subletting before signing
                </Link>
                <Link href="/commercial-lease-deposit-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease deposit before signing
                </Link>
                <Link href="/commercial-repairing-obligations-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial repairing obligations before signing
                </Link>
                <Link href="/commercial-break-clause-before-signing" className="text-[#DCCDA8] underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial break clause before signing
                </Link>
              </div>

              <ul className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-200 leading-6">
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  Built from the saved commercial check assumptions
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  Printable memo for negotiation and due diligence
                </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Rent burden, cash pressure, downside risk, and lease questions
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Rent-free periods, deposits, and lease incentives can change the cash stack
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Use estimates while comparing sites, then rerun the check
              </li>
            </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="viability_file_page_cta_clicked"
                  pagePath="/viability-file"
                  ctaLabel="Start with a free commercial check"
                  pageType="product_page"
                  className={heroPrimaryCtaClass}
                >
                  Start with a free commercial check
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

              <p className="mt-4 text-sm text-stone-300">
                Need help with access after payment or a saved result? Use the{' '}
                <Link href="/contact" className="text-[#DCCDA8] font-medium hover:underline">
                  contact page
                </Link>
                .
              </p>

            </div>

            <div className={`${surfaceCardClass} overflow-hidden bg-white text-stone-900 shadow-[0_12px_28px_rgba(15,23,42,0.12)]`}>
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

        <p className="mb-6 text-sm text-stone-600 leading-7 max-w-3xl">
          If a rent-free period or fit-out incentive is part of the deal, see{' '}
          <Link href="/commercial-rent-free-period-before-signing" className="text-[var(--yieldlens-caution)] font-medium hover:underline">
            commercial rent-free periods before signing
          </Link>{' '}
          for the timing and cash impact before you commit.
        </p>

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

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Objections and limits"
            title="What the file does, and what it does not do."
            description="The page stays clear about the product boundary so users know what they are buying."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardSoftClass} p-5`}>
              <p className="text-sm font-semibold text-stone-900 mb-3">What do I get for £49?</p>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>• A printable decision-support memo</li>
                <li>• An assumption review linked to the saved result</li>
                <li>• Stress-test interpretation and downside context</li>
                <li>• Negotiation levers, evidence checklist, and lease questions</li>
              </ul>
            </div>

            <div className={`${surfaceCardSoftClass} p-5`}>
              <p className="text-sm font-semibold text-stone-900 mb-3">What it will not tell you</p>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>• It does not confirm market rent.</li>
                <li>• It does not review the lease wording.</li>
                <li>• It does not replace legal, tax, finance, valuation, or property advice.</li>
                <li>• It cannot use facts that were not entered into the free check.</li>
              </ul>
            </div>
          </div>

          <p className="mt-4 text-sm text-stone-600 leading-7 max-w-4xl">
            Use estimates if you are still comparing units. The file is useful when the deal looks promising
            but you want to understand rent pressure, opening cash, weak-start risk, and whether an incentive like a rent-free period or deposit actually changes the picture before committing.
          </p>
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
            description="The comparison below keeps the offer honest. The free check is the screen. The paid file is the printable pressure-test and action plan. The sample file is a separate redacted example, not the same case as the homepage preview."
          />

          <div className="grid gap-3 md:hidden">
            {compareRows.map(([label, freeValue, paidValue]) => (
              <ComparisonRowCard
                key={label}
                label={label}
                freeValue={freeValue}
                paidValue={paidValue}
              />
            ))}
          </div>

          <div className={`${tableShellClass} hidden md:block`}>
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
            The check creates the saved result that powers the file. From the results page, you can unlock the Standard commercial viability file for that result or view the separate redacted sample file first.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="Start with a free commercial check"
              pageType="product_page"
              className="w-full sm:w-auto min-h-[48px] bg-[#5e7f5b] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f6d4c]"
            >
              Start with a free commercial check
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/sample-commercial-viability-file"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="View sample file"
              pageType="product_page"
              className="w-full sm:w-auto min-h-[48px] border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400"
            >
              View sample file
            </TrackedCtaLink>

          </div>

          <p className="mt-4 text-sm text-stone-700 leading-7 max-w-2xl mx-auto">
            If you need help with access after payment or a saved result, email{' '}
            <a
              href="mailto:yieldlensuk@gmail.com?subject=YieldLens%20support"
              className="text-[var(--yieldlens-caution)] font-medium hover:underline"
            >
              yieldlensuk@gmail.com
            </a>{' '}
            or use the{' '}
            <Link href="/contact" className="text-[var(--yieldlens-caution)] font-medium hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
