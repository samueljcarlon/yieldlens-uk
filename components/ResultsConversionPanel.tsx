'use client';

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
  'Rent burden review against expected monthly revenue',
  'Break-even customers per day and trading pressure',
  'Fit-out cost risk and upfront capital exposure',
  'Downside case if customers or average spend disappoint',
  'Lease questions, including break clauses, repairs, and permitted use',
  'Due diligence checklist before heads of terms or signing',
];

function getScoreMessage(score: number): string {
  if (score >= 80) {
    return 'The score is strong, but the main risk is still whether the assumptions are properly evidenced.';
  }

  if (score >= 65) {
    return 'The result may be worth investigating, but the next step is checking whether the assumptions survive proper stress testing.';
  }

  if (score >= 50) {
    return 'The result looks marginal, so the next step is identifying exactly what would need to improve for the deal to work.';
  }

  return 'The result looks weak, so the next step is understanding whether the issue is price, rent, costs, demand, or missing data.';
}

export default function ResultsConversionPanel({
  mode,
  score,
  verdictLabel,
}: ResultsConversionPanelProps) {
  const isResidential = mode === 'residential';

  const items = isResidential ? residentialItems : commercialItems;

  return (
    <div className="bg-stone-950 text-white rounded-xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-3">
            What this quick result does not fully answer yet
          </p>

          <h2 className="text-2xl font-bold mb-3">
            {isResidential
              ? 'A fuller viability file can pressure-test the property properly.'
              : 'A fuller viability file can pressure-test the site before you commit.'}
          </h2>

          <p className="text-sm text-stone-300 leading-7">
            Your quick check returned <span className="font-semibold text-white">{verdictLabel}</span>.
            {' '}
            {getScoreMessage(score)}
          </p>
        </div>

        <div className="bg-white text-stone-900 rounded-xl p-4 min-w-full lg:min-w-[260px]">
          <p className="text-xs uppercase tracking-wide text-stone-400 mb-1">
            Indicative score
          </p>

          <p className="text-3xl font-bold">
            {score}/100
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-stone-200"
          >
            {item}
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400 mt-5 leading-5">
        Use the buttons below to request a fuller viability file, view the printable preview,
        or run another check with different assumptions.
      </p>
    </div>
  );
}
