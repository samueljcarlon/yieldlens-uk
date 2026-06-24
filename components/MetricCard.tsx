import { surfaceCardClass } from '@/components/yieldLensUi';

interface Props {
  label: string;
  value: string | number;
  helper?: string;
}

export default function MetricCard({ label, value, helper }: Props) {
  return (
    <div className={`${surfaceCardClass} p-5`}>
      <div className="mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r from-teal-500 via-teal-600 to-amber-400" />
      <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400 font-medium mb-1">
        {label}
      </p>

      <p className="text-2xl font-bold text-stone-950 tabular-nums leading-none tracking-tight">
        {value}
      </p>

      {helper && (
        <p className="text-xs text-stone-500 mt-3 leading-5">
          {helper}
        </p>
      )}
    </div>
  );
}
