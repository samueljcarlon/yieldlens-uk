'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type {
  CommercialResult,
  ResidentialResult,
  RiskFlag,
  Submission,
} from '@/types/property';
import { getLatestSubmission } from '@/lib/storage';

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

  if (score >= 80) {
    return `This commercial site screens as a strong candidate on the current assumptions. Estimated break-even is ${formatNumber(result.breakEvenCustomersPerDay)} customers per day against an assumed ${result.expectedCustomersPerDay} customers per day.`;
  }

  if (score >= 65) {
    return `This commercial site appears worth investigating. Estimated break-even is ${formatNumber(result.breakEvenCustomersPerDay)} customers per day, but the rent burden and operating cost assumptions still need careful checking.`;
  }

  if (score >= 50) {
    return `This commercial site screens as marginal. It may be viable, but the rent burden, customer assumptions, and operating costs need stress-testing before any lease commitment.`;
  }

  return `This commercial site screens as weak on the current assumptions. It may require stronger footfall, lower rent, lower costs, or a different business model to become viable.`;
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
        {flag.severity === 'info' ? 'Note' : flag.severity}
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

function CommercialReportMetrics({ result }: { result: CommercialResult }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <ReportMetric label="Monthly revenue" value={formatCurrency(result.estimatedMonthlyRevenue)} helper="Spend × customers × days" />
      <ReportMetric label="Monthly rent" value={formatCurrency(result.monthlyRent)} helper="Annual rent ÷ 12" />
      <ReportMetric label="Rent burden" value={formatPercent(result.rentBurdenPercentage)} helper="Rent as % of revenue" />
      <ReportMetric label="Cost base" value={formatCurrency(result.estimatedMonthlyCostBase)} helper="Rent + known costs" />
      <ReportMetric label="Break-even/day" value={formatNumber(result.breakEvenCustomersPerDay)} helper={`Assumed ${result.expectedCustomersPerDay} per day`} />
    </div>
  );
}

export default function ReportPage() {
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    setSubmission(getLatestSubmission());
  }, []);

  if (!submission) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-stone-900 mb-3">
            No report available
          </h1>

          <p className="text-sm text-stone-500 mb-6">
            Run a property check first, then the printable report preview will appear here.
          </p>

          <Link
            href="/check"
            className="inline-block bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            Start a property check
          </Link>
        </div>
      </div>
    );
  }

  const isResidential = submission.mode === 'residential';
  const result = submission.result;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="print-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-1">
            Printable report preview
          </p>
          <h1 className="text-2xl font-bold text-stone-900">
            YieldLens UK report
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            Print or save as PDF
          </button>

          <Link
            href="/results"
            className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400"
          >
            Back to results
          </Link>
        </div>
      </div>

      <article className="report-page bg-white border border-stone-200 rounded-xl shadow-sm p-8">
        <header className="border-b border-stone-200 pb-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2">
                YieldLens UK
              </p>

              <h2 className="text-3xl font-bold text-stone-900 mb-3">
                {isResidential ? 'Residential return report' : 'Commercial site report'}
              </h2>

              <p className="text-sm text-stone-500">
                Generated {formatDate(submission.createdAt)}
              </p>
            </div>

            <div className="border border-stone-200 rounded-xl p-5 min-w-[220px] bg-stone-50">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">
                Indicative score
              </p>

              <p className="text-4xl font-bold text-stone-900 mt-1">
                {submission.score}
                <span className="text-xl text-stone-400">/100</span>
              </p>

              <p className="text-sm font-semibold text-teal-700 mt-2">
                {submission.verdict.label}
              </p>
            </div>
          </div>
        </header>

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
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Address</p>
              <p className="font-semibold text-stone-900 mt-1">{getAddress(submission)}</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Postcode</p>
              <p className="font-semibold text-stone-900 mt-1">{getLocation(submission)}</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Use case</p>
              <p className="font-semibold text-stone-900 mt-1">{getPropertyUse(submission)}</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Email</p>
              <p className="font-semibold text-stone-900 mt-1 break-words">{getEmail(submission)}</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold text-stone-900 mb-4">
            Key numbers
          </h3>

          {isResidential ? (
            <ResidentialReportMetrics result={result as ResidentialResult} />
          ) : (
            <CommercialReportMetrics result={result as CommercialResult} />
          )}
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
              <li key={assumption} className="bg-stone-50 border border-stone-200 rounded-lg p-3">
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
                <li key={warning} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
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
              <li key={step} className="bg-white border border-stone-200 rounded-lg p-3">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <footer className="border-t border-stone-200 pt-5 text-xs text-stone-500 leading-6">
          <p>
            YieldLens UK provides indicative property return checks and decision-support
            analysis only. It is not a formal valuation, financial advice, mortgage
            advice, legal advice, tax advice, or a substitute for professional due diligence.
          </p>

          <p className="mt-2">
            YieldLens UK is an independent UK property analysis tool. Figures are based
            on user-provided inputs and MVP placeholder assumptions where live data is not yet connected.
          </p>
        </footer>
      </article>
    </div>
  );
}
