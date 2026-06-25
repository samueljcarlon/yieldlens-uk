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
  monthlyIncome: string;
  monthlyRent: string;
  bills: string;
  councilTax: string;
  transport: string;
  debtPayments: string;
  otherCosts: string;
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
  return `${value.toFixed(1)}%`;
}

function getVerdict({
  hasRequiredInputs,
  rentShare,
  housingShare,
  disposableIncome,
}: {
  hasRequiredInputs: boolean;
  rentShare: number;
  housingShare: number;
  disposableIncome: number;
}): Verdict {
  if (!hasRequiredInputs) {
    return {
      label: 'Enter income and rent',
      tone: 'neutral',
      summary: 'Add your monthly take-home income and monthly rent to see the affordability check.',
    };
  }

  if (disposableIncome < 0) {
    return {
      label: 'High risk',
      tone: 'danger',
      summary:
        'The rent looks high risk on these inputs because committed monthly costs exceed take-home income.',
    };
  }

  if (disposableIncome < 100) {
    return {
      label: 'High risk',
      tone: 'danger',
      summary:
        'The rent looks high risk on these inputs because the remaining monthly buffer is extremely thin.',
    };
  }

  if (rentShare > 40 || housingShare > 55) {
    return {
      label: 'High risk',
      tone: 'danger',
      summary:
        'The rent looks high risk because rent and core housing costs take a very large share of take-home income, even though some monthly buffer remains.',
    };
  }

  if (rentShare <= 30 && housingShare <= 40 && disposableIncome >= 500) {
    return {
      label: 'Comfortable',
      tone: 'positive',
      summary:
        'The rent looks manageable on these inputs, with a reasonable buffer after housing costs and regular commitments.',
    };
  }

  if (rentShare <= 35 && housingShare <= 45 && disposableIncome >= 250) {
    return {
      label: 'Manageable',
      tone: 'warning',
      summary:
        'The rent may be workable, but your buffer is not huge. Check bills, transport, deposits, and emergency savings carefully.',
    };
  }

  if (rentShare <= 40 && housingShare <= 55 && disposableIncome >= 100) {
    return {
      label: 'Stretched',
      tone: 'warning',
      summary:
        'This looks stretched. It may work, but rent and housing costs take a heavy share of income, so small cost increases could create pressure quickly.',
    };
  }

  return {
    label: 'High risk',
    tone: 'danger',
    summary:
      'The rent looks risky on these inputs. Check whether the monthly buffer is enough after bills, transport, debt, deposits, and irregular costs.',
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

export default function RentAffordabilityTool() {
  const [form, setForm] = useState<FormState>({
    monthlyIncome: '',
    monthlyRent: '',
    bills: '',
    councilTax: '',
    transport: '',
    debtPayments: '',
    otherCosts: '',
  });

  const [eventLogged, setEventLogged] = useState(false);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const result = useMemo(() => {
    const monthlyIncome = parseMoney(form.monthlyIncome);
    const monthlyRent = parseMoney(form.monthlyRent);
    const bills = parseMoney(form.bills);
    const councilTax = parseMoney(form.councilTax);
    const transport = parseMoney(form.transport);
    const debtPayments = parseMoney(form.debtPayments);
    const otherCosts = parseMoney(form.otherCosts);

    const totalHousingCosts = monthlyRent + bills + councilTax;
    const totalCommittedCosts =
      totalHousingCosts + transport + debtPayments + otherCosts;

    const disposableIncome = monthlyIncome - totalCommittedCosts;

    const hasRequiredInputs = monthlyIncome > 0 && monthlyRent > 0;

    const rentShare =
      monthlyIncome > 0 ? (monthlyRent / monthlyIncome) * 100 : 0;

    const housingShare =
      monthlyIncome > 0 ? (totalHousingCosts / monthlyIncome) * 100 : 0;

    const maxRent30 = monthlyIncome * 0.3;
    const maxRent35 = monthlyIncome * 0.35;
    const maxRent40 = monthlyIncome * 0.4;

    const verdict = getVerdict({
      hasRequiredInputs,
      rentShare,
      housingShare,
      disposableIncome,
    });

    return {
      monthlyIncome,
      monthlyRent,
      totalHousingCosts,
      totalCommittedCosts,
      disposableIncome,
      rentShare,
      housingShare,
      maxRent30,
      maxRent35,
      maxRent40,
      verdict,
      hasRequiredInputs,
    };
  }, [form]);

  function handleCheckAffordability() {
    if (!result.hasRequiredInputs) return;

    const rentShareBand =
      result.rentShare < 30 ? 'under_30'
      : result.rentShare < 35 ? '30_to_35'
      : result.rentShare < 40 ? '35_to_40'
      : 'over_40';

    const housingShareBand =
      result.housingShare < 40 ? 'under_40'
      : result.housingShare < 50 ? '40_to_50'
      : 'over_50';

    const disposableBand =
      result.disposableIncome < 0 ? 'negative'
      : result.disposableIncome < 100 ? 'under_100'
      : result.disposableIncome < 500 ? '100_to_500'
      : 'over_500';

    const resultBand = result.verdict.label.toLowerCase().replace(/\s+/g, '_');

    logToolEvent({
      event_name: 'rent_affordability_calculated',
      page_path: '/rent-affordability-check',
      tool_name: 'rent_affordability',
      result_label: result.verdict.label,
      result_band: resultBand,
      metadata: {
        rentShareBand,
        housingShareBand,
        disposableBand,
        hasBillsEntered: parseMoney(form.bills) > 0,
        hasDebtEntered: parseMoney(form.debtPayments) > 0,
        hasTransportEntered: parseMoney(form.transport) > 0,
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-2">
          Rent affordability calculator
        </p>

        <h2 className="text-2xl font-bold text-stone-900 mb-3">
          Enter your monthly numbers
        </h2>

        <p className="text-sm text-stone-500 mb-6 leading-6">
          Use monthly take-home income after tax. Add rent and regular costs to
          see whether the rent looks comfortable, manageable, stretched, or high risk.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Monthly take-home income (£)
            </label>
            <input
              type="text"
              inputMode="numeric"
              className={inputClass}
              placeholder="e.g. 2800"
              value={form.monthlyIncome}
              onChange={(event) => updateField('monthlyIncome', event.target.value)}
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
              placeholder="e.g. 1100"
              value={form.monthlyRent}
              onChange={(event) => updateField('monthlyRent', event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Bills and utilities (£)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                placeholder="e.g. 180"
                value={form.bills}
                onChange={(event) => updateField('bills', event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Council tax (£)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                placeholder="e.g. 120"
                value={form.councilTax}
                onChange={(event) => updateField('councilTax', event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Transport (£)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                placeholder="e.g. 160"
                value={form.transport}
                onChange={(event) => updateField('transport', event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Debt or commitments (£)
              </label>
              <input
                type="text"
                inputMode="numeric"
                className={inputClass}
                placeholder="e.g. 100"
                value={form.debtPayments}
                onChange={(event) => updateField('debtPayments', event.target.value)}
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
              placeholder="e.g. 250"
              value={form.otherCosts}
              onChange={(event) => updateField('otherCosts', event.target.value)}
            />
          </div>
        </div>

        <p className="text-xs text-stone-400 mt-5 leading-5">
          This calculator does not store these rent affordability inputs. It is an
          indicative affordability screen, not financial advice.
        </p>
      </div>

      <div className="lg:col-span-3 space-y-5">
        <div className={`border rounded-xl p-6 ${verdictClass}`}>
          <p className="text-xs uppercase tracking-widest font-medium mb-2">
            Affordability verdict
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
              onClick={handleCheckAffordability}
              disabled={!result.hasRequiredInputs}
              className="bg-green-700 text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check affordability
            </button>

            {eventLogged && (
              <span className="text-xs text-green-700 font-medium">
                Check calculated
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricBox
            label="Rent-to-income"
            value={
              result.hasRequiredInputs
                ? formatPercent(result.rentShare)
                : 'Not available'
            }
            helper="Monthly rent as a percentage of monthly take-home income."
            tone={
              result.rentShare <= 30
                ? 'positive'
                : result.rentShare <= 40
                  ? 'warning'
                  : 'danger'
            }
          />

          <MetricBox
            label="Housing cost ratio"
            value={
              result.hasRequiredInputs
                ? formatPercent(result.housingShare)
                : 'Not available'
            }
            helper="Rent, bills, and council tax as a percentage of take-home income."
            tone={
              result.housingShare <= 40
                ? 'positive'
                : result.housingShare <= 50
                  ? 'warning'
                  : 'danger'
            }
          />

          <MetricBox
            label="Disposable income"
            value={
              result.hasRequiredInputs
                ? formatCurrency(result.disposableIncome)
                : 'Not available'
            }
            helper="Income left after rent, bills, council tax, transport, debt, and other costs."
            tone={
              result.disposableIncome >= 500
                ? 'positive'
                : result.disposableIncome >= 100
                  ? 'warning'
                  : 'danger'
            }
          />

          <MetricBox
            label="Total committed costs"
            value={
              result.hasRequiredInputs
                ? formatCurrency(result.totalCommittedCosts)
                : 'Not available'
            }
            helper="Rent plus bills, council tax, transport, debt, and other entered costs."
          />
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <p className="font-semibold text-stone-900 mb-4">
            Rent range guide based on take-home income
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricBox
              label="Lower pressure"
              value={
                result.monthlyIncome > 0
                  ? formatCurrency(result.maxRent30)
                  : 'Not available'
              }
              helper="Around 30% of monthly take-home income."
              tone="positive"
            />

            <MetricBox
              label="Moderate pressure"
              value={
                result.monthlyIncome > 0
                  ? formatCurrency(result.maxRent35)
                  : 'Not available'
              }
              helper="Around 35% of monthly take-home income."
              tone="warning"
            />

            <MetricBox
              label="High pressure"
              value={
                result.monthlyIncome > 0
                  ? formatCurrency(result.maxRent40)
                  : 'Not available'
              }
              helper="Around 40% of monthly take-home income."
              tone="danger"
            />
          </div>

          <p className="text-xs text-stone-500 mt-4 leading-5">
            These are rough screening thresholds, not hard rules. A rent can still
            be risky if bills, transport, debt, deposits, or irregular income create pressure.
          </p>
        </div>
      </div>
    </div>
  );
}
