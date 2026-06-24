'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
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
import TrackedCtaLink from '@/components/TrackedCtaLink';
import { logToolEvent } from '@/lib/logToolEvent';
import RentBurdenGauge from '@/components/visuals/RentBurdenGauge';
import OpeningCashWaterfall from '@/components/visuals/OpeningCashWaterfall';
import BreakEvenComparison from '@/components/visuals/BreakEvenComparison';
import DownsideSurvivalCard from '@/components/visuals/DownsideSurvivalCard';

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

function formatOpeningPosition(result: CommercialResult): string {
  const value = result.availableCashAfterOpening;

  if (!hasNumber(value)) return 'Opening position: Not available';
  if (value < 0) return `Opening shortfall: ${formatCurrency(Math.abs(value))}`;

  return `Opening buffer: ${formatCurrency(value)}`;
}

function getCommercialResultSummary(result: CommercialResult): string {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'The main issue is the opening capital stack: upfront cash needed exceeds starting cash, so the site needs better fit-out, deposit, or landlord terms before it feels comfortable.';
  }

  if (result.survivesSixBadMonths === false) {
    return 'The downside month can be managed only if the opening buffer is strong enough. The current numbers still need more evidence before commitment.';
  }

  if (
    hasNumber(result.rentBurdenPercentage) &&
    result.rentBurdenPercentage >= 18
  ) {
    return 'Rent takes a heavy share of expected revenue, so the deal needs stronger evidence around footfall, spend, and lease terms before it feels comfortable.';
  }

  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening > 0) {
    return 'The deal works more comfortably on paper, but the opening buffer and lease terms still need evidence before the site feels ready.';
  }

  return 'The quick check is indicative and still needs evidence around demand, costs, and lease terms.';
}

function getCommercialTakeawayQuestions(result: CommercialResult): string[] {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return [
      'Can fit-out, deposit, or landlord contribution be reduced enough to close the opening shortfall?',
      'What evidence supports the expected customers per day and average spend?',
      'Are business rates, service charge, insurance, utilities, repairs, and staffing fully included?',
      'What lease terms, break clauses, rent reviews, repairing obligations, and permitted use restrictions apply?',
    ];
  }

  return [
    'What evidence supports the expected customers per day and average spend?',
    'Are business rates, service charge, insurance, utilities, repairs, and staffing fully included?',
    'What lease terms, break clauses, rent reviews, repairing obligations, and permitted use restrictions apply?',
    'What trading evidence would make this case stronger or weaker before heads of terms?',
  ];
}

function summaryToneClass(tone: SummaryTone): string {
  const tones = {
    neutral: 'border-stone-200 bg-white',
    strong: 'border-green-200 bg-green-50',
    caution: 'border-amber-200 bg-amber-50',
    critical: 'border-red-200 bg-red-50',
  };

  return tones[tone];
}

function summaryValueClass(tone: SummaryTone): string {
  const tones = {
    neutral: 'text-stone-950',
    strong: 'text-green-900',
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

function getCommercialInputNumber(submission: Submission, key: string): number | undefined {
  const input = submission.input as Record<string, unknown>;
  const value = input[key];

  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
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
    <div className={`border rounded-2xl p-4 shadow-sm ${summaryToneClass(tone)}`}>
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

function CommercialPressureSummary({ submission }: { submission: Submission }) {
  const result = submission.result as CommercialResult;

  return (
    <section className="mb-8 overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="bg-stone-950 px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold mb-3">
              Commercial lease pressure-test summary
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
              Can the site carry the lease and withstand weak early trading?
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-7 max-w-3xl">
              {getCommercialResultSummary(result)}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
                Rent burden {formatPercent(result.rentBurdenPercentage)}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
                Break-even {formatNumber(result.breakEvenCustomersPerDay)}/day
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
                {formatOpeningPosition(result)}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
                Six-month test {getSixMonthValue(result)}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-wide text-stone-400 font-semibold mb-1">
              Verdict
            </p>

            <p className="text-2xl font-bold leading-tight">
              {getCommercialVerdictLabel(result)}
            </p>

            <p className="text-xs text-stone-300 mt-2 leading-5">
              {getCommercialVerdictHelper(result)}
            </p>

            <p className="text-xs text-stone-400 mt-3">
              Indicative score: {result.score}/100
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 sm:p-6">
        <RentBurdenGauge rentBurdenPercentage={result.rentBurdenPercentage ?? null} />
        <BreakEvenComparison
          breakEvenCustomersPerDay={result.breakEvenCustomersPerDay}
          expectedCustomersPerDay={result.expectedCustomersPerDay}
        />
        <OpeningCashWaterfall
          startingCash={getCommercialInputNumber(submission, 'startingCash')}
          fitOutBudget={getCommercialInputNumber(submission, 'fitOutBudget')}
          rentDeposit={getCommercialInputNumber(submission, 'rentDeposit')}
          legalFees={getCommercialInputNumber(submission, 'legalFees')}
          openingStock={getCommercialInputNumber(submission, 'openingStock')}
          otherSetupCosts={getCommercialInputNumber(submission, 'otherSetupCosts')}
          upfrontCashNeeded={result.upfrontCashNeeded}
          cashAfterOpening={result.availableCashAfterOpening}
        />
        <DownsideSurvivalCard
          downsideRevenuePercentage={result.downsideRevenuePercentage}
          downsideMonthlyRevenue={result.downsideMonthlyRevenue}
          monthlyCostBase={result.estimatedMonthlyCostBase}
          downsideMonthlyPosition={result.downsideMonthlyPosition}
          monthlyBurnInDownside={result.monthlyBurnInDownside}
          survivalMonths={result.survivalMonths}
          survivesSixBadMonths={result.survivesSixBadMonths}
        />
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
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
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
  const questions = getCommercialTakeawayQuestions(result);

  return (
    <div className="rounded-[32px] border border-stone-200 bg-white p-5 sm:p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-green-700 font-semibold mb-2">
          What the free result tells you
        </p>

        <h2 className="text-xl font-bold text-stone-950 mb-2">
          The quick check is useful, but it needs evidence before commitment
        </h2>

        <p className="text-sm text-stone-600 leading-7 max-w-3xl">
          Use the free result to judge the broad shape of the deal: rent burden, break-even volume,
          opening cash, and downside survival. The paid file is where the lease gets pressure-tested properly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          label="Rent burden"
          value={formatPercent(result.rentBurdenPercentage)}
          helper={getRentBurdenHelper(result.rentBurdenPercentage)}
        />
        <MetricCard
          label="Break-even/day"
          value={formatNumber(result.breakEvenCustomersPerDay)}
          helper={getBreakEvenHelper(result)}
        />
        <MetricCard
          label={result.availableCashAfterOpening !== undefined && result.availableCashAfterOpening < 0 ? 'Opening shortfall' : 'Opening buffer'}
          value={(() => {
            const label = formatOpeningPosition(result);
            return label.replace('Opening shortfall: ', '').replace('Opening buffer: ', '');
          })()}
          helper={getCashAfterOpeningHelper(result)}
        />
        <MetricCard
          label="Six-month test"
          value={getSixMonthValue(result)}
          helper={getSixMonthHelper(result)}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <p className="font-semibold text-stone-950 mb-3">
          Questions to verify next
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
  const hasTrackedSubmission = useRef(false);

  useEffect(() => {
    setSubmission(getLatestSubmission());
  }, []);

  useEffect(() => {
    if (!submission || submission.mode !== 'commercial' || hasTrackedSubmission.current) {
      return;
    }

    hasTrackedSubmission.current = true;

    void logToolEvent({
      event_name: 'commercial_check_submitted',
      page_path: '/results',
      tool_name: 'commercial_funnel',
      result_label: 'Commercial check submitted',
      result_band:
        submission.score >= 80
          ? 'score_80_plus'
          : submission.score >= 65
            ? 'score_65_79'
            : submission.score >= 50
              ? 'score_50_64'
              : 'score_below_50',
      metadata: {
        page_path: '/results',
        page_type: 'results',
        funnel_area: 'commercial',
        mode: 'commercial',
        source_page: '/check?mode=commercial',
      },
    });
  }, [submission]);

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
            className="inline-block bg-green-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-green-800"
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
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      <section className="mb-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <div className="bg-gradient-to-r from-stone-950 to-stone-900 px-6 py-7 text-white sm:px-8 sm:py-8">
          <p className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold mb-3">
            {isResidential ? 'Residential return check' : 'Commercial site check'}
          </p>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-end">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
                Your indicative results
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-7 max-w-3xl">
                {isResidential
                  ? 'A quick screen of the property return, ownership costs, and downside risk.'
                  : 'A quick screen of rent burden, break-even customers, opening cash, downside trading, and lease pressure.'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400 font-medium mb-1">
                Saved check
              </p>

              <p className="text-sm text-white font-medium">
                {formatDate(submission.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="bg-white/10 border border-white/10 text-white px-3 py-1.5 rounded-full">
              {getLocation(submission)}
            </span>

            {getAddress(submission) && (
              <span className="bg-white/10 border border-white/10 text-white px-3 py-1.5 rounded-full">
                {getAddress(submission)}
              </span>
            )}

            {email && (
              <span className="bg-green-500/15 border border-green-400/30 text-green-200 px-3 py-1.5 rounded-full">
                Saved for {email}
              </span>
            )}
          </div>
        </div>
      </section>

      {isResidential ? (
        <div className="mb-8">
          <ScoreCard verdict={submission.verdict} />
        </div>
      ) : (
        <CommercialPressureSummary submission={submission} />
      )}

      {isResidential ? (
        <ResidentialMetrics result={result as ResidentialResult} />
      ) : null}

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

      <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-7 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-green-700 font-semibold mb-2">
          {isResidential ? 'Full viability file coming soon' : 'Unlock the paid file'}
        </p>

        <h2 className="text-xl font-bold text-stone-900 mb-2">
          {isResidential
            ? 'Want the full viability file for this property?'
            : 'Turn this quick check into a proper commercial decision document.'}
        </h2>

        <p className="text-sm text-stone-700 leading-7 max-w-3xl">
          {isResidential
            ? 'Your check has been saved. The next product step is a fuller viability file with a cleaner property snapshot, downside cases, assumptions, and a more detailed verdict. Launch users will get early access before paid reports go live.'
            : 'The Standard commercial viability file adds stress tests, negotiation levers, lease questions, due diligence prompts, ranked actions, and a clearer final view before you commit.'}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <ReportInterestButton submission={submission} />

          {isResidential ? (
            <Link
              href="/report"
              className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400 text-center"
            >
              View report preview →
            </Link>
          ) : (
            <TrackedCtaLink
              href="/report"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 hover:underline"
              eventName="results_report_preview_clicked"
              pagePath="/results"
              ctaLabel="View report preview"
              pageType="results"
            >
              View report preview →
            </TrackedCtaLink>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-600">
          {isResidential ? (
            <Link href="/check?mode=residential" className="hover:text-stone-900 hover:underline">
              Run another residential check
            </Link>
          ) : (
            <>
              <TrackedCtaLink
                href="/check?mode=commercial"
                className="hover:text-stone-900 hover:underline"
                eventName="results_run_another_check_clicked"
                pagePath="/results"
                ctaLabel="Run another commercial check"
                pageType="results"
              >
                Run another commercial check
              </TrackedCtaLink>

              <Link href="/sample-commercial-viability-file" className="hover:text-stone-900 hover:underline">
                View sample file
              </Link>
            </>
          )}
        </div>

        <div className="mt-8">
          <ResultsConversionPanel
            mode={submission.mode}
            score={submission.score}
            verdictLabel={submission.verdict.label}
          />
        </div>
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

      <div className="bg-stone-950 text-white rounded-2xl p-6 shadow-[0_16px_30px_rgba(15,23,42,0.16)]">
        <p className="text-xs uppercase tracking-widest text-green-300 font-medium mb-2">
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
