import type { Verdict } from '@/types/property';
import VerdictBadge from './VerdictBadge';

const ringColour: Record<string, string> = {
  green: 'text-green-600',
  teal: 'text-teal-600',
  yellow: 'text-yellow-600',
  orange: 'text-orange-500',
  red: 'text-red-600',
};

export default function ScoreCard({ verdict }: { verdict: Verdict }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 flex 
flex-col items-center gap-3 text-center shadow-sm">
      <p className="text-xs uppercase tracking-widest text-stone-400 
font-medium">
        Indicative score
      </p>
      <p className={`text-6xl font-bold tabular-nums 
${ringColour[verdict.colour] ?? 'text-stone-800'}`}>
        {verdict.score}
        <span className="text-2xl text-stone-400 font-normal">/100</span>
      </p>
      <VerdictBadge verdict={verdict} />
    </div>
  );
}
