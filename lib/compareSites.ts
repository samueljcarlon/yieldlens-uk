import { getVerdictFromScore } from '@/lib/calculations/verdict';
import {
  getCommercialBusinessTypeInfo,
  type CommercialBusinessTypeInfo,
} from '@/lib/commercialBusinessType';
import type { Verdict } from '@/types/property';

export interface CompareSiteInput {
  siteLabel?: string;
  businessType?: string;
  location?: string;
  monthlyRent?: number;
  expectedMonthlyRevenue?: number;
  monthlyOperatingCosts?: number;
  serviceCharge?: number;
  businessRates?: number;
  fitOutSetupCost?: number;
  openingCash?: number;
  leaseLengthMonths?: number;
  breakClause?: string;
}

export interface CompareSiteResult {
  siteLabel: string;
  businessTypeKey: string;
  businessTypeLabel: string;
  businessTypeInfo: CommercialBusinessTypeInfo;
  locationEntered: string;
  postcodeDetected: string;
  addressLabel: string;
  postcodeLabel: string;
  hasLocation: boolean;
  leaseLengthMonths?: number;
  breakClauseLabel: string;
  monthlyRent?: number;
  expectedMonthlyRevenue?: number;
  monthlyOperatingCosts?: number;
  serviceCharge?: number;
  businessRates?: number;
  fitOutSetupCost?: number;
  openingCash?: number;
  monthlyCostBase?: number;
  rentBurdenPercentage?: number;
  monthlySurplus?: number;
  breakEvenPressureState: string;
  breakEvenPressureHelper: string;
  openingCashAfterSetup?: number;
  downsideRevenue?: number;
  downsideMonthlyPosition?: number;
  monthlyBurnInDownside?: number;
  survivalMonths?: number;
  survivesSixBadMonths?: boolean;
  score: number;
  verdict: Verdict;
  pressurePoints: string[];
  evidenceGaps: string[];
  questions: string[];
  locationChecks: string[];
  locationContext: string;
}

export interface CompareComparisonResult {
  strongerSite: 'siteA' | 'siteB' | 'too_close';
  summary: string;
  differenceLines: string[];
}

function hasNumber(value?: number): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

function safe(value?: number): number {
  if (value === undefined || value === null || Number.isNaN(value)) return 0;
  return value;
}

function formatMoney(value?: number): string {
  if (!hasNumber(value)) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value?: number): string {
  if (!hasNumber(value)) return 'Not available';

  return `${value.toFixed(1)}%`;
}

function extractUkPostcode(value?: string): string {
  if (!value) return '';

  const match = value
    .toUpperCase()
    .match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/);

  if (!match) return '';

  return match[1].replace(/\s+/g, ' ').trim();
}

function normalizeBreakClause(value?: string): string {
  const raw = typeof value === 'string' ? value.trim().toLowerCase() : '';

  if (!raw) return 'Not provided';
  if (raw === 'yes') return 'Yes';
  if (raw === 'no') return 'No';
  if (raw === 'unsure') return 'Unsure';

  return value?.trim() || 'Not provided';
}

function splitLocation(location?: string): {
  locationEntered: string;
  postcodeDetected: string;
  addressLabel: string;
  postcodeLabel: string;
  hasLocation: boolean;
} {
  const raw = typeof location === 'string' ? location.trim() : '';
  if (!raw) {
    return {
      locationEntered: '',
      postcodeDetected: '',
      addressLabel: 'Address not provided',
      postcodeLabel: 'Postcode not provided',
      hasLocation: false,
    };
  }

  const postcode = extractUkPostcode(raw);

  return {
    locationEntered: raw,
    postcodeDetected: postcode,
    addressLabel: raw,
    postcodeLabel: postcode || 'Postcode not extracted',
    hasLocation: true,
  };
}

function buildLocationChecks(hasLocation: boolean): string[] {
  if (hasLocation) {
    return [
      'Confirm the rateable value and likely business rates separately',
      'Compare the quoted rent with nearby commercial evidence',
      'Confirm service charge and utilities assumptions for the specific unit',
      'Check building condition, EPC, and fit-out assumptions',
      'Verify permitted use, planning, or licensing questions with the relevant professionals',
      'Check local footfall or trading evidence where relevant',
    ];
  }

  return [
    'No location was entered, so local checks such as business rates, nearby rent evidence, service charge, and building-condition assumptions need separate verification.',
  ];
}

function uniqueItems(items: string[]): string[] {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function buildEvidenceGaps(
  businessTypeInfo: CommercialBusinessTypeInfo,
  hasLocation: boolean
): string[] {
  const generic = [
    'Comparable commercial rent evidence',
    'Business rates or rateable value estimate',
    'Service charge details',
    'Fit-out or setup quote',
    'Revenue assumption evidence',
    'Lease length, break clause, and rent review terms',
    'Permitted use and relevant professional checks',
  ];

  const location = hasLocation
    ? [
        'Nearby commercial rent evidence for the area',
        'Business rates, EPC, and building-condition assumptions for the unit',
        'Service charge and utilities assumptions for the specific property',
      ]
    : [
        'Nearby commercial rent evidence still needs to be checked separately',
        'Business rates, EPC, and building-condition assumptions need separate verification',
      ];

  return uniqueItems([...generic, ...businessTypeInfo.evidenceGaps, ...location]).slice(0, 10);
}

function buildQuestions(
  businessTypeInfo: CommercialBusinessTypeInfo,
  hasLocation: boolean
): string[] {
  const generic = [
    'Is the service charge fixed, capped, or variable?',
    'Are business rates included in the cost base?',
    'Is there a rent-free period?',
    'Is there a break clause?',
    'What happens at rent review?',
    'Is a personal guarantee required?',
    'What evidence supports the revenue assumption?',
    'What upfront cash is required before opening?',
  ];

  const location = hasLocation
    ? [
        'What nearby commercial rent evidence supports the quoted rent?',
        'What is the rateable value for the property?',
        'Are there location-specific fit-out, service charge, or utility costs?',
        'Does local footfall or trading pattern support the revenue assumption?',
      ]
    : [
        'What nearby commercial rent evidence supports the quoted rent?',
        'What is the rateable value for the property?',
        'What local footfall or trading evidence supports the revenue assumption?',
      ];

  return uniqueItems([...generic, ...businessTypeInfo.questions, ...location]).slice(0, 10);
}

function calculateCompareScore({
  monthlyRevenue,
  monthlyRent,
  monthlyCostBase,
  openingCashAfterSetup,
  monthlyBurnInDownside,
  survivalMonths,
  survivesSixBadMonths,
}: {
  monthlyRevenue?: number;
  monthlyRent?: number;
  monthlyCostBase?: number;
  openingCashAfterSetup?: number;
  monthlyBurnInDownside?: number;
  survivalMonths?: number;
  survivesSixBadMonths?: boolean;
}): number {
  let score = 0;

  const rentBurden = hasNumber(monthlyRevenue) && monthlyRevenue > 0 && hasNumber(monthlyRent)
    ? (monthlyRent / monthlyRevenue) * 100
    : undefined;

  if (!hasNumber(rentBurden)) {
    score += 10;
  } else if (rentBurden < 8) {
    score += 25;
  } else if (rentBurden < 12) {
    score += 20;
  } else if (rentBurden < 18) {
    score += 14;
  } else if (rentBurden < 25) {
    score += 8;
  } else {
    score += 3;
  }

  if (!hasNumber(monthlyRevenue) || !hasNumber(monthlyCostBase)) {
    score += 10;
  } else {
    const monthlySurplus = monthlyRevenue - monthlyCostBase;

    if (monthlySurplus > monthlyRevenue * 0.25) {
      score += 20;
    } else if (monthlySurplus > 0) {
      score += 14;
    } else if (monthlySurplus >= -monthlyRevenue * 0.1) {
      score += 8;
    } else {
      score += 3;
    }
  }

  if (!hasNumber(openingCashAfterSetup)) {
    score += 6;
  } else if (openingCashAfterSetup > safe(monthlyCostBase) * 3) {
    score += 20;
  } else if (openingCashAfterSetup > safe(monthlyCostBase)) {
    score += 14;
  } else if (openingCashAfterSetup > 0) {
    score += 8;
  } else {
    score += 2;
  }

  if (survivesSixBadMonths) {
    score += 25;
  } else if (hasNumber(survivalMonths) && survivalMonths >= 3) {
    score += 15;
  } else if (hasNumber(survivalMonths) && survivalMonths > 0) {
    score += 8;
  } else {
    score += 2;
  }

  return Math.min(100, Math.round(score));
}

function getBreakEvenPressureState(
  monthlyRevenue?: number,
  monthlyCostBase?: number
): string {
  if (!hasNumber(monthlyRevenue) || !hasNumber(monthlyCostBase)) {
    return 'Not available';
  }

  const monthlySurplus = monthlyRevenue - monthlyCostBase;

  if (monthlySurplus > monthlyRevenue * 0.25) return 'More room in the current assumptions';
  if (monthlySurplus >= 0) return 'Balanced';
  if (monthlySurplus >= -monthlyRevenue * 0.1) return 'Needs caution';
  return 'High pressure';
}

function buildBreakEvenHelper(
  businessTypeInfo: CommercialBusinessTypeInfo,
  monthlyRevenue?: number,
  monthlyCostBase?: number
): string {
  const businessType = businessTypeInfo.shortLabel.toLowerCase();

  if (!hasNumber(monthlyRevenue) || !hasNumber(monthlyCostBase)) {
    return `For a ${businessType}, the monthly cost base still needs checking against the revenue assumption.`;
  }

  const monthlySurplus = monthlyRevenue - monthlyCostBase;

  if (monthlySurplus > 0) {
    return `For a ${businessType}, the revenue assumption sits above the current monthly cost base.`;
  }

  return `For a ${businessType}, the revenue assumption does not yet clear the monthly cost base.`;
}

function buildPressurePoints({
  monthlyRevenue,
  monthlyRent,
  monthlyCostBase,
  openingCashAfterSetup,
  monthlyBurnInDownside,
  survivesSixBadMonths,
}: {
  monthlyRevenue?: number;
  monthlyRent?: number;
  monthlyCostBase?: number;
  openingCashAfterSetup?: number;
  monthlyBurnInDownside?: number;
  survivesSixBadMonths?: boolean;
}): string[] {
  const points: string[] = [];

  if (hasNumber(monthlyRevenue) && hasNumber(monthlyRent) && monthlyRevenue > 0) {
    const rentBurden = (monthlyRent / monthlyRevenue) * 100;

    if (rentBurden >= 18) {
      points.push('Rent burden is high relative to the submitted revenue.');
    } else if (rentBurden >= 12) {
      points.push('Rent burden needs caution because it is taking a meaningful share of revenue.');
    }
  }

  if (hasNumber(openingCashAfterSetup)) {
    if (openingCashAfterSetup < 0) {
      points.push('Opening cash does not cover the setup and first-month pressure.');
    } else if (hasNumber(monthlyCostBase) && openingCashAfterSetup < monthlyCostBase) {
      points.push('The opening cash buffer is thin after setup and one month of known costs.');
    }
  }

  if (hasNumber(monthlyBurnInDownside) && monthlyBurnInDownside > 0) {
    if (survivesSixBadMonths === false) {
      points.push('The downside case still burns cash each month.');
    }
  } else if (survivesSixBadMonths === false) {
    points.push('The downside case does not survive six weak months on the current assumptions.');
  }

  if (hasNumber(monthlyRevenue) && hasNumber(monthlyCostBase) && monthlyRevenue <= monthlyCostBase) {
    points.push('The base case does not yet cover the monthly cost base.');
  }

  if (points.length === 0) {
    points.push('The first-pass position looks steadier, but the assumptions still need evidence.');
  }

  return points.slice(0, 3);
}

export function calculateCompareSiteResult(input: CompareSiteInput): CompareSiteResult {
  const businessTypeInfo = getCommercialBusinessTypeInfo(input.businessType);
  const businessTypeLabel = businessTypeInfo.label;
  const { locationEntered, postcodeDetected, addressLabel, postcodeLabel, hasLocation } = splitLocation(input.location);
  const siteLabel = (input.siteLabel || 'Site').trim() || 'Site';
  const monthlyRent = safe(input.monthlyRent);
  const expectedMonthlyRevenue = safe(input.expectedMonthlyRevenue);
  const monthlyOperatingCosts = safe(input.monthlyOperatingCosts);
  const serviceCharge = safe(input.serviceCharge);
  const businessRates = safe(input.businessRates);
  const fitOutSetupCost = safe(input.fitOutSetupCost);
  const openingCash = safe(input.openingCash);
  const monthlyCostBase = monthlyRent + monthlyOperatingCosts + serviceCharge + businessRates;
  const rentBurdenPercentage =
    expectedMonthlyRevenue > 0 ? (monthlyRent / expectedMonthlyRevenue) * 100 : undefined;
  const monthlySurplus =
    expectedMonthlyRevenue > 0 ? expectedMonthlyRevenue - monthlyCostBase : undefined;
  const downsideRevenue = expectedMonthlyRevenue * 0.6;
  const downsideMonthlyPosition = downsideRevenue - monthlyCostBase;
  const monthlyBurnInDownside = downsideMonthlyPosition < 0 ? Math.abs(downsideMonthlyPosition) : 0;
  const openingCashAfterSetup = openingCash - fitOutSetupCost - monthlyCostBase;
  const survivalMonths =
    monthlyBurnInDownside > 0
      ? Math.max(0, openingCashAfterSetup) / monthlyBurnInDownside
      : undefined;
  const survivesSixBadMonths =
    openingCashAfterSetup >= 0 &&
    (downsideMonthlyPosition >= 0 || (survivalMonths !== undefined && survivalMonths >= 6));
  const score = calculateCompareScore({
    monthlyRevenue: expectedMonthlyRevenue,
    monthlyRent,
    monthlyCostBase,
    openingCashAfterSetup,
    monthlyBurnInDownside,
    survivalMonths,
    survivesSixBadMonths,
  });
  const verdict = getVerdictFromScore(score);
  const breakEvenPressureState = getBreakEvenPressureState(expectedMonthlyRevenue, monthlyCostBase);
  const breakEvenPressureHelper = buildBreakEvenHelper(
    businessTypeInfo,
    expectedMonthlyRevenue,
    monthlyCostBase
  );

  return {
    siteLabel,
    businessTypeKey: businessTypeInfo.key,
    businessTypeLabel,
    businessTypeInfo,
    locationEntered,
    postcodeDetected,
    addressLabel,
    postcodeLabel,
    hasLocation,
    leaseLengthMonths: input.leaseLengthMonths,
    breakClauseLabel: normalizeBreakClause(input.breakClause),
    monthlyRent: input.monthlyRent,
    expectedMonthlyRevenue: input.expectedMonthlyRevenue,
    monthlyOperatingCosts: input.monthlyOperatingCosts,
    serviceCharge: input.serviceCharge,
    businessRates: input.businessRates,
    fitOutSetupCost: input.fitOutSetupCost,
    openingCash: input.openingCash,
    monthlyCostBase,
    rentBurdenPercentage,
    monthlySurplus,
    breakEvenPressureState,
    breakEvenPressureHelper,
    openingCashAfterSetup,
    downsideRevenue,
    downsideMonthlyPosition,
    monthlyBurnInDownside,
    survivalMonths,
    survivesSixBadMonths,
    score,
    verdict,
    pressurePoints: buildPressurePoints({
      monthlyRevenue: expectedMonthlyRevenue,
      monthlyRent,
      monthlyCostBase,
      openingCashAfterSetup,
      monthlyBurnInDownside,
      survivesSixBadMonths,
    }),
    evidenceGaps: buildEvidenceGaps(businessTypeInfo, hasLocation),
    questions: buildQuestions(businessTypeInfo, hasLocation),
    locationChecks: buildLocationChecks(hasLocation),
    locationContext: hasLocation
      ? `Location entered: ${locationEntered}. YieldLens has not verified this location, but it can help organise checks such as business rates, nearby rent evidence, service charge, EPC, building condition, and permitted use.`
      : 'No location was entered. Business rates, nearby rent evidence, service charge, and building-condition assumptions should be checked separately.',
  };
}

export function compareSites(
  siteA: CompareSiteResult,
  siteB: CompareSiteResult,
  siteALabel: string,
  siteBLabel: string
): CompareComparisonResult {
  const scoreDiff = siteA.score - siteB.score;
  const rentBurdenA = siteA.rentBurdenPercentage ?? Number.NaN;
  const rentBurdenB = siteB.rentBurdenPercentage ?? Number.NaN;
  const openingCashA = siteA.openingCashAfterSetup ?? Number.NaN;
  const openingCashB = siteB.openingCashAfterSetup ?? Number.NaN;
  const downsideA = siteA.monthlyBurnInDownside ?? 0;
  const downsideB = siteB.monthlyBurnInDownside ?? 0;

  let strongerSite: 'siteA' | 'siteB' | 'too_close' = 'too_close';

  if (Math.abs(scoreDiff) >= 6) {
    strongerSite = scoreDiff > 0 ? 'siteA' : 'siteB';
  } else {
    const aSurvives = siteA.survivesSixBadMonths === true;
    const bSurvives = siteB.survivesSixBadMonths === true;

    if (aSurvives !== bSurvives) {
      strongerSite = aSurvives ? 'siteA' : 'siteB';
    } else if (hasNumber(rentBurdenA) && hasNumber(rentBurdenB) && Math.abs(rentBurdenA - rentBurdenB) >= 3) {
      strongerSite = rentBurdenA < rentBurdenB ? 'siteA' : 'siteB';
    } else if (hasNumber(openingCashA) && hasNumber(openingCashB) && Math.abs(openingCashA - openingCashB) >= 5000) {
      strongerSite = openingCashA > openingCashB ? 'siteA' : 'siteB';
    }
  }

  const summary =
    strongerSite === 'siteA'
      ? `${siteALabel} appears stronger on a first-pass basis because it leaves more room after setup and has lower pressure on the current assumptions. ${siteBLabel} needs more evidence before relying on the result.`
      : strongerSite === 'siteB'
        ? `${siteBLabel} appears stronger on a first-pass basis because it leaves more room after setup and has lower pressure on the current assumptions. ${siteALabel} needs more evidence before relying on the result.`
        : 'Both sites are close enough that this is only a first-pass comparison. No clear gap shows on the submitted assumptions, so the better choice depends on stronger evidence for rent, opening cash, trading assumptions, and lease terms before either lease goes further.';

  const differenceLines: string[] = [];

  if (hasNumber(rentBurdenA) && hasNumber(rentBurdenB) && Math.abs(rentBurdenA - rentBurdenB) >= 1) {
    differenceLines.push(
      rentBurdenA < rentBurdenB
        ? `${siteALabel} has a lighter rent burden by ${Math.abs(rentBurdenA - rentBurdenB).toFixed(1)} percentage points.`
        : `${siteBLabel} has a lighter rent burden by ${Math.abs(rentBurdenA - rentBurdenB).toFixed(1)} percentage points.`
    );
  }

  if (hasNumber(openingCashA) && hasNumber(openingCashB) && Math.abs(openingCashA - openingCashB) >= 3000) {
    differenceLines.push(
      openingCashA > openingCashB
        ? `${siteALabel} leaves ${formatMoney(Math.abs(openingCashA - openingCashB))} more cash after setup and one month of costs.`
        : `${siteBLabel} leaves ${formatMoney(Math.abs(openingCashA - openingCashB))} more cash after setup and one month of costs.`
    );
  }

  if (downsideA !== downsideB) {
    differenceLines.push(
      downsideA < downsideB
        ? `${siteALabel} has lower downside pressure on the current screening assumptions.`
        : `${siteBLabel} has lower downside pressure on the current screening assumptions.`
    );
  }

  if (differenceLines.length === 0) {
    differenceLines.push('The comparison is close enough that the result depends on the evidence still to be checked.');
  }

  return {
    strongerSite,
    summary,
    differenceLines: differenceLines.slice(0, 3),
  };
}
