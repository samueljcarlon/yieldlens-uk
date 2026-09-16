'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  getRemoteReportRequests,
  updateReportRequest,
  type ReportRequest,
} from '@/lib/reportRequests';

import type {
  CarlonAnalyticsEvidenceStatus,
  CarlonAnalyticsIntake,
  CarlonAnalyticsReview,
  CarlonAnalyticsReviewDecision,
} from '@/types/carlonAnalytics';

type RecordLike = Record<string, unknown>;

const evidenceItems = [
  'Agent particulars / listing',
  'Heads of terms',
  'Draft lease',
  'Business rates evidence',
  'Service charge information',
  'Fit-out / equipment quotes',
  'Existing accounts or management figures',
  'Funding terms / loan quote',
];

function asRecord(value: unknown): RecordLike | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as RecordLike)
    : null;
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function formatCurrency(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return 'Not available';
  return `${value.toFixed(1)}%`;
}

function formatNumber(value: number | null, digits = 1): string {
  if (value === null || !Number.isFinite(value)) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: digits,
  }).format(value);
}

function getIntake(request: ReportRequest): CarlonAnalyticsIntake | null {
  const input = asRecord(request.input);
  const raw = input?.carlonAnalyticsIntake;

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;

  return raw as CarlonAnalyticsIntake;
}

function getExistingReview(request: ReportRequest): CarlonAnalyticsReview | null {
  const result = asRecord(request.result);
  const raw = result?.carlonAnalyticsReview;

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;

  return raw as CarlonAnalyticsReview;
}

function getDefaultEvidenceAssessment(
  intake: CarlonAnalyticsIntake
): CarlonAnalyticsReview['evidenceAssessment'] {
  const ready = new Set(intake.documentsReady ?? []);

  return evidenceItems.map((item) => ({
    item,
    status: ready.has(item)
      ? ('assumption' as CarlonAnalyticsEvidenceStatus)
      : ('missing' as CarlonAnalyticsEvidenceStatus),
    note: ready.has(item)
      ? 'Customer marked this evidence as available; analyst verification is still required.'
      : '',
  }));
}

function normaliseReview(
  existing: CarlonAnalyticsReview | null,
  intake: CarlonAnalyticsIntake
): CarlonAnalyticsReview {
  const existingEvidence = Array.isArray(existing?.evidenceAssessment)
    ? existing.evidenceAssessment
    : [];

  const evidenceByItem = new Map(
    existingEvidence.map((item) => [item.item, item])
  );

  const evidenceAssessment = getDefaultEvidenceAssessment(intake).map(
    (defaultItem) => evidenceByItem.get(defaultItem.item) ?? defaultItem
  );

  const keyReasons =
    existing?.keyReasons && existing.keyReasons.length
      ? existing.keyReasons
      : [
          { title: '', detail: '' },
          { title: '', detail: '' },
          { title: '', detail: '' },
        ];

  const negotiationPriorities =
    existing?.negotiationPriorities && existing.negotiationPriorities.length
      ? existing.negotiationPriorities
      : [
          { priority: 1, title: '', rationale: '', target: '' },
          { priority: 2, title: '', rationale: '', target: '' },
          { priority: 3, title: '', rationale: '', target: '' },
        ];

  return {
    version: 'v1',
    status: existing?.status ?? 'draft',
    decision: existing?.decision ?? null,
    executiveSummary: existing?.executiveSummary ?? '',
    keyReasons,
    negotiationPriorities,
    evidenceAssessment,
    analystNotes: existing?.analystNotes ?? '',
    reviewedAt: existing?.reviewedAt ?? null,
    deliveredAt: existing?.deliveredAt ?? null,
  };
}

function getMonthlyDebtService(intake: CarlonAnalyticsIntake): number | null {
  const principal = toNumber(intake.externalFundingAmount);

  if (principal === null) return null;
  if (principal <= 0) return 0;

  const annualRate = toNumber(intake.fundingInterestRate);
  const termMonths = toNumber(intake.fundingTermMonths);

  if (
    annualRate === null ||
    termMonths === null ||
    termMonths <= 0
  ) {
    return null;
  }

  if (annualRate === 0) {
    return principal / termMonths;
  }

  const monthlyRate = annualRate / 100 / 12;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
}

function getUnderwritingMetrics(intake: CarlonAnalyticsIntake) {
  const revenue = toNumber(intake.targetMonthlyRevenue);
  const grossMargin = toNumber(intake.grossMarginPercentage);

  const annualRent = toNumber(intake.annualRent);
  const annualServiceCharge = toNumber(intake.annualServiceCharge);
  const annualInsurance = toNumber(intake.annualInsuranceContribution);
  const annualRates = toNumber(intake.annualBusinessRates);

  const monthlyStaff = toNumber(intake.monthlyStaffCosts);
  const monthlyUtilities = toNumber(intake.monthlyUtilities);
  const monthlyMarketing = toNumber(intake.monthlyMarketing);
  const monthlySoftware = toNumber(
    intake.monthlySoftwareAndProfessionalFees
  );
  const monthlyOther = toNumber(intake.monthlyOtherOperatingCosts);

  const fitOut = toNumber(intake.fitOutBudget);
  const equipment = toNumber(intake.equipmentBudget);
  const openingStock = toNumber(intake.openingStock);
  const legalFees = toNumber(intake.legalAndProfessionalFees);
  const preOpening = toNumber(intake.licencesAndPreOpeningCosts);
  const contingency = toNumber(intake.contingencyBudget);
  const deposit = toNumber(intake.rentDeposit);

  const ownCash = toNumber(intake.startingCash);
  const externalFunding = toNumber(intake.externalFundingAmount);

  const completeSum = (values: Array<number | null>): number | null => {
    if (values.some((value) => value === null)) return null;

    return values.reduce<number>(
      (total, value) => total + (value as number),
      0
    );
  };

  const monthlyRent =
    annualRent === null ? null : annualRent / 12;

  const annualOccupancy = completeSum([
    annualRent,
    annualServiceCharge,
    annualInsurance,
    annualRates,
  ]);

  const monthlyOccupancy =
    annualOccupancy === null ? null : annualOccupancy / 12;

  const grossProfit =
    revenue === null || grossMargin === null
      ? null
      : revenue * (grossMargin / 100);

  const knownMonthlyOperatingCosts = completeSum([
    monthlyStaff,
    monthlyUtilities,
    monthlyMarketing,
    monthlySoftware,
    monthlyOther,
  ]);

  const monthlyDebtService = getMonthlyDebtService(intake);

  const knownCostMonthlyPosition =
    grossProfit === null ||
    monthlyOccupancy === null ||
    knownMonthlyOperatingCosts === null ||
    monthlyDebtService === null
      ? null
      : grossProfit -
        monthlyOccupancy -
        knownMonthlyOperatingCosts -
        monthlyDebtService;

  const revenueDown20Position =
    revenue === null ||
    grossMargin === null ||
    monthlyOccupancy === null ||
    knownMonthlyOperatingCosts === null ||
    monthlyDebtService === null
      ? null
      : revenue * 0.8 * (grossMargin / 100) -
        monthlyOccupancy -
        knownMonthlyOperatingCosts -
        monthlyDebtService;

  const openingCapital = completeSum([
    fitOut,
    equipment,
    openingStock,
    legalFees,
    preOpening,
    contingency,
    deposit,
  ]);

  const fundingAvailable = completeSum([
    ownCash,
    externalFunding,
  ]);

  const openingBuffer =
    fundingAvailable === null || openingCapital === null
      ? null
      : fundingAvailable - openingCapital;

  const rentBurden =
    revenue === null ||
    revenue <= 0 ||
    monthlyRent === null
      ? null
      : (monthlyRent / revenue) * 100;

  const missingCostInputs = [
    ['Service charge', annualServiceCharge],
    ['Insurance contribution', annualInsurance],
    ['Business rates', annualRates],
    ['Staff costs', monthlyStaff],
    ['Utilities', monthlyUtilities],
    ['Marketing', monthlyMarketing],
    ['Software / professional fees', monthlySoftware],
    ['Other operating costs', monthlyOther],
    ['External funding amount', externalFunding],
  ]
    .filter(([, value]) => value === null)
    .map(([label]) => label as string);

  const missingCapitalInputs = [
    ['Fit-out', fitOut],
    ['Equipment', equipment],
    ['Opening stock', openingStock],
    ['Legal / professional fees', legalFees],
    ['Licences / pre-opening', preOpening],
    ['Contingency', contingency],
    ['Rent deposit', deposit],
    ['Own cash', ownCash],
    ['External funding', externalFunding],
  ]
    .filter(([, value]) => value === null)
    .map(([label]) => label as string);

  return {
    revenue,
    grossMargin,
    grossProfit,
    monthlyRent,
    monthlyOccupancy,
    knownMonthlyOperatingCosts,
    monthlyDebtService,
    knownCostMonthlyPosition,
    revenueDown20Position,
    openingCapital,
    fundingAvailable,
    openingBuffer,
    rentBurden,
    missingCostInputs,
    missingCapitalInputs,
  };
}

function FieldCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
        {label}
      </p>
      <div className="mt-1.5 text-sm font-semibold text-stone-900 break-words">
        {value}
      </div>
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
    <div className="mb-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5b7d58]">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-xl font-bold text-stone-950">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100';

const textareaClass =
  'w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-sm leading-6 text-stone-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100';

export default function CarlonAnalyticsUnderwritingWorkspacePage() {
  const params = useParams<{ id?: string | string[] }>();

  const reportRequestId = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw ?? '';
  }, [params]);

  const [adminPin, setAdminPin] = useState('');
  const [request, setRequest] = useState<ReportRequest | null>(null);
  const [intake, setIntake] = useState<CarlonAnalyticsIntake | null>(null);
  const [review, setReview] = useState<CarlonAnalyticsReview | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedPin = window.localStorage.getItem('yieldlensAdminPin');
    if (storedPin) setAdminPin(storedPin);
  }, []);

  const metrics = useMemo(
    () => (intake ? getUnderwritingMetrics(intake) : null),
    [intake]
  );

  const handleLoad = async () => {
    setError('');
    setSaveMessage('');
    setLoading(true);

    try {
      const requests = await getRemoteReportRequests(adminPin);
      const found = requests.find((item) => item.id === reportRequestId);

      if (!found) {
        throw new Error('Underwriting request not found.');
      }

      if (found.requestedReportType !== 'carlon_analytics_underwriting') {
        throw new Error(
          'This report request is not a Carlon Analytics underwriting request.'
        );
      }

      const foundIntake = getIntake(found);

      if (!foundIntake) {
        throw new Error('Carlon Analytics intake data is missing.');
      }

      const existingReview = getExistingReview(found);

      setRequest(found);
      setIntake(foundIntake);
      setReview(normaliseReview(existingReview, foundIntake));
    } catch (err) {
      setRequest(null);
      setIntake(null);
      setReview(null);

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load underwriting request.'
      );
    } finally {
      setLoading(false);
    }
  };

  const setReviewField = <K extends keyof CarlonAnalyticsReview>(
    key: K,
    value: CarlonAnalyticsReview[K]
  ) => {
    setReview((current) =>
      current
        ? {
            ...current,
            [key]: value,
          }
        : current
    );
  };

  const updateKeyReason = (
    index: number,
    key: 'title' | 'detail',
    value: string
  ) => {
    setReview((current) => {
      if (!current) return current;

      const next = [...current.keyReasons];

      next[index] = {
        ...next[index],
        [key]: value,
      };

      return {
        ...current,
        keyReasons: next,
      };
    });
  };

  const addKeyReason = () => {
    setReview((current) =>
      current
        ? {
            ...current,
            keyReasons: [
              ...current.keyReasons,
              { title: '', detail: '' },
            ],
          }
        : current
    );
  };

  const removeKeyReason = (index: number) => {
    setReview((current) => {
      if (!current) return current;

      return {
        ...current,
        keyReasons: current.keyReasons.filter(
          (_, itemIndex) => itemIndex !== index
        ),
      };
    });
  };

  const updatePriority = (
    index: number,
    key: 'title' | 'rationale' | 'target',
    value: string
  ) => {
    setReview((current) => {
      if (!current) return current;

      const next = [...current.negotiationPriorities];

      next[index] = {
        ...next[index],
        [key]: value,
      };

      return {
        ...current,
        negotiationPriorities: next,
      };
    });
  };

  const addPriority = () => {
    setReview((current) => {
      if (!current) return current;

      return {
        ...current,
        negotiationPriorities: [
          ...current.negotiationPriorities,
          {
            priority: current.negotiationPriorities.length + 1,
            title: '',
            rationale: '',
            target: '',
          },
        ],
      };
    });
  };

  const removePriority = (index: number) => {
    setReview((current) => {
      if (!current) return current;

      return {
        ...current,
        negotiationPriorities: current.negotiationPriorities
          .filter((_, itemIndex) => itemIndex !== index)
          .map((item, itemIndex) => ({
            ...item,
            priority: itemIndex + 1,
          })),
      };
    });
  };

  const updateEvidence = (
    index: number,
    patch: Partial<CarlonAnalyticsReview['evidenceAssessment'][number]>
  ) => {
    setReview((current) => {
      if (!current) return current;

      const next = [...current.evidenceAssessment];

      next[index] = {
        ...next[index],
        ...patch,
      };

      return {
        ...current,
        evidenceAssessment: next,
      };
    });
  };

  const saveReview = async (nextStatus: 'draft' | 'reviewed') => {
    if (!request || !review) return;

    setError('');
    setSaveMessage('');

    if (nextStatus === 'reviewed') {
      if (!review.decision) {
        setError('Choose Proceed, Renegotiate or Pause before marking the review complete.');
        return;
      }

      if (!review.executiveSummary.trim()) {
        setError('Add an executive summary before marking the review complete.');
        return;
      }

      const hasKeyReason = review.keyReasons.some(
        (item) => item.title.trim() && item.detail.trim()
      );

      if (!hasKeyReason) {
        setError('Add at least one completed key reason before marking the review complete.');
        return;
      }

      if (review.decision === 'renegotiate') {
        const hasNegotiationPriority = review.negotiationPriorities.some(
          (item) =>
            item.title.trim() &&
            item.rationale.trim() &&
            item.target.trim()
        );

        if (!hasNegotiationPriority) {
          setError('Add at least one completed negotiation priority for a Renegotiate decision.');
          return;
        }
      }
    }

    setSaving(true);

    try {
      const now = new Date().toISOString();

      const nextReview: CarlonAnalyticsReview = {
        ...review,
        status: nextStatus,
        reviewedAt:
          nextStatus === 'reviewed'
            ? now
            : null,
      };

      await updateReportRequest({
        id: request.id,
        adminPin,
        fulfilmentStatus:
          nextStatus === 'reviewed' ? 'ready' : 'in_review',
        carlonAnalyticsReview: nextReview,
      });

      setReview(nextReview);

      setRequest((current) => {
        if (!current) return current;

        const existingResult = asRecord(current.result) ?? {};

        return {
          ...current,
          fulfilmentStatus:
            nextStatus === 'reviewed' ? 'ready' : 'in_review',
          updatedAt: now,
          result: {
            ...existingResult,
            carlonAnalyticsReview: nextReview,
          },
        };
      });

      setSaveMessage(
        nextStatus === 'reviewed'
          ? 'Review marked as reviewed and ready for the client memo.'
          : 'Draft review saved.'
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to save underwriting review.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (!reportRequestId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-sm text-stone-600">
          Missing underwriting request reference.
        </p>
        <Link
          href="/admin/reports"
          className="mt-3 inline-block text-sm font-semibold text-green-800 hover:underline"
        >
          Back to admin reports
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8f3] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="mb-6 flex flex-col gap-4 rounded-[28px] bg-stone-950 p-6 text-white sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-300">
              Carlon Analytics · Internal analyst workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Commercial underwriting review
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-300">
              Review the supplied assumptions and evidence, perform the deeper
              operating and lease analysis, then record the analyst judgement
              that will feed the client memo.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <Link
              href="/admin/reports"
              className="font-medium text-stone-300 hover:text-white"
            >
              ← Back to report requests
            </Link>

            {request ? (
              <span className="text-xs text-stone-400">
                Request {request.id.slice(0, 8).toUpperCase()}
              </span>
            ) : null}
          </div>
        </div>

        {!request ? (
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <SectionTitle
              eyebrow="Admin access"
              title="Load the underwriting request"
              description="Use the same admin PIN as the report-request dashboard."
            />

            <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="password"
                value={adminPin}
                onChange={(event) => setAdminPin(event.target.value)}
                className={inputClass}
                placeholder="Admin PIN"
              />

              <button
                type="button"
                onClick={handleLoad}
                disabled={!adminPin || loading}
                className="shrink-0 rounded-xl bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load request'}
              </button>
            </div>

            {error ? (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            ) : null}
          </div>
        ) : null}

        {request && intake && review && metrics ? (
          <div className="space-y-7">
            <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Case snapshot"
                title="Customer, site and decision stage"
                description="These are the intake facts currently on file. They remain customer-supplied assumptions unless supported by evidence."
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <FieldCard
                  label="Contact"
                  value={intake.contactName || request.email}
                />
                <FieldCard
                  label="Business"
                  value={intake.businessName || intake.businessType}
                />
                <FieldCard
                  label="Business type"
                  value={intake.businessType}
                />
                <FieldCard
                  label="Decision stage"
                  value={intake.currentStage.replaceAll('_', ' ')}
                />
                <FieldCard
                  label="Site"
                  value={
                    intake.siteAddress ||
                    intake.postcode ||
                    request.address ||
                    request.postcode ||
                    'Not provided'
                  }
                />
                <FieldCard
                  label="Target decision date"
                  value={intake.targetDecisionDate || 'Not provided'}
                />
                <FieldCard
                  label="YieldLens score"
                  value={`${request.score}/100`}
                />
                <FieldCard
                  label="YieldLens verdict"
                  value={request.verdictLabel}
                />
              </div>
            </section>

            <div className="grid gap-7 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <div className="space-y-7">
                <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
                  <SectionTitle
                    eyebrow="Lease"
                    title="Commercial commitment"
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FieldCard
                      label="Annual rent"
                      value={formatCurrency(toNumber(intake.annualRent))}
                    />
                    <FieldCard
                      label="Lease term"
                      value={
                        toNumber(intake.leaseTermYears) === null
                          ? 'Not provided'
                          : `${formatNumber(toNumber(intake.leaseTermYears))} years`
                      }
                    />
                    <FieldCard
                      label="Rent-free period"
                      value={
                        toNumber(intake.rentFreeMonths) === null
                          ? 'Not provided'
                          : `${formatNumber(toNumber(intake.rentFreeMonths), 0)} months`
                      }
                    />
                    <FieldCard
                      label="Service charge"
                      value={formatCurrency(toNumber(intake.annualServiceCharge))}
                    />
                    <FieldCard
                      label="Business rates"
                      value={formatCurrency(toNumber(intake.annualBusinessRates))}
                    />
                    <FieldCard
                      label="Insurance contribution"
                      value={formatCurrency(
                        toNumber(intake.annualInsuranceContribution)
                      )}
                    />
                    <FieldCard
                      label="Rent deposit"
                      value={formatCurrency(toNumber(intake.rentDeposit))}
                    />
                    <FieldCard
                      label="Personal guarantee"
                      value={intake.personalGuarantee ?? 'Unknown'}
                    />
                  </div>

                  <div className="mt-4 space-y-3">
                    <FieldCard
                      label="Break clause"
                      value={intake.breakClause || 'Not provided'}
                    />
                    <FieldCard
                      label="Repairing obligations / unusual terms"
                      value={intake.repairingObligations || 'Not provided'}
                    />
                  </div>
                </section>

                <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
                  <SectionTitle
                    eyebrow="Operating economics"
                    title="Business model assumptions"
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FieldCard
                      label="Target monthly revenue"
                      value={formatCurrency(
                        toNumber(intake.targetMonthlyRevenue)
                      )}
                    />
                    <FieldCard
                      label="Gross margin"
                      value={formatPercent(
                        toNumber(intake.grossMarginPercentage)
                      )}
                    />
                    <FieldCard
                      label="Average spend"
                      value={formatCurrency(
                        toNumber(intake.averageSpendPerCustomer)
                      )}
                    />
                    <FieldCard
                      label="Customers / day"
                      value={formatNumber(
                        toNumber(intake.expectedCustomersPerDay)
                      )}
                    />
                    <FieldCard
                      label="Opening days / month"
                      value={formatNumber(
                        toNumber(intake.openingDaysPerMonth),
                        0
                      )}
                    />
                    <FieldCard
                      label="Monthly staff"
                      value={formatCurrency(
                        toNumber(intake.monthlyStaffCosts)
                      )}
                    />
                    <FieldCard
                      label="Monthly utilities"
                      value={formatCurrency(
                        toNumber(intake.monthlyUtilities)
                      )}
                    />
                    <FieldCard
                      label="Monthly marketing"
                      value={formatCurrency(
                        toNumber(intake.monthlyMarketing)
                      )}
                    />
                    <FieldCard
                      label="Software / professional"
                      value={formatCurrency(
                        toNumber(
                          intake.monthlySoftwareAndProfessionalFees
                        )
                      )}
                    />
                    <FieldCard
                      label="Other monthly opex"
                      value={formatCurrency(
                        toNumber(intake.monthlyOtherOperatingCosts)
                      )}
                    />
                  </div>
                </section>

                <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
                  <SectionTitle
                    eyebrow="Capital & funding"
                    title="Opening capital stack"
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FieldCard
                      label="Fit-out"
                      value={formatCurrency(toNumber(intake.fitOutBudget))}
                    />
                    <FieldCard
                      label="Equipment"
                      value={formatCurrency(toNumber(intake.equipmentBudget))}
                    />
                    <FieldCard
                      label="Opening stock"
                      value={formatCurrency(toNumber(intake.openingStock))}
                    />
                    <FieldCard
                      label="Legal / professional"
                      value={formatCurrency(
                        toNumber(intake.legalAndProfessionalFees)
                      )}
                    />
                    <FieldCard
                      label="Licences / pre-opening"
                      value={formatCurrency(
                        toNumber(intake.licencesAndPreOpeningCosts)
                      )}
                    />
                    <FieldCard
                      label="Contingency"
                      value={formatCurrency(
                        toNumber(intake.contingencyBudget)
                      )}
                    />
                    <FieldCard
                      label="Own cash"
                      value={formatCurrency(toNumber(intake.startingCash))}
                    />
                    <FieldCard
                      label="External funding"
                      value={formatCurrency(
                        toNumber(intake.externalFundingAmount)
                      )}
                    />
                    <FieldCard
                      label="Funding rate"
                      value={formatPercent(
                        toNumber(intake.fundingInterestRate)
                      )}
                    />
                    <FieldCard
                      label="Funding term"
                      value={
                        toNumber(intake.fundingTermMonths) === null
                          ? 'Not provided'
                          : `${formatNumber(
                              toNumber(intake.fundingTermMonths),
                              0
                            )} months`
                      }
                    />
                  </div>
                </section>

                <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-6">
                  <SectionTitle
                    eyebrow="Analyst calculation snapshot"
                    title="Deeper operating pressure test"
                    description="Calculated from the supplied intake. Missing optional cost fields are not independently estimated, so these figures must be checked against the evidence before client delivery."
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FieldCard
                      label="Gross profit / month"
                      value={formatCurrency(metrics.grossProfit)}
                    />
                    <FieldCard
                      label="Rent burden"
                      value={formatPercent(metrics.rentBurden)}
                    />
                    <FieldCard
                      label="Occupancy cost / month"
                      value={formatCurrency(metrics.monthlyOccupancy)}
                    />
                    <FieldCard
                      label="Known operating costs / month"
                      value={formatCurrency(
                        metrics.knownMonthlyOperatingCosts
                      )}
                    />
                    <FieldCard
                      label="Estimated debt service / month"
                      value={formatCurrency(metrics.monthlyDebtService)}
                    />
                    <FieldCard
                      label="Known-cost monthly position"
                      value={formatCurrency(
                        metrics.knownCostMonthlyPosition
                      )}
                    />
                    <FieldCard
                      label="Revenue -20% position"
                      value={formatCurrency(
                        metrics.revenueDown20Position
                      )}
                    />
                    <FieldCard
                      label="Opening capital requirement"
                      value={formatCurrency(metrics.openingCapital)}
                    />
                    <FieldCard
                      label="Funding available"
                      value={formatCurrency(metrics.fundingAvailable)}
                    />
                    <FieldCard
                      label="Opening funding buffer"
                      value={formatCurrency(metrics.openingBuffer)}
                    />
                    <FieldCard
                      label="Missing operating inputs"
                      value={
                        metrics.missingCostInputs.length
                          ? metrics.missingCostInputs.join(', ')
                          : 'None'
                      }
                    />
                    <FieldCard
                      label="Missing capital inputs"
                      value={
                        metrics.missingCapitalInputs.length
                          ? metrics.missingCapitalInputs.join(', ')
                          : 'None'
                      }
                    />
                  </div>

                  <p className="mt-4 text-xs leading-5 text-amber-900">
                    A blank field is treated as unknown, not zero. Enter 0 in the
                    customer assumptions where a cost genuinely does not apply.
                    Composite figures remain unavailable until the required
                    inputs are complete.
                  </p>
                </section>

                <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
                  <SectionTitle
                    eyebrow="Customer evidence"
                    title="What the intake says is available"
                  />

                  <div className="flex flex-wrap gap-2">
                    {(intake.documentsReady ?? []).length ? (
                      (intake.documentsReady ?? []).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-800"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-stone-500">
                        No evidence marked as ready.
                      </span>
                    )}
                  </div>

                  <div className="mt-5 space-y-3">
                    <FieldCard
                      label="Evidence notes"
                      value={intake.evidenceNotes || 'Not provided'}
                    />
                    <FieldCard
                      label="Customer concerns"
                      value={intake.keyConcerns || 'Not provided'}
                    />
                    <FieldCard
                      label="Additional notes"
                      value={intake.additionalNotes || 'Not provided'}
                    />
                  </div>
                </section>
              </div>

              <div className="space-y-7">
                <section className="rounded-[28px] border border-green-200 bg-white p-6 shadow-sm xl:sticky xl:top-5">
                  <SectionTitle
                    eyebrow="Analyst review"
                    title="Build the underwriting judgement"
                    description="This section is saved into result_json.carlonAnalyticsReview and becomes the human-reviewed layer used by the client memo."
                  />

                  <div className="mb-6 grid gap-3 sm:grid-cols-3">
                    <FieldCard
                      label="Review status"
                      value={review.status}
                    />
                    <FieldCard
                      label="Fulfilment"
                      value={request.fulfilmentStatus.replaceAll('_', ' ')}
                    />
                    <FieldCard
                      label="Reviewed at"
                      value={
                        review.reviewedAt
                          ? new Date(review.reviewedAt).toLocaleString('en-GB')
                          : 'Not reviewed yet'
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-stone-900">
                      Analyst decision
                    </label>

                    <select
                      value={review.decision ?? ''}
                      onChange={(event) =>
                        setReviewField(
                          'decision',
                          event.target.value
                            ? (event.target
                                .value as CarlonAnalyticsReviewDecision)
                            : null
                        )
                      }
                      className={`${inputClass} mt-2`}
                    >
                      <option value="">Not decided yet</option>
                      <option value="proceed">Proceed</option>
                      <option value="renegotiate">Renegotiate</option>
                      <option value="pause">Pause</option>
                    </select>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-semibold text-stone-900">
                      Executive summary
                    </label>

                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      State the commercial conclusion, the main driver of that
                      conclusion, and what needs to happen next.
                    </p>

                    <textarea
                      rows={7}
                      value={review.executiveSummary}
                      onChange={(event) =>
                        setReviewField(
                          'executiveSummary',
                          event.target.value
                        )
                      }
                      className={`${textareaClass} mt-2`}
                      placeholder="Example: The site can support the proposed lease on the base assumptions, but the opening capital buffer is too thin to recommend signing without..."
                    />
                  </div>

                  <div className="mt-8 border-t border-stone-200 pt-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-stone-950">
                          Key reasons
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-stone-500">
                          The most important reasons supporting the decision.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addKeyReason}
                        className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                      >
                        Add reason
                      </button>
                    </div>

                    <div className="mt-4 space-y-4">
                      {review.keyReasons.map((reason, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                              Reason {index + 1}
                            </p>

                            {review.keyReasons.length > 1 ? (
                              <button
                                type="button"
                                onClick={() => removeKeyReason(index)}
                                className="text-xs font-medium text-red-600 hover:underline"
                              >
                                Remove
                              </button>
                            ) : null}
                          </div>

                          <input
                            value={reason.title}
                            onChange={(event) =>
                              updateKeyReason(
                                index,
                                'title',
                                event.target.value
                              )
                            }
                            className={`${inputClass} mt-3`}
                            placeholder="e.g. Opening capital buffer is insufficient"
                          />

                          <textarea
                            rows={4}
                            value={reason.detail}
                            onChange={(event) =>
                              updateKeyReason(
                                index,
                                'detail',
                                event.target.value
                              )
                            }
                            className={`${textareaClass} mt-3`}
                            placeholder="Explain why this matters and which figures or evidence support it."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-stone-200 pt-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-stone-950">
                          Negotiation priorities
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-stone-500">
                          Rank the commercial changes that would most improve
                          the case.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addPriority}
                        className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                      >
                        Add priority
                      </button>
                    </div>

                    <div className="mt-4 space-y-4">
                      {review.negotiationPriorities.map((priority, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                              Priority {priority.priority}
                            </p>

                            {review.negotiationPriorities.length > 1 ? (
                              <button
                                type="button"
                                onClick={() => removePriority(index)}
                                className="text-xs font-medium text-red-600 hover:underline"
                              >
                                Remove
                              </button>
                            ) : null}
                          </div>

                          <input
                            value={priority.title}
                            onChange={(event) =>
                              updatePriority(
                                index,
                                'title',
                                event.target.value
                              )
                            }
                            className={`${inputClass} mt-3`}
                            placeholder="e.g. Secure a longer rent-free period"
                          />

                          <textarea
                            rows={3}
                            value={priority.rationale}
                            onChange={(event) =>
                              updatePriority(
                                index,
                                'rationale',
                                event.target.value
                              )
                            }
                            className={`${textareaClass} mt-3`}
                            placeholder="Why this change matters."
                          />

                          <textarea
                            rows={2}
                            value={priority.target}
                            onChange={(event) =>
                              updatePriority(
                                index,
                                'target',
                                event.target.value
                              )
                            }
                            className={`${textareaClass} mt-3`}
                            placeholder="What should the customer try to achieve?"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-stone-200 pt-7">
                    <h3 className="font-bold text-stone-950">
                      Evidence assessment
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      Mark evidence as confirmed only after you have actually
                      reviewed it. “Assumption” means the customer has supplied
                      or referenced it but it has not been independently
                      verified.
                    </p>

                    <div className="mt-4 space-y-3">
                      {review.evidenceAssessment.map((item, index) => (
                        <div
                          key={item.item}
                          className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                        >
                          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px]">
                            <div>
                              <p className="text-sm font-semibold text-stone-900">
                                {item.item}
                              </p>
                            </div>

                            <select
                              value={item.status}
                              onChange={(event) =>
                                updateEvidence(index, {
                                  status: event.target
                                    .value as CarlonAnalyticsEvidenceStatus,
                                })
                              }
                              className={inputClass}
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="assumption">Assumption</option>
                              <option value="missing">Missing</option>
                            </select>
                          </div>

                          <textarea
                            rows={2}
                            value={item.note}
                            onChange={(event) =>
                              updateEvidence(index, {
                                note: event.target.value,
                              })
                            }
                            className={`${textareaClass} mt-3`}
                            placeholder="Evidence source, caveat, missing detail or analyst note."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-stone-200 pt-7">
                    <label className="text-sm font-semibold text-stone-900">
                      Internal analyst notes
                    </label>

                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      Internal working notes. These do not need to appear
                      verbatim in the eventual customer memo.
                    </p>

                    <textarea
                      rows={7}
                      value={review.analystNotes}
                      onChange={(event) =>
                        setReviewField('analystNotes', event.target.value)
                      }
                      className={`${textareaClass} mt-2`}
                      placeholder="Working calculations, questions to resolve, evidence follow-ups, professional-review points..."
                    />
                  </div>

                  {error ? (
                    <p className="mt-5 text-sm font-medium text-red-600">
                      {error}
                    </p>
                  ) : null}

                  {saveMessage ? (
                    <p className="mt-5 text-sm font-medium text-green-700">
                      {saveMessage}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => saveReview('draft')}
                      disabled={saving}
                      className="rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save draft'}
                    </button>

                    <button
                      type="button"
                      onClick={() => saveReview('reviewed')}
                      disabled={saving}
                      className="rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Mark reviewed'}
                    </button>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-stone-500">
                    Marking reviewed sets fulfilment to Ready. It does not mark
                    the review as delivered and does not send anything to the
                    customer.
                  </p>
                </section>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
