import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';

export const metadata: Metadata = {
  title: 'Property Cash Flow Calculator | YieldLens UK',
  description:
    'Estimate property cash flow after rent, mortgage costs, service charge, ground rent, and other ownership costs.',
};

export default function PropertyCashFlowCalculatorPage() {
  return (
    <SeoLandingPage
      eyebrow="Property cash flow calculator"
      title="Check whether the property has real cash flow or just a nice headline yield."
      description="Use YieldLens UK to estimate monthly and annual cash flow after the obvious property costs. Then pressure-test whether the return survives downside assumptions."
      primaryCta="Run cash flow check"
      primaryHref="/check?mode=residential"
      secondaryCta="See report preview"
      secondaryHref="/report"
      useCases={[
        'Rental property cash flow checks',
        'Mortgage and service charge stress tests',
        'Landlord cost screening',
        'Pre-viewing property shortlisting',
      ]}
      metrics={[
        {
          title: 'Monthly cash flow',
          description:
            'Estimate rent minus known monthly ownership costs.',
        },
        {
          title: 'Annual ownership costs',
          description:
            'Annualise mortgage, service charge, ground rent, and other known costs.',
        },
        {
          title: 'Downside case',
          description:
            'Check whether the property still works when rent and costs move against you.',
        },
      ]}
      risks={[
        'The cash flow buffer is too small.',
        'Service charge or maintenance is missing.',
        'Mortgage payments are too high relative to rent.',
        'One void month wipes out most of the annual surplus.',
        'The property only works if rent assumptions are optimistic.',
        'The deal is exposed to rate, repair, and management cost shocks.',
      ]}
      faqs={[
        {
          question: 'Why use a cash flow calculator as well as yield?',
          answer:
            'Yield is a headline metric. Cash flow shows whether the property actually produces surplus income after known costs.',
        },
        {
          question: 'Does this replace a full investment model?',
          answer:
            'No. It is a fast screen. It helps decide whether a property deserves deeper analysis.',
        },
        {
          question: 'Can the cash flow result be negative?',
          answer:
            'Yes. If known costs are higher than expected rent, the monthly cash flow will show as negative.',
        },
      ]}
    />
  );
}
