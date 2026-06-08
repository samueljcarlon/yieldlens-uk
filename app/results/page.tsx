'use client';

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
            href="/check"
            className="inline-block bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            Start a free property check
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

      <div className="mb-8">
        <ScoreCard verdict={submission.verdict} />
      </div>

      {isResidential ? (
        <ResidentialMetrics result={result as ResidentialResult} />
      ) : (
        <CommercialMetrics result={result as CommercialResult} />
      )}

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
          Full report coming soon
        </p>

        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Want a deeper PDF report for this property?
        </h2>

        <p className="text-sm text-stone-700 leading-6 max-w-3xl">
          Your check has been saved. The next product step is a fuller report with
          a cleaner property snapshot, downside cases, assumptions, and a more detailed
          verdict. Launch users will get early access before paid reports go live.
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
            href="/check"
            className="bg-white text-stone-700 border border-stone-300 px-5 py-2.5 rounded text-sm font-medium hover:border-stone-400 text-center"
          >
            Run another check
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-stone-100 border border-stone-200 rounded-xl p-5 text-sm text-stone-600">
        <p className="font-semibold text-stone-800 mb-2">Important disclaimer</p>

        <p>
          YieldLens UK provides indicative property return checks and decision-support
          analysis only. It is not a formal valuation, financial advice, mortgage
          advice, legal advice, tax advice, or a substitute for professional due diligence.
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
  );
}
