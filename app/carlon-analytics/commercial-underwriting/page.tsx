import type { Metadata } from 'next';
import CommercialUnderwritingIntakeClient from './CommercialUnderwritingIntakeClient';

export const metadata: Metadata = {
  title: 'Commercial Underwriting | Carlon Analytics',
  description:
    'Request a fuller commercial lease and operating model review from Carlon Analytics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CommercialUnderwritingPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string | string[] }>;
}) {
  const params = await searchParams;
  const source = Array.isArray(params.source) ? params.source[0] : params.source;

  return <CommercialUnderwritingIntakeClient sourcePage={source || 'direct'} />;
}
