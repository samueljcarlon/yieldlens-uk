'use client';

import { useMemo, useState } from 'react';
import { logToolEvent } from '@/lib/logToolEvent';

type VerdictTone = 'positive' | 'warning' | 'danger' | 'neutral';

interface Verdict {
  label: string;
  tone: VerdictTone;
  summary: string;
}

interface FormState {
  purchasePrice: string;
  monthlyRent: string;
  mortgageMonthlyCost: string;
  serviceChargeAnnual: string;
  groundRentAnnual: string;
  insuranceMonthly: string;
  maintenanceMonthly: string;
  managementFeePercent: string;
  otherMonthlyCosts: string;
  voidMonthsPerYear: string;
}

function parseMoney(value: string): number {
  const parsed = parseFloat((value || '').replace(/,/g, ''));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return 'Not available';
  return `${value.toFixed(1)}%`;
}

function getVerdict({
  hasRequiredInputs,
  monthlyCashFlow,
  cashFlowMargin,
}: {
  hasRequiredInputs: boolean;
  monthlyCashFlow: number;
  cashFlowMargin: number;
}): Verdict {
  if (!hasRequiredInputs) {
    return {
      label: 'Enter rent and costs',
      tone: 'neutral',
      summary:
        'Add monthly rent and known costs to estimate property cash flow.',
    };
  }

  if (monthlyCashFlow >= 300 && cashFlowMargin >= 15) {
    return {
      label: 'Strong cash flow',
      tone: 'positive',
      summary:
        'The property appears to have a reasonable monthly buffer on these inputs. Still check rent evidence, repairs, void periods, and financing assumptions.',
    };
  }

  if (monthlyCashFlow >= 100) {
    return {
      label: 'Workable',
      tone: 'warning',
      summary:
        'The property may be workable, but the buffer is not huge. Check whether the result survives repairs, voids, higher costs, or lower rent.',
    };
  }

  if (monthlyCashFlow >= 0) {
    return {
      label: 'Thin buffer',
      tone: 'warning',
      summary:
        'The property is just about positive on these inputs, but small changes in rent, mortgage cost, service charge, repairs, or void periods could wipe out the return.',
    };
  }

  return {
    label: 'Negative cash flow',
    tone: 'danger',
    summary:
      'The property appears to lose money each month on these inputs. It may need lower costs, higher rent, a lower purchase price, or a different strategy.',
  };
}

function MetricBox({
  label,
  value,
  helper,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  helper: string;
  tone?: VerdictTone;
}) {
  const toneClass = {
    positive: 'bg-green-50 border-green-200',
    warning: 'bg-orange-50 border-orange-200',
    danger: 'bg-red-50 border-red-200',
    neutral: 'bg-white border-stone-200',
  }[tone];

  return (
    <div className={`border rounded-xl p-4 ${toneClass}`}>
      <p className="text-xs uppercase tracking-wide text-stone-500 font-medium mb-1">
        {label}
      </p>

      <p className="text-2xl font-bold text-stone-900">
        {value}
      </p>

      <p className="text-xs text-stone-600 mt-2 leading-5">
        {helper}
      </p>
    </div>
  );
}

export default function PropertyCashFlowTool() {
  const [form, setForm] = useState<FormState>({
    purchasePrice: '',
    monthlyRent: '',
    mortgageMonthlyCost: '',
    serviceChargeAnnual: '',
    groundRentAnnual: '',
    insuranceMonthly: '',
    maintenanceMonthly: '',
    managementFeePercent: '',
    otherMonthlyCosts: '',
    voidMonthsPerYear: '1',
  });

  const [eventLogged, setEventLogged] = useState(false);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const result = useMemo(() => {
    const purchasePrice = parseMoney(form.purchasePrice);
    const monthlyRent = parseMoney(form.monthlyRent);
    const mortgageMonthlyCost = parseMoney(form.mortgageMonthlyCost);
    const serviceChargeMonthly = parseMoney(form.serviceChargeAnnual) / 12;
    const groundRentMonthly = parseMoney(form.groundRentAnnual) / 12;
    const insuranceMonthly = parseMoney(form.insuranceMonthly);
    const maintenanceMonthly = parseMoney(form.maintenanceMonthly);
    const managementFeePercent = parseMoney(form.managementFeePercent);
    const otherMonthlyCosts = parseMoney(form.otherMonthlyCosts);
    const voidMonthsPerYear = parseMoney(form.voidMonthsPerYear);

    const managementFeeMonthly = monthlyRent * (managementFeePercent / 100);
    const voidAllowanceMonthly = (monthlyRent * voidMonthsPerYear) / 12;

    const fixedMonthlyCosts =
      mortgageMonthlyCost +
      serviceChargeMonthly +
      groundRentMonthly +
      insuranceMonthly +
      maintenanceMonthly +
      otherMonthlyCosts;

    const variableCostRate =
      managementFeePercent / 100 + voidMonthsPerYear / 12;

    const totalMonthlyCosts =
      fixedMonthlyCosts +
      managementFeeMonthly +
      voidAllowanceMonthly;

    const monthlyCashFlow = monthlyRent - totalMonthlyCosts;

    const breakEvenRent =
      variableCostRate < 1 ? fixedMonthlyCosts / (1 - variableCostRate) : 0;

    const rentFor200Buffer =
      variableCostRate < 1 ? (fixedMonthlyCosts + 200) / (1 - variableCostRate) : 0;

    const rentFor300Buffer =
      variableCostRate < 1 ? (fixedMonthlyCosts + 300) / (1 - variableCostRate) : 0;

    const costToRentRatio =
      monthlyRent > 0 ? (totalMonthlyCosts / monthlyRent) * 100 : 0;
    const annualCashFlow = monthlyCashFlow * 12;
    const annualRent = monthlyRent * 12;

    const grossYield =
      purchasePrice > 0 ? (annualRent / purchasePrice) * 100 : 0;

    const cashFlowMargin =
      monthlyRent > 0 ? (monthlyCashFlow / monthlyRent) * 100 : 0;

    const hasRequiredInputs = monthlyRent > 0;

    const verdict = getVerdict({
      hasRequiredInputs,
      monthlyCashFlow,
      cashFlowMargin,
    });

    const riskFlags: string[] = [];

    if (!hasRequiredInputs) {
      riskFlags.push('Monthly rent is needed before cash flow can be estimated.');
    }

    if (purchasePrice === 0) {
      riskFlags.push('Purchase price is missing, so gross yield cannot be calculated.');
    }

    if (mortgageMonthlyCost === 0) {
      riskFlags.push('Mortgage cost is missing. Add it if the property is financed.');
    }

    if (voidMonthsPerYear === 0) {
      riskFlags.push('No void period allowance has been included.');
    }

    if (monthlyCashFlow < 0 && hasRequiredInputs) {
      riskFlags.push(`Estimated monthly cash flow is negative. The rent would need to be around ${formatCurrency(breakEvenRent)} just to break even on this cost structure.`);
      riskFlags.push(`Known monthly costs exceed rent by ${formatCurrency(Math.abs(monthlyCashFlow))}.`);
    } else if (monthlyCashFlow < 100 && hasRequiredInputs) {
      riskFlags.push('Monthly cash flow is very thin.');
    }

    if (monthlyRent > 0 && mortgageMonthlyCost / monthlyRent > 0.75) {
      riskFlags.push('Mortgage cost absorbs more than 75% of monthly rent.');
    }

    if (monthlyRent > 0 && costToRentRatio > 100) {
      riskFlags.push(`Total monthly costs are ${formatPercent(costToRentRatio)} of rent, so the property is loss-making before tax.`);
    } else if (monthlyRent > 0 && costToRentRatio > 90) {
      riskFlags.push(`Total monthly costs are ${formatPercent(costToRentRatio)} of rent, leaving a very limited buffer.`);
    }

    if (variableCostRate > 0.2) {
      riskFlags.push('Management fees and void allowance take more than 20% of rent before fixed costs are considered.');
    }

    if (serviceChargeMonthly === 0 && groundRentMonthly === 0) {
      riskFlags.push('Service charge and ground rent are missing or set to zero.');
    }

    return {
      purchasePrice,
      monthlyRent,
      mortgageMonthlyCost,
      serviceChargeMonthly,
      groundRentMonthly,
      insuranceMonthly,
      maintenanceMonthly,
      managementFeeMonthly,
      otherMonthlyCosts,
      voidAllowanceMonthly,
      fixedMonthlyCosts,
      variableCostRate,
      totalMonthlyCosts,
      monthlyCashFlow,
      annualCashFlow,
      annualRent,
      grossYield,
      cashFlowMargin,
      breakEvenRent,
      rentFor200Buffer,
      rentFor300Buffer,
      costToRentRatio,
      verdict,
      riskFlags,
      hasRequiredInputs,
    };
  }, [form]);

  function handleCalculateCashFlow() {
    if (!result.hasRequiredInputs) return;

    const cashFlowBand =
      result.monthlyCashFlow < 0 ? 'negative'
      : result.monthlyCashFlow < 100 ? '0_to_100'
      : result.monthlyCashFlow < 300 ? '100_to_300'
      : 'over_300';

    const yieldBand =
      result.purchasePrice <= 0 ? 'missing'
      : result.grossYield < 4 ? 'under_4'
      : result.grossYield < 6 ? '4_to_6'
      : result.grossYield < 8 ? '6_to_8'
      : 'over_8';

    const costToRentBand =
      result.costToRentRatio < 75 ? 'under_75'
      : result.costToRentRatio < 90 ? '75_to_90'
      : result.costToRentRatio < 100 ? '90_to_100'
      : 'over_100';

    const resultBand = result.verdict.label.toLowerCase().replace(/\s+/g, '_');

    logToolEvent({
      event_name: 'property_cash_flow_calculated',
      page_path: '/property-cash-flow-calculator',
      tool_name: 'property_cash_flow',
      result_label: result.verdict.label,
      result_band: resultBand,
      metadata: {
        cashFlowBand,
        yieldBand,
        costToRentBand,
        hasMortgage: parseMoney(form.mortgageMonthlyCost) > 0,
        hasVoidAllowance: parseMoney(form.voidMonthsPerYear) > 0,
        hasServiceCharge: parseMoney(form.serviceChargeAnnual) > 0,
      },
    });

    setEventLogged(true);
    setTimeout(() => setEventLogged(false), 3000);
  }

  const inputClass =
    'w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500';

  const verdictClass = {
    positive: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-orange-50 border-orange-200 text-orange-900',
    danger: 'bg-red-50 border-red-200 text-red-900',
    neutral: 'bg-stone-50 border-stone-200 text-stone-900',
  }[result.verdict.tone];

  const cashFlowTone =
    result.monthlyCashFlow >= 300
      ? 'positive'
      : result.monthlyCashFlow >= 0
        ? 'warning'
        : 'danger';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-2">
          Property cash flow calculator
        </p>

        <h2 className="text-2xl font-bold text-stone-900 mb-3">
          Enter the rental property numbers
        </h2>

        <p className="text-sm text-stone-500 mb-6 leading-6">
          Use monthly rent and regular costs to estimate whether the property
          produces real cash flow after mortgage cost, service charge, ground rent,
          management, maintenance, and void allowance.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Purchase price (£)
            </label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              placeholder="e.g. 500000"
              value={form.purchasePrice}
              onChange={(event) => updateField('purchasePrice', event.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Monthly rent (£)
            </label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              placeholder="e.g. 2200"
              value={form.monthlyRent}
              onChange={(event) => updateField('monthlyRent', event.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Mortgage monthly cost (£)
            </label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              placeholder="e.g. 1800"
              value={form.mortgageMonthlyCost}
              onChange={(event) => updateField('mortgageMonthlyCost', event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Service charge annual (£)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                placeholder="e.g. 2400"
                value={form.serviceChargeAnnual}
                onChange={(event) => updateField('serviceChargeAnnual', event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Ground rent annual (£)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                placeholder="e.g. 250"
                value={form.groundRentAnnual}
                onChange={(event) => updateField('groundRentAnnual', event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Insurance monthly (£)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                placeholder="e.g. 30"
                value={form.insuranceMonthly}
                onChange={(event) => updateField('insuranceMonthly', event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Maintenance monthly (£)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                placeholder="e.g. 100"
                value={form.maintenanceMonthly}
                onChange={(event) => updateField('maintenanceMonthly', event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Management fee (%)
              </label>
              <input
                type="text"
                inputMode="decimal"
                className={inputClass}
                placeholder="e.g. 10"
                value={form.managementFeePercent}
                onChange={(event) => updateField('managementFeePercent', event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Void months per year
              </label>
              <input
                type="text"
                inputMode="decimal"
                className={inputClass}
                placeholder="e.g. 1"
                value={form.voidMonthsPerYear}
                onChange={(event) => updateField('voidMonthsPerYear', event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Other monthly costs (£)
            </label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              placeholder="e.g. 150"
              value={form.otherMonthlyCosts}
              onChange={(event) => updateField('otherMonthlyCosts', event.target.value)}
            />
          </div>
        </div>

        <p className="text-xs text-stone-400 mt-5 leading-5">
          This calculator does not store these cash flow inputs. It is an
          indicative property screen, not financial advice.
        </p>
      </div>

      <div className="lg:col-span-3 space-y-5">
        <div className={`border rounded-xl p-6 ${verdictClass}`}>
          <p className="text-xs uppercase tracking-widest font-medium mb-2">
            Cash flow verdict
          </p>

          <h3 className="text-3xl font-bold mb-3">
            {result.verdict.label}
          </h3>

          <p className="text-sm leading-6">
            {result.verdict.summary}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={handleCalculateCashFlow}
              disabled={!result.hasRequiredInputs}
              className="bg-green-700 text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Calculate cash flow
            </button>

            {eventLogged && (
              <span className="text-xs text-green-700 font-medium">
                Calculation logged
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricBox
            label="Monthly cash flow"
            value={
              result.hasRequiredInputs
                ? formatCurrency(result.monthlyCashFlow)
                : 'Not available'
            }
            helper="Monthly rent minus mortgage and known regular costs."
            tone={cashFlowTone}
          />

          <MetricBox
            label="Annual cash flow"
            value={
              result.hasRequiredInputs
                ? formatCurrency(result.annualCashFlow)
                : 'Not available'
            }
            helper="Estimated monthly cash flow multiplied by 12."
            tone={cashFlowTone}
          />

          <MetricBox
            label="Gross yield"
            value={
              result.purchasePrice > 0 && result.hasRequiredInputs
                ? formatPercent(result.grossYield)
                : 'Not available'
            }
            helper="Annual rent as a percentage of purchase price."
          />

          <MetricBox
            label="Cash flow margin"
            value={
              result.hasRequiredInputs
                ? formatPercent(result.cashFlowMargin)
                : 'Not available'
            }
            helper="Monthly cash flow as a percentage of monthly rent."
            tone={cashFlowTone}
          />
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <p className="font-semibold text-stone-900 mb-4">
            Rent needed to make the numbers work
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricBox
              label="Break-even rent"
              value={
                result.hasRequiredInputs
                  ? formatCurrency(result.breakEvenRent)
                  : 'Not available'
              }
              helper="Estimated rent needed to cover current fixed and variable costs."
              tone={result.monthlyCashFlow >= 0 ? 'positive' : 'danger'}
            />

            <MetricBox
              label="£200 buffer rent"
              value={
                result.hasRequiredInputs
                  ? formatCurrency(result.rentFor200Buffer)
                  : 'Not available'
              }
              helper="Estimated rent needed for roughly £200 monthly cash flow."
              tone="warning"
            />

            <MetricBox
              label="£300 buffer rent"
              value={
                result.hasRequiredInputs
                  ? formatCurrency(result.rentFor300Buffer)
                  : 'Not available'
              }
              helper="Estimated rent needed for roughly £300 monthly cash flow."
              tone="positive"
            />
          </div>

          <p className="text-xs text-stone-500 mt-4 leading-5">
            These figures adjust for variable costs such as management fees and void allowance,
            so they are more useful than simply adding the cash flow shortfall to the rent.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <p className="font-semibold text-stone-900 mb-4">
            Monthly cost breakdown
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Mortgage</span>
              <span className="font-medium text-stone-900">
                {formatCurrency(result.mortgageMonthlyCost)}
              </span>
            </div>

            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Service charge</span>
              <span className="font-medium text-stone-900">
                {formatCurrency(result.serviceChargeMonthly)}
              </span>
            </div>

            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Ground rent</span>
              <span className="font-medium text-stone-900">
                {formatCurrency(result.groundRentMonthly)}
              </span>
            </div>

            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Insurance</span>
              <span className="font-medium text-stone-900">
                {formatCurrency(result.insuranceMonthly)}
              </span>
            </div>

            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Maintenance</span>
              <span className="font-medium text-stone-900">
                {formatCurrency(result.maintenanceMonthly)}
              </span>
            </div>

            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Management fee</span>
              <span className="font-medium text-stone-900">
                {formatCurrency(result.managementFeeMonthly)}
              </span>
            </div>

            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Void allowance</span>
              <span className="font-medium text-stone-900">
                {formatCurrency(result.voidAllowanceMonthly)}
              </span>
            </div>

            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Other costs</span>
              <span className="font-medium text-stone-900">
                {formatCurrency(result.otherMonthlyCosts)}
              </span>
            </div>
          </div>

          <div className="mt-5 bg-stone-50 border border-stone-200 rounded-lg p-4 flex justify-between text-sm">
            <span className="font-semibold text-stone-900">Total monthly costs</span>
            <span className="font-bold text-stone-900">
              {formatCurrency(result.totalMonthlyCosts)}
            </span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <p className="font-semibold text-stone-900 mb-3">
            Risk flags
          </p>

          <ul className="space-y-2 text-sm text-stone-700">
            {result.riskFlags.map((flag) => (
              <li key={flag} className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                {flag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
