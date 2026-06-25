import { surfaceCardClass } from '@/components/yieldLensUi';

interface Props {
  label: string;
  value: string | number;
  helper?: string;
}

export default function MetricCard({ label, value, helper }: Props) {
  return (
    <div className={`${surfaceCardClass} overflow-hidden p-5`}>
      <div className="mb-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-[#c8c2b8] via-[var(--yieldlens-caution)] to-[#b8b1a5]" />
      <div className="inline-flex rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--yieldlens-caution)]">
        {label}
      </div>

      <p className="mt-4 text-2xl font-bold text-[var(--yieldlens-primary)] tabular-nums leading-none tracking-tight">
        {value}
      </p>

      {helper && (
        <p className="mt-3 rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-2 text-xs text-[var(--yieldlens-muted)] leading-5">
          {helper}
        </p>
      )}
    </div>
  );
}
