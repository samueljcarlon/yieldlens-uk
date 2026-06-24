'use client';

import { surfaceCardClass, surfaceCardSoftClass } from '@/components/yieldLensUi';

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
    title: 'Stress-test scenarios',
    body: 'Base, downside, and cost-up views that keep the free result honest.',
  },
  {
    title: 'Negotiation levers',
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
      <p className="text-[11px] uppercase tracking-[0.2em] text-teal-700 font-semibold mb-2">
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
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-teal-300 font-semibold">
              {isResidential ? 'Residential follow-up' : 'Commercial follow-up'}
            </div>

            <h2 className="text-2xl font-bold leading-tight mb-3">
              {isResidential
                ? 'A fuller viability file can pressure-test the property properly.'
                : 'Unlock the Standard commercial viability file to pressure-test the lease properly.'}
            </h2>

            <p className="text-sm text-stone-300 leading-7">
              Your quick check returned <span className="font-semibold text-white">{verdictLabel}</span>.
              {' '}
              {getScoreMessage(score)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(items as Array<{ title: string; body: string }>).map((item) => (
              <PreviewCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        )}

        <p className="text-xs text-stone-500 mt-5 leading-5">
          Use the buttons below to request a fuller viability file, view the sample file,
          or run another check with different assumptions.
        </p>
      </div>
    </section>
  );
}
