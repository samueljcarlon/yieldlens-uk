import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import BusinessTypeCtaBand from '@/components/BusinessTypeCtaBand';
import FaqSection from '@/components/FaqSection';
import { getCommercialCheckHref } from '@/lib/commercialBusinessType';

export const metadata: Metadata = {
  title: 'How Much Rent Can a Takeaway Afford? | YieldLens UK',
  description:
    'Check whether a takeaway unit can carry the rent before signing. Test rent burden, break-even orders, opening cash, fit-out costs and downside risk.',
  alternates: {
    canonical: 'https://yieldlens.co.uk/how-much-rent-can-a-takeaway-afford',
  },
  openGraph: {
    title: 'How Much Rent Can a Takeaway Afford? | YieldLens UK',
    description:
      'Check whether a takeaway unit can carry the rent before signing. Test rent burden, break-even orders, opening cash, fit-out costs and downside risk.',
    url: 'https://yieldlens.co.uk/how-much-rent-can-a-takeaway-afford',
  },
};

const faqItems = [
  {
    question: 'How much rent can a takeaway afford?',
    answer:
      'There is no single safe figure. A takeaway can afford rent only if expected orders, average order value, gross margin, staffing, delivery-platform costs, business rates, service charge, equipment, and opening cash can support the lease.',
  },
  {
    question: 'What costs should be included before signing a takeaway lease?',
    answer:
      'Include rent, business rates, service charge, staffing, delivery-platform fees, packaging, food cost, equipment, extraction, fit-out, opening stock, legal fees, and starting cash.',
  },
  {
    question: 'Should delivery-platform fees be included in rent affordability?',
    answer:
      'Yes. Delivery-platform fees can materially reduce margin and change the break-even orders needed to carry the rent.',
  },
  {
    question: 'Why do break-even orders matter for a takeaway?',
    answer:
      'Break-even orders translate fixed costs into a daily trading target. That makes it easier to judge whether the site needs realistic order volume or only best-case assumptions.',
  },
  {
    question: 'Is YieldLens a valuation, legal or licensing advice service?',
    answer:
      'No. YieldLens provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, or a substitute for professional due diligence.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
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
      name: 'Commercial rent affordability',
      item: 'https://yieldlens.co.uk/commercial-rent-affordability-calculator',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'How much rent can a takeaway afford',
      item: 'https://yieldlens.co.uk/how-much-rent-can-a-takeaway-afford',
    },
  ],
};

const quickAnswer = [
  'A takeaway can afford rent only if expected orders, average order value, gross margin, staffing, delivery-platform costs, business rates, service charge, equipment, and opening cash can support the lease.',
  'The rent should be tested against break-even orders and downside trading, not judged from the headline rent alone.',
];

const keyChecks = [
  {
    title: 'Rent burden',
    text: 'Shows how much of expected revenue is absorbed by rent before the rest of the cost base is paid.',
  },
  {
    title: 'Break-even orders',
    text: 'Turns the fixed monthly cost base into a daily order target the operator can judge against realistic trade.',
  },
  {
    title: 'Occupancy cost',
    text: 'Rent plus business rates and service charge is usually a better pressure test than rent alone.',
  },
  {
    title: 'Opening cash',
    text: 'Deposit, equipment, extraction, fit-out, legal fees, and opening stock can drain the buffer before trading settles.',
  },
  {
    title: 'Food and delivery margin',
    text: 'Food cost, packaging, and delivery-platform fees can narrow the margin enough to change affordability.',
  },
  {
    title: 'Downside trading',
    text: 'A site should still survive weaker order volume rather than only the expected case.',
  },
  {
    title: 'Lease flexibility',
    text: 'Break clause, rent review, lease length, and personal guarantee can change the downside materially.',
  },
];

const illustrativeNumbers = [
  { label: 'Expected monthly revenue', value: '£30,000' },
  { label: 'Average order value', value: '£18' },
  { label: 'Monthly rent', value: '£4,500' },
  { label: 'Monthly service charge', value: '£400' },
  { label: 'Business rates estimate', value: '£700' },
  { label: 'Staffing and operating costs', value: '£13,500' },
  { label: 'Food, packaging and delivery-platform cost', value: '£10,500' },
  { label: 'Equipment and fit-out', value: '£45,000' },
  { label: 'Opening cash buffer after setup', value: '£7,500' },
  { label: 'Rent burden', value: '15.0%' },
  { label: 'Occupancy cost', value: '£5,600' },
];

const takeawayRisks = [
  'Delivery-platform fees can cut margin faster than the headline rent suggests.',
  'Extraction and ventilation need to be realistic for the concept.',
  'Equipment and fit-out can absorb more cash than planned.',
  'Permitted use and planning or licensing should be verified with the right professional.',
  'Food hygiene and operational compliance should be checked with the right professional.',
  'Opening hours and delivery radius assumptions can change the order volume.',
  'Service charge and business rates can increase the true monthly cost base.',
  'Rent review, break clause, and personal guarantee can change the downside if trade underperforms.',
];

const relatedLinks = [
  {
    title: 'Commercial rent affordability calculator',
    href: '/commercial-rent-affordability-calculator',
    text: 'Check whether the business can carry the rent after costs and weaker trading are counted.',
  },
  {
    title: 'Commercial lease viability check',
    href: '/commercial-lease-viability-check',
    text: 'Pressure-test rent burden, opening cash, break-even pressure, downside trading, and lease questions.',
  },
  {
    title: 'Commercial lease checklist before signing',
    href: '/commercial-lease-checklist-before-signing',
    text: 'Use the checklist hub when you want the lease questions grouped by issue.',
  },
  {
    title: 'How much rent can a cafe afford',
    href: '/how-much-rent-can-a-cafe-afford',
    text: 'Use the cafe page if the concept is coffee-led or has strong daytime trade.',
  },
  {
    title: 'How much rent can a shop afford',
    href: '/how-much-rent-can-a-shop-afford',
    text: 'Use the shop page if the unit is retail-led rather than food-led.',
  },
  {
    title: 'Salon lease viability check',
    href: '/salon-lease-viability-check',
    text: 'Use the salon page when chair capacity and treatment demand drive the question.',
  },
  {
    title: 'Restaurant lease viability check',
    href: '/restaurant-lease-viability-check',
    text: 'Use the restaurant page when covers, extraction, and kitchen fit-out are central.',
  },
  {
    title: 'Commercial service charge before signing',
    href: '/commercial-service-charge-before-signing',
    text: 'Check how shared building costs change the occupancy cost.',
  },
  {
    title: 'Commercial business rates before signing',
    href: '/commercial-business-rates-before-signing',
    text: 'Check how rates affect the monthly cost base and break-even pressure.',
  },
  {
    title: 'Commercial fit-out costs before signing',
    href: '/commercial-fit-out-costs-before-signing',
    text: 'Check how fit-out affects the opening cash buffer.',
  },
  {
    title: 'Commercial break clause before signing',
    href: '/commercial-break-clause-before-signing',
    text: 'Check whether exit flexibility reduces downside if the site underperforms.',
  },
  {
    title: 'Commercial personal guarantee before signing',
    href: '/commercial-personal-guarantee-before-signing',
    text: 'Check whether personal downside exposure changes the lease risk.',
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
    <div className="mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-3">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">{title}</h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
    </div>
  );
}

export default function TakeawayRentAffordabilityPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <JsonLd data={faqStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/how-much-rent-can-a-takeaway-afford"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Takeaway rent guide viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Takeaway rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                How much rent can a takeaway afford?
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A takeaway can look attractive because of delivery demand, but rent still has to be supported by realistic orders, margins, staffing, service charge, business rates, equipment, extraction, fit-out and opening cash before signing.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Takes around 2 minutes. No account required. Sample available before payment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href={getCommercialCheckHref('takeaway')}
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-much-rent-can-a-takeaway-afford"
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
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                Quick answer
              </p>
              <p className="text-sm text-stone-300 leading-7 mb-4">
                A takeaway can afford rent only if expected orders, average order value, gross margin, staffing, delivery-platform costs, business rates, service charge, equipment, and opening cash can support the lease. The rent should be tested against break-even orders and downside trading, not judged from headline rent alone.
              </p>
              <div className="space-y-3 text-sm text-stone-300 leading-7">
                {quickAnswer.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-16">
        <SectionTitle
          eyebrow="The key checks"
          title="The takeaway rent question only works if the full cost stack is visible."
          description="These checks keep the decision focused on whether the unit can carry the rent after orders, costs, and opening pressure are counted."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyChecks.map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="font-semibold text-stone-900 mb-2">{item.title}</p>
              <p className="text-sm text-stone-600 leading-6">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Worked example"
            title="Illustrative takeaway numbers only."
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
                <li>Rent burden is rent divided by expected monthly revenue.</li>
                <li>Occupancy cost is rent plus service charge plus business rates.</li>
                <li>Break-even orders show the trading level needed to cover fixed costs.</li>
                <li>Delivery-platform fees can reduce margin enough to change the answer.</li>
                <li>Downside trading matters because the best month is not the test.</li>
              </ul>
              <p className="mt-4 text-sm text-stone-600 leading-7">
                In this illustration, the headline rent is only one part of the decision. Once the full occupancy cost and opening cash use are added, the unit needs a stronger trading cushion before the lease feels comfortable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Takeaway-specific risks"
          title="The lease only works if the kitchen, delivery, and opening cash assumptions hold up."
          description="These are practical checks to verify with the right professionals before you treat the site as viable."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {takeawayRisks.map((item) => (
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
            title="The free check turns the rent number into a decision path."
            description="YieldLens does not review the lease, verify orders, or give legal, valuation, licensing, or compliance advice. It structures the numbers and questions so the commercial side is easier to judge."
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
          title="Use these questions to pressure-test the takeaway lease."
          description="The list keeps the focus on the commercial decision, not on valuation or compliance language."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'How many orders are needed each day to cover rent and costs?',
            'What average order value is assumed?',
            'What happens if order volume is 15% to 25% lower than expected?',
            'Are delivery-platform costs included?',
            'Are business rates and service charge included?',
            'Is extraction or ventilation already suitable?',
            'How much cash remains after equipment, deposit and fit-out?',
            'Is there a rent-free period?',
            'Is there a break clause?',
            'Does a personal guarantee change the downside?',
          ].map((item, index) => (
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
            eyebrow="Business-type rent checks"
            title="Use the pages that match the type of unit."
            description="The takeaway page sits alongside the other business-type affordability checks so the cluster stays easy to navigate."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'How much rent can a cafe afford',
                href: '/how-much-rent-can-a-cafe-afford',
                text: 'Use the cafe page when covers, staffing, and daytime trade drive the rent question.',
              },
              {
                title: 'How much rent can a shop afford',
                href: '/how-much-rent-can-a-shop-afford',
                text: 'Use the shop page when footfall, stock, and retail margin drive the model.',
              },
              {
                title: 'How much rent can a barber shop afford',
                href: '/how-much-rent-can-a-barber-shop-afford',
                text: 'Use the barber shop page when chair utilisation and appointments drive the lease check.',
              },
              {
                title: 'Restaurant lease viability check',
                href: '/restaurant-lease-viability-check',
                text: 'Use the restaurant page when covers, extraction, and kitchen fit-out matter.',
              },
              {
                title: 'Salon lease viability check',
                href: '/salon-lease-viability-check',
                text: 'Use the salon page when chair utilisation and treatment capacity drive the decision.',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-xl border border-[var(--yieldlens-border)] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <p className="text-sm font-semibold text-stone-900 mb-2">{item.title}</p>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{item.text}</p>
              </Link>
            ))}
          </div>
          <SectionTitle
            eyebrow="Related guides"
            title="Use the pages that match the decision."
            description="Keep the cluster compact and useful."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedLinks.slice(0, 5).map((item) => (
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

      <FaqSection
        eyebrow="FAQ"
        title="Takeaway rent affordability questions"
        description="These answers are concise by design and keep the focus on commercial viability."
        faqs={faqItems}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className="bg-stone-950 text-white border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D6C7A2] font-medium mb-3">
            Pressure-test the rent before you commit.
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Run a free commercial check, then decide whether the unit deserves deeper work.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge rent burden, break-even orders, opening cash, and downside trading before a lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href={getCommercialCheckHref('takeaway')}
              eventName="commercial_home_cta_clicked"
              pagePath="/how-much-rent-can-a-takeaway-afford"
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
            <Link
              href="/commercial-lease-viability-check"
              className="bg-white text-stone-950 px-6 py-3 rounded font-medium hover:bg-stone-100 transition-colors text-sm text-center"
            >
              Commercial lease viability check
            </Link>
          </div>
        </div>
      </section>

      <BusinessTypeCtaBand
        pagePath="/how-much-rent-can-a-takeaway-afford"
        businessType="takeaway"
        copy="Use the free commercial check to test order volume, delivery fees, equipment, fit-out, and opening cash before spending time or money on the next stage."
        compareLabel="Comparing two possible sites? Compare two sites before taking one further."
      />
    </div>
  );
}
