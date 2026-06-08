import type { RiskFlag } from '@/types/property';

const severityStyles: Record<string, string> = {
  high: 'bg-red-50 border-red-200 text-red-800',
  medium: 'bg-orange-50 border-orange-200 text-orange-800',
  low: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-stone-50 border-stone-200 text-stone-600',
};

const severityLabel: Record<string, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  info: 'Note',
};

export default function RiskFlags({ flags }: { flags: RiskFlag[] }) {
  if (!flags || flags.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-700 uppercase 
tracking-wide mb-3">
        Risk flags
      </h3>
      <ul className="space-y-2">
        {flags.map((flag, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 border rounded-lg px-4 py-3 
text-sm ${severityStyles[flag.severity]}`}
          >
            <span className="font-semibold 
shrink-0">{severityLabel[flag.severity]}</span>
            <span>{flag.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
