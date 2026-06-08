import type { Verdict, VerdictLabel } from '@/types/property';

export function getVerdictFromScore(score: number): Verdict {
  if (score >= 80) {
    return { label: 'Strong candidate' as VerdictLabel, score, colour: 
'green' };
  } else if (score >= 65) {
    return { label: 'Worth investigating' as VerdictLabel, score, colour: 
'teal' };
  } else if (score >= 50) {
    return { label: 'Marginal' as VerdictLabel, score, colour: 'yellow' };
  } else if (score >= 35) {
    return { label: 'Weak' as VerdictLabel, score, colour: 'orange' };
  } else {
    return { label: 'Avoid' as VerdictLabel, score, colour: 'red' };
  }
}
