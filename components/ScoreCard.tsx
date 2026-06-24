import type { Verdict } from '@/types/property';
import VerdictBadge from './VerdictBadge';
import { surfaceCardClass } from '@/components/yieldLensUi';

const ringColour: Record<string, string> = {
  green: 'text-green-700',
  teal: 'text-teal-700',
  yellow: 'text-amber-700',
  orange: 'text-orange-700',
  red: 'text-rose-700',
};

export default function ScoreCard({ verdict }: { verdict: Verdict }) {
  return (
    <div className={`${surfaceCardClass} flex flex-col items-center gap-3 p-6 text-center`}>
      <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-medium">
        Indicative score
      </p>
      <p className={`text-6xl font-bold tabular-nums leading-none ${ringColour[verdict.colour] ?? 'text-stone-800'}`}>
        {verdict.score}
        <span className="text-2xl text-stone-400 font-normal">/100</span>
      </p>
      <VerdictBadge verdict={verdict} />
    </div>
  );
}
