import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';

export const metadata: Metadata = {
  title: 'Commercial Lease Checklist Before Signing | YieldLens UK',
  description:
    'Use this commercial lease checklist to review rent burden, break-even customers, upfront cash, service charge, rent review, repairing obligations, break clauses, and due diligence before committing.',
  alternates: {
    canonical: 'https://yieldlens.co.uk/commercial-lease-checklist-before-signing',
  },
  openGraph: {
    title: 'Commercial Lease Checklist Before Signing | YieldLens UK',
    description:
      'Review rent burden, break-even customers, upfront cash, lease terms, and due diligence before signing a commercial lease.',
    url: 'https://yieldlens.co.uk/commercial-lease-checklist-before-signing',
  },
};

const quickChecklistItems = [
  'Rent burden',
  'Break-even customers or sales',
  'Staffing and known monthly costs',
  'Business rates',
  'Utilities and insurance',
  'Service charge',
  'Fit-out and setup costs',
  'Rent deposit',
  'Rent-free period',
  'Break clause',
  'Rent review',
  'Repairing obligations',
  'Permitted use',
  'Planning and licensing',
  'Downside trading',
  'Cash buffer after opening',
];

const leaseTerms = [
  {
    title: 'Rent-free period',
    ask: 'How long is the rent-free period, and does it cover the period when fit-out and launch costs are highest?',
    why: 'A rent-free period can protect opening cash when the site is not trading at full strength.',
  },
  {
    title: 'Rent review',
    ask: 'How often is rent reviewed, and is the review formula linked to inflation, open market rent, or another mechanism?',
    why: 'A borderline site can become much more expensive if rent steps up faster than trading improves.',
  },
  {
    title: 'Service charge',
    ask: 'What does the service charge cover, and is there a cap or estimate that limits surprise costs?',
    why: 'Extra service charge can narrow the margin quickly when rent burden is already high.',
  },
  {
    title: 'Break clause',
    ask: 'Is there a break clause, when can it be used, and what conditions must be met for it to work?',
    why: 'A break clause can limit downside if the site underperforms after opening.',
  },
  {
    title: 'Repairing obligations',
    ask: 'Is the tenant responsible for internal only repairs, full repairing, or a more limited schedule of responsibility?',
    why: 'Repairing obligations can create hidden cost exposure that is easy to miss from headline rent alone.',
  },
  {
    title: 'Deposit terms',
    ask: 'How much deposit is required, when is it held, and on what terms can it be returned?',
    why: 'A larger deposit reduces opening cash and can make the first months feel tighter than expected.',
  },
  {
    title: 'Permitted use',
    ask: 'Does the lease allow the business model you actually plan to run, including food, drink, takeaway, or retail activity?',
    why: 'If permitted use is too narrow, the site may not support the full business plan.',
  },
  {
    title: 'Assignment and subletting',
    ask: 'Can the lease be assigned or sublet if the site later needs to be sold or restructured?',
    why: 'A flexible lease can reduce the downside if plans change.',
  },
  {
    title: 'Handover condition',
    ask: 'What condition will the unit be in on handover, and who is responsible for making it usable?',
    why: 'Handover condition affects fit-out cost, delay risk, and opening cash.',
  },
  {
    title: 'Planning and licensing',
    ask: 'Are planning permission, licensing, or other consents needed for the intended use?',
    why: 'A lease can look fine commercially but still fail if the use cannot be operated as planned.',
  },
  {
    title: 'Nearby restrictions',
    ask: 'Are there exclusivity rights, non-compete clauses, or nearby restrictions that change the trading opportunity?',
    why: 'Local restrictions can materially affect footfall, trade mix, and the value of the site.',
  },
];

const evidenceSections = [
  {
    title: 'Trading evidence',
    items: [
      'Footfall counts at different times of day',
      'Competitor observations',
      'Average spend evidence',
      'Trading-hour assumptions',
      'Local demand indicators',
    ],
  },
  {
    title: 'Cost evidence',
    items: [
      'Business rates bill or estimate',
      'Utility estimate',
      'Service charge estimate',
      'Insurance quote',
      'Fit-out quotes',
      'Legal fee estimate',
    ],
  },
  {
    title: 'Lease and legal evidence',
    items: [
      'Draft lease or heads of terms',
      'Rent review wording',
      'Break clause wording',
      'Repairing obligations',
      'Permitted use',
      'Planning or licensing confirmation if relevant',
    ],
  },
];

const faqItems = [
  {
    q: 'What should I check before signing a commercial lease?',
    a: 'Start with rent burden, break-even customers or sales, upfront cash, downside trading, service charge, rent review, repairing obligations, break clauses, and permitted use. Then ask a solicitor to review the legal terms.',
  },
  {
    q: 'Should I sign a lease based only on rent?',
    a: 'No. Rent is only one part of the risk. Fit-out, deposit, staffing, rates, utilities, and lease clauses can change the real economics materially.',
  },
  {
    q: 'What is rent burden?',
    a: 'It is monthly rent divided by expected monthly revenue. YieldLens uses 12% as a healthier screen and 18% as a caution threshold. Those are YieldLens screening thresholds, not universal rules.',
  },
  {
    q: 'What is a break clause?',
    a: 'A break clause is a contractual exit point. It matters because it can reduce the downside if the site underperforms after opening.',
  },
  {
    q: 'Why do repairing obligations matter?',
    a: 'Repairing obligations can create hidden costs and responsibility for damage or upkeep that are not obvious from the headline rent.',
  },
  {
    q: 'Should I get a solicitor before signing a commercial lease?',
    a: 'Yes. YieldLens can help with the commercial pressure-test, but a solicitor should review the lease and related legal documents before you commit.',
  },
  {
    q: 'Can YieldLens review my lease?',
    a: 'YieldLens does not review legal documents. It helps you structure the commercial numbers and questions before you commit to a lease.',
  },
  {
    q: 'Can YieldLens tell me whether to sign?',
    a: 'No. YieldLens UK provides indicative decision-support only. It helps you pressure-test the numbers and questions, but it does not tell you to sign or not sign.',
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
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">{title}</h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
    </div>
  );
}

export default function CommercialLeaseChecklistPage() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
                Commercial lease checklist
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Commercial lease checklist before signing
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                Before committing to a commercial lease, check whether the site
                can carry the rent, opening costs, downside trading, and lease
                obligations. A low headline rent can still become expensive if
                the numbers and lease terms are not pressure-tested.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_home_cta_clicked"
                  pagePath="/commercial-lease-checklist-before-signing"
                  ctaLabel="Run a free commercial lease check"
                  pageType="seo_page"
                  className="bg-teal-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-teal-400 transition-colors text-sm text-center"
                >
                  Run a free commercial lease check
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
              <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-3">
                Quick answer
              </p>
              <div className="space-y-3 text-sm text-stone-300 leading-7">
                {quickChecklistItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Why the checklist matters"
          title="Commercial lease mistakes are expensive because rent is only one part of the risk."
          description="Tenants often focus on the headline rent and miss the wider economics that make a site workable or fragile."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Fit-out costs can drain cash before trading starts.',
            'Service charge can narrow the margin after the site opens.',
            'Repairing obligations can create hidden cost exposure.',
            'Rent reviews can make a borderline site worse later.',
            'Weak trading can expose a site that only works in the base case.',
            'A lack of break clause can trap a tenant in a weak site.',
          ].map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-sm text-stone-700 leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Check the rent burden"
            title="Rent burden is monthly rent divided by expected monthly revenue."
            description="Use it as an early screen, not as a final answer."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm font-semibold text-stone-900 mb-3">Screening thresholds</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Healthier', value: '12%' },
                  { label: 'Caution', value: '18%' },
                  { label: 'High pressure', value: 'Above 18%' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-stone-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
                    <p className="text-lg font-bold text-stone-900 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Worked example</p>
              <div className="space-y-3 text-sm text-stone-700 leading-7">
                <p>Annual rent: £60,000</p>
                <p>Monthly rent: £5,000</p>
                <p>Expected monthly revenue: £24,960</p>
                <p>Rent burden: about 20%</p>
              </div>
              <p className="mt-4 text-sm text-stone-700 leading-7">
                Twenty percent is high enough to require stronger evidence, not
                just optimism.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href="/commercial-rent-burden-calculator" className="text-teal-700 font-medium hover:text-teal-900">
                  Commercial rent burden calculator
                </Link>
                <Link href="/how-much-rent-can-a-cafe-afford" className="text-teal-700 font-medium hover:text-teal-900">
                  Cafe rent affordability guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Check break-even customers or sales"
          title="Convert the lease into a customer target."
          description="A lease can look affordable until fixed costs become a daily customer requirement."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <p className="text-sm font-semibold text-stone-900 mb-3">Break-even example</p>
            <p className="text-sm text-stone-700 leading-7">
              If the known monthly cost base is £14,100 and average spend is £12
              across 26 opening days, break-even is about 45 customers/day.
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">What it means</p>
            <p className="text-sm text-stone-700 leading-7">
              If expected customers/day is 80, the site has room on paper, but
              the footfall assumption still needs evidence.
            </p>
            <div className="mt-4">
              <Link href="/break-even-customers-calculator" className="text-teal-700 font-medium hover:text-teal-900 text-sm">
                Break-even customers calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Check upfront cash before opening"
            title="A cafe can fail on opening cash even if monthly rent looks manageable."
            description="Fit-out, deposit, legal fees, opening stock, signage, launch marketing, and starting cash all matter because they can drain cash before the site begins trading."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 leading-7">
                <p>Fit-out: £50,000</p>
                <p>Rent deposit: £15,000</p>
                <p>Legal fees: £3,000</p>
                <p>Opening stock: £8,000</p>
                <p>Other setup: £5,000</p>
                <p>Starting cash: £90,000</p>
                <p>Upfront cash needed: £81,000</p>
                <p>Opening buffer: £9,000</p>
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Why it matters</p>
              <p className="text-sm text-stone-700 leading-7">
                A £9,000 buffer is thin if fit-out overruns, trading starts slowly,
                or lease costs are higher than expected. The monthly rent may be
                manageable, but the opening cash stack still needs room to breathe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Check downside trading"
          title="Do not only test the base case."
          description="The lease should still make sense if revenue is weaker than expected."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <div className="space-y-3 text-sm text-stone-700 leading-7">
              <p>Base revenue: £24,960</p>
              <p>60% downside revenue: £14,976</p>
              <p>Known cost base: £14,100</p>
              <p>Downside monthly position: £876 surplus</p>
            </div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">Interpretation</p>
            <p className="text-sm text-stone-700 leading-7">
              The downside month still covers known costs, but that does not
              remove the need to check opening buffer and lease terms.
            </p>
            <div className="mt-4">
              <Link href="/commercial-lease-survival-calculator" className="text-teal-700 font-medium hover:text-teal-900 text-sm">
                Commercial lease survival calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Lease terms to check"
            title="Ask the lease questions before the numbers become a commitment."
            description="Use this as a commercial review list, then ask your solicitor to review the legal wording."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {leaseTerms.map((item) => (
              <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="text-sm text-stone-700 leading-7 mt-3">
                  <span className="font-medium text-stone-900">Ask:</span> {item.ask}
                </p>
                <p className="text-sm text-stone-700 leading-7 mt-2">
                  <span className="font-medium text-stone-900">Why it matters:</span> {item.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Evidence to collect before committing"
          title="Collect the evidence that makes the checklist real."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {evidenceSections.map((group) => (
            <div key={group.title} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">{group.title}</p>
              <div className="space-y-3 text-sm text-stone-700 leading-7">
                {group.items.map((item) => (
                  <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Worked example"
            title="Redacted high street site"
            description="This example is fictional and redacted. It shows the shape of the affordability question without exposing a real tenant or address."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 leading-7">
                {[
                  ['Business type', 'Cafe'],
                  ['Address', 'Redacted high street site'],
                  ['Postcode', 'NW6 sample'],
                  ['Annual rent', '£60,000'],
                  ['Expected customers/day', '80'],
                  ['Average spend', '£12'],
                  ['Opening days/month', '26'],
                  ['Monthly revenue', '£24,960'],
                  ['Rent burden', '20%'],
                  ['Break-even', 'about 45 customers/day'],
                  ['Opening buffer', '£9,000'],
                  ['Downside monthly position', '£876 surplus'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-stone-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{label}</p>
                    <p className="text-sm font-semibold text-stone-900 mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-stone-900 mb-3">Verdict</p>
              <p className="text-sm text-stone-700 leading-7">
                This is not automatically unworkable, but the rent burden is high
                and the opening buffer is thin. It needs footfall evidence,
                confirmed fit-out costs, and sharper lease terms before the
                numbers feel comfortable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="How YieldLens helps"
          title="Turn the checklist into numbers you can challenge."
          description="The free commercial check produces the core metrics. The £49 file adds deeper analysis and action items."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-stone-900 mb-3">Free check outputs</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700 leading-7">
              {[
                'Rent burden',
                'Break-even customers/day',
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
                'Ranked actions',
                'Final view',
              ].map((item) => (
                <div key={item} className="rounded-lg border border-stone-200 bg-white p-3">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/viability-file" className="text-teal-700 font-medium hover:text-teal-900">
                Learn about the £49 file
              </Link>
              <Link href="/how-it-works" className="text-teal-700 font-medium hover:text-teal-900">
                See how YieldLens works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Commercial lease checklist questions"
            description="Short answers for people trying to decide whether a site is worth a deeper look."
          />
          <div className="grid grid-cols-1 gap-4">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-900">{item.q}</p>
                <p className="text-sm text-stone-700 leading-7 mt-3">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Pressure-test the lease numbers before you commit."
          title="Check the lease numbers before you commit."
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <TrackedCtaLink
            href="/check?mode=commercial"
            eventName="commercial_home_cta_clicked"
            pagePath="/commercial-lease-checklist-before-signing"
            ctaLabel="Run a free commercial lease check"
            pageType="seo_page"
            className="bg-teal-500 text-stone-950 px-6 py-3 rounded font-semibold hover:bg-teal-400 transition-colors text-sm text-center"
          >
            Run a free commercial lease check
          </TrackedCtaLink>
          <Link
            href="/sample-commercial-viability-file"
            className="bg-stone-900 text-white px-6 py-3 rounded font-medium hover:bg-stone-800 transition-colors text-sm text-center"
          >
            View sample viability file
          </Link>
          <Link
            href="/how-it-works"
            className="bg-white border border-stone-300 text-stone-900 px-6 py-3 rounded font-medium hover:bg-stone-50 transition-colors text-sm text-center"
          >
            How it works
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/commercial-lease-viability-check" className="text-teal-700 font-medium hover:text-teal-900">
            Commercial lease viability check
          </Link>
          <Link href="/commercial-rent-burden-calculator" className="text-teal-700 font-medium hover:text-teal-900">
            Commercial rent burden calculator
          </Link>
          <Link href="/break-even-customers-calculator" className="text-teal-700 font-medium hover:text-teal-900">
            Break-even customers calculator
          </Link>
          <Link href="/commercial-lease-survival-calculator" className="text-teal-700 font-medium hover:text-teal-900">
            Commercial lease survival calculator
          </Link>
          <Link href="/how-much-rent-can-a-cafe-afford" className="text-teal-700 font-medium hover:text-teal-900">
            How much rent can a cafe afford?
          </Link>
          <Link href="/viability-file" className="text-teal-700 font-medium hover:text-teal-900">
            Viability file
          </Link>
        </div>
      </section>
    </div>
  );
}
