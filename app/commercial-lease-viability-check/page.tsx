import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';

export const metadata: Metadata = {
  title: 'Commercial Lease Viability Check | YieldLens UK',
  description:
    'Check whether a commercial site can carry the rent before signing a lease. Estimate rent burden, break-even customers, operating costs, and downside risk.',
};

export default function CommercialLeaseViabilityPage() {
  return (
    <SeoLandingPage
      eyebrow="Commercial lease viability"
      title="Check whether a commercial site can actually carry the rent."
      description="Before signing a lease for a cafe, bar, restaurant, salon, gym, shop, or office, use YieldLens UK to pressure-test rent burden, break-even customers, trading assumptions, and downside risk."
      primaryCta="Run commercial viability check"
      primaryHref="/check?mode=commercial"
      secondaryCta="See report preview"
      secondaryHref="/report"
      useCases={[
        'Cafe or restaurant lease checks',
        'Salon, gym, retail, and studio sites',
        'Commercial tenants before heads of terms',
        'Founders checking rent and fit-out risk',
      ]}
      metrics={[
        {
          title: 'Rent burden',
          description:
            'Estimate monthly rent as a percentage of expected monthly revenue.',
        },
        {
          title: 'Break-even customers',
          description:
            'Estimate how many customers per day are needed to cover rent and known costs.',
        },
        {
          title: 'Downside scenario',
          description:
            'Pressure-test the site if customers, average spend, or operating costs move against you.',
        },
      ]}
      risks={[
        'Rent burden is too high relative to expected revenue.',
        'Break-even customers per day exceed realistic footfall.',
        'Fit-out costs are large but not recovered quickly.',
        'Business rates, utilities, staffing, licensing, or insurance are missing.',
        'The lease exposes the business to fixed costs before demand is proven.',
        'The site only works under optimistic customer assumptions.',
      ]}
      faqs={[
        {
          question: 'Is this a formal commercial valuation?',
          answer:
            'No. It is an indicative viability check based on your inputs. It helps you pressure-test a site before further due diligence.',
        },
        {
          question: 'What is rent burden?',
          answer:
            'Rent burden compares monthly rent with estimated monthly revenue. A high rent burden means the site needs stronger and more consistent trading to justify the lease.',
        },
        {
          question: 'Why check break-even customers per day?',
          answer:
            'Because a site can look attractive until you calculate how many customers are needed every trading day just to cover rent and known costs.',
        },
      ]}
    />
  );
}
