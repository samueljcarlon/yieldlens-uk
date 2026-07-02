'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type {
  CommercialInput,
  CommercialResult,
  ResidentialResult,
  RiskFlag,
  Submission,
} from '@/types/property';
import { getLatestSubmission } from '@/lib/storage';
import ScenarioPanel from '@/components/ScenarioPanel';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import { logToolEvent } from '@/lib/logToolEvent';

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

function hasNumber(value?: number): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
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

function getLocation(submission: Submission): string {
  const input = submission.input;

  if ('postcode' in input && input.postcode) return input.postcode;
  if ('address' in input && input.address) return input.address;

  return 'Location not provided';
}

function getAddress(submission: Submission): string {
  const input = submission.input;

  if ('address' in input && input.address) return input.address;

  return 'Address not provided';
}

function getEmail(submission: Submission): string {
  const input = submission.input;

  if ('email' in input && input.email) return input.email;

  return 'Email not provided';
}

function getPropertyUse(submission: Submission): string {
  const input = submission.input;

  if (submission.mode === 'residential' && 'userObjective' in input && input.userObjective) {
    return input.userObjective;
  }

  if (submission.mode === 'commercial' && 'businessType' in input && input.businessType) {
    return input.businessType;
  }

  return submission.mode === 'residential' ? 'Residential check' : 'Commercial check';
}

function getExecutiveSummary(submission: Submission): string {
  const { score, verdict, mode } = submission;

  if (mode === 'residential') {
    const result = submission.result as ResidentialResult;

    if (score >= 80) {
      return `This residential property screens as a strong candidate on the current assumptions. The indicated gross yield is ${formatPercent(result.grossYield)}, but the result should still be checked against comparable rents, full ownership costs, and financing risk.`;
    }

    if (score >= 65) {
      return `This residential property appears worth investigating, but the result is not risk-free. The indicated gross yield is ${formatPercent(result.grossYield)} and estimated monthly cash flow is ${formatCurrency(result.monthlyCashFlow)}, so the deal depends heavily on the accuracy of rent and cost assumptions.`;
    }

    if (score >= 50) {
      return `This residential property screens as marginal. The numbers may still work in a specific strategy, but the current return profile leaves limited room for higher costs, void periods, or weaker rent.`;
    }

    return `This residential property screens as weak on the current assumptions. The return profile should be treated cautiously unless new evidence materially improves the rent, cost, or purchase price assumptions.`;
  }

  const result = submission.result as CommercialResult;

  const survivalText = result.survivesSixBadMonths
    ? 'The six-month survival test passes on the current downside assumptions.'
    : 'The six-month survival test does not pass on the current downside assumptions.';

  if (score >= 80) {
    return `This commercial site screens as a strong candidate on the current assumptions. Estimated break-even is ${formatNumber(result.breakEvenCustomersPerDay)} customers per day against an assumed ${result.expectedCustomersPerDay} customers per day. ${survivalText}`;
  }

  if (score >= 65) {
    return `This commercial site appears worth investigating. Estimated break-even is ${formatNumber(result.breakEvenCustomersPerDay)} customers per day, but the rent burden, upfront cash requirement, and survival runway still need careful checking. ${survivalText}`;
  }

  if (score >= 50) {
    return `This commercial site screens as marginal. It may be viable, but the rent burden, customer assumptions, upfront cash requirement, and downside trading case need stress-testing before any lease commitment. ${survivalText}`;
  }

  return `This commercial site screens as weak on the current assumptions. It may require stronger footfall, lower rent, lower costs, more starting cash, or a different business model to become viable. ${survivalText}`;
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

function formatDownsidePosition(value?: number): string {
  if (!hasNumber(value)) return 'Not available';
  if (value < 0) return `${formatCurrency(Math.abs(value))} monthly burn`;
  if (value > 0) return `${formatCurrency(value)} monthly surplus`;

  return 'Break-even';
}

function hasDownsideMonthlyBurn(result: CommercialResult): boolean {
  return hasNumber(result.monthlyBurnInDownside) && result.monthlyBurnInDownside > 0;
}

function hasThinOpeningCashBuffer(result: CommercialResult): boolean {
  if (!hasNumber(result.availableCashAfterOpening) || result.availableCashAfterOpening <= 0) {
    return false;
  }

  if (hasNumber(result.monthlyBurnInDownside) && result.monthlyBurnInDownside > 0) {
    return result.availableCashAfterOpening < result.monthlyBurnInDownside * 3;
  }

  if (hasNumber(result.estimatedMonthlyCostBase) && result.estimatedMonthlyCostBase > 0) {
    return result.availableCashAfterOpening < result.estimatedMonthlyCostBase;
  }

  return false;
}

function getCommercialExecutiveText(result: CommercialResult): string {
  const verdict = getCommercialVerdictLabel(result).toLowerCase();

  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return `The pressure-test maps this site to ${verdict} because upfront cash needed is higher than starting cash before trading begins.`;
  }

  if (result.survivesSixBadMonths && hasThinOpeningCashBuffer(result)) {
    if (!hasDownsideMonthlyBurn(result)) {
      return 'The pressure-test suggests the site can cover the downside monthly case, but the opening cash buffer is thin and the result needs caution.';
    }

    return 'The pressure-test suggests the site passes the six-month survival test, but the opening cash buffer is thin and the result needs caution.';
  }

  if (result.survivesSixBadMonths) {
    if (result.verdict.label === 'Strong candidate') {
      return 'The pressure-test suggests a stronger case on the submitted assumptions, subject to evidence for demand, spend, costs, and lease terms.';
    }

    return `The pressure-test maps this site to ${verdict}. It passes the six-month survival test, but the assumptions still need evidence before relying on the lease case.`;
  }

  return `The pressure-test maps this site to ${verdict}. The lease case is fragile unless the trading, cost, cash, or rent assumptions improve.`;
}

function getOpeningCashNote(result: CommercialResult): string {
  if (!hasNumber(result.availableCashAfterOpening)) {
    return 'Opening cash could not be assessed from the current inputs.';
  }

  if (result.availableCashAfterOpening < 0) {
    return 'Major opening funding issue: upfront costs exceed available starting cash.';
  }

  if (
    hasThinOpeningCashBuffer(result)
  ) {
    return 'Cash after opening is positive, but the buffer is thin against one month of known cost base.';
  }

  return 'Opening cash appears stronger on the submitted assumptions.';
}

function getDownsideNote(result: CommercialResult): string {
  if (!hasNumber(result.downsideMonthlyPosition)) {
    return 'Downside monthly position is not available from the current inputs.';
  }

  if (result.downsideMonthlyPosition < 0) {
    return 'The downside case shows monthly burn, so runway depends on cash left after opening.';
  }

  return 'The downside case shows no monthly burn, but opening cash still matters for deposits, fit-out, stock, and early working capital.';
}

function getSixMonthNote(result: CommercialResult): string {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'Fail: opening costs exceed available starting cash.';
  }

  if (result.survivesSixBadMonths) {
    if (!hasDownsideMonthlyBurn(result)) return 'Pass: no monthly burn in downside case.';

    return 'Pass: cash covers six weak trading months.';
  }

  return 'Fail: cash does not cover six weak trading months.';
}

function RiskBadge({ flag }: { flag: RiskFlag }) {
  const classes: Record<RiskFlag['severity'], string> = {
    high: 'bg-red-50 text-red-800 border-red-200',
    medium: 'bg-orange-50 text-orange-800 border-orange-200',
    low: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-stone-50 text-stone-700 border-stone-200',
  };

  return (
    <div className={`border rounded-lg p-3 ${classes[flag.severity]}`}>
      <p className="text-xs uppercase tracking-wide font-semibold mb-1">
        {flag.severity === 'info'
          ? 'Note'
          : flag.severity.charAt(0).toUpperCase() + flag.severity.slice(1)}
      </p>
      <p className="text-sm leading-6">{flag.message}</p>
    </div>
  );
}

function ReportMetric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="border border-stone-200 rounded-lg p-4 bg-white">
      <p className="text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-stone-900">{value}</p>
      <p className="text-xs text-stone-500 mt-1">{helper}</p>
    </div>
  );
}

function ReportSection({
  title,
  intro,
  children,
  className = '',
}: {
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mb-8 break-inside-avoid ${className}`.trim()}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-stone-900">
          {title}
        </h3>

        {intro && (
          <p className="text-sm text-stone-600 leading-6 mt-2 max-w-4xl">
            {intro}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

function ReportDataTable({
  rows,
}: {
  rows: Array<{ label: string; value: string; note?: string }>;
}) {
  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] border-b border-stone-100 last:border-b-0"
        >
          <div className="bg-stone-50 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-stone-500 font-medium">
              {row.label}
            </p>
          </div>

          <div className="px-4 py-3">
            <p className="text-sm font-semibold text-stone-900">
              {row.value}
            </p>

            {row.note && (
              <p className="text-xs text-stone-500 leading-5 mt-1">
                {row.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ResidentialReportMetrics({ result }: { result: ResidentialResult }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <ReportMetric label="Gross yield" value={formatPercent(result.grossYield)} helper="Indicative yield" />
      <ReportMetric label="Annual rent" value={formatCurrency(result.annualRentalIncome)} helper="Expected monthly rent × 12" />
      <ReportMetric label="Monthly cash flow" value={formatCurrency(result.monthlyCashFlow)} helper="After known monthly costs" />
      <ReportMetric label="Annual cash flow" value={formatCurrency(result.annualCashFlow)} helper="Monthly cash flow × 12" />
      <ReportMetric label="Ownership costs" value={formatCurrency(result.annualOwnershipCosts)} helper="Known costs annualised" />
    </div>
  );
}

function CommercialExecutiveSummary({
  result,
}: {
  result: CommercialResult;
}) {
  return (
    <ReportSection
      title="Executive summary"
      intro={getCommercialExecutiveText(result)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportMetric
          label="Verdict"
          value={getCommercialVerdictLabel(result)}
          helper="Mapped commercial pressure-test verdict"
        />
        <ReportMetric
          label="Score"
          value={`${result.score}/100`}
          helper="Indicative score"
        />
        <ReportMetric
          label="Rent burden"
          value={formatPercent(result.rentBurdenPercentage)}
          helper="Rent as a share of expected revenue"
        />
        <ReportMetric
          label="Break-even/day"
          value={formatNumber(result.breakEvenCustomersPerDay)}
          helper="Customers needed each trading day"
        />
        <ReportMetric
          label="Upfront cash needed"
          value={formatCurrency(result.upfrontCashNeeded)}
          helper="Fit-out, deposit, fees, stock, and setup costs"
        />
        <ReportMetric
          label="Cash after opening"
          value={formatCurrency(result.availableCashAfterOpening)}
          helper={getOpeningCashNote(result)}
        />
        <ReportMetric
          label="Downside monthly"
          value={formatDownsidePosition(result.downsideMonthlyPosition)}
          helper={getDownsideNote(result)}
        />
        <ReportMetric
          label="Six-month test"
          value={result.survivesSixBadMonths ? 'Pass' : 'Fail'}
          helper={getSixMonthNote(result)}
        />
      </div>
    </ReportSection>
  );
}

function CommercialSiteSnapshot({
  submission,
  result,
}: {
  submission: Submission;
  result: CommercialResult;
}) {
  const input = submission.input as CommercialInput;

  return (
    <ReportSection
      title="Site snapshot"
      intro="Submitted assumptions used to create this commercial viability file."
    >
      <ReportDataTable
        rows={[
          { label: 'Address', value: getAddress(submission) },
          { label: 'Postcode', value: getLocation(submission) },
          { label: 'Business type', value: input.businessType || 'Not provided' },
          { label: 'Annual rent', value: formatCurrency(input.annualRent) },
          { label: 'Expected monthly revenue', value: formatCurrency(result.estimatedMonthlyRevenue) },
          { label: 'Average spend', value: formatCurrency(input.averageSpendPerCustomer) },
          { label: 'Expected customers/day', value: formatNumber(input.expectedCustomersPerDay) },
          { label: 'Opening days/month', value: formatNumber(input.openingDaysPerMonth) },
          { label: 'Monthly staff costs', value: formatCurrency(input.monthlyStaffCosts) },
          { label: 'Utilities and other costs', value: formatCurrency(input.monthlyUtilitiesAndOtherCosts) },
          { label: 'Business rates', value: formatCurrency(input.monthlyBusinessRates) },
          { label: 'Downside revenue case', value: formatPercent(result.downsideRevenuePercentage) },
        ]}
      />
    </ReportSection>
  );
}

function CommercialCashAndSurvivalModel({
  submission,
  result,
}: {
  submission: Submission;
  result: CommercialResult;
}) {
  const input = submission.input as CommercialInput;

  return (
    <ReportSection
      title="Opening cash and survival model"
      intro="Cash needed before opening and the downside monthly position used for the six-month survival test."
    >
      {hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 shadow-sm">
          <p className="text-sm font-semibold text-red-900">
            Major opening funding issue
          </p>
          <p className="text-sm text-red-800 leading-6 mt-1">
            Upfront cash needed exceeds starting cash before trading begins.
          </p>
        </div>
      )}

      {!hasDownsideMonthlyBurn(result) && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4 shadow-sm">
          <p className="text-sm font-semibold text-green-900">
            No monthly burn in downside case
          </p>
          <p className="text-sm text-green-800 leading-6 mt-1">
            The downside case does not show monthly burn, but opening cash still matters
            for deposits, fit-out, stock, and early working capital.
          </p>
        </div>
      )}

      <ReportDataTable
        rows={[
          { label: 'Fit-out budget', value: formatCurrency(input.fitOutBudget) },
          { label: 'Rent deposit', value: formatCurrency(input.rentDeposit) },
          { label: 'Legal fees', value: formatCurrency(input.legalFees) },
          { label: 'Opening stock', value: formatCurrency(input.openingStock) },
          { label: 'Other setup costs', value: formatCurrency(input.otherSetupCosts) },
          { label: 'Upfront cash needed', value: formatCurrency(result.upfrontCashNeeded) },
          { label: 'Starting cash', value: formatCurrency(input.startingCash) },
          { label: 'Cash after opening', value: formatCurrency(result.availableCashAfterOpening), note: getOpeningCashNote(result) },
          { label: 'Downside revenue', value: formatCurrency(result.downsideMonthlyRevenue) },
          { label: 'Downside monthly position', value: formatDownsidePosition(result.downsideMonthlyPosition), note: getDownsideNote(result) },
          { label: 'Survival runway', value: formatMonths(result.survivalMonths) },
          { label: 'Six-month survival test', value: result.survivesSixBadMonths ? 'Pass' : 'Fail', note: getSixMonthNote(result) },
        ]}
      />
    </ReportSection>
  );
}

function CommercialRiskFindings({ flags }: { flags: RiskFlag[] }) {
  return (
    <ReportSection
      title="Report findings"
      intro="Use these findings to prioritise the evidence requests, lease questions, and cost checks before treating the site as robust."
      className="print:break-after-page"
    >
      {flags.length > 0 ? (
        <div className="space-y-3">
          {flags.map((flag, index) => (
            <div
              key={`${flag.severity}-${flag.message}`}
              className="grid grid-cols-1 lg:grid-cols-[120px_minmax(0,1fr)] gap-3"
            >
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                <p className="text-xs uppercase tracking-wide text-stone-500 font-semibold">
                  Finding {index + 1}
                </p>
                <p className="text-sm font-semibold text-stone-900 mt-1 capitalize">
                  {flag.severity === 'info' ? 'Note' : flag.severity}
                </p>
              </div>

              <RiskBadge flag={flag} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm text-stone-600 shadow-sm">
          No specific risk flags were generated from the submitted inputs.
        </div>
      )}
    </ReportSection>
  );
}

function CommercialLeaseQuestions() {
  const questionGroups = [
    {
      title: 'Trading evidence',
      questions: [
        'What evidence supports expected customer volume?',
        'What evidence supports average spend?',
        'What happens if spend or customers are lower?',
      ],
    },
    {
      title: 'Funding and cost base',
      questions: [
        'Can fit-out, deposit, fees, opening stock, and working capital be funded?',
        'Are service charge, insurance, utilities, rates, and licences fully allowed for?',
      ],
    },
    {
      title: 'Lease terms',
      questions: [
        'What are the break clauses?',
        'What are the repairing obligations?',
        'What are the rent review terms?',
        'Is permitted use confirmed?',
      ],
    },
  ];

  return (
    <ReportSection
      title="Lease and evidence questions"
      intro="A focused checklist for the assumptions that most affect the commercial lease case."
      className="print:break-before-page"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {questionGroups.map((group) => (
          <div
            key={group.title}
            className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-stone-900 mb-3">
              {group.title}
            </p>

            <ol className="space-y-2 list-decimal list-inside text-sm text-stone-700 leading-6">
              {group.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </ReportSection>
  );
}

function CommercialMissingEvidence({
  result,
}: {
  result: CommercialResult;
}) {
  const warnings =
    result.missingDataWarnings.length > 0
      ? result.missingDataWarnings
      : ['No missing input warnings were generated. Lease documents, local evidence, and live operating costs still need checking.'];

  return (
    <ReportSection
      title="Missing evidence and next checks"
      intro="Convert the quick check into a due diligence worklist: fill the missing evidence first, then verify the assumptions that drive the score."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-semibold text-stone-900 mb-3">
            Missing evidence
          </p>

          <ul className="space-y-2">
            {warnings.map((warning) => (
              <li
                key={warning}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-900 leading-6"
              >
                {warning}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-stone-900 mb-3">
            Next checks
          </p>

          <ol className="space-y-2 list-decimal list-inside">
            {result.nextSteps.map((step) => (
              <li
                key={step}
                className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm text-stone-700 leading-6"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ReportSection>
  );
}

function CommercialReportBody({ submission }: { submission: Submission }) {
  const result = submission.result as CommercialResult;

  return (
    <>
      <CommercialExecutiveSummary result={result} />
      <CommercialSiteSnapshot submission={submission} result={result} />
      <CommercialCashAndSurvivalModel submission={submission} result={result} />
      <CommercialRiskFindings flags={result.riskFlags} />
      <CommercialLeaseQuestions />
      <CommercialMissingEvidence result={result} />
    </>
  );
}

export default function ReportPage() {
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    setSubmission(getLatestSubmission());
  }, []);

  useEffect(() => {
    const nextTitle = submission
      ? submission.mode === 'commercial'
        ? 'YieldLens UK | Commercial Viability File'
        : 'YieldLens UK | Residential Viability File'
      : 'YieldLens UK | Property Viability File';

    const previousTitle = document.title;
    document.title = nextTitle;

    return () => {
      document.title = previousTitle;
    };
  }, [submission]);

  if (!submission) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-stone-900 mb-3">
            No report available
          </h1>

          <p className="text-sm text-stone-500 mb-6">
            Run a free commercial check first, then the printable viability file will appear here.
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
  const commercialResult = isResidential ? null : (result as CommercialResult);
  const displayedVerdictLabel = commercialResult
    ? getCommercialVerdictLabel(commercialResult)
    : submission.verdict.label;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="print-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-1">
            Viability file snapshot
          </p>
          <h1 className="text-2xl font-bold text-stone-900">
            YieldLens UK viability file
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              if (!isResidential) {
                void logToolEvent({
                  event_name: 'report_print_or_save_clicked',
                  page_path: '/report',
                  tool_name: 'commercial_funnel',
                  result_label: 'Print or save as PDF',
                  result_band: 'cta_click',
                  metadata: {
                    page_path: '/report',
                    cta_label: 'Print or save as PDF',
                    destination: 'window.print',
                    funnel_area: 'commercial',
                    page_type: 'report',
                  },
                });
              }

              window.print();
            }}
            className="bg-green-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-green-800"
          >
            Print or save as PDF
          </button>

          <Link
            href="/results"
            className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            Back to results
          </Link>

          {!isResidential && (
            <TrackedCtaLink
              href="/check?mode=commercial"
              className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
              eventName="report_run_another_check_clicked"
              pagePath="/report"
              ctaLabel="Run another commercial check"
              pageType="report"
            >
              Run another commercial check
            </TrackedCtaLink>
          )}
        </div>
      </div>

      <article className="report-page bg-white border border-stone-200 rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.08)] p-8">
        <header className="border-b border-stone-200 pb-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-green-700 font-semibold mb-2">
                YieldLens UK
              </p>

              <h2 className="text-3xl font-bold text-stone-900 mb-3">
                {isResidential ? 'Residential viability file' : 'Commercial viability file'}
              </h2>

              <div className="space-y-1 text-sm text-stone-500">
                <p>
                  {getAddress(submission)} | {getLocation(submission)}
                </p>

                <p>
                  Generated {formatDate(submission.createdAt)}
                </p>
              </div>

              {!isResidential && (
                <p className="text-xs text-stone-500 leading-5 mt-4 max-w-2xl">
                  YieldLens UK provides indicative decision-support only. It is
                  based on submitted inputs and current assumptions where live
                  data is unavailable. Use this as an initial viability file
                  before deeper due diligence.
                </p>
              )}
            </div>

            <div className="border border-stone-200 rounded-2xl p-5 min-w-[220px] bg-stone-50 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                Indicative score
              </p>

              <p className="text-4xl font-bold text-stone-900 mt-1">
                {submission.score}
                <span className="text-xl text-stone-400">/100</span>
              </p>

              <p className="text-sm font-semibold text-green-700 mt-2">
                {displayedVerdictLabel}
              </p>
            </div>
          </div>
        </header>

        {isResidential ? (
          <>
            <section className="mb-8">
              <h3 className="text-lg font-bold text-stone-900 mb-4">
                Executive summary
              </h3>

              <p className="text-sm text-stone-700 leading-7 max-w-4xl">
                {getExecutiveSummary(submission)}
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold text-stone-900 mb-4">
                Property snapshot
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Address</p>
                  <p className="font-semibold text-stone-900 mt-1">{getAddress(submission)}</p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Postcode</p>
                  <p className="font-semibold text-stone-900 mt-1">{getLocation(submission)}</p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Use case</p>
                  <p className="font-semibold text-stone-900 mt-1">{getPropertyUse(submission)}</p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Email</p>
                  <p className="font-semibold text-stone-900 mt-1 break-words">{getEmail(submission)}</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold text-stone-900 mb-4">
                Key numbers
              </h3>

              <ResidentialReportMetrics result={result as ResidentialResult} />
            </section>

            <section className="mb-8">
              <ScenarioPanel submission={submission} />
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold text-stone-900 mb-4">
                Risk flags
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {result.riskFlags.map((flag) => (
                  <RiskBadge key={`${flag.severity}-${flag.message}`} flag={flag} />
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-bold text-stone-900 mb-4">
                Assumptions used
              </h3>

              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm text-stone-700">
                {result.assumptions.map((assumption) => (
                  <li key={assumption} className="bg-stone-50 border border-stone-200 rounded-2xl p-3 shadow-sm">
                    {assumption}
                  </li>
                ))}
              </ul>
            </section>

            {result.missingDataWarnings.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-stone-900 mb-4">
                  Missing data warnings
                </h3>

                <ul className="space-y-2 text-sm text-yellow-800">
                  {result.missingDataWarnings.map((warning) => (
                    <li key={warning} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 shadow-sm">
                      {warning}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mb-8">
              <h3 className="text-lg font-bold text-stone-900 mb-4">
                Recommended next steps
              </h3>

              <ol className="space-y-2 text-sm text-stone-700 list-decimal list-inside">
                {result.nextSteps.map((step) => (
                  <li key={step} className="bg-white border border-stone-200 rounded-2xl p-3 shadow-sm">
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          </>
        ) : (
          <CommercialReportBody submission={submission} />
        )}

        <footer className="border-t border-stone-200 pt-5 text-xs text-stone-500 leading-6">
          <p className="font-semibold text-stone-700 mb-2">
            Important disclaimer
          </p>

        <p>
          YieldLens UK provides indicative decision-support only. It is not financial
          advice, legal advice, tax advice, a valuation, or a substitute for professional
          due diligence.
        </p>

        <p className="mt-2">
          YieldLens UK is an independent UK property decision-support tool. Figures are based
          on user-provided inputs and current indicative assumptions where live data is unavailable.
        </p>
        </footer>
      </article>
    </div>
  );
}
