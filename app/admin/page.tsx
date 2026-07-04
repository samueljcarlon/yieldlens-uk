'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type {
  CommercialResult,
  PropertyMode,
  ResidentialResult,
  Submission,
} from '@/types/property';
import { clearSubmissions, getSubmissions } from '@/lib/storage';
import { getRemoteSubmissions } from '@/lib/remoteSubmissions';
import { getRemoteToolEvents, type ToolEvent } from '@/lib/toolEvents';
import VerdictBadge from '@/components/VerdictBadge';

type ViewSource = 'local' | 'remote';
type VerdictFilter = 'all' | 'Strong candidate' | 'Worth investigating' | 'Marginal' | 'Weak' | 'Avoid';
type AnalyticsRange = '7d' | '30d' | 'all';

interface LeadTag {
  label: string;
  className: string;
}

interface OrganicSourceRow {
  source: string;
  checkStarts: number;
  sampleClicks: number;
  checkoutStarts: number;
  payments: number;
}

interface OrganicUtmRow {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  checkStarts: number;
  checkoutStarts: number;
  payments: number;
}

interface OrganicCtaRow {
  sourcePath: string;
  ctaLabel: string;
  ctaLocation: string;
  destinationPath: string;
  count: number;
}

interface SafeEventRow {
  createdAt: string;
  eventName: string;
  sourcePath: string;
  destinationPath: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  ctaLabel: string;
  ctaLocation: string;
  businessType: string;
}

const organicEventNames = new Set([
  'inbound_page_view',
  'commercial_check_started',
  'commercial_check_submitted',
  'results_viability_file_requested_clicked',
  'checkout_started',
  'payment_completed',
  'paid_file_opened',
  'commercial_home_cta_clicked',
  'commercial_viability_page_cta_clicked',
  'commercial_lead_cta_clicked',
  'commercial_funnel_cta_clicked',
  'rent_burden_page_cta_clicked',
  'break_even_page_cta_clicked',
  'lease_survival_page_cta_clicked',
  'viability_file_page_cta_clicked',
  'conversion_cta_clicked',
]);

const organicCtaEventNames = new Set([
  'commercial_home_cta_clicked',
  'commercial_viability_page_cta_clicked',
  'commercial_lead_cta_clicked',
  'commercial_funnel_cta_clicked',
  'rent_burden_page_cta_clicked',
  'break_even_page_cta_clicked',
  'lease_survival_page_cta_clicked',
  'viability_file_page_cta_clicked',
  'conversion_cta_clicked',
  'results_viability_file_requested_clicked',
]);

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getInputRecord(submission: Submission): Record<string, unknown> {
  return submission.input as Record<string, unknown>;
}

function getTextValue(submission: Submission, key: string): string {
  const value = getInputRecord(submission)[key];
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function getMetadataObject(event: ToolEvent): Record<string, unknown> {
  if (!event.metadata || typeof event.metadata !== 'object' || Array.isArray(event.metadata)) {
    return {};
  }

  return event.metadata as Record<string, unknown>;
}

function getStringMeta(event: ToolEvent, key: string): string {
  const value = getMetadataObject(event)[key];
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function getSafeReferrerHost(referrer: string | null): string {
  if (!referrer || !referrer.trim()) return '';

  const trimmed = referrer.trim();

  try {
    const url = new URL(trimmed);
    return url.hostname || '';
  } catch {
    return '';
  }
}

function getOrganicSourceLabel(event: ToolEvent): string {
  const sourcePath =
    getStringMeta(event, 'source_path') ||
    getStringMeta(event, 'landing_page') ||
    getStringMeta(event, 'current_page_path') ||
    getStringMeta(event, 'page_path');

  if (sourcePath) return sourcePath;

  const referrerPath = getSafeReferrerHost(event.referrer);
  if (referrerPath) return referrerPath;

  return 'unknown';
}

function getOrganicDestinationLabel(event: ToolEvent): string {
  return (
    getStringMeta(event, 'destination_path') ||
    getStringMeta(event, 'destination') ||
    ''
  );
}

function getOrganicCtaKey(event: ToolEvent): string {
  return [
    getStringMeta(event, 'source_path') || getStringMeta(event, 'landing_page') || getStringMeta(event, 'current_page_path') || getStringMeta(event, 'page_path') || 'unknown',
    getStringMeta(event, 'cta_label') || 'unknown',
    getStringMeta(event, 'cta_location') || 'unknown',
    getStringMeta(event, 'destination_path') || getStringMeta(event, 'destination') || 'unknown',
  ].join(' | ');
}

function getEventSafeFields(event: ToolEvent): SafeEventRow {
  return {
    createdAt: event.createdAt,
    eventName: event.eventName,
    sourcePath:
      getStringMeta(event, 'source_path') ||
      getStringMeta(event, 'landing_page') ||
      getStringMeta(event, 'current_page_path') ||
      getStringMeta(event, 'page_path') ||
      getSafeReferrerHost(event.referrer) ||
      'unknown',
    destinationPath: getOrganicDestinationLabel(event) || 'Not set',
    utmSource: getStringMeta(event, 'utm_source') || 'Not set',
    utmMedium: getStringMeta(event, 'utm_medium') || 'Not set',
    utmCampaign: getStringMeta(event, 'utm_campaign') || 'Not set',
    ctaLabel: getStringMeta(event, 'cta_label') || 'Not set',
    ctaLocation: getStringMeta(event, 'cta_location') || 'Not set',
    businessType: getStringMeta(event, 'business_type') || 'Not set',
  };
}

function getLocationLabel(submission: Submission): string {
  return (
    getTextValue(submission, 'postcode') ||
    'No location provided'
  );
}

function getAddressStatusLabel(submission: Submission): string {
  return getTextValue(submission, 'address') ? 'Address captured' : 'No address captured';
}

function getContactStatusLabel(submission: Submission): string {
  return getTextValue(submission, 'email') ? 'Contact captured' : 'No contact captured';
}

function getAddressLabel(submission: Submission): string {
  return getTextValue(submission, 'address') || 'No address provided';
}

function getEmailLabel(submission: Submission): string {
  return getTextValue(submission, 'email') || 'No email provided';
}

function getUseCaseLabel(submission: Submission): string {
  if (submission.mode === 'residential') {
    return getTextValue(submission, 'userObjective') || 'Residential check';
  }

  return getTextValue(submission, 'businessType') || 'Commercial check';
}

function getLeadTags(submission: Submission): LeadTag[] {
  const tags: LeadTag[] = [];
  const email = getTextValue(submission, 'email');

  if (submission.score >= 80) {
    tags.push({
      label: 'Strong candidate',
      className: 'bg-green-50 text-green-800 border-green-200',
    });
  }

  if (submission.score >= 65 && email) {
    tags.push({
      label: 'Hot lead',
      className: 'bg-teal-50 text-teal-800 border-teal-200',
    });
  }

  if (!email) {
    tags.push({
      label: 'No contact',
      className: 'bg-red-50 text-red-800 border-red-200',
    });
  }

  if (submission.mode === 'residential') {
    const result = submission.result as ResidentialResult;

    if (
      typeof result.monthlyCashFlow === 'number' &&
      result.monthlyCashFlow < 100
    ) {
      tags.push({
        label: 'Fragile cash flow',
        className: 'bg-orange-50 text-orange-800 border-orange-200',
      });
    }
  }

  if (submission.mode === 'commercial') {
    const result = submission.result as CommercialResult;

    if (
      typeof result.rentBurdenPercentage === 'number' &&
      result.rentBurdenPercentage > 18
    ) {
      tags.push({
        label: 'High rent burden',
        className: 'bg-orange-50 text-orange-800 border-orange-200',
      });
    }

    if (
      typeof result.breakEvenCustomersPerDay === 'number' &&
      typeof result.expectedCustomersPerDay === 'number' &&
      result.breakEvenCustomersPerDay > result.expectedCustomersPerDay
    ) {
      tags.push({
        label: 'Break-even risk',
        className: 'bg-red-50 text-red-800 border-red-200',
      });
    }
  }

  if (tags.length === 0) {
    tags.push({
      label: 'Review',
      className: 'bg-stone-50 text-stone-700 border-stone-200',
    });
  }

  return tags;
}

function formatFieldValue(value: unknown): string {
  if (value === undefined || value === null || value === '') return 'Not provided';

  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-GB', {
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return String(value);
}

function getCommercialInputRows(input: unknown): Array<{ label: string; value: string }> {
  if (!input || typeof input !== 'object') return [];

  const record = input as Record<string, unknown>;

  return [
    { label: 'Business type', value: formatFieldValue(record.businessType) },
    { label: 'Postcode', value: formatFieldValue(record.postcode) },
    { label: 'Annual rent', value: formatFieldValue(record.annualRent) },
    { label: 'Average spend', value: formatFieldValue(record.averageSpendPerCustomer) },
    { label: 'Expected customers/day', value: formatFieldValue(record.expectedCustomersPerDay) },
    { label: 'Opening days/month', value: formatFieldValue(record.openingDaysPerMonth) },
    { label: 'Monthly staff costs', value: formatFieldValue(record.monthlyStaffCosts) },
    { label: 'Utilities and other costs', value: formatFieldValue(record.monthlyUtilitiesAndOtherCosts) },
    { label: 'Business rates', value: formatFieldValue(record.monthlyBusinessRates) },
    { label: 'Fit-out budget', value: formatFieldValue(record.fitOutBudget) },
    { label: 'Rent deposit', value: formatFieldValue(record.rentDeposit) },
    { label: 'Legal fees', value: formatFieldValue(record.legalFees) },
    { label: 'Opening stock', value: formatFieldValue(record.openingStock) },
    { label: 'Other setup costs', value: formatFieldValue(record.otherSetupCosts) },
    { label: 'Starting cash', value: formatFieldValue(record.startingCash) },
    { label: 'Downside revenue %', value: formatFieldValue(record.downsideRevenuePercentage) },
  ];
}

function getResidentialInputRows(input: unknown): Array<{ label: string; value: string }> {
  if (!input || typeof input !== 'object') return [];

  const record = input as Record<string, unknown>;

  return [
    { label: 'Property type', value: formatFieldValue(record.propertyType) },
    { label: 'Postcode', value: formatFieldValue(record.postcode) },
    { label: 'Bedrooms', value: formatFieldValue(record.bedrooms) },
    { label: 'Purchase price', value: formatFieldValue(record.purchasePrice) },
    { label: 'Monthly rent', value: formatFieldValue(record.monthlyRent) },
    { label: 'Expected monthly rent', value: formatFieldValue(record.expectedMonthlyRent) },
    { label: 'Service charge annual', value: formatFieldValue(record.serviceChargeAnnual) },
    { label: 'Ground rent annual', value: formatFieldValue(record.groundRentAnnual) },
    { label: 'Mortgage monthly cost', value: formatFieldValue(record.mortgageMonthlyCost) },
    { label: 'Other monthly costs', value: formatFieldValue(record.otherMonthlyCosts) },
  ];
}

function getCommercialResultRows(result: unknown): Array<{ label: string; value: string }> {
  if (!result || typeof result !== 'object') return [];

  const record = result as Record<string, unknown>;

  return [
    { label: 'Estimated monthly revenue', value: formatFieldValue(record.estimatedMonthlyRevenue) },
    { label: 'Monthly rent', value: formatFieldValue(record.monthlyRent) },
    { label: 'Estimated monthly cost base', value: formatFieldValue(record.estimatedMonthlyCostBase) },
    { label: 'Rent burden', value: formatFieldValue(record.rentBurdenPercentage) },
    { label: 'Break-even customers/day', value: formatFieldValue(record.breakEvenCustomersPerDay) },
    { label: 'Upfront cash needed', value: formatFieldValue(record.upfrontCashNeeded) },
    { label: 'Cash after opening', value: formatFieldValue(record.availableCashAfterOpening) },
    { label: 'Downside monthly position', value: formatFieldValue(record.downsideMonthlyPosition) },
    { label: 'Monthly burn in downside', value: formatFieldValue(record.monthlyBurnInDownside) },
    { label: 'Survival months', value: formatFieldValue(record.survivalMonths) },
    { label: 'Six-month test', value: formatFieldValue(record.survivesSixBadMonths ? 'Pass' : 'Fail') },
  ];
}

function getResidentialResultRows(result: unknown): Array<{ label: string; value: string }> {
  if (!result || typeof result !== 'object') return [];

  const record = result as Record<string, unknown>;

  return [
    { label: 'Gross yield', value: formatFieldValue(record.grossYield) },
    { label: 'Annual rental income', value: formatFieldValue(record.annualRentalIncome) },
    { label: 'Monthly cash flow', value: formatFieldValue(record.monthlyCashFlow) },
    { label: 'Annual cash flow', value: formatFieldValue(record.annualCashFlow) },
    { label: 'Annual ownership costs', value: formatFieldValue(record.annualOwnershipCosts) },
  ];
}

function renderSummaryRows(rows: Array<{ label: string; value: string }>) {
  if (rows.length === 0) {
    return <p className="text-sm text-stone-500">No summary data available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {rows.map((row) => (
        <div key={row.label} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
          <p className="text-[11px] uppercase tracking-wide text-stone-400">{row.label}</p>
          <p className="font-semibold text-stone-950 break-words">{row.value}</p>
        </div>
      ))}
    </div>
  );
}

function csvEscape(value: unknown): string {
  if (value === undefined || value === null) return '';

  const text =
    typeof value === 'object' ? JSON.stringify(value) : String(value);

  return `"${text.replace(/"/g, '""')}"`;
}

function exportSubmissionsToCsv(submissions: Submission[]) {
  const headers = [
    'createdAt',
    'mode',
    'email',
    'address',
    'postcode',
    'useCase',
    'score',
    'verdict',
    'leadTags',
  ];

  const rows = submissions.map((submission) => {
    const tags = getLeadTags(submission)
      .map((tag) => tag.label)
      .join(', ');

    return [
      submission.createdAt,
      submission.mode,
      getEmailLabel(submission),
      getAddressLabel(submission),
      getTextValue(submission, 'postcode'),
      getUseCaseLabel(submission),
      submission.score,
      submission.verdict.label,
      tags,
    ];
  });

  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => row.map(csvEscape).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `yieldlens-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function formatRate(numerator: number, denominator: number): string {
  if (denominator === 0) return 'Not enough data yet';

  const rate = (numerator / denominator) * 100;
  if (!Number.isFinite(rate)) return 'Not enough data yet';

  return `${rate.toFixed(rate >= 10 ? 0 : 1)}%`;
}

function toDateRange(range: AnalyticsRange): Date | null {
  if (range === 'all') return null;

  const now = new Date();

  if (range === '7d') {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
}

function isOrganicEvent(event: ToolEvent): boolean {
  return organicEventNames.has(event.eventName);
}

function getDateFilteredOrganicEvents(events: ToolEvent[], range: AnalyticsRange): ToolEvent[] {
  const cutoff = toDateRange(range);

  return events.filter((event) => {
    if (!isOrganicEvent(event)) return false;
    if (!cutoff) return true;

    return new Date(event.createdAt) >= cutoff;
  });
}

function countOrganicSourceRows(events: ToolEvent[]): OrganicSourceRow[] {
  const rows = new Map<string, OrganicSourceRow>();

  for (const event of events) {
    const eventName = event.eventName;
    if (
      eventName !== 'commercial_check_started' &&
      eventName !== 'results_viability_file_requested_clicked' &&
      eventName !== 'checkout_started' &&
      eventName !== 'payment_completed'
    ) {
      continue;
    }

    const source = getOrganicSourceLabel(event);
    const row = rows.get(source) ?? {
      source,
      checkStarts: 0,
      sampleClicks: 0,
      checkoutStarts: 0,
      payments: 0,
    };

    if (eventName === 'commercial_check_started') row.checkStarts += 1;
    if (eventName === 'results_viability_file_requested_clicked') row.sampleClicks += 1;
    if (eventName === 'checkout_started') row.checkoutStarts += 1;
    if (eventName === 'payment_completed') row.payments += 1;

    rows.set(source, row);
  }

  return [...rows.values()]
    .sort((a, b) => {
      const aTotal = a.checkStarts + a.sampleClicks + a.checkoutStarts + a.payments;
      const bTotal = b.checkStarts + b.sampleClicks + b.checkoutStarts + b.payments;
      return bTotal - aTotal;
    })
    .slice(0, 12);
}

function countOrganicUtmRows(events: ToolEvent[]): OrganicUtmRow[] {
  const rows = new Map<string, OrganicUtmRow>();

  for (const event of events) {
    if (
      event.eventName !== 'commercial_check_started' &&
      event.eventName !== 'checkout_started' &&
      event.eventName !== 'payment_completed'
    ) {
      continue;
    }

    const utmSource = getStringMeta(event, 'utm_source');
    const utmMedium = getStringMeta(event, 'utm_medium');
    const utmCampaign = getStringMeta(event, 'utm_campaign');

    if (!utmSource && !utmMedium && !utmCampaign) continue;

    const key = [utmSource || 'unknown', utmMedium || 'unknown', utmCampaign || 'unknown'].join(' | ');
    const row = rows.get(key) ?? {
      utmSource: utmSource || 'unknown',
      utmMedium: utmMedium || 'unknown',
      utmCampaign: utmCampaign || 'unknown',
      checkStarts: 0,
      checkoutStarts: 0,
      payments: 0,
    };

    if (event.eventName === 'commercial_check_started') row.checkStarts += 1;
    if (event.eventName === 'checkout_started') row.checkoutStarts += 1;
    if (event.eventName === 'payment_completed') row.payments += 1;

    rows.set(key, row);
  }

  return [...rows.values()]
    .sort((a, b) => {
      const aTotal = a.checkStarts + a.checkoutStarts + a.payments;
      const bTotal = b.checkStarts + b.checkoutStarts + b.payments;
      return bTotal - aTotal;
    })
    .slice(0, 10);
}

function countOrganicCtaRows(events: ToolEvent[]): OrganicCtaRow[] {
  const rows = new Map<string, OrganicCtaRow>();

  for (const event of events) {
    if (!organicCtaEventNames.has(event.eventName)) continue;

    const rowKey = getOrganicCtaKey(event);
    const row = rows.get(rowKey) ?? {
      sourcePath:
        getStringMeta(event, 'source_path') ||
        getStringMeta(event, 'landing_page') ||
        getStringMeta(event, 'current_page_path') ||
        getStringMeta(event, 'page_path') ||
        getSafeReferrerHost(event.referrer) ||
        'unknown',
      ctaLabel: getStringMeta(event, 'cta_label') || 'unknown',
      ctaLocation: getStringMeta(event, 'cta_location') || 'unknown',
      destinationPath: getOrganicDestinationLabel(event) || 'unknown',
      count: 0,
    };

    row.count += 1;
    rows.set(rowKey, row);
  }

  return [...rows.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
}

function getOrganicRecentRows(events: ToolEvent[]): SafeEventRow[] {
  return events.slice(0, 20).map((event) => getEventSafeFields(event));
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [modeFilter, setModeFilter] = useState<'all' | PropertyMode>('all');
  const [verdictFilter, setVerdictFilter] = useState<VerdictFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [source, setSource] = useState<ViewSource>('local');
  const [analyticsEvents, setAnalyticsEvents] = useState<ToolEvent[]>([]);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  const [analyticsRange, setAnalyticsRange] = useState<AnalyticsRange>('30d');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const filteredSubmissions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return submissions.filter((submission) => {
      const matchesMode =
        modeFilter === 'all' || submission.mode === modeFilter;

      const matchesVerdict =
        verdictFilter === 'all' || submission.verdict.label === verdictFilter;

      const searchableText = [
        getEmailLabel(submission),
        getAddressLabel(submission),
        getLocationLabel(submission),
        getUseCaseLabel(submission),
        submission.mode,
        submission.verdict.label,
        String(submission.score),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      return matchesMode && matchesVerdict && matchesSearch;
    });
  }, [submissions, modeFilter, verdictFilter, searchTerm]);

  const counts = useMemo(() => {
    return {
      total: submissions.length,
      residential: submissions.filter((submission) => submission.mode === 'residential').length,
      commercial: submissions.filter((submission) => submission.mode === 'commercial').length,
      hotLeads: submissions.filter((submission) =>
        getLeadTags(submission).some((tag) => tag.label === 'Hot lead')
      ).length,
    };
  }, [submissions]);

  const organicRangeEvents = useMemo(
    () => (analyticsLoaded ? getDateFilteredOrganicEvents(analyticsEvents, analyticsRange) : []),
    [analyticsEvents, analyticsLoaded, analyticsRange]
  );

  const organicSummary = useMemo(() => {
    const checkStarts = organicRangeEvents.filter((event) => event.eventName === 'commercial_check_started').length;
    const checkSubmissions = organicRangeEvents.filter((event) => event.eventName === 'commercial_check_submitted').length;
    const sampleClicks = organicRangeEvents.filter((event) => event.eventName === 'results_viability_file_requested_clicked').length;
    const checkoutStarts = organicRangeEvents.filter((event) => event.eventName === 'checkout_started').length;
    const paymentsCompleted = organicRangeEvents.filter((event) => event.eventName === 'payment_completed').length;
    const paidFilesOpened = organicRangeEvents.filter((event) => event.eventName === 'paid_file_opened').length;

    return {
      checkStarts,
      checkSubmissions,
      sampleClicks,
      checkoutStarts,
      paymentsCompleted,
      paidFilesOpened,
      stageRates: {
        checkToSubmit: formatRate(checkSubmissions, checkStarts),
        submitToCheckout: formatRate(checkoutStarts, checkSubmissions),
        checkoutToPayment: formatRate(paymentsCompleted, checkoutStarts),
        paymentToOpen: formatRate(paidFilesOpened, paymentsCompleted),
      },
    };
  }, [organicRangeEvents]);

  const organicSourceRows = useMemo(
    () => countOrganicSourceRows(organicRangeEvents),
    [organicRangeEvents]
  );

  const organicUtmRows = useMemo(
    () => countOrganicUtmRows(organicRangeEvents),
    [organicRangeEvents]
  );

  const organicCtaRows = useMemo(
    () => countOrganicCtaRows(organicRangeEvents),
    [organicRangeEvents]
  );

  const organicRecentRows = useMemo(
    () => getOrganicRecentRows(organicRangeEvents),
    [organicRangeEvents]
  );

  const handleClearLocal = () => {
    clearSubmissions();
    setSubmissions([]);
    setSelectedSubmission(null);
    setSource('local');
  };

  const handleLoadRemote = async () => {
    setError('');
    setLoading(true);
    setSelectedSubmission(null);
    setAnalyticsLoaded(false);
    setAnalyticsEvents([]);

    try {
      const [submissionsResult, eventsResult] = await Promise.allSettled([
        getRemoteSubmissions(adminPin),
        getRemoteToolEvents(adminPin),
      ]);

      const errors: string[] = [];

      if (submissionsResult.status === 'fulfilled') {
        setSubmissions(submissionsResult.value);
        setSource('remote');
      } else {
        errors.push(
          submissionsResult.reason instanceof Error
            ? submissionsResult.reason.message
            : 'Failed to load submissions.'
        );
      }

      if (eventsResult.status === 'fulfilled') {
        setAnalyticsEvents(eventsResult.value);
        setAnalyticsLoaded(true);
      } else {
        errors.push(
          eventsResult.reason instanceof Error
            ? eventsResult.reason.message
            : 'Failed to load funnel analytics.'
        );
      }

      if (errors.length > 0) {
        setError(errors.join(' '));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load submissions.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const filterButtonClass = (active: boolean) =>
    `px-4 py-2 rounded text-sm border ${
      active
        ? 'bg-teal-700 text-white border-teal-700'
        : 'bg-white text-stone-700 border-stone-300 hover:border-teal-500'
    }`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
          Internal admin
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          Lead dashboard
        </h1>

        <p className="text-sm text-stone-500 max-w-2xl">
          View saved property checks, load remote Supabase submissions and funnel analytics, search leads,
          filter by verdict, and export visible rows as CSV.
        </p>

        <div className="mt-4">
          <Link href="/admin/reports" className="text-sm text-teal-700 font-medium hover:underline">
            View report requests →
          </Link>
        </div>

        <div className="mt-2">
          <Link href="/admin/events" className="text-sm text-teal-700 font-medium hover:underline">
            View tool events →
          </Link>
        </div>

        <div className="mt-2">
          <Link href="/admin/funnel" className="text-sm text-teal-700 font-medium hover:underline">
            View commercial funnel →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Total</p>
          <p className="text-2xl font-bold text-stone-900">{counts.total}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Residential</p>
          <p className="text-2xl font-bold text-stone-900">{counts.residential}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Commercial</p>
          <p className="text-2xl font-bold text-stone-900">{counts.commercial}</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-stone-400">Hot leads</p>
          <p className="text-2xl font-bold text-stone-900">{counts.hotLeads}</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <p className="font-semibold text-stone-900 mb-2">Load remote submissions and analytics</p>

        <p className="text-sm text-stone-500 mb-4">
          Enter the admin PIN to load remote submissions and funnel analytics from Supabase.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="password"
            value={adminPin}
            onChange={(event) => setAdminPin(event.target.value)}
            placeholder="Admin PIN"
            className="border border-stone-300 rounded px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="button"
            onClick={handleLoadRemote}
            disabled={loading || !adminPin}
            className="bg-teal-700 text-white px-5 py-2 rounded text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load remote data'}
          </button>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <p className="text-xs text-stone-400 mt-3">
          Current view: {source === 'remote' ? 'Supabase remote submissions and analytics' : 'local browser submissions'}
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold mb-2">
              Organic funnel
            </p>

            <h2 className="text-xl font-bold text-stone-900 mb-2">
              SEO landing pages into the commercial check, sample file, checkout, payment, and opened file
            </h2>

            <p className="text-sm text-stone-500 max-w-3xl">
              Counts below use tracked events only. They stay focused on the commercial journey and hide raw payment or customer data.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['7d', '30d', 'all'] as AnalyticsRange[]).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setAnalyticsRange(range)}
                className={`px-3 py-2 rounded text-sm border ${
                  analyticsRange === range
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-teal-500'
                }`}
              >
                {range === '7d' ? '7 days' : range === '30d' ? '30 days' : 'All time'}
              </button>
            ))}
          </div>
        </div>

        {!analyticsLoaded ? (
          <div className="mt-6 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-5">
            <p className="text-sm text-stone-600">Load remote data to view organic funnel activity.</p>
          </div>
        ) : organicRangeEvents.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-5">
            <p className="text-sm text-stone-600">No organic funnel activity yet.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Check started</p>
                <p className="text-2xl font-bold text-stone-950 mt-1">{organicSummary.checkStarts}</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Check submitted</p>
                <p className="text-2xl font-bold text-stone-950 mt-1">{organicSummary.checkSubmissions}</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Sample file clicks</p>
                <p className="text-2xl font-bold text-stone-950 mt-1">{organicSummary.sampleClicks}</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Checkout started</p>
                <p className="text-2xl font-bold text-stone-950 mt-1">{organicSummary.checkoutStarts}</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Payments</p>
                <p className="text-2xl font-bold text-stone-950 mt-1">{organicSummary.paymentsCompleted}</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">File opened</p>
                <p className="text-2xl font-bold text-stone-950 mt-1">{organicSummary.paidFilesOpened}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <div className="rounded-xl border border-stone-200 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Started to submitted</p>
                <p className="text-xl font-bold text-stone-950 mt-1">{organicSummary.stageRates.checkToSubmit}</p>
              </div>
              <div className="rounded-xl border border-stone-200 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Submitted to checkout</p>
                <p className="text-xl font-bold text-stone-950 mt-1">{organicSummary.stageRates.submitToCheckout}</p>
              </div>
              <div className="rounded-xl border border-stone-200 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Checkout to payment</p>
                <p className="text-xl font-bold text-stone-950 mt-1">{organicSummary.stageRates.checkoutToPayment}</p>
              </div>
              <div className="rounded-xl border border-stone-200 p-4">
                <p className="text-[11px] uppercase tracking-wide text-stone-400">Payment to file open</p>
                <p className="text-xl font-bold text-stone-950 mt-1">{organicSummary.stageRates.paymentToOpen}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold text-stone-950">Top source pages</p>
                    <p className="text-xs text-stone-500">Source path, landing page, current page, then referrer.</p>
                  </div>
                  <p className="text-xs text-stone-400">{organicSourceRows.length} rows</p>
                </div>

                <div className="space-y-3">
                  {organicSourceRows.length > 0 ? (
                    organicSourceRows.map((row) => (
                      <div key={row.source} className="grid grid-cols-1 sm:grid-cols-5 gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3 text-sm">
                        <div className="sm:col-span-2">
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Page / source</p>
                          <p className="text-stone-900 break-all">{row.source}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Check starts</p>
                          <p className="font-semibold text-stone-950">{row.checkStarts}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Sample clicks</p>
                          <p className="font-semibold text-stone-950">{row.sampleClicks}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Checkout starts</p>
                          <p className="font-semibold text-stone-950">{row.checkoutStarts}</p>
                        </div>
                        <div className="sm:col-span-5">
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Payments</p>
                          <p className="font-semibold text-stone-950">{row.payments}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500">No organic funnel activity yet.</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-stone-200 p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold text-stone-950">UTM summary</p>
                    <p className="text-xs text-stone-500">Source, medium, and campaign combinations with commercial outcomes.</p>
                  </div>
                  <p className="text-xs text-stone-400">{organicUtmRows.length} rows</p>
                </div>

                <div className="space-y-3">
                  {organicUtmRows.length > 0 ? (
                    organicUtmRows.map((row) => (
                      <div key={`${row.utmSource}|${row.utmMedium}|${row.utmCampaign}`} className="grid grid-cols-1 sm:grid-cols-5 gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3 text-sm">
                        <div className="sm:col-span-2">
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">UTM</p>
                          <p className="text-stone-900 break-all">{row.utmSource} / {row.utmMedium} / {row.utmCampaign}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Check starts</p>
                          <p className="font-semibold text-stone-950">{row.checkStarts}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Checkout starts</p>
                          <p className="font-semibold text-stone-950">{row.checkoutStarts}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Payments</p>
                          <p className="font-semibold text-stone-950">{row.payments}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500">No UTM-attributed activity yet.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold text-stone-950">CTA performance</p>
                    <p className="text-xs text-stone-500">Grouped by source path, label, location, and destination.</p>
                  </div>
                  <p className="text-xs text-stone-400">{organicCtaRows.length} rows</p>
                </div>

                <div className="space-y-3">
                  {organicCtaRows.length > 0 ? (
                    organicCtaRows.map((row) => (
                      <div key={`${row.sourcePath}|${row.ctaLabel}|${row.ctaLocation}|${row.destinationPath}`} className="grid grid-cols-1 sm:grid-cols-4 gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3 text-sm">
                        <div className="sm:col-span-2">
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Source path</p>
                          <p className="text-stone-900 break-all">{row.sourcePath}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">CTA label</p>
                          <p className="text-stone-900 break-all">{row.ctaLabel}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">CTA location</p>
                          <p className="text-stone-900 break-all">{row.ctaLocation}</p>
                        </div>
                        <div className="sm:col-span-4">
                          <p className="text-[11px] uppercase tracking-wide text-stone-400">Destination / count</p>
                          <p className="font-semibold text-stone-950 break-all">{row.destinationPath} · {row.count}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500">No CTA activity yet.</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-stone-200 p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold text-stone-950">Recent safe events</p>
                    <p className="text-xs text-stone-500">Safe fields only. No raw metadata or customer data.</p>
                  </div>
                  <p className="text-xs text-stone-400">{organicRecentRows.length} rows</p>
                </div>

                <div className="space-y-3">
                  {organicRecentRows.length > 0 ? (
                    organicRecentRows.map((row) => (
                      <div key={`${row.createdAt}|${row.eventName}`} className="rounded-lg border border-stone-100 bg-stone-50 p-3 text-sm">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-semibold text-stone-950 break-all">{row.eventName}</p>
                          <p className="text-xs text-stone-500">{formatDate(row.createdAt)}</p>
                        </div>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                          <p><span className="text-stone-400">Source:</span> {row.sourcePath}</p>
                          <p><span className="text-stone-400">Destination:</span> {row.destinationPath}</p>
                          <p><span className="text-stone-400">UTM source:</span> {row.utmSource}</p>
                          <p><span className="text-stone-400">UTM medium:</span> {row.utmMedium}</p>
                          <p><span className="text-stone-400">UTM campaign:</span> {row.utmCampaign}</p>
                          <p><span className="text-stone-400">CTA:</span> {row.ctaLabel}</p>
                          <p><span className="text-stone-400">CTA location:</span> {row.ctaLocation}</p>
                          <p><span className="text-stone-400">Business type:</span> {row.businessType}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500">No recent safe events yet.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 p-5 bg-stone-50">
              <p className="font-semibold text-stone-950 mb-2">Detailed funnel view</p>
              <p className="text-sm text-stone-600 mb-4">
                For a deeper windowed breakdown, open the dedicated commercial funnel page.
              </p>
              <Link href="/admin/funnel" className="text-sm text-teal-700 font-medium hover:underline">
                Open commercial funnel →
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          <div className="lg:col-span-2">
            <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
              Search
            </label>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search email, postcode, address, verdict, or score"
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
              Verdict
            </label>

            <select
              value={verdictFilter}
              onChange={(event) => setVerdictFilter(event.target.value as VerdictFilter)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All verdicts</option>
              <option value="Strong candidate">Strong candidate</option>
              <option value="Worth investigating">Worth investigating</option>
              <option value="Marginal">Marginal</option>
              <option value="Weak">Weak</option>
              <option value="Avoid">Avoid</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setModeFilter('all')}
              className={filterButtonClass(modeFilter === 'all')}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setModeFilter('residential')}
              className={filterButtonClass(modeFilter === 'residential')}
            >
              Residential
            </button>

            <button
              type="button"
              onClick={() => setModeFilter('commercial')}
              className={filterButtonClass(modeFilter === 'commercial')}
            >
              Commercial
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => exportSubmissionsToCsv(filteredSubmissions)}
              disabled={filteredSubmissions.length === 0}
              className="bg-stone-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-stone-800 disabled:opacity-50"
            >
              Export visible CSV
            </button>

            {source === 'local' && submissions.length > 0 && (
              <button
                type="button"
                onClick={handleClearLocal}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear local checks
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-stone-400 mt-4">
          Showing {filteredSubmissions.length} of {submissions.length} submissions.
        </p>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            No saved checks found
          </h2>

          <p className="text-sm text-stone-500 mb-5">
            Run a property check, load remote submissions, or adjust your filters.
          </p>

          <Link
            href="/check"
            className="inline-block bg-teal-700 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-teal-800"
          >
            Run a property check
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">
                    {submission.mode === 'residential'
                      ? 'Residential return check'
                      : 'Commercial site check'}
                  </p>

                  <h2 className="text-lg font-semibold text-stone-900">
                    {getLocationLabel(submission)}
                  </h2>

                  <p className="text-sm text-stone-500 mt-1">
                    {getAddressStatusLabel(submission)}
                  </p>

                  <p className="text-sm text-stone-500 mt-1">
                    {getContactStatusLabel(submission)}
                  </p>

                  <p className="text-sm text-stone-500 mt-1">
                    Created {formatDate(submission.createdAt)}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {getLeadTags(submission).map((tag) => (
                      <span
                        key={tag.label}
                        className={`border rounded-full px-3 py-1 text-xs font-medium ${tag.className}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col lg:items-end gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold text-stone-900">
                      {submission.score}
                      <span className="text-sm text-stone-400">/100</span>
                    </p>

                    <VerdictBadge verdict={submission.verdict} />
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedSubmission(submission)}
                    className="text-sm text-teal-700 font-medium hover:underline"
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSubmission && (
        <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
                Submission detail
              </p>

              <h2 className="text-xl font-bold text-stone-900">
                {getLocationLabel(selectedSubmission)}
              </h2>

              <p className="text-sm text-stone-500 mt-1">
                {getContactStatusLabel(selectedSubmission)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSubmission(null)}
              className="text-sm text-stone-500 hover:text-stone-700"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Mode</p>
              <p className="font-semibold text-stone-900 capitalize">
                {selectedSubmission.mode}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Score</p>
              <p className="font-semibold text-stone-900">
                {selectedSubmission.score}/100
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Verdict</p>
              <p className="font-semibold text-stone-900">
                {selectedSubmission.verdict.label}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-stone-900 mb-2">Lead tags</p>
            <div className="flex flex-wrap gap-2">
              {getLeadTags(selectedSubmission).map((tag) => (
                <span
                  key={tag.label}
                  className={`border rounded-full px-3 py-1 text-xs font-medium ${tag.className}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-stone-900 mb-2">Safe input summary</p>
              {selectedSubmission.mode === 'commercial'
                ? renderSummaryRows(getCommercialInputRows(selectedSubmission.input))
                : renderSummaryRows(getResidentialInputRows(selectedSubmission.input))}
            </div>

            <div>
              <p className="font-semibold text-stone-900 mb-2">Safe result summary</p>
              {selectedSubmission.mode === 'commercial'
                ? renderSummaryRows(getCommercialResultRows(selectedSubmission.result))
                : renderSummaryRows(getResidentialResultRows(selectedSubmission.result))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex gap-4">
        <Link href="/check" className="text-sm text-teal-700 font-medium hover:underline">
          Run another check →
        </Link>

        <Link href="/" className="text-sm text-stone-500 hover:text-stone-700">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
