import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import RentAffordabilityTool from '@/components/RentAffordabilityTool';
import ToolConversionPanel from '@/components/ToolConversionPanel';
import {
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  memoBandClass,
  surfaceCardClass,
  surfaceCardSoftClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Rent Affordability Check | Is This Rent Affordable?',
  description:
    'Check whether rent is affordable against income, bills, and commitments. If you arrived from rental valuation search terms, use YieldLens UK to test whether the number really fits the budget.',
  alternates: {
    canonical: '/rent-affordability-check',
  },
  openGraph: {
    title: 'Rent Affordability Check | Is This Rent Affordable?',
    description:
      'Check whether rent is affordable against income, bills, and commitments. Use YieldLens UK when you need to test the number rather than rely on a rental valuation.',
    url: 'https://yieldlens.co.uk/rent-affordability-check',
  },
};

const faqs = [
  {
    question: 'How much rent can I afford?',
    answer:
      'A quick way to screen affordability is to compare monthly rent with monthly take-home income, then add bills, council tax, transport, and regular commitments. YieldLens UK shows rent-to-income ratio, housing cost ratio, disposable income, and a simple verdict.',
  },
  {
    question: 'Should rent be 30% of income?',
    answer:
      'The 30% rent-to-income figure is a rough screening guide, not a rule. Some people can manage more, while others need a lower ratio because of bills, debt, travel costs, deposits, or unstable income.',
  },
  {
    question: 'Does the calculator include bills?',
    answer:
      'Yes. You can add estimated bills, council tax, transport, debt payments, and other monthly costs to see a more realistic picture than rent alone.',
  },
  {
    question: 'Is this a rental valuation?',
    answer:
      'No. YieldLens UK does not provide a rental valuation. It helps compare a rent estimate with the rest of the monthly budget so you can pressure-test whether the number is workable.',
  },
  {
    question: 'Is this financial advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It is not financial advice, debt advice, legal advice, or a substitute for professional guidance.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://yieldlens.co.uk',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Rent Affordability Check',
      item: 'https://yieldlens.co.uk/rent-affordability-check',
    },
  ],
};

const useCases = [
  'Checking if a flat is affordable',
  'Comparing rental value with cash flow',
  'Understanding rent-to-income pressure',
  'Checking bills and council tax impact',
];

const riskItems = [
  'Rent looks affordable before bills, but stretched after council tax and utilities.',
  'Transport or commuting costs make the property less affordable than expected.',
  'Debt payments or regular commitments reduce the monthly buffer.',
  'A deposit, moving costs, or furniture spend makes the first months expensive.',
  'Rent takes too much of take-home income and leaves little emergency buffer.',
  'The property is manageable only if all other costs stay unusually low.',
];

const rentalValuationPoints = [
  {
    title: 'Rental valuation',
    text: 'A rental valuation tries to estimate what rent the market might support for the property.',
  },
  {
    title: 'Rent affordability',
    text: 'A rent affordability check asks whether the tenant can carry that rent after the rest of the monthly budget is added.',
  },
  {
    title: 'Use both together',
    text: 'A rent estimate is useful, but it still needs to survive income, bills, transport, deposits, and other commitments.',
  },
];

const practicalChecks = [
  'Comparable rents',
  'Void periods',
  'Service charge',
  'Ground rent if relevant',
  'Management costs',
  'Maintenance',
  'Mortgage or finance cost',
  'Local demand',
  'Realistic achievable rent',
];

const bridgeLinks = [
  {
    title: 'Rental valuation vs rent affordability',
    text: 'Read the comparison page if you want the difference between market rent and affordability explained in one place.',
    href: '/rental-valuation-vs-rent-affordability',
  },
  {
    title: 'Property cash flow calculator',
    text: 'Use this when you want to see whether rent still covers financing and ownership costs.',
    href: '/property-cash-flow-calculator',
  },
  {
    title: 'Commercial rent affordability calculator',
    text: 'Use this for cafe, restaurant, salon, retail, and other business premises.',
    href: '/commercial-rent-affordability-calculator',
  },
  {
    title: 'Commercial lease viability check',
    text: 'Use this when the real question is whether the site can carry the rent before you sign.',
    href: '/check?mode=commercial',
  },
  {
    title: 'Sample commercial viability file',
    text: 'See how the commercial result turns into a printable decision memo before payment.',
    href: '/sample-commercial-viability-file',
  },
];

function SectionTitle({
  eyebrow,
  title,
  description,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';
  return (
    <div className="text-center mb-10">
      <p className={`text-xs font-medium uppercase tracking-widest mb-3 ${isDark ? 'text-[#DCCDA8]' : 'text-[var(--yieldlens-caution)]'}`}>
        {eyebrow}
      </p>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-sm max-w-2xl mx-auto leading-6 ${isDark ? 'text-stone-300' : 'text-[var(--yieldlens-muted)]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function accentClass(index: number) {
  const accents = [
    'border-l-[var(--yieldlens-caution)]',
    'border-l-[var(--yieldlens-primary)]',
    'border-l-[var(--yieldlens-positive)]',
    'border-l-[var(--yieldlens-fragile)]',
    'border-l-[var(--yieldlens-risk)]',
  ];
  return accents[index % accents.length];
}

export default function RentAffordabilityCheckPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />

      <section className="bg-[var(--yieldlens-hero)] text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
            Rent affordability calculator UK
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Check how much rent you can afford before you commit.
          </h1>
              <p className="text-lg text-stone-300 max-w-3xl mx-auto mb-8 leading-8">
            A rental valuation tells you what rent might be achievable. A rent
            affordability check asks whether the numbers still work after costs,
            voids, and finance. If you arrived here from rental valuation search
            terms, this page answers the affordability question instead.
              </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#calculator" className={heroPrimaryCtaClass}>
              Use rent affordability calculator
            </Link>
            <Link href="/rental-valuation-vs-rent-affordability" className={heroSecondaryCtaClass}>
              Rental value vs cash flow
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-5">
            Indicative decision-support only. Not financial advice, debt advice, or a valuation.
          </p>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Rental valuation vs affordability"
            title="A valuation estimate is not the same as a decision."
            description="A rental valuation focuses on likely rent. Affordability checks whether that rent supports the tenant, the household, or the business case after real monthly costs are included."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rentalValuationPoints.map((item, index) => (
              <div
                key={item.title}
                className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5`}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-stone-700 leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="The calculator"
            title="Use the numbers that actually affect monthly pressure."
            description="The aim is to pressure-test whether a rent estimate is workable once the rest of the budget is added."
          />

          <RentAffordabilityTool />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Before relying on a rent estimate"
          title="Check the full monthly picture before treating the figure as affordable."
          description="A rent estimate is only useful if it still works after the rest of the monthly cost stack is added."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {practicalChecks.map((item, index) => (
            <div
              key={item}
              className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-5 text-sm text-stone-700 leading-6`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why rent affordability matters"
            title="Rent alone is not the full monthly cost."
            description="A property can look affordable until bills, council tax, transport, debt payments, moving costs, and emergency savings are included."
            tone="dark"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white mb-2">Rent-to-income ratio</p>
              <p className="text-sm text-stone-300 leading-6">
                Shows how much of monthly take-home income goes directly to rent.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white mb-2">Housing cost ratio</p>
              <p className="text-sm text-stone-300 leading-6">
                Adds bills and council tax to show a more realistic housing cost burden.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white mb-2">Disposable income</p>
              <p className="text-sm text-stone-300 leading-6">
                Shows what is left after rent, bills, transport, commitments, and other entered costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Who it is for"
          title="Useful when comparing rental options."
          description="The calculator is designed for quick screening before you book viewings, pay a holding deposit, or commit to a tenancy."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((item, index) => (
            <div
              key={item}
              className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5 text-sm font-medium text-stone-800 shadow-sm`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Risk flags"
            title="Common affordability problems the calculator can expose."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskItems.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-5 text-sm text-stone-700 leading-7`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Commercial bridge"
            title="For commercial units, use the commercial tools."
            description="Residential affordability is only one part of the picture. Commercial users should use the commercial rent affordability calculator or run the commercial lease viability check."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bridgeLinks.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5 transition-all hover:-translate-y-0.5`}
              >
                <p className="text-sm font-semibold text-stone-900 mb-2">{item.title}</p>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="FAQ" title="Rent affordability calculator questions" />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-5`}
            >
              <h3 className="font-semibold text-stone-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${memoBandClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-4xl my-14`}>
        <div className="px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
            Next step
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Run the free check before you rely on a rent number.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-8">
            If you already have a rent estimate, use the calculator to see whether
            it still works after the rest of the monthly budget is added. For
            commercial units, the commercial rent affordability calculator and the
            commercial lease viability check are the better fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/check?mode=residential" className={heroPrimaryCtaClass}>
              Run rent affordability check
            </Link>
            <Link href="/commercial-rent-affordability-calculator" className={heroSecondaryCtaClass}>
              Commercial rent affordability
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
