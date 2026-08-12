import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import BusinessTypeCtaBand from '@/components/BusinessTypeCtaBand';
import { getCommercialCheckHref } from '@/lib/commercialBusinessType';

export const metadata: Metadata = {
  title: 'How Much Rent Can a Barber Shop Afford? | YieldLens UK',
  description:
    'Check whether a barber shop can carry the rent before signing. Test chair utilisation, rent burden, opening cash, break-even pressure and downside risk.',
  alternates: {
    canonical: 'https://yieldlens.co.uk/how-much-rent-can-a-barber-shop-afford',
  },
  openGraph: {
    title: 'How Much Rent Can a Barber Shop Afford? | YieldLens UK',
    description:
      'Check whether a barber shop can carry the rent before signing. Test chair utilisation, rent burden, opening cash, break-even pressure and downside risk.',
    url: 'https://yieldlens.co.uk/how-much-rent-can-a-barber-shop-afford',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much rent can a barber shop afford?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no single safe number. A barber shop can afford rent only if expected cuts, average spend, chair utilisation, staffing, service charge, business rates, fit-out, and opening cash can support the lease.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I check before signing a barber shop lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check chair utilisation, break-even appointments, rent burden, occupancy cost, opening cash, downside trading, rent review, break clause, lease length, and any personal guarantee.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does YieldLens provide valuation, tax or legal advice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, or a substitute for professional due diligence.',
      },
    },
  ],
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
      name: 'How much rent can a barber shop afford',
      item: 'https://yieldlens.co.uk/how-much-rent-can-a-barber-shop-afford',
    },
  ],
};

const quickAnswer = [
  'A barber shop can afford rent only if expected cuts, average spend, chair utilisation, staffing, rates, service charge, fit-out, and opening cash can support the lease.',
  'The rent should be tested against break-even appointments and downside trading, not judged from the headline rent alone.',
  'A barbershop with weak chair utilisation or too little opening cash is fragile even if the rent looks modest.',
];

const keyChecks = [
  'Rent burden: rent as a percentage of expected monthly revenue',
  'Chair utilisation: how many chairs are actually earning revenue',
  'Break-even appointments: cuts or bookings needed to cover fixed costs',
  'Occupancy cost: rent plus service charge, business rates, and property costs',
  'Opening cash: cash left after deposit, fit-out, equipment, and launch costs',
  'Downside trading: whether the shop survives weaker appointment volume',
  'Lease flexibility: break clause, rent review, lease length, and personal guarantee',
];

const exampleSummary = [
  { label: 'Expected monthly revenue', value: '£22,000' },
  { label: 'Average customer spend', value: '£24' },
  { label: 'Monthly rent', value: '£3,500' },
  { label: 'Monthly service charge', value: '£300' },
  { label: 'Business rates estimate', value: '£500' },
  { label: 'Staffing and operating costs', value: '£10,500' },
  { label: 'Fit-out and equipment', value: '£28,000' },
  { label: 'Opening cash buffer after setup', value: '£6,500' },
  { label: 'Rent burden', value: '15.9%' },
  { label: 'Occupancy cost', value: '£4,300' },
];

const barberRisks = [
  'Chair utilisation matters more than the headline rent.',
  'Walk-in and appointment assumptions should be tested separately.',
  'Average spend per customer can shift quickly if the service mix changes.',
  'Self-employed chair arrangements or staffing structures should be understood as assumptions, not treated as fixed.',
  'Fit-out and equipment can absorb cash before the shop proves demand.',
  'Service charge and business rates can push the occupancy cost higher than expected.',
  'Rent review, break clause, lease length, and personal guarantee can change the downside.',
  'Local competition and footfall still matter even where appointment demand is strong.',
];

const relatedGuides = [
  {
    title: 'Salon lease viability check',
    href: '/salon-lease-viability-check',
    text: 'Use the salon page when treatment capacity, chair utilisation, and booking ramp-up drive the question.',
  },
  {
    title: 'Commercial rent affordability calculator',
    href: '/commercial-rent-affordability-calculator',
    text: 'Check whether the unit can carry the rent after costs and weaker trading are counted.',
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
    title: 'How much rent can a shop afford',
    href: '/how-much-rent-can-a-shop-afford',
    text: 'Use the shop page if the unit is retail-led rather than appointment-led.',
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

export default function BarberShopRentAffordabilityPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <JsonLd data={faqStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/how-much-rent-can-a-barber-shop-afford"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Barber shop rent guide viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Barber shop rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                How much rent can a barber shop afford?
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A barber shop can look affordable from the rent alone, but the lease only
                works if chairs, pricing, utilisation, staffing, service charge, business
                rates, fit-out, and opening cash can support the rent before signing.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Takes around 2 minutes. No account required. Sample available before payment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href={getCommercialCheckHref('barber_shop')}
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-much-rent-can-a-barber-shop-afford"
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
                YieldLens UK provides indicative decision-support only. It is not a valuation,
                financial advice, mortgage advice, legal advice, tax advice, or a substitute
                for professional due diligence.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                Quick answer
              </p>
              <p className="text-sm text-stone-300 leading-7 mb-4">
                A barber shop can afford rent only if expected cuts, average spend, chair
                utilisation, staffing, rates, service charge, fit-out, and opening cash can
                support the lease. The rent should be tested against break-even appointments
                and downside trading, not judged from the headline rent alone.
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

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="The key checks"
          title="What needs to work before the barber shop lease feels affordable."
          description="YieldLens helps pressure-test rent burden, opening cash, break-even pressure, and downside trading before signing."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyChecks.map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Illustrative example"
            title="Example only, not a real case study."
            description="These numbers show the shape of the decision, not a recommendation."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {exampleSummary.map((item) => (
              <div key={item.label} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] mb-2">{item.label}</p>
                <p className="text-sm font-semibold text-stone-900">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-stone-200 bg-white p-5 text-sm text-stone-700 leading-7">
            Rent burden here is 15.9% and occupancy cost is £4,300. The point is not that the
            figure is safe or certain. The point is that break-even appointments, chair
            utilisation, and downside trading need to hold together once the full cost stack
            is included.
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Barber shop risks"
          title="The rent question only works if the service model is realistic."
          description="Use these checks to compare the lease against the trading assumptions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {barberRisks.map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What YieldLens checks"
            title="Use the free commercial check to organise the assumptions."
            description="The £49 Standard Commercial Viability File turns the result into a printable decision memo."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--yieldlens-border)] bg-white p-6">
              <p className="text-sm font-semibold text-stone-900 mb-3">Free check</p>
              <div className="space-y-2 text-sm text-stone-700 leading-7">
                <p>Rent burden</p>
                <p>Opening cash</p>
                <p>Break-even pressure</p>
                <p>Downside trading</p>
                <p>Key assumptions</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--yieldlens-border)] bg-white p-6">
              <p className="text-sm font-semibold text-stone-900 mb-3">£49 Standard Commercial Viability File</p>
              <div className="space-y-2 text-sm text-stone-700 leading-7">
                <p>Stress-test interpretation</p>
                <p>Negotiation levers</p>
                <p>Evidence checklist</p>
                <p>Lease questions</p>
                <p>Printable decision memo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Questions before signing"
          title="Ask the questions that change the rent decision."
          description="These keep the discussion commercial and practical."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'How many cuts or appointments are needed each day to cover rent and costs?',
            'What average customer spend is assumed?',
            'How many chairs are realistically active?',
            'What happens if appointment volume is 15% to 25% lower than expected?',
            'Are business rates and service charge included?',
            'How much cash remains after fit-out, deposit, and equipment?',
            'Is there a rent-free period?',
            'Is there a break clause?',
            'Does a personal guarantee change the downside?',
            'What evidence supports the revenue assumption?',
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
            eyebrow="Related guides"
            title="Use the pages that match the decision."
            description="Keep the cluster compact and useful."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedGuides.map((item) => (
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
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="FAQ"
          title="Barber shop rent affordability questions"
          description="Short answers for people deciding whether a barber shop site deserves a deeper look."
        />
        <div className="space-y-4">
          {[
            {
              question: 'How much rent can a barber shop afford?',
              answer:
                'There is no universal number. It depends on expected cuts, average spend, chair utilisation, staffing, rates, service charge, fit-out, opening cash, and lease terms.',
            },
            {
              question: 'What costs should I include before signing a barber shop lease?',
              answer:
                'Include staffing, rates, utilities, service charge, fit-out, equipment, deposit, legal fees, launch costs, and starting cash so the opening position is not underestimated.',
            },
            {
              question: 'Why does chair utilisation matter?',
              answer:
                'A barber shop may have several chairs, but only the active ones generate revenue. Utilisation affects whether the rent can be carried day to day.',
            },
            {
              question: 'Should service charge and business rates be included?',
              answer:
                'Yes. They are part of the true occupancy cost and can materially change the affordability picture.',
            },
            {
              question: 'Is YieldLens a valuation, tax or legal advice service?',
              answer:
                'No. YieldLens provides indicative decision-support only. It is not valuation, tax, legal, mortgage, or planning advice, and it does not replace professional due diligence.',
            },
          ].map((faq) => (
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
            Run the free commercial check if the barber shop is still worth pursuing.
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl mx-auto mb-8 leading-7">
            If you are comparing a barber shop site, the free check and sample file are the
            faster way to see whether the rent, opening cash and downside case still make sense.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href={getCommercialCheckHref('barber_shop')}
              eventName="commercial_home_cta_clicked"
              pagePath="/how-much-rent-can-a-barber-shop-afford"
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
        </div>
      </section>

      <BusinessTypeCtaBand
        pagePath="/how-much-rent-can-a-barber-shop-afford"
        businessType="barber_shop"
        copy="Use the free commercial check to test chair utilisation, cuts per day, average spend, staffing, and opening cash before spending time or money on the next stage."
        showCompare={false}
      />
    </div>
  );
}
