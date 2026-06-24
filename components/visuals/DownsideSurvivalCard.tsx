interface DownsideSurvivalCardProps {
  downsideRevenuePercentage?: number;
  downsideMonthlyRevenue?: number;
  monthlyCostBase?: number;
  downsideMonthlyPosition?: number;
  monthlyBurnInDownside?: number;
  survivalMonths?: number;
  survivesSixBadMonths?: boolean;
}

function formatCurrency(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return 'Not available';
  return `${value.toFixed(1)}%`;
}

function formatMonths(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return 'Not available';
  return `${value.toFixed(1)} months`;
}

export default function DownsideSurvivalCard({
  downsideRevenuePercentage,
  downsideMonthlyRevenue,
  monthlyCostBase,
  downsideMonthlyPosition,
  monthlyBurnInDownside,
  survivalMonths,
  survivesSixBadMonths,
}: DownsideSurvivalCardProps) {
  const pass = survivesSixBadMonths === true;
  const fail = survivesSixBadMonths === false;

  return (
    <section className="rounded-[28px] border border-stone-200 bg-[#fffaf0] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400 font-semibold mb-1">
            Downside survival
          </p>
          <h3 className="text-lg font-bold text-stone-950">
            What happens if trading weakens?
          </h3>
        </div>

        <div className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${
          pass
            ? 'border-green-200 bg-green-50 text-green-800'
            : fail
              ? 'border-rose-200 bg-rose-50 text-rose-800'
              : 'border-amber-200 bg-amber-50 text-amber-900'
        }`}>
          {pass ? 'Pass' : fail ? 'Fail' : 'Not available'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">
            Downside revenue
          </p>
          <p className="text-lg font-bold text-stone-950 tabular-nums">
            {formatPercent(downsideRevenuePercentage)}
          </p>
          <p className="text-xs text-stone-600 mt-1">Revenue case used for the weaker trading view.</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">
            Downside revenue value
          </p>
          <p className="text-lg font-bold text-stone-950 tabular-nums">
            {formatCurrency(downsideMonthlyRevenue)}
          </p>
          <p className="text-xs text-stone-600 mt-1">Revenue after the weaker-trading assumption.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-[#fffaf0] px-4 py-3 text-sm">
          <span className="text-stone-600">Known monthly cost base</span>
          <span className="font-semibold text-stone-950 tabular-nums">{formatCurrency(monthlyCostBase)}</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-[#fffaf0] px-4 py-3 text-sm">
          <span className="text-stone-600">Downside monthly position</span>
          <span className={`font-semibold tabular-nums ${typeof downsideMonthlyPosition === 'number' && downsideMonthlyPosition < 0 ? 'text-rose-900' : 'text-green-800'}`}>
            {typeof downsideMonthlyPosition === 'number'
              ? downsideMonthlyPosition < 0
                ? `${formatCurrency(Math.abs(downsideMonthlyPosition))} burn`
                : downsideMonthlyPosition > 0
                  ? `${formatCurrency(downsideMonthlyPosition)} surplus`
                  : 'Break-even'
              : 'Not available'}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-[#fffaf0] px-4 py-3 text-sm">
          <span className="text-stone-600">Monthly burn in downside</span>
          <span className="font-semibold text-stone-950 tabular-nums">
            {typeof monthlyBurnInDownside === 'number' && monthlyBurnInDownside > 0
              ? formatCurrency(monthlyBurnInDownside)
              : 'No monthly burn'}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-950 px-4 py-4 text-sm text-white">
          <span className="text-stone-300">Six-month runway</span>
          <span className="font-semibold tabular-nums">
            {typeof survivalMonths === 'number' ? formatMonths(survivalMonths) : 'Not available'}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-stone-600 leading-6">
        {fail
          ? 'The downside month burns cash and the six-month test fails.'
          : pass
            ? 'The downside month is covered and the six-month test passes under the current assumptions.'
            : 'The downside survival picture is not fully available from the current inputs.'}
      </p>
    </section>
  );
}
