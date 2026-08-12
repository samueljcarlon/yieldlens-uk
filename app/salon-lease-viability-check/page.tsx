import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import BusinessTypeCtaBand from '@/components/BusinessTypeCtaBand';
import { getCommercialCheckHref } from '@/lib/commercialBusinessType';

export const metadata: Metadata = {
  title: 'Salon Lease Viability Check',
  description:
    'Check whether a salon lease can carry the rent, treatment capacity, average spend, staffing, fit-out, upfront cash, downside trading, and lease risks before committing.',
  alternates: {
    canonical: 'https://yieldlens.co.uk/salon-lease-viability-check',
  },
  openGraph: {
    title: 'Salon Lease Viability Check',
    description:
      'Pressure-test whether a salon lease can carry the rent, treatment capacity, opening cash, staffing, and lease obligations before you commit.',
    url: 'https://yieldlens.co.uk/salon-lease-viability-check',
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much rent can a salon afford?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YieldLens UK treats rent burden as monthly rent divided by expected monthly revenue. It uses 12% as a healthier screen and 18% as a caution threshold. Those are indicative screening thresholds, not universal rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I check before signing a salon lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check rent burden, break-even clients, staffing, treatment capacity, fit-out, upfront cash, downside trading, and lease terms such as service charge, repair obligations, permitted use, utilities, water, ventilation, and break clauses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can YieldLens tell me whether to sign a salon lease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. YieldLens UK provides indicative decision-support only. It helps structure the commercial numbers and questions before you commit, but it does not tell you to sign or not sign a lease.',
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
      name: 'Salon lease viability check',
      item: 'https://yieldlens.co.uk/salon-lease-viability-check',
    },
  ],
};

const quickAnswerPoints = [
  'A salon lease looks more viable when rent is not taking too much expected revenue.',
  'Break-even clients should sit comfortably below realistic clients per day.',
  'Staffing, treatment capacity, utilities, water use, fit-out, and opening cash can change the result materially.',
  '12% rent burden is a healthier screen, 18% is a caution threshold, and above 18% needs stronger evidence or sharper lease terms.',
];

const salonOperatorChecks = [
  {
    title: 'Chairs or treatment rooms',
    text: 'A salon can be profitable with the right layout, but the lease only works if the number of chairs or rooms supports the monthly rent and staffing plan.',
  },
  {
    title: 'Treatment duration and utilisation',
    text: 'Longer treatments improve spend per visit but reduce throughput, so chair utilisation and booking fill matter as much as headline average spend.',
  },
  {
    title: 'Self-employed chair rent',
    text: 'Where chair rental is part of the model, the rent question changes because the operator may be sharing revenue rather than carrying all of the labour cost directly.',
  },
  {
    title: 'Repeat bookings and no-shows',
    text: 'A salon often depends on repeat appointments. If rebooking is weak or no-shows are common, the rent has less room to hide.',
  },
  {
    title: 'Utilities and water',
    text: 'Water, laundry, lighting, drying, and heating can all matter more in a salon than they do in a plain retail unit.',
  },
  {
    title: 'Booking ramp-up and staff productivity',
    text: 'The first months after opening can be quieter, so the lease has to survive before the appointment book fully fills and staff utilisation improves.',
  },
];

const leaseTerms = [
  {
    title: 'Rent-free period',
    text: 'A rent-free period gives the salon time to complete the fit-out, hire staff, and build an initial client base before the full rent obligation begins. Confirm how long it runs, whether it covers all outgoings, and what happens if the lease ends before an agreed minimum term.',
  },
  {
    title: 'Service charge',
    text: 'Service charges in salon premises can include shared building maintenance, common area cleaning, and management costs. Confirm what the charge covers, whether it is capped, and what the actual charge was in recent years.',
  },
  {
    title: 'Fit-out and reinstatement',
    text: 'Confirm whether the landlord expects the salon fit-out to be removed at the end of the lease and the site returned to shell condition. Reinstatement costs can be significant if the fit-out includes plumbing, partition walls, or specialist flooring.',
  },
  {
    title: 'Permitted use',
    text: 'A salon use may be permitted under a specific planning class. Confirm whether the permitted use clause allows for the treatment types planned, including any licensable treatments or regulated activities.',
  },
  {
    title: 'Repairing obligations',
    text: 'Understand whether the lease is full repairing and insuring or internal repairing only. Ask for a schedule of condition so the baseline is documented before the lease starts.',
  },
  {
    title: 'Break clause',
    text: 'A break clause protects the business if chair utilisation or bookings do not meet the assumptions in the check. Confirm the break date, any conditions attached to exercising it, and whether any lease incentives are forfeited if the break is used.',
  },
  {
    title: 'Rent review',
    text: 'Confirm when the rent is first reviewed and by what mechanism. Even a modest upward review can change the rent burden used in the check, particularly in the second or third year of the lease.',
  },
  {
    title: 'Water and drainage',
    text: "Salon operations typically require higher water usage than other retail occupiers. Confirm whether the building's drainage capacity is sufficient and whether there are any restrictions on the water supply connection.",
  },
  {
    title: 'Assignment',
    text: 'Confirm whether the lease can be transferred to another operator if the business needs to exit. A lease with restrictive assignment terms can be difficult and costly to exit if trading does not meet the plan.',
  },
  {
    title: 'Handover condition',
    text: 'Agree what condition the site will be in on the day the lease starts, including any existing pipework, cabling, or previous fit-out elements that will remain.',
  },
  {
    title: 'Personal guarantee',
    text: 'Confirm whether the landlord requires a personal guarantee and whether it can be limited in scope, duration, or value.',
  },
];

const commonMistakes = [
  'Judging the site by rent alone',
  'Overestimating daily client capacity',
  'Forgetting treatment duration',
  'Underestimating fit-out and equipment',
  'Ignoring utilities and water usage',
  'Not checking permitted use',
  'Assuming bookings ramp immediately',
  'Ignoring local competition',
  'Ignoring service charge and repairing obligations',
  'Not modelling downside bookings',
];

const exampleSummary = [
  { label: 'Business type', value: 'Salon' },
  { label: 'Address', value: 'Redacted high street site' },
  { label: 'Postcode', value: 'SE1 sample' },
  { label: 'Annual rent', value: '£48,000' },
  { label: 'Monthly rent', value: '£4,000' },
  { label: 'Expected clients/day', value: '35' },
  { label: 'Average spend', value: '£45' },
  { label: 'Opening days/month', value: '26' },
  { label: 'Monthly revenue', value: '£40,950' },
  { label: 'Rent burden', value: 'about 9.8%' },
  { label: 'Known monthly cost base', value: '£23,500' },
  { label: 'Break-even clients/day', value: 'about 20' },
  { label: 'Upfront cash needed', value: '£85,000' },
  { label: 'Starting cash', value: '£95,000' },
  { label: 'Opening buffer', value: '£10,000' },
  { label: 'Downside monthly position', value: '£1,070 surplus' },
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

export default function SalonLeaseViabilityPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <JsonLd data={faqStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/salon-lease-viability-check"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Salon lease viability page viewed"
      />

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Salon lease viability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Check whether a salon lease can carry the numbers.
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                A salon lease is not only a rent decision. You need to
                pressure-test rent burden, daily clients, average spend,
                staffing, treatment capacity, fit-out, opening cash, weaker
                trading, and lease terms before committing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href={getCommercialCheckHref('salon')}
                  eventName="commercial_home_cta_clicked"
                  pagePath="/salon-lease-viability-check"
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
                a valuation, financial advice, mortgage advice, legal advice,
                tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                Quick answer
              </p>
              <p className="text-sm text-stone-300 leading-7 mb-4">
                A salon lease is more viable when rent, treatment capacity, staffing, utilities, fit-out, and opening cash still work after weaker booking assumptions are included. The practical test is whether the business can carry the site once appointments ramp up slowly, not just once the room is full.
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
          eyebrow="Why salons need a separate pressure-test"
          title="Salon sites have their own cost and capacity risks."
          description="The shape of the business matters because treatment capacity, staffing, and room layout can change the economics fast."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Fit-out and treatment room costs',
            'Chairs, stations, basins, mirrors, lighting, reception, laundry, and equipment',
            'Staffing or self-employed chair-rent assumptions',
            'Treatment duration and capacity',
            'Repeat customer dependence',
            'Local competition',
            'Utilities and water use',
            'Service charge',
            'Repairing obligations',
            'Permitted use',
            'Opening period before appointments stabilise',
          ].map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-16">
        <SectionTitle
          eyebrow="The key checks"
          title="A salon site only works if the chairs, bookings, and treatment flow support the lease."
          description="For salons, treatment duration, chair utilisation, and repeat bookings often matter as much as the rent itself."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {salonOperatorChecks.map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="font-semibold text-stone-900 mb-2">{item.title}</p>
              <p className="text-sm text-stone-600 leading-6">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Core formula"
            title="Rent burden is monthly rent divided by expected monthly revenue."
            description="For a salon, clients/day can be treated as customers/day for the commercial check."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm font-semibold text-stone-900 mb-3">Worked example</p>
              <div className="space-y-3 text-sm text-stone-700 leading-7">
                <p>Annual rent: £48,000</p>
                <p>Monthly rent: £4,000</p>
                <p>Expected clients/day: 35</p>
                <p>Average spend: £45</p>
                <p>Opening days/month: 26</p>
                <p>Expected monthly revenue: £40,950</p>
                <p>Rent burden: about 9.8%</p>
              </div>
              <div className="mt-4">
                <Link href="/commercial-rent-burden-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)] text-sm">
                  Commercial rent burden calculator
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Interpretation</p>
              <p className="text-sm text-stone-700 leading-7">
                This rent burden looks workable on paper, but capacity, staffing,
                fit-out, and downside trading still need checking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Break-even clients"
          title="Convert fixed monthly costs into a daily client target."
          description="Affordability becomes clearer when the known cost base becomes a break-even number the trading plan has to beat."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold text-stone-900 mb-3">Break-even example</p>
            <p className="text-sm text-stone-700 leading-7">
              If the known monthly cost base is £23,500 and average spend is £45
              across 26 opening days, break-even is about 20 clients/day.
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">What it means</p>
            <p className="text-sm text-stone-700 leading-7">
              If expected clients/day is 35, there is headroom on paper, but the
              35-client assumption needs evidence from treatment capacity,
              appointment length, local demand, repeat bookings, and staff
              availability.
            </p>
            <div className="mt-4">
              <Link href="/break-even-customers-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)] text-sm">
                Break-even customers calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Upfront cash and fit-out"
            title="Salons can fail before opening if launch costs absorb too much cash."
            description="Fit-out, treatment equipment, deposit, legal fees, stock, and launch costs can overwhelm the opening budget."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 leading-7">
                <p>Fit-out and equipment: £55,000</p>
                <p>Rent deposit: £12,000</p>
                <p>Legal/professional fees: £4,000</p>
                <p>Opening stock: £8,000</p>
                <p>Other setup costs: £6,000</p>
                <p>Starting cash: £95,000</p>
                <p>Upfront cash needed: £85,000</p>
                <p>Opening buffer: £10,000</p>
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Why it matters</p>
              <p className="text-sm text-stone-700 leading-7">
                The opening buffer is positive, but thin if fit-out overruns,
                appointments build slowly, or early staffing costs are higher
                than expected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Downside trading"
          title="Test the lease against weaker bookings, not only expected trading."
          description="Salons should be checked against a weaker booking scenario so you can see whether the opening buffer is enough."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <div className="space-y-3 text-sm text-stone-700 leading-7">
              <p>Base monthly revenue: £40,950</p>
              <p>60% downside revenue: £24,570</p>
              <p>Known monthly cost base: £23,500</p>
              <p>Downside monthly position: £1,070 surplus</p>
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">Interpretation</p>
            <p className="text-sm text-stone-700 leading-7">
              In this downside case, the salon still covers known costs, but the
              opening buffer remains important because setup overruns and slow
              client acquisition can still create pressure.
            </p>
            <div className="mt-4">
              <Link href="/commercial-lease-survival-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)] text-sm">
                Commercial lease survival calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Salon lease terms that matter"
            title="Use the lease questions before the rent number becomes a commitment."
            description="Ask a solicitor to review the lease wording before committing."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {leaseTerms.map((item) => (
              <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="text-sm text-stone-700 leading-7 mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Worked salon example"
          title="Redacted high street site"
          description="This example is fictional and redacted. It shows the shape of the salon affordability question without exposing a real tenant or address."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 leading-7">
              {exampleSummary.map((item) => (
                <div key={item.label} className="rounded-lg border border-stone-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-stone-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">Verdict</p>
            <p className="text-sm text-stone-700 leading-7">
              The rent burden looks workable in this example, but the opening
              buffer is still thin. The site needs evidence for appointment
              demand, realistic average spend, staff capacity, fit-out costs,
              and lease clauses before committing.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Common salon lease mistakes"
          title="The lease question often goes wrong for predictable reasons."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonMistakes.map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="How YieldLens helps"
            title="Turn the salon lease into numbers you can challenge."
            description="The free commercial check can be used for salons by treating clients/day as customers/day and average spend as spend per client."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Free check outputs</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 leading-7">
                {[
                  'Rent burden',
                  'Break-even clients/day',
                  'Upfront cash needed',
                  'Cash after opening',
                  'Downside monthly position',
                  'Six-month survival test',
                  'Risk flags',
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm font-semibold text-stone-900 mb-3">£49 file adds</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 leading-7">
                {[
                  'Stress-test scenarios',
                  'Negotiation levers',
                  'Evidence needed',
                  'Lease questions',
                  'Due diligence checklist',
                  'Ranked actions before committing',
                  'Final view',
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-stone-200 bg-white p-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <Link href="/commercial-lease-viability-check" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Commercial lease viability check
            </Link>
            <Link href="/commercial-lease-checklist-before-signing" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Commercial lease checklist before signing
            </Link>
            <Link href="/restaurant-lease-viability-check" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Restaurant lease viability check
            </Link>
            <Link href="/how-it-works" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              See how YieldLens works
            </Link>
            <Link href="/sample-commercial-viability-file" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Sample viability file
            </Link>
            <Link href="/viability-file" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
              Viability file
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Business-type rent checks"
            title="Use the page that matches the unit."
            description="The salon page sits alongside the other business-type affordability checks."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              {
                title: 'How much rent can a cafe afford',
                href: '/how-much-rent-can-a-cafe-afford',
              },
              {
                title: 'How much rent can a shop afford',
                href: '/how-much-rent-can-a-shop-afford',
              },
              {
                title: 'How much rent can a takeaway afford',
                href: '/how-much-rent-can-a-takeaway-afford',
              },
              {
                title: 'Restaurant lease viability check',
                href: '/restaurant-lease-viability-check',
              },
              {
                title: 'How much rent can a barber shop afford',
                href: '/how-much-rent-can-a-barber-shop-afford',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 transition-colors"
              >
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
              </Link>
            ))}
          </div>
          <SectionTitle
            eyebrow="FAQ"
            title="Salon lease viability questions"
            description="Short answers for people deciding whether a salon site deserves a deeper look."
          />
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                q: 'How much rent can a salon afford?',
                a: 'There is no universal number. YieldLens uses rent burden as a screen, with 12% as a healthier threshold and 18% as a caution threshold. Those are indicative screening thresholds, not universal rules.',
              },
              {
                q: 'What is a good rent burden for a salon?',
                a: 'Lower is generally easier to carry. YieldLens treats around 12% as healthier and around 18% as a caution threshold. The right level still depends on the rest of the cost base and opening cash.',
              },
              {
                q: 'How do I calculate salon break-even clients?',
                a: 'Add the known monthly cost base, then divide it by average spend and opening days to get a daily client target. The commercial check helps turn that into a practical figure.',
              },
              {
                q: 'Should I include fit-out before judging a salon lease?',
                a: 'Yes. Fit-out, equipment, deposits, fees, and stock can determine whether the site survives the opening phase.',
              },
              {
                q: 'What lease clauses matter most for salons?',
                a: 'Service charge, repairing obligations, rent review, break clauses, permitted use, water, drainage, ventilation, electrical capacity, and signage rights usually deserve close attention.',
              },
              {
                q: 'Can YieldLens tell me whether to sign a salon lease?',
                a: 'No. YieldLens UK provides indicative decision-support only. It helps structure the commercial numbers and questions before you commit, but it does not tell you to sign or not sign.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.q}</p>
                <p className="text-sm text-stone-700 leading-7 mt-3">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BusinessTypeCtaBand
        pagePath="/salon-lease-viability-check"
        businessType="salon"
        copy="Use the free commercial check to test bookings, chair and treatment-room utilisation, staffing, and opening cash before spending time or money on the next stage."
        compareLabel="Comparing two possible sites? Compare two sites before taking one further."
      />

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Pressure-test the salon lease before you commit."
          title="Start with the free check, then review the sample and methodology."
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <TrackedCtaLink
              href={getCommercialCheckHref('salon')}
            eventName="commercial_home_cta_clicked"
            pagePath="/salon-lease-viability-check"
            ctaLabel="Run a free salon lease check"
            pageType="seo_page"
            className="bg-[var(--yieldlens-primary)] text-stone-950 px-6 py-3 rounded font-semibold hover:bg-[var(--yieldlens-primary-hover)] transition-colors text-sm text-center"
          >
            Run a free salon lease check
          </TrackedCtaLink>
          <Link
            href="/sample-commercial-viability-file"
            className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded font-medium hover:bg-white/15 transition-colors text-sm text-center"
          >
            View sample viability file
          </Link>
          <Link
            href="/how-it-works"
            className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm text-center"
          >
            How it works
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/commercial-lease-viability-check" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Commercial lease viability check
          </Link>
          <Link href="/commercial-lease-checklist-before-signing" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Commercial lease checklist before signing
          </Link>
          <Link href="/restaurant-lease-viability-check" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Restaurant lease viability check
          </Link>
          <Link href="/commercial-rent-burden-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Commercial rent burden calculator
          </Link>
          <Link href="/break-even-customers-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Break-even customers calculator
          </Link>
          <Link href="/commercial-lease-survival-calculator" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Commercial lease survival calculator
          </Link>
          <Link href="/viability-file" className="text-[var(--yieldlens-caution)] font-medium hover:text-[var(--yieldlens-primary)]">
            Viability file
          </Link>
        </div>
      </section>
    </div>
  );
}
