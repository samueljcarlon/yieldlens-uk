import type { Verdict } from '@/types/property';
import VerdictBadge from './VerdictBadge';
import { surfaceCardClass } from '@/components/yieldLensUi';

const ringColour: Record<string, string> = {
  green: 'text-[var(--yieldlens-positive)]',
  teal: 'text-[var(--yieldlens-positive)]',
  yellow: 'text-[var(--yieldlens-caution)]',
  orange: 'text-[var(--yieldlens-fragile)]',
  red: 'text-[var(--yieldlens-risk)]',
};

export default function ScoreCard({ verdict }: { verdict: Verdict }) {
  return (
    <div className={`${surfaceCardClass} overflow-hidden flex flex-col items-center gap-3 p-6 text-center`}>
      <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-[#c8c2b8] via-[var(--yieldlens-caution)] to-[#b8b1a5]" />
      <p className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--yieldlens-muted)] font-semibold">
        Indicative score
      </p>
      <p className={`text-5xl font-bold tabular-nums leading-none tracking-tight sm:text-6xl ${ringColour[verdict.colour] ?? 'text-stone-800'}`}>
        {verdict.score}
        <span className="text-2xl text-[var(--yieldlens-muted)] font-normal">/100</span>
      </p>
      <VerdictBadge verdict={verdict} />
    </div>
  );
}
