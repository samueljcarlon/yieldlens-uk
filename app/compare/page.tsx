import type { Metadata } from 'next';
import ComparePageClient from './ComparePageClient';

export const metadata: Metadata = {
  title: 'Compare Two Commercial Sites',
  description:
    'Compare two commercial premises on rent burden, opening cash, break-even pressure, downside risk and evidence gaps before signing.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Compare Two Commercial Sites | YieldLens UK',
    description:
      'Compare two commercial premises on rent burden, opening cash, break-even pressure, downside risk and evidence gaps before signing.',
    url: 'https://yieldlens.co.uk/compare',
  },
};

export default function ComparePage() {
  return <ComparePageClient />;
}
