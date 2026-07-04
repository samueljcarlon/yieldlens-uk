import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import RentAffordabilityTool from '@/components/RentAffordabilityTool';
import {
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  memoBandClass,
  surfaceCardClass,
  surfaceCardSoftClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Rent Affordability Check UK | YieldLens',
  description:
    'Understand the difference between rental valuation, rent affordability and commercial lease viability. Run a free commercial rent affordability check.',
  alternates: {
    canonical: '/rent-affordability-check',
  },
  openGraph: {
    title: 'Rent Affordability Check UK | YieldLens',
    description:
      'Understand the difference between rental valuation, rent affordability and commercial lease viability. Run a free commercial rent affordability check.',
    url: 'https://yieldlens.co.uk/rent-affordability-check',
  },
};

const faqs = [
  {
    question: 'Is a rent affordability check the same as a rental valuation?',
    answer:
      'No. A rental valuation estimates what a property might rent for. A rent affordability check asks whether that rent still works after income, costs and cash flow are included.',
  },
  {
    question: 'Does YieldLens provide a rental valuation?',
    answer:
      'No. YieldLens does not provide a formal rental valuation or market rent opinion. It helps compare a rent figure with the rest of the affordability picture.',
  },
  {
    question: 'What does commercial rent affordability mean?',
    answer:
      'It asks whether a shop, cafe, salon or restaurant can carry the rent after costs, cash flow pressure and opening spend are included.',
  },
  {
    question: 'Can I check whether a shop or cafe can afford the rent?',
    answer:
      'Yes. Use the commercial rent affordability calculator or run the free commercial check if you are looking at a business site.',
  },
  {
    question: 'Does YieldLens provide legal, valuation or financial advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, or a substitute for professional due diligence.',
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

const comparisonRows = [
  {
    title: 'Rental valuation',
    text: 'Estimates what a property might rent for and usually needs comparable market evidence.',
  },
  {
    title: 'Rent affordability',
    text: 'Tests whether rent is affordable against income, costs and cash flow.',
  },
  {
    title: 'Commercial rent affordability',
    text: 'Checks whether a shop, cafe, salon, restaurant or other commercial site can carry the rent before signing.',
  },
  {
    title: 'Commercial lease viability',
    text: 'Combines rent burden, opening cash, break-even pressure, downside risk and lease questions.',
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

const toolChoices = [
  {
    title: 'If you want a residential valuation',
    text: 'YieldLens is not a valuation tool. Read the comparison page to see the difference before you choose the right path.',
    href: '/rental-valuation-vs-rent-affordability',
  },
  {
    title: 'If you are checking a commercial site',
    text: 'Use the commercial rent affordability calculator or run the free commercial check for a fuller pressure-test.',
    href: '/commercial-rent-affordability-calculator',
  },
  {
    title: 'If you are about to sign a commercial lease',
    text: 'Use the lease viability check and read the checklist before signing so the lease terms stay in view.',
    href: '/commercial-lease-viability-check',
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
            Rent affordability check UK
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Rent affordability check
          </h1>
          <p className="text-lg text-stone-300 max-w-3xl mx-auto mb-6 leading-8">
            A rental valuation is not the same as rent affordability. YieldLens
            focuses on whether rent can be supported by income, costs, cash flow
            and downside pressure. For commercial sites, the question becomes
            whether the lease can be carried before signing.
          </p>
          <p className="text-sm text-stone-300 max-w-3xl mx-auto mb-8 leading-7">
            If you are checking a shop, cafe, salon or restaurant, use the
            commercial tools below. If you want the residential calculator, keep
            scrolling to the tool on this page.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/check?mode=commercial" className={heroPrimaryCtaClass}>
              Run a free commercial check
            </Link>
            <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
              View sample viability file
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-5">
            Indicative decision-support only. Not financial advice, legal advice,
            tax advice, mortgage advice, or a valuation.
          </p>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Rental valuation vs affordability"
            title="A valuation estimate is not the same as a decision."
            description="Use the comparison below to decide whether you need a valuation-style estimate, a rent affordability screen, or a commercial lease viability check."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {comparisonRows.map((item, index) => (
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
            eyebrow="Which tool should I use?"
            title="Choose the page that matches the question."
            description="Residential and commercial rent questions are related, but they are not the same. Use the page that matches the decision you are making."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {toolChoices.map((item, index) => (
              <div key={item.title} className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5`}>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-stone-700 leading-7 mb-4">{item.text}</p>
                <Link href={item.href} className="text-sm font-semibold text-[var(--yieldlens-primary)] hover:underline">
                  Open this page
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/commercial-lease-checklist-before-signing" className="text-[var(--yieldlens-primary)] font-medium hover:underline">
              Commercial lease checklist before signing
            </Link>
            <Link href="/sample-commercial-viability-file" className="text-[var(--yieldlens-primary)] font-medium hover:underline">
              Sample commercial viability file
            </Link>
          </div>
        </div>
      </section>

      <section id="calculator" className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Residential calculator"
          title="Use the calculator when you are checking a home rent number."
          description="This is the affordability tool for residential budgets. It is still not a valuation."
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
            title="If the site is commercial, switch to the commercial tools."
            description="This page exists to separate rent affordability from valuation. If you are checking a shop, cafe, salon or restaurant, use the commercial tools instead."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Commercial rent affordability calculator',
                text: 'Check whether a business can carry the rent after costs and trading pressure are added.',
                href: '/commercial-rent-affordability-calculator',
              },
              {
                title: 'Commercial lease viability check',
                text: 'Pressure-test rent burden, opening cash, break-even pressure and lease questions before signing.',
                href: '/commercial-lease-viability-check',
              },
              {
                title: 'Commercial lease checklist before signing',
                text: 'Read the lease questions that often change the outcome before any commitment is made.',
                href: '/commercial-lease-checklist-before-signing',
              },
            ].map((item, index) => (
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

          <div className="mt-6">
            <Link href="/rental-valuation-vs-rent-affordability" className="text-sm font-medium text-[var(--yieldlens-primary)] hover:underline">
              Read the rental valuation comparison
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="FAQ"
          title="Rent affordability questions"
          description="These answers separate valuation from affordability, then point commercial users to the right tool."
        />

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
            Run the free commercial check if the site is commercial.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-8">
            If you already have a rent figure, use this page to separate valuation
            from affordability. For a commercial site, the free commercial check
            and the sample file are the better next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/check?mode=commercial" className={heroPrimaryCtaClass}>
              Run a free commercial check
            </Link>
            <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
              View sample viability file
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
