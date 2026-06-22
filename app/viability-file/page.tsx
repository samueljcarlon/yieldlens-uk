import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'YieldLens UK | Commercial Viability File',
  description:
    'Standard commercial viability file for YieldLens UK. See what the paid file can include after a free commercial check, from rent burden and break-even customers to upfront cash, downside trading, survival runway, lease questions, and next checks.',
  alternates: {
    canonical: '/viability-file',
  },
  openGraph: {
    title: 'YieldLens UK | Commercial Viability File',
    description:
      'Standard commercial viability file for pressure-testing a site before committing to rent, fit-out, deposits, legal work, or signing.',
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
        text: 'Run a free commercial check first. From the results page, users can request a fuller viability file or view the printable preview for the latest saved result.',
      },
    },
  ],
};

const commercialFileItems = [
  'Executive verdict',
  'Site snapshot',
  'Rent burden analysis',
  'Break-even customers per day',
  'Upfront cash needed',
  'Cash after opening',
  'Downside revenue case',
  'Monthly burn or surplus',
  'Six-month survival test',
  'Fit-out and opening cost risk',
  'Lease questions',
  'Missing evidence checklist',
  'Landlord or agent questions',
  'Recommended next checks',
  'Decision-support disclaimer',
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
    title: 'Request a fuller file',
    text: 'Use the saved result to request the fuller viability file or view the printable preview. Checkout appears after the commercial report request.',
  },
];

const residentialItems = [
  'Headline yield and cash flow summary',
  'Ownership cost pressure',
  'Void period and maintenance risk',
  'Comparable rent evidence checklist',
  'Downside scenario questions',
  'Missing data warnings',
];

const notIncluded = [
  'Formal valuation',
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
                Standard commercial viability file, £49.
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                This is the paid next step after a free commercial check. It
                organises the verdict, site snapshot, rent burden, break-even
                customers, upfront cash, downside trading, six-month survival,
                lease questions, and next checks before you commit.
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
                  href="/report"
                  eventName="viability_file_page_cta_clicked"
                  pagePath="/viability-file"
                  ctaLabel="View printable preview"
                  pageType="product_page"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View printable preview
                </TrackedCtaLink>

                <Link
                  href="/how-it-works"
                  className="text-sm font-medium text-teal-300 hover:text-teal-200 self-center sm:self-auto"
                >
                  How it works
                </Link>

                <Link
                  href="/sample-commercial-viability-file"
                  className="text-sm font-medium text-teal-300 hover:text-teal-200 self-center sm:self-auto"
                >
                  View sample file
                </Link>
              </div>

              <p className="text-xs text-stone-400 mt-5">
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.
              </p>

              <p className="text-xs text-stone-400 mt-3">
                Checkout appears after a commercial report request.
              </p>
            </div>

            <div className="bg-white text-stone-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-stone-200">
                <p className="text-xs uppercase tracking-widest text-teal-700 font-semibold">
                  Example commercial file
                </p>
                <p className="text-2xl font-bold mt-1">
                  Fragile: opening cash shortfall before trading begins.
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
                  The downside month covers operating costs, but upfront cash needed exceeds available starting cash before trading begins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What it can include"
          title="A commercial file built around lease survival, not generic commentary."
          description="The commercial version is designed to make the main lease risks visible in one place. It starts with the free check result, then organises the numbers and questions that should be reviewed before spending serious time, money, or negotiation effort. The paid file is £49 after a commercial report request."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commercialFileItems.map((item) => (
            <div
              key={item}
              className="bg-white border border-stone-200 rounded-2xl p-5 text-sm font-medium text-stone-800 shadow-sm"
            >
              {item}
            </div>
          ))}
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
                className="bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-sm"
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
              href="/report"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="View printable preview"
              pageType="product_page"
              className="bg-white text-stone-700 border border-stone-300 px-5 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
            >
              View printable preview
            </TrackedCtaLink>

            <Link
              href="/sample-commercial-viability-file"
              className="inline-flex items-center justify-center rounded border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 hover:border-stone-400"
            >
              View sample file
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 hover:border-stone-400"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Commercial first"
          title="Residential viability files remain secondary."
          description="Residential checks can still be organised into a useful file, but the main YieldLens UK product direction is now commercial lease viability and survival before signing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {residentialItems.map((item) => (
            <div
              key={item}
              className="bg-white border border-stone-200 rounded-2xl p-5 text-sm text-stone-700 shadow-sm"
            >
              {item}
            </div>
          ))}
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
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-stone-200"
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
            Request early access
          </p>

          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Start with the free commercial check, then request the fuller file from your result.
          </h2>

          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            The check creates the saved result that powers the file. From the
            results page, you can request a full viability file, view the
            printable preview, or rerun the check with different assumptions.
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
              href="/report"
              eventName="viability_file_page_cta_clicked"
              pagePath="/viability-file"
              ctaLabel="View printable preview"
              pageType="product_page"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              View printable preview
            </TrackedCtaLink>

            <Link
              href="/sample-commercial-viability-file"
              className="inline-flex items-center justify-center rounded border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 hover:border-stone-400"
            >
              View sample file
            </Link>

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
