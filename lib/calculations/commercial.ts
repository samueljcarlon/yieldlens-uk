import type { CommercialInput, CommercialResult } from '@/types/property';
import { getVerdictFromScore } from './verdict';
import { generateCommercialRiskFlags } from './riskFlags';

function safe(value: number | undefined): number {
  if (value === undefined || value === null || Number.isNaN(value)) return 0;
  return value;
}

export function calculateCommercialRevenue(input: CommercialInput): number {
  return safe(input.averageSpendPerCustomer) * safe(input.expectedCustomersPerDay) * safe(input.openingDaysPerMonth);
}

export function calculateMonthlyRent(annualRent: number): number {
  if (!annualRent || annualRent <= 0) return 0;
  return annualRent / 12;
}

export function calculateCommercialCostBase(input: CommercialInput): number {
  return (
    calculateMonthlyRent(input.annualRent) +
    safe(input.monthlyStaffCosts) +
    safe(input.monthlyUtilitiesAndOtherCosts) +
    safe(input.monthlyBusinessRates)
  );
}

export function calculateBreakEvenCustomersPerDay(
  costBase: number,
  averageSpend: number,
  openingDays: number
): number | undefined {
  if (!costBase || !averageSpend || !openingDays) return undefined;
  return costBase / averageSpend / openingDays;
}

export function calculateRentBurden(
  monthlyRent: number,
  monthlyRevenue: number
): number | undefined {
  if (!monthlyRent || !monthlyRevenue) return undefined;
  return (monthlyRent / monthlyRevenue) * 100;
}

export function calculateCommercialScore(
  rentBurden?: number,
  breakEven?: number,
  expectedCustomers?: number,
  input?: CommercialInput
): number {
  let score = 0;

  if (rentBurden === undefined) score += 10;
  else if (rentBurden < 8) score += 25;
  else if (rentBurden < 12) score += 20;
  else if (rentBurden < 18) score += 14;
  else if (rentBurden < 25) score += 8;
  else score += 3;

  if (breakEven === undefined || expectedCustomers === undefined || expectedCustomers <= 0) {
    score += 12;
  } else {
    const ratio = breakEven / expectedCustomers;
    if (ratio < 0.5) score += 25;
    else if (ratio < 0.75) score += 19;
    else if (ratio <= 1) score += 13;
    else if (ratio <= 1.3) score += 7;
    else score += 2;
  }

  if (breakEven !== undefined && expectedCustomers !== undefined && expectedCustomers > 0) {
    const margin = expectedCustomers - breakEven;
    if (margin > expectedCustomers * 0.5) score += 15;
    else if (margin > 0) score += 9;
    else score += 3;
  } else {
    score += 7;
  }

  score += 9;
  score += 7;

  let riskScore = 10;
  if (!input?.monthlyStaffCosts) riskScore -= 2;
  if (!input?.monthlyUtilitiesAndOtherCosts) riskScore -= 2;
  if (!input?.monthlyBusinessRates) riskScore -= 2;
  if (rentBurden !== undefined && rentBurden > 18) riskScore -= 2;
  if (breakEven !== undefined && expectedCustomers !== undefined && breakEven > expectedCustomers) riskScore -= 2;

  score += Math.max(0, riskScore);

  return Math.min(100, Math.round(score));
}

export function calculateCommercialResult(input: CommercialInput): CommercialResult {
  const estimatedMonthlyRevenue = calculateCommercialRevenue(input);
  const monthlyRent = calculateMonthlyRent(input.annualRent);
  const estimatedMonthlyCostBase = calculateCommercialCostBase(input);
  const rentBurdenPercentage = calculateRentBurden(monthlyRent, estimatedMonthlyRevenue);
  const breakEvenCustomersPerDay = calculateBreakEvenCustomersPerDay(
    estimatedMonthlyCostBase,
    input.averageSpendPerCustomer,
    input.openingDaysPerMonth
  );

  const score = calculateCommercialScore(
    rentBurdenPercentage,
    breakEvenCustomersPerDay,
    input.expectedCustomersPerDay,
    input
  );

  const verdict = getVerdictFromScore(score);
  const riskFlags = generateCommercialRiskFlags(
    input,
    rentBurdenPercentage,
    breakEvenCustomersPerDay,
    input.expectedCustomersPerDay
  );

  const assumptions = [
    'Revenue is estimated from average spend multiplied by expected customers and opening days.',
    'Local competition score is an indicative placeholder.',
    'Area suitability score is an indicative placeholder.',
    'No live footfall or competitor data is used.',
    'Fit-out costs are noted but not factored into monthly break-even.',
  ];

  const missingDataWarnings: string[] = [];

  if (!input.monthlyStaffCosts) {
    missingDataWarnings.push('Staff costs not provided. Monthly cost base is understated.');
  }

  if (!input.monthlyUtilitiesAndOtherCosts) {
    missingDataWarnings.push('Utilities and other costs not provided. Cost base may be understated.');
  }

  if (!input.monthlyBusinessRates) {
    missingDataWarnings.push('Business rates not provided. Confirm separately.');
  }

  const nextSteps = [
    'Confirm achievable footfall at different times of day.',
    'Check nearby direct competitors.',
    'Confirm business rates, utilities, licensing, and staffing costs.',
    'Stress-test the site using lower customers per day and lower average spend.',
    'Treat this as an initial screen before signing heads of terms or a lease.',
  ];

  return {
    score,
    verdict,
    estimatedMonthlyRevenue,
    monthlyRent,
    estimatedMonthlyCostBase,
    rentBurdenPercentage,
    breakEvenCustomersPerDay,
    expectedCustomersPerDay: input.expectedCustomersPerDay,
    riskFlags,
    assumptions,
    missingDataWarnings,
    nextSteps,
  };
}
