import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'How Much Rent Can a Shop Afford? | YieldLens UK',
  description:
    'Check whether a shop or retail unit can carry the rent before signing. Test rent burden, opening cash, break-even pressure and downside risk.',
  alternates: {
    canonical: 'https://yieldlens.co.uk/how-much-rent-can-a-shop-afford',
  },
  openGraph: {
    title: 'How Much Rent Can a Shop Afford? | YieldLens UK',
    description:
      'Check whether a shop or retail unit can carry the rent before signing. Test rent burden, opening cash, break-even pressure and downside risk.',
    url: 'https://yieldlens.co.uk/how-much-rent-can-a-shop-afford',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much rent can a shop afford?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'There is no single safe rent figure. A shop can afford depends on expected revenue, gross margin, staffing, business rates, service charge, fit-out costs, opening cash, rent-free period, and downside trading.',
      },
    },
    {
      '@type': 'Question',
      name: 'What rent burden is too high for a shop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'There is no universal rule. A lower rent burden usually leaves more room for staffing, rates, utilities, and weaker trading, while a higher rent burden needs stronger evidence and tighter lease terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can YieldLens tell me whether to sign a shop lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'No. YieldLens provides indicative decision-support only. It helps structure the commercial numbers and questions before you commit, but it does not tell you to sign or not sign a lease.',
      },
    },
  ],
};

const quickAnswerPoints = [
  'A shop can look affordable from the headline rent alone and still be too tight once sales, margin, staffing, rates, service charge, and fit-out are included.',
  'There is no single safe rent figure. The answer depends on expected monthly revenue, operating costs, opening cash, rent-free period, lease length, break clause, and downside trading.',
  'If the rent only works in the best case, the lease is fragile rather than affordable.',
];

const illustrativeNumbers = [
  { label: 'Expected monthly revenue', value: '£24,000' },
  { label: 'Monthly rent', value: '£4,000' },
  { label: 'Monthly service charge', value: '£500' },
  { label: 'Business rates estimate', value: '£750' },
  { label: 'Other monthly operating costs', value: '£12,500' },
  { label: 'Fit-out or setup cost', value: '£35,000' },
  { label: 'Opening cash buffer after setup', value: '£8,000' },
  { label: 'Rent burden', value: '16.7%' },
  { label: 'Occupancy cost', value: '£5,250' },
  { label: 'Opening pressure', value: 'High enough to merit caution' },
];

const shopRisks = [
  'Footfall can be seasonal or uneven across the week.',
  'Stock and inventory can tie up cash before the shop opens strongly.',
  'Staffing cover can move quickly when sales are slower than planned.',
  'Shrinkage or wastage can matter where stock turns are weak.',
  'Service charge and business rates can change the true occupancy cost.',
  'Fit-out, signage and opening stock can drain cash before trading stabilises.',
  'Rent review, break clause, lease length and personal guarantee can change the downside.',
];

const relatedLinks = [
  {
    title: 'Commercial rent affordability calculator',
    href: '/commercial-rent-affordability-calculator',
    text: 'Check whether a business can carry the rent after costs and trading pressure are added.',
  },
  {
    title: 'Commercial lease viability check',
    href: '/commercial-lease-viability-check',
    text: 'Pressure-test rent burden, opening cash, break-even pressure and lease questions before signing.',
  },
  {
    title: 'Commercial lease checklist before signing',
    href: '/commercial-lease-checklist-before-signing',
    text: 'Read the lease questions that can change the result before any commitment is made.',
  },
  {
    title: 'Commercial service charge before signing',
    href: '/commercial-service-charge-before-signing',
    text: 'Check how recurring service charge affects the true occupancy cost.',
  },
  {
    title: 'Commercial business rates before signing',
    href: '/commercial-business-rates-before-signing',
    text: 'Check how business rates affect the monthly cost base and break-even pressure.',
  },
];

const questionsBeforeSigning = [
  'What monthly sales are needed to cover rent and costs?',
  'What happens if sales are 15% to 25% lower than expected?',
  'How much cash remains after fit-out, deposit and opening costs?',
  'Are business rates and service charge included in the affordability view?',
  'Is there a rent-free period?',
  'Is there a break clause?',
  'How long is the lease commitment?',
  'Does a personal guarantee change the downside?',
  'What evidence supports the sales assumption?',
];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-stone-600 max-w-3xl leading-7">
          {description}
        </p>
      )}
    </div>
  );
}

export default function ShopRentAffordabilityPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <JsonLd data={faqStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/how-much-rent-can-a-shop-afford"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Shop rent guide viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Shop rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                How much rent can a shop afford?
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A shop can look affordable from the headline rent alone, but the
                real question is whether expected sales, margin, staffing,
                business rates, service charge, fit-out and opening cash can
                support the lease before signing.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Takes around 2 minutes. No account required. Sample available
                before payment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-much-rent-can-a-shop-afford"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className="bg-[var(--yieldlens-primary)] text-stone-950 px-6 py-3 rounded font-semibold hover:bg-[var(--yieldlens-primary-hover)] transition-colors text-sm text-center"
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link
                  href="/sample-commercial-viability-file"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
                >
                  View sample viability file
                </Link>
              </div>
              <p className="text-xs text-stone-400 mt-5">
                YieldLens UK provides indicative decision-support only. It is not
                a valuation, financial advice, mortgage advice, legal advice, tax
                advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                Quick answer
              </p>
              <div className="space-y-3 text-sm text-stone-300 leading-7">
                {quickAnswerPoints.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What drives the answer"
          title="There is no single safe rent figure."
          description="A shop’s affordable rent depends on the trading model and the lease terms around it."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Expected monthly revenue',
            'Gross margin',
            'Staffing and operating costs',
            'Business rates',
            'Service charge',
            'Fit-out and opening cash',
            'Rent-free period',
            'Break clause and lease length',
            'Downside trading scenario',
          ].map((item, index) => (
            <div
              key={item}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7"
            >
              <div className="mb-2 h-1 w-10 rounded-full bg-[var(--yieldlens-caution)]" style={{ opacity: 0.9 - index * 0.04 }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Worked example"
            title="Illustrative shop numbers only."
            description="These numbers are fictional and used to show how the rent question changes once the full monthly cost stack is included."
          />

          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
            <div className="rounded-2xl border border-[var(--yieldlens-border)] bg-white p-5 sm:p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {illustrativeNumbers.map((item) => (
                  <div key={item.label} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-stone-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--yieldlens-border)] bg-white p-5 sm:p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">How to read the example</p>
              <ul className="space-y-3 text-sm text-stone-700 leading-7">
                <li>Rent burden is rent divided by revenue.</li>
                <li>Occupancy cost is rent plus service charge plus business rates.</li>
                <li>Opening cash pressure matters because fit-out and setup costs arrive before trading is stable.</li>
                <li>Downside trading matters because the best month is not the test.</li>
              </ul>
              <p className="mt-4 text-sm text-stone-600 leading-7">
                In this illustration the headline rent is only one part of the
                decision. Once the full occupancy cost and opening cash use are
                added, the site needs a stronger trading cushion before the lease
                feels comfortable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Shop-specific risks"
          title="Retail sites have their own pressure points."
          description="The lease only works if the shop can keep enough room for stock, staffing, and quieter trading periods."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shopRisks.map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What YieldLens checks"
            title="The free check and the £49 file turn the rent number into a decision path."
            description="YieldLens does not verify sales, review the lease, or provide valuation advice. It structures the numbers and the questions so the commercial side is easier to judge."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-stone-900 mb-3">Free commercial check</p>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>Rent burden</li>
                <li>Opening cash</li>
                <li>Break-even pressure</li>
                <li>Downside trading</li>
                <li>Key assumptions</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-stone-900 mb-3">£49 Standard Commercial Viability File</p>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>Stress-test interpretation</li>
                <li>Negotiation levers</li>
                <li>Evidence checklist</li>
                <li>Lease questions</li>
                <li>Printable decision memo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Questions before signing"
          title="Use these questions to pressure-test the shop lease."
          description="The list keeps the focus on the commercial decision, not on valuation language."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questionsBeforeSigning.map((item, index) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              <span className="mr-2 font-semibold text-[var(--yieldlens-caution)]">{index + 1}.</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related guides"
            title="Use the pages that match the decision."
            description="Keep the cluster compact and useful."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedLinks.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-xl border border-[var(--yieldlens-border)] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <p className="text-sm font-semibold text-stone-900 mb-2">{item.title}</p>
                <p className="text-sm text-stone-600 leading-6">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="FAQ"
          title="Shop rent affordability questions"
          description="These answers are concise by design and keep the focus on commercial viability."
        />
        <div className="space-y-4">
          {[
            {
              question: 'How much rent can a shop afford?',
              answer:
                'There is no single answer. It depends on revenue, margin, staffing, rates, service charge, fit-out, opening cash and lease terms.',
            },
            {
              question: 'What rent burden is too high for a shop?',
              answer:
                'There is no universal rule. Lower rent burden usually gives more room for stock, wages and quieter trading, while higher rent burden needs stronger evidence and tighter lease terms.',
            },
            {
              question: 'Should service charge and business rates be included?',
              answer:
                'Yes. They are part of the true occupancy cost and can change the affordability picture materially.',
            },
            {
              question: 'Can a shop afford rent if the fit-out is expensive?',
              answer:
                'Sometimes, but expensive fit-out means the opening cash buffer matters more and the downside case needs more protection.',
            },
            {
              question: 'Is YieldLens a valuation or legal advice service?',
              answer:
                'No. YieldLens provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, or a substitute for professional due diligence.',
            },
          ].map((faq, index) => (
            <div key={faq.question} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-stone-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-stone-600 leading-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
            Next step
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            Run the free commercial check if the site is commercial.
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl mx-auto mb-8 leading-7">
            If you are comparing a retail unit, the free check and sample file are
            the faster way to see whether the rent, opening cash and downside
            case still make sense.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/check?mode=commercial" className="bg-[var(--yieldlens-primary)] text-stone-950 px-6 py-3 rounded font-semibold hover:bg-[var(--yieldlens-primary-hover)] transition-colors text-sm text-center">
              Run a free commercial check
            </Link>
            <Link href="/sample-commercial-viability-file" className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center">
              View sample viability file
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
