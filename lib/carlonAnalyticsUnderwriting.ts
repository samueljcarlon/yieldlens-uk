import type { CarlonAnalyticsIntake } from '@/types/carlonAnalytics';

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function completeSum(values: Array<number | null>): number | null {
  if (values.some((value) => value === null)) return null;

  return values.reduce<number>(
    (total, value) => total + (value as number),
    0
  );
}

function getMonthlyDebtService(
  intake: CarlonAnalyticsIntake
): number | null {
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
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
}

export function getRunwayMonths(
  openingBuffer: number | null,
  monthlyPosition: number | null
): number | null {
  if (openingBuffer === null || monthlyPosition === null) {
    return null;
  }

  if (monthlyPosition >= 0) {
    return null;
  }

  if (openingBuffer <= 0) {
    return 0;
  }

  return openingBuffer / Math.abs(monthlyPosition);
}

export function calculateCarlonUnderwriting(
  intake: CarlonAnalyticsIntake
) {
  const revenue = toNumber(intake.targetMonthlyRevenue);
  const grossMargin = toNumber(intake.grossMarginPercentage);

  const averageSpend = toNumber(intake.averageSpendPerCustomer);
  const expectedCustomersPerDay = toNumber(
    intake.expectedCustomersPerDay
  );
  const openingDaysPerMonth = toNumber(
    intake.openingDaysPerMonth
  );

  const annualRent = toNumber(intake.annualRent);
  const annualServiceCharge = toNumber(
    intake.annualServiceCharge
  );
  const annualInsurance = toNumber(
    intake.annualInsuranceContribution
  );
  const annualRates = toNumber(intake.annualBusinessRates);

  const monthlyStaff = toNumber(intake.monthlyStaffCosts);
  const monthlyUtilities = toNumber(intake.monthlyUtilities);
  const monthlyMarketing = toNumber(intake.monthlyMarketing);
  const monthlySoftware = toNumber(
    intake.monthlySoftwareAndProfessionalFees
  );
  const monthlyOther = toNumber(
    intake.monthlyOtherOperatingCosts
  );

  const fitOut = toNumber(intake.fitOutBudget);
  const equipment = toNumber(intake.equipmentBudget);
  const openingStock = toNumber(intake.openingStock);
  const legalFees = toNumber(
    intake.legalAndProfessionalFees
  );
  const preOpening = toNumber(
    intake.licencesAndPreOpeningCosts
  );
  const contingency = toNumber(intake.contingencyBudget);
  const deposit = toNumber(intake.rentDeposit);

  const ownCash = toNumber(intake.startingCash);
  const externalFunding = toNumber(
    intake.externalFundingAmount
  );

  const monthlyRent =
    annualRent === null ? null : annualRent / 12;

  const annualOccupancy = completeSum([
    annualRent,
    annualServiceCharge,
    annualInsurance,
    annualRates,
  ]);

  const monthlyOccupancy =
    annualOccupancy === null
      ? null
      : annualOccupancy / 12;

  const grossProfit =
    revenue === null || grossMargin === null
      ? null
      : revenue * (grossMargin / 100);

  const monthlyOperatingCosts = completeSum([
    monthlyStaff,
    monthlyUtilities,
    monthlyMarketing,
    monthlySoftware,
    monthlyOther,
  ]);

  const monthlyDebtService =
    getMonthlyDebtService(intake);

  const positionFor = ({
    revenueMultiplier = 1,
    costMultiplier = 1,
    marginAdjustmentPoints = 0,
  }: {
    revenueMultiplier?: number;
    costMultiplier?: number;
    marginAdjustmentPoints?: number;
  }): number | null => {
    if (
      revenue === null ||
      grossMargin === null ||
      monthlyOccupancy === null ||
      monthlyOperatingCosts === null ||
      monthlyDebtService === null
    ) {
      return null;
    }

    const adjustedMargin = Math.max(
      0,
      grossMargin + marginAdjustmentPoints
    );

    return (
      revenue *
        revenueMultiplier *
        (adjustedMargin / 100) -
      monthlyOccupancy -
      monthlyOperatingCosts * costMultiplier -
      monthlyDebtService
    );
  };

  const baseMonthlyPosition = positionFor({});

  const revenueDown10Position = positionFor({
    revenueMultiplier: 0.9,
  });

  const revenueDown20Position = positionFor({
    revenueMultiplier: 0.8,
  });

  const marginDown5Position = positionFor({
    marginAdjustmentPoints: -5,
  });

  const costsUp10Position = positionFor({
    costMultiplier: 1.1,
  });

  const combinedDownsidePosition = positionFor({
    revenueMultiplier: 0.8,
    marginAdjustmentPoints: -5,
    costMultiplier: 1.1,
  });

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
    openingCapital === null ||
    fundingAvailable === null
      ? null
      : fundingAvailable - openingCapital;

  const rentBurden =
    revenue === null ||
    revenue <= 0 ||
    monthlyRent === null
      ? null
      : (monthlyRent / revenue) * 100;

  const impliedMonthlyRevenue =
    averageSpend === null ||
    expectedCustomersPerDay === null ||
    openingDaysPerMonth === null
      ? null
      : averageSpend *
        expectedCustomersPerDay *
        openingDaysPerMonth;

  const revenueConsistencyDifference =
    revenue === null ||
    impliedMonthlyRevenue === null
      ? null
      : impliedMonthlyRevenue - revenue;

  const revenueConsistencyDifferencePct =
    revenue === null ||
    revenue <= 0 ||
    revenueConsistencyDifference === null
      ? null
      : (revenueConsistencyDifference / revenue) * 100;

  const revenueConsistencyFlag =
    revenueConsistencyDifferencePct !== null &&
    Math.abs(revenueConsistencyDifferencePct) >= 5;

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

    impliedMonthlyRevenue,
    revenueConsistencyDifference,
    revenueConsistencyDifferencePct,
    revenueConsistencyFlag,

    monthlyRent,
    monthlyOccupancy,
    monthlyOperatingCosts,
    monthlyDebtService,

    baseMonthlyPosition,
    revenueDown10Position,
    revenueDown20Position,
    marginDown5Position,
    costsUp10Position,
    combinedDownsidePosition,

    openingCapital,
    fundingAvailable,
    openingBuffer,
    rentBurden,

    revenueDown20RunwayMonths: getRunwayMonths(
      openingBuffer,
      revenueDown20Position
    ),

    combinedDownsideRunwayMonths: getRunwayMonths(
      openingBuffer,
      combinedDownsidePosition
    ),

    missingCostInputs,
    missingCapitalInputs,
  };
}
