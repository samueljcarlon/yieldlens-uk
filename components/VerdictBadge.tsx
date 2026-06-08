import type { Verdict } from '@/types/property';

const colourMap: Record<string, string> = {
  green: 'bg-green-100 text-green-800 border-green-200',
  teal: 'bg-teal-100 text-teal-800 border-teal-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  red: 'bg-red-100 text-red-800 border-red-200',
};

export default function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const classes = colourMap[verdict.colour] ?? 'bg-stone-100 text-stone-800 border-stone-200';

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${classes}`}>
      {verdict.label}
    </span>
  );
}
