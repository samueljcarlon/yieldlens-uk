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
    <div className={`${surfaceCardClass} flex flex-col items-center gap-3 p-6 text-center`}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--yieldlens-muted)] font-medium">
        Indicative score
      </p>
      <p className={`text-6xl font-bold tabular-nums leading-none tracking-tight ${ringColour[verdict.colour] ?? 'text-stone-800'}`}>
        {verdict.score}
        <span className="text-2xl text-[var(--yieldlens-muted)] font-normal">/100</span>
      </p>
      <VerdictBadge verdict={verdict} />
    </div>
  );
}
