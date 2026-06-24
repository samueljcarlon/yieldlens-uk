import { surfaceCardClass } from '@/components/yieldLensUi';

interface OpeningCashWaterfallProps {
  startingCash?: number;
  fitOutBudget?: number;
  rentDeposit?: number;
  legalFees?: number;
  openingStock?: number;
  otherSetupCosts?: number;
  upfrontCashNeeded?: number;
  cashAfterOpening?: number;
}

function formatCurrency(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function line(label: string, value: number | undefined, tone: 'neutral' | 'down' = 'neutral') {
  return { label, value, tone };
}

export default function OpeningCashWaterfall({
  startingCash,
  fitOutBudget,
  rentDeposit,
  legalFees,
  openingStock,
  otherSetupCosts,
  upfrontCashNeeded,
  cashAfterOpening,
}: OpeningCashWaterfallProps) {
  const items = [
    line('Starting cash', startingCash, 'neutral'),
    line('Fit-out', fitOutBudget, 'down'),
    line('Rent deposit', rentDeposit, 'down'),
    line('Legal fees', legalFees, 'down'),
    line('Opening stock', openingStock, 'down'),
    line('Other setup costs', otherSetupCosts, 'down'),
  ];

  const hasOpeningPosition =
    cashAfterOpening !== undefined &&
    cashAfterOpening !== null &&
    !Number.isNaN(cashAfterOpening);

  const isShortfall = hasOpeningPosition && cashAfterOpening < 0;
  const finalLabel = isShortfall ? 'Opening shortfall' : 'Opening buffer';
  const finalTone = isShortfall ? 'text-rose-950 bg-rose-50 border-rose-200' : 'text-green-950 bg-green-50 border-green-200';

  return (
    <section className={`${surfaceCardClass} p-5`}>
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400 font-semibold mb-1">
          Opening cash
        </p>
        <h3 className="text-lg font-bold text-stone-950">
          The capital stack before trading begins
        </h3>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
              index === 0
                ? 'border-stone-200 bg-stone-50'
                : 'border-stone-200 bg-[#fffaf0]'
            }`}
          >
            <span className="font-medium text-stone-700">
              {index === 0 ? item.label : `- ${item.label}`}
            </span>
            <span className={`tabular-nums font-semibold ${item.tone === 'down' ? 'text-stone-900' : 'text-stone-900'}`}>
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-950 p-4 text-white shadow-[0_16px_34px_rgba(15,23,42,0.12)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-green-300 font-semibold mb-1">
              Total requirement
            </p>
            <p className="text-lg font-semibold">
              = Upfront cash needed
            </p>
          </div>
          <p className="text-2xl font-bold tabular-nums">
            {formatCurrency(upfrontCashNeeded)}
          </p>
        </div>
      </div>

      <div className={`mt-4 rounded-2xl border px-4 py-4 shadow-sm ${finalTone}`}>
        <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-1">
          {finalLabel}
        </p>
        <p className="text-2xl font-bold tabular-nums">
          {formatCurrency(cashAfterOpening)}
        </p>
        <p className="text-xs mt-2 leading-5">
          {hasOpeningPosition
            ? isShortfall
              ? 'The deal needs more starting cash, a lower fit-out or deposit, or stronger landlord terms before it feels comfortable.'
              : 'The opening buffer exists, but the quality of the buffer still depends on lease costs and launch overruns.'
            : 'Opening position is not available from the current inputs.'}
        </p>
      </div>
    </section>
  );
}
