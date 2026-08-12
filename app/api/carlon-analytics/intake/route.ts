import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { CarlonAnalyticsIntake, CarlonAnalyticsStage } from '@/types/carlonAnalytics';
import type { Submission } from '@/types/property';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const allowedStages = new Set<CarlonAnalyticsStage>([
  'early_search',
  'viewing_sites',
  'offer_or_negotiation',
  'heads_of_terms',
  'solicitors_instructed',
  'other',
]);

const allowedGuaranteeValues = new Set(['yes', 'no', 'unknown']);
const allowedEvidence = new Set([
  'Agent particulars / listing',
  'Heads of terms',
  'Draft lease',
  'Business rates evidence',
  'Service charge information',
  'Fit-out / equipment quotes',
  'Existing accounts or management figures',
  'Funding terms / loan quote',
]);

function cleanText(value: unknown, maxLength = 500): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

function requiredText(value: unknown, field: string, maxLength = 200): string {
  const cleaned = cleanText(value, maxLength);
  if (!cleaned) throw new Error(`${field} is required.`);
  return cleaned;
}

function optionalNumber(
  value: unknown,
  field: string,
  { min = 0, max = 100_000_000 }: { min?: number; max?: number } = {}
): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${field} is invalid.`);
  }
  return value;
}

function requiredNumber(
  value: unknown,
  field: string,
  bounds?: { min?: number; max?: number }
): number {
  const parsed = optionalNumber(value, field, bounds);
  if (parsed === undefined) throw new Error(`${field} is required.`);
  return parsed;
}

function cleanDate(value: unknown): string | undefined {
  const text = cleanText(value, 10);
  if (!text) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new Error('Target decision date is invalid.');
  return text;
}

function cleanSourceSubmission(value: unknown): Submission | null {
  if (!value || typeof value !== 'object') return null;
  const submission = value as Submission;
  if (
    submission.mode !== 'commercial' ||
    typeof submission.id !== 'string' ||
    !submission.input ||
    !submission.result ||
    typeof submission.score !== 'number' ||
    !submission.verdict ||
    typeof submission.verdict.label !== 'string'
  ) {
    return null;
  }
  return submission;
}

function sanitizeIntake(raw: unknown): CarlonAnalyticsIntake {
  if (!raw || typeof raw !== 'object') throw new Error('Invalid underwriting intake.');
  const input = raw as Record<string, unknown>;

  const currentStage = cleanText(input.currentStage, 40) as CarlonAnalyticsStage | undefined;
  if (!currentStage || !allowedStages.has(currentStage)) throw new Error('Current stage is invalid.');

  const personalGuarantee = cleanText(input.personalGuarantee, 10);
  if (personalGuarantee && !allowedGuaranteeValues.has(personalGuarantee)) {
    throw new Error('Personal guarantee value is invalid.');
  }

  const documentsReady = Array.isArray(input.documentsReady)
    ? input.documentsReady
        .filter((item): item is string => typeof item === 'string' && allowedEvidence.has(item))
        .slice(0, allowedEvidence.size)
    : [];

  const siteAddress = cleanText(input.siteAddress, 250);
  const postcode = cleanText(input.postcode, 20)?.toUpperCase();
  if (!siteAddress && !postcode) throw new Error('Site address or postcode is required.');

  return {
    contactName: requiredText(input.contactName, 'Contact name'),
    email: requiredText(input.email, 'Email', 254).toLowerCase(),
    phone: cleanText(input.phone, 50),
    businessName: cleanText(input.businessName, 160),
    businessType: requiredText(input.businessType, 'Business type', 100),
    currentStage,
    targetDecisionDate: cleanDate(input.targetDecisionDate),
    siteAddress,
    postcode,
    listingUrl: cleanText(input.listingUrl, 500),
    annualRent: requiredNumber(input.annualRent, 'Annual rent'),
    leaseTermYears: optionalNumber(input.leaseTermYears, 'Lease term', { min: 0, max: 100 }),
    rentFreeMonths: optionalNumber(input.rentFreeMonths, 'Rent-free period', { min: 0, max: 120 }),
    annualServiceCharge: optionalNumber(input.annualServiceCharge, 'Service charge'),
    annualInsuranceContribution: optionalNumber(input.annualInsuranceContribution, 'Insurance contribution'),
    annualBusinessRates: optionalNumber(input.annualBusinessRates, 'Business rates'),
    rentDeposit: optionalNumber(input.rentDeposit, 'Rent deposit'),
    personalGuarantee: (personalGuarantee as CarlonAnalyticsIntake['personalGuarantee']) || 'unknown',
    breakClause: cleanText(input.breakClause, 500),
    repairingObligations: cleanText(input.repairingObligations, 1500),
    targetMonthlyRevenue: requiredNumber(input.targetMonthlyRevenue, 'Target monthly revenue'),
    grossMarginPercentage: requiredNumber(input.grossMarginPercentage, 'Gross margin', { min: 0, max: 100 }),
    averageSpendPerCustomer: optionalNumber(input.averageSpendPerCustomer, 'Average spend'),
    expectedCustomersPerDay: optionalNumber(input.expectedCustomersPerDay, 'Customers per day'),
    openingDaysPerMonth: optionalNumber(input.openingDaysPerMonth, 'Opening days per month', { min: 0, max: 31 }),
    monthlyStaffCosts: optionalNumber(input.monthlyStaffCosts, 'Staff costs'),
    monthlyUtilities: optionalNumber(input.monthlyUtilities, 'Utilities'),
    monthlyMarketing: optionalNumber(input.monthlyMarketing, 'Marketing'),
    monthlySoftwareAndProfessionalFees: optionalNumber(input.monthlySoftwareAndProfessionalFees, 'Software and professional fees'),
    monthlyOtherOperatingCosts: optionalNumber(input.monthlyOtherOperatingCosts, 'Other operating costs'),
    fitOutBudget: optionalNumber(input.fitOutBudget, 'Fit-out budget'),
    equipmentBudget: optionalNumber(input.equipmentBudget, 'Equipment budget'),
    openingStock: optionalNumber(input.openingStock, 'Opening stock'),
    legalAndProfessionalFees: optionalNumber(input.legalAndProfessionalFees, 'Legal and professional fees'),
    licencesAndPreOpeningCosts: optionalNumber(input.licencesAndPreOpeningCosts, 'Licences and pre-opening costs'),
    contingencyBudget: optionalNumber(input.contingencyBudget, 'Contingency budget'),
    startingCash: optionalNumber(input.startingCash, 'Starting cash'),
    externalFundingAmount: optionalNumber(input.externalFundingAmount, 'External funding'),
    fundingInterestRate: optionalNumber(input.fundingInterestRate, 'Funding interest rate', { min: 0, max: 100 }),
    fundingTermMonths: optionalNumber(input.fundingTermMonths, 'Funding term', { min: 0, max: 600 }),
    documentsReady,
    evidenceNotes: cleanText(input.evidenceNotes, 2000),
    keyConcerns: cleanText(input.keyConcerns, 2000),
    additionalNotes: cleanText(input.additionalNotes, 3000),
    sourceSubmissionId: cleanText(input.sourceSubmissionId, 120),
    sourcePage: cleanText(input.sourcePage, 200),
    prefilledFromYieldLens: input.prefilledFromYieldLens === true,
  };
}

function getLeadQuality(intake: CarlonAnalyticsIntake): 'warm' | 'high' {
  const highIntentStage = new Set([
    'offer_or_negotiation',
    'heads_of_terms',
    'solicitors_instructed',
  ]).has(intake.currentStage);

  if (highIntentStage) return 'high';
  return 'warm';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Low-friction honeypot for obvious automated submissions. Do not create a CRM row.
    if (cleanText(body.website, 500)) {
      return NextResponse.json({ ok: true });
    }

    const intake = sanitizeIntake(body.intake);
    const sourceSubmission = cleanSourceSubmission(body.sourceSubmission);
    const supabase = getSupabaseAdmin();
    const now = new Date().toISOString();
    const customerAccessToken = randomBytes(32).toString('hex');

    const sourceInput =
      sourceSubmission?.input && typeof sourceSubmission.input === 'object'
        ? (sourceSubmission.input as Record<string, unknown>)
        : {};

    const inputJson = {
      ...sourceInput,
      carlonAnalyticsIntake: intake,
      carlonAnalyticsIntakeVersion: 'v0',
      carlonAnalyticsIntakeSubmittedAt: now,
    };

    const resultJson = sourceSubmission?.result ?? {
      source: 'carlon_analytics_intake',
      screened: false,
      note: 'Direct Carlon Analytics intake without a saved YieldLens result.',
    };

    const row = {
      submission_id: sourceSubmission?.id ?? null,
      mode: 'commercial',
      address: intake.siteAddress ?? null,
      postcode: intake.postcode ?? null,
      email: intake.email,
      score: sourceSubmission?.score ?? 0,
      verdict_label: sourceSubmission?.verdict.label ?? 'Not yet screened',
      requested_report_type: 'carlon_analytics_underwriting',
      input_json: inputJson,
      result_json: resultJson,
      status: 'requested',
      fulfilment_status: 'in_review',
      lead_quality: getLeadQuality(intake),
      internal_notes: 'Carlon Analytics V0 digital intake received. Review scope and evidence gaps before quoting.',
      payment_status: 'not_required',
      amount_due_pence: null,
      amount_paid_pence: null,
      currency: 'GBP',
      stripe_checkout_session_id: null,
      stripe_payment_intent_id: null,
      customer_access_token: customerAccessToken,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from('report_requests')
      .insert(row)
      .select('id')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data?.id) return NextResponse.json({ error: 'Failed to create underwriting request.' }, { status: 500 });

    return NextResponse.json({ ok: true, requestId: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
