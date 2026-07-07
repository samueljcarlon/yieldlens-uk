import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
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
  title: 'How Much Rent Can a Gym Afford?',
  description:
    'Check whether a gym can afford the rent before signing by testing memberships, class capacity, personal training income, equipment, fit-out, staffing, service charge, rates and opening cash.',
  alternates: {
    canonical: '/how-much-rent-can-a-gym-afford',
  },
  openGraph: {
    title: 'How Much Rent Can a Gym Afford?',
    description:
      'Pressure-test whether a gym lease can carry the rent by checking memberships, class capacity, PT income, equipment, staffing, service charge, rates and downside churn.',
    url: 'https://yieldlens.co.uk/how-much-rent-can-a-gym-afford',
  },
};

const faqItems = [
  {
    question: 'How much rent can a gym afford?',
    answer:
      'A gym can usually afford rent only if memberships, classes or personal training income cover rent, equipment, fit-out, staffing, service charge, rates and slower ramp-up periods.',
  },
  {
    question: 'What should I include before signing a gym lease?',
    answer:
      'Include rent, service charge, business rates, staff and instructor costs, equipment, fit-out, cleaning, utilities, opening cash, legal fees, and downside membership assumptions.',
  },
  {
    question: 'Why does membership ramp-up matter?',
    answer:
      'A gym often starts with lower membership numbers than the long-run target, so the opening months need enough cash and enough trading room to absorb the ramp-up period.',
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
      name: 'How much rent can a gym afford',
      item: 'https://yieldlens.co.uk/how-much-rent-can-a-gym-afford',
    },
  ],
};

const quickAnswerPoints = [
  'A gym can usually afford rent only if memberships, classes or personal training income cover rent, equipment, fit-out, staffing, service charge, rates and slower ramp-up periods.',
  'A first-pass check should test rent burden, break-even memberships, opening cash and downside membership growth before the lease is taken further.',
];

const keyInputs = [
  {
    title: 'Monthly memberships',
    text: 'The recurring membership base usually does the heavy lifting, so the rent answer depends on how many members can realistically be retained and added.',
  },
  {
    title: 'Average membership price',
    text: 'A small change in price, churn or introductory offers can move the rent answer because the model often relies on volume and retention.',
  },
  {
    title: 'Class capacity and PT income',
    text: 'Group classes, personal training, studio hire and ancillary income can strengthen the business model if the schedule is realistic.',
  },
  {
    title: 'Equipment and fit-out',
    text: 'Machines, weights, flooring, mirrors, showers and reception fit-out can absorb cash before the gym reaches full membership density.',
  },
  {
    title: 'Staff and instructor costs',
    text: 'Reception cover, instructors, cleaning and management all sit on top of the rent and have to be supported by the trading base.',
  },
  {
    title: 'Service charge, rates and churn',
    text: 'The true occupancy cost is higher than rent alone, and slower membership growth can make the opening months tight even when the long-run model works.',
  },
];

const illustrativeNumbers = [
  { label: 'Expected monthly revenue', value: '£37,500' },
  { label: 'Monthly rent', value: '£5,800' },
  { label: 'Monthly service charge', value: '£550' },
  { label: 'Business rates estimate', value: '£820' },
  { label: 'Staff and instructor costs', value: '£11,500' },
  { label: 'Equipment and fit-out', value: '£72,000' },
  { label: 'Opening cash before trading', value: '£110,000' },
  { label: 'Opening cash after setup', value: '£12,500' },
  { label: 'Rent burden', value: '15.5%' },
  { label: 'Break-even memberships/month', value: '170' },
  { label: 'Downside churn', value: 'Higher but still manageable' },
  { label: 'Class and PT contribution', value: 'Meaningful but not essential' },
];

const pressurePoints = [
  'The business needs enough recurring members to support the lease even when acquisition slows.',
  'Equipment and fit-out can use a lot of capital before the site has a stable membership base.',
  'Staffing, instructors and cleaning are fixed enough to matter even if membership growth is slower.',
  'If churn is higher than expected, break-even membership rises quickly and the opening buffer gets tighter.',
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
  'Membership demand evidence',
  'Comparable local commercial rents',
  'Service charge details',
  'Business rates estimate',
  'Equipment and fit-out quotes',
  'Class timetable or PT income assumptions',
  'Staffing and cleaning assumptions',
  'Churn and ramp-up assumptions',
  'Rent-free and deposit terms',
  'Revenue evidence behind the membership model',
];

const relatedLinks = [
  {
    title: 'Commercial rent affordability calculator',
    href: '/commercial-rent-affordability-calculator',
    text: 'Use the calculator if you want the broad affordability screen first.',
  },
  {
    title: 'Commercial lease viability check',
    href: '/commercial-lease-viability-check',
    text: 'Pressure-test rent burden, opening cash, break-even pressure and lease questions before signing.',
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

export default function GymRentAffordabilityPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={faqStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/how-much-rent-can-a-gym-afford"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Gym rent guide viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Gym rent affordability
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                How much rent can a gym afford?
              </h1>
              <div className="space-y-4 text-lg text-stone-300 max-w-2xl leading-8 mb-6">
                {quickAnswerPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this when memberships, classes or personal training income are driving the decision.
                If the answer still feels close, the free commercial check and the £49 Standard Commercial Viability File turn the result into a practical next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/how-much-rent-can-a-gym-afford"
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
                Gym pressure points
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['Memberships', 'Does the recurring base support the rent?'],
                  ['Classes and PT', 'Is additional revenue realistic or optional?'],
                  ['Opening cash', 'Is there enough left after equipment and fit-out?'],
                  ['Churn and ramp-up', 'Does the model still work while membership builds?'],
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
            title="A gym needs recurring revenue, capacity and a cash buffer to carry the rent."
            description="The rent has to sit alongside equipment, fit-out, staffing, service charge, rates and slower ramp-up periods."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${surfaceCardClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">Key inputs to test</p>
              <BulletList items={keyInputs.map((item) => `${item.title}: ${item.text}`)} />
            </div>
            <div className={`${surfaceCardSoftClass} p-6`}>
              <p className="text-sm font-semibold text-stone-900 mb-4">Why this matters</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                Gyms often look strong only once the membership base is established. The rent answer should reflect the slower early months, not just the eventual steady state.
              </p>
              <div className="mt-5 rounded-3xl border border-[var(--yieldlens-border)] bg-white p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                YieldLens helps compare rent against memberships, class and PT income, opening cash, and downside churn before the lease becomes expensive to unwind.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Worked example"
            title="This fictional example shows the kind of pressure test a gym needs."
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
                          : index === 6
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
                The gym still has room after rent on these fictional assumptions, but the opening buffer is not large enough to ignore a slower membership ramp-up or weaker churn performance.
              </p>
              <BulletList
                items={[
                  'Break-even memberships stay below the expected monthly count, but only by a modest margin.',
                  'Opening cash remains positive after setup, yet slower growth would tighten the buffer.',
                  'Classes and personal training help the model, but they should not be treated as guaranteed.',
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
            title="A gym can look fine on paper and still be tight during the ramp-up phase."
            description="The useful question is whether recurring revenue still supports the lease while memberships and retention are still building."
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
            description="A gym decision should still be checked against the practical lease terms that affect opening cash and exit flexibility."
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
            title="Use the free check, the calculator and the sample file together."
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
            Run a free commercial check, then decide whether the gym deserves deeper work.
          </h2>
          <p className="text-sm text-stone-300 leading-7 max-w-2xl mx-auto mb-8">
            YieldLens is built to help you judge rent burden, break-even memberships, opening cash and downside churn before a lease becomes expensive to unwind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/how-much-rent-can-a-gym-afford"
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
        title="Common questions about gym rent affordability."
        description="Short answers for people who need a clearer view of rent, cash flow and lease pressure before signing."
        faqs={faqItems}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />
    </div>
  );
}
