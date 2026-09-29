import type { Metadata } from 'next';

import TrackedCtaLink from '@/components/TrackedCtaLink';
import { surfaceCardClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Illustrative Commercial Underwriting Case | Carlon Analytics',
  description:
    'See an illustrative Carlon Analytics commercial underwriting case showing operating economics, opening capital, downside sensitivities and lease pressure.',
  robots: {
    index: false,
    follow: false,
  },
};

const headlineMetrics = [
  { label: 'Headline annual rent', value: '£42,000' },
  { label: 'Full annual occupancy cost', value: '£62,400' },
  { label: 'Opening capital required', value: '£149,500' },
  { label: 'Funding available', value: '£170,000' },
  { label: 'Opening buffer', value: '£20,500' },
  { label: 'Decision view', value: 'Renegotiate' },
];

const scenarios = [
  {
    label: 'Base case',
    value: '+£3,544 / month',
    interpretation: 'The site works on the central trading assumptions.',
  },
  {
    label: 'Revenue -10%',
    value: '+£361 / month',
    interpretation: 'Most of the monthly margin for error disappears.',
  },
  {
    label: 'Revenue -20%',
    value: '-£2,821 / month',
    interpretation: 'The site becomes loss-making under a material revenue shortfall.',
  },
  {
    label: 'Margin -5 percentage points',
    value: '+£1,204 / month',
    interpretation: 'Lower gross margin materially weakens the operating position.',
  },
  {
    label: 'Operating costs +10%',
    value: '+£1,394 / month',
    interpretation: 'The model remains positive, but resilience is reduced.',
  },
  {
    label: 'Combined downside',
    value: '-£6,843 / month',
    interpretation: 'Revenue, margin and cost pressure together create a severe cash drain.',
  },
];

const reasons = [
  {
    title: 'Downside resilience is too thin',
    text: 'A 20% revenue shortfall turns a positive base case into a monthly loss, showing that the site depends heavily on the central trading assumptions being achieved.',
  },
  {
    title: 'Opening liquidity is limited',
    text: 'The £20,500 opening buffer provides some protection, but not enough to absorb a sustained severe downside without further funding or improved terms.',
  },
  {
    title: 'The lease economics need improving',
    text: 'The operating model is not fundamentally broken, so improving the commercial terms can materially change the risk rather than abandoning the site immediately.',
  },
];

const priorities = [
  'Seek a stronger rent-free period to protect opening liquidity.',
  'Reduce deposit or guarantee exposure where possible.',
  'Verify service charge, business rates and insurance contributions before commitment.',
  'Protect the fit-out contingency from being absorbed by avoidable opening costs.',
  'Re-test revenue, average spend and customer-volume assumptions against evidence.',
  'Confirm funding terms and debt-service obligations before heads of terms become difficult to unwind.',
];

export default function CommercialUnderwritingExamplePage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <main className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <section className="rounded-[32px] bg-stone-950 p-7 sm:p-10 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold">
            Carlon Analytics
          </p>

          <h1 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
            Illustrative commercial underwriting case
          </h1>

          <p className="mt-5 max-w-3xl text-sm sm:text-base leading-7 text-stone-300">
            A fictional café site that works in the base case but becomes fragile
            quickly under weaker trading. This example shows how operating economics,
            opening capital, funding and lease exposure are reviewed together before
            a commercial commitment is made.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm">
            {[
              'One illustrative UK café site',
              'Analyst-style downside review',
              'Not a real client engagement',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-stone-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className={`${surfaceCardClass} mt-6 p-5 sm:p-7`}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold">
            At a glance
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            The site works, but the margin for error is narrow.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
            Headline rent is only one part of the decision. Once rates, service charge,
            insurance, operating costs, funding and opening capital are considered
            together, the site becomes much more sensitive to weaker trading.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {headlineMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
              >
                <p className="text-xs uppercase tracking-wide text-stone-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-xl font-bold text-stone-950">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${surfaceCardClass} mt-6 p-5 sm:p-7`}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold">
            Downside sensitivities
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            A positive base case does not mean the site is resilient.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
            The central case produces a positive monthly operating position, but the
            result changes quickly when revenue, margin or operating costs move against
            the business.
          </p>

          <div className="mt-6 overflow-hidden rounded-3xl border border-stone-200">
            <div className="hidden sm:grid sm:grid-cols-[1fr_180px_1.5fr] bg-stone-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <div>Scenario</div>
              <div>Monthly position</div>
              <div>Interpretation</div>
            </div>

            {scenarios.map((scenario) => (
              <div
                key={scenario.label}
                className="grid grid-cols-1 gap-2 border-t border-stone-200 px-4 py-4 first:border-t-0 sm:grid-cols-[1fr_180px_1.5fr] sm:gap-4"
              >
                <div className="text-sm font-semibold text-stone-900">
                  {scenario.label}
                </div>
                <div
                  className={`text-sm font-bold ${
                    scenario.value.startsWith('-')
                      ? 'text-red-700'
                      : 'text-green-700'
                  }`}
                >
                  {scenario.value}
                </div>
                <div className="text-sm leading-6 text-stone-600">
                  {scenario.interpretation}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
            <p className="text-sm font-semibold text-stone-950">
              What matters most
            </p>
            <p className="mt-2 text-sm leading-7 text-stone-700">
              The concern is not that the site is obviously unviable. The concern is
              that the margin for error disappears quickly. A 20% revenue shortfall
              turns a positive base case into a monthly loss, while the combined
              downside would consume the £20,500 opening buffer in roughly three months.
            </p>
          </div>
        </section>

        <section className={`${surfaceCardClass} mt-6 p-5 sm:p-7`}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold">
            Decision view
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
                Renegotiate
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
                The model is not strong enough to justify proceeding on the current
                assumptions and commercial terms, but it is not weak enough to reject
                the site outright. The next step is to improve the downside protection
                and verify the assumptions that drive the result.
              </p>
            </div>

            <div className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
              RENEGOTIATE
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
              >
                <p className="text-sm font-semibold text-stone-950">
                  {reason.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {reason.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${surfaceCardClass} mt-6 p-5 sm:p-7`}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold">
            Negotiation and evidence priorities
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            What should happen before the lease is taken further?
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {priorities.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#5b7d58]">
                  Priority {index + 1}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[32px] bg-stone-950 p-7 sm:p-10 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold">
            Carlon Analytics
          </p>

          <h2 className="mt-3 max-w-3xl text-2xl sm:text-4xl font-bold tracking-tight">
            Want the same analysis for a specific commercial site?
          </h2>

          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-7 text-stone-300">
            Standard scope is £295 for one UK commercial site and one business concept.
            The review covers the operating model, opening capital, funding, downside
            sensitivities, lease exposure and negotiation priorities in an
            analyst-reviewed decision memo.
          </p>

          <TrackedCtaLink
            href="/carlon-analytics/commercial-underwriting?source=underwriting_example"
            eventName="carlon_analytics_underwriting_clicked"
            pagePath="/carlon-analytics/commercial-underwriting/example"
            ctaLabel="Request full underwriting"
            ctaLocation="underwriting_example_footer"
            pageType="analytics_example"
            metadata={{ product_area: 'carlon_analytics' }}
            className="mt-6 inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-100"
          >
            Request full underwriting
          </TrackedCtaLink>

          <p className="mt-4 max-w-3xl text-xs leading-6 text-stone-400">
            This page is an illustrative fictional case showing the style of analysis.
            It is not a client result, valuation, legal opinion, accounting assurance
            or regulated financial advice.
          </p>
        </section>
      </main>
    </div>
  );
}
