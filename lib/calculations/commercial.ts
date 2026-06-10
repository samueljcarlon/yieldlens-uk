import type { CommercialInput, CommercialResult, RiskFlag } from '@/types/property';
import { getVerdictFromScore } from './verdict';
import { generateCommercialRiskFlags } from './riskFlags';

function safe(value: number | undefined): number {
  if (value === undefined || value === null || Number.isNaN(value)) return 0;
  return value;
}

function hasPositive(value: number | undefined): boolean {
  return value !== undefined && value > 0;
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

export function calculateUpfrontCashNeeded(input: CommercialInput): number {
  return (
    safe(input.fitOutBudget) +
    safe(input.rentDeposit) +
    safe(input.legalFees) +
    safe(input.openingStock) +
    safe(input.otherSetupCosts)
  );
}

export function calculateDownsideRevenuePercentage(input: CommercialInput): number {
  const raw = safe(input.downsideRevenuePercentage);

  if (raw <= 0) return 60;
  if (raw > 100) return 100;

  return raw;
}

export function calculateCommercialScore(
  rentBurden?: number,
  breakEven?: number,
  expectedCustomers?: number,
  input?: CommercialInput,
  survivalMonths?: number,
  survivesSixBadMonths?: boolean
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

  if (survivesSixBadMonths) {
    score += 12;
  } else if (survivalMonths !== undefined && survivalMonths >= 3) {
    score += 7;
  } else if (survivalMonths !== undefined && survivalMonths > 0) {
    score += 4;
  } else {
    score += 2;
  }

  score += 7;

  let riskScore = 10;
  if (!input?.monthlyStaffCosts) riskScore -= 2;
  if (!input?.monthlyUtilitiesAndOtherCosts) riskScore -= 2;
  if (!input?.monthlyBusinessRates) riskScore -= 2;
  if (!input?.startingCash) riskScore -= 2;
  if (input && hasPositive(input.startingCash) && calculateUpfrontCashNeeded(input) > safe(input.startingCash)) {
    riskScore -= 4;
  }
  if (rentBurden !== undefined && rentBurden > 18) riskScore -= 2;
  if (breakEven !== undefined && expectedCustomers !== undefined && breakEven > expectedCustomers) riskScore -= 2;

  score += Math.max(0, riskScore);

  return Math.min(100, Math.round(score));
}

function generateSurvivalRiskFlags({
  upfrontCashNeeded,
  availableCashAfterOpening,
  downsideMonthlyPosition,
  monthlyBurnInDownside,
  survivalMonths,
  survivesSixBadMonths,
  estimatedMonthlyRevenue,
  input,
}: {
  upfrontCashNeeded: number;
  availableCashAfterOpening: number;
  downsideMonthlyPosition: number;
  monthlyBurnInDownside: number;
  survivalMonths?: number;
  survivesSixBadMonths: boolean;
  estimatedMonthlyRevenue: number;
  input: CommercialInput;
}): RiskFlag[] {
  const flags: RiskFlag[] = [];

  if (hasPositive(input.startingCash) && upfrontCashNeeded > safe(input.startingCash)) {
    flags.push({
      severity: 'high',
      message: 'Upfront costs exceed available starting cash before trading begins.',
    });
  }

  if (
    hasPositive(input.startingCash) &&
    availableCashAfterOpening >= 0 &&
    availableCashAfterOpening < estimatedMonthlyRevenue * 0.5
  ) {
    flags.push({
      severity: 'medium',
      message: 'Cash left after opening is thin relative to expected monthly revenue.',
    });
  }

  if (downsideMonthlyPosition < 0) {
    flags.push({
      severity: monthlyBurnInDownside > estimatedMonthlyRevenue * 0.25 ? 'high' : 'medium',
      message: `In the downside case, the site burns about £${Math.round(monthlyBurnInDownside).toLocaleString('en-GB')} per month.`,
    });
  } else {
    flags.push({
      severity: 'info',
      message: 'The downside case does not show monthly cash burn on the current cost assumptions.',
    });
  }

  if (hasPositive(input.startingCash) && survivalMonths !== undefined && survivalMonths < 3) {
    flags.push({
      severity: 'high',
      message: 'Cash buffer covers less than three months in the downside case.',
    });
  } else if (hasPositive(input.startingCash) && survivalMonths !== undefined && survivalMonths < 6) {
    flags.push({
      severity: 'medium',
      message: 'Cash buffer does not cover six weak trading months in the downside case.',
    });
  }

  if (hasPositive(input.startingCash) && !survivesSixBadMonths) {
    flags.push({
      severity: 'medium',
      message: 'The site does not pass the six-month survival test on the current inputs.',
    });
  }

  if (!hasPositive(input.startingCash)) {
    flags.push({
      severity: 'info',
      message: 'Starting cash was not provided, so survival runway is only partially assessed.',
    });
  }

  return flags;
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

  const upfrontCashNeeded = calculateUpfrontCashNeeded(input);
  const availableCashAfterOpening = safe(input.startingCash) - upfrontCashNeeded;
  const downsideRevenuePercentage = calculateDownsideRevenuePercentage(input);
  const downsideMonthlyRevenue = estimatedMonthlyRevenue * (downsideRevenuePercentage / 100);
  const downsideMonthlyPosition = downsideMonthlyRevenue - estimatedMonthlyCostBase;
  const monthlyBurnInDownside = downsideMonthlyPosition < 0 ? Math.abs(downsideMonthlyPosition) : 0;

  const survivalMonths =
    monthlyBurnInDownside > 0
      ? Math.max(0, availableCashAfterOpening) / monthlyBurnInDownside
      : undefined;

  const survivesSixBadMonths =
    availableCashAfterOpening >= 0 &&
    (downsideMonthlyPosition >= 0 || (survivalMonths !== undefined && survivalMonths >= 6));

  const score = calculateCommercialScore(
    rentBurdenPercentage,
    breakEvenCustomersPerDay,
    input.expectedCustomersPerDay,
    input,
    survivalMonths,
    survivesSixBadMonths
  );

  const verdict = getVerdictFromScore(score);

  const riskFlags = [
    ...generateCommercialRiskFlags(
      input,
      rentBurdenPercentage,
      breakEvenCustomersPerDay,
      input.expectedCustomersPerDay
    ),
    ...generateSurvivalRiskFlags({
      upfrontCashNeeded,
      availableCashAfterOpening,
      downsideMonthlyPosition,
      monthlyBurnInDownside,
      survivalMonths,
      survivesSixBadMonths,
      estimatedMonthlyRevenue,
      input,
    }),
  ];

  const assumptions = [
    'Revenue is estimated from average spend multiplied by expected customers and opening days.',
    'The downside case uses the entered downside revenue percentage, or 60% of expected revenue if left blank.',
    'Upfront cash needed includes fit-out, rent deposit, legal fees, opening stock, and other setup costs entered by the user.',
    'Survival runway compares cash left after opening with monthly burn in the downside case.',
    'Local competition score is an indicative placeholder.',
    'Area suitability score is an indicative placeholder.',
    'No live footfall, competitor, business rates, or landlord data is used.',
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

  if (!input.startingCash) {
    missingDataWarnings.push('Starting cash not provided. Six-month survival is only partially assessed.');
  }

  if (!input.rentDeposit) {
    missingDataWarnings.push('Rent deposit not provided. Upfront cash requirement may be understated.');
  }

  if (!input.legalFees) {
    missingDataWarnings.push('Legal or professional fees not provided. Upfront cash requirement may be understated.');
  }

  const nextSteps = [
    'Confirm achievable footfall at different times of day.',
    'Check nearby direct competitors.',
    'Confirm business rates, utilities, licensing, and staffing costs.',
    'Stress-test the site using lower customers per day and lower average spend.',
    'Confirm fit-out, deposit, legal fees, opening stock, and working capital needs before signing.',
    'Ask the landlord or agent about break clauses, repairing obligations, rent review terms, permitted use, and handover condition.',
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
    upfrontCashNeeded,
    availableCashAfterOpening,
    downsideRevenuePercentage,
    downsideMonthlyRevenue,
    downsideMonthlyPosition,
    monthlyBurnInDownside,
    survivalMonths,
    survivesSixBadMonths,
    riskFlags,
    assumptions,
    missingDataWarnings,
    nextSteps,
  };
}
