import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';

export const metadata: Metadata = {
  title: 'Rent Check and Property Decision Tool | YieldLens UK',
  description:
    'Check whether rent or property costs look reasonable before committing. Use YieldLens UK for indicative residential rent and return screening.',
  alternates: {
    canonical: '/rent-affordability-check',
  },
  openGraph: {
    url: 'https://yieldlens.co.uk/rent-affordability-check',
  },
};

export default function RentAffordabilityCheckPage() {
  return (
    <SeoLandingPage
      eyebrow="Rent and property decision check"
      title="Check whether the rent or property decision deserves a second look."
      description="YieldLens UK helps renters, buyers, and landlords sanity-check residential property numbers before committing. Use it to compare rent, purchase price, costs, and downside assumptions."
      primaryCta="Run residential check"
      primaryHref="/check?mode=residential"
      secondaryCta="See report preview"
      secondaryHref="/report"
      useCases={[
        'Renters checking expensive listings',
        'Students or professionals comparing areas',
        'Buyers checking rent potential',
        'Landlords checking assumptions',
      ]}
      metrics={[
        {
          title: 'Rent assumptions',
          description:
            'Enter expected or current monthly rent to check the headline property economics.',
        },
        {
          title: 'Cost pressure',
          description:
            'Add mortgage, service charge, ground rent, and other costs to see whether the numbers survive.',
        },
        {
          title: 'Risk flags',
          description:
            'Spot thin cash flow, missing cost data, and assumptions that need verifying.',
        },
      ]}
      risks={[
        'The rent looks high but the property economics are not clear.',
        'Comparable rents have not been checked.',
        'Ownership or running costs are missing.',
        'The result depends heavily on optimistic rent assumptions.',
        'The property has weak downside resilience.',
        'Important lease, service charge, or area risks need checking.',
      ]}
      faqs={[
        {
          question: 'Is this a rent affordability calculator?',
          answer:
            'Not yet in the strict income-to-rent sense. The current check focuses on property return and rent reasonableness signals rather than personal affordability.',
        },
        {
          question: 'Can renters use YieldLens UK?',
          answer:
            'Yes. Renters can use the residential check to sanity-check rent, area assumptions, and whether a property deserves more investigation.',
        },
        {
          question: 'Will this tell me whether rent is fair?',
          answer:
            'It gives an indicative screen, not a final market rent opinion. Comparable listings and local evidence still need to be checked.',
        },
      ]}
    />
  );
}
