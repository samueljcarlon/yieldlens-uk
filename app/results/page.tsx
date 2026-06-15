'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type {
  CommercialResult,
  ResidentialResult,
  Submission,
} from '@/types/property';
import { getLatestSubmission } from '@/lib/storage';
import MetricCard from '@/components/MetricCard';
import RiskFlags from '@/components/RiskFlags';
import AssumptionsPanel from '@/components/AssumptionsPanel';
import ScoreCard from '@/components/ScoreCard';
import ReportInterestButton from '@/components/ReportInterestButton';
import ScenarioPanel from '@/components/ScenarioPanel';
import ResultsConversionPanel from '@/components/ResultsConversionPanel';

function formatCurrency(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return 'Not available';
  return `${value.toFixed(1)}%`;
}

function formatNumber(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) return 'Not available';
  return value.toFixed(1);
}

function formatMonths(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 'No monthly burn in downside case';
  }

  return `${value.toFixed(1)} months`;
}

type SummaryTone = 'neutral' | 'strong' | 'caution' | 'critical';

function hasNumber(value?: number): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

function getCommercialVerdictLabel(result: CommercialResult): string {
  const labels = {
    'Strong candidate': 'Stronger case',
    'Worth investigating': 'Worth investigating',
    Marginal: 'Needs caution',
    Weak: 'Fragile',
    Avoid: 'Weaker case',
  };

  return labels[result.verdict.label] ?? result.verdict.label;
}

function hasThinOpeningBuffer(result: CommercialResult): boolean {
  const cashAfterOpening = result.availableCashAfterOpening;

  if (!hasNumber(cashAfterOpening) || cashAfterOpening <= 0) return false;

  if (hasNumber(result.monthlyBurnInDownside) && result.monthlyBurnInDownside > 0) {
    return cashAfterOpening < result.monthlyBurnInDownside * 3;
  }

  if (hasNumber(result.estimatedMonthlyCostBase) && result.estimatedMonthlyCostBase > 0) {
    return cashAfterOpening < result.estimatedMonthlyCostBase;
  }

  return false;
}

function getCommercialVerdictHelper(result: CommercialResult): string {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'Major opening funding issue: upfront cash appears higher than starting cash.';
  }

  if (result.survivesSixBadMonths === false) {
    return 'The pressure-test suggests a fragile case that needs caution.';
  }

  if (hasThinOpeningBuffer(result)) {
    return 'The survival test is stronger, but the opening cash buffer is thin.';
  }

  if (result.survivesSixBadMonths) {
    return 'The pressure-test suggests a stronger case worth investigating.';
  }

  return 'The commercial pressure-test is indicative and needs further evidence.';
}

function getRentBurdenTone(value?: number): SummaryTone {
  if (!hasNumber(value)) return 'neutral';
  if (value >= 18) return 'critical';
  if (value >= 12) return 'caution';
  return 'strong';
}

function getRentBurdenHelper(value?: number): string {
  if (!hasNumber(value)) return 'Rent pressure cannot be assessed from the current inputs.';
  if (value >= 18) return 'High rent pressure suggests the margin case needs caution.';
  if (value >= 12) return 'Rent burden is stretched and worth investigating.';
  return 'Rent looks lighter against the submitted revenue assumption.';
}

function getBreakEvenTone(result: CommercialResult): SummaryTone {
  if (!hasNumber(result.breakEvenCustomersPerDay)) return 'neutral';

  if (
    hasNumber(result.expectedCustomersPerDay) &&
    result.breakEvenCustomersPerDay > result.expectedCustomersPerDay
  ) {
    return 'critical';
  }

  return 'strong';
}

function getBreakEvenHelper(result: CommercialResult): string {
  if (!hasNumber(result.breakEvenCustomersPerDay)) {
    return 'Daily break-even cannot be assessed from the current inputs.';
  }

  if (
    hasNumber(result.expectedCustomersPerDay) &&
    result.breakEvenCustomersPerDay > result.expectedCustomersPerDay
  ) {
    return 'Required volume is above the expected customers per day.';
  }

  return 'Required daily volume sits within the submitted customer assumption.';
}

function getCashAfterOpeningTone(result: CommercialResult): SummaryTone {
  if (!hasNumber(result.availableCashAfterOpening)) return 'neutral';
  if (result.availableCashAfterOpening < 0) return 'critical';
  if (hasThinOpeningBuffer(result)) return 'caution';
  return 'strong';
}

function getCashAfterOpeningHelper(result: CommercialResult): string {
  if (!hasNumber(result.availableCashAfterOpening)) {
    return 'Opening cash buffer is not available from the current inputs.';
  }

  if (result.availableCashAfterOpening < 0) {
    return 'Major opening funding issue before trading begins.';
  }

  if (hasThinOpeningBuffer(result)) {
    return 'Positive, but the buffer is thin against early pressure.';
  }

  return 'Opening cash appears stronger under the submitted assumptions.';
}

function getDownsidePositionTone(result: CommercialResult): SummaryTone {
  if (!hasNumber(result.downsideMonthlyPosition)) return 'neutral';
  return result.downsideMonthlyPosition < 0 ? 'critical' : 'strong';
}

function formatDownsidePosition(result: CommercialResult): string {
  const position = result.downsideMonthlyPosition;

  if (!hasNumber(position)) return 'Not available';
  if (position < 0) return `${formatCurrency(Math.abs(position))} burn`;
  if (position > 0) return `${formatCurrency(position)} surplus`;

  return 'Break-even';
}

function getDownsidePositionHelper(result: CommercialResult): string {
  if (!hasNumber(result.downsideMonthlyPosition)) {
    return 'Downside monthly position is not available from the current inputs.';
  }

  if (result.downsideMonthlyPosition < 0) {
    return 'The downside case suggests monthly cash burn.';
  }

  return 'No monthly burn in the downside case, but opening cash still matters.';
}

function hasDownsideMonthlyBurn(result: CommercialResult): boolean {
  return hasNumber(result.monthlyBurnInDownside) && result.monthlyBurnInDownside > 0;
}

function getSurvivalRunwayValue(result: CommercialResult): string {
  if (!hasDownsideMonthlyBurn(result)) return 'No monthly burn in downside case';

  return hasNumber(result.survivalMonths) ? formatMonths(result.survivalMonths) : 'Not available';
}

function getSurvivalRunwayTone(result: CommercialResult): SummaryTone {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'critical';
  }

  if (!hasDownsideMonthlyBurn(result)) return 'strong';
  if (hasNumber(result.survivalMonths) && result.survivalMonths >= 6) return 'strong';
  if (hasNumber(result.survivalMonths) && result.survivalMonths >= 3) return 'caution';

  return 'critical';
}

function getSurvivalRunwayHelper(result: CommercialResult): string {
  if (!hasDownsideMonthlyBurn(result)) {
    return 'No monthly burn is shown in the downside case.';
  }

  if (hasNumber(result.survivalMonths) && result.survivalMonths >= 6) {
    return 'Cash covers at least six weak trading months.';
  }

  if (hasNumber(result.survivalMonths)) {
    return 'Cash runway is fragile under the downside case.';
  }

  return 'Runway cannot be assessed from the current inputs.';
}

function getSixMonthValue(result: CommercialResult): string {
  return result.survivesSixBadMonths ? 'Pass' : 'Fail';
}

function getSixMonthTone(result: CommercialResult): SummaryTone {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'critical';
  }

  if (result.survivesSixBadMonths) {
    return hasThinOpeningBuffer(result) ? 'caution' : 'strong';
  }

  return 'critical';
}

function getSixMonthHelper(result: CommercialResult): string {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'Fail: opening costs exceed available starting cash.';
  }

  if (result.survivesSixBadMonths) {
    if (!hasDownsideMonthlyBurn(result)) return 'Pass: no monthly burn in downside case.';
    if (hasThinOpeningBuffer(result)) return 'Pass: the cash buffer is thin.';

    return 'Pass: cash covers six weak trading months.';
  }

  return 'Fail: cash does not cover six weak trading months.';
}

function summaryToneClass(tone: SummaryTone): string {
  const tones = {
    neutral: 'border-stone-200 bg-white',
    strong: 'border-teal-200 bg-teal-50',
    caution: 'border-amber-200 bg-amber-50',
    critical: 'border-red-200 bg-red-50',
  };

  return tones[tone];
}

function summaryValueClass(tone: SummaryTone): string {
  const tones = {
    neutral: 'text-stone-950',
    strong: 'text-teal-900',
    caution: 'text-amber-950',
    critical: 'text-red-950',
  };

  return tones[tone];
}

function getLocation(submission: Submission): string {
  const input = submission.input;

  if ('postcode' in input && input.postcode) return input.postcode;
  if ('address' in input && input.address) return input.address;

  return 'No location provided';
}

function getAddress(submission: Submission): string | null {
  const input = submission.input;

  if ('address' in input && input.address) return input.address;

  return null;
}

function getEmail(submission: Submission): string | null {
  const input = submission.input;

  if ('email' in input && input.email) return input.email;

  return null;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function CommercialSummaryCard({
  label,
  value,
  helper,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  helper: string;
  tone?: SummaryTone;
}) {
  return (
    <div className={`border rounded-lg p-4 ${summaryToneClass(tone)}`}>
      <p className="text-[11px] uppercase tracking-wide text-stone-500 font-semibold mb-1">
        {label}
      </p>

      <p className={`text-xl sm:text-2xl font-bold leading-tight ${summaryValueClass(tone)}`}>
        {value}
      </p>

      <p className="text-xs text-stone-600 mt-2 leading-5">
        {helper}
      </p>
    </div>
  );
}

function CommercialSummaryGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold mb-3">
        {title}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

function CommercialPressureSummary({ result }: { result: CommercialResult }) {
  return (
    <section className="mb-8 rounded-xl border border-stone-200 bg-stone-50 shadow-sm overflow-hidden">
      <div className="bg-stone-950 text-white px-5 py-6 sm:px-7">
        <p className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-2">
          Commercial lease pressure-test summary
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-5 lg:items-end">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              Can the site carry the lease and withstand weak early trading?
            </h2>

            <p className="text-sm text-stone-300 leading-6 mt-3 max-w-3xl">
              An indicative front-page diagnostic using the submitted rent, trading,
              setup cash, and downside assumptions.
            </p>
          </div>

          <div className="rounded-lg bg-white text-stone-950 p-4 sm:p-5">
            <p className="text-[11px] uppercase tracking-wide text-stone-500 font-semibold mb-1">
              Verdict
            </p>

            <p className="text-2xl font-bold leading-tight">
              {getCommercialVerdictLabel(result)}
            </p>

            <p className="text-xs text-stone-600 mt-2 leading-5">
              {getCommercialVerdictHelper(result)}
            </p>

            <p className="text-xs text-stone-400 mt-3">
              Indicative score: {result.score}/100
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-7 sm:py-6 space-y-6">
        <CommercialSummaryGroup title="Trading pressure">
          <CommercialSummaryCard
            label="Rent burden"
            value={formatPercent(result.rentBurdenPercentage)}
            helper={getRentBurdenHelper(result.rentBurdenPercentage)}
            tone={getRentBurdenTone(result.rentBurdenPercentage)}
          />

          <CommercialSummaryCard
            label="Break-even customers/day"
            value={formatNumber(result.breakEvenCustomersPerDay)}
            helper={getBreakEvenHelper(result)}
            tone={getBreakEvenTone(result)}
          />
        </CommercialSummaryGroup>

        <CommercialSummaryGroup title="Opening cash">
          <CommercialSummaryCard
            label="Upfront cash needed"
            value={formatCurrency(result.upfrontCashNeeded)}
            helper="Fit-out, deposit, fees, opening stock, and setup costs."
          />

          <CommercialSummaryCard
            label="Cash after opening"
            value={formatCurrency(result.availableCashAfterOpening)}
            helper={getCashAfterOpeningHelper(result)}
            tone={getCashAfterOpeningTone(result)}
          />
        </CommercialSummaryGroup>

        <CommercialSummaryGroup title="Downside survival">
          <CommercialSummaryCard
            label="Downside monthly burn or surplus"
            value={formatDownsidePosition(result)}
            helper={getDownsidePositionHelper(result)}
            tone={getDownsidePositionTone(result)}
          />

          <CommercialSummaryCard
            label="Survival runway"
            value={getSurvivalRunwayValue(result)}
            helper={getSurvivalRunwayHelper(result)}
            tone={getSurvivalRunwayTone(result)}
          />

          <CommercialSummaryCard
            label="Six-month test"
            value={getSixMonthValue(result)}
            helper={getSixMonthHelper(result)}
            tone={getSixMonthTone(result)}
          />
        </CommercialSummaryGroup>
      </div>
    </section>
  );
}

function CommercialScenarioCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-stone-500 font-medium mb-1">
        {label}
      </p>

      <p className="text-xl font-bold text-stone-900">
        {value}
      </p>

      <p className="text-xs text-stone-600 mt-2 leading-5">
        {helper}
      </p>
    </div>
  );
}

function CommercialScenarioPressureTest({ result }: { result: CommercialResult }) {
  const baseMonthlyPosition =
    hasNumber(result.estimatedMonthlyRevenue) && hasNumber(result.estimatedMonthlyCostBase)
      ? result.estimatedMonthlyRevenue - result.estimatedMonthlyCostBase
      : undefined;

  const questions = [
    'What evidence supports the expected customers per day and average spend?',
    'Are business rates, service charge, insurance, utilities, repairs, and staffing fully allowed for?',
    'What lease terms, break clauses, rent reviews, repairing obligations, and permitted use restrictions apply?',
    'What trading evidence would make this case stronger or weaker before heads of terms?',
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
          Scenario pressure test
        </p>

        <h2 className="text-xl font-bold text-stone-900 mb-2">
          What needs checking if assumptions move?
        </h2>

        <p className="text-sm text-stone-600 leading-6">
          Use this as a compact evidence check for demand, spend, cost base, and
          lease terms. The summary above carries the headline diagnostic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <CommercialScenarioCard
          label="Base monthly position"
          value={formatCurrency(baseMonthlyPosition)}
          helper="Submitted monthly revenue minus the known monthly cost base."
        />

        <CommercialScenarioCard
          label="Downside revenue"
          value={formatCurrency(result.downsideMonthlyRevenue)}
          helper={`${formatPercent(result.downsideRevenuePercentage)} revenue case used for the downside view.`}
        />

        <CommercialScenarioCard
          label="Cost base"
          value={formatCurrency(result.estimatedMonthlyCostBase)}
          helper="Rent, staff, utilities, rates, and submitted operating costs."
        />
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
        <p className="font-semibold text-stone-900 mb-3">
          Questions to verify before committing
        </p>

        <ol className="space-y-2 text-sm text-stone-700 list-decimal list-inside">
          {questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    setSubmission(getLatestSubmission());
  }, []);

  if (!submission) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-stone-900 mb-3">
            No property check found
          </h1>

          <p className="text-sm text-stone-500 mb-6">
            Run a residential or commercial check first, then your results will appear here.
          </p>

          <Link
            href="/check?mode=commercial"
            className="inline-block bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            Start a free commercial check
          </Link>
        </div>
      </div>
    );
  }

  const isResidential = submission.mode === 'residential';
  const result = submission.result;
  const email = getEmail(submission);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
          {isResidential ? 'Residential return check' : 'Commercial site check'}
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          Your indicative results
        </h1>

        <p className="text-sm text-stone-500">
          {formatDate(submission.createdAt)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="bg-stone-100 border border-stone-200 text-stone-700 px-3 py-1 rounded-full">
            {getLocation(submission)}
          </span>

          {getAddress(submission) && (
            <span className="bg-stone-100 border border-stone-200 text-stone-700 px-3 py-1 rounded-full">
              {getAddress(submission)}
            </span>
          )}

          {email && (
            <span className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1 rounded-full">
              Saved for {email}
            </span>
          )}
        </div>
      </div>

      {isResidential ? (
        <div className="mb-8">
          <ScoreCard verdict={submission.verdict} />
        </div>
      ) : (
        <CommercialPressureSummary result={result as CommercialResult} />
      )}

      {isResidential ? (
        <ResidentialMetrics result={result as ResidentialResult} />
      ) : (
        <CommercialMetrics result={result as CommercialResult} />
      )}

      <div className="mt-8">
        {isResidential ? (
          <ScenarioPanel submission={submission} />
        ) : (
          <CommercialScenarioPressureTest result={result as CommercialResult} />
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskFlags flags={result.riskFlags} />
        <AssumptionsPanel assumptions={result.assumptions} />
      </div>

      {result.missingDataWarnings.length > 0 && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <p className="font-semibold text-yellow-900 mb-3">Missing data warnings</p>

          <ul className="space-y-2 text-sm text-yellow-800">
            {result.missingDataWarnings.map((warning) => (
              <li key={warning}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <p className="font-semibold text-stone-900 mb-3">Next steps</p>

        <ol className="space-y-2 text-sm text-stone-600 list-decimal list-inside">
          {result.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-8 bg-teal-50 border border-teal-200 rounded-xl p-6">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
          {isResidential ? 'Full viability file coming soon' : 'Next step'}
        </p>

        <h2 className="text-xl font-bold text-stone-900 mb-2">
          {isResidential
            ? 'Want the full viability file for this property?'
            : 'Turn this quick check into a viability file.'}
        </h2>

        <p className="text-sm text-stone-700 leading-6 max-w-3xl">
          {isResidential
            ? 'Your check has been saved. The next product step is a fuller viability file with a cleaner property snapshot, downside cases, assumptions, and a more detailed verdict. Launch users will get early access before paid reports go live.'
            : 'Your quick check gives the first screen. A fuller viability file can turn this into a cleaner decision document with assumptions, downside cases, lease questions, and due diligence prompts.'}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <ReportInterestButton submission={submission} />

          <Link
            href="/report"
            className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400 text-center"
          >
            View printable preview →
          </Link>

          <Link
            href={isResidential ? '/check?mode=residential' : '/check?mode=commercial'}
            className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400 text-center"
          >
            Run another {isResidential ? 'residential' : 'commercial'} check
          </Link>
        </div>

        {isResidential && (
          <div className="mt-8">
            <ResultsConversionPanel
              mode={submission.mode}
              score={submission.score}
              verdictLabel={submission.verdict.label}
            />
          </div>
        )}
      </div>

      <div className="mt-8 bg-stone-100 border border-stone-200 rounded-xl p-5 text-sm text-stone-600">
        <p className="font-semibold text-stone-800 mb-2">Important disclaimer</p>

        <p>
          YieldLens UK provides indicative property return checks and decision-support
          analysis only. It is not financial advice, legal advice, tax advice, a valuation,
          or a substitute for professional due diligence.
        </p>
      </div>
    </div>
  );
}

function ResidentialMetrics({ result }: { result: ResidentialResult }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard
        label="Gross yield"
        value={formatPercent(result.grossYield)}
        helper="Purchase price and expected rent"
      />

      <MetricCard
        label="Annual rent"
        value={formatCurrency(result.annualRentalIncome)}
        helper="Expected monthly rent × 12"
      />

      <MetricCard
        label="Monthly cash flow"
        value={formatCurrency(result.monthlyCashFlow)}
        helper="Rent minus known monthly costs"
      />

      <MetricCard
        label="Annual cash flow"
        value={formatCurrency(result.annualCashFlow)}
        helper="Monthly cash flow × 12"
      />

      <MetricCard
        label="Ownership costs"
        value={formatCurrency(result.annualOwnershipCosts)}
        helper="Known monthly costs × 12"
      />
    </div>
  );
}

function CommercialMetrics({ result }: { result: CommercialResult }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Monthly revenue"
          value={formatCurrency(result.estimatedMonthlyRevenue)}
          helper="Spend × customers × opening days"
        />

        <MetricCard
          label="Monthly rent"
          value={formatCurrency(result.monthlyRent)}
          helper="Annual rent ÷ 12"
        />

        <MetricCard
          label="Rent burden"
          value={formatPercent(result.rentBurdenPercentage)}
          helper="Rent as % of estimated revenue"
        />

        <MetricCard
          label="Cost base"
          value={formatCurrency(result.estimatedMonthlyCostBase)}
          helper="Rent + staff + utilities + rates"
        />

        <MetricCard
          label="Break-even/day"
          value={formatNumber(result.breakEvenCustomersPerDay)}
          helper={`Assumed ${result.expectedCustomersPerDay} per day`}
        />
      </div>

      <div className="bg-stone-950 text-white rounded-xl p-6">
        <p className="text-xs uppercase tracking-widest text-teal-300 font-medium mb-2">
          Commercial survival model
        </p>

        <h2 className="text-xl font-bold mb-2">
          Cash detail behind the summary
        </h2>

        <p className="text-sm text-stone-300 leading-6 mb-5">
          These figures show the cash inputs behind the front-page pressure-test:
          upfront requirement, downside revenue, monthly burn or surplus, and runway.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-stone-900">
          <MetricCard
            label="Upfront cash needed"
            value={formatCurrency(result.upfrontCashNeeded)}
            helper="Fit-out, deposit, fees, opening stock, and setup costs"
          />

          <MetricCard
            label="Cash after opening"
            value={formatCurrency(result.availableCashAfterOpening)}
            helper="Starting cash minus upfront cash needed"
          />

          <MetricCard
            label="Downside revenue"
            value={formatCurrency(result.downsideMonthlyRevenue)}
            helper={`${formatPercent(result.downsideRevenuePercentage)} of expected monthly revenue`}
          />

          <MetricCard
            label="Downside burn"
            value={formatCurrency(result.monthlyBurnInDownside)}
            helper="Monthly cash burn in the downside case"
          />

          <MetricCard
            label="Survival runway"
            value={formatMonths(result.survivalMonths)}
            helper="How long cash covers downside burn"
          />

          <MetricCard
            label="Six-month test"
            value={result.survivesSixBadMonths ? 'Pass' : 'Fail'}
            helper="Whether the site survives six weak trading months"
          />
        </div>
      </div>
    </div>
  );
}
