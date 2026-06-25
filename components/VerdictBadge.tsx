import type { Verdict } from '@/types/property';

const colourMap: Record<string, string> = {
  green: 'bg-white text-[var(--yieldlens-positive)] border-[var(--yieldlens-border)]',
  teal: 'bg-white text-[var(--yieldlens-positive)] border-[var(--yieldlens-border)]',
  yellow: 'bg-[#F7F4EB] text-[var(--yieldlens-caution)] border-[#DCCDA8]',
  orange: 'bg-[#F7F1EF] text-[var(--yieldlens-fragile)] border-[#D8C5C0]',
  red: 'bg-[#F7F1EF] text-[var(--yieldlens-risk)] border-[#D8C5C0]',
};

export default function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const classes = colourMap[verdict.colour] ?? 'bg-white text-stone-800 border-[var(--yieldlens-border)]';

  return (
    <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-semibold border shadow-sm ${classes}`}>
      {verdict.label}
    </span>
  );
}
