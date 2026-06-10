import type { RiskFlag, ResidentialInput, CommercialInput } from '@/types/property';

export function generateResidentialRiskFlags(
  input: ResidentialInput,
  grossYield?: number,
  monthlyCashFlow?: number
): RiskFlag[] {
  const flags: RiskFlag[] = [];

  if (!input.purchasePrice) {
    flags.push({
      severity: 'high',
      message: 'Purchase price is missing, so yield cannot be calculated.',
    });
  }

  if (!input.expectedMonthlyRent) {
    flags.push({
      severity: 'high',
      message: 'Expected monthly rent is missing, so investment return cannot be calculated.',
    });
  }

  if (grossYield !== undefined && grossYield < 4 && input.userObjective === 'Buy-to-let') {
    flags.push({
      severity: 'high',
      message: 'Gross yield appears weak for a buy-to-let property.',
    });
  }

  if (monthlyCashFlow !== undefined && monthlyCashFlow < 100 && monthlyCashFlow >= 0) {
    flags.push({
      severity: 'medium',
      message: 'Monthly cash flow is very thin. Small changes in rates, service charge, void periods, or maintenance could wipe out the return.',
    });
  }

  if (monthlyCashFlow !== undefined && monthlyCashFlow < 0) {
    flags.push({
      severity: 'high',
      message: 'Monthly cash flow may be negative after known costs.',
    });
  }

  if (!input.serviceChargeAnnual) {
    flags.push({
      severity: 'medium',
      message: 'Service charge data is missing, so net yield may be overstated.',
    });
  }

  if (!input.groundRentAnnual) {
    flags.push({
      severity: 'low',
      message: 'Ground rent data is missing. Confirm whether applicable.',
    });
  }

  if (!input.mortgageMonthlyCost) {
    flags.push({
      severity: 'medium',
      message: 'Mortgage cost is missing, so leveraged return cannot be assessed.',
    });
  }

  flags.push({
    severity: 'info',
    message: 'Comparable rent data is not yet verified against live market data.',
  });

  flags.push({
    severity: 'info',
    message: 'Local demand and transport assumptions are indicative placeholders in this MVP.',
  });

  return flags;
}

export function generateCommercialRiskFlags(
  input: CommercialInput,
  rentBurden?: number,
  breakEven?: number,
  expectedCustomers?: number
): RiskFlag[] {
  const flags: RiskFlag[] = [];

  if (rentBurden !== undefined && rentBurden > 18) {
    flags.push({
      severity: 'high',
      message: 'Rent burden appears high relative to expected revenue.',
    });
  }

  if (breakEven !== undefined && expectedCustomers !== undefined && breakEven > expectedCustomers) {
    flags.push({
      severity: 'high',
      message: 'Break-even customers per day exceed expected customer assumptions.',
    });
  }

  if (!input.monthlyStaffCosts) {
    flags.push({
      severity: 'medium',
      message: 'Staff costs are missing, so viability may be overstated.',
    });
  }

  if (!input.monthlyUtilitiesAndOtherCosts) {
    flags.push({
      severity: 'medium',
      message: 'Utilities or other operating costs are missing.',
    });
  }

  if (!input.monthlyBusinessRates) {
    flags.push({
      severity: 'medium',
      message: 'Business rates are missing. These can be a significant cost.',
    });
  }

  if (input.fitOutBudget && input.fitOutBudget > 0) {
    flags.push({
      severity: 'info',
      message: 'Fit-out is included in upfront cash needed, but not in monthly operating break-even.',
    });
  }

  flags.push({
    severity: 'info',
    message: 'Competitor data is not yet connected. Manual local research is advised.',
  });

  flags.push({
    severity: 'info',
    message: 'Area suitability assumptions are indicative placeholders in this MVP.',
  });

  flags.push({
    severity: 'info',
    message: 'Expected customer assumptions may be optimistic. Consider stress-testing lower figures.',
  });

  return flags;
}
