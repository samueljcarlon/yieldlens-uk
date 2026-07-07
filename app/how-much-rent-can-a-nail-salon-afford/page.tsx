import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import BusinessTypeCtaBand from '@/components/BusinessTypeCtaBand';
import FaqSection from '@/components/FaqSection';
import {
  disclaimerClass,
  heroBackdropClass,
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  sectionBandClass,
  sectionHeadingClass,
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
  supportingTextClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'How Much Rent Can a Nail Salon Afford?',
  description:
    'Check whether a nail salon can afford the rent before signing by testing appointment volume, technician utilisation, average spend, fit-out, service charge, rates, and opening cash.',
  alternates: {
    canonical: '/how-much-rent-can-a-nail-salon-afford',
  },
  openGraph: {
    title: 'How Much Rent Can a Nail Salon Afford?',
    description:
      'Pressure-test whether a nail salon lease can carry the rent by checking appointment volume, technician utilisation, fit-out, service charge, rates, and downside trade.',
    url: 'https://yieldlens.co.uk/how-much-rent-can-a-nail-salon-afford',
  },
};

const faqItems = [
  {
    question: 'How much rent can a nail salon afford?',
    answer:
      'A nail salon can usually afford rent only if appointment volume, average spend and technician utilisation cover rent, staffing, service charge, rates, fit-out and quieter trading periods.',
  },
  {
    question: 'What should I include before signing a nail salon lease?',
    answer:
      'Include rent, business rates, service charge, technician costs, treatment supplies, water and electrical needs, fit-out, equipment, opening cash, legal fees, and downside utilisation assumptions.',
  },
  {
    question: 'Why does technician utilisation matter?',
    answer:
      'A salon can have the right number of chairs or tables on paper but still struggle if appointment capacity and utilisation are too low in quieter periods.',
  },
  {
    question: 'Is YieldLens a valuation or advice service?',
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
      name: 'How much rent can a nail salon afford',
      item: 'https://yieldlens.co.uk/how-much-rent-can-a-nail-salon-afford',
    },
  ],
};

const quickAnswerPoints = [
  'A nail salon can usually afford rent only if appointment volume, average spend and technician utilisation cover rent, staffing, service charge, rates, fit-out and quieter trading periods.',
  'A first-pass check should compare rent burden, break-even appointments, opening cash and downside utilisation before the lease is taken further.',
];

const keyInputs = [
  {
    title: 'Appointment capacity',
    text: 'The number of bookable slots matters more than the headline rent when the trade depends on repeat appointments and steady utilisation.',
  },
  {
    title: 'Average spend and treatment time',
    text: 'A higher spend per booking can support more rent, but longer treatments reduce throughput and can raise the break-even target.',
  },
  {
    title: 'Technician model',
    text: 'Staffed chairs, self-employed technicians, commission splits and rota cover all change the cost base that rent sits on top of.',
  },
  {
    title: 'Fit-out and utilities',
    text: 'Water, drainage, electrics, lighting, mirrors, storage and finishes can make the fit-out more expensive than the headline unit suggests.',
  },
  {
    title: 'Service charge and business rates',
    text: 'The true occupancy cost is usually higher than rent alone once building costs and rates are counted.',
  },
  {
    title: 'Opening cash and quieter periods',
    text: 'A salon should still hold together when bookings are softer and the opening buffer has been used for setup costs.',
  },
];

const illustrativeNumbers = [
  { label: 'Expected monthly revenue', value: '£31,200' },
  { label: 'Monthly rent', value: '£3,600' },
  { label: 'Monthly service charge', value: '£280' },
  { label: 'Business rates estimate', value: '£520' },
  { label: 'Staffing and operating costs', value: '£9,800' },
  { label: 'Supplies and consumables', value: '£1,150' },
  { label: 'Fit-out and equipment', value: '£36,000' },
  { label: 'Opening cash before trading', value: '£56,000' },
  { label: 'Opening cash after setup', value: '£5,400' },
  { label: 'Rent burden', value: '11.5%' },
  { label: 'Break-even appointments/month', value: '286' },
  { label: 'Downside utilisation', value: '76%' },
];

const pressurePoints = [
  'The appointment book has to stay full enough to support both rent and staffing.',
  'Water, drainage and electrical work can add cost before the salon opens at full speed.',
  'Self-employed or commission-based staffing can improve flexibility, but it still needs careful modelling.',
  'A thin opening buffer can disappear quickly if bookings start slower than expected.',
];

const leaseChecks = [
  'Rent-free period',
  'Service charge',
  'Business rates',
  'Repairing obligations',
  'Permitted use',
  'Break clause',
  'Rent review',
  'Assignment and subletting',
  'Handover condition',
  'Personal guarantee',
];

const evidenceToGather = [
  'Observed appointment demand',
  'Comparable local commercial rents',
  'Service charge details',
  'Business rates estimate',
  'Fit-out and equipment quotes',
  'Water and drainage assumptions',
  'Electrical capacity and compliance checks',
  'Staffing or commission assumptions',
  'Rent-free and deposit terms',
  'Booking and spend evidence behind the model',
];

const relatedLinks = [
  {
    title: 'Salon lease viability check',
    href: '/salon-lease-viability-check',
    text: 'Use the broader salon viability page when chair capacity and treatment mix drive the decision.',
  },
  {
    title: 'Commercial rent affordability calculator',
    href: '/commercial-rent-affordability-calculator',
    text: 'Use the calculator if you want the broad affordability screen first.',
  },
  {
    title: 'Commercial lease checklist before signing',
    href: '/commercial-lease-checklist-before-signing',
    text: 'Check the lease items that can change the result before you commit.',
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
      <h2 className={`${sectionHeadingClass} mb-3`}>{title}</h2>
      {description && <p className={supportingTextClass}>{description}</p>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function NailSalonRentAffordabilityPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/how-much-rent-can-a-nail-salon-afford"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Nail salon rent guide viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Nail salon rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                How much rent can a nail salon afford?
              </h1>
              <div className="space-y-4 text-lg text-stone-300 max-w-2xl leading-8 mb-6">
                {quickAnswerPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this when appointment volume, technician utilisation and treatment capacity are driving the decision.
                If the rent still feels borderline, the free commercial check and the £49 Standard Commercial Viability File turn the result into a clearer next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-much-rent-can-a-nail-salon-afford"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
                  View sample viability file
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Nail salon pressure points
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['Appointment capacity', 'Do the bookable slots cover the rent?'],
                  ['Technician utilisation', 'Are chairs and tables busy enough?'],
                  ['Opening cash', 'Is there enough left after fit-out and equipment?'],
                  ['Quiet periods', 'Does the model still hold when bookings slow?'],
                ].map(([label, helper], index) => (
                  <div
                    key={label}
                    className={`border p-4 rounded-3xl ${
                      index === 0
                        ? 'border-amber-200 bg-amber-50 text-amber-950'
                        : index === 2
                          ? 'border-orange-200 bg-orange-50 text-orange-950'
                          : 'border-[var(--yieldlens-border)] bg-white text-stone-950'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-1">{label}</p>
                    <p className="text-sm leading-6 opacity-90">{helper}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} mt-8`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Quick answer"
            title="A nail salon needs appointments, utilisation and a cash buffer to carry the rent."
            description="The rent has to sit alongside staffing, service charge, rates, fit-out, water and electrical needs, and quieter trading periods."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${surfaceCardClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">Key inputs to test</p>
              <BulletList items={keyInputs.map((item) => `${item.title}: ${item.text}`)} />
            </div>
            <div className={`${surfaceCardSoftClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">Why this matters</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                A salon can look fine on paper if the chairs are full, but the rent answer changes quickly when appointment volume slows or treatment times are longer than expected.
              </p>
              <div className="mt-5 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                YieldLens helps compare rent against the practical appointment load, the opening cash buffer, and the quieter parts of the week before the lease becomes expensive to unwind.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Worked example"
            title="This fictional example shows the kind of pressure test a nail salon needs."
            description="It is illustrative only, not a real case. It shows how the free check can surface the numbers that matter before payment."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 items-start">
            <div className={`${surfaceCardSoftClass} p-5 sm:p-6`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {illustrativeNumbers.map((item, index) => (
                  <div
                    key={item.label}
                    className={`rounded-3xl border p-4 ${
                      index === 0
                        ? 'border-[var(--yieldlens-border)] bg-white'
                        : index === 2
                          ? 'border-amber-200 bg-amber-50'
                          : index === 7
                            ? 'border-orange-200 bg-orange-50'
                            : 'border-[var(--yieldlens-border)] bg-white'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] font-semibold text-stone-500 mb-1">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-stone-950">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-caution)]`}>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] font-medium mb-3">
                What the numbers suggest
              </p>
              <p className="text-sm text-stone-700 leading-7 mb-4">
                The salon still has room after rent on these fictional assumptions, but the opening buffer is not large enough to ignore slower bookings, higher setup costs or weaker utilisation.
              </p>
              <BulletList
                items={[
                  'Break-even appointments remain below the expected monthly count, but only by a modest margin.',
                  'Opening cash remains positive after setup, yet a slower launch would tighten the buffer.',
                  'Water, drainage and electrical work can change the opening cash need more than the rent alone suggests.',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Pressure points"
            title="A salon can be full on paper and still under pressure in quieter weeks."
            description="The useful question is whether appointment utilisation still supports the lease when bookings are softer than planned."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pressurePoints.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-fragile)]'
                        : 'border-t-[var(--yieldlens-risk)]'
                }`}
              >
                <p className="text-sm text-stone-700 leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Lease checks before signing"
            title="These lease points can change the answer even when the rent looks manageable."
            description="A salon decision should still be checked against the practical lease terms that affect opening cash and exit flexibility."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {leaseChecks.map((item) => (
              <div key={item} className={`${surfaceCardClass} p-4`}>
                <p className="text-sm font-semibold text-stone-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Evidence to gather"
            title="Before relying on the result, check that the assumptions are real."
            description="The affordability view is only as useful as the evidence behind it."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidenceToGather.map((item) => (
              <div key={item} className={`${surfaceCardSoftClass} p-4`}>
                <p className="text-sm font-medium text-stone-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Use the free check, the calculator and the wider salon guidance together."
            description="The route to a better decision is to review the fast screen, then decide whether the site deserves deeper work."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${surfaceCardSoftClass} border-t-4 p-5 transition-all hover:-translate-y-0.5 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : 'border-t-[var(--yieldlens-positive)]'
                }`}
              >
                <p className="font-semibold text-stone-900 mb-1">{link.title}</p>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D6C7A2] font-medium mb-3">
            Pressure-test the rent before you commit
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Run a free commercial check, then decide whether the nail salon deserves deeper work.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge rent burden, break-even appointments, opening cash and downside utilisation before a lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/how-much-rent-can-a-nail-salon-afford"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
              View sample viability file
            </Link>
            <Link href="/commercial-lease-viability-check" className={secondaryCtaClass}>
              Commercial lease viability check
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Common questions about nail salon rent affordability."
        description="Short answers for people who need a clearer view of rent, cash flow and lease pressure before signing."
        faqs={faqItems}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <BusinessTypeCtaBand
        pagePath="/how-much-rent-can-a-nail-salon-afford"
        copy="Use the free commercial check to test appointment capacity, utilisation, staffing, and opening cash before spending time or money on the next stage."
        showCompare={false}
      />
    </div>
  );
}
