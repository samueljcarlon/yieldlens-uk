import type { Verdict } from '@/types/property';

const colourMap: Record<string, string> = {
  green: 'bg-green-50 text-green-800 border-green-200',
  teal: 'bg-teal-50 text-teal-800 border-teal-200',
  yellow: 'bg-amber-50 text-amber-800 border-amber-200',
  orange: 'bg-orange-50 text-orange-800 border-orange-200',
  red: 'bg-rose-50 text-rose-800 border-rose-200',
};

export default function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const classes = colourMap[verdict.colour] ?? 'bg-stone-100 text-stone-800 border-stone-200';

  return (
    <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold border shadow-sm ${classes}`}>
      {verdict.label}
    </span>
  );
}
