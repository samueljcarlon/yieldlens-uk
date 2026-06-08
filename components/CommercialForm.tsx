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

export default function CommercialForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      email: form.email,
    };

    onSubmit(input);
  };

  const inputClass =
    'w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500';

  const errorInputClass =
    'w-full border border-red-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Address <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" className={inputClass} placeholder="e.g. 22 High Street" {...field('address')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Postcode <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" className={inputClass} placeholder="e.g. EC1A 1BB" {...field('postcode')} />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Listing URL <span className="text-stone-400">(optional)</span>
          </label>
          <input type="url" className={inputClass} placeholder="https://rightmove.co.uk/..." {...field('listingUrl')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Business type
          </label>
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
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Annual rent (£) <span className="text-red-500">*</span>
          </label>
          <input type="text" inputMode="numeric" className={errors.annualRent ? errorInputClass : inputClass} placeholder="e.g. 60000" {...field('annualRent')} />
          {errors.annualRent && <p className="text-red-600 text-xs mt-1">{errors.annualRent}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Average spend per customer (£) <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-stone-400 mb-1">Typical transaction value.</p>
          <input type="text" inputMode="numeric" className={errors.averageSpendPerCustomer ? errorInputClass : inputClass} placeholder="e.g. 12" {...field('averageSpendPerCustomer')} />
          {errors.averageSpendPerCustomer && <p className="text-red-600 text-xs mt-1">{errors.averageSpendPerCustomer}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Expected customers per day <span className="text-red-500">*</span>
          </label>
          <input type="text" inputMode="numeric" className={errors.expectedCustomersPerDay ? errorInputClass : inputClass} placeholder="e.g. 80" {...field('expectedCustomersPerDay')} />
          {errors.expectedCustomersPerDay && <p className="text-red-600 text-xs mt-1">{errors.expectedCustomersPerDay}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Opening days per month <span className="text-red-500">*</span>
          </label>
          <input type="text" inputMode="numeric" className={errors.openingDaysPerMonth ? errorInputClass : inputClass} placeholder="e.g. 26" {...field('openingDaysPerMonth')} />
          {errors.openingDaysPerMonth && <p className="text-red-600 text-xs mt-1">{errors.openingDaysPerMonth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Monthly staff costs (£) <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 7000" {...field('monthlyStaffCosts')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Monthly utilities and other costs (£) <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 1200" {...field('monthlyUtilitiesAndOtherCosts')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Monthly business rates (£) <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 900" {...field('monthlyBusinessRates')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Fit-out budget (£) <span className="text-stone-400">(optional)</span>
          </label>
          <p className="text-xs text-stone-400 mb-1">One-off cost, not included in monthly break-even.</p>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 50000" {...field('fitOutBudget')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-stone-400 mb-1">Required so your check can be saved and followed up.</p>
          <input type="email" className={errors.email ? errorInputClass : inputClass} placeholder="you@example.com" {...field('email')} />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors"
      >
        Run commercial site check →
      </button>
    </form>
  );
}
