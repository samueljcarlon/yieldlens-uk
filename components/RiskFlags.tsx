import type { RiskFlag } from '@/types/property';
import { surfaceCardClass } from '@/components/yieldLensUi';

const severityStyles: Record<string, string> = {
  high: 'bg-rose-50 border-rose-200 text-rose-900',
  medium: 'bg-amber-50 border-amber-200 text-amber-900',
  low: 'bg-teal-50 border-teal-100 text-teal-900',
  info: 'bg-stone-50 border-stone-200 text-stone-600',
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
      <h3 className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-semibold mb-3">
        Risk flags
      </h3>
      <ul className="space-y-2">
        {flags.map((flag, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 border rounded-2xl px-4 py-3 text-sm shadow-sm ${severityStyles[flag.severity]}`}
          >
            <span className="font-semibold shrink-0">
              {severityLabel[flag.severity]}
            </span>
            <span>{flag.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
