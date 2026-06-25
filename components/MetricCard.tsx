import { surfaceCardClass } from '@/components/yieldLensUi';

interface Props {
  label: string;
  value: string | number;
  helper?: string;
}

export default function MetricCard({ label, value, helper }: Props) {
  return (
    <div className={`${surfaceCardClass} p-5`}>
      <div className="mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#d7d2c8] via-[#a6722c] to-[#b7b0a2]" />
      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--yieldlens-muted)] font-medium mb-1">
        {label}
      </p>

      <p className="text-2xl font-bold text-[var(--yieldlens-primary)] tabular-nums leading-none tracking-tight">
        {value}
      </p>

      {helper && (
        <p className="text-xs text-[var(--yieldlens-muted)] mt-3 leading-5">
          {helper}
        </p>
      )}
    </div>
  );
}
