'use client';
import {
  disclaimerClass,
  primaryCtaClass,
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
  tableShellClass,
} from '@/components/yieldLensUi';
import TrackedCtaLink from '@/components/TrackedCtaLink';

interface ResultsConversionPanelProps {
  mode: 'residential' | 'commercial';
  score: number;
  verdictLabel: string;
}

const residentialItems = [
  'Comparable rent evidence for similar nearby properties',
  'Cash flow stress test using higher costs and lower rent',
  'Ownership cost review, including service charge and ground rent',
  'Void period and maintenance risk',
  'Lease, restrictions, EPC, and local demand questions',
  'Clear decision summary before spending more time on the property',
];

const commercialItems = [
  {
    title: 'Decision memo',
    body: 'Turns the free numbers into a printable memo for negotiation and due diligence.',
  },
  {
    title: 'Stress-test scenarios',
    body: 'Base, downside, and cost-up views that keep the snapshot honest.',
  },
  {
    title: 'Negotiation levers',
    body: 'Rent, rent-free terms, deposit, break clause, and landlord contribution prompts.',
  },
  {
    title: 'Evidence checklist',
    body: 'What evidence to collect before heads of terms or signing.',
  },
  {
    title: 'Lease questions',
    body: 'Service charge, repairs, permitted use, rent review, and handover questions.',
  },
  {
    title: 'Printable file',
    body: 'A clean memo you can use when talking to agents, advisers, or landlords.',
  },
];

const commercialQuestions = [
  'Can this site carry the rent?',
  'What turnover would I need?',
  'What happens if trade starts slower than expected?',
  'What should I challenge before signing?',
  'What evidence should I collect?',
];

const compareRows = [
  ['Fast snapshot', 'Headline numbers, score, and risk flags'],
  ['Standard decision memo, £49', 'A decision memo for negotiation and due diligence'],
  ['Rent burden', 'Shown'],
  ['Break-even customers/day', 'Shown'],
  ['Opening cash needed', 'Shown'],
  ['Downside trading', 'Shown'],
  ['Stress-test scenarios', 'Not included'],
  ['Negotiation levers', 'Not included'],
  ['Lease questions', 'Not included'],
  ['Due diligence checklist', 'Not included'],
  ['Ranked action plan', 'Not included'],
  ['Printable memo', 'Not included'],
];

const paidFileChecklist = [
  'Decision memo',
  'Rent burden interpretation',
  'Break-even customer context',
  'Opening cash and buffer view',
  'Six-month downside survival',
  'Negotiation levers',
  'Evidence checklist',
  'Lease questions',
  'Printable file',
];

function getScoreMessage(score: number): string {
  if (score >= 80) {
    return 'The score is strong, but the assumptions still need evidence before the site feels truly comfortable.';
  }

  if (score >= 65) {
    return 'The result is worth investigating, but the next step is checking whether the lease can survive proper stress testing.';
  }

  if (score >= 50) {
    return 'The result looks marginal, so the key question is what would need to improve before the site feels viable.';
  }

  return 'The result looks weak, so the main task is understanding whether rent, costs, demand, or opening cash is the problem.';
}

function PreviewCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className={`${surfaceCardClass} p-4`}>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] font-semibold mb-2">
        Included in the paid file
      </p>
      <h4 className="text-sm font-semibold text-stone-950 mb-2">
        {title}
      </h4>
      <p className="text-xs text-stone-600 leading-6">
        {body}
      </p>
    </div>
  );
}

export default function ResultsConversionPanel({
  mode,
  score,
  verdictLabel,
}: ResultsConversionPanelProps) {
  const isResidential = mode === 'residential';
  const items = isResidential ? residentialItems : commercialItems;

  return (
    <section className={`overflow-hidden ${surfaceCardClass} shadow-[0_18px_50px_rgba(15,23,42,0.08)]`}>
      <div className="bg-stone-950 px-6 py-6 text-white sm:px-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#DCCDA8] font-semibold">
              {isResidential ? 'Residential follow-up' : 'Commercial follow-up'}
            </div>

            <h2 className="text-2xl font-bold leading-tight mb-3">
              {isResidential
                ? 'A fuller viability file can pressure-test the property properly.'
                : 'Unlock the Standard commercial viability file to turn the snapshot into a decision memo.'}
            </h2>

            <p className="text-sm text-stone-300 leading-7">
              Your quick check returned <span className="font-semibold text-white">{verdictLabel}</span>.
              {' '}
              {getScoreMessage(score)} The free result gives the snapshot; the paid file adds the negotiation and due diligence pack.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 min-w-full lg:min-w-[260px] shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400 mb-1">
              Indicative score
            </p>

            <p className="text-4xl font-bold tabular-nums text-white leading-none">
              {score}<span className="text-xl text-stone-300 font-normal">/100</span>
            </p>

            {!isResidential && (
              <p className="text-xs text-stone-400 mt-3 leading-5">
                The paid file adds the memo, stress tests, negotiation levers, and due diligence pack.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-7 sm:py-7">
        {isResidential ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(items as string[]).map((item) => (
                <div
                  key={`res-${item}`}
                  className={`${surfaceCardSoftClass} p-4 text-sm leading-6 text-stone-700`}
                >
                  {item}
                </div>
              ))}
            </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`${surfaceCardClass} bg-white p-5`}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b7d58] font-semibold mb-2">
                  Free result
                </p>

                <h3 className="text-lg font-bold text-stone-950 mb-3">
                  Fast viability snapshot
                </h3>

                <ul className="space-y-2 text-sm text-stone-700 leading-6">
                  <li>Score and verdict</li>
                  <li>Headline rent burden</li>
                  <li>Break-even customers</li>
                  <li>Opening cash pressure</li>
                  <li>Downside flag</li>
                  <li>Basic next steps</li>
                </ul>
              </div>

              <div className={`${surfaceCardClass} bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.1)]`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b7d58] font-semibold mb-2">
                      Standard file, £49
                    </p>
                    <h3 className="text-lg font-bold text-stone-950">
                      Commercial decision memo
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white px-3 py-2 text-right shadow-sm">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">
                      Price
                    </p>
                    <p className="text-2xl font-bold text-stone-950">£49</p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 leading-6">
                  {paidFileChecklist.map((item) => (
                    <li key={item} className="flex gap-2 rounded-2xl border border-stone-200 bg-white px-3 py-2 shadow-sm">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <TrackedCtaLink
                    href="/report"
                    className={primaryCtaClass}
                    eventName="results_report_preview_clicked"
                    pagePath="/results"
                    ctaLabel="Unlock the £49 viability file"
                    pageType="results"
                  >
                    Unlock the £49 viability file
                  </TrackedCtaLink>

                  <TrackedCtaLink
                    href="/sample-commercial-viability-file"
                    className={secondaryCtaClass}
                    eventName="results_report_preview_clicked"
                    pagePath="/results"
                    ctaLabel="View sample file"
                    pageType="results"
                  >
                    View sample file
                  </TrackedCtaLink>
                </div>

                <p className="mt-4 text-xs text-stone-600 leading-5">
                  After payment, the saved result opens as the memo. You can print it or save it as PDF.
                </p>
              </div>
            </div>

            <div className={`${surfaceCardSoftClass} bg-white p-5`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b7d58] font-semibold mb-3">
                Questions the paid file helps answer
              </p>

              <ul className="space-y-2 text-sm text-stone-700 leading-6">
                {commercialQuestions.map((question) => (
                  <li key={question} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>

              <p className={`${disclaimerClass} mt-4`}>
                YieldLens is indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
