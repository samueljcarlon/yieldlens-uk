export type PropertyMode = 'residential' | 'commercial';

export type VerdictLabel =
  | 'Strong candidate'
  | 'Worth investigating'
  | 'Marginal'
  | 'Weak'
  | 'Avoid';

export interface Verdict {
  label: VerdictLabel;
  score: number;
  colour: 'green' | 'teal' | 'yellow' | 'orange' | 'red';
}

export interface RiskFlag {
  severity: 'high' | 'medium' | 'low' | 'info';
  message: string;
}

export interface ResidentialInput {
  address?: string;
  postcode?: string;
  listingUrl?: string;
  propertyType?: string;
  bedrooms?: number;
  userObjective?: string;
  purchasePrice?: number;
  monthlyRent?: number;
  expectedMonthlyRent?: number;
  serviceChargeAnnual?: number;
  groundRentAnnual?: number;
  mortgageMonthlyCost?: number;
  otherMonthlyCosts?: number;
  email?: string;
}

export interface CommercialInput {
  address?: string;
  postcode?: string;
  listingUrl?: string;
  businessType?: string;
  annualRent: number;
  averageSpendPerCustomer: number;
  expectedCustomersPerDay: number;
  openingDaysPerMonth: number;
  monthlyStaffCosts?: number;
  monthlyUtilitiesAndOtherCosts?: number;
  monthlyBusinessRates?: number;
  fitOutBudget?: number;
  rentDeposit?: number;
  legalFees?: number;
  openingStock?: number;
  otherSetupCosts?: number;
  startingCash?: number;
  downsideRevenuePercentage?: number;
  email?: string;
}

export interface ResidentialResult {
  score: number;
  verdict: Verdict;
  grossYield?: number;
  annualRentalIncome?: number;
  monthlyCashFlow?: number;
  annualCashFlow?: number;
  annualOwnershipCosts?: number;
  riskFlags: RiskFlag[];
  assumptions: string[];
  missingDataWarnings: string[];
  nextSteps: string[];
}

export interface CommercialResult {
  score: number;
  verdict: Verdict;
  estimatedMonthlyRevenue?: number;
  monthlyRent?: number;
  estimatedMonthlyCostBase?: number;
  rentBurdenPercentage?: number;
  breakEvenCustomersPerDay?: number;
  expectedCustomersPerDay?: number;
  upfrontCashNeeded?: number;
  availableCashAfterOpening?: number;
  downsideRevenuePercentage?: number;
  downsideMonthlyRevenue?: number;
  downsideMonthlyPosition?: number;
  monthlyBurnInDownside?: number;
  survivalMonths?: number;
  survivesSixBadMonths?: boolean;
  riskFlags: RiskFlag[];
  assumptions: string[];
  missingDataWarnings: string[];
  nextSteps: string[];
}

export type AnyInput = ResidentialInput | CommercialInput;
export type AnyResult = ResidentialResult | CommercialResult;

export interface Submission {
  id: string;
  mode: PropertyMode;
  createdAt: string;
  input: AnyInput;
  result: AnyResult;
  score: number;
  verdict: Verdict;
}
