'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Submission, ResidentialResult, CommercialResult } from 
'@/types/property';
import { getLatestSubmission } from '@/lib/storage';
import ScoreCard from '@/components/ScoreCard';
import MetricCard from '@/components/MetricCard';
import RiskFlags from '@/components/RiskFlags';
import AssumptionsPanel from '@/components/AssumptionsPanel';

const gbp = (n?: number) =>
  n !== undefined
    ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', 
maximumFractionDigits: 0 }).format(n)
    : '—';

const pct = (n?: number) => (n !== undefined ? `${n.toFixed(1)}%` : '—');
const numFmt = (n?: number) => (n !== undefined ? n.toFixed(1) : '—');

export default function ResultsPage() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSubmission(getLatestSubmission());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!submission) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-400 text-lg mb-2">No results yet</p>
        <p className="text-stone-500 text-sm mb-6">Run a property check to 
see your results here.</p>
        <Link
          href="/check"
          className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm 
font-medium hover:bg-teal-800 transition-colors"
        >
          Start a property check
        </Link>
      </div>
    );
  }

  const { mode, result, verdict, input } = submission;
  const isRes = mode === 'residential';
  const res = isRes ? (result as ResidentialResult) : undefined;
  const com = !isRes ? (result as CommercialResult) : undefined;

  const dateStr = new 
Date(submission.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-medium uppercase tracking-widest 
text-teal-700 mb-1">
          {isRes ? 'Residential return check' : 'Commercial site check'}
        </p>
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Your 
indicative results</h1>
        <p className="text-stone-400 text-xs">{dateStr}</p>
        {'postcode' in input && input.postcode && (
          <p className="text-stone-600 text-sm mt-1">{input.postcode}</p>
        )}
        {'address' in input && input.address && (
          <p className="text-stone-600 text-sm">{input.address}</p>
        )}
      </div>

      {/* Score + metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
gap-4">
        <ScoreCard verdict={verdict} />

        {isRes && res && (
          <>
            {res.grossYield !== undefined && (
              <MetricCard label="Gross yield (indicative)" 
value={pct(res.grossYield)} sub="Based on purchase price and expected 
rent" highlight />
            )}
            {res.annualRentalIncome !== undefined && (
              <MetricCard label="Annual rental income (est.)" 
value={gbp(res.annualRentalIncome)} sub="Expected monthly rent × 12" />
            )}
            {res.monthlyCashFlow !== undefined && (
              <MetricCard
                label="Monthly cash flow (est.)"
                value={gbp(res.monthlyCashFlow)}
                sub="Rent minus known monthly costs"
                highlight={res.monthlyCashFlow >= 0}
              />
            )}
            {res.annualCashFlow !== undefined && (
              <MetricCard label="Annual cash flow (est.)" 
value={gbp(res.annualCashFlow)} sub="Monthly cash flow × 12" />
            )}
            {res.annualOwnershipCosts !== undefined && (
              <MetricCard label="Annual ownership costs (est.)" 
value={gbp(res.annualOwnershipCosts)} sub="Known monthly costs × 12" />
            )}
          </>
        )}

        {!isRes && com && (
          <>
            {com.estimatedMonthlyRevenue !== undefined && (
              <MetricCard label="Est. monthly revenue" 
value={gbp(com.estimatedMonthlyRevenue)} sub="Spend × customers × opening 
days" highlight />
            )}
            {com.monthlyRent !== undefined && (
              <MetricCard label="Monthly rent" 
value={gbp(com.monthlyRent)} sub="Annual rent ÷ 12" />
            )}
            {com.rentBurdenPercentage !== undefined && (
              <MetricCard
                label="Rent burden (est.)"
                value={pct(com.rentBurdenPercentage)}
                sub="Rent as % of estimated revenue"
                highlight={com.rentBurdenPercentage < 12}
              />
            )}
            {com.estimatedMonthlyCostBase !== undefined && (
              <MetricCard label="Est. monthly cost base" 
value={gbp(com.estimatedMonthlyCostBase)} sub="Rent + staff + utilities + 
rates" />
            )}
            {com.breakEvenCustomersPerDay !== undefined && (
              <MetricCard
                label="Break-even customers/day (est.)"
                value={numFmt(com.breakEvenCustomersPerDay)}
                sub={`You assumed ${com.expectedCustomersPerDay} per day`}
              />
            )}
          </>
        )}
      </div>

      {/* Risk flags */}
      {result.riskFlags.length > 0 && <RiskFlags flags={result.riskFlags} 
/>}

      {/* Assumptions */}
      <AssumptionsPanel
        assumptions={result.assumptions}
        missingDataWarnings={result.missingDataWarnings}
      />

      {/* Next steps */}
      {result.nextSteps.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-700 uppercase 
tracking-wide mb-3">Next steps</h3>
          <ol className="space-y-2">
            {result.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-stone-700">
                <span className="bg-teal-700 text-white rounded-full w-5 
h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          href="/report"
          className="bg-teal-700 text-white px-5 py-2.5 rounded text-sm 
font-medium hover:bg-teal-800 transition-colors text-center"
        >
          View printable report →
        </Link>
        <Link
          href="/check"
          className="bg-white text-stone-700 border border-stone-300 px-5 
py-2.5 rounded text-sm font-medium hover:border-stone-400 
transition-colors text-center"
        >
          Run another check
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-stone-200 pt-6 text-xs 
text-stone-400 space-y-2">
        <p>
          YieldLens UK provides indicative property return checks and 
decision-support analysis
          only. It is not a formal valuation, financial advice, mortgage 
advice, legal advice, tax
          advice, or a substitute for professional due diligence.
        </p>
        <p>YieldLens UK is an independent UK property analysis 
tool.</p>
      </div>
    </div>
  );
}
