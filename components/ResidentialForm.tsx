'use client';

import { useState } from 'react';
import type { ResidentialInput } from '@/types/property';

interface Props {
  onSubmit: (input: ResidentialInput) => void;
}

function parseNum(value: string): number | undefined {
  const parsed = parseFloat((value || '').replace(/,/g, ''));
  return Number.isNaN(parsed) ? undefined : parsed;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ResidentialForm({ onSubmit }: Props) {
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

    if (!form.email || !isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email to save your check.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) return;

    const input: ResidentialInput = {
      address: form.address || undefined,
      postcode: form.postcode || undefined,
      listingUrl: form.listingUrl || undefined,
      propertyType: form.propertyType || undefined,
      bedrooms: parseNum(form.bedrooms ?? ''),
      userObjective: form.userObjective || undefined,
      purchasePrice: parseNum(form.purchasePrice ?? ''),
      monthlyRent: parseNum(form.monthlyRent ?? ''),
      expectedMonthlyRent: parseNum(form.expectedMonthlyRent ?? ''),
      serviceChargeAnnual: parseNum(form.serviceChargeAnnual ?? ''),
      groundRentAnnual: parseNum(form.groundRentAnnual ?? ''),
      mortgageMonthlyCost: parseNum(form.mortgageMonthlyCost ?? ''),
      otherMonthlyCosts: parseNum(form.otherMonthlyCosts ?? ''),
      email: form.email,
    };

    onSubmit(input);
  };

  const inputClass =
    'w-full border border-stone-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white shadow-sm';

  const errorInputClass =
    'w-full border border-red-400 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white shadow-sm';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Address <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" className={inputClass} placeholder="e.g. 14 Acacia Road" {...field('address')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Postcode <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" className={inputClass} placeholder="e.g. SE1 7PB" {...field('postcode')} />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Listing URL <span className="text-stone-400">(optional)</span>
          </label>
          <input type="url" className={inputClass} placeholder="https://rightmove.co.uk/..." {...field('listingUrl')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Property type
          </label>
          <select className={inputClass} {...field('propertyType')}>
            <option value="">Select type</option>
            <option>Flat</option>
            <option>Terraced house</option>
            <option>Semi-detached house</option>
            <option>Detached house</option>
            <option>HMO</option>
            <option>Studio</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Bedrooms <span className="text-stone-400">(optional)</span>
          </label>
          <input type="number" min="0" className={inputClass} placeholder="e.g. 2" {...field('bedrooms')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Your objective
          </label>
          <select className={inputClass} {...field('userObjective')}>
            <option value="">Select objective</option>
            <option>Buy-to-let</option>
            <option>Owner-occupier</option>
            <option>Rent check</option>
            <option>Flip</option>
            <option>Overseas buyer check</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Purchase price (£) <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 500000" {...field('purchasePrice')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Expected monthly rent (£) <span className="text-stone-400">(optional)</span>
          </label>
          <p className="text-xs text-stone-400 mb-1">What you expect to charge or pay.</p>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 2200" {...field('expectedMonthlyRent')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Current monthly rent (£) <span className="text-stone-400">(optional)</span>
          </label>
          <p className="text-xs text-stone-400 mb-1">Use this if the property is already let.</p>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 2150" {...field('monthlyRent')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Service charge, annual (£) <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 2400" {...field('serviceChargeAnnual')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Ground rent, annual (£) <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 250" {...field('groundRentAnnual')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Mortgage monthly cost (£) <span className="text-stone-400">(optional)</span>
          </label>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 1800" {...field('mortgageMonthlyCost')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Other monthly costs (£) <span className="text-stone-400">(optional)</span>
          </label>
          <p className="text-xs text-stone-400 mb-1">Insurance, management, maintenance, and similar costs.</p>
          <input type="text" inputMode="numeric" className={inputClass} placeholder="e.g. 150" {...field('otherMonthlyCosts')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-stone-400 mb-1">
            Required so your check can be saved and followed up.
          </p>
          <input
            type="email"
            className={errors.email ? errorInputClass : inputClass}
            placeholder="you@example.com"
            {...field('email')}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-teal-700 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-teal-800 transition-colors shadow-sm"
      >
        Run residential return check →
      </button>
    </form>
  );
}
