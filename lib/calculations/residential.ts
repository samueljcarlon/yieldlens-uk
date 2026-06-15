import type { ResidentialInput, ResidentialResult } from '@/types/property';
import { getVerdictFromScore } from './verdict';
import { generateResidentialRiskFlags } from './riskFlags';

function safe(value: number | undefined): number {
  if (value === undefined || value === null || Number.isNaN(value)) return 0;
  return value;
}

export function calculateAnnualRent(expectedMonthlyRent?: number): number | undefined {
  if (!expectedMonthlyRent || expectedMonthlyRent <= 0) return undefined;
  return expectedMonthlyRent * 12;
}

export function calculateGrossYield(
  annualRent?: number,
  purchasePrice?: number
): number | undefined {
  if (!annualRent || !purchasePrice || purchasePrice <= 0) return undefined;
  return (annualRent / purchasePrice) * 100;
}

export function calculateResidentialCashFlow(input: ResidentialInput): {
  monthlyOwnershipCosts: number | undefined;
  monthlyCashFlow: number | undefined;
  annualCashFlow: number | undefined;
  annualOwnershipCosts: number | undefined;
} {
  const hasAnyCostData =
    input.mortgageMonthlyCost !== undefined ||
    input.serviceChargeAnnual !== undefined ||
    input.groundRentAnnual !== undefined ||
    input.otherMonthlyCosts !== undefined;

  if (!hasAnyCostData) {
    return {
      monthlyOwnershipCosts: undefined,
      monthlyCashFlow: undefined,
      annualCashFlow: undefined,
      annualOwnershipCosts: undefined,
    };
  }

  const monthlyOwnershipCosts =
    safe(input.mortgageMonthlyCost) +
    safe(input.serviceChargeAnnual) / 12 +
    safe(input.groundRentAnnual) / 12 +
    safe(input.otherMonthlyCosts);

  if (!input.expectedMonthlyRent) {
    return {
      monthlyOwnershipCosts,
      monthlyCashFlow: undefined,
      annualCashFlow: undefined,
      annualOwnershipCosts: monthlyOwnershipCosts * 12,
    };
  }

  const monthlyCashFlow = input.expectedMonthlyRent - monthlyOwnershipCosts;

  return {
    monthlyOwnershipCosts,
    monthlyCashFlow,
    annualCashFlow: monthlyCashFlow * 12,
    annualOwnershipCosts: monthlyOwnershipCosts * 12,
  };
}

export function calculateResidentialScore(
  grossYield?: number,
  monthlyCashFlow?: number,
  input?: ResidentialInput
): number {
  let score = 0;

  if (grossYield === undefined) score += 12;
  else if (grossYield >= 7) score += 30;
  else if (grossYield >= 5) score += 24;
  else if (grossYield >= 4) score += 18;
  else if (grossYield >= 3) score += 10;
  else score += 4;

  if (monthlyCashFlow === undefined) score += 10;
  else if (monthlyCashFlow > 300) score += 20;
  else if (monthlyCashFlow >= 100) score += 14;
  else if (monthlyCashFlow >= 0) score += 9;
  else if (monthlyCashFlow >= -250) score += 5;
  else score += 2;

  score += 9;
  score += 10;
  score += 7;

  let riskScore = 10;
  if (input && !input.serviceChargeAnnual) riskScore -= 2;
  if (input && !input.mortgageMonthlyCost) riskScore -= 2;
  if (monthlyCashFlow !== undefined && monthlyCashFlow < 100) riskScore -= 2;
  if (monthlyCashFlow !== undefined && monthlyCashFlow < 0) riskScore -= 3;
  if (grossYield !== undefined && grossYield < 4 && input?.userObjective === 'Buy-to-let') riskScore -= 3;

  score += Math.max(0, riskScore);

  return Math.min(100, Math.round(score));
}

export function calculateResidentialResult(input: ResidentialInput): ResidentialResult {
  const annualRentalIncome = calculateAnnualRent(input.expectedMonthlyRent);
  const grossYield = calculateGrossYield(annualRentalIncome, input.purchasePrice);

  const { monthlyCashFlow, annualCashFlow, annualOwnershipCosts } =
    calculateResidentialCashFlow(input);

  const score = calculateResidentialScore(grossYield, monthlyCashFlow, input);
  const verdict = getVerdictFromScore(score);
  const riskFlags = generateResidentialRiskFlags(input, grossYield, monthlyCashFlow);

  const assumptions = [
    'Local demand score is indicative only.',
    'Transport and connectivity score is indicative only.',
    'Price and rent reasonableness uses an indicative screening score.',
    'No live comparable rental data is used.',
  ];

  const missingDataWarnings: string[] = [];

  if (!input.purchasePrice) {
    missingDataWarnings.push('Purchase price not provided. Yield cannot be calculated.');
  }

  if (!input.expectedMonthlyRent) {
    missingDataWarnings.push('Expected monthly rent not provided. Return cannot be fully assessed.');
  }

  if (!input.mortgageMonthlyCost) {
    missingDataWarnings.push('Mortgage cost not provided. Leveraged cash flow cannot be assessed.');
  }

  const nextSteps = [
    'Confirm comparable rents for similar properties nearby.',
    'Check service charge, ground rent, lease length, and council tax.',
    'Stress-test the result using higher mortgage costs.',
    'Confirm whether the area has sufficient rental demand for the target tenant type.',
    'Treat this as an initial screen, not a final investment decision.',
  ];

  return {
    score,
    verdict,
    grossYield,
    annualRentalIncome,
    monthlyCashFlow,
    annualCashFlow,
    annualOwnershipCosts,
    riskFlags,
    assumptions,
    missingDataWarnings,
    nextSteps,
  };
}
