import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';

export const metadata: Metadata = {
  title: 'Buy-to-Let Yield Calculator | YieldLens UK',
  description:
    'Estimate buy-to-let gross yield, cash flow, ownership costs, and downside risk before committing to a UK residential property.',
};

export default function BuyToLetYieldCalculatorPage() {
  return (
    <SeoLandingPage
      eyebrow="Buy-to-let yield calculator"
      title="Estimate whether a buy-to-let property still works after the obvious costs."
      description="YieldLens UK helps landlords and investors check gross yield, monthly cash flow, known ownership costs, and downside scenarios before spending serious time on a residential property."
      primaryCta="Run buy-to-let check"
      primaryHref="/check?mode=residential"
      secondaryCta="See report preview"
      secondaryHref="/report"
      useCases={[
        'Buy-to-let investors',
        'First-time landlords',
        'Overseas buyers',
        'Residential property deal screening',
      ]}
      metrics={[
        {
          title: 'Gross yield',
          description:
            'Estimate annual rent as a percentage of purchase price.',
        },
        {
          title: 'Monthly cash flow',
          description:
            'Check rent after mortgage costs, service charge, ground rent, and other monthly costs.',
        },
        {
          title: 'Stress case',
          description:
            'See what happens if rent is lower, costs are higher, and void periods appear.',
        },
      ]}
      risks={[
        'Gross yield looks fine but cash flow is thin.',
        'Mortgage cost is missing or understated.',
        'Service charge, ground rent, and maintenance costs are not fully known.',
        'The deal becomes negative under modest downside assumptions.',
        'Comparable rent has not been verified.',
        'Lease length, major works, or restrictions are not understood.',
      ]}
      faqs={[
        {
          question: 'What is a good buy-to-let yield?',
          answer:
            'It depends on location, financing, risk, and strategy. A yield figure alone is not enough. Cash flow and downside resilience matter too.',
        },
        {
          question: 'Does this include tax?',
          answer:
            'No. The MVP check does not calculate tax. You should check your tax position separately before making a decision.',
        },
        {
          question: 'Why does cash flow matter if the yield looks decent?',
          answer:
            'Because a property can show an acceptable gross yield but still leave almost no monthly buffer once financing and ownership costs are included.',
        },
      ]}
    />
  );
}
