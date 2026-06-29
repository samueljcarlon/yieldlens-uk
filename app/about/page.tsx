import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import {
  disclaimerClass,
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  memoBandClass,
  secondaryCtaClass,
  sectionBandClass,
  surfaceCardClass,
  surfaceCardSoftClass,
} from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'About YieldLens UK',
  description:
    'Learn what YieldLens UK does, who it is for, and how it helps operators pressure-test commercial rent, lease viability, opening cash, and downside trading before signing.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About YieldLens UK',
    description:
      'Independent commercial rent and lease viability decision-support for cafes, restaurants, salons, retailers, and first-time tenants.',
    url: 'https://yieldlens.co.uk/about',
  },
};

const aboutStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About YieldLens UK',
  url: 'https://yieldlens.co.uk/about',
  description:
    'Independent commercial rent and lease viability decision-support for cafes, restaurants, salons, retailers, and first-time tenants.',
};

const whoItIsFor = [
  'Cafes comparing a unit before signing heads of terms',
  'Restaurants checking whether the rent fits the full cost stack',
  'Salons testing chair utilisation, bookings, and opening cash',
  'Small retailers comparing several units at the same time',
  'First-time commercial tenants who want a clearer pressure test',
  'Operators who need to see the downside before committing',
];

const whatItTests = [
  {
    title: 'Rent burden',
    detail: 'Shows whether the rent still leaves room for staff, stock, utilities, and quieter early trade.',
  },
  {
    title: 'Break-even customers',
    detail: 'Turns the cost stack into a daily target so the trade requirement is easier to challenge.',
  },
  {
    title: 'Opening cash pressure',
    detail: 'Shows whether fit-out, deposit, fees, stock, and launch costs leave enough breathing room.',
  },
  {
    title: 'Downside trading',
    detail: 'Checks what happens if the opening period is slower or weaker than planned.',
  },
  {
    title: 'Six-month survival',
    detail: 'Shows whether the business can absorb a weak start without the lease becoming too heavy.',
  },
  {
    title: 'Lease questions',
    detail: 'Highlights the clauses and evidence gaps that should be checked before commitment.',
  },
];

const whatItDoesNotDo = [
  'Not a valuation.',
  'Not legal advice.',
  'Not financial advice.',
  'Not a replacement for reviewing the lease, checking local evidence, or speaking to professional advisers.',
];

const howItWorks = [
  {
    step: '1',
    title: 'Run the free commercial check',
    desc: 'Enter the rent, revenue, cost, opening cash, and downside assumptions for the site.',
  },
  {
    step: '2',
    title: 'Review the viability snapshot',
    desc: 'Use the result to see where the pressure sits before the lease becomes harder to unwind.',
  },
  {
    step: '3',
    title: 'Unlock the Standard file if needed',
    desc: 'Turn the same result into a decision memo for negotiation, evidence checking, and lease questions.',
  },
  {
    step: '4',
    title: 'Use the memo to challenge assumptions',
    desc: 'Check whether the rent, opening buffer, and downside risk still look workable once the lease terms are added.',
  },
];

const trustPrinciples = [
  'YieldLens is assumption-led, not black-box certainty.',
  'The output is only as strong as the numbers entered.',
  'The value is in making rent, cash buffer, and downside pressure visible early enough to question them.',
  'The aim is better judgment before the lease gets expensive to unwind.',
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
    <div className="mb-10">
      <p
        className={`text-xs font-medium uppercase tracking-widest mb-3 ${
          isDark ? 'text-[#DCCDA8]' : 'text-[var(--yieldlens-caution)]'
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-sm max-w-3xl leading-7 ${isDark ? 'text-stone-300' : 'text-[var(--yieldlens-muted)]'}`}>
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

export default function AboutPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={aboutStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/about"
        pageType="trust_page"
        mode="commercial"
        eventLabel="About viewed"
      />

      <section className="bg-[var(--yieldlens-hero)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.92fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                About
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                About YieldLens UK
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Independent commercial rent and lease viability decision-support.
                YieldLens UK helps operators pressure-test whether a commercial
                site can carry the rent before they sign.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/about"
                  ctaLabel="Run a free commercial check"
                  pageType="trust_page"
                  className={heroPrimaryCtaClass}
                >
                  Run a free commercial check
                </TrackedCtaLink>
                <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
                  View sample viability file
                </Link>
              </div>
              <p className="mt-4 text-sm text-stone-300 leading-7">
                Need help with the product, access after payment, or privacy?
                Use the{' '}
                <Link href="/contact" className="text-[#DCCDA8] font-medium hover:underline">
                  contact page
                </Link>
                .
              </p>
              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                YieldLens UK provides indicative decision-support only. It is
                not a valuation, financial advice, mortgage advice, legal
                advice, tax advice, or a substitute for professional due
                diligence.
              </p>
            </div>

            <div className={`${memoBandClass} p-6 sm:p-7`}>
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                In one line
              </p>
              <p className="text-2xl font-bold leading-tight text-white">
                It helps you see whether the lease can survive the rent, cash
                stack, and weaker trading before you commit.
              </p>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#DCCDA8] font-semibold mb-3">
                  What it focuses on
                </p>
                <ul className="space-y-2 text-sm text-stone-300 leading-6">
                  <li>Rent burden and break-even pressure</li>
                  <li>Opening cash and downside trading</li>
                  <li>Lease questions before signing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Why it exists"
            title="A good-looking unit can still be expensive before it proves itself."
            description="Commercial leases can become hard to unwind once rent, fit-out, deposit, legal costs, stock, staffing, utilities, and a weak opening period are all in play."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'It exists to make the pressure points visible before the lease gets expensive to reverse.',
              'It is built for operators comparing units, not for broad market commentary.',
              'It is designed to help users ask sharper questions before they commit to the rent.',
            ].map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5 text-sm leading-7 text-stone-700`}
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
            eyebrow="Who it is for"
            title="Built for operators making an expensive lease decision."
            description="The site is aimed at people who need a practical check before they sign, not a broad property audience."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whoItIsFor.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-5 text-sm leading-7 text-stone-700`}
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
            eyebrow="What it tests"
            title="The checks that matter before the lease becomes a commitment."
            description="YieldLens focuses on the parts of the decision that most often create pressure after the rent is agreed."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatItTests.map((item, index) => (
              <div key={item.title} className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5`}>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-stone-700 leading-7">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass}`}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What it does not do"
            title="The limits are deliberate."
            description="The tool is there to support an early decision, not to replace the work that closes the deal."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatItDoesNotDo.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5 text-sm leading-7 text-stone-700`}
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
            eyebrow="How the product works"
            title="A short path from free check to decision memo."
            description="The flow is intentionally simple so the numbers can be reviewed without extra noise."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {howItWorks.map((item, index) => (
              <div key={item.step} className={`${surfaceCardSoftClass} border-l-4 ${accentClass(index)} p-5`}>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                  Step {item.step}
                </p>
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="mt-2 text-sm text-stone-700 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Trust principle"
            title="Assumption-led, not black-box certainty."
            description="The output depends on the assumptions entered. Its value is in making rent, costs, cash buffer, and downside pressure visible enough to challenge."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trustPrinciples.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardClass} border-l-4 ${accentClass(index)} p-5 text-sm leading-7 text-stone-700`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Final CTA"
            title="Start with the free check, then go deeper if the site still looks worth pursuing."
            tone="dark"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath="/about"
              ctaLabel="Run a free commercial check"
              pageType="trust_page"
              className={heroPrimaryCtaClass}
            >
              Run a free commercial check
            </TrackedCtaLink>
            <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
              View sample viability file
            </Link>
            <Link href="/how-it-works" className={secondaryCtaClass}>
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
