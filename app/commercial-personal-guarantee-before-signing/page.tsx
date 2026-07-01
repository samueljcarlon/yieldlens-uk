import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import {
  disclaimerClass,
  heroBackdropClass,
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  memoBandClass,
  sectionBandClass,
  sectionHeadingClass,
  surfaceCardClass,
  surfaceCardSoftClass,
  supportingTextClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Commercial Personal Guarantee Before Signing | YieldLens UK',
  description:
    'Check how a personal guarantee, director guarantee, deposit and lease terms can affect downside risk before signing a commercial lease.',
  alternates: {
    canonical: '/commercial-personal-guarantee-before-signing',
  },
  openGraph: {
    title: 'Commercial Personal Guarantee Before Signing | YieldLens UK',
    description:
      'Check how a personal guarantee, director guarantee, deposit and lease terms can affect downside risk before signing a commercial lease.',
    url: 'https://yieldlens.co.uk/commercial-personal-guarantee-before-signing',
  },
};

const faqItems = [
  {
    question: 'What is a personal guarantee in a commercial lease?',
    answer:
      'A personal guarantee is a promise by an individual, often a director, to back the lease obligations if the business cannot pay. The wording and scope matter.',
  },
  {
    question: 'Why does a personal guarantee matter before signing?',
    answer:
      'It can increase downside beyond the business itself, especially if rent burden is high or opening cash is thin.',
  },
  {
    question: 'Is a personal guarantee the same as a rent deposit?',
    answer:
      'No. A deposit is cash held by the landlord. A guarantee is a separate promise that can expose the person signing it if the lease fails.',
  },
  {
    question: 'Should a guarantee be checked alongside the break clause?',
    answer:
      'Yes. A break clause may reduce the lease term, but the guarantee wording can still matter if the lease ends badly or conditions are not met.',
  },
  {
    question: 'Can a personal guarantee affect lease viability?',
    answer:
      'Yes. It can change the downside exposure and should be considered with rent, deposit, lease length, and exit flexibility.',
  },
  {
    question: 'Is YieldLens giving legal advice on personal guarantees?',
    answer:
      'No. YieldLens UK provides indicative decision-support only. It does not review guarantee wording or replace legal, lease, valuation, tax, or financial advice.',
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
      name: 'Commercial Personal Guarantee Before Signing',
      item: 'https://yieldlens.co.uk/commercial-personal-guarantee-before-signing',
    },
  ],
};

const compareRows = [
  {
    title: 'Rent deposit',
    text: 'Cash held by the landlord at the start of the lease.',
  },
  {
    title: 'Personal guarantee',
    text: 'A separate promise by an individual to back lease obligations if needed.',
  },
  {
    title: 'Director guarantee',
    text: 'A common form of guarantee where a director or owner is asked to stand behind the lease.',
  },
  {
    title: 'Rent-free period',
    text: 'Can improve launch cash, but does not remove guarantee exposure.',
  },
  {
    title: 'Break clause',
    text: 'Can reduce commitment length, but the guarantee wording still matters.',
  },
  {
    title: 'Lease length',
    text: 'Longer terms can increase the period of exposure if the site underperforms.',
  },
  {
    title: 'Assignment and subletting',
    text: 'May help with exit flexibility, depending on the lease wording.',
  },
  {
    title: 'Repairing obligations',
    text: 'Can create extra downside if the lease ends badly or the premises need work.',
  },
];

const exampleRows = [
  { label: 'Annual rent', value: '£60,000' },
  { label: 'Monthly rent', value: '£5,000' },
  { label: 'Expected monthly revenue', value: '£24,960' },
  { label: 'Rent burden', value: '20.0%' },
  { label: 'Opening cash buffer', value: '£9,000' },
  { label: 'Fit-out', value: '£50,000' },
];

const relatedLinks = [
  {
    href: '/commercial-lease-checklist-before-signing',
    label: 'Commercial lease checklist before signing',
    description: 'Use the hub to step through the wider pre-signing checks.',
  },
  {
    href: '/commercial-heads-of-terms-before-signing',
    label: 'Commercial heads of terms before signing',
    description: 'Check the early deal points before the lease gets expensive.',
  },
  {
    href: '/commercial-lease-deposit-before-signing',
    label: 'Commercial lease deposit before signing',
    description: 'Check how cash at the start compares with guarantee exposure.',
  },
  {
    href: '/commercial-lease-length-before-signing',
    label: 'Commercial lease length before signing',
    description: 'See how the commitment period affects the downside.',
  },
  {
    href: '/commercial-break-clause-before-signing',
    label: 'Commercial break clause before signing',
    description: 'Check whether the exit date is enough if things go wrong.',
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
    <div className="max-w-3xl mb-10">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
        {eyebrow}
      </p>
      <h2 className={`${sectionHeadingClass} mb-3`}>{title}</h2>
      {description && <p className={supportingTextClass}>{description}</p>}
    </div>
  );
}

export default function CommercialPersonalGuaranteeBeforeSigningPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={[faqStructuredData, breadcrumbStructuredData]} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/commercial-personal-guarantee-before-signing"
        pageType="seo_page"
        mode="commercial"
        eventLabel="Commercial personal guarantee before signing viewed"
      />

      <section className={`${heroBackdropClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-6xl mt-4`}>
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_36%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#D6C7A2] mb-4">
                Commercial personal guarantee
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 text-white">
                Commercial personal guarantees before signing a lease
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                A personal guarantee can change the risk of a commercial lease. Even if the business case looks workable, a guarantee may increase the downside for the person signing if rent, costs, trading, or exit assumptions go wrong.
              </p>
              <p className="text-sm text-stone-300 max-w-2xl mb-8 leading-7">
                Use this page to think about guarantee risk before you sign, then run the free commercial check if you want to pressure-test the numbers as well.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-personal-guarantee-before-signing"
                  ctaLabel="Run a free commercial check"
                  pageType="seo_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/sample-commercial-viability-file"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-personal-guarantee-before-signing"
                  ctaLabel="View sample viability file"
                  pageType="seo_page"
                  className={heroSecondaryCtaClass}
                >
                  View sample viability file
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
                <Link href="/commercial-lease-viability-check" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Commercial lease viability check
                </Link>
                <Link href="/viability-file" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                  Standard commercial viability file
                </Link>
              </div>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, building survey advice, or a substitute for professional due diligence.
              </p>
            </div>

            <div className={`${surfaceCardClass} bg-white/95 p-5 sm:p-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)]`}>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-medium mb-3">
                Quick answer
              </p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Check whether a guarantee is being required at all.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Check whether it is capped, unlimited, or tied to more than rent.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Read it together with the deposit, lease length, and break clause.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>A solicitor should review the wording before it is treated as settled.</span>
                </li>
              </ul>
              <div className="mt-5 rounded-3xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4 text-sm text-[var(--yieldlens-muted)] leading-7">
                A guarantee can increase downside for the person signing it even when the business still appears viable on the spreadsheet.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why the guarantee matters"
            title="A guarantee can turn a business risk into a personal one."
            description="If the lease underperforms, the downside may not stop with the company."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'It can increase downside beyond the business itself.',
              'It matters more when rent burden is high.',
              'It matters more when opening cash is thin.',
              'It interacts with deposit, lease length, and break clause.',
              'It should be checked before the lease risk is treated as manageable.',
              'The wording should be reviewed by a solicitor.',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 text-sm text-stone-700 leading-7 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-fragile)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-risk)]'
                          : index === 4
                            ? 'border-t-[var(--yieldlens-primary)]'
                            : 'border-t-[var(--yieldlens-caution)]'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Compare the protections"
            title="A personal guarantee sits alongside other protections, not instead of them."
            description="The practical question is what happens if the lease underperforms."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {compareRows.map((row, index) => (
              <div
                key={row.title}
                className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-caution)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-primary)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-positive)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-fragile)]'
                          : index === 4
                            ? 'border-t-[var(--yieldlens-risk)]'
                            : index === 5
                              ? 'border-t-[var(--yieldlens-caution)]'
                              : index === 6
                                ? 'border-t-[var(--yieldlens-primary)]'
                                : 'border-t-[var(--yieldlens-positive)]'
                }`}
              >
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{row.title}</h3>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{row.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Illustrative example"
            title="A thin opening buffer makes personal downside more important."
            description="This is a safe fictional example, not a real case study."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exampleRows.map((row) => (
                  <div key={row.label} className={`${surfaceCardSoftClass} p-4`}>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] mb-2">{row.label}</p>
                    <p className="text-lg font-semibold text-stone-900">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${surfaceCardSoftClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">
                If a lease has a 20.0% rent burden and only £9,000 left after opening costs, the downside position matters. A personal guarantee should be understood alongside rent, deposit, lease length, break clause, and exit flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Questions to ask"
            title="Ask the questions that make the guarantee position clear."
            description="These are the checks that should be answered before the guarantee becomes part of the deal."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Is a personal guarantee required?',
              'Who is being asked to guarantee the lease?',
              'Is the guarantee capped or unlimited?',
              'Does it cover rent only or other lease obligations too?',
              'Does it continue after assignment?',
              'Does it interact with the rent deposit?',
              'Can the guarantee reduce over time?',
              'Does the guarantee end at a break clause or release event?',
              'What happens if the business closes or leaves early?',
              'Has a solicitor reviewed the guarantee wording?',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-t-4 p-5 sm:p-6 text-sm text-stone-700 leading-7 ${
                  index === 0
                    ? 'border-t-[var(--yieldlens-positive)]'
                    : index === 1
                      ? 'border-t-[var(--yieldlens-caution)]'
                      : index === 2
                        ? 'border-t-[var(--yieldlens-primary)]'
                        : index === 3
                          ? 'border-t-[var(--yieldlens-fragile)]'
                          : index === 4
                            ? 'border-t-[var(--yieldlens-risk)]'
                            : index === 5
                              ? 'border-t-[var(--yieldlens-positive)]'
                              : index === 6
                                ? 'border-t-[var(--yieldlens-caution)]'
                                : index === 7
                                  ? 'border-t-[var(--yieldlens-primary)]'
                                  : index === 8
                                    ? 'border-t-[var(--yieldlens-fragile)]'
                                    : 'border-t-[var(--yieldlens-risk)]'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="How YieldLens helps"
            title="The free commercial check tests the pressure points around the guarantee question."
            description="YieldLens can show whether the site still looks viable once the commercial assumptions are tested, but it cannot review guarantees or assess legal liability."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-positive)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Free check
              </p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Rent burden, opening cash pressure, break-even customers, downside trading, and lease pressure points.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>A quick screen for whether the site deserves deeper work.</span>
                </li>
              </ul>
            </div>

            <div className={`${surfaceCardClass} p-5 sm:p-6 border-t-4 border-t-[var(--yieldlens-fragile)]`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--yieldlens-caution)] mb-3">
                Standard file
              </p>
              <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Assumption review, stress-test interpretation, negotiation levers, evidence checklist, and lease questions.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>A printable decision memo tied to the saved result.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                  <span>Useful when the commercial questions need to be organised before signing.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/commercial-personal-guarantee-before-signing"
              ctaLabel="Run a free commercial check"
              pageType="seo_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/viability-file" className={heroSecondaryCtaClass}>
              View viability file
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--yieldlens-muted)] leading-7">
            For the full lease pressure test, see the{' '}
            <Link href="/commercial-lease-viability-check" className="text-[var(--yieldlens-caution)] font-medium hover:underline">
              commercial lease viability check
            </Link>
            .
          </p>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Related pages"
            title="Use the next page that matches the lease question you are asking."
            description="These pages stay close to the guarantee, deposit, and exit questions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${surfaceCardClass} p-5 sm:p-6 border border-[var(--yieldlens-border)] hover:-translate-y-0.5 transition-transform`}
              >
                <p className="text-base font-semibold text-stone-900 mb-2">{link.label}</p>
                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Frequently asked questions"
        title="Commercial personal guarantee FAQs"
        description="Short answers for people checking downside exposure before they sign."
        faqs={faqItems.map((item) => ({ question: item.question, answer: item.answer }))}
        sectionClassName="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]"
      />

      <section className={`${memoBandClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-5xl my-14`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8 text-sm text-stone-300 leading-7 text-center">
          <p className="font-semibold text-[#D6C7A2] mb-2">Important disclaimer</p>
          <p className={disclaimerClass}>
            YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
