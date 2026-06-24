import { disclaimerClass, surfaceCardClass, surfaceCardSoftClass } from '@/components/yieldLensUi';

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-green-700 font-semibold mb-2">
          Free property check
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-950 mb-3">
          Commercial lease viability check
        </h1>

        <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-7">
          Pressure-test rent, revenue, costs, opening cash, and downside trading before
          signing a commercial lease.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {['Rent burden', 'Break-even customers', 'Opening cash pressure'].map((item) => (
            <div
              key={item}
              className={`${surfaceCardSoftClass} bg-stone-50/80 border border-stone-200 px-4 py-3`}
            >
              <p className="text-sm font-semibold text-stone-900">{item}</p>
            </div>
          ))}
        </div>

        <p className={`${disclaimerClass} mt-5 max-w-2xl`}>
          Indicative decision-support only. Not financial advice, legal advice, tax
          advice, mortgage advice, a valuation, or a substitute for professional due
          diligence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:items-start">
        <div className={`${surfaceCardClass} p-5 sm:p-6`}>
          <p className="text-sm font-semibold text-stone-900 mb-4">
            Enter your commercial unit assumptions below.
          </p>

          <div className="space-y-4">
            <div className={`${surfaceCardSoftClass} h-14 animate-pulse bg-stone-100/70`} />
            <div className={`${surfaceCardSoftClass} h-[480px] animate-pulse bg-stone-100/70`} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className={`${surfaceCardClass} p-5`}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-green-700 font-semibold mb-2">
              Commercial workflow
            </p>

            <h2 className="text-xl font-bold text-stone-950 mb-3">
              Use commercial mode when the lease is the decision
            </h2>

            <p className="text-sm text-stone-600 leading-6">
              The commercial check pressure-tests rent burden, break-even customers,
              opening cash, downside trading, and lease questions before you commit.
            </p>
          </div>

          <div className={`${surfaceCardSoftClass} bg-stone-50 p-5`}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-green-700 font-semibold mb-2">
              What you get
            </p>

            <ul className="space-y-2 text-sm text-green-950">
              <li>Rent burden and break-even pressure test</li>
              <li>Upfront cash and opening buffer detail</li>
              <li>Downside survival and risk flags</li>
              <li>Clear next steps before spending more time</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
