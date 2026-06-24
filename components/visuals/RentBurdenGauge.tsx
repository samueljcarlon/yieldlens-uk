import { surfaceCardClass } from '@/components/yieldLensUi';

interface RentBurdenGaugeProps {
  rentBurdenPercentage: number | null | undefined;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function getLabel(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'Not available';
  }

  if (value <= 12) return 'Healthier';
  if (value <= 18) return 'Watch';
  return 'Caution';
}

function getTone(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return 'stone';
  if (value <= 12) return 'green';
  if (value <= 18) return 'amber';
  return 'rose';
}

export default function RentBurdenGauge({
  rentBurdenPercentage,
}: RentBurdenGaugeProps) {
  const safeValue =
    rentBurdenPercentage === null || rentBurdenPercentage === undefined || Number.isNaN(rentBurdenPercentage)
      ? null
      : rentBurdenPercentage;

  const scaleMax = 30;
  const markerPosition = safeValue === null ? 0 : Math.min((safeValue / scaleMax) * 100, 100);
  const tone = getTone(safeValue);

  const bandClasses = {
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    stone: 'bg-stone-300',
  };

  const markerClasses = {
    green: 'border-green-700 bg-green-100 text-green-900',
    amber: 'border-amber-700 bg-amber-100 text-amber-950',
    rose: 'border-rose-700 bg-rose-100 text-rose-950',
    stone: 'border-stone-400 bg-[#fffaf0] text-stone-700',
  };

  return (
    <section className={`${surfaceCardClass} p-5`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400 font-semibold mb-1">
            Rent burden
          </p>
          <h3 className="text-lg font-bold text-stone-950">
            Indicative YieldLens screening threshold
          </h3>
        </div>

        <div className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${markerClasses[tone as keyof typeof markerClasses]}`}>
          {getLabel(safeValue)}
        </div>
      </div>

      <div className="relative pt-7">
        <div className="h-4 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
          <div className="flex h-full w-full">
            <div className={`h-full w-[40%] ${bandClasses.green}`} />
            <div className={`h-full w-[20%] ${bandClasses.amber}`} />
            <div className={`h-full flex-1 ${bandClasses.rose}`} />
          </div>
        </div>

        <div
          className="absolute top-2 flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${markerPosition}%` }}
        >
          <div className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm ${markerClasses[tone as keyof typeof markerClasses]}`}>
            {safeValue === null ? 'Not available' : formatPercent(safeValue)}
          </div>
          <div className="mt-1 h-6 w-px bg-stone-900/70" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-[11px] uppercase tracking-[0.18em] text-stone-500">
        <div>
          <div className="mb-1 font-semibold text-green-700">0-12%</div>
          <div>Healthier</div>
        </div>
        <div>
          <div className="mb-1 font-semibold text-amber-700">12-18%</div>
          <div>Watch</div>
        </div>
        <div>
          <div className="mb-1 font-semibold text-rose-700">18%+</div>
          <div>Caution</div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-6 text-stone-600">
        12% is healthier. 18% is the caution threshold. Above 18% needs stronger trading evidence or sharper lease terms. These are indicative YieldLens screening thresholds, not universal rules.
      </p>
    </section>
  );
}
