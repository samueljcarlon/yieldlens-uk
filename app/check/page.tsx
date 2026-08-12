import CheckPageClient from './CheckPageClient';
import { disclaimerClass, surfaceCardClass, surfaceCardSoftClass } from '@/components/yieldLensUi';
import { parseCommercialBusinessTypeKey } from '@/lib/commercialBusinessType';

const commercialHighlights = [
  'Rent burden',
  'Break-even customers',
  'Opening cash pressure',
  'Downside trading',
  'Six-month survival',
  'Lease questions to verify',
];

export default function CheckPage({
  searchParams,
}: {
  searchParams?: { mode?: string | string[]; businessType?: string | string[] };
}) {
  const getSingleValue = (value?: string | string[]): string | undefined =>
    Array.isArray(value) ? value[0] : value;

  const initialMode = searchParams?.mode === 'residential' ? 'residential' : 'commercial';
  const commercialMode = initialMode === 'commercial';
  const initialBusinessType = parseCommercialBusinessTypeKey(getSingleValue(searchParams?.businessType)) ?? undefined;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--yieldlens-caution)] font-semibold mb-2">
          Free property check
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-950 mb-3">
          {commercialMode
            ? 'Commercial lease viability check'
            : 'Run an indicative property pressure-test'}
        </h1>

        <p className="text-sm sm:text-base text-[var(--yieldlens-muted)] max-w-2xl leading-7">
          {commercialMode
            ? 'Pressure-test rent, revenue, costs, opening cash, and downside trading before signing a commercial lease.'
            : 'Choose residential or commercial, enter the key numbers, and get a yield estimate, risk flags, and clear verdict.'}
        </p>

        {commercialMode ? (
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold">
            Step 1 of 1: commercial rent check. Takes around 2 minutes.
          </p>
        ) : null}

        {commercialMode ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {commercialHighlights.map((item) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} bg-[var(--yieldlens-panel)]/80 border border-stone-200 px-4 py-3`}
              >
                <p className="text-sm font-semibold text-stone-900">{item}</p>
              </div>
            ))}
          </div>
        ) : null}

        <p className={`${disclaimerClass} mt-5 max-w-2xl`}>
          {commercialMode
            ? 'Indicative decision-support only. Not financial advice, legal advice, tax advice, mortgage advice, a valuation, or a substitute for professional due diligence.'
            : 'Indicative decision-support only.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:items-start">
        <div className={`${surfaceCardClass} p-5 sm:p-6`}>
          <p className="text-sm font-semibold text-stone-900 mb-2">
            Enter your commercial unit assumptions below.
          </p>

          <p className="text-sm text-[var(--yieldlens-muted)] leading-6 mb-4 max-w-2xl">
            Use cautious assumptions. You can rerun the check with different rent,
            revenue, and cost scenarios.
          </p>

          <CheckPageClient initialMode={initialMode} initialBusinessType={initialBusinessType} />
        </div>

        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className={`${surfaceCardClass} p-5`}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
              Commercial workflow
            </p>

            <h2 className="text-xl font-bold text-stone-950 mb-3">
              Use commercial mode when the lease is the decision
            </h2>

            <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
              The commercial check pressure-tests rent burden, break-even customers,
              opening cash, downside trading, and lease questions before you commit.
            </p>
          </div>

          <div className={`${surfaceCardSoftClass} bg-[var(--yieldlens-panel)] p-5`}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
              What you get
            </p>

            <ul className="space-y-2 text-sm text-[var(--yieldlens-primary)]">
              {commercialHighlights.map((item) => (
                <li key={`what-you-get-${item}`}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={`${surfaceCardSoftClass} p-5 text-sm text-[var(--yieldlens-muted)]`}>
            <p className="font-semibold text-stone-900 mb-2">
              Assumption-led, not black-box certainty
            </p>

            <p className="leading-6">
              YieldLens UK provides indicative property pressure-tests and
              decision-support analysis only. The result is only as useful as the
              assumptions entered.
            </p>
          </div>
        </aside>
      </div>

      <noscript>
        <div className={`${surfaceCardClass} mt-8 p-5`}>
          <p className="text-sm font-semibold text-stone-900 mb-2">
            JavaScript is required for the interactive check.
          </p>

          <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
            The commercial lease viability check measures rent burden, break-even
            customers, opening cash pressure, downside trading, six-month survival,
            and lease questions to verify before signing.
          </p>
        </div>
      </noscript>
    </div>
  );
}
