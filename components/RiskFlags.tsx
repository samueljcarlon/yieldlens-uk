import type { RiskFlag } from '@/types/property';
import { surfaceCardClass } from '@/components/yieldLensUi';

const severityStyles: Record<string, string> = {
  high: 'bg-[#f7efed] border-[var(--yieldlens-risk)] text-[var(--yieldlens-risk)]',
  medium: 'bg-[#f7f2ea] border-[var(--yieldlens-caution)] text-[var(--yieldlens-caution)]',
  low: 'bg-[#f3f7f4] border-[var(--yieldlens-positive)] text-[var(--yieldlens-positive)]',
  info: 'bg-white border-[var(--yieldlens-border)] text-[var(--yieldlens-muted)]',
};

const severityLabel: Record<string, string> = {
  high: 'High',
  medium: 'Watch',
  low: 'Note',
  info: 'Note',
};

export default function RiskFlags({ flags }: { flags: RiskFlag[] }) {
  if (!flags || flags.length === 0) return null;

  return (
    <div className={`${surfaceCardClass} p-5`}>
      <h3 className="text-[11px] uppercase tracking-[0.2em] text-[var(--yieldlens-muted)] font-semibold mb-3">
        Risk flags
      </h3>
      <ul className="space-y-2">
        {flags.map((flag, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 rounded-2xl border-l-4 border px-4 py-3 text-sm shadow-sm ${severityStyles[flag.severity]}`}
          >
            <span className="mt-0.5 inline-flex shrink-0 rounded-full border border-current/20 bg-white/60 px-2 py-0.5 font-semibold uppercase tracking-wide text-[10px]">
              {severityLabel[flag.severity]}
            </span>
            <span className="leading-6">{flag.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
