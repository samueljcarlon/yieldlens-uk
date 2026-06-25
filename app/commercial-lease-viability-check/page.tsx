import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import ToolConversionPanel from '@/components/ToolConversionPanel';
import { disclaimerClass, heroSecondaryCtaClass, heroPrimaryCtaClass, secondaryCtaClass, surfaceCardClass, surfaceCardSoftClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Commercial Lease Viability Check | YieldLens UK',
  description:
    'Pressure-test whether a commercial site can carry the rent before you sign. Check rent burden, break-even customers, upfront cash, downside trading, survival runway, and lease questions.',
  alternates: {
    canonical: '/commercial-lease-viability-check',
  },
  openGraph: {
    title: 'Commercial Lease Viability Check | YieldLens UK',
    description:
      'Pressure-test whether a commercial site can carry the rent before you sign. Check rent burden, break-even customers, upfront cash, downside trading, survival runway, and lease questions.',
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
    question: 'Is this advice or a valuation?',
    answer:
      'YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.',
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

const exampleSummary = [
  {
    label: 'Verdict',
    value: 'Needs caution',
    helper: 'Passes the downside case, but the opening cash buffer is thin.',
    tone: 'bg-amber-50 border-amber-200 text-amber-950',
  },
  {
    label: 'Rent burden',
    value: '20.0%',
    helper: '£5,000 rent against £24,960 estimated monthly revenue.',
    tone: 'bg-white border-stone-200 text-stone-950',
  },
  {
    label: 'Break-even/day',
    value: '45.2',
    helper: 'Customers per day needed to cover the known monthly cost base.',
    tone: 'bg-white border-stone-200 text-stone-950',
  },
  {
    label: 'Six-month test',
    value: 'Pass',
    helper: 'No downside monthly burn, but opening cash still matters.',
    tone: 'bg-white border-[var(--yieldlens-border)] text-[var(--yieldlens-primary)]',
  },
];

const exampleAssumptions = [
  { label: 'Location', value: 'South London cafe unit' },
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Average spend', value: '£12' },
  { label: 'Expected customers/day', value: '80' },
  { label: 'Opening days/month', value: '26' },
  { label: 'Estimated monthly revenue', value: '£24,960' },
  { label: 'Staff, utilities, rates, rent', value: '£14,100 total cost base' },
];

const exampleOpeningCash = [
  { label: 'Fit-out', value: '£50,000' },
  { label: 'Rent deposit', value: '£15,000' },
  { label: 'Legal fees', value: '£3,000' },
  { label: 'Opening stock', value: '£8,000' },
  { label: 'Other setup costs', value: '£5,000' },
  { label: 'Upfront cash needed', value: '£81,000' },
  { label: 'Starting cash', value: '£90,000' },
  { label: 'Cash after opening', value: '£9,000' },
];

const exampleDownside = [
  { label: 'Downside case', value: '60% of expected revenue' },
  { label: 'Downside revenue', value: '£14,976' },
  { label: 'Downside monthly position', value: '£876 surplus' },
  { label: 'Survival runway', value: 'No monthly burn in downside case' },
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
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">
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
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-lease-viability-check"
        pageType="commercial_landing"
        mode="commercial"
        eventLabel="Commercial lease viability page viewed"
      />

      <section className="bg-[#F4F3F1] border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-4">
            Commercial lease viability check
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 leading-tight mb-6">
            Avoid bad commercial lease commitments before you sign.
          </h1>

          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-8 leading-8">
            YieldLens UK helps founders, operators, and small business tenants
            pressure-test rent burden, break-even customers, upfront cash,
            fit-out risk, downside trading, survival runway, and lease
            questions before committing to a lease.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_viability_page_cta_clicked"
              pagePath="/commercial-lease-viability-check"
              ctaLabel="Start free commercial check"
              pageType="commercial_landing"
              className={heroPrimaryCtaClass}
            >
              Start free commercial check
            </TrackedCtaLink>

            <TrackedCtaLink
              href="/viability-file"
              eventName="commercial_viability_page_cta_clicked"
              pagePath="/commercial-lease-viability-check"
              ctaLabel="View viability file"
              pageType="commercial_landing"
              className={heroSecondaryCtaClass}
            >
              View viability file
            </TrackedCtaLink>
          </div>

          <Link
            href="/sample-commercial-viability-file"
            className={secondaryCtaClass}
          >
            View sample file
          </Link>

          <Link
            href="/commercial-rent-affordability-calculator"
            className={secondaryCtaClass}
          >
            Commercial rent affordability calculator
          </Link>

          <Link
            href="/how-it-works"
            className={secondaryCtaClass}
          >
            Learn how it works
          </Link>

          <Link
            href="/how-it-works"
            className={secondaryCtaClass}
          >
            Learn how it works
          </Link>

          <p className={`${disclaimerClass} mt-5 text-stone-400`}>
            YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, or a substitute for professional due diligence.
          </p>

          <div className={`${surfaceCardSoftClass} mt-8 mx-auto max-w-2xl p-5 text-left`}>
            <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium">
              Standard commercial viability file
            </p>
            <p className="text-3xl font-bold mt-2 text-stone-900">£49</p>
            <p className="text-sm text-stone-600 leading-7 mt-3">
              Covers rent burden, break-even customers, upfront cash, downside
              trading, survival runway, lease questions, and a due diligence
              checklist.
            </p>
            <p className="text-xs text-stone-500 mt-3">
              Checkout appears after a commercial report request.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="The problem"
          title="A bad lease can quietly wreck a good business idea."
          description="Commercial property risk is not just about whether the location looks busy. The site has to fund opening costs, carry the rent, cover the operating cost base, and survive quieter trading."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className={`${surfaceCardClass} p-6`}>
            <p className="text-sm font-semibold text-stone-900 mb-2">
              Rent is fixed, revenue is not
            </p>
            <p className="text-sm text-stone-600 leading-6">
              Once the lease is signed, rent becomes a fixed obligation. Revenue,
              customer volume, and average spend are still uncertain.
            </p>
          </div>

          <div className={`${surfaceCardClass} p-6`}>
            <p className="text-sm font-semibold text-stone-900 mb-2">
              Fit-out spend increases the bet
            </p>
            <p className="text-sm text-stone-600 leading-6">
              A site can look viable monthly but still be unattractive once upfront
              fit-out, deposits, fees, and opening costs are included.
            </p>
          </div>

          <div className={`${surfaceCardClass} p-6`}>
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

      <section className="bg-[#F4F3F1] border-y border-stone-200">
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
                className={`${surfaceCardSoftClass} p-5`}
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
              className={`${surfaceCardClass} p-5 text-sm font-medium text-stone-800`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
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
                className={`${surfaceCardSoftClass} p-5`}
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

        <div className={`${surfaceCardClass} p-6`}>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-stone-700 list-decimal list-inside">
            {checklist.map((item) => (
              <li key={item} className={`${surfaceCardSoftClass} p-3`}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                Worked example
              </p>

              <h2 className="text-3xl font-bold mb-4">
                Worked example: 40-cover cafe lease
              </h2>

              <p className="text-sm text-stone-300 leading-7 mb-5">
                This illustrative example shows how YieldLens pressure-tests a
                South London cafe unit before signing. It is not a real property
                assessment.
              </p>

              <div className={`${surfaceCardSoftClass} bg-white/5 border-white/10 p-5`}>
                <p className="text-sm font-semibold text-white mb-2">
                  Why the verdict needs caution
                </p>

                <p className="text-sm text-stone-300 leading-7">
                  The downside case does not show monthly burn, but the site still
                  looks fragile because only £9,000 is left after opening costs.
                  This is the kind of issue a basic rent calculator misses.
                </p>
              </div>

              <TrackedCtaLink
                href="/check?mode=commercial"
                eventName="commercial_viability_page_cta_clicked"
                pagePath="/commercial-lease-viability-check"
                ctaLabel="Run your commercial lease check"
                pageType="commercial_landing"
              className={`${heroPrimaryCtaClass} mt-6`}
              >
                Run your commercial lease check
              </TrackedCtaLink>
            </div>

            <div className={`${surfaceCardClass} bg-white p-5 sm:p-6 text-stone-900`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {exampleSummary.map((item) => (
                  <div
                    key={item.label}
                    className={`border p-4 ${item.tone}`}
                  >
                    <p className="text-xs uppercase tracking-wide font-semibold mb-1">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-xs leading-5 mt-2 opacity-80">
                      {item.helper}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">
                    Trading assumptions
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    {exampleAssumptions.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-4 border-b border-stone-100 last:border-b-0 px-3 py-2.5"
                      >
                        <p className="text-xs text-stone-500">{item.label}</p>
                        <p className="text-xs font-semibold text-stone-900 text-right">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">
                    Opening cash
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    {exampleOpeningCash.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-4 border-b border-stone-100 last:border-b-0 px-3 py-2.5"
                      >
                        <p className="text-xs text-stone-500">{item.label}</p>
                        <p className="text-xs font-semibold text-stone-900 text-right">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">
                    Downside case
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    {exampleDownside.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-4 border-b border-stone-100 last:border-b-0 px-3 py-2.5"
                      >
                        <p className="text-xs text-stone-500">{item.label}</p>
                        <p className="text-xs font-semibold text-stone-900 text-right">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 mt-4">
                    <p className="text-xs font-semibold text-amber-950 mb-1">
                      Sample diagnostic note
                    </p>
                    <p className="text-xs text-amber-900 leading-5">
                      Pass, but opening cash buffer is thin. The assumptions need
                      evidence before signing.
                    </p>
                  </div>
                </div>
              </div>
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
              className={`${surfaceCardClass} p-5`}
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

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
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
          <div className="mt-4 text-center">
            <Link href="/sample-commercial-viability-file" className="text-sm font-medium text-[var(--yieldlens-caution)] hover:text-[var(--yieldlens-primary)]">
              View sample file
            </Link>
            <span className="mx-3 text-stone-400">·</span>
            <Link href="/how-it-works" className="text-sm font-medium text-[var(--yieldlens-caution)] hover:text-[var(--yieldlens-primary)]">
              Learn how it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
