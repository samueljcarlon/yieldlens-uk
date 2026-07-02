import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { heroPrimaryCtaClass, heroSecondaryCtaClass, surfaceCardClass, surfaceCardSoftClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Buy-to-Let Yield Calculator UK',
  description:
    'Use the YieldLens UK buy-to-let yield calculator to estimate rental yield, cash flow, ownership costs, and downside risk before buying a UK rental property.',
  alternates: {
    canonical: '/buy-to-let-yield-calculator',
  },
  openGraph: {
    title: 'Buy-to-Let Yield Calculator UK',
    description:
      'Estimate rental yield, buy-to-let cash flow, known ownership costs, and downside risk before buying a rental property.',
    url: 'https://yieldlens.co.uk/buy-to-let-yield-calculator',
  },
};

const faqs = [
  {
    question: 'What is a buy-to-let yield calculator?',
    answer:
      'A buy-to-let yield calculator estimates rental income as a percentage of the property purchase price. YieldLens UK also checks cash flow, known ownership costs, risk flags, and downside scenarios.',
  },
  {
    question: 'What is a good rental yield in the UK?',
    answer:
      'There is no single good yield for every property. A higher yield can still be unattractive if mortgage costs, service charges, repairs, void periods, or risk are too high.',
  },
  {
    question: 'Does this calculator show cash flow?',
    answer:
      'Yes. The check estimates monthly and annual cash flow using rent and known monthly costs, including mortgage cost, service charge, ground rent, and other costs where entered.',
  },
  {
    question: 'Is this financial advice?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It is not financial advice, mortgage advice, tax advice, legal advice, or a formal property valuation.',
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
      name: 'Buy-to-Let Yield Calculator',
      item: 'https://yieldlens.co.uk/buy-to-let-yield-calculator',
    },
  ],
};

const keyChecks = [
  {
    title: 'Gross rental yield',
    text: 'Screens annual rent against the purchase price before costs get in the way.',
  },
  {
    title: 'Monthly cash flow',
    text: 'Shows whether rent still leaves room after mortgage and regular ownership costs.',
  },
  {
    title: 'Ownership costs',
    text: 'Surfaces the costs that quietly erode a headline yield.',
  },
  {
    title: 'Downside scenario',
    text: 'Checks whether the deal survives lower rent, higher costs, and void periods.',
  },
];

const riskItems = [
  'The headline yield looks fine, but monthly cash flow is thin.',
  'Mortgage costs remove most of the rental surplus.',
  'Service charge, ground rent, or maintenance costs are missing.',
  'One or two void months could wipe out annual profit.',
  'Expected rent has not been checked against comparable listings.',
  'The property only works under optimistic assumptions.',
];

const checklist = [
  'What monthly rent is realistically achievable?',
  'What is the full mortgage cost under current rates?',
  'What are the annual service charge and ground rent?',
  'Are there expected repairs, major works, or management fees?',
  'How long could the property sit empty between tenants?',
  'Does the deal still work if rent is 5% to 10% lower?',
  'Does the deal still work if costs are 10% to 20% higher?',
  'Are lease length, restrictions, EPC, and local demand understood?',
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
  ];
  return accents[index % accents.length];
}

export default function BuyToLetYieldCalculatorPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />

      <section className="bg-[var(--yieldlens-hero)] text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
            Buy-to-let yield calculator UK
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Estimate whether a buy-to-let property actually works after costs.
          </h1>
          <p className="text-lg text-stone-300 max-w-3xl mx-auto mb-8 leading-8">
            Use YieldLens UK to check rental yield, monthly cash flow, ownership costs,
            risk flags, and downside scenarios before committing serious time to a UK
            buy-to-let property.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/check?mode=residential" className={heroPrimaryCtaClass}>
              Run free buy-to-let check
            </Link>
            <Link href="/property-cash-flow-calculator" className={heroSecondaryCtaClass}>
              Compare cash flow calculator
            </Link>
          </div>

          <p className="text-xs text-stone-400 mt-5">
            Indicative decision-support only. Not a valuation or financial advice.
          </p>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why yield alone is not enough"
            title="A decent rental yield can still hide a weak deal."
            description="Gross yield is useful, but it does not tell you whether the property has enough cash flow after mortgage costs, service charge, ground rent, repairs, and void periods."
            tone="light"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-white border border-[var(--yieldlens-border)] rounded-2xl p-6 shadow-sm border-t-4 border-t-[var(--yieldlens-caution)]">
              <p className="text-sm font-semibold text-stone-900 mb-2">Yield is the headline</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                Gross rental yield compares annual rent with purchase price. It is useful
                for screening, but it is not the full investment picture.
              </p>
            </div>
            <div className="bg-white border border-[var(--yieldlens-border)] rounded-2xl p-6 shadow-sm border-t-4 border-t-[var(--yieldlens-primary)]">
              <p className="text-sm font-semibold text-stone-900 mb-2">Cash flow is the reality check</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                A property can show a good yield but still leave almost no monthly surplus
                once financing and running costs are included.
              </p>
            </div>
            <div className="bg-white border border-[var(--yieldlens-border)] rounded-2xl p-6 shadow-sm border-t-4 border-t-[var(--yieldlens-fragile)]">
              <p className="text-sm font-semibold text-stone-900 mb-2">Downside risk matters</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                If the return disappears after one void month or a service charge rise,
                the deal is fragile rather than strong.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What the check includes"
            title="A simple buy-to-let screen built around the numbers that matter."
            description="The aim is to help you decide whether a property deserves more investigation, not to drown you in a spreadsheet."
            tone="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyChecks.map((item, index) => (
              <div key={item.title} className={`rounded-2xl border border-white/10 bg-white/5 p-5 ${accentClass(index)}`}>
                <p className="font-semibold text-white mb-2">{item.title}</p>
                <p className="text-sm text-stone-300 leading-6">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Risk flags"
          title="Weak points the calculator can flag early."
          description="The free check is designed to show where a property could disappoint before you waste time on a poor deal."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskItems.map((item, index) => (
            <div
              key={item}
              className={`bg-white border border-[var(--yieldlens-border)] rounded-2xl p-5 text-sm text-stone-700 shadow-sm border-l-4 ${accentClass(index)}`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Before buying"
            title="Questions to answer before treating the yield as attractive."
            description="A buy-to-let property should survive basic pressure testing before it gets serious attention."
          />

          <div className="bg-white border border-[var(--yieldlens-border)] rounded-2xl p-6 shadow-sm">
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-stone-700 list-decimal list-inside">
              {checklist.map((item, index) => (
                <li key={item} className={`rounded-xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-3 ${accentClass(index)}`}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-3">
              Example pressure test
            </p>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              The deal can change quickly when assumptions move.
            </h2>
            <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
              YieldLens UK does not just show a headline yield. The check also
              highlights whether monthly cash flow is thin and whether a downside
              scenario could push the property into negative territory.
            </p>
          </div>

          <div className="bg-white border border-[var(--yieldlens-border)] rounded-2xl p-6 shadow-sm border-t-4 border-t-[var(--yieldlens-primary)]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[var(--yieldlens-panel)] border border-[var(--yieldlens-border)] rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)]">Gross yield</p>
                <p className="text-2xl font-bold text-stone-900">5.3%</p>
              </div>
              <div className="bg-[#f7f2ea] border border-[var(--yieldlens-border)] rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-caution)]">Base cash flow</p>
                <p className="text-2xl font-bold text-stone-900">£29/mo</p>
              </div>
              <div className="bg-[#f7efed] border border-[var(--yieldlens-border)] rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-risk)]">Stress case</p>
                <p className="text-2xl font-bold text-stone-900">Negative</p>
              </div>
            </div>

            <p className="text-xs text-[var(--yieldlens-muted)] mt-4 leading-5">
              Example only. Actual results depend on the purchase price, rent, mortgage
              cost, service charge, and other inputs entered by the user.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
            Start with a quick screen
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Run the free buy-to-let check before you commit.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-8">
            Enter the price, rent, mortgage cost, and known ownership costs. YieldLens UK
            will return the headline yield, cash flow estimate, risk flags, and downside
            pressure test.
          </p>
          <Link href="/check?mode=residential" className={heroPrimaryCtaClass}>
            Run free buy-to-let check
          </Link>
        </div>
      </section>
    </div>
  );
}
