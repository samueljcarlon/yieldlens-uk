import type { Submission } from '@/types/property';
import type { ResidentialResult, CommercialResult } from 
'@/types/property';
import VerdictBadge from './VerdictBadge';

const gbp = (n?: number) =>
  n !== undefined
    ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', 
maximumFractionDigits: 0 }).format(n)
    : '—';

const pct = (n?: number) => (n !== undefined ? `${n.toFixed(1)}%` : '—');
const num = (n?: number) => (n !== undefined ? n.toFixed(1) : '—');

export default function ReportPreview({ submission }: { submission: 
Submission }) {
  const { mode, input, result, verdict, createdAt } = submission;
  const isRes = mode === 'residential';
  const res = isRes ? (result as ResidentialResult) : undefined;
  const com = !isRes ? (result as CommercialResult) : undefined;
  const dateStr = new Date(createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="report-page max-w-2xl mx-auto bg-white p-8 border 
border-stone-200 rounded-xl space-y-8 text-sm text-stone-700">
      <div className="border-b border-stone-200 pb-6">
        <p className="text-xs text-stone-400 uppercase tracking-widest 
mb-2">YieldLens UK — Property Return Check</p>
        <h1 className="text-2xl font-bold text-stone-900 mb-1">
          {isRes ? 'Residential Return Check' : 'Commercial Site Check'}
        </h1>
        <p className="text-stone-400 text-xs">Generated {dateStr}</p>
      </div>

      <div>
        <h2 className="font-semibold text-stone-800 mb-3">Executive 
summary</h2>
        <div className="flex items-center gap-4 bg-stone-50 border 
border-stone-200 rounded-lg px-5 py-4">
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wide 
mb-1">Indicative score</p>
            <p className="text-4xl font-bold 
text-stone-900">{verdict.score}<span className="text-xl 
text-stone-400">/100</span></p>
          </div>
          <div>
            <VerdictBadge verdict={verdict} />
            <p className="text-xs text-stone-400 mt-2">Indicative estimate 
only</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-stone-800 mb-3">Property 
snapshot</h2>
        <table className="w-full text-sm">
          <tbody>
            {'address' in input && input.address && (
              <tr className="border-b border-stone-100">
                <td className="py-1.5 text-stone-500 pr-4">Address</td>
                <td className="py-1.5 font-medium">{input.address}</td>
              </tr>
            )}
            {'postcode' in input && input.postcode && (
              <tr className="border-b border-stone-100">
                <td className="py-1.5 text-stone-500 pr-4">Postcode</td>
                <td className="py-1.5 font-medium">{input.postcode}</td>
              </tr>
            )}
            {isRes && 'propertyType' in input && input.propertyType && (
              <tr className="border-b border-stone-100">
                <td className="py-1.5 text-stone-500 pr-4">Property 
type</td>
                <td className="py-1.5 
font-medium">{input.propertyType}</td>
              </tr>
            )}
            {!isRes && 'businessType' in input && input.businessType && (
              <tr className="border-b border-stone-100">
                <td className="py-1.5 text-stone-500 pr-4">Business 
type</td>
                <td className="py-1.5 
font-medium">{input.businessType}</td>
              </tr>
            )}
            <tr>
              <td className="py-1.5 text-stone-500 pr-4">Check type</td>
              <td className="py-1.5 font-medium">{isRes ? 'Residential' : 
'Commercial'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="font-semibold text-stone-800 mb-3">Key numbers</h2>
        <table className="w-full text-sm">
          <tbody>
            {isRes && res && (
              <>
                {res.grossYield !== undefined && (
                  <tr className="border-b border-stone-100">
                    <td className="py-1.5 text-stone-500 pr-4">Gross yield 
(indicative)</td>
                    <td className="py-1.5 
font-medium">{pct(res.grossYield)}</td>
                  </tr>
                )}
                {res.annualRentalIncome !== undefined && (
                  <tr className="border-b border-stone-100">
                    <td className="py-1.5 text-stone-500 pr-4">Annual 
rental income (est.)</td>
                    <td className="py-1.5 
font-medium">{gbp(res.annualRentalIncome)}</td>
                  </tr>
                )}
                {res.monthlyCashFlow !== undefined && (
                  <tr className="border-b border-stone-100">
                    <td className="py-1.5 text-stone-500 pr-4">Monthly 
cash flow (est.)</td>
                    <td className="py-1.5 
font-medium">{gbp(res.monthlyCashFlow)}</td>
                  </tr>
                )}
                {res.annualOwnershipCosts !== undefined && (
                  <tr>
                    <td className="py-1.5 text-stone-500 pr-4">Annual 
ownership costs (est.)</td>
                    <td className="py-1.5 
font-medium">{gbp(res.annualOwnershipCosts)}</td>
                  </tr>
                )}
              </>
            )}
            {!isRes && com && (
              <>
                {com.estimatedMonthlyRevenue !== undefined && (
                  <tr className="border-b border-stone-100">
                    <td className="py-1.5 text-stone-500 pr-4">Est. 
monthly revenue</td>
                    <td className="py-1.5 
font-medium">{gbp(com.estimatedMonthlyRevenue)}</td>
                  </tr>
                )}
                {com.monthlyRent !== undefined && (
                  <tr className="border-b border-stone-100">
                    <td className="py-1.5 text-stone-500 pr-4">Monthly 
rent</td>
                    <td className="py-1.5 
font-medium">{gbp(com.monthlyRent)}</td>
                  </tr>
                )}
                {com.rentBurdenPercentage !== undefined && (
                  <tr className="border-b border-stone-100">
                    <td className="py-1.5 text-stone-500 pr-4">Rent burden 
(est.)</td>
                    <td className="py-1.5 
font-medium">{pct(com.rentBurdenPercentage)}</td>
                  </tr>
                )}
                {com.breakEvenCustomersPerDay !== undefined && (
                  <tr>
                    <td className="py-1.5 text-stone-500 pr-4">Break-even 
customers/day (est.)</td>
                    <td className="py-1.5 
font-medium">{num(com.breakEvenCustomersPerDay)}</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {result.riskFlags.length > 0 && (
        <div>
          <h2 className="font-semibold text-stone-800 mb-3">Risk 
flags</h2>
          <ul className="space-y-1.5">
            {result.riskFlags.map((f, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="text-stone-400 shrink-0">–</span>
                <span className="text-stone-600">{f.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.assumptions.length > 0 && (
        <div>
          <h2 className="font-semibold text-stone-800 mb-3">Assumptions 
used</h2>
          <ul className="space-y-1 text-stone-500">
            {result.assumptions.map((a, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="shrink-0">–</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.missingDataWarnings.length > 0 && (
        <div>
          <h2 className="font-semibold text-stone-800 mb-3">Missing data 
warnings</h2>
          <ul className="space-y-1 text-orange-700">
            {result.missingDataWarnings.map((w, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="shrink-0">⚠</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.nextSteps.length > 0 && (
        <div>
          <h2 className="font-semibold text-stone-800 mb-3">Next 
steps</h2>
          <ol className="space-y-1.5 list-decimal list-inside 
text-stone-600">
            {result.nextSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="border-t border-stone-200 pt-5 text-xs 
text-stone-400 space-y-2">
        <p>
          YieldLens UK provides indicative property return checks and 
decision-support analysis only.
          It is not a formal valuation, financial advice, mortgage advice, 
legal advice, tax advice,
          or a substitute for professional due diligence.
        </p>
        <p>YieldLens UK is an independent UK property analysis 
tool.</p>
      </div>
    </div>
  );
}
