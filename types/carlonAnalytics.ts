export type CarlonAnalyticsStage =
  | 'early_search'
  | 'viewing_sites'
  | 'offer_or_negotiation'
  | 'heads_of_terms'
  | 'solicitors_instructed'
  | 'other';

export interface CarlonAnalyticsIntake {
  contactName: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessType: string;
  currentStage: CarlonAnalyticsStage;
  targetDecisionDate?: string;
  siteAddress?: string;
  postcode?: string;
  listingUrl?: string;
  annualRent: number;
  leaseTermYears?: number;
  rentFreeMonths?: number;
  annualServiceCharge?: number;
  annualInsuranceContribution?: number;
  annualBusinessRates?: number;
  rentDeposit?: number;
  personalGuarantee?: 'yes' | 'no' | 'unknown';
  breakClause?: string;
  repairingObligations?: string;
  targetMonthlyRevenue: number;
  grossMarginPercentage: number;
  averageSpendPerCustomer?: number;
  expectedCustomersPerDay?: number;
  openingDaysPerMonth?: number;
  monthlyStaffCosts?: number;
  monthlyUtilities?: number;
  monthlyMarketing?: number;
  monthlySoftwareAndProfessionalFees?: number;
  monthlyOtherOperatingCosts?: number;
  fitOutBudget?: number;
  equipmentBudget?: number;
  openingStock?: number;
  legalAndProfessionalFees?: number;
  licencesAndPreOpeningCosts?: number;
  contingencyBudget?: number;
  startingCash?: number;
  externalFundingAmount?: number;
  fundingInterestRate?: number;
  fundingTermMonths?: number;
  documentsReady?: string[];
  evidenceNotes?: string;
  keyConcerns?: string;
  additionalNotes?: string;
  sourceSubmissionId?: string;
  sourcePage?: string;
  prefilledFromYieldLens?: boolean;
}
