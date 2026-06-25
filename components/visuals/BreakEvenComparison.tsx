interface BreakEvenComparisonProps {
  breakEvenCustomersPerDay?: number;
  expectedCustomersPerDay?: number;
}

function formatNumber(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return 'Not available';
  return value.toFixed(1);
}

export default function BreakEvenComparison({
  breakEvenCustomersPerDay,
  expectedCustomersPerDay,
}: BreakEvenComparisonProps) {
  const values = [breakEvenCustomersPerDay, expectedCustomersPerDay].filter(
    (value): value is number => typeof value === 'number' && !Number.isNaN(value)
  );

  const max = Math.max(50, ...values, 1);
  const breakEvenWidth = breakEvenCustomersPerDay ? Math.min((breakEvenCustomersPerDay / max) * 100, 100) : 0;
  const expectedWidth = expectedCustomersPerDay ? Math.min((expectedCustomersPerDay / max) * 100, 100) : 0;
  const margin =
    typeof breakEvenCustomersPerDay === 'number' &&
    typeof expectedCustomersPerDay === 'number'
      ? expectedCustomersPerDay - breakEvenCustomersPerDay
      : undefined;

  const status =
    typeof margin === 'number'
      ? margin >= 0
        ? 'Room on paper'
        : 'Short of break-even'
      : 'Not available';

  return (
    <section className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400 font-semibold mb-1">
          Daily volume
        </p>
        <h3 className="text-lg font-bold text-stone-950">
          Break-even versus expected customers
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">Break-even</span>
            <span className="tabular-nums font-semibold text-stone-950">
              {formatNumber(breakEvenCustomersPerDay)}/day
            </span>
          </div>
          <div className="h-4 rounded-full bg-stone-100 border border-stone-200 overflow-hidden">
            <div className="h-full bg-amber-400" style={{ width: `${breakEvenWidth}%` }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">Expected</span>
            <span className="tabular-nums font-semibold text-stone-950">
              {formatNumber(expectedCustomersPerDay)}/day
            </span>
          </div>
          <div className="h-4 rounded-full bg-stone-100 border border-stone-200 overflow-hidden">
            <div className="h-full bg-green-600" style={{ width: `${expectedWidth}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
        <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-semibold mb-1">
          Margin of safety
        </p>
        <p className="text-xl font-bold text-stone-950 tabular-nums">
          {typeof margin === 'number' ? `${margin > 0 ? '+' : ''}${margin.toFixed(1)} per day` : 'Not available'}
        </p>
        <p className="text-xs text-stone-600 mt-2 leading-5">
          {typeof margin === 'number'
            ? margin >= 0
              ? 'Room on paper, but expected customers still need evidence.'
              : 'Expected trade sits below break-even and needs stronger assumptions or sharper terms.'
            : 'Break-even comparison is not available from the current inputs.'}
        </p>
      </div>
    </section>
  );
}
