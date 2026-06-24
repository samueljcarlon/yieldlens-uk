'use client';
import { surfaceCardClass, surfaceCardSoftClass, tableShellClass } from '@/components/yieldLensUi';

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
    title: 'Stress-test pack',
    body: 'Base, downside, and cost-up views that keep the free snapshot honest.',
  },
  {
    title: 'Negotiation aid',
    body: 'Rent, rent-free terms, deposit, break clause, and landlord contribution prompts.',
  },
  {
    title: 'Lease questions',
    body: 'Service charge, repairs, permitted use, rent review, and handover questions.',
  },
  {
    title: 'Due diligence checklist',
    body: 'What evidence to collect before heads of terms or signing.',
  },
  {
    title: 'Ranked actions before committing',
    body: 'A clear list of what to improve first if the numbers are tight.',
  },
  {
    title: 'Final view',
    body: 'A concise go / renegotiate / pause view for the current assumptions.',
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
      <p className="text-[11px] uppercase tracking-[0.2em] text-green-700 font-semibold mb-2">
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
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-green-200 font-semibold">
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
                The paid file adds stress tests, negotiation levers, lease questions,
                due diligence, ranked actions, and a cleaner final view.
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
            <div className={`${tableShellClass}`}>
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-stone-100/90 text-stone-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">What changes</th>
                    <th className="px-4 py-3 text-left font-semibold">Free result vs Standard file</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([label, value], index) => (
                  <tr key={label} className={index % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                      <td className="px-4 py-3 align-top font-medium text-stone-900 border-t border-stone-200">
                        {label}
                      </td>
                      <td className="px-4 py-3 align-top text-stone-700 border-t border-stone-200">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commercialItems.map((item) => (
                <PreviewCard key={item.title} title={item.title} body={item.body} />
              ))}
            </div>

            <div className={`${surfaceCardSoftClass} bg-white p-5`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b7d58] font-semibold mb-3">
                Questions the paid file helps answer
              </p>

              <ul className="space-y-2 text-sm text-stone-700 leading-6">
                {commercialQuestions.map((question) => (
                  <li key={question} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#5e7f5b] shrink-0" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-stone-500 leading-5">
                YieldLens is indicative decision-support only. It is not financial advice,
                legal advice, tax advice, a valuation, or a substitute for professional due diligence.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
