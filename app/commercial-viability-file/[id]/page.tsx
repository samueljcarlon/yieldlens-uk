import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { ReportRequest } from '@/lib/reportRequests';
import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'Commercial Viability File',
  description:
    'Paid commercial viability file for a token-protected commercial report request. Shows rent burden, break-even customers, upfront cash, downside trading, survival runway, lease questions, and due diligence checks.',
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
    downsideRevenuePercentage,
    downsideMonthlyRevenue,
    downsideMonthlyPosition,
    monthlyBurnInDownside,
    survivalMonths,
    survivesSixBadMonths,
  };
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

function getMetricRows(request: ReportRequest): Array<{ label: string; value: string }> {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  return [
    { label: 'Score', value: `${request.score}/100` },
    {
      label: 'Mapped verdict',
      value:
        request.mode === 'commercial'
          ? getCommercialVerdictLabel(request.verdictLabel)
          : request.verdictLabel,
    },
    { label: 'Monthly revenue', value: formatCurrency(result.estimatedMonthlyRevenue) },
    { label: 'Monthly rent', value: formatCurrency(result.monthlyRent) },
    { label: 'Rent burden', value: formatPercent(result.rentBurdenPercentage) },
    { label: 'Monthly cost base', value: formatCurrency(result.estimatedMonthlyCostBase) },
    { label: 'Break-even customers/day', value: formatNumber(result.breakEvenCustomersPerDay) },
    { label: 'Expected customers/day', value: formatNumber(result.expectedCustomersPerDay) },
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
      ? `Rent burden is ${rentBurden.toFixed(1)}% of expected monthly revenue, so the lease depends on the entered trading assumptions being broadly right.`
      : 'Rent burden is not available, so the cost pressure needs more evidence before it can be read confidently.';

  const breakEvenSentence =
    toNumber(result.breakEvenCustomersPerDay) !== null && toNumber(result.expectedCustomersPerDay) !== null
      ? `Break-even sits at ${formatNumber(result.breakEvenCustomersPerDay)} customers/day against ${formatNumber(result.expectedCustomersPerDay)} expected, which leaves headroom only if footfall and spend prove real.`
      : 'Break-even and expected customers/day need more evidence before the operating case can be read confidently.';

  let capitalSentence = '';
  if (cashAfterOpening !== null && cashAfterOpening < 0) {
    const shortfall = getOpeningShortfall(request);
    capitalSentence = shortfall
      ? `The opening capital stack leaves a ${shortfall} shortfall before trading begins, so the main risk is funding the launch rather than operating burn.`
      : 'The opening capital stack does not work on these inputs, so the main risk is funding the launch rather than operating burn.';
  } else if (cashAfterOpening !== null && cashAfterOpening < 15000) {
    capitalSentence = `There is only a limited buffer after opening costs at ${formatCurrency(cashAfterOpening)}, so even modest overruns could make the site fragile.`;
  } else {
    capitalSentence = 'The opening buffer is not the main pressure point on the current inputs, but it still needs checking against real quotes and lease terms.';
  }

  const downsideSentence =
    downsideMonthlyPosition !== null && downsideMonthlyPosition < 0
      ? `The downside case burns about ${monthlyBurnInDownside === null ? 'Not available' : formatCurrency(monthlyBurnInDownside)} per month, so the site also needs stronger trading or lower fixed costs if the weaker case is to hold up.`
      : survivesSixBadMonths
        ? 'The downside month still covers operating costs, so the deal is less exposed to monthly burn than to opening-cost pressure.'
        : 'The downside month still covers operating costs, so the survival problem is not monthly burn on its own.';

  const survivalSentence = !survivesSixBadMonths
    ? survivalMonths !== null
      ? `The site only survives about ${survivalMonths.toFixed(1)} months in the downside case, which is short of the six-month test.`
      : 'The site does not clear the six-month survival test on the current assumptions.'
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
      title: 'Break-even customers',
      current:
        figures.breakEven === null || figures.expectedCustomers === null
          ? 'Not available'
          : `${figures.breakEven.toFixed(1)} per day against ${figures.expectedCustomers.toFixed(1)} expected`,
      target: 'Break-even should sit comfortably below expected customers per day.',
      action:
        figures.breakEven !== null && figures.expectedCustomers !== null
          ? `Break-even is ${figures.breakEven.toFixed(1)} customers/day against ${figures.expectedCustomers.toFixed(1)} expected, so the entered footfall and spend assumptions need evidence rather than optimism.`
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
  text: string;
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
      text:
        figures.monthlyRent !== null && figures.rentBurden !== null
          ? `A 10% rent cut would reduce monthly rent from ${formatCurrency(figures.monthlyRent)} to ${formatCurrency(figures.monthlyRent * 0.9)} and move rent burden from ${figures.rentBurden.toFixed(1)}% to about ${(figures.rentBurden * 0.9).toFixed(1)}% if revenue stays the same.`
          : 'Lower rent can move the site into a healthier burden band and reduce pressure on break-even customers.',
    },
    {
      title: 'Rent-free period',
      priority: priority(highIfNegativeCash || highIfCashTight),
      text:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 0
          ? `A rent-free start would help close the ${getOpeningShortfall(request) ?? 'opening shortfall'} by keeping more cash in the business while trading settles.`
          : 'A rent-free start gives the business more breathing room while trading settles and opening costs are absorbed.',
    },
    {
      title: 'Landlord fit-out contribution',
      priority: priority(highIfNegativeCash),
      text:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 0
          ? 'A contribution to fit-out reduces the opening capital stack and can close a shortfall before trading starts.'
          : 'A contribution to fit-out reduces the opening capital stack and improves working capital after launch.',
    },
    {
      title: 'Reduced deposit',
      priority: priority(highIfNegativeCash || highIfCashTight),
      text:
        figures.startingCash !== null
          ? `A smaller deposit keeps more of the ${formatCurrency(figures.startingCash)} starting cash available for launch costs and early working capital.`
          : 'A smaller deposit keeps more cash in the business for launch costs and early working capital.',
    },
    {
      title: 'Break clause',
      priority: priority(highIfSurvivalWeak),
      text: 'A break clause reduces the cost of a weak site if the trading case fails to improve after launch.',
    },
    {
      title: 'Service charge cap',
      priority: priority(highIfRentHeavy),
      text:
        figures.rentBurden !== null
          ? `A cap matters more at a ${figures.rentBurden.toFixed(1)}% rent burden because any extra shared cost quickly narrows the buffer.`
          : 'A cap keeps shared-cost pressure from drifting higher after the lease is signed.',
    },
    {
      title: 'Repairing obligations',
      priority: priority(highIfNegativeCash || highIfSurvivalWeak),
      text:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000
          ? 'Clear repair wording avoids hidden costs that can erode an already thin opening buffer.'
          : 'Clear repair wording avoids hidden costs that can erode already thin margins.',
    },
    {
      title: 'Permitted use flexibility',
      priority: priority(highIfSurvivalWeak),
      text:
        figures.expectedCustomers !== null
          ? `Flexible permitted use helps if the original trading concept needs to adapt after opening or if the ${formatNumber(figures.expectedCustomers)} expected customers/day assumption proves too optimistic.`
          : 'Flexible permitted use helps if the original trading concept needs to adapt after opening.',
    },
  ];
}

function getEvidenceSections(request: ReportRequest): Array<{
  title: string;
  items: Array<{ label: string; detail: string }>;
}> {
  const figures = getCommercialContext(request);

  return [
    {
      title: 'A. Trading evidence',
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
      title: 'Verify the customer/day assumption',
      why:
        figures.breakEven !== null && figures.expectedCustomers !== null
          ? `Break-even sits at ${figures.breakEven.toFixed(1)} customers/day against ${figures.expectedCustomers.toFixed(1)} expected, so the revenue case needs evidence.`
          : 'The revenue case needs evidence before the site can be read confidently.',
      confidence:
        figures.expectedCustomers !== null
          ? `Use footfall counts and competitor checks to support the ${figures.expectedCustomers.toFixed(1)} expected customers/day assumption.`
          : 'Use footfall counts and competitor checks to support the expected customer assumption.',
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
        'Pause unless the upfront capital position improves. The model does not currently fail because the downside month burns cash; it fails because upfront cash needed exceeds available starting cash. The priority is to renegotiate fit-out, deposit, rent-free terms, landlord contribution, or increase available starting cash before treating the site as viable.',
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
      verdict: 'Renegotiate rent before signing.',
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

function getReportReference(request: ReportRequest): string {
  return getShortReference(request.id);
}

async function getPaidCustomerReport(id: string, token: string): Promise<ReportRequest | null> {
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

  if (
    data.mode !== 'commercial' ||
    data.payment_status !== 'paid' ||
    data.customer_access_token !== token
  ) {
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
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 mb-3">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
        {title}
      </h2>
      {description && <p className="text-sm text-stone-600 max-w-3xl leading-7">{description}</p>}
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

  if (!reportRequestId || !token) {
    notFound();
  }

  const request = await getPaidCustomerReport(reportRequestId, token);

  if (!request) {
    notFound();
  }

  const context = getCommercialContext(request);
  const assessment = getFinalAssessment(request);

  return (
    <div className="bg-stone-50 text-stone-900">
      <style>{`
        @media print {
          header,
          nav,
          footer,
          .customer-print-hide {
            display: none !important;
          }
        }
      `}</style>
      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-teal-300 mb-4">
                Standard commercial viability file
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Commercial viability file
              </h1>
              <p className="text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                This paid file is the customer-facing report for a commercial request that has been paid and unlocked.
              </p>
              <p className="text-xs text-stone-400">
                YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 customer-print-hide">
                <PrintButton />
                <Link
                  href="/check?mode=commercial"
                  className="bg-stone-800 text-white px-6 py-3 rounded font-medium hover:bg-stone-700 transition-colors text-sm text-center"
                >
                  Run another commercial check
                </Link>
              </div>
            </div>

            <div className="bg-white text-stone-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-stone-200">
                <p className="text-xs uppercase tracking-widest text-teal-700 font-semibold">
                  Customer file
                </p>
                <p className="text-2xl font-bold mt-1">{getCommercialVerdictLabel(request.verdictLabel)}</p>
                <p className="text-sm text-stone-500 mt-1">
                  Reference {getReportReference(request)} · Generated {new Date(request.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {[
                  { label: 'Score', value: `${request.score}/100` },
                  { label: 'Rent burden', value: formatPercent(context.rentBurden) },
                  { label: 'Break-even/day', value: formatNumber(context.breakEven) },
                  { label: 'Opening shortfall', value: getOpeningShortfall(request) ?? 'None' },
                ].map((metric) => (
                  <div key={metric.label} className="border-b border-stone-200 p-4 sm:odd:border-r">
                    <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{metric.label}</p>
                    <p className="text-2xl font-bold text-stone-900 mt-1">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Executive summary"
          title={assessment.verdict}
          description={getExecutiveSummary(request)}
        />
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Site snapshot"
            title="The assumptions behind the paid file."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getSiteSnapshotRows(request).map((row) => (
              <div key={row.label} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{row.label}</p>
                <p className="text-sm font-semibold text-stone-900 mt-1">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Key viability metrics"
          title="The core numbers the file makes easy to review."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {getMetricRows(request).map((item) => (
            <div key={item.label} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
              <p className="text-2xl font-bold mt-2 text-stone-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Upfront cash and survival"
            title="The opening capital stack and downside case."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getUpfrontCashRows(request).map((item) => (
              <div key={item.label} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-stone-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-stone-700 leading-7">
            {getSurvivalExplanation(request)}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="What would need to improve?"
          title="The deal needs a stronger opening capital position."
          description="Treat 18% as the caution threshold and 12% as the healthier target. The question is whether the site mainly needs a better rent deal, stronger trading assumptions, or a stronger opening capital stack."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {getWhatWouldNeedToImprove(request).map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-stone-900">{item.title}</p>
              <p className="text-xs uppercase tracking-wide text-stone-400 mt-2">Current</p>
              <p className="text-sm text-stone-700 mt-1 leading-6">{item.current}</p>
              <p className="text-xs uppercase tracking-wide text-stone-400 mt-3">Target</p>
              <p className="text-sm text-stone-700 mt-1 leading-6">{item.target}</p>
              <p className="text-xs uppercase tracking-wide text-stone-400 mt-3">What would help</p>
              <p className="text-sm text-stone-700 mt-1 leading-6">{item.action}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Stress-test scenarios"
            title="How the site behaves under weaker trading or better lease terms."
          />
          <div className="overflow-x-auto rounded-xl border border-stone-200">
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
                    <td className="py-3 px-4 text-stone-700">{row.monthlyPosition}</td>
                    <td className="py-3 px-4 text-stone-700">{row.breakEvenCustomers}</td>
                    <td className="py-3 px-4 text-stone-600 leading-6">{row.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Negotiation levers"
          title="Practical lease points worth testing before signing."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {getNegotiationLevers(request).map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
                  {item.priority}
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-7 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Evidence needed before signing"
            title="Trading, cost, and lease evidence that should be checked first."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {getEvidenceSections(request).map((section) => (
              <div key={section.title} className="rounded-xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-sm font-semibold text-stone-900">{section.title}</p>
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

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Risk interpretation"
          title="How the file reads when the numbers are pulled together."
        />
        <p className="text-sm text-stone-700 leading-7 max-w-4xl">{getRiskInterpretation(request)}</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Lease questions to verify"
          title="The lease points that matter most on this file."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {getChecklistItems(request).map((item) => (
            <div key={item.label} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <p className="font-medium text-stone-900">{item.label}</p>
              <p className="text-stone-600 leading-6 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Due diligence checklist"
            title="The checks that should happen before signing."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {getDueDiligenceItems(request).map((item) => (
              <div key={item.label} className="rounded-xl border border-stone-200 bg-stone-50 p-5">
                <p className="text-sm font-semibold text-stone-900">{item.label}</p>
                <p className="text-sm text-stone-600 leading-6 mt-2">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="How this file was built"
          title="The method behind the paid file."
        />
        <p className="text-sm text-stone-700 leading-7 max-w-4xl">{getMethodologyNote()}</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionTitle
          eyebrow="Ranked action list before signing"
          title="What to tackle first on this file."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {getRankedActionItems(request).map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{item.rank}</p>
                  <p className="text-sm font-semibold text-stone-900 mt-1">{item.title}</p>
                </div>
                <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
                  {item.priority}
                </span>
              </div>
              <p className="text-sm text-stone-700 leading-7 mt-3">{item.why}</p>
              <p className="text-sm text-stone-600 leading-7 mt-2">{item.confidence}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Final view"
            title={assessment.verdict}
            description={assessment.summary}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">Main reason</p>
              <p className="text-stone-300 leading-7 mt-2">{assessment.reason}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">What to renegotiate</p>
              <p className="text-stone-300 leading-7 mt-2">{assessment.renegotiate}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">What to verify</p>
              <p className="text-stone-300 leading-7 mt-2">{assessment.verify}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">Next step</p>
              <p className="text-stone-300 leading-7 mt-2">{assessment.nextStep}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-50 border-y border-teal-200">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-3">
            Next step
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Run another commercial check if you want to retest the site.
          </h2>
          <p className="text-sm text-stone-700 leading-7 max-w-2xl mx-auto mb-8">
            This file is unlocked for the paid commercial request you completed. Keep pressure-testing the lease terms and assumptions before you commit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/check?mode=commercial"
              className="bg-teal-700 text-white px-6 py-3 rounded font-medium hover:bg-teal-800 transition-colors text-sm"
            >
              Run another commercial check
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
