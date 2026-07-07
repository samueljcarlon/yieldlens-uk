'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type {
  CommercialInput,
  CommercialResult,
  ResidentialResult,
  Submission,
} from '@/types/property';
import { getLatestSubmission } from '@/lib/storage';
import MetricCard from '@/components/MetricCard';
import RiskFlags from '@/components/RiskFlags';
import AssumptionsPanel from '@/components/AssumptionsPanel';
import ScoreCard from '@/components/ScoreCard';
import ReportInterestButton from '@/components/ReportInterestButton';
import ScenarioPanel from '@/components/ScenarioPanel';
import ResultsConversionPanel from '@/components/ResultsConversionPanel';
import FeedbackCtaPanel from '@/components/FeedbackCtaPanel';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import { primaryCtaClass } from '@/components/yieldLensUi';
import { logToolEvent } from '@/lib/logToolEvent';
import {
  getCommercialBusinessTypeInfo,
  getCommercialBusinessTypeLabel,
  getCommercialBusinessTypeValue,
} from '@/lib/commercialBusinessType';
import RentBurdenGauge from '@/components/visuals/RentBurdenGauge';
import OpeningCashWaterfall from '@/components/visuals/OpeningCashWaterfall';
import BreakEvenComparison from '@/components/visuals/BreakEvenComparison';
import DownsideSurvivalCard from '@/components/visuals/DownsideSurvivalCard';

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

function formatMonths(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 'No monthly burn in downside case';
  }

  return `${value.toFixed(1)} months`;
}

function getCommercialBusinessType(submission: Submission): string {
  return getCommercialBusinessTypeValue(submission.input);
}

function getCommercialBusinessTypeInfoForSubmission(submission: Submission) {
  return getCommercialBusinessTypeInfo(getCommercialBusinessType(submission));
}

function getCommercialLocationValue(submission: Submission): string {
  const input = submission.input as Record<string, unknown>;
  const postcode = typeof input.postcode === 'string' && input.postcode.trim() ? input.postcode.trim() : '';
  if (postcode) return postcode;

  const address = typeof input.address === 'string' && input.address.trim() ? input.address.trim() : '';
  if (address) return address;

  return '';
}

function hasCommercialLocation(submission: Submission): boolean {
  return getCommercialLocationValue(submission) !== '';
}

const genericEvidenceChecks = [
  'Comparable rent evidence',
  'Service charge details',
  'Business rates estimate',
  'Fit-out or setup quote',
  'Revenue assumption evidence',
];

const genericQuestions = [
  'Is the service charge fixed, capped, or variable?',
  'Are business rates included in the cost base?',
  'Is there a rent-free period?',
  'Is there a break clause?',
  'What happens at rent review?',
  'Is a personal guarantee required?',
  'What evidence supports the revenue assumption?',
];

const locationEvidenceChecks = [
  'Nearby rent evidence for the area',
  'Business rates or rateable value estimate for the property',
  'Building condition, EPC, and fit-out assumptions',
  'Local service charge and utilities assumptions',
];

const locationQuestions = [
  'What nearby rent evidence supports the quoted rent?',
  'What is the rateable value for the property?',
  'Are there location-specific costs, restrictions, or fit-out issues to check?',
  'Does local footfall or trading pattern support the revenue assumption?',
];

function getLocationSpecificEvidenceChecks(submission: Submission): string[] {
  return hasCommercialLocation(submission) ? locationEvidenceChecks : [];
}

function getLocationSpecificQuestions(submission: Submission): string[] {
  return hasCommercialLocation(submission) ? locationQuestions : [];
}

function getSubmissionTrackingKey(submissionId: string): string {
  return `yieldlens:commercial_check_submitted:${submissionId}`;
}

function hasTrackedCommercialSubmission(submissionId: string): boolean {
  if (typeof window === 'undefined' || !submissionId) return false;

  try {
    return window.localStorage.getItem(getSubmissionTrackingKey(submissionId)) === '1';
  } catch {
    return false;
  }
}

function markCommercialSubmissionTracked(submissionId: string): void {
  if (typeof window === 'undefined' || !submissionId) return;

  try {
    window.localStorage.setItem(getSubmissionTrackingKey(submissionId), '1');
  } catch {
    // Ignore storage errors. Tracking must never break the page.
  }
}

type SummaryTone = 'neutral' | 'strong' | 'caution' | 'critical';

function hasNumber(value?: number): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

function getCommercialVerdictLabel(result: CommercialResult): string {
  const labels = {
    'Strong candidate': 'Stronger case',
    'Worth investigating': 'Worth investigating',
    Marginal: 'Needs caution',
    Weak: 'Fragile',
    Avoid: 'Weaker case',
  };

  return labels[result.verdict.label] ?? result.verdict.label;
}

function hasThinOpeningBuffer(result: CommercialResult): boolean {
  const cashAfterOpening = result.availableCashAfterOpening;

  if (!hasNumber(cashAfterOpening) || cashAfterOpening <= 0) return false;

  if (hasNumber(result.monthlyBurnInDownside) && result.monthlyBurnInDownside > 0) {
    return cashAfterOpening < result.monthlyBurnInDownside * 3;
  }

  if (hasNumber(result.estimatedMonthlyCostBase) && result.estimatedMonthlyCostBase > 0) {
    return cashAfterOpening < result.estimatedMonthlyCostBase;
  }

  return false;
}

function getCommercialVerdictHelper(result: CommercialResult): string {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'Major opening funding issue: upfront cash appears higher than starting cash.';
  }

  if (result.survivesSixBadMonths === false) {
    return 'The pressure-test suggests a fragile case that needs caution.';
  }

  if (hasThinOpeningBuffer(result)) {
    return 'The survival test is stronger, but the opening cash buffer is thin.';
  }

  if (result.survivesSixBadMonths) {
    return 'The pressure-test suggests a stronger case worth investigating.';
  }

  return 'The commercial pressure-test is indicative and needs further evidence.';
}

function getRentBurdenTone(value?: number): SummaryTone {
  if (!hasNumber(value)) return 'neutral';
  if (value >= 18) return 'critical';
  if (value >= 12) return 'caution';
  return 'strong';
}

function getRentBurdenHelper(value?: number): string {
  if (!hasNumber(value)) return 'Rent pressure cannot be assessed from the current inputs.';
  if (value >= 18) return 'High rent pressure suggests the margin case needs caution.';
  if (value >= 12) return 'Rent burden is stretched and worth investigating.';
  return 'Rent looks lighter against the submitted revenue assumption.';
}

function getBreakEvenTone(result: CommercialResult): SummaryTone {
  if (!hasNumber(result.breakEvenCustomersPerDay)) return 'neutral';

  if (
    hasNumber(result.expectedCustomersPerDay) &&
    result.breakEvenCustomersPerDay > result.expectedCustomersPerDay
  ) {
    return 'critical';
  }

  return 'strong';
}

function getBreakEvenHelper(result: CommercialResult): string {
  if (!hasNumber(result.breakEvenCustomersPerDay)) {
    return 'Daily break-even cannot be assessed from the current inputs.';
  }

  if (
    hasNumber(result.expectedCustomersPerDay) &&
    result.breakEvenCustomersPerDay > result.expectedCustomersPerDay
  ) {
    return 'Required volume is above the expected customers per day.';
  }

  return 'Required daily volume sits within the submitted customer assumption.';
}

function getCashAfterOpeningTone(result: CommercialResult): SummaryTone {
  if (!hasNumber(result.availableCashAfterOpening)) return 'neutral';
  if (result.availableCashAfterOpening < 0) return 'critical';
  if (hasThinOpeningBuffer(result)) return 'caution';
  return 'strong';
}

function getCashAfterOpeningHelper(result: CommercialResult): string {
  if (!hasNumber(result.availableCashAfterOpening)) {
    return 'Opening cash buffer is not available from the current inputs.';
  }

  if (result.availableCashAfterOpening < 0) {
    return 'Major opening funding issue before trading begins.';
  }

  if (hasThinOpeningBuffer(result)) {
    return 'Positive, but the buffer is thin against early pressure.';
  }

  return 'Opening cash appears stronger under the submitted assumptions.';
}

function getDownsidePositionTone(result: CommercialResult): SummaryTone {
  if (!hasNumber(result.downsideMonthlyPosition)) return 'neutral';
  return result.downsideMonthlyPosition < 0 ? 'critical' : 'strong';
}

function formatDownsidePosition(result: CommercialResult): string {
  const position = result.downsideMonthlyPosition;

  if (!hasNumber(position)) return 'Not available';
  if (position < 0) return `${formatCurrency(Math.abs(position))} burn`;
  if (position > 0) return `${formatCurrency(position)} surplus`;

  return 'Break-even';
}

function getDownsidePositionHelper(result: CommercialResult): string {
  if (!hasNumber(result.downsideMonthlyPosition)) {
    return 'Downside monthly position is not available from the current inputs.';
  }

  if (result.downsideMonthlyPosition < 0) {
    return 'The downside case suggests monthly cash burn.';
  }

  return 'No monthly burn in the downside case, but opening cash still matters.';
}

function hasDownsideMonthlyBurn(result: CommercialResult): boolean {
  return hasNumber(result.monthlyBurnInDownside) && result.monthlyBurnInDownside > 0;
}

function getSurvivalRunwayValue(result: CommercialResult): string {
  if (!hasDownsideMonthlyBurn(result)) return 'No monthly burn in downside case';

  return hasNumber(result.survivalMonths) ? formatMonths(result.survivalMonths) : 'Not available';
}

function getSurvivalRunwayTone(result: CommercialResult): SummaryTone {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'critical';
  }

  if (!hasDownsideMonthlyBurn(result)) return 'strong';
  if (hasNumber(result.survivalMonths) && result.survivalMonths >= 6) return 'strong';
  if (hasNumber(result.survivalMonths) && result.survivalMonths >= 3) return 'caution';

  return 'critical';
}

function getSurvivalRunwayHelper(result: CommercialResult): string {
  if (!hasDownsideMonthlyBurn(result)) {
    return 'No monthly burn is shown in the downside case.';
  }

  if (hasNumber(result.survivalMonths) && result.survivalMonths >= 6) {
    return 'Cash covers at least six weak trading months.';
  }

  if (hasNumber(result.survivalMonths)) {
    return 'Cash runway is fragile under the downside case.';
  }

  return 'Runway cannot be assessed from the current inputs.';
}

function getSixMonthValue(result: CommercialResult): string {
  return result.survivesSixBadMonths ? 'Pass' : 'Fail';
}

function getSixMonthTone(result: CommercialResult): SummaryTone {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'critical';
  }

  if (result.survivesSixBadMonths) {
    return hasThinOpeningBuffer(result) ? 'caution' : 'strong';
  }

  return 'critical';
}

function getSixMonthHelper(result: CommercialResult): string {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'Fail: opening costs exceed available starting cash.';
  }

  if (result.survivesSixBadMonths) {
    if (!hasDownsideMonthlyBurn(result)) return 'Pass: no monthly burn in downside case.';
    if (hasThinOpeningBuffer(result)) return 'Pass: the cash buffer is thin.';

    return 'Pass: cash covers six weak trading months.';
  }

  return 'Fail: cash does not cover six weak trading months.';
}

function formatOpeningPosition(result: CommercialResult): string {
  const value = result.availableCashAfterOpening;

  if (!hasNumber(value)) return 'Opening position: Not available';
  if (value < 0) return `Opening shortfall: ${formatCurrency(Math.abs(value))}`;

  return `Opening buffer: ${formatCurrency(value)}`;
}

function getCommercialResultSummary(result: CommercialResult): string {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'The free result shows the main pressure point: the opening capital stack is too tight, so the site needs better fit-out, deposit, or landlord terms before it feels comfortable.';
  }

  if (result.survivesSixBadMonths === false) {
    return 'The free result shows that downside trading is fragile, so the case still needs more evidence before commitment.';
  }

  if (
    hasNumber(result.rentBurdenPercentage) &&
    result.rentBurdenPercentage >= 18
  ) {
    return 'The free result shows rent pressure is heavy, so the deal needs stronger evidence around footfall, spend, and lease terms before it feels comfortable.';
  }

  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening > 0) {
    return 'The free result looks workable on paper, but the opening buffer and lease terms still need evidence before the site feels ready.';
  }

  return 'The free result is a useful snapshot, but it still needs evidence around demand, costs, and lease terms.';
}

function getBusinessTypeContextLine(info: ReturnType<typeof getCommercialBusinessTypeInfo>): string {
  switch (info.key) {
    case 'cafe':
      return 'This result uses the cafe assumptions you submitted, including rent, revenue, costs and opening cash.';
    case 'restaurant':
      return 'This result uses the restaurant assumptions you submitted, including rent, revenue, costs and opening cash.';
    case 'salon':
      return 'This result uses the salon assumptions you submitted, including rent, revenue, costs and opening cash.';
    case 'barber_shop':
      return 'This result uses the barber shop assumptions you submitted, including rent, revenue, costs and opening cash.';
    case 'shop_retail':
      return 'This result uses the shop or retail assumptions you submitted, including rent, revenue, costs and opening cash.';
    case 'takeaway':
      return 'This result uses the takeaway assumptions you submitted, including rent, revenue, costs and opening cash.';
    default:
      return 'This result uses the commercial-site assumptions you submitted, including rent, revenue, costs and opening cash.';
  }
}

function getBusinessTypeBridgeLine(info: ReturnType<typeof getCommercialBusinessTypeInfo>): string {
  switch (info.key) {
    case 'cafe':
      return 'For a cafe, it helps organise customer-volume assumptions, quieter-period pressure, staffing, service charge, rates and opening-cash checks.';
    case 'restaurant':
      return 'For a restaurant, it helps organise covers, food-cost assumptions, staffing, fit-out, service charge, rates, downside trading and lease-risk questions.';
    case 'salon':
      return 'For a salon, it helps organise booking capacity, chair or treatment-room utilisation, staffing, fit-out, rates, service charge and lease-risk questions.';
    case 'barber_shop':
      return 'For a barber shop, it helps organise chair utilisation, cuts or appointments per day, average spend, staffing, quieter periods and opening-cash checks.';
    case 'shop_retail':
      return 'For a shop, it helps organise footfall, conversion, stock margin, staffing, service charge, rates and cash tied up in stock.';
    case 'takeaway':
      return 'For a takeaway, it helps organise order volume, average order value, delivery-platform costs, equipment, extraction or ventilation checks, rates and opening-cash pressure.';
    default:
      return 'For this type of commercial site, it helps organise the assumptions, evidence gaps and lease questions that need checking before taking the site further.';
  }
}

function getLocationContextSummary(submission: Submission): string {
  const location = getCommercialLocationValue(submission);

  if (!location) {
    return 'No postcode or address was entered, so local evidence prompts stay general.';
  }

  return `Location context for ${location} helps keep rent evidence, business rates, EPC, and building-condition prompts tied to the submitted site.`;
}

function getCommercialResultReason(result: CommercialResult): string {
  if (hasNumber(result.availableCashAfterOpening) && result.availableCashAfterOpening < 0) {
    return 'The main reason is the opening cash stack: upfront costs appear higher than the starting cash.';
  }

  if (result.survivesSixBadMonths === false) {
    return 'The main reason is downside trading: the site does not comfortably survive a weaker opening period.';
  }

  if (
    hasNumber(result.breakEvenCustomersPerDay) &&
    hasNumber(result.expectedCustomersPerDay) &&
    result.breakEvenCustomersPerDay > result.expectedCustomersPerDay
  ) {
    return 'The main reason is daily trade: the break-even customer target is above the submitted expectation.';
  }

  if (hasThinOpeningBuffer(result)) {
    return 'The main reason is the opening buffer: the deal looks positive, but there is not much cash room after opening.';
  }

  if (hasNumber(result.rentBurdenPercentage) && result.rentBurdenPercentage >= 18) {
    return 'The main reason is rent pressure: rent is taking a large share of the submitted revenue.';
  }

  return 'The main reason is assumption quality: the case looks workable, but the free check still needs evidence.';
}

function getCommercialResultDrivers(result: CommercialResult): string[] {
  const drivers: string[] = [];

  if (hasNumber(result.rentBurdenPercentage)) {
    drivers.push(
      result.rentBurdenPercentage >= 18
        ? 'Rent burden is elevated against the submitted revenue.'
        : result.rentBurdenPercentage >= 12
          ? 'Rent burden is worth watching and may need better terms.'
          : 'Rent burden looks lighter against the submitted revenue.'
    );
  }

  if (
    hasNumber(result.breakEvenCustomersPerDay) &&
    hasNumber(result.expectedCustomersPerDay)
  ) {
    drivers.push(
      result.breakEvenCustomersPerDay > result.expectedCustomersPerDay
        ? 'Break-even customers are above the expected daily trade.'
        : 'Break-even customers sit within the submitted daily trade assumption.'
    );
  }

  if (hasNumber(result.availableCashAfterOpening)) {
    drivers.push(
      result.availableCashAfterOpening < 0
        ? 'Opening cash is short of the upfront cost stack.'
        : hasThinOpeningBuffer(result)
          ? 'Opening cash is positive, but the buffer is thin.'
          : 'Opening cash looks stronger under the submitted assumptions.'
    );
  }

  if (result.survivesSixBadMonths === false) {
    drivers.push('Downside trading does not comfortably survive six weak months.');
  } else if (result.survivesSixBadMonths === true) {
    drivers.push('Downside trading still survives six weak months.');
  }

  if (hasNumber(result.monthlyBurnInDownside) && result.monthlyBurnInDownside > 0) {
    drivers.push('Downside trading creates monthly burn, so the cash runway matters.');
  }

  return drivers.slice(0, 4);
}

function getCommercialAssumptions(submission: Submission): Array<{ label: string; value: string; helper: string }> {
  const result = submission.result as CommercialResult;
  const input = submission.input as CommercialInput;

  return [
    {
      label: 'Monthly rent',
      value: formatCurrency(result.monthlyRent),
      helper: 'Annual rent divided by 12',
    },
    {
      label: 'Expected monthly revenue',
      value: formatCurrency(result.estimatedMonthlyRevenue),
      helper: 'Based on the submitted spend, volume, and opening days',
    },
    {
      label: 'Setup or fit-out cost',
      value: formatCurrency(result.upfrontCashNeeded),
      helper: 'Fit-out, deposit, fees, stock, and setup costs',
    },
    {
      label: 'Starting cash',
      value: formatCurrency(input.startingCash),
      helper: 'Cash available before opening costs are paid',
    },
    {
      label: 'Key lease costs',
      value:
        [
          input.monthlyBusinessRates !== undefined ? `Rates ${formatCurrency(input.monthlyBusinessRates)}` : null,
          input.monthlyUtilitiesAndOtherCosts !== undefined ? `Utilities ${formatCurrency(input.monthlyUtilitiesAndOtherCosts)}` : null,
          input.monthlyStaffCosts !== undefined ? `Staff ${formatCurrency(input.monthlyStaffCosts)}` : null,
        ]
          .filter((value): value is string => typeof value === 'string')
          .join(' · ') || 'Not available',
      helper: 'Shown only where those inputs were entered',
    },
  ];
}

function summaryToneClass(tone: SummaryTone): string {
  const tones = {
    neutral: 'border-stone-200 bg-white',
    strong: 'border-green-200 bg-[#eef4ea]',
    caution: 'border-amber-200 bg-amber-50',
    critical: 'border-red-200 bg-red-50',
  };

  return tones[tone];
}

function summaryValueClass(tone: SummaryTone): string {
  const tones = {
    neutral: 'text-stone-950',
    strong: 'text-green-900',
    caution: 'text-amber-950',
    critical: 'text-red-950',
  };

  return tones[tone];
}

function getLocation(submission: Submission): string {
  const input = submission.input;

  if ('postcode' in input && input.postcode) return input.postcode;
  if ('address' in input && input.address) return input.address;

  return 'No location provided';
}

function getAddress(submission: Submission): string | null {
  const input = submission.input;

  if ('address' in input && input.address) return input.address;

  return null;
}

function getEmail(submission: Submission): string | null {
  const input = submission.input;

  if ('email' in input && input.email) return input.email;

  return null;
}

function getCommercialInputNumber(submission: Submission, key: string): number | undefined {
  const input = submission.input as Record<string, unknown>;
  const value = input[key];

  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
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

function CommercialSummaryCard({
  label,
  value,
  helper,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  helper: string;
  tone?: SummaryTone;
}) {
  return (
    <div className={`border rounded-2xl p-4 shadow-sm ${summaryToneClass(tone)}`}>
      <p className="text-[11px] uppercase tracking-wide text-[var(--yieldlens-muted)] font-semibold mb-1">
        {label}
      </p>

      <p className={`text-xl sm:text-2xl font-bold leading-tight ${summaryValueClass(tone)}`}>
        {value}
      </p>

      <p className="text-xs text-[var(--yieldlens-muted)] mt-2 leading-5">
        {helper}
      </p>
    </div>
  );
}

function CommercialPressureSummary({ submission }: { submission: Submission }) {
  const result = submission.result as CommercialResult;
  const businessTypeInfo = getCommercialBusinessTypeInfoForSubmission(submission);
  const locationValue = getCommercialLocationValue(submission);
  const resultSummary = getCommercialResultSummary(result);
  const resultReason = getCommercialResultReason(result);
  const resultDrivers = getCommercialResultDrivers(result);
  const assumptions = getCommercialAssumptions(submission);
  const businessTypeContextLine = getBusinessTypeContextLine(businessTypeInfo);
  const businessTypeBridgeLine = getBusinessTypeBridgeLine(businessTypeInfo);

  return (
    <section className="mb-8 overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
      <div className="bg-stone-950 px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold mb-3">
              Commercial lease pressure-test summary
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
              Your free result is the fast viability snapshot, not the final decision.
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-7 max-w-3xl">
              It shows the pressure points on rent burden, break-even volume, opening
              cash, and downside survival. The Standard file turns the same numbers
              into a decision memo for negotiation and due diligence before you sign.
            </p>

            <p className="mt-3 text-sm text-stone-200 leading-6 max-w-3xl">
              {resultSummary}
            </p>

            <p className="mt-3 text-sm text-stone-300 leading-6 max-w-3xl">
              {businessTypeInfo.summaryLine}
            </p>

            <p className="mt-3 text-sm text-stone-300 leading-6 max-w-3xl">
              {businessTypeContextLine}
            </p>

            <p className="mt-3 text-sm text-stone-300 leading-6 max-w-3xl">
              {getLocationContextSummary(submission)}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/25 bg-white/0 px-3 py-1.5 text-xs font-semibold text-white">
                Business type {businessTypeInfo.shortLabel}
              </span>
              {locationValue ? (
                <span className="rounded-full border border-white/25 bg-white/0 px-3 py-1.5 text-xs font-semibold text-white">
                  Location {locationValue}
                </span>
              ) : null}
              <span className="rounded-full border border-white/25 bg-white/0 px-3 py-1.5 text-xs font-semibold text-white">
                Rent burden {formatPercent(result.rentBurdenPercentage)}
              </span>
              <span className="rounded-full border border-white/25 bg-white/0 px-3 py-1.5 text-xs font-semibold text-white">
                {businessTypeInfo.breakEvenLabel} {formatNumber(result.breakEvenCustomersPerDay)}
              </span>
              <span className="rounded-full border border-white/25 bg-white/0 px-3 py-1.5 text-xs font-semibold text-white">
                {formatOpeningPosition(result)}
              </span>
              <span className="rounded-full border border-white/25 bg-white/0 px-3 py-1.5 text-xs font-semibold text-white">
                Six-month test {getSixMonthValue(result)}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <TrackedCtaLink
              href="/report"
              className={`${primaryCtaClass} w-full sm:w-auto`}
              eventName="results_report_preview_clicked"
              pagePath="/results"
              ctaLabel="Unlock the £49 Standard file"
              pageType="results"
              metadata={{
                business_type: businessTypeInfo.shortLabel,
                product_area: 'results_paid_bridge',
              }}
            >
              Unlock the £49 Standard file
            </TrackedCtaLink>

              <Link
                href="/check?mode=commercial"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-white/20 bg-white/0 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Edit assumptions or run another check
              </Link>
            </div>

            <p className="mt-3 text-sm text-stone-300 leading-6 max-w-3xl">
              Need help with access after payment or a saved result? Email{' '}
              <a
                href="mailto:yieldlensuk@gmail.com?subject=YieldLens%20support"
                className="font-medium text-[#DCCDA8] hover:underline"
              >
                yieldlensuk@gmail.com
              </a>{' '}
              or use the contact page.
            </p>
          </div>

          <div className="rounded-3xl border border-white/25 bg-white/0 p-4 sm:p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-wide text-[var(--yieldlens-muted)] font-semibold mb-1">
              Verdict
            </p>

            <p className="text-2xl font-bold leading-tight">
              {getCommercialVerdictLabel(result)}
            </p>

            <p className="text-xs text-stone-300 mt-2 leading-5">
              {getCommercialVerdictHelper(result)}
            </p>

            <p className="text-xs text-[var(--yieldlens-muted)] mt-3">
              Indicative score: {result.score}/100
            </p>

            <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#DCCDA8] font-semibold mb-2">
                Main reason
              </p>
              <p className="text-sm text-stone-200 leading-6">
                {resultReason}
              </p>
            </div>

            {resultDrivers.length > 0 && (
              <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#DCCDA8] font-semibold mb-2">
                  What is driving this result
                </p>
                <ul className="space-y-2 text-sm text-stone-200 leading-6">
                  {resultDrivers.map((driver) => (
                    <li key={driver} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#DCCDA8] shrink-0" />
                      <span>{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-y border-stone-200 bg-white px-5 py-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4">
          <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold mb-2">
              What this result tells you
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CommercialSummaryCard
                label="Rent burden"
                value={formatPercent(result.rentBurdenPercentage)}
                helper={getRentBurdenHelper(result.rentBurdenPercentage)}
                tone={getRentBurdenTone(result.rentBurdenPercentage)}
              />

              <CommercialSummaryCard
                label={businessTypeInfo.breakEvenLabel}
                value={formatNumber(result.breakEvenCustomersPerDay)}
                helper={getBreakEvenHelper(result)}
                tone={getBreakEvenTone(result)}
              />

              <CommercialSummaryCard
                label={result.availableCashAfterOpening !== undefined && result.availableCashAfterOpening < 0 ? 'Opening shortfall' : 'Opening buffer'}
                value={(() => {
                  const label = formatOpeningPosition(result);
                  return label.replace('Opening shortfall: ', '').replace('Opening buffer: ', '');
                })()}
                helper={getCashAfterOpeningHelper(result)}
                tone={getCashAfterOpeningTone(result)}
              />

              <CommercialSummaryCard
                label="Six-month test"
                value={getSixMonthValue(result)}
                helper={getSixMonthHelper(result)}
                tone={getSixMonthTone(result)}
              />
            </div>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-[var(--yieldlens-panel)] p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold mb-2">
              Assumptions in this check
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assumptions.map((item) => (
                <div key={item.label} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--yieldlens-muted)] font-semibold mb-1">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-stone-950 leading-tight">{item.value}</p>
                  <p className="mt-2 text-xs text-[var(--yieldlens-muted)] leading-5">
                    {item.helper}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-stone-700 leading-6">
              The result depends on the assumptions entered. Use this as a pressure
              check, not as a valuation or a commitment to sign.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 sm:p-6">
        <RentBurdenGauge rentBurdenPercentage={result.rentBurdenPercentage ?? null} />
        <BreakEvenComparison
          breakEvenCustomersPerDay={result.breakEvenCustomersPerDay}
          expectedCustomersPerDay={result.expectedCustomersPerDay}
        />
        <OpeningCashWaterfall
          startingCash={getCommercialInputNumber(submission, 'startingCash')}
          fitOutBudget={getCommercialInputNumber(submission, 'fitOutBudget')}
          rentDeposit={getCommercialInputNumber(submission, 'rentDeposit')}
          legalFees={getCommercialInputNumber(submission, 'legalFees')}
          openingStock={getCommercialInputNumber(submission, 'openingStock')}
          otherSetupCosts={getCommercialInputNumber(submission, 'otherSetupCosts')}
          upfrontCashNeeded={result.upfrontCashNeeded}
          cashAfterOpening={result.availableCashAfterOpening}
        />
        <DownsideSurvivalCard
          downsideRevenuePercentage={result.downsideRevenuePercentage}
          downsideMonthlyRevenue={result.downsideMonthlyRevenue}
          monthlyCostBase={result.estimatedMonthlyCostBase}
          downsideMonthlyPosition={result.downsideMonthlyPosition}
          monthlyBurnInDownside={result.monthlyBurnInDownside}
          survivalMonths={result.survivalMonths}
          survivesSixBadMonths={result.survivesSixBadMonths}
        />
      </div>
    </section>
  );
}

function CommercialScenarioCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-[var(--yieldlens-muted)] font-medium mb-1">
        {label}
      </p>

      <p className="text-xl font-bold text-stone-900">
        {value}
      </p>

      <p className="text-xs text-[var(--yieldlens-muted)] mt-2 leading-5">
        {helper}
      </p>
    </div>
  );
}

function CommercialScenarioPressureTest({ submission }: { submission: Submission }) {
  const result = submission.result as CommercialResult;
  const businessTypeInfo = getCommercialBusinessTypeInfoForSubmission(submission);
  const evidenceChecks = [
    ...genericEvidenceChecks,
    ...businessTypeInfo.evidenceGaps,
    ...getLocationSpecificEvidenceChecks(submission),
  ];
  const questions = [
    ...genericQuestions,
    ...businessTypeInfo.questions,
    ...getLocationSpecificQuestions(submission),
  ];

  return (
    <div className="rounded-[32px] border border-stone-200 bg-white p-5 sm:p-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-green-700 font-semibold mb-2">
          What the free result tells you
        </p>

        <h2 className="text-xl font-bold text-stone-950 mb-2">
          The quick check is useful, but it needs evidence before commitment
        </h2>

        <p className="text-sm text-[var(--yieldlens-muted)] leading-7 max-w-3xl">
          Use the free result to judge the broad shape of the deal: rent burden, break-even volume,
          opening cash, and downside survival. The paid file is where the lease gets pressure-tested properly.
        </p>

        <p className="mt-3 text-sm text-[var(--yieldlens-muted)] leading-7 max-w-3xl">
          That means the paid file can read as covers, orders, appointments, footfall, stock margin, or chair utilisation rather than only a rent ratio.
        </p>

        {hasCommercialLocation(submission) && (
          <p className="mt-3 text-sm text-[var(--yieldlens-muted)] leading-7 max-w-3xl">
            Because you entered a postcode or address, the file can also keep local rent evidence, business rates, EPC, and building-condition prompts in view.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          label="Rent burden"
          value={formatPercent(result.rentBurdenPercentage)}
          helper={getRentBurdenHelper(result.rentBurdenPercentage)}
        />
        <MetricCard
          label={businessTypeInfo.breakEvenLabel}
          value={formatNumber(result.breakEvenCustomersPerDay)}
          helper={getBreakEvenHelper(result)}
        />
        <MetricCard
          label={result.availableCashAfterOpening !== undefined && result.availableCashAfterOpening < 0 ? 'Opening shortfall' : 'Opening buffer'}
          value={(() => {
            const label = formatOpeningPosition(result);
            return label.replace('Opening shortfall: ', '').replace('Opening buffer: ', '');
          })()}
          helper={getCashAfterOpeningHelper(result)}
        />
        <MetricCard
          label="Six-month test"
          value={getSixMonthValue(result)}
          helper={getSixMonthHelper(result)}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-stone-200 bg-[var(--yieldlens-panel)] p-5">
          <p className="font-semibold text-stone-950 mb-3">
            Evidence to check before relying on this result
          </p>

          <ul className="space-y-2 text-sm text-stone-700 list-disc list-inside">
            {evidenceChecks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-[var(--yieldlens-panel)] p-5">
          <p className="font-semibold text-stone-950 mb-3">
            Questions before taking this lease further
          </p>

          <ol className="space-y-2 text-sm text-stone-700 list-decimal list-inside">
            {questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const hasTrackedSubmission = useRef(false);

  useEffect(() => {
    setSubmission(getLatestSubmission());
  }, []);

  useEffect(() => {
    if (!submission || submission.mode !== 'commercial' || hasTrackedSubmission.current) {
      return;
    }

    if (hasTrackedCommercialSubmission(submission.id)) {
      hasTrackedSubmission.current = true;
      return;
    }

    hasTrackedSubmission.current = true;
    markCommercialSubmissionTracked(submission.id);
    const businessType =
      submission.mode === 'commercial'
        ? getCommercialBusinessTypeLabel(getCommercialBusinessType(submission))
        : '';

    void logToolEvent({
      event_name: 'commercial_check_submitted',
      page_path: '/results',
      tool_name: 'commercial_funnel',
      result_label: 'Commercial check submitted',
      result_band:
        submission.score >= 80
          ? 'score_80_plus'
          : submission.score >= 65
            ? 'score_65_79'
            : submission.score >= 50
              ? 'score_50_64'
              : 'score_below_50',
      metadata: {
        page_path: '/results',
        page_type: 'results',
        funnel_area: 'commercial',
        mode: 'commercial',
        source_page: '/check?mode=commercial',
        postcode: getCommercialLocationValue(submission),
        has_address: hasCommercialLocation(submission),
        ...(businessType ? { business_type: businessType } : {}),
      },
    });
  }, [submission]);

  if (!submission) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 shadow-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
            No commercial check found
          </p>

          <h1 className="text-3xl font-bold text-stone-900 mb-4">
            Run a free commercial check to see your results.
          </h1>

          <p className="text-sm sm:text-base text-[var(--yieldlens-muted)] leading-7 max-w-2xl">
            The results page usually appears after you complete the free check.
            If you landed here directly, start again from the commercial check
            and the saved result will appear once the form is submitted.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/check?mode=commercial"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-[var(--yieldlens-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-all hover:border-[var(--yieldlens-primary-hover)] hover:bg-[var(--yieldlens-primary-hover)]"
            >
              Run a free commercial check
            </Link>
            <Link
              href="/sample-commercial-viability-file"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-[var(--yieldlens-caution)] hover:bg-[#F7F6F3]"
            >
              View sample viability file
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isResidential = submission.mode === 'residential';
  const result = submission.result;
  const commercialResultSummary = isResidential ? undefined : getCommercialResultSummary(result as CommercialResult);
  const email = getEmail(submission);
  const businessTypeInfo = getCommercialBusinessTypeInfoForSubmission(submission);
  const businessTypeBridgeLine = getBusinessTypeBridgeLine(businessTypeInfo);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      <section className="mb-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <div className="bg-gradient-to-r from-stone-950 to-stone-900 px-6 py-7 text-white sm:px-8 sm:py-8">
          <p className="text-xs uppercase tracking-[0.24em] text-green-300 font-semibold mb-3">
            {isResidential ? 'Residential return check' : 'Commercial site check'}
          </p>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-end">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
                Your indicative results
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-7 max-w-3xl">
                {isResidential
                  ? 'A quick screen of the rent, ownership costs, and downside risk.'
                  : 'A quick screen of rent burden, break-even customers, opening cash, downside trading, and lease pressure.'}
              </p>
            </div>

            <div className="w-full rounded-2xl border border-white/25 bg-white/0 p-4 lg:w-auto lg:min-w-[290px]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--yieldlens-muted)] font-medium mb-1">
                Saved check
              </p>

              <p className="text-sm text-white font-medium">
                {formatDate(submission.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="bg-white/0 border border-white/25 text-white px-3 py-1.5 rounded-full">
              {getLocation(submission)}
            </span>

            {getAddress(submission) && (
              <span className="bg-white/0 border border-white/25 text-white px-3 py-1.5 rounded-full">
                {getAddress(submission)}
              </span>
            )}

            {email && (
              <span className="bg-green-500/15 border border-green-400/30 text-green-200 px-3 py-1.5 rounded-full">
                Saved for {email}
              </span>
            )}
          </div>
        </div>
      </section>

      {isResidential ? (
        <div className="mb-8">
          <ScoreCard verdict={submission.verdict} />
        </div>
      ) : (
        <CommercialPressureSummary submission={submission} />
      )}

      {isResidential ? (
        <ResidentialMetrics result={result as ResidentialResult} />
      ) : null}

      <div className="mt-8">
        {isResidential ? (
          <ScenarioPanel submission={submission} />
        ) : (
          <CommercialScenarioPressureTest submission={submission} />
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskFlags flags={result.riskFlags} />
        <AssumptionsPanel assumptions={result.assumptions} />
      </div>

      {result.missingDataWarnings.length > 0 && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <p className="font-semibold text-yellow-900 mb-3">Missing data warnings</p>

          <ul className="space-y-2 text-sm text-yellow-800">
            {result.missingDataWarnings.map((warning) => (
              <li key={warning}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <p className="font-semibold text-stone-900 mb-3">What the £49 file adds</p>

        <p className="text-sm text-[var(--yieldlens-muted)] leading-7 mb-4 max-w-3xl">
          The £49 Standard Commercial Viability File turns this first-pass result into a printable
          decision memo for one selected site. It adds business-type interpretation, location checks to
          verify, stress-test notes, evidence gaps, lease questions and negotiation prompts.
        </p>

        <p className="text-sm text-[var(--yieldlens-muted)] leading-7 mb-4 max-w-3xl">
          {businessTypeBridgeLine}
        </p>

        <ol className="space-y-2 text-sm text-[var(--yieldlens-muted)] list-decimal list-inside">
          {result.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-8 bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-green-700 font-semibold mb-2">
          {isResidential ? 'Commercial file for commercial checks only' : 'Need a decision memo before taking this site further?'}
        </p>

        <h2 className="text-xl font-bold text-stone-900 mb-2">
          {isResidential
            ? 'The commercial viability file is not available for this residential result.'
            : 'Turn this result into a decision memo for negotiation and due diligence.'}
        </h2>

        <p className="text-sm text-stone-700 leading-7 max-w-3xl">
          {isResidential
            ? 'Your residential check has been saved. Use the residential tools and cash flow pages to keep pressure-testing the property, or run the commercial check if you are assessing a lease decision.'
            : 'The Standard Commercial Viability File adds stress tests, negotiation levers, lease questions, due diligence prompts, ranked actions, and a clearer final view before you commit. It is unlocked from this saved result, then opens as a memo you can print or save as PDF.'}
        </p>

        {!isResidential && (
          <p className="mt-3 text-xs text-stone-600 leading-6 max-w-3xl">
            Spend £49 before you spend £2,500+. Professional costs vary. £2,500+ is an indicative comparison, not a guaranteed cost or saving.
          </p>
        )}

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold mb-3">
              Get the negotiation and due diligence file
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <ReportInterestButton submission={submission} />

              {isResidential ? (
                <Link
                  href="/report"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-400 hover:bg-[var(--yieldlens-panel)] sm:w-auto"
                >
                  Turn this result into a decision memo
                </Link>
              ) : (
                <TrackedCtaLink
                  href="/report"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-400 hover:bg-[var(--yieldlens-panel)] sm:w-auto"
                  eventName="results_report_preview_clicked"
                  pagePath="/results"
                  ctaLabel="Get the negotiation and due diligence file"
                  pageType="results"
                  metadata={{
                    business_type: businessTypeInfo.shortLabel,
                    product_area: 'results_paid_bridge',
                  }}
                >
                  Unlock the £49 viability file
                </TrackedCtaLink>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--yieldlens-muted)]">
              {isResidential ? (
                <Link href="/check?mode=residential" className="hover:text-stone-900 hover:underline">
                  Run another residential check
                </Link>
              ) : (
                <>
                  <TrackedCtaLink
                    href="/check?mode=commercial"
                    className="w-full hover:text-stone-900 hover:underline sm:w-auto"
                    eventName="results_run_another_check_clicked"
                    pagePath="/results"
                    ctaLabel="Run another commercial check"
                    pageType="results"
                  >
                    Run another commercial check
                  </TrackedCtaLink>
                </>
              )}
            </div>

            {!isResidential && (
              <p className="mt-4 text-xs text-[var(--yieldlens-muted)] leading-5">
                The Standard file is unlocked from this saved result. After payment, open the memo from the success page and print or save it as PDF.
              </p>
            )}
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-[var(--yieldlens-panel)] p-5 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#5b7d58] font-semibold mb-2">
              Sample viability file proof
            </p>

            <p className="text-sm text-stone-700 leading-7">
              See the redacted sample first to understand how the £49 Standard file turns the free result
              into a usable decision memo that opens from the saved result after payment.
            </p>

            <Link
              href="/sample-commercial-viability-file"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-400 hover:bg-[var(--yieldlens-panel)] sm:w-auto"
            >
              View sample viability file
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <ResultsConversionPanel
            mode={submission.mode}
            score={submission.score}
            verdictLabel={submission.verdict.label}
            resultSummary={commercialResultSummary}
            businessTypeLabel={businessTypeInfo.shortLabel}
          />
        </div>

        {!isResidential ? (
          <div className="mt-8">
            <FeedbackCtaPanel
              eyebrow="Operator feedback"
              title="Testing a real commercial unit?"
              body="If you are comparing a live lease, send a short note about what felt useful, unclear, or missing from the free check. That helps shape the paid file around real operator questions."
              ctaLabel="Email feedback"
              href={`mailto:yieldlensuk@gmail.com?subject=${encodeURIComponent(
                'YieldLens feedback on commercial check'
              )}&body=${encodeURIComponent(
                'Business type:\nType of unit:\nWhat felt useful:\nWhat was unclear:\nWhat would make the £49 Standard file more useful:\n'
              )}`}
              note="Please do not send card details, full lease documents, or other sensitive payment information."
            />
          </div>
        ) : null}
      </div>

      <div className="mt-8 bg-white border border-stone-200 rounded-xl p-5 text-sm text-[var(--yieldlens-muted)]">
        <p className="font-semibold text-stone-900 mb-2">Important disclaimer</p>

        <p>
          YieldLens UK provides indicative decision-support only. It is a commercial
          rent affordability and lease viability tool for UK commercial sites, with
          selected residential checks. It is not financial advice, legal advice, tax
          advice, a valuation, or a substitute for professional due diligence.
        </p>
      </div>
    </div>
  );
}

function ResidentialMetrics({ result }: { result: ResidentialResult }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard
        label="Gross yield"
        value={formatPercent(result.grossYield)}
        helper="Purchase price and expected rent"
      />

      <MetricCard
        label="Annual rent"
        value={formatCurrency(result.annualRentalIncome)}
        helper="Expected monthly rent × 12"
      />

      <MetricCard
        label="Monthly cash flow"
        value={formatCurrency(result.monthlyCashFlow)}
        helper="Rent minus known monthly costs"
      />

      <MetricCard
        label="Annual cash flow"
        value={formatCurrency(result.annualCashFlow)}
        helper="Monthly cash flow × 12"
      />

      <MetricCard
        label="Ownership costs"
        value={formatCurrency(result.annualOwnershipCosts)}
        helper="Known monthly costs × 12"
      />
    </div>
  );
}

function CommercialMetrics({ result }: { result: CommercialResult }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Monthly revenue"
          value={formatCurrency(result.estimatedMonthlyRevenue)}
          helper="Spend × customers × opening days"
        />

        <MetricCard
          label="Monthly rent"
          value={formatCurrency(result.monthlyRent)}
          helper="Annual rent ÷ 12"
        />

        <MetricCard
          label="Rent burden"
          value={formatPercent(result.rentBurdenPercentage)}
          helper="Rent as % of estimated revenue"
        />

        <MetricCard
          label="Cost base"
          value={formatCurrency(result.estimatedMonthlyCostBase)}
          helper="Rent + staff + utilities + rates"
        />

        <MetricCard
          label="Break-even/day"
          value={formatNumber(result.breakEvenCustomersPerDay)}
          helper={`Assumed ${result.expectedCustomersPerDay} per day`}
        />
      </div>

      <div className="bg-stone-950 text-white rounded-2xl p-6 shadow-[0_16px_30px_rgba(15,23,42,0.16)]">
        <p className="text-xs uppercase tracking-widest text-green-300 font-medium mb-2">
          Commercial survival model
        </p>

        <h2 className="text-xl font-bold mb-2">
          Cash detail behind the summary
        </h2>

        <p className="text-sm text-stone-300 leading-6 mb-5">
          These figures show the cash inputs behind the front-page pressure-test:
          upfront requirement, downside revenue, monthly burn or surplus, and runway.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-stone-900">
          <MetricCard
            label="Upfront cash needed"
            value={formatCurrency(result.upfrontCashNeeded)}
            helper="Fit-out, deposit, fees, opening stock, and setup costs"
          />

          <MetricCard
            label="Cash after opening"
            value={formatCurrency(result.availableCashAfterOpening)}
            helper="Starting cash minus upfront cash needed"
          />

          <MetricCard
            label="Downside revenue"
            value={formatCurrency(result.downsideMonthlyRevenue)}
            helper={`${formatPercent(result.downsideRevenuePercentage)} of expected monthly revenue`}
          />

          <MetricCard
            label="Downside burn"
            value={formatCurrency(result.monthlyBurnInDownside)}
            helper="Monthly cash burn in the downside case"
          />

          <MetricCard
            label="Survival runway"
            value={formatMonths(result.survivalMonths)}
            helper="How long cash covers downside burn"
          />

          <MetricCard
            label="Six-month test"
            value={result.survivesSixBadMonths ? 'Pass' : 'Fail'}
            helper="Whether the site survives six weak trading months"
          />
        </div>
      </div>
    </div>
  );
}
