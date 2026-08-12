'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLatestSubmission } from '@/lib/storage';
import { logToolEvent } from '@/lib/logToolEvent';
import { primaryCtaClass, surfaceCardClass } from '@/components/yieldLensUi';
import type { CommercialInput, CommercialResult, Submission } from '@/types/property';
import type { CarlonAnalyticsStage } from '@/types/carlonAnalytics';

type FormState = {
  contactName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  currentStage: CarlonAnalyticsStage;
  targetDecisionDate: string;
  siteAddress: string;
  postcode: string;
  listingUrl: string;
  annualRent: string;
  leaseTermYears: string;
  rentFreeMonths: string;
  annualServiceCharge: string;
  annualInsuranceContribution: string;
  annualBusinessRates: string;
  rentDeposit: string;
  personalGuarantee: 'yes' | 'no' | 'unknown';
  breakClause: string;
  repairingObligations: string;
  targetMonthlyRevenue: string;
  grossMarginPercentage: string;
  averageSpendPerCustomer: string;
  expectedCustomersPerDay: string;
  openingDaysPerMonth: string;
  monthlyStaffCosts: string;
  monthlyUtilities: string;
  monthlyMarketing: string;
  monthlySoftwareAndProfessionalFees: string;
  monthlyOtherOperatingCosts: string;
  fitOutBudget: string;
  equipmentBudget: string;
  openingStock: string;
  legalAndProfessionalFees: string;
  licencesAndPreOpeningCosts: string;
  contingencyBudget: string;
  startingCash: string;
  externalFundingAmount: string;
  fundingInterestRate: string;
  fundingTermMonths: string;
  documentsReady: string[];
  evidenceNotes: string;
  keyConcerns: string;
  additionalNotes: string;
};

const emptyForm: FormState = {
  contactName: '',
  email: '',
  phone: '',
  businessName: '',
  businessType: '',
  currentStage: 'early_search',
  targetDecisionDate: '',
  siteAddress: '',
  postcode: '',
  listingUrl: '',
  annualRent: '',
  leaseTermYears: '',
  rentFreeMonths: '',
  annualServiceCharge: '',
  annualInsuranceContribution: '',
  annualBusinessRates: '',
  rentDeposit: '',
  personalGuarantee: 'unknown',
  breakClause: '',
  repairingObligations: '',
  targetMonthlyRevenue: '',
  grossMarginPercentage: '',
  averageSpendPerCustomer: '',
  expectedCustomersPerDay: '',
  openingDaysPerMonth: '',
  monthlyStaffCosts: '',
  monthlyUtilities: '',
  monthlyMarketing: '',
  monthlySoftwareAndProfessionalFees: '',
  monthlyOtherOperatingCosts: '',
  fitOutBudget: '',
  equipmentBudget: '',
  openingStock: '',
  legalAndProfessionalFees: '',
  licencesAndPreOpeningCosts: '',
  contingencyBudget: '',
  startingCash: '',
  externalFundingAmount: '',
  fundingInterestRate: '',
  fundingTermMonths: '',
  documentsReady: [],
  evidenceNotes: '',
  keyConcerns: '',
  additionalNotes: '',
};

const stageOptions: Array<{ value: CarlonAnalyticsStage; label: string }> = [
  { value: 'early_search', label: 'Early search / comparing areas' },
  { value: 'viewing_sites', label: 'Viewing specific sites' },
  { value: 'offer_or_negotiation', label: 'Offer or commercial negotiation' },
  { value: 'heads_of_terms', label: 'Heads of terms agreed / being negotiated' },
  { value: 'solicitors_instructed', label: 'Solicitors instructed' },
  { value: 'other', label: 'Other' },
];

const evidenceOptions = [
  'Agent particulars / listing',
  'Heads of terms',
  'Draft lease',
  'Business rates evidence',
  'Service charge information',
  'Fit-out / equipment quotes',
  'Existing accounts or management figures',
  'Funding terms / loan quote',
];

function numberToString(value: unknown): string {
  return typeof value === 'number' && Number.isFinite(value) ? String(value) : '';
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function getPrefill(submission: Submission): Partial<FormState> {
  if (submission.mode !== 'commercial') return {};

  const input = submission.input as CommercialInput;
  const result = submission.result as CommercialResult;

  return {
    email: stringValue(input.email),
    businessType: stringValue(input.businessType),
    siteAddress: stringValue(input.address),
    postcode: stringValue(input.postcode),
    listingUrl: stringValue(input.listingUrl),
    annualRent: numberToString(input.annualRent),
    annualBusinessRates:
      typeof input.monthlyBusinessRates === 'number'
        ? String(input.monthlyBusinessRates * 12)
        : '',
    rentDeposit: numberToString(input.rentDeposit),
    targetMonthlyRevenue: numberToString(result.estimatedMonthlyRevenue),
    averageSpendPerCustomer: numberToString(input.averageSpendPerCustomer),
    expectedCustomersPerDay: numberToString(input.expectedCustomersPerDay),
    openingDaysPerMonth: numberToString(input.openingDaysPerMonth),
    monthlyStaffCosts: numberToString(input.monthlyStaffCosts),
    monthlyUtilities: numberToString(input.monthlyUtilitiesAndOtherCosts),
    fitOutBudget: numberToString(input.fitOutBudget),
    openingStock: numberToString(input.openingStock),
    legalAndProfessionalFees: numberToString(input.legalFees),
    contingencyBudget: numberToString(input.otherSetupCosts),
    startingCash: numberToString(input.startingCash),
  };
}

function parseOptionalNumber(value: string): number | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function FieldLabel({ children, core = false }: { children: React.ReactNode; core?: boolean }) {
  return (
    <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-stone-800">
      {children}
      {core ? (
        <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
          Core
        </span>
      ) : null}
    </span>
  );
}

const inputClass =
  'w-full rounded-2xl border border-stone-300 bg-white px-3.5 py-3 text-sm text-stone-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100';

function Section({
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
    <section className={`${surfaceCardClass} p-5 sm:p-7`}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold">{eyebrow}</p>
      <h2 className="mt-2 text-xl sm:text-2xl font-bold text-stone-950">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-stone-600 max-w-3xl">{description}</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

export default function CommercialUnderwritingIntakeClient({ sourcePage }: { sourcePage: string }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [sourceSubmission, setSourceSubmission] = useState<Submission | null>(null);
  const [prefilled, setPrefilled] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const latest = getLatestSubmission();
    if (latest?.mode === 'commercial') {
      setSourceSubmission(latest);
      setForm((current) => ({ ...current, ...getPrefill(latest) }));
      setPrefilled(true);
    }

    void logToolEvent({
      event_name: 'carlon_analytics_intake_started',
      page_path: '/carlon-analytics/commercial-underwriting',
      tool_name: 'commercial_funnel',
      result_label: 'Carlon Analytics underwriting intake opened',
      result_band: 'form_opened',
      metadata: {
        funnel_area: 'commercial',
        product_area: 'carlon_analytics',
        page_type: 'analytics_intake',
        source_page: sourcePage,
        prefilled_from_yieldlens: latest?.mode === 'commercial',
      },
    });
  }, [sourcePage]);

  const canSubmit = useMemo(() => {
    return Boolean(
      form.contactName.trim() &&
        form.email.trim() &&
        form.businessType.trim() &&
        (form.siteAddress.trim() || form.postcode.trim()) &&
        parseOptionalNumber(form.annualRent) !== undefined &&
        parseOptionalNumber(form.targetMonthlyRevenue) !== undefined &&
        parseOptionalNumber(form.grossMarginPercentage) !== undefined
    );
  }, [form]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleEvidence = (item: string) => {
    setForm((current) => ({
      ...current,
      documentsReady: current.documentsReady.includes(item)
        ? current.documentsReady.filter((value) => value !== item)
        : [...current.documentsReady, item],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!canSubmit) {
      setStatus('error');
      setErrorMessage('Complete the CORE fields before submitting the underwriting request.');
      return;
    }

    setStatus('submitting');

    try {
      const payload = {
        intake: {
          ...form,
          annualRent: parseOptionalNumber(form.annualRent),
          leaseTermYears: parseOptionalNumber(form.leaseTermYears),
          rentFreeMonths: parseOptionalNumber(form.rentFreeMonths),
          annualServiceCharge: parseOptionalNumber(form.annualServiceCharge),
          annualInsuranceContribution: parseOptionalNumber(form.annualInsuranceContribution),
          annualBusinessRates: parseOptionalNumber(form.annualBusinessRates),
          rentDeposit: parseOptionalNumber(form.rentDeposit),
          targetMonthlyRevenue: parseOptionalNumber(form.targetMonthlyRevenue),
          grossMarginPercentage: parseOptionalNumber(form.grossMarginPercentage),
          averageSpendPerCustomer: parseOptionalNumber(form.averageSpendPerCustomer),
          expectedCustomersPerDay: parseOptionalNumber(form.expectedCustomersPerDay),
          openingDaysPerMonth: parseOptionalNumber(form.openingDaysPerMonth),
          monthlyStaffCosts: parseOptionalNumber(form.monthlyStaffCosts),
          monthlyUtilities: parseOptionalNumber(form.monthlyUtilities),
          monthlyMarketing: parseOptionalNumber(form.monthlyMarketing),
          monthlySoftwareAndProfessionalFees: parseOptionalNumber(form.monthlySoftwareAndProfessionalFees),
          monthlyOtherOperatingCosts: parseOptionalNumber(form.monthlyOtherOperatingCosts),
          fitOutBudget: parseOptionalNumber(form.fitOutBudget),
          equipmentBudget: parseOptionalNumber(form.equipmentBudget),
          openingStock: parseOptionalNumber(form.openingStock),
          legalAndProfessionalFees: parseOptionalNumber(form.legalAndProfessionalFees),
          licencesAndPreOpeningCosts: parseOptionalNumber(form.licencesAndPreOpeningCosts),
          contingencyBudget: parseOptionalNumber(form.contingencyBudget),
          startingCash: parseOptionalNumber(form.startingCash),
          externalFundingAmount: parseOptionalNumber(form.externalFundingAmount),
          fundingInterestRate: parseOptionalNumber(form.fundingInterestRate),
          fundingTermMonths: parseOptionalNumber(form.fundingTermMonths),
          sourceSubmissionId: sourceSubmission?.id,
          sourcePage,
          prefilledFromYieldLens: prefilled,
        },
        sourceSubmission,
        website,
      };

      const response = await fetch('/api/carlon-analytics/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || 'Failed to submit underwriting request.');
      }

      void logToolEvent({
        event_name: 'carlon_analytics_intake_submitted',
        page_path: '/carlon-analytics/commercial-underwriting',
        tool_name: 'commercial_funnel',
        result_label: 'Carlon Analytics underwriting intake submitted',
        result_band: 'conversion',
        metadata: {
          funnel_area: 'commercial',
          product_area: 'carlon_analytics',
          page_type: 'analytics_intake',
          source_page: sourcePage,
          prefilled_from_yieldlens: prefilled,
          business_type: form.businessType,
        },
      });

      router.push('/carlon-analytics/commercial-underwriting/thank-you');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit underwriting request.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <div className="rounded-[32px] bg-stone-950 text-white p-7 sm:p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold">Carlon Analytics</p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
          Commercial lease &amp; business underwriting
        </h1>
        <p className="mt-5 max-w-3xl text-sm sm:text-base leading-7 text-stone-300">
          This is the deeper layer after a YieldLens screen: gross margin, operating costs, staffing, opening capital, funding, cash pressure and lease exposure are reviewed together before you commit.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm">
          {['No payment at this stage', 'CORE fields first; add what you know', 'Assumptions are reviewed before use'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-stone-200">
              {item}
            </div>
          ))}
        </div>
      </div>

      {prefilled ? (
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-900">
          We prefilled fields from your latest YieldLens commercial check. Review them carefully: they are still your assumptions, not independently verified figures.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-7 space-y-6">
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label>Website
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </label>
        </div>
        <Section
          eyebrow="1 · Contact & decision stage"
          title="Who is making the decision, and how far along is it?"
          description="These fields tell us what you are assessing and how urgent the underwriting is."
        >
          <label>
            <FieldLabel core>Contact name</FieldLabel>
            <input className={inputClass} value={form.contactName} onChange={(e) => update('contactName', e.target.value)} required />
          </label>
          <label>
            <FieldLabel core>Email</FieldLabel>
            <input type="email" className={inputClass} value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </label>
          <label>
            <FieldLabel>Phone</FieldLabel>
            <input className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Business / trading name</FieldLabel>
            <input className={inputClass} value={form.businessName} onChange={(e) => update('businessName', e.target.value)} />
          </label>
          <label>
            <FieldLabel core>Business type</FieldLabel>
            <input className={inputClass} placeholder="e.g. cafe, restaurant, salon" value={form.businessType} onChange={(e) => update('businessType', e.target.value)} required />
          </label>
          <label>
            <FieldLabel core>Current stage</FieldLabel>
            <select className={inputClass} value={form.currentStage} onChange={(e) => update('currentStage', e.target.value as CarlonAnalyticsStage)}>
              {stageOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
          <label className="md:col-span-2">
            <FieldLabel>Target decision / signing date</FieldLabel>
            <input type="date" className={inputClass} value={form.targetDecisionDate} onChange={(e) => update('targetDecisionDate', e.target.value)} />
          </label>
        </Section>

        <Section
          eyebrow="2 · Site & lease"
          title="What are you being asked to commit to?"
          description="Use the figures currently on the table. If a term is unknown, leave it blank rather than guessing."
        >
          <label className="md:col-span-2">
            <FieldLabel core>Site address or unit description</FieldLabel>
            <input className={inputClass} value={form.siteAddress} onChange={(e) => update('siteAddress', e.target.value)} />
          </label>
          <label>
            <FieldLabel core>Postcode</FieldLabel>
            <input className={inputClass} value={form.postcode} onChange={(e) => update('postcode', e.target.value.toUpperCase())} />
          </label>
          <label>
            <FieldLabel>Listing / agent URL</FieldLabel>
            <input type="url" className={inputClass} value={form.listingUrl} onChange={(e) => update('listingUrl', e.target.value)} />
          </label>
          <label>
            <FieldLabel core>Annual rent (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.annualRent} onChange={(e) => update('annualRent', e.target.value)} required />
          </label>
          <label>
            <FieldLabel>Lease term (years)</FieldLabel>
            <input type="number" min="0" step="0.5" className={inputClass} value={form.leaseTermYears} onChange={(e) => update('leaseTermYears', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Rent-free period (months)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.rentFreeMonths} onChange={(e) => update('rentFreeMonths', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Annual service charge (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.annualServiceCharge} onChange={(e) => update('annualServiceCharge', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Annual insurance contribution (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.annualInsuranceContribution} onChange={(e) => update('annualInsuranceContribution', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Annual business rates (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.annualBusinessRates} onChange={(e) => update('annualBusinessRates', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Rent deposit (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.rentDeposit} onChange={(e) => update('rentDeposit', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Personal guarantee</FieldLabel>
            <select className={inputClass} value={form.personalGuarantee} onChange={(e) => update('personalGuarantee', e.target.value as FormState['personalGuarantee'])}>
              <option value="unknown">Unknown / not discussed</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label>
            <FieldLabel>Break clause</FieldLabel>
            <input className={inputClass} placeholder="e.g. tenant break at year 5" value={form.breakClause} onChange={(e) => update('breakClause', e.target.value)} />
          </label>
          <label className="md:col-span-2">
            <FieldLabel>Repairing obligations / unusual lease terms</FieldLabel>
            <textarea rows={3} className={inputClass} value={form.repairingObligations} onChange={(e) => update('repairingObligations', e.target.value)} />
          </label>
        </Section>

        <Section
          eyebrow="3 · Business economics"
          title="What has to happen operationally for the site to work?"
          description="Gross margin is essential here because this is where the underwriting becomes materially deeper than the YieldLens screening calculation."
        >
          <label>
            <FieldLabel core>Target monthly revenue (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.targetMonthlyRevenue} onChange={(e) => update('targetMonthlyRevenue', e.target.value)} required />
          </label>
          <label>
            <FieldLabel core>Gross margin (%)</FieldLabel>
            <input type="number" min="0" max="100" step="0.1" className={inputClass} value={form.grossMarginPercentage} onChange={(e) => update('grossMarginPercentage', e.target.value)} placeholder="e.g. 68" required />
          </label>
          <label>
            <FieldLabel>Average spend / customer (£)</FieldLabel>
            <input type="number" min="0" step="0.01" className={inputClass} value={form.averageSpendPerCustomer} onChange={(e) => update('averageSpendPerCustomer', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Expected customers / day</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.expectedCustomersPerDay} onChange={(e) => update('expectedCustomersPerDay', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Opening days / month</FieldLabel>
            <input type="number" min="0" max="31" step="1" className={inputClass} value={form.openingDaysPerMonth} onChange={(e) => update('openingDaysPerMonth', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Monthly staff cost (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.monthlyStaffCosts} onChange={(e) => update('monthlyStaffCosts', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Monthly utilities (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.monthlyUtilities} onChange={(e) => update('monthlyUtilities', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Monthly marketing (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.monthlyMarketing} onChange={(e) => update('monthlyMarketing', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Monthly software / professional fees (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.monthlySoftwareAndProfessionalFees} onChange={(e) => update('monthlySoftwareAndProfessionalFees', e.target.value)} />
          </label>
          <label>
            <FieldLabel>Other monthly operating costs (£)</FieldLabel>
            <input type="number" min="0" step="1" className={inputClass} value={form.monthlyOtherOperatingCosts} onChange={(e) => update('monthlyOtherOperatingCosts', e.target.value)} />
          </label>
        </Section>

        <Section
          eyebrow="4 · Opening capital & funding"
          title="How much cash is required before the business has a chance to trade?"
          description="Separate your own cash from external funding. Unknown items can be left blank and treated as evidence gaps."
        >
          <label><FieldLabel>Fit-out budget (£)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.fitOutBudget} onChange={(e) => update('fitOutBudget', e.target.value)} /></label>
          <label><FieldLabel>Equipment budget (£)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.equipmentBudget} onChange={(e) => update('equipmentBudget', e.target.value)} /></label>
          <label><FieldLabel>Opening stock (£)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.openingStock} onChange={(e) => update('openingStock', e.target.value)} /></label>
          <label><FieldLabel>Legal / professional fees (£)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.legalAndProfessionalFees} onChange={(e) => update('legalAndProfessionalFees', e.target.value)} /></label>
          <label><FieldLabel>Licences / pre-opening costs (£)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.licencesAndPreOpeningCosts} onChange={(e) => update('licencesAndPreOpeningCosts', e.target.value)} /></label>
          <label><FieldLabel>Contingency budget (£)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.contingencyBudget} onChange={(e) => update('contingencyBudget', e.target.value)} /></label>
          <label><FieldLabel>Own cash available (£)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.startingCash} onChange={(e) => update('startingCash', e.target.value)} /></label>
          <label><FieldLabel>External funding amount (£)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.externalFundingAmount} onChange={(e) => update('externalFundingAmount', e.target.value)} /></label>
          <label><FieldLabel>Funding interest rate (%)</FieldLabel><input type="number" min="0" step="0.01" className={inputClass} value={form.fundingInterestRate} onChange={(e) => update('fundingInterestRate', e.target.value)} /></label>
          <label><FieldLabel>Funding term (months)</FieldLabel><input type="number" min="0" step="1" className={inputClass} value={form.fundingTermMonths} onChange={(e) => update('fundingTermMonths', e.target.value)} /></label>
        </Section>

        <Section
          eyebrow="5 · Evidence & questions"
          title="What evidence already exists, and what worries you most?"
          description="No documents are uploaded through this V0 form. Tick what you already have so we know what can be requested securely during review."
        >
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {evidenceOptions.map((item) => (
              <label key={item} className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm text-stone-700">
                <input type="checkbox" className="mt-1" checked={form.documentsReady.includes(item)} onChange={() => toggleEvidence(item)} />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <label className="md:col-span-2"><FieldLabel>Evidence notes</FieldLabel><textarea rows={3} className={inputClass} placeholder="Anything available, missing, disputed or still being negotiated" value={form.evidenceNotes} onChange={(e) => update('evidenceNotes', e.target.value)} /></label>
          <label className="md:col-span-2"><FieldLabel>What are you most concerned about?</FieldLabel><textarea rows={3} className={inputClass} value={form.keyConcerns} onChange={(e) => update('keyConcerns', e.target.value)} /></label>
          <label className="md:col-span-2"><FieldLabel>Anything else we should know?</FieldLabel><textarea rows={3} className={inputClass} value={form.additionalNotes} onChange={(e) => update('additionalNotes', e.target.value)} /></label>
        </Section>

        <div className="rounded-[28px] border border-stone-200 bg-white p-5 sm:p-7 shadow-sm">
          <p className="text-sm leading-7 text-stone-600">
            By submitting, you are asking Carlon Analytics to review the information for potential commercial underwriting work. The figures remain unverified assumptions until supporting evidence is reviewed. This is not legal, tax, valuation or regulated financial advice.
          </p>
          {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}
          <button type="submit" disabled={status === 'submitting' || !canSubmit} className={`${primaryCtaClass} mt-5 w-full sm:w-auto`}>
            {status === 'submitting' ? 'Submitting...' : 'Request full underwriting review'}
          </button>
        </div>
      </form>
    </div>
  );
}
