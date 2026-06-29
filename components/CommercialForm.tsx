'use client';

import { useState } from 'react';
import type { CommercialInput } from '@/types/property';

interface Props {
  onSubmit: (input: CommercialInput) => void;
}

function parseNum(val: string): number | undefined {
  const n = parseFloat((val || '').replace(/,/g, ''));
  return Number.isNaN(n) ? undefined : n;
}

function requireNum(val: string): number {
  const n = parseFloat((val || '').replace(/,/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function FormSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-green-700 font-semibold mb-2">
          {eyebrow}
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-stone-950">
          {title}
        </h2>

        <p className="text-sm text-stone-600 leading-6 mt-2 max-w-3xl">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </section>
  );
}

function FieldBlock({
  label,
  required,
  optional,
  helper,
  error,
  children,
  className = '',
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-stone-800 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
        {optional && <span className="text-stone-400"> (optional)</span>}
      </label>

      {helper && (
        <p className="text-xs text-stone-500 mb-1 leading-5">
          {helper}
        </p>
      )}

      {children}

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function CommercialForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sectionSteps = [
    'Site and rent',
    'Revenue assumptions',
    'Monthly operating costs',
    'Opening cash and setup costs',
    'Downside case',
  ];

  const set = (key: string, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const field = (key: string) => ({
    value: form[key] ?? '',
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      set(key, event.target.value),
  });

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!form.annualRent || Number.isNaN(parseFloat(form.annualRent))) {
      nextErrors.annualRent = 'Annual rent is required.';
    }

    if (!form.averageSpendPerCustomer || Number.isNaN(parseFloat(form.averageSpendPerCustomer))) {
      nextErrors.averageSpendPerCustomer = 'Average spend per customer is required.';
    }

    if (!form.expectedCustomersPerDay || Number.isNaN(parseFloat(form.expectedCustomersPerDay))) {
      nextErrors.expectedCustomersPerDay = 'Expected customers per day is required.';
    }

    if (!form.openingDaysPerMonth || Number.isNaN(parseFloat(form.openingDaysPerMonth))) {
      nextErrors.openingDaysPerMonth = 'Opening days per month is required.';
    }

    if (!form.email || !isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email to save your check.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) return;

    const input: CommercialInput = {
      address: form.address || undefined,
      postcode: form.postcode || undefined,
      listingUrl: form.listingUrl || undefined,
      businessType: form.businessType || undefined,
      annualRent: requireNum(form.annualRent ?? ''),
      averageSpendPerCustomer: requireNum(form.averageSpendPerCustomer ?? ''),
      expectedCustomersPerDay: requireNum(form.expectedCustomersPerDay ?? ''),
      openingDaysPerMonth: requireNum(form.openingDaysPerMonth ?? ''),
      monthlyStaffCosts: parseNum(form.monthlyStaffCosts ?? ''),
      monthlyUtilitiesAndOtherCosts: parseNum(form.monthlyUtilitiesAndOtherCosts ?? ''),
      monthlyBusinessRates: parseNum(form.monthlyBusinessRates ?? ''),
      fitOutBudget: parseNum(form.fitOutBudget ?? ''),
      rentDeposit: parseNum(form.rentDeposit ?? ''),
      legalFees: parseNum(form.legalFees ?? ''),
      openingStock: parseNum(form.openingStock ?? ''),
      otherSetupCosts: parseNum(form.otherSetupCosts ?? ''),
      startingCash: parseNum(form.startingCash ?? ''),
      downsideRevenuePercentage: parseNum(form.downsideRevenuePercentage ?? ''),
      email: form.email,
    };

    onSubmit(input);
  };

  const inputClass =
    'w-full min-h-[48px] border border-stone-300 rounded-lg px-3 py-3 text-[16px] leading-6 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white shadow-sm';

  const errorInputClass =
    'w-full min-h-[48px] border border-red-400 rounded-lg px-3 py-3 text-[16px] leading-6 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white shadow-sm';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6 shadow-sm">
        <p className="text-sm font-semibold text-green-950 mb-2">
          Commercial lease pressure-test
        </p>

        <p className="text-sm text-green-900 leading-6">
          Enter cautious assumptions you have today. You can rerun the check with
          different rent, revenue, and cost scenarios to see how the lease pressure
          changes.
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-[11px] uppercase tracking-[0.2em] text-green-800">
          {sectionSteps.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-sm"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-700 text-[10px] font-semibold text-white">
                {index + 1}
              </span>
              <span className="leading-tight">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <FormSection
        eyebrow="Step 1"
        title="Site and rent"
        description="Start with the rent and basic site details so YieldLens can estimate the lease pressure."
      >
        <FieldBlock label="Address" optional>
          <input type="text" className={inputClass} placeholder="e.g. 22 High Street" {...field('address')} />
        </FieldBlock>

        <FieldBlock label="Postcode" optional>
          <input type="text" className={inputClass} placeholder="e.g. EC1A 1BB" {...field('postcode')} />
        </FieldBlock>

        <FieldBlock label="Listing URL" optional className="sm:col-span-2">
          <input type="url" className={inputClass} placeholder="https://rightmove.co.uk/..." {...field('listingUrl')} />
        </FieldBlock>

        <FieldBlock label="Business type" helper="Used to label the check and frame the commercial assumptions.">
          <select className={inputClass} {...field('businessType')}>
            <option value="">Select type</option>
            <option>Cafe</option>
            <option>Bar</option>
            <option>Restaurant</option>
            <option>Salon</option>
            <option>Gym</option>
            <option>Takeaway</option>
            <option>Retail</option>
            <option>Office/studio</option>
            <option>Other</option>
          </select>
        </FieldBlock>

        <FieldBlock
          label="Annual rent (£)"
          required
          helper="Use annual rent before VAT. If the lease is quoted monthly, multiply by 12 first."
          error={errors.annualRent}
        >
          <input type="text" inputMode="numeric" className={errors.annualRent ? errorInputClass : inputClass} placeholder="e.g. 60000" {...field('annualRent')} />
        </FieldBlock>
      </FormSection>

      <FormSection
        eyebrow="Step 2"
        title="Trading assumptions"
        description="These assumptions drive estimated revenue and break-even customers per day."
      >
        <FieldBlock
          label="Average spend per customer (£)"
          required
          helper="Typical transaction value, before any optimistic upside case."
          error={errors.averageSpendPerCustomer}
        >
          <input type="text" inputMode="numeric" className={errors.averageSpendPerCustomer ? errorInputClass : inputClass} placeholder="e.g. 12" {...field('averageSpendPerCustomer')} />
        </FieldBlock>

        <FieldBlock
          label="Expected customers per day"
          required
          helper="Use a realistic normal day, not a best-case launch week."
          error={errors.expectedCustomersPerDay}
        >
          <input type="text" inputMode="numeric" className={errors.expectedCustomersPerDay ? errorInputClass : inputClass} placeholder="e.g. 80" {...field('expectedCustomersPerDay')} />
        </FieldBlock>

        <FieldBlock
          label="Opening days per month"
          required
          helper="Count trading days only. For example, 26 if you trade six days per week."
          error={errors.openingDaysPerMonth}
        >
          <input type="text" inputMode="numeric" className={errors.openingDaysPerMonth ? errorInputClass : inputClass} placeholder="e.g. 26" {...field('openingDaysPerMonth')} />
        </FieldBlock>
      </FormSection>

      <FormSection
        eyebrow="Step 3"
        title="Monthly operating costs"
        description="These costs are used to estimate the monthly cost base and break-even point."
      >
        <FieldBlock
          label="Monthly staff costs (£)"
          optional
          helper="Include wages, employer costs, and regular contractor cover where known."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 7000" {...field('monthlyStaffCosts')} />
        </FieldBlock>

        <FieldBlock
          label="Monthly utilities, service charge, and other costs (£)"
          optional
          helper="Add utilities, insurance, software, licences, service charge, and routine costs."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 1200" {...field('monthlyUtilitiesAndOtherCosts')} />
        </FieldBlock>

        <FieldBlock
          label="Monthly business rates (£)"
          optional
          helper="Use the best monthly estimate you have, even if rates still need confirming."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 900" {...field('monthlyBusinessRates')} />
        </FieldBlock>
      </FormSection>

      <FormSection
        eyebrow="Step 4"
        title="Opening cash and setup costs"
        description="This checks whether the site can fund opening costs before trading begins."
      >
        <FieldBlock
          label="Fit-out budget (£)"
          optional
          helper="One-off cost before opening, including works, fixtures, equipment, and initial setup."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 50000" {...field('fitOutBudget')} />
        </FieldBlock>

        <FieldBlock
          label="Rent deposit (£)"
          optional
          helper="Include the cash deposit requested by the landlord or agent."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 15000" {...field('rentDeposit')} />
        </FieldBlock>

        <FieldBlock
          label="Legal and professional fees (£)"
          optional
          helper="Include solicitors, surveyors, licence checks, or other professional costs."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 3000" {...field('legalFees')} />
        </FieldBlock>

        <FieldBlock
          label="Opening stock (£)"
          optional
          helper="Stock, consumables, launch inventory, or first trading supplies."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 8000" {...field('openingStock')} />
        </FieldBlock>

        <FieldBlock
          label="Other setup costs (£)"
          optional
          helper="Anything else paid before opening, such as signage, deposits, or launch costs."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 5000" {...field('otherSetupCosts')} />
        </FieldBlock>

        <FieldBlock
          label="Available starting cash (£)"
          optional
          helper="Cash available before paying fit-out, deposit, fees, and setup costs."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 90000" {...field('startingCash')} />
        </FieldBlock>
      </FormSection>

      <FormSection
        eyebrow="Step 5"
        title="Downside case"
        description="Use this to test weak early trading, for example 60% of expected revenue."
      >
        <FieldBlock
          label="Downside revenue case (%)"
          optional
          helper="Leave blank to use the default 60% downside revenue assumption."
        >
          <input type="text" inputMode="numeric" className={inputClass} placeholder="60" {...field('downsideRevenuePercentage')} />
        </FieldBlock>
      </FormSection>

      <FormSection
        eyebrow="Save result"
        title="Where should we save this check?"
        description="Results are based on your assumptions. You can rerun the check with lower revenue or higher costs."
      >
        <FieldBlock
          label="Email"
          required
          helper="Required so your check can be saved and followed up."
          error={errors.email}
        >
          <input type="email" className={errors.email ? errorInputClass : inputClass} placeholder="you@example.com" {...field('email')} />
        </FieldBlock>
      </FormSection>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto min-h-[48px] bg-green-700 px-6 py-3.5 text-base font-semibold text-white transition-colors shadow-sm hover:bg-green-800"
        >
          Run commercial viability check
        </button>

        <p className="text-xs text-stone-500 leading-5 max-w-xl">
          Indicative decision-support only. The output depends on the assumptions
          you enter and should be checked before signing.
        </p>
      </div>
    </form>
  );
}
