'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import JsonLd from '@/components/JsonLd';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import MetricCard from '@/components/MetricCard';
import VerdictBadge from '@/components/VerdictBadge';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import {
  disclaimerClass,
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  memoBandClass,
  primaryCtaClass,
  sectionBandClass,
  sectionHeadingClass,
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
  supportingTextClass,
} from '@/components/yieldLensUi';
import {
  compareSites,
  calculateCompareSiteResult,
  type CompareComparisonResult,
  type CompareSiteInput,
  type CompareSiteResult,
} from '@/lib/compareSites';
import {
  getCommercialBusinessTypeInfo,
  getCommercialBusinessTypeOptions,
} from '@/lib/commercialBusinessType';

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://yieldlens.co.uk',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Compare two commercial sites',
      item: 'https://yieldlens.co.uk/compare',
    },
  ],
};

type SiteKey = 'siteA' | 'siteB';

type SiteDraft = {
  siteLabel: string;
  businessType: string;
  location: string;
  monthlyRent: string;
  expectedMonthlyRevenue: string;
  monthlyOperatingCosts: string;
  serviceCharge: string;
  businessRates: string;
  fitOutSetupCost: string;
  openingCash: string;
  leaseLengthMonths: string;
  breakClause: string;
};

interface CompareSnapshot {
  createdAt: string;
  draft: {
    siteA: SiteDraft;
    siteB: SiteDraft;
  };
  siteAResult: CompareSiteResult;
  siteBResult: CompareSiteResult;
  comparison: CompareComparisonResult;
}

const STORAGE_KEY = 'yieldlens_compare_snapshot_v1';

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

function parseNumber(value: string): number | undefined {
  const text = value.trim();
  if (!text) return undefined;

  const parsed = Number.parseFloat(text.replace(/,/g, ''));
  return Number.isNaN(parsed) ? undefined : parsed;
}

function extractUkPostcode(value: string): string {
  const match = value
    .toUpperCase()
    .match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/);

  if (!match) return '';

  return match[1].replace(/\s+/g, ' ').trim();
}

function getAddressLabel(location: string): string {
  const trimmed = location.trim();
  if (!trimmed) return 'Address not provided';

  const postcode = extractUkPostcode(trimmed);
  if (postcode && trimmed.toUpperCase() === postcode) return 'Address not provided';

  return trimmed;
}

function getPostcodeLabel(location: string): string {
  const postcode = extractUkPostcode(location);
  return postcode || 'Postcode not provided';
}

function getLocationHasValue(location: string): boolean {
  return location.trim() !== '';
}

function defaultSiteDraft(siteLabel: string): SiteDraft {
  return {
    siteLabel,
    businessType: '',
    location: '',
    monthlyRent: '',
    expectedMonthlyRevenue: '',
    monthlyOperatingCosts: '',
    serviceCharge: '',
    businessRates: '',
    fitOutSetupCost: '',
    openingCash: '',
    leaseLengthMonths: '',
    breakClause: '',
  };
}

function buildSiteInput(site: SiteDraft): CompareSiteInput {
  return {
    siteLabel: site.siteLabel.trim() || 'Site',
    businessType: site.businessType.trim() || undefined,
    location: site.location.trim() || undefined,
    monthlyRent: parseNumber(site.monthlyRent),
    expectedMonthlyRevenue: parseNumber(site.expectedMonthlyRevenue),
    monthlyOperatingCosts: parseNumber(site.monthlyOperatingCosts),
    serviceCharge: parseNumber(site.serviceCharge),
    businessRates: parseNumber(site.businessRates),
    fitOutSetupCost: parseNumber(site.fitOutSetupCost),
    openingCash: parseNumber(site.openingCash),
    leaseLengthMonths: parseNumber(site.leaseLengthMonths),
    breakClause: site.breakClause.trim() || undefined,
  };
}

function createSiteResult(site: SiteDraft): CompareSiteResult {
  return calculateCompareSiteResult(buildSiteInput(site));
}

function buildComparisonSnapshot(siteA: SiteDraft, siteB: SiteDraft): CompareSnapshot {
  const siteAResult = createSiteResult(siteA);
  const siteBResult = createSiteResult(siteB);
  const comparison = compareSites(
    siteAResult,
    siteBResult,
    siteAResult.siteLabel,
    siteBResult.siteLabel
  );

  return {
    createdAt: new Date().toISOString(),
    draft: {
      siteA,
      siteB,
    },
    siteAResult,
    siteBResult,
    comparison,
  };
}

function loadSavedSnapshot(): CompareSnapshot | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    return JSON.parse(raw) as CompareSnapshot;
  } catch {
    return null;
  }
}

function saveSnapshot(snapshot: CompareSnapshot): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore storage failures. The compare flow must keep working without persistence.
  }
}

function clearSnapshot(): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}

function fieldValue(value: string): string {
  return value.trim();
}

function FieldBlock({
  label,
  helper,
  error,
  required,
  optional,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-800 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
        {optional && <span className="text-stone-400"> (optional)</span>}
      </label>

      {helper && <p className="text-xs text-stone-500 mb-1 leading-5">{helper}</p>}

      {children}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl mb-8">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
        {eyebrow}
      </p>
      <h2 className={`${sectionHeadingClass} mb-3`}>{title}</h2>
      {description && <p className={supportingTextClass}>{description}</p>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-[var(--yieldlens-muted)]">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SiteFormCard({
  title,
  subtitle,
  siteKey,
  site,
  errors,
  onChange,
}: {
  title: string;
  subtitle: string;
  siteKey: SiteKey;
  site: SiteDraft;
  errors: Record<string, string>;
  onChange: (siteKey: SiteKey, key: keyof SiteDraft, value: string) => void;
}) {
  const businessTypeInfo = getCommercialBusinessTypeInfo(site.businessType);
  const businessTypeOptions = getCommercialBusinessTypeOptions();
  const inputClass =
    'w-full min-h-[48px] border border-stone-300 rounded-lg px-3 py-3 text-[16px] leading-6 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white shadow-sm';
  const errorInputClass =
    'w-full min-h-[48px] border border-red-400 rounded-lg px-3 py-3 text-[16px] leading-6 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white shadow-sm';

  const errorFor = (field: keyof SiteDraft) => errors[`${siteKey}.${String(field)}`] ?? '';

  return (
    <section className={`${surfaceCardClass} p-5 sm:p-6`}>
      <div className="flex flex-col gap-2 mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold">
          {title}
        </p>
        <p className="text-sm text-stone-600 leading-6">{subtitle}</p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-semibold mb-3">
            Site identity
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldBlock label="Site label" optional helper="Use Site A, High Street unit, or any other short label.">
              <input
                type="text"
                value={site.siteLabel}
                onChange={(event) => onChange(siteKey, 'siteLabel', event.target.value)}
                className={inputClass}
                placeholder={title}
              />
            </FieldBlock>

            <FieldBlock label="Business type" required helper={businessTypeInfo.helperText} error={errorFor('businessType')}>
              <select
                value={site.businessType}
                onChange={(event) => onChange(siteKey, 'businessType', event.target.value)}
                className={errorFor('businessType') ? errorInputClass : inputClass}
              >
                <option value="">Select a business type</option>
                {businessTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FieldBlock>

            <div className="sm:col-span-2">
              <FieldBlock
                label="Address or postcode"
                helper="Use the property address or postcode so YieldLens can organise local checks such as business rates, comparable rent evidence, and building-condition assumptions."
                error={errorFor('location')}
                optional
              >
                <input
                  type="text"
                  value={site.location}
                  onChange={(event) => onChange(siteKey, 'location', event.target.value)}
                  className={errorFor('location') ? errorInputClass : inputClass}
                  placeholder="12 High Street, London SW1A 1AA"
                />
              </FieldBlock>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-semibold mb-3">
            Trading assumptions
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldBlock label="Monthly rent" required error={errorFor('monthlyRent')}>
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={site.monthlyRent}
                onChange={(event) => onChange(siteKey, 'monthlyRent', event.target.value)}
                className={errorFor('monthlyRent') ? errorInputClass : inputClass}
                placeholder="5000"
              />
            </FieldBlock>

            <FieldBlock label="Expected monthly revenue" required error={errorFor('expectedMonthlyRevenue')}>
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={site.expectedMonthlyRevenue}
                onChange={(event) => onChange(siteKey, 'expectedMonthlyRevenue', event.target.value)}
                className={errorFor('expectedMonthlyRevenue') ? errorInputClass : inputClass}
                placeholder="25000"
              />
            </FieldBlock>

            <FieldBlock
              label="Known monthly operating costs"
              required
              error={errorFor('monthlyOperatingCosts')}
              helper="Exclude rent here. Include staff, stock, utilities, or other recurring operating costs."
            >
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={site.monthlyOperatingCosts}
                onChange={(event) => onChange(siteKey, 'monthlyOperatingCosts', event.target.value)}
                className={errorFor('monthlyOperatingCosts') ? errorInputClass : inputClass}
                placeholder="12000"
              />
            </FieldBlock>

            <FieldBlock
              label="Service charge"
              optional
              error={errorFor('serviceCharge')}
              helper="Leave blank if you do not know it yet."
            >
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={site.serviceCharge}
                onChange={(event) => onChange(siteKey, 'serviceCharge', event.target.value)}
                className={errorFor('serviceCharge') ? errorInputClass : inputClass}
                placeholder="500"
              />
            </FieldBlock>

            <FieldBlock
              label="Business rates estimate"
              optional
              error={errorFor('businessRates')}
              helper="Use a current estimate if you have one."
            >
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={site.businessRates}
                onChange={(event) => onChange(siteKey, 'businessRates', event.target.value)}
                className={errorFor('businessRates') ? errorInputClass : inputClass}
                placeholder="750"
              />
            </FieldBlock>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-semibold mb-3">
            Setup and lease
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldBlock
              label="Fit-out or setup cost"
              required
              error={errorFor('fitOutSetupCost')}
            >
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={site.fitOutSetupCost}
                onChange={(event) => onChange(siteKey, 'fitOutSetupCost', event.target.value)}
                className={errorFor('fitOutSetupCost') ? errorInputClass : inputClass}
                placeholder="35000"
              />
            </FieldBlock>

            <FieldBlock
              label="Opening cash / budget"
              required
              error={errorFor('openingCash')}
            >
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={site.openingCash}
                onChange={(event) => onChange(siteKey, 'openingCash', event.target.value)}
                className={errorFor('openingCash') ? errorInputClass : inputClass}
                placeholder="80000"
              />
            </FieldBlock>

            <FieldBlock
              label="Lease length"
              optional
              error={errorFor('leaseLengthMonths')}
              helper="Months only. Leave blank if you do not know yet."
            >
              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={site.leaseLengthMonths}
                onChange={(event) => onChange(siteKey, 'leaseLengthMonths', event.target.value)}
                className={errorFor('leaseLengthMonths') ? errorInputClass : inputClass}
                placeholder="60"
              />
            </FieldBlock>

            <FieldBlock
              label="Break clause"
              optional
              helper="Use the current understanding if you know it."
            >
              <select
                value={site.breakClause}
                onChange={(event) => onChange(siteKey, 'breakClause', event.target.value)}
                className={inputClass}
              >
                <option value="">Not provided</option>
                <option value="unsure">Unsure</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </FieldBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

function siteDisplayLabel(result: CompareSiteResult): string {
  return result.siteLabel || 'Site';
}

export default function ComparePageClient() {
  const [draft, setDraft] = useState<{ siteA: SiteDraft; siteB: SiteDraft }>({
    siteA: defaultSiteDraft('Site A'),
    siteB: defaultSiteDraft('Site B'),
  });
  const [comparison, setComparison] = useState<CompareSnapshot | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const printButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const saved = loadSavedSnapshot();

    if (saved) {
      setDraft(saved.draft);
      setComparison(saved);
    }
  }, []);

  const handleChange = (siteKey: SiteKey, key: keyof SiteDraft, value: string) => {
    setDraft((current) => ({
      ...current,
      [siteKey]: {
        ...current[siteKey],
        [key]: value,
      },
    }));
  };

  const validateSite = (siteKey: SiteKey, site: SiteDraft): Record<string, string> => {
    const nextErrors: Record<string, string> = {};
    const setError = (field: keyof SiteDraft, message: string) => {
      nextErrors[`${siteKey}.${String(field)}`] = message;
    };

    if (!fieldValue(site.businessType)) {
      setError('businessType', 'Select a business type.');
    }

    if (!fieldValue(site.monthlyRent)) {
      setError('monthlyRent', 'Monthly rent is required.');
    } else if (parseNumber(site.monthlyRent) === undefined) {
      setError('monthlyRent', 'Enter a valid number for monthly rent.');
    }

    if (!fieldValue(site.expectedMonthlyRevenue)) {
      setError('expectedMonthlyRevenue', 'Expected monthly revenue is required.');
    } else if (parseNumber(site.expectedMonthlyRevenue) === undefined) {
      setError('expectedMonthlyRevenue', 'Enter a valid number for expected monthly revenue.');
    }

    if (!fieldValue(site.monthlyOperatingCosts)) {
      setError('monthlyOperatingCosts', 'Known monthly operating costs are required.');
    } else if (parseNumber(site.monthlyOperatingCosts) === undefined) {
      setError('monthlyOperatingCosts', 'Enter a valid number for monthly operating costs.');
    }

    if (!fieldValue(site.fitOutSetupCost)) {
      setError('fitOutSetupCost', 'Fit-out or setup cost is required.');
    } else if (parseNumber(site.fitOutSetupCost) === undefined) {
      setError('fitOutSetupCost', 'Enter a valid number for fit-out or setup cost.');
    }

    if (!fieldValue(site.openingCash)) {
      setError('openingCash', 'Opening cash or budget is required.');
    } else if (parseNumber(site.openingCash) === undefined) {
      setError('openingCash', 'Enter a valid number for opening cash or budget.');
    }

    if (fieldValue(site.serviceCharge) && parseNumber(site.serviceCharge) === undefined) {
      setError('serviceCharge', 'Enter a valid number or leave this blank.');
    }

    if (fieldValue(site.businessRates) && parseNumber(site.businessRates) === undefined) {
      setError('businessRates', 'Enter a valid number or leave this blank.');
    }

    if (fieldValue(site.leaseLengthMonths) && parseNumber(site.leaseLengthMonths) === undefined) {
      setError('leaseLengthMonths', 'Enter a valid number or leave this blank.');
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = {
      ...validateSite('siteA', draft.siteA),
      ...validateSite('siteB', draft.siteB),
    };

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const nextSnapshot = buildComparisonSnapshot(draft.siteA, draft.siteB);
    setComparison(nextSnapshot);
    saveSnapshot(nextSnapshot);
  };

  const handlePrint = () => {
    if (typeof window === 'undefined') return;
    window.print();
    if (printButtonRef.current) {
      printButtonRef.current.blur();
    }
  };

  const sharedEvidence = [
    'Comparable commercial rent evidence',
    'Business rates or rateable value estimate',
    'Service charge details',
    'Fit-out or setup quote',
    'Revenue assumption evidence',
    'Lease length, break clause, and rent review terms',
  ];

  const sharedQuestions = [
    'Is the service charge fixed, capped, or variable?',
    'Are business rates included in the cost base?',
    'Is there a rent-free period?',
    'Is there a break clause?',
    'What happens at rent review?',
  ];

  const currentComparison = comparison;

  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <JsonLd data={breadcrumbStructuredData} />
      <FunnelEventTracker
        eventName="inbound_page_view"
        pagePath="/compare"
        pageType="compare_page"
        mode="commercial"
        eventLabel="Compare two sites viewed"
      />

      <section className="bg-[var(--yieldlens-hero)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Commercial comparison
              </p>

              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Compare two commercial sites before signing
              </h1>

              <p className="text-lg text-stone-300 max-w-2xl mb-6 leading-8">
                Compare two possible sites using rent, revenue, costs, business type, postcode, opening cash and lease assumptions. YieldLens gives a first-pass comparison to help you see which site has stronger pressure points and what evidence still needs checking.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#compare-form" className={heroPrimaryCtaClass}>
                  Compare two sites
                </a>

                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/compare"
                  ctaLabel="Run a single free commercial check"
                  pageType="compare_page"
                  className={heroSecondaryCtaClass}
                >
                  Run a single free commercial check
                </TrackedCtaLink>
              </div>

              <p className={`${disclaimerClass} mt-5 text-stone-400`}>
                No account required. This is a first-pass comparison only.
              </p>
            </div>

            <div className={`${memoBandClass} p-6 sm:p-7`}>
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                What it compares
              </p>
              <BulletList
                items={[
                  'Rent burden and monthly cost pressure',
                  'Opening cash after setup',
                  'Break-even pressure and downside risk',
                  'Evidence gaps and lease questions',
                  'Location checks to verify before relying on the result',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionBandClass} print:hidden`} id="compare-form">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Compare two sites"
            title="Enter one version of the commercial check for Site A and Site B."
            description="Keep the inputs compact. Address or postcode helps with local prompts, but the page still works if you only know the rough location."
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              <SiteFormCard
                title="Site A"
                subtitle="The first site or option you want to compare."
                siteKey="siteA"
                site={draft.siteA}
                errors={errors}
                onChange={handleChange}
              />

              <SiteFormCard
                title="Site B"
                subtitle="The second site or option you want to compare."
                siteKey="siteB"
                site={draft.siteB}
                errors={errors}
                onChange={handleChange}
              />
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                Check the highlighted fields for both sites, then compare again.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className={`${primaryCtaClass} w-full sm:w-auto`}
              >
                Compare two sites
              </button>

              <TrackedCtaLink
                href="/check?mode=commercial"
                eventName="commercial_viability_page_cta_clicked"
                pagePath="/compare"
                ctaLabel="Run a single free commercial check"
                pageType="compare_page"
                className={`${secondaryCtaClass} w-full sm:w-auto`}
              >
                Run a single free commercial check
              </TrackedCtaLink>
            </div>
          </form>
        </div>
      </section>

      {currentComparison && (
        <section className="bg-white border-y border-[var(--yieldlens-border)]">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="print:hidden flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                  Summary verdict
                </p>
                <h2 className={`${sectionHeadingClass} mb-3`}>
                  First-pass comparison
                </h2>
                <p className={`${supportingTextClass} max-w-3xl`}>
                  The comparison is an indicative first-pass screen only. Use it to see which site has stronger pressure points and what evidence still needs checking before either lease goes further.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  ref={printButtonRef}
                  onClick={handlePrint}
                  className={secondaryCtaClass}
                >
                  Print comparison snapshot
                </button>
              </div>
            </div>

            <div className="hidden print:block mb-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                YieldLens UK
              </p>
              <h1 className="text-3xl font-bold text-stone-900 mb-2">
                Compare two commercial sites before signing
              </h1>
              <p className="text-sm text-stone-600 leading-6">
                First-pass comparison generated {formatDate(currentComparison.createdAt)}.
              </p>
            </div>

            <div className={`${surfaceCardClass} p-6 mb-6 print:shadow-none print:border print:border-stone-200`}>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                    {currentComparison.comparison.strongerSite === 'too_close'
                      ? 'Comparison verdict'
                      : 'Which site appears stronger on a first-pass basis?'}
                  </p>
                  <p className="text-lg text-stone-800 leading-8">
                    {currentComparison.comparison.summary}
                  </p>
                  <p className="mt-3 text-xs text-stone-500 leading-6">
                    Compared on {formatDate(currentComparison.createdAt)}. This comparison is not a valuation and does not replace professional due diligence.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 min-w-[240px]">
                  <div className="rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">
                      Site A score
                    </p>
                    <p className="text-3xl font-bold text-stone-900">{currentComparison.siteAResult.score}/100</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">
                      Site B score
                    </p>
                    <p className="text-3xl font-bold text-stone-900">{currentComparison.siteBResult.score}/100</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <article className={`${surfaceCardClass} p-5 sm:p-6 print:shadow-none print:border print:border-stone-200`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                      Site A key metrics
                    </p>
                    <h3 className="text-2xl font-bold text-stone-900">
                      {siteDisplayLabel(currentComparison.siteAResult)}
                    </h3>
                  </div>
                  <VerdictBadge verdict={currentComparison.siteAResult.verdict} />
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    {currentComparison.siteAResult.businessTypeLabel}
                  </span>
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    {currentComparison.siteAResult.addressLabel}
                  </span>
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    {currentComparison.siteAResult.postcodeLabel}
                  </span>
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    Lease length: {currentComparison.siteAResult.leaseLengthMonths ? `${currentComparison.siteAResult.leaseLengthMonths} months` : 'Not provided'}
                  </span>
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    Break clause: {currentComparison.siteAResult.breakClauseLabel}
                  </span>
                </div>

                <p className="text-sm text-stone-600 leading-7 mb-5">
                  {currentComparison.siteAResult.businessTypeInfo.summaryLine}
                </p>

                <div className="space-y-4 mb-5">
                  <p className="text-sm text-stone-600 leading-7">
                    {currentComparison.siteAResult.locationContext}
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 mb-2">
                      Location checks to verify
                    </p>
                    <ul className="space-y-2 text-sm text-[var(--yieldlens-muted)] leading-6">
                      {currentComparison.siteAResult.locationChecks.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MetricCard
                    label="Score"
                    value={`${currentComparison.siteAResult.score}/100`}
                    helper="First-pass comparison score."
                  />
                  <MetricCard
                    label="Rent burden"
                    value={formatPercent(currentComparison.siteAResult.rentBurdenPercentage)}
                    helper="Rent as a share of expected monthly revenue."
                  />
                  <MetricCard
                    label="Monthly cost base"
                    value={formatCurrency(currentComparison.siteAResult.monthlyCostBase)}
                    helper="Rent + operating costs + service charge + rates."
                  />
                  <MetricCard
                    label="Revenue vs cost base"
                    value={
                      currentComparison.siteAResult.monthlySurplus === undefined
                        ? 'Not available'
                        : `${currentComparison.siteAResult.monthlySurplus >= 0 ? '' : '-'}${formatCurrency(Math.abs(currentComparison.siteAResult.monthlySurplus))} ${currentComparison.siteAResult.monthlySurplus >= 0 ? 'surplus' : 'gap'}`
                    }
                    helper="Shows how much room is left after the current cost base."
                  />
                  <MetricCard
                    label="Opening cash after setup"
                    value={formatCurrency(currentComparison.siteAResult.openingCashAfterSetup)}
                    helper="Cash left after setup and one month of known costs."
                  />
                  <MetricCard
                    label="Break-even pressure"
                    value={currentComparison.siteAResult.breakEvenPressureState}
                    helper={currentComparison.siteAResult.breakEvenPressureHelper}
                  />
                  <MetricCard
                    label="Downside pressure"
                    value={
                      currentComparison.siteAResult.survivesSixBadMonths
                        ? 'Pass'
                        : currentComparison.siteAResult.monthlyBurnInDownside
                          ? `${formatCurrency(currentComparison.siteAResult.monthlyBurnInDownside)} burn/month`
                          : 'Not available'
                    }
                    helper="Downside view uses a simple screening assumption for this v1 comparison."
                  />
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-stone-900 mb-3">Top pressure points</p>
                  <ul className="space-y-2 text-sm text-[var(--yieldlens-muted)] leading-6">
                    {currentComparison.siteAResult.pressurePoints.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className={`${surfaceCardClass} p-5 sm:p-6 print:shadow-none print:border print:border-stone-200`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                      Site B key metrics
                    </p>
                    <h3 className="text-2xl font-bold text-stone-900">
                      {siteDisplayLabel(currentComparison.siteBResult)}
                    </h3>
                  </div>
                  <VerdictBadge verdict={currentComparison.siteBResult.verdict} />
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    {currentComparison.siteBResult.businessTypeLabel}
                  </span>
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    {currentComparison.siteBResult.addressLabel}
                  </span>
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    {currentComparison.siteBResult.postcodeLabel}
                  </span>
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    Lease length: {currentComparison.siteBResult.leaseLengthMonths ? `${currentComparison.siteBResult.leaseLengthMonths} months` : 'Not provided'}
                  </span>
                  <span className="rounded-full border border-[var(--yieldlens-border)] bg-[var(--yieldlens-panel)] px-3 py-1 text-stone-700">
                    Break clause: {currentComparison.siteBResult.breakClauseLabel}
                  </span>
                </div>

                <p className="text-sm text-stone-600 leading-7 mb-5">
                  {currentComparison.siteBResult.businessTypeInfo.summaryLine}
                </p>

                <div className="space-y-4 mb-5">
                  <p className="text-sm text-stone-600 leading-7">
                    {currentComparison.siteBResult.locationContext}
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 mb-2">
                      Location checks to verify
                    </p>
                    <ul className="space-y-2 text-sm text-[var(--yieldlens-muted)] leading-6">
                      {currentComparison.siteBResult.locationChecks.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MetricCard
                    label="Score"
                    value={`${currentComparison.siteBResult.score}/100`}
                    helper="First-pass comparison score."
                  />
                  <MetricCard
                    label="Rent burden"
                    value={formatPercent(currentComparison.siteBResult.rentBurdenPercentage)}
                    helper="Rent as a share of expected monthly revenue."
                  />
                  <MetricCard
                    label="Monthly cost base"
                    value={formatCurrency(currentComparison.siteBResult.monthlyCostBase)}
                    helper="Rent + operating costs + service charge + rates."
                  />
                  <MetricCard
                    label="Revenue vs cost base"
                    value={
                      currentComparison.siteBResult.monthlySurplus === undefined
                        ? 'Not available'
                        : `${currentComparison.siteBResult.monthlySurplus >= 0 ? '' : '-'}${formatCurrency(Math.abs(currentComparison.siteBResult.monthlySurplus))} ${currentComparison.siteBResult.monthlySurplus >= 0 ? 'surplus' : 'gap'}`
                    }
                    helper="Shows how much room is left after the current cost base."
                  />
                  <MetricCard
                    label="Opening cash after setup"
                    value={formatCurrency(currentComparison.siteBResult.openingCashAfterSetup)}
                    helper="Cash left after setup and one month of known costs."
                  />
                  <MetricCard
                    label="Break-even pressure"
                    value={currentComparison.siteBResult.breakEvenPressureState}
                    helper={currentComparison.siteBResult.breakEvenPressureHelper}
                  />
                  <MetricCard
                    label="Downside pressure"
                    value={
                      currentComparison.siteBResult.survivesSixBadMonths
                        ? 'Pass'
                        : currentComparison.siteBResult.monthlyBurnInDownside
                          ? `${formatCurrency(currentComparison.siteBResult.monthlyBurnInDownside)} burn/month`
                          : 'Not available'
                    }
                    helper="Downside view uses a simple screening assumption for this v1 comparison."
                  />
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-stone-900 mb-3">Top pressure points</p>
                  <ul className="space-y-2 text-sm text-[var(--yieldlens-muted)] leading-6">
                    {currentComparison.siteBResult.pressurePoints.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className={`${surfaceCardSoftClass} p-5 sm:p-6`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  Main differences
                </p>
                <ul className="space-y-2 text-sm text-[var(--yieldlens-muted)] leading-7">
                  {currentComparison.comparison.differenceLines.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--yieldlens-caution)] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${surfaceCardSoftClass} p-5 sm:p-6`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  Next step
                </p>
                <p className="text-sm text-stone-700 leading-7">
                  Need a decision memo for one site? Run the single-site flow for the option you want to take further. The £49 Standard Commercial Viability File is still for one selected site and turns the check into a printable decision memo.
                </p>
                <p className="mt-3 text-sm text-stone-700 leading-7">
                  Spend £49 before you spend £2,500+. Professional costs vary. £2,500+ is an indicative comparison, not a guaranteed cost or saving.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className={`${surfaceCardClass} p-5 sm:p-6`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  Evidence to check before relying on the comparison
                </p>
                <p className="text-sm font-semibold text-stone-900 mb-2">Shared evidence</p>
                <BulletList items={sharedEvidence} />
              </div>

              <div className={`${surfaceCardClass} p-5 sm:p-6`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  Site A evidence gaps
                </p>
                <BulletList items={currentComparison.siteAResult.evidenceGaps.slice(0, 6)} />
              </div>

              <div className={`${surfaceCardClass} p-5 sm:p-6`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  Site B evidence gaps
                </p>
                <BulletList items={currentComparison.siteBResult.evidenceGaps.slice(0, 6)} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className={`${surfaceCardClass} p-5 sm:p-6`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  Questions before taking either lease further
                </p>
                <p className="text-sm font-semibold text-stone-900 mb-2">Shared questions</p>
                <BulletList items={sharedQuestions} />
              </div>

              <div className={`${surfaceCardClass} p-5 sm:p-6`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  Site A questions
                </p>
                <BulletList items={currentComparison.siteAResult.questions.slice(0, 6)} />
              </div>

              <div className={`${surfaceCardClass} p-5 sm:p-6`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
                  Site B questions
                </p>
                <BulletList items={currentComparison.siteBResult.questions.slice(0, 6)} />
              </div>
            </div>

            <div className={`${surfaceCardClass} p-6 sm:p-7 mt-6 print:shadow-none print:border print:border-stone-200`}>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
                    £49 Standard Commercial Viability File
                  </p>
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">
                    Need a decision memo for one site?
                  </h3>
                  <p className="text-sm text-stone-600 leading-7">
                    The compare tool is a free first-pass screen. If one site still looks worth taking further, run the single-site free commercial check for that option and unlock the £49 Standard Commercial Viability File when you want the printable memo.
                  </p>
                  <p className="mt-3 text-sm text-stone-600 leading-7">
                    YieldLens helps organise tailored evidence gaps, lease questions, assumptions, stress-test interpretation, and printable decision memo context for one selected site.
                  </p>
                </div>

                <div className="flex flex-col gap-3 min-w-[240px]">
                <TrackedCtaLink
                  href="/check?mode=commercial"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/compare"
                  ctaLabel="Run a single free commercial check"
                  pageType="compare_page"
                  className={`${primaryCtaClass} w-full sm:w-auto`}
                >
                  Run a single free commercial check
                </TrackedCtaLink>

                <TrackedCtaLink
                    href="/sample-commercial-viability-file"
                  eventName="commercial_viability_page_cta_clicked"
                  pagePath="/compare"
                  ctaLabel="View sample viability file"
                  pageType="compare_page"
                  className={`${secondaryCtaClass} w-full sm:w-auto`}
                >
                  View sample viability file
                </TrackedCtaLink>

                  <Link href="/viability-file" className={`${secondaryCtaClass} w-full sm:w-auto`}>
                    £49 Standard Commercial Viability File
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={`${memoBandClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-5xl my-14 print:hidden`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8 text-sm text-stone-300 leading-7 text-center">
          <p className="font-semibold text-[#D6C7A2] mb-2">Important disclaimer</p>
          <p className={disclaimerClass}>
            YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, a valuation, a RICS valuation, or a substitute for professional due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
