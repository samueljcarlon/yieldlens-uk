import type { Verdict } from '@/types/property';
import VerdictBadge from './VerdictBadge';

const ringColour: Record<string, string> = {
  green: 'text-green-700',
  teal: 'text-teal-700',
  yellow: 'text-amber-700',
  orange: 'text-orange-700',
  red: 'text-rose-700',
};

export default function ScoreCard({ verdict }: { verdict: Verdict }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-stone-200 bg-white p-6 text-center shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
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
