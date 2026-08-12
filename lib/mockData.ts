import type { ResidentialResult, Submission } from '@/types/property';

export const exampleResidentialResult: ResidentialResult = {
  score: 72,
  verdict: {
    label: 'Worth investigating',
    score: 72,
    colour: 'teal',
  },
  grossYield: 5.2,
  annualRentalIncome: 20800,
  monthlyCashFlow: 148,
  annualCashFlow: 1776,
  annualOwnershipCosts: 19024,
  riskFlags: [
    {
      severity: 'medium',
      message: 'Service charge data is missing, so net yield may be overstated.',
    },
    {
      severity: 'medium',
      message: 'Mortgage cost is missing, so leveraged return cannot be assessed.',
    },
    {
      severity: 'info',
      message: 'Local demand and transport assumptions are indicative placeholders in this MVP.',
    },
  ],
  assumptions: [
    'Local demand score is an indicative placeholder.',
    'Transport and connectivity score is an indicative placeholder.',
    'Price and rent reasonableness uses a placeholder score in this MVP.',
    'No live comparable rental data is used.',
  ],
  missingDataWarnings: [],
  nextSteps: [
    'Confirm comparable rents for similar properties nearby.',
    'Check service charge, ground rent, lease length, and council tax.',
    'Stress-test the result using higher mortgage costs.',
    'Treat this as an initial screen, not a final investment decision.',
  ],
};

export const exampleSubmission: Submission = {
  id: 'example-submission',
  mode: 'residential',
  createdAt: new Date().toISOString(),
  input: {
    address: 'Example London property',
    propertyType: 'Flat',
    bedrooms: 2,
    userObjective: 'Buy-to-let',
    purchasePrice: 400000,
    expectedMonthlyRent: 1733,
    serviceChargeAnnual: 2400,
    mortgageMonthlyCost: 1200,
  },
  result: exampleResidentialResult,
  score: exampleResidentialResult.score,
  verdict: exampleResidentialResult.verdict,
};
