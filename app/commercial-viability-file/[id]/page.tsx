import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import type { ReportRequest } from '@/lib/reportRequests';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import PrintButton from './PrintButton';
import RentBurdenGauge from '@/components/visuals/RentBurdenGauge';
import OpeningCashWaterfall from '@/components/visuals/OpeningCashWaterfall';
import BreakEvenComparison from '@/components/visuals/BreakEvenComparison';
import DownsideSurvivalCard from '@/components/visuals/DownsideSurvivalCard';

export const metadata: Metadata = {
  title: 'Standard Commercial Viability File',
  description:
    '£49 printable commercial decision memo built from the free check, with rent burden, cash pressure, downside risk, negotiation levers, and lease questions.',
  robots: {
    index: false,
    follow: false,
  },
};

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function formatCurrency(value: unknown): string {
  const numericValue = toNumber(value);
  if (numericValue === null) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(numericValue);
}

function formatNumber(value: unknown): string {
  const numericValue = toNumber(value);
  if (numericValue === null) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 2,
  }).format(numericValue);
}

function formatPercent(value: unknown): string {
  const numericValue = toNumber(value);
  if (numericValue === null) return 'Not available';

  return `${new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 1,
  }).format(numericValue)}%`;
}

function getCommercialVerdictLabel(verdictLabel: string): string {
  const normalized = verdictLabel.trim().toLowerCase();

  if (normalized === 'strong candidate') return 'Stronger case';
  if (normalized === 'worth investigating') return 'Worth investigating';
  if (normalized === 'marginal') return 'Needs caution';
  if (normalized === 'weak') return 'Fragile';
  if (normalized === 'avoid') return 'Weaker case';

  return verdictLabel;
}

function getVerdictTone(verdictLabel: string): 'green' | 'teal' | 'amber' | 'orange' | 'rose' {
  const normalized = verdictLabel.trim().toLowerCase();

  if (normalized === 'strong candidate') return 'green';
  if (normalized === 'worth investigating') return 'teal';
  if (normalized === 'marginal') return 'amber';
  if (normalized === 'weak') return 'orange';
  if (normalized === 'avoid') return 'rose';
  return 'rose';
}

function getVerdictToneClasses(verdictLabel: string): {
  badge: string;
  border: string;
  subtle: string;
  highlight: string;
  metric: string;
} {
  const tone = getVerdictTone(verdictLabel);

  if (tone === 'green') {
    return {
      badge: 'border-green-200 bg-green-50 text-green-900',
      border: 'border-green-200',
      subtle: 'bg-green-50 text-green-950',
      highlight: 'text-green-800',
      metric: 'text-green-900',
    };
  }

  if (tone === 'teal') {
    return {
      badge: 'border-green-200 bg-green-50 text-green-900',
      border: 'border-green-200',
      subtle: 'bg-green-50 text-green-950',
      highlight: 'text-green-800',
      metric: 'text-green-900',
    };
  }

  if (tone === 'amber') {
    return {
      badge: 'border-amber-200 bg-amber-50 text-amber-950',
      border: 'border-amber-200',
      subtle: 'bg-amber-50 text-amber-950',
      highlight: 'text-amber-800',
      metric: 'text-amber-900',
    };
  }

  if (tone === 'orange') {
    return {
      badge: 'border-orange-200 bg-orange-50 text-orange-950',
      border: 'border-orange-200',
      subtle: 'bg-orange-50 text-orange-950',
      highlight: 'text-orange-800',
      metric: 'text-orange-900',
    };
  }

  return {
    badge: 'border-rose-200 bg-rose-50 text-rose-950',
    border: 'border-rose-200',
    subtle: 'bg-rose-50 text-rose-950',
    highlight: 'text-rose-800',
    metric: 'text-rose-900',
  };
}

function getShortReference(id: string): string {
  return id.slice(0, 8).toUpperCase();
}

function getOpeningShortfall(request: ReportRequest): string | null {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const cashAfterOpening = toNumber(result.availableCashAfterOpening);

  if (cashAfterOpening === null || cashAfterOpening >= 0) return null;

  return formatCurrency(Math.abs(cashAfterOpening));
}

function getOpeningPositionSummary(request: ReportRequest): { label: string; value: string } {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const cashAfterOpening = toNumber(result.availableCashAfterOpening);

  if (cashAfterOpening === null) {
    return { label: 'Opening position', value: 'Not available' };
  }

  if (cashAfterOpening < 0) {
    return { label: 'Opening shortfall', value: formatCurrency(Math.abs(cashAfterOpening)) };
  }

  return { label: 'Opening buffer', value: formatCurrency(cashAfterOpening) };
}

function getOpeningPositionTone(request: ReportRequest): string {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};
  const cashAfterOpening = toNumber(result.availableCashAfterOpening);

  if (cashAfterOpening === null) return 'text-stone-700 bg-stone-50 border-stone-200';
  if (cashAfterOpening < 0) return 'text-rose-950 bg-rose-50 border-rose-200';
  if (cashAfterOpening < 15000) return 'text-amber-950 bg-amber-50 border-amber-200';
  return 'text-green-950 bg-green-50 border-green-200';
}

function getCustomerAccessCookieName(id: string): string {
  return `yieldlens_paid_file_${id}`;
}

function getCommercialContext(request: ReportRequest) {
  const input = request.input && typeof request.input === 'object'
    ? (request.input as Record<string, unknown>)
    : {};
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const annualRent = toNumber(input.annualRent);
  const monthlyRent = toNumber(result.monthlyRent) ?? (annualRent !== null ? annualRent / 12 : null);
  const monthlyRevenue = toNumber(result.estimatedMonthlyRevenue);
  const monthlyCostBase = toNumber(result.estimatedMonthlyCostBase);
  const rentBurden = toNumber(result.rentBurdenPercentage);
  const breakEven = toNumber(result.breakEvenCustomersPerDay);
  const expectedCustomers = toNumber(input.expectedCustomersPerDay);
  const averageSpend = toNumber(input.averageSpendPerCustomer);
  const openingDays = toNumber(input.openingDaysPerMonth);
  const upfrontCashNeeded = toNumber(result.upfrontCashNeeded);
  const startingCash = toNumber(input.startingCash);
  const cashAfterOpening = toNumber(result.availableCashAfterOpening);
  const businessType = typeof input.businessType === 'string' && input.businessType.trim() ? input.businessType.trim() : null;
  const downsideRevenuePercentage = toNumber(result.downsideRevenuePercentage ?? input.downsideRevenuePercentage);
  const downsideMonthlyRevenue = toNumber(result.downsideMonthlyRevenue);
  const downsideMonthlyPosition = toNumber(result.downsideMonthlyPosition);
  const monthlyBurnInDownside = toNumber(result.monthlyBurnInDownside);
  const survivalMonths = toNumber(result.survivalMonths);
  const survivesSixBadMonths = result.survivesSixBadMonths === true;

  return {
    input,
    result,
    annualRent,
    monthlyRent,
    monthlyRevenue,
    monthlyCostBase,
    rentBurden,
    breakEven,
    expectedCustomers,
    averageSpend,
    openingDays,
    upfrontCashNeeded,
    startingCash,
    cashAfterOpening,
    businessType,
    downsideRevenuePercentage,
    downsideMonthlyRevenue,
    downsideMonthlyPosition,
    monthlyBurnInDownside,
    survivalMonths,
    survivesSixBadMonths,
  };
}

function getExecutiveHighlights(request: ReportRequest, assessment: ReturnType<typeof getFinalAssessment>) {
  const figures = getCommercialContext(request);
  const rentBurden = figures.rentBurden;
  const cashAfterOpening = figures.cashAfterOpening;
  const downsideMonthlyPosition = figures.downsideMonthlyPosition;
  const openingShortfall = getOpeningShortfall(request);

  const strongestPositive =
    downsideMonthlyPosition !== null && downsideMonthlyPosition > 0
      ? `Downside trading still covers the known monthly cost base by ${formatCurrency(downsideMonthlyPosition)}.`
      : figures.breakEven !== null && figures.expectedCustomers !== null
        ? `Break-even sits at ${formatNumber(figures.breakEven)} customers/day against ${formatNumber(figures.expectedCustomers)} expected.`
        : 'The operating case needs more evidence before it can be read confidently.';

  const biggestWeakness =
    cashAfterOpening !== null && cashAfterOpening < 0
      ? `Opening shortfall of ${openingShortfall ?? 'Not available'} before trading begins.`
      : rentBurden !== null && rentBurden > 18
        ? `Rent burden is ${rentBurden.toFixed(1)}%, above the caution threshold.`
        : cashAfterOpening !== null && cashAfterOpening < 15000
          ? `Only ${formatCurrency(cashAfterOpening)} remains after opening costs, so the buffer is thin.`
          : 'The weakest point still needs more evidence in the lease and trading assumptions.';

  return [
    {
      label: 'Main reason',
      value: assessment.reason,
      tone: 'stone',
    },
    {
      label: 'Strongest positive',
      value: strongestPositive,
      tone: 'green',
    },
    {
      label: 'Biggest weakness',
      value: biggestWeakness,
      tone: rentBurden !== null && rentBurden > 18 ? 'amber' : 'rose',
    },
    {
      label: 'Immediate next action',
      value: assessment.nextStep,
      tone: 'green',
    },
  ];
}

function getWhatMattersMost(request: ReportRequest): Array<{ rank: number; title: string; text: string; tone: 'green' | 'teal' | 'amber' | 'rose' }> {
  const figures = getCommercialContext(request);
  const items: Array<{ rank: number; title: string; text: string; tone: 'green' | 'teal' | 'amber' | 'rose' }> = [];

  if (figures.rentBurden !== null) {
    items.push({
      rank: 1,
      title: 'Rent burden',
      text:
        `Rent burden is ${figures.rentBurden.toFixed(1)}% of expected monthly revenue, so the lease depends on the entered trading assumptions being broadly right.`,
      tone: figures.rentBurden > 18 ? 'amber' : 'teal',
    });
  }

  if (figures.expectedCustomers !== null && figures.breakEven !== null) {
    items.push({
      rank: 2,
      title: 'Customer volume',
      text:
        `Break-even sits at ${formatNumber(figures.breakEven)} customers/day against ${formatNumber(figures.expectedCustomers)} expected, so the headroom exists on paper but needs evidence.`,
      tone: figures.breakEven > figures.expectedCustomers ? 'amber' : 'green',
    });
  }

  if (figures.cashAfterOpening !== null) {
    items.push({
      rank: 3,
      title: 'Opening buffer',
      text:
        figures.cashAfterOpening < 0
          ? `Upfront cash needed is ${formatCurrency(figures.upfrontCashNeeded)} against starting cash of ${formatCurrency(figures.startingCash)}, leaving a ${getOpeningShortfall(request) ?? 'Not available'} opening shortfall.`
          : figures.cashAfterOpening < 15000
            ? `Only ${formatCurrency(figures.cashAfterOpening)} remains after opening costs, which leaves limited room for overruns.`
            : `The opening buffer is ${formatCurrency(figures.cashAfterOpening)}, which is positive but still needs quote-backed verification.`,
      tone: figures.cashAfterOpening < 0 ? 'rose' : figures.cashAfterOpening < 15000 ? 'amber' : 'green',
    });
  }

  if (figures.downsideMonthlyPosition !== null) {
    items.push({
      rank: 4,
      title: 'Downside survival',
      text:
        figures.survivesSixBadMonths
          ? `Downside trading still covers operating costs by ${formatCurrency(figures.downsideMonthlyPosition)}, so monthly burn is not the main failure point.`
          : `Downside trading does not clear the six-month test, which means the site needs more room in the opening capital stack or lower monthly pressure.`,
      tone: figures.survivesSixBadMonths ? 'green' : 'rose',
    });
  }

  return items.slice(0, 4);
}

function getSiteSnapshotRows(request: ReportRequest): Array<{ label: string; value: string }> {
  const input = request.input && typeof request.input === 'object'
    ? (request.input as Record<string, unknown>)
    : {};

  return [
    { label: 'Reference', value: getShortReference(request.id) },
    { label: 'Address', value: request.address || 'Not provided' },
    { label: 'Postcode', value: request.postcode || 'Not provided' },
    { label: 'Business type', value: typeof input.businessType === 'string' && input.businessType.trim() ? input.businessType : 'Not provided' },
    { label: 'Annual rent', value: formatCurrency(input.annualRent) },
    { label: 'Expected customers/day', value: formatNumber(input.expectedCustomersPerDay) },
    { label: 'Average spend', value: formatCurrency(input.averageSpendPerCustomer) },
    { label: 'Opening days/month', value: formatNumber(input.openingDaysPerMonth) },
  ];
}

function getAssumptionRows(request: ReportRequest): Array<{ label: string; value: string; helper: string }> {
  const figures = getCommercialContext(request);

  return [
    {
      label: 'Business type',
      value: figures.businessType ?? 'Not provided',
      helper: 'This helps read the rent and trading pressure in context.',
    },
    {
      label: 'Monthly rent',
      value: formatCurrency(figures.monthlyRent),
      helper: 'The rent figure used to test the monthly burden.',
    },
    {
      label: 'Expected monthly revenue',
      value: formatCurrency(figures.monthlyRevenue),
      helper: 'The revenue case the memo is pressure-testing.',
    },
    {
      label: 'Opening capital needed',
      value: formatCurrency(figures.upfrontCashNeeded),
      helper: 'The cash needed before the site starts trading.',
    },
    {
      label: 'Starting cash',
      value: formatCurrency(figures.startingCash),
      helper: 'Cash available before the opening costs leave the business.',
    },
    {
      label: 'Monthly cost base',
      value: formatCurrency(figures.monthlyCostBase),
      helper: 'Staff, rates, utilities, insurance, and other monthly pressure.',
    },
  ];
}

function getMetricRows(request: ReportRequest): Array<{
  label: string;
  value: string;
  tone: 'neutral' | 'positive' | 'warning' | 'negative';
}> {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const cashAfterOpening = toNumber(result.availableCashAfterOpening);
  const rentBurden = toNumber(result.rentBurdenPercentage);
  const downsideMonthlyPosition = toNumber(result.downsideMonthlyPosition);
  const survivesSixBadMonths = result.survivesSixBadMonths === true;

  return [
    { label: 'Score', value: `${request.score}/100`, tone: 'neutral' },
    {
      label: 'Mapped verdict',
      value:
        request.mode === 'commercial'
          ? getCommercialVerdictLabel(request.verdictLabel)
          : request.verdictLabel,
      tone: 'neutral',
    },
    { label: 'Monthly revenue', value: formatCurrency(result.estimatedMonthlyRevenue), tone: 'neutral' },
    { label: 'Monthly rent', value: formatCurrency(result.monthlyRent), tone: 'neutral' },
    { label: 'Rent burden', value: formatPercent(result.rentBurdenPercentage), tone: rentBurden !== null && rentBurden > 18 ? 'warning' : 'positive' },
    { label: 'Monthly cost base', value: formatCurrency(result.estimatedMonthlyCostBase), tone: 'neutral' },
    { label: 'Break-even customers/day', value: formatNumber(result.breakEvenCustomersPerDay), tone: 'neutral' },
    { label: 'Expected customers/day', value: formatNumber(result.expectedCustomersPerDay), tone: 'neutral' },
    { label: 'Upfront cash needed', value: formatCurrency(result.upfrontCashNeeded), tone: 'neutral' },
    {
      label: 'Cash after opening',
      value: formatCurrency(result.availableCashAfterOpening),
      tone:
        cashAfterOpening === null
          ? 'neutral'
          : cashAfterOpening < 0
            ? 'negative'
            : cashAfterOpening < 15000
              ? 'warning'
              : 'positive',
    },
    {
      label: 'Downside revenue',
      value: formatCurrency(result.downsideMonthlyRevenue),
      tone: 'neutral',
    },
    {
      label: 'Downside monthly position',
      value: formatCurrency(result.downsideMonthlyPosition),
      tone:
        downsideMonthlyPosition === null
          ? 'neutral'
          : downsideMonthlyPosition < 0
            ? 'negative'
            : 'positive',
    },
    {
      label: 'Six-month test',
      value: survivesSixBadMonths ? 'Pass' : 'Fail',
      tone: survivesSixBadMonths ? 'positive' : 'negative',
    },
  ];
}

function getUpfrontCashRows(request: ReportRequest): Array<{ label: string; value: string }> {
  const input = request.input && typeof request.input === 'object'
    ? (request.input as Record<string, unknown>)
    : {};
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const downsideMonthlyPosition = toNumber(result.downsideMonthlyPosition);
  const monthlyBurnInDownside = toNumber(result.monthlyBurnInDownside);
  const survivalMonths = toNumber(result.survivalMonths);

  return [
    { label: 'Fit-out budget', value: formatCurrency(input.fitOutBudget) },
    { label: 'Rent deposit', value: formatCurrency(input.rentDeposit) },
    { label: 'Legal fees', value: formatCurrency(input.legalFees) },
    { label: 'Opening stock', value: formatCurrency(input.openingStock) },
    { label: 'Other setup costs', value: formatCurrency(input.otherSetupCosts) },
    { label: 'Starting cash', value: formatCurrency(input.startingCash) },
    { label: 'Upfront cash needed', value: formatCurrency(result.upfrontCashNeeded) },
    { label: 'Cash after opening', value: formatCurrency(result.availableCashAfterOpening) },
    { label: 'Downside revenue %', value: formatPercent(result.downsideRevenuePercentage ?? input.downsideRevenuePercentage) },
    { label: 'Downside monthly revenue', value: formatCurrency(result.downsideMonthlyRevenue) },
    { label: 'Downside monthly position', value: formatCurrency(result.downsideMonthlyPosition) },
    {
      label: 'Monthly burn in downside',
      value:
        monthlyBurnInDownside === null
          ? 'Not available'
          : monthlyBurnInDownside <= 0
            ? 'No monthly burn in downside case'
            : formatCurrency(monthlyBurnInDownside),
    },
    {
      label: 'Survival months',
      value:
        survivalMonths === null
          ? downsideMonthlyPosition !== null && downsideMonthlyPosition >= 0
            ? 'No monthly burn in downside case'
            : 'Not available'
          : `${survivalMonths.toFixed(1)} months`,
    },
    {
      label: 'Six-month test',
      value: result.survivesSixBadMonths === true ? 'Pass' : result.survivesSixBadMonths === false ? 'Fail' : 'Not available',
    },
  ];
}

function getExecutiveSummary(request: ReportRequest): string {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const rentBurden = toNumber(result.rentBurdenPercentage);
  const cashAfterOpening = toNumber(result.availableCashAfterOpening);
  const downsideMonthlyPosition = toNumber(result.downsideMonthlyPosition);
  const survivesSixBadMonths = result.survivesSixBadMonths === true;

  if (cashAfterOpening !== null && cashAfterOpening < 0) {
    const upfrontCashNeeded = formatCurrency(result.upfrontCashNeeded);
    const startingCash = formatCurrency(result.startingCash);
    const shortfall = getOpeningShortfall(request) ?? 'Not available';

    return `On the current inputs, upfront cash needed is ${upfrontCashNeeded} against starting cash of ${startingCash}, leaving a ${shortfall} opening shortfall. The site needs more starting cash or lower upfront costs before it can be treated as viable.`;
  }

  if (rentBurden !== null && rentBurden > 18) {
    return 'Rent takes a high share of expected revenue. The site may still be worth investigating, but it needs stronger trading or sharper lease terms to feel comfortable.';
  }

  if (cashAfterOpening !== null && cashAfterOpening < 15000) {
    return 'The downside case may still hold together, but the buffer after opening costs is thin. That leaves limited room for weaker trading or extra setup spend.';
  }

  if (downsideMonthlyPosition !== null && downsideMonthlyPosition < 0) {
    return 'The downside case burns cash each month. The site needs better revenue, lower fixed costs, or a larger cash buffer before signing feels sensible.';
  }

  if (!survivesSixBadMonths) {
    return 'The site does not clear the six-month survival test on the current assumptions. The lease needs better economics before deeper due diligence turns into a commitment.';
  }

  return 'The current assumptions look workable, but the site still deserves deeper due diligence before signing. Keep pressure-testing the lease terms, trading assumptions, and opening cash needs.';
}

function getSurvivalExplanation(request: ReportRequest): string {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const cashAfterOpening = toNumber(result.availableCashAfterOpening);
  const downsideMonthlyPosition = toNumber(result.downsideMonthlyPosition);
  const survivesSixBadMonths = result.survivesSixBadMonths === true;

  if (cashAfterOpening !== null && cashAfterOpening < 0 && !survivesSixBadMonths) {
    return 'The six-month test fails because the site does not have enough starting cash to cover upfront costs before trading begins, even though the downside month does not show operating burn.';
  }

  if (downsideMonthlyPosition !== null && downsideMonthlyPosition > 0 && !survivesSixBadMonths) {
    return 'The downside month still covers operating costs, so the problem is upfront funding rather than monthly operating burn.';
  }

  if (cashAfterOpening !== null && cashAfterOpening < 0) {
    return 'The six-month test fails because the opening capital stack leaves the site short before trading begins.';
  }

  if (!survivesSixBadMonths) {
    return 'The six-month test fails because the site does not have enough runway on the current assumptions.';
  }

  return 'The site clears the six-month survival test on the current assumptions.';
}

function getRiskInterpretation(request: ReportRequest): string {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const rentBurden = toNumber(result.rentBurdenPercentage);
  const cashAfterOpening = toNumber(result.availableCashAfterOpening);
  const downsideMonthlyPosition = toNumber(result.downsideMonthlyPosition);
  const monthlyBurnInDownside = toNumber(result.monthlyBurnInDownside);
  const survivesSixBadMonths = result.survivesSixBadMonths === true;
  const survivalMonths = toNumber(result.survivalMonths);

  const rentSentence =
    rentBurden !== null
      ? `Rent burden is ${rentBurden.toFixed(1)}% of expected monthly revenue, which puts pressure on the entered customer and spend assumptions.`
      : 'Rent burden is not available, so the cost pressure needs more evidence before it can be read confidently.';

  const breakEvenSentence =
    toNumber(result.breakEvenCustomersPerDay) !== null && toNumber(result.expectedCustomersPerDay) !== null
      ? `Break-even sits at ${formatNumber(result.breakEvenCustomersPerDay)} customers/day against ${formatNumber(result.expectedCustomersPerDay)} expected, so the base case has room on paper, but that room depends on the ${formatNumber(result.expectedCustomersPerDay)}-per-day assumption being realistic.`
      : 'Break-even and expected customers/day need more evidence before the operating case can be read confidently.';

  let capitalSentence = '';
  if (cashAfterOpening !== null && cashAfterOpening < 0) {
    const shortfall = getOpeningShortfall(request);
    capitalSentence = shortfall
      ? `Only ${shortfall} remains after opening costs, so the opening capital stack does not work on the current inputs and the main risk is funding the launch rather than monthly operating burn.`
      : 'The opening capital stack does not work on these inputs, so the main risk is funding the launch rather than operating burn.';
  } else if (cashAfterOpening !== null && cashAfterOpening < 15000) {
    const monthlyCostBase = toNumber(result.estimatedMonthlyCostBase);
    const bufferMonths = monthlyCostBase && monthlyCostBase > 0 ? cashAfterOpening / monthlyCostBase : null;
    capitalSentence = bufferMonths !== null
      ? `Only ${formatCurrency(cashAfterOpening)} remains after opening costs, which covers about ${bufferMonths.toFixed(1)} months of the current monthly cost base and leaves limited room for opening overruns.`
      : `Only ${formatCurrency(cashAfterOpening)} remains after opening costs, so even modest overruns could make the site fragile.`;
  } else {
    capitalSentence = 'The opening buffer is not the main pressure point on the current inputs, but it still needs checking against real quotes and lease terms.';
  }

  const downsideSentence =
    downsideMonthlyPosition !== null && downsideMonthlyPosition < 0
      ? `The downside case burns about ${monthlyBurnInDownside === null ? 'Not available' : formatCurrency(monthlyBurnInDownside)} per month, so the site also needs stronger trading or lower fixed costs if the weaker case is to hold up.`
      : survivesSixBadMonths
        ? 'The downside month still covers operating costs, which is positive, but the file is more exposed to opening-cost overruns, slower launch trading, or uncapped lease costs than to immediate monthly burn.'
        : 'The downside month still covers operating costs, so the survival problem is not monthly burn on its own.';

  const survivalSentence = !survivesSixBadMonths
    ? survivalMonths !== null
      ? `The site only survives about ${survivalMonths.toFixed(1)} months in the downside case, which is short of the six-month test.`
      : 'The site does not clear the six-month survival test on the current assumptions.'
    : cashAfterOpening !== null && cashAfterOpening < 15000
      ? 'The six-month test passes, but the opening buffer is still thin, so the pass depends on launch costs staying controlled.'
      : 'The site clears the six-month survival test on the current assumptions.';

  return [rentSentence, breakEvenSentence, capitalSentence, downsideSentence, survivalSentence].join(' ');
}

function getWhatWouldNeedToImprove(request: ReportRequest): Array<{
  title: string;
  current: string;
  target: string;
  action: string;
}> {
  const figures = getCommercialContext(request);
  const shortfall = getOpeningShortfall(request);
  const rentAfterReduction =
    figures.monthlyRent === null ? null : figures.monthlyRent * 0.9;
  const burdenAfterReduction =
    figures.rentBurden === null ? null : figures.rentBurden * 0.9;
  const monthlyRevenueAtCurrentSpend =
    figures.expectedCustomers !== null && figures.openingDays !== null && figures.averageSpend !== null
      ? figures.expectedCustomers * figures.openingDays * figures.averageSpend
      : null;
  const monthlyRevenueAtSpendPlusOne =
    figures.expectedCustomers !== null && figures.openingDays !== null && figures.averageSpend !== null
      ? figures.expectedCustomers * figures.openingDays * (figures.averageSpend + 1)
      : null;
  const monthlyRevenueAtSpendPlusTwo =
    figures.expectedCustomers !== null && figures.openingDays !== null && figures.averageSpend !== null
      ? figures.expectedCustomers * figures.openingDays * (figures.averageSpend + 2)
      : null;
  const customerGap =
    figures.expectedCustomers !== null && figures.breakEven !== null
      ? figures.expectedCustomers - figures.breakEven
      : null;

  return [
    {
      title: 'Rent burden',
      current:
        figures.rentBurden === null ? 'Not available' : `${figures.rentBurden.toFixed(1)}%`,
      target: '18% is the caution threshold. 12% is healthier.',
      action:
        figures.monthlyRent !== null && rentAfterReduction !== null && figures.rentBurden !== null && burdenAfterReduction !== null
          ? `A 10% rent reduction would lower monthly rent from ${formatCurrency(figures.monthlyRent)} to ${formatCurrency(rentAfterReduction)} and move rent burden from ${figures.rentBurden.toFixed(1)}% to about ${burdenAfterReduction.toFixed(1)}%.`
          : 'Lower rent, improve average spend, raise customer volume, or secure a stronger lease deal.',
    },
    {
      title: 'Trading assumptions',
      current:
        figures.expectedCustomers === null || figures.averageSpend === null
          ? 'Not available'
          : `${formatNumber(figures.expectedCustomers)} customers/day at ${formatCurrency(figures.averageSpend)} average spend`,
      target: 'Validate the entered customers/day and average spend assumptions with evidence.',
      action:
        figures.expectedCustomers !== null && figures.openingDays !== null && figures.averageSpend !== null && monthlyRevenueAtCurrentSpend !== null && monthlyRevenueAtSpendPlusOne !== null && monthlyRevenueAtSpendPlusTwo !== null
          ? `At ${formatNumber(figures.expectedCustomers)} customers/day over ${figures.openingDays.toFixed(0)} days, raising average spend from ${formatCurrency(figures.averageSpend)} to ${formatCurrency(figures.averageSpend + 1)} would add about ${formatCurrency(monthlyRevenueAtSpendPlusOne - monthlyRevenueAtCurrentSpend)} a month, and ${formatCurrency(figures.averageSpend + 2)} would add about ${formatCurrency(monthlyRevenueAtSpendPlusTwo - monthlyRevenueAtCurrentSpend)} a month.`
          : 'Use footfall and basket evidence to support the customer and spend assumptions rather than treating them as fixed.',
    },
    {
      title: 'Break-even customers',
      current:
        figures.breakEven === null || figures.expectedCustomers === null
          ? 'Not available'
          : `${figures.breakEven.toFixed(1)} per day against ${figures.expectedCustomers.toFixed(1)} expected`,
      target: 'Break-even should sit comfortably below expected customers per day.',
      action:
        figures.breakEven !== null && figures.expectedCustomers !== null && customerGap !== null
          ? `Break-even is ${figures.breakEven.toFixed(1)} customers/day against ${figures.expectedCustomers.toFixed(1)} expected, leaving a margin of ${customerGap.toFixed(1)} customers/day. That is comfortable on paper, but it still needs footfall validation.`
          : 'Increase customers per day, increase average spend, lower staffing or other costs, or reduce rent.',
    },
    {
      title: 'Upfront cash',
      current:
        figures.cashAfterOpening === null
          ? 'Not available'
          : figures.cashAfterOpening < 0
            ? `Shortfall of ${shortfall ?? 'Not available'}`
            : `Buffer of ${formatCurrency(figures.cashAfterOpening)}`,
      target: 'Leave a positive buffer after launch costs, ideally enough for early trading friction.',
      action:
        figures.upfrontCashNeeded !== null && figures.startingCash !== null && figures.cashAfterOpening !== null && figures.cashAfterOpening < 0
          ? `Upfront cash needed is ${formatCurrency(figures.upfrontCashNeeded)} against starting cash of ${formatCurrency(figures.startingCash)}, leaving a ${shortfall ?? 'Not available'} shortfall before trading begins.`
          : figures.cashAfterOpening !== null && figures.monthlyCostBase !== null && figures.cashAfterOpening < 15000
            ? `A buffer of ${formatCurrency(figures.cashAfterOpening)} covers about ${(figures.cashAfterOpening / figures.monthlyCostBase).toFixed(1)} months of the current monthly cost base of ${formatCurrency(figures.monthlyCostBase)}, so even a modest opening overrun could use it up.`
            : 'Increase starting cash, lower fit-out or setup costs, secure landlord contribution, or negotiate rent-free and reduced deposit terms.',
    },
    {
      title: 'Downside survival',
      current:
        figures.survivalMonths === null
          ? figures.survivesSixBadMonths
            ? 'Passes on current assumptions'
            : 'Not available'
          : `${figures.survivalMonths.toFixed(1)} months`,
      target: 'Six weak trading months is the minimum test here.',
      action:
        figures.survivesSixBadMonths
          ? 'The downside month still covers operating costs, so the file is less exposed to monthly burn than to opening-cost pressure.'
          : 'Lower monthly burn, raise starting cash, or strengthen revenue assumptions before signing.',
    },
  ];
}

function getStressTestScenarios(request: ReportRequest): Array<{
  label: string;
  monthlyRevenue: string;
  monthlyPosition: string;
  breakEvenCustomers: string;
  interpretation: string;
}> {
  const figures = getCommercialContext(request);
  const avgSpend = figures.averageSpend;
  const openingDays = figures.openingDays;
  const monthlyRevenue = figures.monthlyRevenue;
  const monthlyCostBase = figures.monthlyCostBase;
  const monthlyRent = figures.monthlyRent;

  const breakEvenForCostBase = () => {
    if (
      monthlyCostBase === null ||
      avgSpend === null ||
      openingDays === null ||
      !avgSpend ||
      !openingDays
    ) {
      return 'Not available';
    }

    return `${(monthlyCostBase / avgSpend / openingDays).toFixed(1)}`;
  };

  const breakEvenForCost = (cost: number | null) => {
    if (cost === null || avgSpend === null || openingDays === null || !avgSpend || !openingDays) {
      return 'Not available';
    }

    return `${(cost / avgSpend / openingDays).toFixed(1)}`;
  };

  const baseCostBase = monthlyCostBase;
  const baseRevenue = monthlyRevenue;

  const row = (label: string, revenue: number | null, cost: number | null, interpretation: string) => ({
    label,
    monthlyRevenue: formatCurrency(revenue),
    monthlyPosition:
      revenue === null || cost === null ? 'Not available' : formatCurrency(revenue - cost),
    breakEvenCustomers:
      label === 'Base case'
        ? breakEvenForCostBase()
        : breakEvenForCost(cost),
    interpretation,
  });

  return [
    row(
      'Base case',
      baseRevenue,
      baseCostBase,
      'Current assumptions as entered.'
    ),
    row(
      'Revenue down 20%',
      baseRevenue === null ? null : baseRevenue * 0.8,
      baseCostBase,
      'Useful for mild trading weakness without changing the cost base.'
    ),
    row(
      'Revenue down 40%',
      baseRevenue === null ? null : baseRevenue * 0.6,
      baseCostBase,
      'Shows whether the site still works if early trading is materially softer.'
    ),
    row(
      'Costs up 15%',
      baseRevenue,
      baseCostBase === null ? null : baseCostBase * 1.15,
      'Tests staff, rates, utilities, and operating pressure.'
    ),
    row(
      'Rent reduced 10%',
      baseRevenue,
      baseCostBase === null || monthlyRent === null ? null : baseCostBase - monthlyRent * 0.1,
      'Shows the effect of a modest rent concession.'
    ),
  ];
}

function getNegotiationLevers(request: ReportRequest): Array<{
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  whyItMatters: string;
  askFor: string;
}> {
  const figures = getCommercialContext(request);

  const highIfCashTight = figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000;
  const highIfNegativeCash = figures.cashAfterOpening !== null && figures.cashAfterOpening < 0;
  const highIfRentHeavy = figures.rentBurden !== null && figures.rentBurden > 18;
  const highIfSurvivalWeak = !figures.survivesSixBadMonths;

  const priority = (high: boolean, medium: boolean = false): 'High' | 'Medium' | 'Low' => {
    if (high) return 'High';
    if (medium) return 'Medium';
    return 'Low';
  };

  return [
    {
      title: 'Lower headline rent',
      priority: priority(highIfRentHeavy || highIfSurvivalWeak),
      whyItMatters:
        figures.monthlyRent !== null && figures.rentBurden !== null
          ? `A 10% rent cut would reduce monthly rent from ${formatCurrency(figures.monthlyRent)} to ${formatCurrency(figures.monthlyRent * 0.9)} and move rent burden from ${figures.rentBurden.toFixed(1)}% to about ${(figures.rentBurden * 0.9).toFixed(1)}% if revenue stays the same.`
          : 'Lower rent can move the site into a healthier burden band and reduce pressure on break-even customers.',
      askFor: 'Ask for a lower headline rent, stepped rent, or a rent-free start if the landlord wants the deal to progress.',
    },
    {
      title: 'Rent-free period',
      priority: priority(highIfNegativeCash || highIfCashTight),
      whyItMatters:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 0
          ? `A rent-free start would help close the ${getOpeningShortfall(request) ?? 'opening shortfall'} by keeping more cash in the business while trading settles.`
          : 'A rent-free start gives the business more breathing room while trading settles and opening costs are absorbed.',
      askFor: 'Ask for a rent-free period that covers fit-out, launch, and the first months of trading.',
    },
    {
      title: 'Landlord fit-out contribution',
      priority: priority(highIfNegativeCash),
      whyItMatters:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 0
          ? 'A contribution to fit-out reduces the opening capital stack and can close a shortfall before trading starts.'
          : 'A contribution to fit-out reduces the opening capital stack and improves working capital after launch.',
      askFor: 'Ask for a contribution to fit-out, plant, or any landlord works that would otherwise drain cash.',
    },
    {
      title: 'Reduced deposit',
      priority: priority(highIfNegativeCash || highIfCashTight),
      whyItMatters:
        figures.startingCash !== null
          ? `A smaller deposit keeps more of the ${formatCurrency(figures.startingCash)} starting cash available for launch costs and early working capital.`
          : 'A smaller deposit keeps more cash in the business for launch costs and early working capital.',
      askFor: 'Ask for a reduced deposit or staged deposit if the opening capital stack is tight.',
    },
    {
      title: 'Break clause',
      priority: priority(highIfSurvivalWeak),
      whyItMatters: 'A break clause reduces the cost of a weak site if the trading case fails to improve after launch.',
      askFor: 'Ask for an early break option that reduces downside if trading does not improve.',
    },
    {
      title: 'Service charge cap',
      priority: priority(highIfRentHeavy),
      whyItMatters:
        figures.rentBurden !== null
          ? `A cap matters more at a ${figures.rentBurden.toFixed(1)}% rent burden because any extra shared cost quickly narrows the buffer.`
          : 'A cap keeps shared-cost pressure from drifting higher after the lease is signed.',
      askFor: 'Ask for a service charge cap or clearer service charge mechanics before signing.',
    },
    {
      title: 'Repairing obligations',
      priority: priority(highIfNegativeCash || highIfSurvivalWeak),
      whyItMatters:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000
          ? 'Clear repair wording avoids hidden costs that can erode an already thin opening buffer.'
          : 'Clear repair wording avoids hidden costs that can erode already thin margins.',
      askFor: 'Ask for a clearer repair schedule and tighter wording on what the tenant is expected to maintain.',
    },
    {
      title: 'Permitted use flexibility',
      priority: priority(highIfSurvivalWeak),
      whyItMatters:
        figures.expectedCustomers !== null
          ? `Flexible permitted use helps if the original trading concept needs to adapt after opening or if the ${formatNumber(figures.expectedCustomers)} expected customers/day assumption proves too optimistic.`
          : 'Flexible permitted use helps if the original trading concept needs to adapt after opening.',
      askFor: 'Ask for wider permitted use so the site can adapt if the concept needs to change.',
    },
  ];
}

function getEvidenceSections(request: ReportRequest): Array<{
  title: string;
  context: string;
  items: Array<{ label: string; detail: string }>;
}> {
  const figures = getCommercialContext(request);

  return [
    {
      title: 'A. Trading evidence',
      context: getLeaseQuestionsContext(request),
      items: [
        {
          label: 'Footfall counts',
          detail:
            figures.expectedCustomers !== null && figures.breakEven !== null
              ? `The file relies on ${figures.expectedCustomers.toFixed(1)} expected customers/day against ${figures.breakEven.toFixed(1)} break-even/day.`
              : 'The file relies on the entered footfall assumptions being realistic.',
        },
        {
          label: 'Competitor observations',
          detail:
            figures.expectedCustomers !== null
              ? `Use nearby trader observations to test whether ${figures.expectedCustomers.toFixed(1)} customers/day is realistic here.`
              : 'Use nearby trader observations to test whether the customer assumption is realistic here.',
        },
        {
          label: 'Average spend validation',
          detail:
            figures.averageSpend !== null
              ? `The file assumes an average spend of ${formatCurrency(figures.averageSpend)} per customer, so the basket size needs evidence.`
              : 'The file depends on the entered average spend assumption, so the basket size needs evidence.',
        },
        {
          label: 'Opening-hours assumption',
          detail:
            figures.openingDays !== null
              ? `The revenue case is built on ${figures.openingDays.toFixed(0)} opening days per month, so the trading pattern matters.`
              : 'The revenue case is built on the entered opening-hours assumption, so the trading pattern matters.',
        },
        {
          label: 'Local demand',
          detail: 'Support the footfall case with local demand evidence, not just a good impression of the location.',
        },
      ],
    },
    {
      title: 'B. Cost evidence',
      context: getDueDiligenceContext(request),
      items: [
        {
          label: 'Business rates bill or estimate',
          detail: 'Confirm the monthly rates assumption so the cost base is not understated.',
        },
        {
          label: 'Utility estimate',
          detail: 'Check utilities because the model only works if the non-rent overheads are credible.',
        },
        {
          label: 'Insurance',
          detail: 'Add the real insurance quote so the monthly cost base does not drift after signing.',
        },
        {
          label: 'Service charge',
          detail:
            figures.rentBurden !== null && figures.rentBurden > 18
              ? `At a ${figures.rentBurden.toFixed(1)}% rent burden, service charge terms matter more because extra shared costs quickly eat the buffer.`
              : 'Service charge terms still need checking because extra shared costs quickly affect the result.',
        },
        {
          label: 'Fit-out quotes',
          detail:
            figures.input.fitOutBudget !== undefined && figures.input.fitOutBudget !== null
              ? `The opening capital stack assumes ${formatCurrency(figures.input.fitOutBudget)} of fit-out spend, so that number needs a quote.`
              : 'The opening capital stack assumes fit-out spend, so that number needs a quote.',
        },
        {
          label: 'Legal fees',
          detail:
            figures.input.legalFees !== undefined && figures.input.legalFees !== null
              ? `The file assumes ${formatCurrency(figures.input.legalFees)} of legal spend, so the figure should be checked before signing.`
              : 'The file assumes legal spend, so the figure should be checked before signing.',
        },
      ],
    },
    {
      title: 'C. Lease and legal evidence',
      context:
        'Ask the solicitor to review the lease wording before committing. These are the points most likely to change the real cost of the site after signing.',
      items: [
        {
          label: 'Rent review',
          detail:
            figures.rentBurden !== null
              ? `With rent burden already at ${figures.rentBurden.toFixed(1)}%, rent review wording matters more than it would on a lighter-burden site.`
              : 'Rent review wording matters because it can move the file from workable to fragile.',
        },
        {
          label: 'Break clause',
          detail:
            figures.survivesSixBadMonths
              ? 'A break clause still matters because it limits downside if the assumptions weaken after launch.'
              : 'A break clause matters because the six-month test is already under pressure.',
        },
        {
          label: 'Repairing obligations',
          detail:
            figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000
              ? 'Repair wording matters more when the opening buffer is tight.'
              : 'Repair wording still matters because hidden obligations can widen the gap after signing.',
        },
        {
          label: 'Assignment and subletting',
          detail: 'Exit flexibility is important if the case weakens or the concept needs to change.',
        },
        {
          label: 'Planning and licensing',
          detail: 'Check planning and licensing so the numbers are not based on an unopenable use case.',
        },
        {
          label: 'Handover condition',
          detail: 'Confirm the handover condition so you know whether the site needs further work before opening.',
        },
      ],
    },
  ];
}

function getRankedActionItems(request: ReportRequest): Array<{
  rank: number;
  title: string;
  why: string;
  confidence: string;
  priority: 'High' | 'Medium' | 'Low';
}> {
  const figures = getCommercialContext(request);
  const highIfRentHeavy = figures.rentBurden !== null && figures.rentBurden > 18;
  const highIfNegativeCash = figures.cashAfterOpening !== null && figures.cashAfterOpening < 0;
  const highIfTightCash = figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000;
  const customerPriority =
    figures.breakEven !== null &&
    figures.expectedCustomers !== null &&
    figures.breakEven > figures.expectedCustomers
      ? 'High'
      : figures.breakEven !== null &&
        figures.expectedCustomers !== null &&
        figures.breakEven > figures.expectedCustomers * 0.8
        ? 'Medium'
        : 'Low';

  return [
    {
      rank: 1,
      title: 'Renegotiate rent or rent-free terms',
      why:
        highIfRentHeavy
          ? `Rent burden is ${figures.rentBurden?.toFixed(1)}%, so the lease depends on the entered trading assumptions being broadly right.`
          : 'Rent still matters because the monthly cost base is a large part of the file.',
      confidence:
        figures.monthlyRent !== null && figures.rentBurden !== null
          ? `A 10% rent reduction would move monthly rent from ${formatCurrency(figures.monthlyRent)} to ${formatCurrency(figures.monthlyRent * 0.9)} and reduce rent burden from ${figures.rentBurden.toFixed(1)}% to about ${(figures.rentBurden * 0.9).toFixed(1)}%.`
          : 'Push for a lower rent, a rent-free start, or both before signing.',
      priority: highIfRentHeavy || highIfNegativeCash ? 'High' : 'Medium',
    },
    {
      rank: 2,
      title: 'Validate the customer/day and spend assumptions',
      why:
        figures.breakEven !== null && figures.expectedCustomers !== null
          ? `Break-even sits at ${figures.breakEven.toFixed(1)} customers/day against ${figures.expectedCustomers.toFixed(1)} expected, so the revenue case needs evidence.`
          : 'The revenue case needs evidence before the site can be read confidently.',
      confidence:
        figures.expectedCustomers !== null && figures.averageSpend !== null
          ? `Use footfall counts and basket checks to support the ${figures.expectedCustomers.toFixed(1)} expected customers/day assumption and the ${formatCurrency(figures.averageSpend)} average spend.`
          : 'Use footfall counts and basket checks to support the customer and spend assumptions.',
      priority: customerPriority,
    },
    {
      rank: 3,
      title: 'Confirm fit-out and setup costs',
      why:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 0
          ? `Upfront cash needed is ${formatCurrency(figures.upfrontCashNeeded)} against starting cash of ${formatCurrency(figures.startingCash)}, leaving a ${getOpeningShortfall(request) ?? 'Not available'} shortfall.`
          : 'The opening capital stack still needs quote-backed numbers before it can be trusted.',
      confidence:
        figures.input.fitOutBudget !== undefined && figures.input.fitOutBudget !== null
          ? `Get quotes for the ${formatCurrency(figures.input.fitOutBudget)} fit-out assumption, legal costs, stock, and any other setup spend.`
          : 'Get quotes for fit-out, legal costs, stock, and any other setup spend.',
      priority: highIfNegativeCash ? 'High' : highIfTightCash ? 'Medium' : 'Low',
    },
    {
      rank: 4,
      title: 'Check lease risk clauses',
      why:
        highIfTightCash || highIfRentHeavy
          ? 'Service charge, repairing obligations, and rent review terms can widen the gap quickly on a tight file.'
          : 'Lease risk clauses still need checking because they can change the real cost base after signing.',
      confidence:
        'Ask for clearer wording on service charge caps, repairing obligations, rent review, assignment, subletting, and permitted use.',
      priority: highIfRentHeavy || highIfTightCash ? 'High' : 'Medium',
    },
    {
      rank: 5,
      title: 'Retest after revised terms',
      why:
        figures.survivesSixBadMonths
          ? 'The current numbers may be workable, but the file should be rerun after any lease change.'
          : 'The current numbers do not yet clear the full survival test, so the revised terms need to be retested.',
      confidence:
        'Rerun the commercial check after any revised lease offer, budget change, or landlord contribution.',
      priority: figures.survivesSixBadMonths ? 'Low' : 'High',
    },
  ];
}

function getMethodologyNote(): string {
  return 'This file is generated from the assumptions entered into the YieldLens UK commercial check. It uses standard arithmetic on rent, expected revenue, known costs, upfront cash items, and downside trading assumptions. It does not use live market data, inspect the property, verify lease documents, or validate the user’s figures. The output is intended to structure early decision-making and due diligence questions, not to replace professional advice.';
}

function getFinalAssessment(request: ReportRequest): {
  verdict: string;
  reason: string;
  renegotiate: string;
  verify: string;
  nextStep: string;
  summary: string;
} {
  const figures = getCommercialContext(request);

  if (figures.cashAfterOpening !== null && figures.cashAfterOpening < 0) {
    return {
      verdict: 'Pause unless the upfront capital position improves.',
      reason:
        `Upfront cash needed is ${formatCurrency(figures.upfrontCashNeeded)} against starting cash of ${formatCurrency(figures.startingCash)}, leaving an opening shortfall of ${getOpeningShortfall(request) ?? 'Not available'}.`,
      renegotiate:
        'Fit-out, deposit, rent-free period, landlord contribution, or any other term that improves the opening capital stack.',
      verify:
        'Confirm fit-out quotes, deposit terms, landlord incentives, and whether the current cash stack is enough before trading begins.',
      nextStep:
        'Pause until the opening capital position improves, then retest the site on the revised numbers.',
      summary:
        'Pause unless the upfront capital position improves. The model does not currently fail because the downside month burns cash; it fails because the opening capital stack is too thin before trading begins. The priority is to renegotiate fit-out, deposit, rent-free terms, landlord contribution, or increase available starting cash before treating the site as viable.',
    };
  }

  if (
    figures.rentBurden !== null &&
    figures.rentBurden > 18 &&
    figures.cashAfterOpening !== null &&
    figures.cashAfterOpening < 15000
  ) {
    return {
      verdict: 'Renegotiate rent before committing.',
      reason:
        `Rent burden is ${figures.rentBurden.toFixed(1)}% and only ${formatCurrency(figures.cashAfterOpening)} remains after opening costs, so the lease has limited room for error even though the downside case still covers operating costs.`,
      renegotiate:
        'Rent, rent-free period, landlord contribution, deposit, or any term that improves the opening capital stack and monthly cost base.',
      verify:
        'Recheck footfall, average spend, fit-out quotes, deposit terms, and service charge wording before treating the site as a fit.',
      nextStep:
        'Renegotiate the rent position and opening terms, then retest the site with revised assumptions.',
      summary:
        'The lease economics are still carrying too much pressure from rent and opening costs for the margin of safety to feel comfortable.',
    };
  }

  if (!figures.survivesSixBadMonths && figures.downsideMonthlyPosition !== null && figures.downsideMonthlyPosition >= 0) {
    return {
      verdict: 'Renegotiate upfront terms before signing.',
      reason:
        'The downside month still covers operating costs, so the issue is funding before opening rather than monthly burn after launch.',
      renegotiate:
        'Rent-free time, reduced deposit, landlord contribution, or lower fit-out costs.',
      verify:
        'Confirm that the site can be funded to opening without stretching the cash buffer too far.',
      nextStep:
        'Renegotiate the upfront deal structure, then rerun the check with the revised terms.',
      summary:
        'Renegotiate upfront terms before signing. The downside month still covers operating costs, but the site does not yet have enough opening support to clear the six-month test comfortably.',
    };
  }

  if (figures.rentBurden !== null && figures.rentBurden > 18) {
    return {
      verdict: 'Renegotiate rent before committing.',
      reason: `Rent burden is ${figures.rentBurden.toFixed(1)}% of expected monthly revenue, which is high enough to demand stronger trading or a better lease deal.`,
      renegotiate:
        'Rent level, break clause, service charge cap, and any landlord support that improves the monthly cost base.',
      verify:
        'Recheck footfall, average spend, and local competitor pressure before treating the site as a fit.',
      nextStep:
        'Renegotiate the rent position, then retest the site with the revised lease terms.',
      summary:
        'The lease economics need to improve before the numbers feel comfortable enough for a deeper due diligence pass.',
    };
  }

  if (figures.survivesSixBadMonths) {
    return {
      verdict: 'Proceed to deeper due diligence.',
      reason:
        'The current assumptions look workable on the numbers, but the lease still needs closer checking before any commitment.',
      renegotiate:
        'Use the due diligence pass to improve any remaining weak lease points before signing.',
      verify:
        'Footfall, competitors, costs, rent review terms, repair obligations, and permitted use.',
      nextStep:
        'Proceed to deeper due diligence and keep pressure-testing the site before committing.',
      summary:
        'The numbers are workable enough to keep going, but the lease still needs closer checking before any commitment.',
    };
  }

  return {
    verdict: 'Renegotiate and retest.',
    reason:
      'The site does not clear the full survival test on the current assumptions, so more breathing room is needed before the numbers feel comfortable.',
    renegotiate:
      'Rent, upfront costs, opening cash, or the lease terms that drive the weakest parts of the model.',
    verify:
      'Cost evidence, trading evidence, and any lease clauses that could increase the real risk.',
    nextStep:
      'Renegotiate the weak points, then rerun the check before deciding whether to continue.',
    summary:
      'The current assumptions do not yet give a clean enough result to move straight to commitment.',
  };
}

function getChecklistItems(request: ReportRequest): Array<{ label: string; detail: string }> {
  const figures = getCommercialContext(request);

  return [
    {
      label: 'Break clause',
      detail:
        figures.survivesSixBadMonths
          ? 'A break clause still matters because it limits downside if trading weakens after launch.'
          : 'A break clause matters because the six-month test is already under pressure.',
    },
    {
      label: 'Rent review mechanism',
      detail:
        figures.rentBurden !== null
          ? `At ${figures.rentBurden.toFixed(1)}% rent burden, future rent review wording matters more than it would on a lighter-burden site.`
          : 'Rent review wording matters because it can move the file from workable to fragile.',
    },
    {
      label: 'Repairing obligations',
      detail:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000
          ? 'Repair wording matters more when the opening buffer is tight.'
          : 'Repair wording still matters because hidden obligations can widen the gap after signing.',
    },
    {
      label: 'Service charge',
      detail:
        figures.rentBurden !== null && figures.rentBurden > 18
          ? `Service charge terms matter more at a ${figures.rentBurden.toFixed(1)}% rent burden because extra shared cost quickly narrows the buffer.`
          : 'Service charge terms still need checking because extra shared cost quickly affects the result.',
    },
    {
      label: 'Permitted use',
      detail:
        figures.expectedCustomers !== null
          ? `Flexible permitted use helps if the ${figures.expectedCustomers.toFixed(1)} expected customers/day assumption proves too optimistic.`
          : 'Flexible permitted use helps if the original trading concept needs to adapt after opening.',
    },
    {
      label: 'Deposit terms',
      detail:
        figures.startingCash !== null
          ? `A smaller deposit keeps more of the ${formatCurrency(figures.startingCash)} starting cash available for launch costs and early working capital.`
          : 'A smaller deposit keeps more cash in the business for launch costs and early working capital.',
    },
    {
      label: 'Handover condition',
      detail: 'Confirm the handover condition so you know whether the site needs further work before opening.',
    },
    {
      label: 'Licensing and planning',
      detail: 'Check planning and licensing so the numbers are not based on an unopenable use case.',
    },
    {
      label: 'Nearby restrictions',
      detail: 'Check exclusivity or nearby competitor restrictions because they can affect the trading case.',
    },
    {
      label: 'Assignment and subletting',
      detail: 'Exit flexibility is important if the case weakens or the concept needs to change.',
    },
  ];
}

function getLeaseQuestionsContext(request: ReportRequest): string {
  const figures = getCommercialContext(request);
  const parts: string[] = [];

  if (figures.rentBurden !== null && figures.rentBurden > 18) {
    parts.push(
      `Because rent burden is ${figures.rentBurden.toFixed(1)}%, service charge caps and rent review wording matter more here.`
    );
  }

  if (figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000) {
    parts.push(
      `Because only ${formatCurrency(figures.cashAfterOpening)} remains after opening costs, deposit, rent-free period, repair obligations, and fit-out contribution matter more.`
    );
  }

  return parts.length > 0
    ? parts.join(' ')
    : 'The lease questions below are the points that most often change a commercial site from workable to fragile.';
}

function getDueDiligenceContext(request: ReportRequest): string {
  const figures = getCommercialContext(request);
  const parts: string[] = [];

  if (figures.expectedCustomers !== null) {
    parts.push(
      `Because the model relies on ${formatNumber(figures.expectedCustomers)} customers/day, footfall checks and competitor observations are high-value evidence.`
    );
  }

  if (figures.breakEven !== null) {
    parts.push(
      `Because break-even is ${formatNumber(figures.breakEven)} customers/day, the site has room on paper, but only if customer and spend assumptions are real.`
    );
  }

  if (figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000) {
    parts.push(
      `Because the opening cash buffer is limited, fit-out quotes and setup costs need tighter verification.`
    );
  }

  return parts.length > 0
    ? parts.join(' ')
    : 'The due diligence checklist focuses on the evidence that most often changes the commercial case.';
}

function getDueDiligenceItems(request: ReportRequest): Array<{ label: string; detail: string }> {
  const figures = getCommercialContext(request);

  return [
    {
      label: 'Visit the site at peak and off-peak times',
      detail: 'Check whether the location feels busy enough to support the entered customer assumption.',
    },
    {
      label: 'Count footfall manually',
      detail:
        figures.expectedCustomers !== null && figures.breakEven !== null
          ? `The file relies on ${figures.expectedCustomers.toFixed(1)} expected customers/day against ${figures.breakEven.toFixed(1)} break-even/day.`
          : 'The file relies on the entered footfall assumptions being realistic.',
    },
    {
      label: 'Compare nearby direct competitors',
      detail:
        figures.expectedCustomers !== null
          ? `Use nearby trader observations to test whether ${figures.expectedCustomers.toFixed(1)} customers/day is realistic here.`
          : 'Use nearby trader observations to test whether the customer assumption is realistic here.',
    },
    {
      label: 'Verify business rates',
      detail: 'Confirm the monthly rates assumption so the cost base is not understated.',
    },
    {
      label: 'Verify utilities, service charge, and insurance',
      detail: 'Check the non-rent overheads because the model only works if they are credible.',
    },
    {
      label: 'Confirm fit-out quotes',
      detail:
        figures.input.fitOutBudget !== undefined && figures.input.fitOutBudget !== null
          ? `The opening capital stack assumes ${formatCurrency(figures.input.fitOutBudget)} of fit-out spend, so that number needs a quote.`
          : 'The opening capital stack assumes fit-out spend, so that number needs a quote.',
    },
    {
      label: 'Confirm legal costs',
      detail:
        figures.input.legalFees !== undefined && figures.input.legalFees !== null
          ? `The file assumes ${formatCurrency(figures.input.legalFees)} of legal spend, so the figure should be checked before signing.`
          : 'The file assumes legal spend, so the figure should be checked before signing.',
    },
    {
      label: 'Stress-test lower customers and lower spend',
      detail:
        figures.averageSpend !== null
          ? `The file assumes an average spend of ${formatCurrency(figures.averageSpend)} per customer, so the basket size needs evidence.`
          : 'The file depends on the entered average spend assumption, so the basket size needs evidence.',
    },
    {
      label: 'Confirm landlord incentives or rent-free period',
      detail:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 0
          ? `The current file shows a ${getOpeningShortfall(request) ?? 'Not available'} opening shortfall, so landlord support could be critical.`
          : 'Landlord incentives can still improve the opening capital stack and working capital.',
    },
    {
      label: 'Review with a solicitor and accountant before signing',
      detail: 'Use professionals to sanity-check the commercial, legal, and tax implications before committing.',
    },
  ];
}

function getDecisionQuestions(request: ReportRequest): Array<{ question: string; answer: string }> {
  const figures = getCommercialContext(request);
  const assessment = getFinalAssessment(request);

  return [
    {
      question: 'Can the site still work if revenue is lower than expected?',
      answer:
        figures.survivesSixBadMonths
          ? 'The downside month still covers operating costs, but the opening capital stack and lease terms still need to stay controlled.'
          : 'Not comfortably on the current assumptions, so the site needs stronger terms or lower monthly pressure before signing feels safer.',
    },
    {
      question: 'Is there enough cash after fit-out and deposit?',
      answer:
        figures.cashAfterOpening !== null
          ? figures.cashAfterOpening < 0
            ? `No. The opening capital stack shows a shortfall of ${getOpeningShortfall(request) ?? 'Not available'} before trading begins.`
            : `Yes, but only ${formatCurrency(figures.cashAfterOpening)} remains after opening costs, so the buffer still needs careful checking.`
          : 'Not available on the current inputs.',
    },
    {
      question: 'Are lease costs capped or uncertain?',
      answer:
        figures.rentBurden !== null && figures.rentBurden > 18
          ? 'The rent burden is already high enough that service charge, repairs, and review wording matter more than they would on a lighter-burden site.'
          : 'Service charge, repairs, rent review, and assignment wording still need confirming because they can change the real cost of the lease.',
    },
    {
      question: 'What would change the verdict?',
      answer:
        assessment.nextStep +
        ' A better opening capital stack, lower rent, or stronger evidence for revenue are the main changes that would move the file in a better direction.',
    },
    {
      question: 'Should you still get professional advice?',
      answer:
        'Yes. This memo is decision-support only and does not replace legal, tax, finance, valuation, or property review.',
    },
  ];
}

function getReportReference(request: ReportRequest): string {
  return getShortReference(request.id);
}

async function getPaidCustomerReport(id: string): Promise<ReportRequest | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('report_requests')
    .select(
      'id, created_at, submission_id, mode, address, postcode, score, verdict_label, requested_report_type, status, fulfilment_status, lead_quality, internal_notes, payment_status, amount_due_pence, amount_paid_pence, currency, stripe_checkout_session_id, stripe_payment_intent_id, customer_access_token, updated_at, contacted_at, input_json, result_json'
    )
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  if (data.mode !== 'commercial' || data.payment_status !== 'paid') {
    return null;
  }

  return {
    id: data.id,
    createdAt: data.created_at,
    submissionId: data.submission_id,
    mode: data.mode,
    address: data.address,
    postcode: data.postcode,
    email: '',
    score: data.score,
    verdictLabel: data.verdict_label,
    requestedReportType: data.requested_report_type,
    status: data.status,
    fulfilmentStatus: data.fulfilment_status,
    leadQuality: data.lead_quality,
    internalNotes: data.internal_notes,
    paymentStatus: data.payment_status,
    amountDuePence: data.amount_due_pence,
    amountPaidPence: data.amount_paid_pence,
    currency: data.currency,
    stripeCheckoutSessionId: data.stripe_checkout_session_id,
    stripePaymentIntentId: data.stripe_payment_intent_id,
    customerAccessToken: data.customer_access_token,
    updatedAt: data.updated_at,
    contactedAt: data.contacted_at,
    input: data.input_json,
    result: data.result_json,
  };
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <p className="text-xs font-medium uppercase tracking-widest text-green-700 mb-3">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
        {title}
      </h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
    </div>
  );
}

function AccessHelpState() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-white p-8 sm:p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-3">
          Access issue
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-950 mb-4">
          We could not open this commercial viability file.
        </h1>

        <p className="text-sm sm:text-base text-[var(--yieldlens-muted)] leading-7 max-w-2xl">
          This usually means the saved result is unavailable, the access link is
          incomplete, or the file has not been unlocked yet. If you have just
          completed checkout, wait a short moment and reopen the success page.
        </p>

        <p className="text-sm text-stone-600 leading-7 max-w-2xl mt-4">
          If you still cannot open the file, email yieldlensuk@gmail.com with
          the email used at checkout, the approximate payment time, and a short
          description of what happened. Do not send payment card details or
          other sensitive information by email.
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
          <Link
            href="/how-it-works"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-[var(--yieldlens-caution)] hover:bg-[#F7F6F3]"
          >
            Read how it works
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[var(--yieldlens-border)] bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-400 hover:bg-[var(--yieldlens-panel)]"
          >
            Contact support
          </Link>
        </div>

        <p className="mt-6 text-sm text-stone-500 leading-6 max-w-2xl">
          YieldLens UK provides indicative decision-support only. It is not
          financial advice, legal advice, tax advice, a valuation, or a substitute
          for professional due diligence.
        </p>
      </div>
    </div>
  );
}

export default async function CommercialViabilityFilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id?: string | string[] }>;
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const routeParams = await params;
  const routeSearchParams = await searchParams;
  const reportRequestId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id ?? '';
  const token = Array.isArray(routeSearchParams.token)
    ? routeSearchParams.token[0]
    : routeSearchParams.token ?? '';

  if (!reportRequestId) {
    return <AccessHelpState />;
  }

  if (token) {
    redirect(
      `/commercial-viability-file/${encodeURIComponent(reportRequestId)}/unlock?token=${encodeURIComponent(token)}`
    );
  }

  const request = await getPaidCustomerReport(reportRequestId);

  if (!request) {
    return <AccessHelpState />;
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(getCustomerAccessCookieName(reportRequestId))?.value ?? '';

  if (!accessToken || accessToken !== request.customerAccessToken) {
    return <AccessHelpState />;
  }

  const context = getCommercialContext(request);
  const assessment = getFinalAssessment(request);
  const verdictTone = getVerdictToneClasses(request.verdictLabel);
  const executiveHighlights = getExecutiveHighlights(request, assessment);
  const whatMattersMost = getWhatMattersMost(request);
  const reportDate = new Date(request.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-stone-50 text-stone-900 print-memo">
      <FunnelEventTracker
        eventName="paid_file_opened"
        pagePath="/commercial-viability-file/[id]"
        pageType="paid_file"
        mode="commercial"
        eventLabel="Paid file opened"
        googleAdsConversion="paid_file_opened"
        googleAdsDedupeKey={request.id}
      />
      <style>{`
        @media print {
          @page {
            margin: 12mm;
          }

          html,
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          header,
          nav,
          footer,
          .customer-print-hide {
            display: none !important;
          }

          .print-memo .bg-stone-950 {
            background: #ffffff !important;
            color: #111827 !important;
          }

          .print-memo .bg-stone-950 * {
            color: #111827 !important;
          }

          .print-memo .bg-stone-950 .border-white\\/10,
          .print-memo .bg-stone-950 .border-white\\/15,
          .print-memo .bg-stone-950 .border-white\\/20 {
            border-color: #d6d3d1 !important;
          }

          .print-memo .bg-stone-950 .bg-white\\/5,
          .print-memo .bg-stone-950 .bg-white\\/6,
          .print-memo .bg-stone-950 .bg-white\\/10 {
            background: #f8faf6 !important;
          }

          .customer-print-section {
            break-inside: avoid-page;
            page-break-inside: avoid;
          }

          .customer-print-card {
            break-inside: avoid-page;
            page-break-inside: avoid;
          }
        }
      `}</style>
      <section className="bg-stone-950 text-white customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-green-300 mb-4">
                Standard commercial viability file
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-5">
                Standard commercial viability file
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl leading-8">
                A £49 decision memo that turns the saved commercial result into one printable report for negotiation and due diligence. It pulls the rent burden, break-even customers, opening capital stack, downside trading, lease questions, and next actions into one place.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                <div className={`rounded-3xl border px-4 py-4 ${verdictTone.badge}`}>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-1">Verdict</p>
                  <p className="text-lg font-bold">{getCommercialVerdictLabel(request.verdictLabel)}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/6 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">Score</p>
                  <p className="text-3xl font-bold tabular-nums">{request.score}/100</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/6 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">Reference</p>
                  <p className="text-2xl font-bold tracking-[0.08em]">{getReportReference(request)}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">Generated</p>
                  <p className="text-sm text-stone-200 leading-6">{reportDate}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">Final interpretation</p>
                  <p className="text-sm text-stone-200 leading-6">{assessment.summary}</p>
                </div>
              </div>

              <p className="mt-6 text-xs text-stone-400 leading-6 max-w-3xl">
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>

              <p className="mt-4 text-sm text-stone-300 leading-6 max-w-3xl">
                Need access help after payment? Email{' '}
                <a
                  href="mailto:yieldlensuk@gmail.com?subject=YieldLens%20support"
                  className="font-medium text-[#DCCDA8] hover:underline"
                >
                  yieldlensuk@gmail.com
                </a>{' '}
                and include the email used at checkout, approximate payment time, and a short description of the issue. Do not send card details.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 customer-print-hide">
                <PrintButton />
              </div>

              <p className="mt-3 text-xs text-stone-400 leading-5 customer-print-hide">
                For a cleaner PDF, turn off browser headers and footers in the print dialog.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white text-stone-900 p-5 sm:p-6 shadow-[0_24px_64px_rgba(15,23,42,0.18)] customer-print-card">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-green-700 font-semibold mb-1">
                    Report cover
                  </p>
                  <p className="text-2xl font-bold text-stone-950">{getCommercialVerdictLabel(request.verdictLabel)}</p>
                  <p className="text-sm text-stone-500 mt-1">
                    Reference {getReportReference(request)} · {reportDate}
                  </p>
                </div>
                <div className={`rounded-3xl border px-3 py-2 text-right ${verdictTone.subtle}`}>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold">Score</p>
                  <p className="text-3xl font-bold tabular-nums">{request.score}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Rent burden', value: formatPercent(context.rentBurden), tone: context.rentBurden !== null && context.rentBurden > 18 ? 'text-amber-900 bg-amber-50 border-amber-200' : 'text-green-900 bg-green-50 border-green-200' },
                  { label: 'Break-even/day', value: formatNumber(context.breakEven), tone: 'text-stone-900 bg-stone-50 border-stone-200' },
                  { label: 'Opening position', value: getOpeningPositionSummary(request).value, tone: getOpeningPositionTone(request) },
                  { label: 'Six-month test', value: context.survivesSixBadMonths ? 'Pass' : 'Fail', tone: context.survivesSixBadMonths ? 'text-green-900 bg-green-50 border-green-200' : 'text-rose-950 bg-rose-50 border-rose-200' },
                ].map((metric) => (
                  <div key={metric.label} className={`rounded-3xl border px-4 py-4 ${metric.tone}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold tabular-nums">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-400 font-semibold mb-1">
                  One-line read
                </p>
                <p className={`text-sm leading-7 ${verdictTone.highlight}`}>
                  {assessment.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 customer-print-section">
        <SectionTitle
          eyebrow="Main pressure points"
          title="What drives the verdict"
          description={getExecutiveSummary(request)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {executiveHighlights.map((item) => (
            <div
              key={item.label}
              className={`rounded-3xl border p-5 shadow-sm customer-print-card ${
                item.tone === 'green'
                  ? 'border-green-200 bg-green-50'
                  : item.tone === 'teal'
                    ? 'border-green-200 bg-green-50'
                    : item.tone === 'amber'
                      ? 'border-amber-200 bg-amber-50'
                      : 'border-rose-200 bg-rose-50'
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-stone-500 mb-2">
                {item.label}
              </p>
              <p className="text-sm text-stone-800 leading-7">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200 customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Assumptions used"
            title="The figures behind this memo."
            description="These are the saved inputs the file uses. If they change, rerun the free commercial check and review the result again."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {getAssumptionRows(request).map((item) => (
              <div key={item.label} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm customer-print-card">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-stone-950 tabular-nums">{item.value}</p>
                <p className="mt-2 text-sm text-stone-600 leading-6">{item.helper}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200 customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Decision-support visuals"
            title="The fast read before the written detail."
            description="These four views show the rent burden, break-even gap, opening capital stack, and downside survival test together."
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="customer-print-card break-inside-avoid">
              <RentBurdenGauge rentBurdenPercentage={context.rentBurden} />
            </div>
            <div className="customer-print-card break-inside-avoid">
              <BreakEvenComparison
                breakEvenCustomersPerDay={context.breakEven ?? undefined}
                expectedCustomersPerDay={context.expectedCustomers ?? undefined}
              />
            </div>
            <div className="customer-print-card break-inside-avoid">
              <OpeningCashWaterfall
                startingCash={context.startingCash ?? undefined}
                fitOutBudget={toNumber(context.input.fitOutBudget) ?? undefined}
                rentDeposit={toNumber(context.input.rentDeposit) ?? undefined}
                legalFees={toNumber(context.input.legalFees) ?? undefined}
                openingStock={toNumber(context.input.openingStock) ?? undefined}
                otherSetupCosts={toNumber(context.input.otherSetupCosts) ?? undefined}
                upfrontCashNeeded={context.upfrontCashNeeded ?? undefined}
                cashAfterOpening={context.cashAfterOpening ?? undefined}
              />
            </div>
            <div className="customer-print-card break-inside-avoid">
              <DownsideSurvivalCard
                downsideRevenuePercentage={context.downsideRevenuePercentage ?? undefined}
                downsideMonthlyRevenue={context.downsideMonthlyRevenue ?? undefined}
                monthlyCostBase={context.monthlyCostBase ?? undefined}
                downsideMonthlyPosition={context.downsideMonthlyPosition ?? undefined}
                monthlyBurnInDownside={context.monthlyBurnInDownside ?? undefined}
                survivalMonths={context.survivalMonths ?? undefined}
                survivesSixBadMonths={context.survivesSixBadMonths}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 customer-print-section">
        <SectionTitle
          eyebrow="File details"
          title="The saved result this memo is built from."
          description="These are the property details and file reference attached to the saved result."
        />
        <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm customer-print-card">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {getSiteSnapshotRows(request).map((row, index) => (
                <tr key={row.label} className={index === 0 ? '' : 'border-t border-stone-100'}>
                  <th className="px-4 py-4 text-left text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold w-[40%]">
                    {row.label}
                  </th>
                  <td className="px-4 py-4 text-sm text-stone-800 font-medium">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-stone-950 text-white customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Key viability metrics"
            title="The core numbers the file makes easy to review."
            description="This table is the formal read of the model. Positive and negative fields are kept visible rather than hidden in summary cards."
          />
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white text-stone-900 shadow-2xl customer-print-card">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-50 text-left border-b border-stone-200">
                  <th className="py-3 px-4 font-semibold text-stone-700">Metric</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Value</th>
                </tr>
              </thead>
              <tbody>
                {getMetricRows(request).map((item) => (
                  <tr key={item.label} className="border-b border-stone-100 align-top">
                    <td className="py-3 px-4 font-medium text-stone-900">{item.label}</td>
                    <td className={`py-3 px-4 font-semibold tabular-nums ${
                      item.tone === 'negative'
                        ? 'text-rose-700'
                        : item.tone === 'warning'
                          ? 'text-amber-700'
                          : item.tone === 'positive'
                            ? 'text-green-700'
                            : 'text-stone-900'
                    }`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-stone-400 leading-6 max-w-4xl">
            The formal table keeps the score, rent burden, opening cash, downside case, and survival test in one place so the weak point is obvious.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200 customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Stress-test scenarios"
            title="How the site behaves under weaker trading or better lease terms."
          />
          <div className="overflow-x-auto rounded-3xl border border-stone-200 customer-print-card">
            <table className="w-full border-collapse text-sm bg-white">
              <thead>
                <tr className="bg-stone-50 text-left border-b border-stone-200">
                  <th className="py-3 px-4 font-semibold text-stone-700">Scenario</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Monthly revenue</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Monthly position</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Break-even/day</th>
                  <th className="py-3 px-4 font-semibold text-stone-700">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {getStressTestScenarios(request).map((row) => (
                  <tr key={row.label} className="border-b border-stone-100 align-top">
                    <td className="py-3 px-4 font-medium text-stone-900">{row.label}</td>
                    <td className="py-3 px-4 text-stone-700">{row.monthlyRevenue}</td>
                    <td
                      className={`py-3 px-4 font-semibold tabular-nums ${
                        row.monthlyPosition.startsWith('-')
                          ? 'text-rose-700'
                          : row.monthlyPosition === 'Not available'
                            ? 'text-stone-500'
                            : 'text-green-700'
                      }`}
                    >
                      {row.monthlyPosition}
                    </td>
                    <td className="py-3 px-4 text-stone-700">{row.breakEvenCustomers}</td>
                    <td className="py-3 px-4 text-stone-600 leading-6">{row.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 customer-print-section">
        <SectionTitle
          eyebrow="What would make this stronger"
          title="The levers that improve the position."
          description="These are the areas that usually move the memo in a better direction before signing."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getWhatWouldNeedToImprove(request).map((item) => (
            <div key={item.title} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm customer-print-card">
              <p className="text-sm font-semibold text-stone-900">{item.title}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-400">Current</p>
              <p className="text-sm text-stone-700 leading-6">{item.current}</p>
              <div className="mt-3 rounded-2xl border border-stone-100 bg-stone-50 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Target</p>
                <p className="mt-1 text-sm text-stone-700 leading-6">{item.target}</p>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-stone-400">What would improve it</p>
              <p className="mt-1 text-sm text-stone-600 leading-7">{item.action}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 customer-print-section">
        <SectionTitle
          eyebrow="Negotiation levers"
          title="Practical lease points worth testing before signing."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {getNegotiationLevers(request).map((item) => (
            <div key={item.title} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm customer-print-card">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
                  {item.priority}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-400 mt-3">Why it matters</p>
              <p className="text-sm text-stone-600 leading-7 mt-1">{item.whyItMatters}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-400 mt-3">What to ask for</p>
              <p className="text-sm text-stone-700 leading-7 mt-1">{item.askFor}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200 customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Evidence needed before signing"
            title="Trading, cost, and lease evidence that should be checked first."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {getEvidenceSections(request).map((section) => (
              <div key={section.title} className="rounded-3xl border border-stone-200 bg-stone-50 p-5 shadow-sm customer-print-card">
                <p className="text-sm font-semibold text-stone-900">{section.title}</p>
                <p className="text-sm text-stone-600 leading-6 mt-2">{section.context}</p>
                <ul className="mt-3 space-y-2 text-sm text-stone-700 leading-6">
                  {section.items.map((item) => (
                    <li key={item.label} className="space-y-1">
                      <p className="font-medium text-stone-900">{item.label}</p>
                      <p className="text-stone-600 leading-6">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 customer-print-section">
        <SectionTitle
          eyebrow="Risk interpretation"
          title="How the file reads when the numbers are pulled together."
        />
        <p className="text-sm text-stone-700 leading-7 max-w-4xl">{getRiskInterpretation(request)}</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 customer-print-section">
        <SectionTitle
          eyebrow="Lease questions to verify"
          title="The lease points that matter most on this file."
          description={getLeaseQuestionsContext(request)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {getChecklistItems(request).map((item) => (
            <div key={item.label} className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm customer-print-card">
              <p className="font-medium text-stone-900">{item.label}</p>
              <p className="text-stone-600 leading-6 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200 customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Due diligence checklist"
            title="The checks that should happen before signing."
            description={getDueDiligenceContext(request)}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {getDueDiligenceItems(request).map((item) => (
              <div key={item.label} className="rounded-3xl border border-stone-200 bg-stone-50 p-5 shadow-sm customer-print-card">
                <p className="text-sm font-semibold text-stone-900">{item.label}</p>
                <p className="text-sm text-stone-600 leading-6 mt-2">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 customer-print-section">
        <SectionTitle
          eyebrow="Decision questions"
          title="The questions that decide whether the site still works."
          description="Use these to pressure-test the memo before you commit."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getDecisionQuestions(request).map((item) => (
            <div key={item.question} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm customer-print-card">
              <p className="text-sm font-semibold text-stone-900">{item.question}</p>
              <p className="mt-2 text-sm text-stone-600 leading-7">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F3F1] border-y border-stone-200 customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Important limits"
            title="Read this memo as decision-support, not advice."
            description="The file is built from the assumptions entered for the site. It does not replace site inspection, lease review, or professional due diligence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Built from user-entered assumptions and the saved commercial result.',
              'No site inspection or physical condition review.',
              'No lease document review or legal sign-off.',
              'Professional due diligence is still required before signing.',
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm customer-print-card">
                <p className="text-sm text-stone-700 leading-7">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-stone-700 leading-7 max-w-4xl">
            If you need access help after payment, email{' '}
            <a
              href="mailto:yieldlensuk@gmail.com?subject=YieldLens%20support"
              className="font-medium text-[var(--yieldlens-caution)] hover:underline"
            >
              yieldlensuk@gmail.com
            </a>{' '}
            with the email used at checkout, the approximate payment time, and a short description of the issue. Do not send card details.
          </p>
          <p className="mt-4 text-xs text-stone-500 leading-6 max-w-4xl">
            YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
          </p>
        </div>
      </section>

      <section className="bg-stone-950 text-white customer-print-section">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Final view"
            title={assessment.verdict}
            description={assessment.summary}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4 text-sm">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 customer-print-card">
              <p className="text-xs uppercase tracking-[0.18em] text-green-300 font-semibold mb-2">Final view: {assessment.verdict}</p>
              <p className="text-stone-300 leading-7">{assessment.summary}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 customer-print-card">
                <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">Main reason</p>
                <p className="text-stone-300 leading-7 mt-2">{assessment.reason}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 customer-print-card">
                <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">What to renegotiate</p>
                <p className="text-stone-300 leading-7 mt-2">{assessment.renegotiate}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 customer-print-card">
                <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">What to verify</p>
                <p className="text-stone-300 leading-7 mt-2">{assessment.verify}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 customer-print-card">
                <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">Next step</p>
                <p className="text-stone-300 leading-7 mt-2">{assessment.nextStep}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-50 border-y border-green-200 customer-print-section customer-print-hide">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
            Next step
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Turn the snapshot into a fuller commercial memo if you need to revisit the site.
          </h2>
          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            Keep pressure-testing the lease terms and assumptions before you commit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/check?mode=commercial"
              className="bg-green-700 text-white px-6 py-3 rounded font-medium hover:bg-green-800 transition-colors text-sm"
            >
              Run a free commercial check
            </Link>
            <Link
              href="/"
              className="bg-white text-stone-700 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
