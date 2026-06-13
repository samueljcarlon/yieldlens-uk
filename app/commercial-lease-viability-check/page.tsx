import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import ToolConversionPanel from '@/components/ToolConversionPanel';

export const metadata: Metadata = {
  title: 'Commercial Lease Viability Check | YieldLens UK',
  description:
    'Check whether a commercial site can carry the rent before signing a lease. Pressure-test rent burden, break-even customers, upfront cash, fit-out risk, downside trading, and six-month survival.',
  alternates: {
    canonical: '/commercial-lease-viability-check',
  },
  openGraph: {
    title: 'Commercial Lease Viability Check | YieldLens UK',
    description:
      'Pressure-test a commercial site before signing a lease. Check rent burden, break-even customers, upfront cash, downside trading, and six-month survival.',
    url: 'https://yieldlens.co.uk/commercial-lease-viability-check',
  },
};

const faqs = [
  {
    question: 'What is a commercial lease viability check?',
    answer:
      'A commercial lease viability check is an indicative pressure test of whether a site can support its rent, opening costs, and operating costs. It looks at rent burden, expected revenue, break-even customers, upfront cash, known costs, downside trading, and survival runway.',
  },
  {
    question: 'Is this a formal valuation?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It is not a formal valuation, financial advice, legal advice, tax advice, or a substitute for professional due diligence.',
  },
  {
    question: 'Why does rent burden matter?',
    answer:
      'Rent burden shows how much of expected revenue is absorbed by rent. If rent takes too much of revenue, the business has less room for staff, rates, utilities, insurance, stock, tax, and quieter trading periods.',
  },
  {
    question: 'Why calculate break-even customers per day?',
    answer:
      'Break-even customers per day translates fixed costs into a practical trading target. It helps show whether the site needs realistic footfall or heroic assumptions just to cover rent and known costs.',
  },
  {
    question: 'What is the six-month survival test?',
    answer:
      'The six-month survival test checks whether the site has enough cash after opening to withstand a weak trading period. A site only passes if opening costs are funded and the downside case either covers monthly costs or has enough runway for six weak months.',
  },
  {
    question: 'Why include upfront cash?',
    answer:
      'A site can look workable month to month but still be fragile if fit-out, rent deposit, legal fees, opening stock, and setup costs use too much cash before trading starts.',
  },
  {
    question: 'Can this be used before heads of terms?',
    answer:
      'Yes. The check is most useful before you commit time, legal fees, fit-out planning, or lease negotiations. It can help decide whether the site deserves deeper investigation.',
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
      name: 'Commercial Lease Viability Check',
      item: 'https://yieldlens.co.uk/commercial-lease-viability-check',
    },
  ],
};

const riskItems = [
  {
    title: 'Rent burden is too high',
    text: 'The site may need unrealistic turnover before rent feels proportionate to revenue.',
  },
  {
    title: 'Break-even customers are unrealistic',
    text: 'The daily customer target may exceed likely footfall, especially outside peak trading hours.',
  },
  {
    title: 'Fit-out risk is ignored',
    text: 'Large upfront fit-out spend can make a site fragile even when the monthly numbers appear workable.',
  },
  {
    title: 'Opening cash is too thin',
    text: 'Deposits, fees, stock, and setup costs may leave too little cash for early trading.',
  },
  {
    title: 'Six-month survival fails',
    text: 'The site may run out of cash before it has proved that the trading case is reliable.',
  },
  {
    title: 'Costs are incomplete',
    text: 'Business rates, utilities, licensing, insurance, maintenance, staffing, or stock costs may be missing.',
  },
  {
    title: 'Trading assumptions are optimistic',
    text: 'Small reductions in customers or average spend can destroy the margin.',
  },
  {
    title: 'Lease terms create hidden pressure',
    text: 'Rent reviews, break clauses, permitted use, repairing obligations, and deposits can change the real risk.',
  },
];

const useCases = [
  'Cafes and coffee shops',
  'Bars and restaurants',
  'Salons and barbers',
  'Gyms and fitness studios',
  'Retail units',
  'Studios and offices',
];

const checklist = [
  'What is the annual rent and monthly equivalent?',
  'What revenue is needed to make the rent burden acceptable?',
  'How many customers per day are needed to cover rent and known costs?',
  'How much upfront cash is needed before opening?',
  'How much cash remains after fit-out, deposit, fees, stock, and setup costs?',
  'What happens if revenue is lower than expected?',
  'How much monthly burn appears in the downside case?',
  'How many weak trading months can the opening cash buffer survive?',
  'How much fit-out spend is required before trading starts?',
  'What lease length, break clause, deposit, and repairing obligations apply?',
  'Are licensing, permitted use, planning, extraction, and trading hours suitable?',
  'Is there enough local demand to support the target customer count?',
];

const survivalChecks = [
  {
    title: 'Monthly revenue',
    text: 'Estimate revenue from average spend, expected customers, and opening days.',
  },
  {
    title: 'Rent burden',
    text: 'Compare monthly rent against estimated monthly revenue.',
  },
  {
    title: 'Break-even customers',
    text: 'Estimate the customers per day needed to cover rent and known costs.',
  },
  {
    title: 'Upfront cash needed',
    text: 'Add fit-out, rent deposit, legal fees, opening stock, and other setup costs.',
  },
  {
    title: 'Downside trading',
    text: 'Reduce expected revenue and check whether the site still covers the monthly cost base.',
  },
  {
    title: 'Six-month survival',
    text: 'Check whether cash after opening can withstand six weak trading months.',
  },
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
    <div className="text-center mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
        {eyebrow}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-stone-500 max-w-2xl mx-auto leading-6">
          {description}
        </p>
      )}
    </div>
  );
}

export default function CommercialLeaseViabilityPage() {
  return (
    <div>
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-4">
            Commercial lease viability check
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 leading-tight mb-6">
            Check whether a commercial site can carry the rent before you sign.
          </h1>

          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-8 leading-8">
            YieldLens UK helps founders, operators, and small business tenants
            pressure-test rent burden, break-even customers, upfront cash,
            fit-out risk, downside trading, and six-month survival before
            committing to a lease.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_viability_page_cta_clicked"
              pagePath="/commercial-lease-viability-check"
              ctaLabel="Run free commercial check"
              pageType="commercial_landing"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
            >
              Run free commercial check
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/viability-file"
              eventName="commercial_viability_page_cta_clicked"
              pagePath="/commercial-lease-viability-check"
              ctaLabel="View viability file"
              pageType="commercial_landing"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              View viability file
            </TrackedCtaLink>
          </div>

          <p className="text-xs text-stone-400 mt-5">
            Indicative decision-support only. Not a formal valuation, legal advice, or financial advice.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="The problem"
          title="A bad lease can quietly wreck a good business idea."
          description="Commercial property risk is not just about whether the location looks busy. The site has to fund opening costs, carry the rent, cover the operating cost base, and survive quieter trading."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-2">
              Rent is fixed, revenue is not
            </p>
            <p className="text-sm text-stone-600 leading-6">
              Once the lease is signed, rent becomes a fixed obligation. Revenue,
              customer volume, and average spend are still uncertain.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-2">
              Fit-out spend increases the bet
            </p>
            <p className="text-sm text-stone-600 leading-6">
              A site can look viable monthly but still be unattractive once upfront
              fit-out, deposits, fees, and opening costs are included.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-2">
              Optimism hides weak sites
            </p>
            <p className="text-sm text-stone-600 leading-6">
              If the site only works with perfect footfall, strong average spend,
              and low costs, it is not resilient. It is fragile.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What YieldLens checks"
            title="A commercial lease survival model, not generic commentary."
            description="The check turns a lease decision into practical numbers: rent burden, monthly cost base, upfront cash, downside monthly position, and six-month survival."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {survivalChecks.map((item) => (
              <div
                key={item.title}
                className="bg-stone-50 border border-stone-200 rounded-xl p-5"
              >
                <p className="font-semibold text-stone-900 mb-2">{item.title}</p>
                <p className="text-sm text-stone-600 leading-6">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Who it is for"
          title="Built for people considering real commercial premises."
          description="Use the check before you commit to viewings, heads of terms, legal work, fit-out planning, or a lease negotiation."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {useCases.map((item) => (
            <div
              key={item}
              className="bg-white border border-stone-200 rounded-xl p-5 text-sm font-medium text-stone-800 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Risk flags"
            title="The risks that matter before the lease becomes real."
            description="The free check is designed to expose weak assumptions early, before rent, deposits, fit-out spend, and legal work turn into expensive obligations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskItems.map((item) => (
              <div
                key={item.title}
                className="bg-stone-50 border border-stone-200 rounded-xl p-5"
              >
                <p className="font-semibold text-stone-900 mb-2">{item.title}</p>
                <p className="text-sm text-stone-600 leading-6">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Before you commit"
          title="Questions the site should answer before you sign."
          description="These are the questions a commercial viability file should force into the open before you spend serious money or negotiation effort."
        />

        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-stone-700 list-decimal list-inside">
            {checklist.map((item) => (
              <li key={item} className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-3">
                Example pressure test
              </p>

              <h2 className="text-3xl font-bold mb-4">
                A pass still needs the cash risk made obvious.
              </h2>

              <p className="text-sm text-stone-300 leading-7">
                The six-month test should only pass if opening costs are funded
                and the downside trading case either covers monthly costs or has
                enough cash runway.
              </p>
            </div>

            <div className="bg-white text-stone-900 rounded-xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Upfront cash
                  </p>
                  <p className="text-2xl font-bold">£81,000</p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Cash after opening
                  </p>
                  <p className="text-2xl font-bold">£9,000</p>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-teal-700">
                    Downside burn
                  </p>
                  <p className="text-2xl font-bold">£0</p>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-teal-700">
                    Six-month test
                  </p>
                  <p className="text-2xl font-bold">Pass</p>
                </div>
              </div>

              <p className="text-xs text-stone-500 mt-4 leading-5">
                Example only. This site covers downside monthly costs, but the
                cash left after opening is thin relative to expected revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="FAQ"
          title="Commercial lease viability questions"
        />

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
            >
              <h3 className="font-semibold text-stone-900 mb-2">
                {faq.question}
              </h3>

              <p className="text-sm text-stone-600 leading-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-teal-50 border-y border-teal-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <ToolConversionPanel
            sourceTool="commercial_lease_page"
            title="Run the free commercial check before you sign the lease."
            description="Enter the rent, trading assumptions, known costs, upfront cash items, starting cash, and downside revenue. YieldLens UK will return the headline viability score, rent burden, break-even customers, risk flags, and six-month survival view."
            primaryLabel="Run free commercial check"
            primaryHref="/check?mode=commercial"
            secondaryLabel="View viability file"
            secondaryHref="/viability-file"
          />
        </div>
      </section>
    </div>
  );
}
