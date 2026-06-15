'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getRemoteReportRequests, type ReportRequest } from '@/lib/reportRequests';

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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

function getSiteSnapshotRows(request: ReportRequest): Array<{ label: string; value: string }> {
  const input = request.input && typeof request.input === 'object'
    ? (request.input as Record<string, unknown>)
    : {};

  return [
    { label: 'Address', value: request.address || 'Not provided' },
    { label: 'Postcode', value: request.postcode || 'Not provided' },
    { label: 'Business type', value: typeof input.businessType === 'string' && input.businessType.trim() ? input.businessType : 'Not provided' },
    { label: 'Annual rent', value: formatCurrency(input.annualRent) },
    { label: 'Expected customers/day', value: formatNumber(input.expectedCustomersPerDay) },
    { label: 'Average spend', value: formatCurrency(input.averageSpendPerCustomer) },
    { label: 'Opening days/month', value: formatNumber(input.openingDaysPerMonth) },
    { label: 'Email', value: request.email || 'Not provided' },
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

    return `The opening capital stack does not work on the current inputs. Upfront cash needed is ${upfrontCashNeeded} against starting cash of ${startingCash}, leaving a ${shortfall} opening shortfall. The site needs more starting cash or lower upfront costs before it can be treated as viable.`;
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

function getRiskInterpretation(request: ReportRequest): string[] {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const rentBurden = toNumber(result.rentBurdenPercentage);
  const cashAfterOpening = toNumber(result.availableCashAfterOpening);
  const downsideMonthlyPosition = toNumber(result.downsideMonthlyPosition);
  const monthlyBurnInDownside = toNumber(result.monthlyBurnInDownside);
  const survivesSixBadMonths = result.survivesSixBadMonths === true;
  const survivalMonths = toNumber(result.survivalMonths);

  const lines: string[] = [];

  if (rentBurden !== null && rentBurden > 18) {
    lines.push('Rent takes a high share of revenue, so the lease depends on stronger trading than a lower-burden site.');
  }

  if (cashAfterOpening !== null && cashAfterOpening < 0) {
    const shortfall = getOpeningShortfall(request);
    lines.push(
      shortfall
        ? `The opening capital stack leaves a ${shortfall} shortfall before trading begins. Lower fit-out spend, deposit pressure, or additional starting cash would be needed.`
        : 'The opening capital stack does not work on these inputs. Lower fit-out spend, deposit pressure, or additional starting cash would be needed.'
    );
  } else if (cashAfterOpening !== null && cashAfterOpening < 15000) {
    lines.push('There is only a limited buffer after opening costs, so even modest overruns could make the site fragile.');
  }

  if (downsideMonthlyPosition !== null && downsideMonthlyPosition < 0) {
    const burn = monthlyBurnInDownside === null ? null : Math.round(monthlyBurnInDownside);
    lines.push(
      burn === null
        ? 'The downside case burns cash each month.'
        : `The downside case burns about £${burn.toLocaleString('en-GB')} per month.`
    );
  } else if (!survivesSixBadMonths && downsideMonthlyPosition !== null && downsideMonthlyPosition >= 0) {
    lines.push('The downside month still covers operating costs, so the survival problem is upfront funding rather than monthly burn.');
  }

  if (!survivesSixBadMonths) {
    if (survivalMonths !== null) {
      lines.push(`The site only survives about ${survivalMonths.toFixed(1)} months in the downside case, which is short of the six-month test.`);
    } else {
      lines.push('The site does not clear the six-month survival test on the current assumptions.');
    }
  }

  if (lines.length === 0) {
    lines.push('The current inputs look workable, but the lease still needs deeper due diligence before any commitment.');
  }

  return lines;
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

function getWhatWouldNeedToImprove(request: ReportRequest): Array<{
  title: string;
  current: string;
  target: string;
  action: string;
}> {
  const figures = getCommercialContext(request);
  const shortfall = getOpeningShortfall(request);

  return [
    {
      title: 'Rent burden',
      current:
        figures.rentBurden === null ? 'Not available' : `${figures.rentBurden.toFixed(1)}%`,
      target: '18% is the caution threshold. 12% is healthier.',
      action:
        'Lower rent, improve average spend, raise customer volume, or secure a stronger lease deal.',
    },
    {
      title: 'Break-even customers',
      current:
        figures.breakEven === null || figures.expectedCustomers === null
          ? 'Not available'
          : `${figures.breakEven.toFixed(1)} per day against ${figures.expectedCustomers.toFixed(1)} expected`,
      target: 'Break-even should sit comfortably below expected customers per day.',
      action:
        'Increase customers per day, increase average spend, lower staffing or other costs, or reduce rent.',
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
        'Increase starting cash, lower fit-out or setup costs, secure landlord contribution, or negotiate rent-free and reduced deposit terms.',
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
        'Lower monthly burn, raise starting cash, or strengthen revenue assumptions before signing.',
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
      text: 'Lower rent can move the site into a healthier burden band and reduce pressure on break-even customers.',
    },
    {
      title: 'Rent-free period',
      priority: priority(highIfNegativeCash || highIfCashTight),
      text: 'A rent-free start gives the business more breathing room while trading settles and opening costs are absorbed.',
    },
    {
      title: 'Landlord fit-out contribution',
      priority: priority(highIfNegativeCash),
      text: 'A contribution to fit-out reduces the opening capital stack and can close a shortfall before trading starts.',
    },
    {
      title: 'Reduced deposit',
      priority: priority(highIfNegativeCash || highIfCashTight),
      text: 'A smaller deposit keeps more cash in the business for launch costs and early working capital.',
    },
    {
      title: 'Break clause',
      priority: priority(highIfSurvivalWeak),
      text: 'A break clause reduces the cost of a weak site if the trading case fails to improve.',
    },
    {
      title: 'Service charge cap',
      priority: priority(highIfRentHeavy),
      text: 'A cap keeps shared-cost pressure from drifting higher after the lease is signed.',
    },
    {
      title: 'Repairing obligations',
      priority: priority(highIfNegativeCash || highIfSurvivalWeak),
      text: 'Clear repair wording avoids hidden costs that can erode already thin margins.',
    },
    {
      title: 'Permitted use flexibility',
      priority: priority(highIfSurvivalWeak),
      text: 'Flexible permitted use helps if the original trading concept needs to adapt after opening.',
    },
  ];
}

function getEvidenceSections(): Array<{
  title: string;
  items: string[];
}> {
  return [
    {
      title: 'A. Trading evidence',
      items: [
        'Footfall counts',
        'Competitor observations',
        'Average spend validation',
        'Opening-hours assumption',
        'Local demand',
      ],
    },
    {
      title: 'B. Cost evidence',
      items: [
        'Business rates bill or estimate',
        'Utility estimate',
        'Insurance',
        'Service charge',
        'Fit-out quotes',
        'Legal fees',
      ],
    },
    {
      title: 'C. Lease and legal evidence',
      items: [
        'Rent review',
        'Break clause',
        'Repairing obligations',
        'Assignment and subletting',
        'Planning and licensing',
        'Handover condition',
      ],
    },
  ];
}

function getDecisionMatrix(request: ReportRequest): Array<{
  area: string;
  signal: string;
  improve: string;
  priority: 'High' | 'Medium' | 'Low';
}> {
  const figures = getCommercialContext(request);

  const missingCoreInputs = [
    figures.input.businessType,
    figures.input.monthlyStaffCosts,
    figures.input.monthlyUtilitiesAndOtherCosts,
    figures.input.monthlyBusinessRates,
    figures.input.fitOutBudget,
    figures.input.rentDeposit,
    figures.input.legalFees,
    figures.input.openingStock,
    figures.input.otherSetupCosts,
    figures.input.startingCash,
    figures.input.downsideRevenuePercentage,
  ].filter((value) => value === undefined || value === null || value === '').length;

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
      area: 'Rent burden',
      signal:
        figures.rentBurden === null
          ? 'Not available'
          : `${figures.rentBurden.toFixed(1)}% of revenue`,
      improve: 'Lower rent, higher revenue, or stronger spend and customer assumptions.',
      priority:
        figures.rentBurden !== null && figures.rentBurden > 18
          ? 'High'
          : figures.rentBurden !== null && figures.rentBurden > 12
            ? 'Medium'
            : 'Low',
    },
    {
      area: 'Customer assumptions',
      signal:
        figures.breakEven === null || figures.expectedCustomers === null
          ? 'Not available'
          : `${figures.breakEven.toFixed(1)} break-even/day vs ${figures.expectedCustomers.toFixed(1)} expected`,
      improve: 'Increase customers per day, increase average spend, or reduce fixed costs.',
      priority: customerPriority,
    },
    {
      area: 'Upfront cash',
      signal:
        figures.cashAfterOpening === null
          ? 'Not available'
          : figures.cashAfterOpening < 0
            ? `Shortfall of ${getOpeningShortfall(request) ?? 'Not available'}`
            : `Buffer of ${formatCurrency(figures.cashAfterOpening)}`,
      improve: 'Increase starting cash, lower fit-out/setup costs, or improve landlord support.',
      priority:
        figures.cashAfterOpening !== null && figures.cashAfterOpening < 0
          ? 'High'
          : figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000
            ? 'Medium'
            : 'Low',
    },
    {
      area: 'Downside survival',
      signal:
        figures.survivalMonths === null
          ? figures.survivesSixBadMonths
            ? 'Pass'
            : 'Not available'
          : `${figures.survivalMonths.toFixed(1)} months`,
      improve: 'Lower monthly burn, stronger revenue, or more starting cash.',
      priority: !figures.survivesSixBadMonths ? 'High' : figures.survivalMonths !== null && figures.survivalMonths < 6 ? 'Medium' : 'Low',
    },
    {
      area: 'Lease terms',
      signal:
        figures.rentBurden !== null && figures.rentBurden > 18
          ? 'Needs tighter economics'
          : 'Still worth checking carefully',
      improve: 'Improve rent, break clause, deposit, service charge, and permitted use terms.',
      priority:
        figures.rentBurden !== null && figures.rentBurden > 18
          ? 'High'
          : figures.cashAfterOpening !== null && figures.cashAfterOpening < 15000
            ? 'Medium'
            : 'Low',
    },
    {
      area: 'Missing evidence',
      signal:
        missingCoreInputs > 0
          ? `${missingCoreInputs} core inputs still need evidence`
          : 'Core inputs are mostly filled',
      improve: 'Add the missing trading, cost, and lease evidence before signing.',
      priority: missingCoreInputs > 3 ? 'High' : missingCoreInputs > 0 ? 'Medium' : 'Low',
    },
  ];
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
      verdict: 'Pause unless assumptions improve.',
      reason:
        `Upfront cash needed is ${formatCurrency(figures.upfrontCashNeeded)} against starting cash of ${formatCurrency(figures.startingCash)}, leaving an opening shortfall of ${getOpeningShortfall(request) ?? 'Not available'}.`,
      renegotiate:
        'Fit-out, deposit, rent-free period, landlord contribution, or any other term that improves the opening capital stack.',
      verify:
        'Confirm fit-out quotes, deposit terms, landlord incentives, and whether the current cash stack is enough before trading begins.',
      nextStep:
        'Pause until the opening capital position improves, then retest the site on the revised numbers.',
      summary:
        `Final view: Pause unless the upfront capital position improves. The model does not currently fail because the downside month burns cash; it fails because upfront cash needed exceeds available starting cash. The priority is to renegotiate fit-out, deposit, rent-free terms, landlord contribution, or increase available starting cash before treating the site as viable.`,
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
        'Final view: Renegotiate upfront terms before signing. The downside month still covers operating costs, but the site does not yet have enough opening support to clear the six-month test comfortably.',
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
        'Final view: Renegotiate rent before signing. The lease economics need to improve before the numbers feel comfortable enough for a deeper due diligence pass.',
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
        'Final view: Proceed to deeper due diligence. The numbers are workable enough to keep going, but the lease still needs closer checking before any commitment.',
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
      'Final view: Renegotiate and retest. The current assumptions do not yet give a clean enough result to move straight to commitment.',
  };
}

function getChecklistItems(): string[] {
  return [
    'Break clause',
    'Rent review mechanism',
    'Repairing obligations',
    'Service charge',
    'Permitted use',
    'Deposit terms',
    'Handover condition',
    'Licensing and planning requirements',
    'Exclusivity or nearby competitor restrictions',
    'Assignment and subletting restrictions',
  ];
}

function getDueDiligenceItems(): string[] {
  return [
    'Visit the site at peak and off-peak times',
    'Count footfall manually',
    'Compare nearby direct competitors',
    'Verify business rates',
    'Verify utilities, service charge, and insurance',
    'Confirm fit-out quotes',
    'Confirm legal costs',
    'Stress-test lower customers and lower spend',
    'Confirm landlord incentives or rent-free period',
    'Review with a solicitor and accountant before signing',
  ];
}

function getReference(request: ReportRequest): string {
  return getShortReference(request.id);
}

export default function ViabilityFilePage() {
  const params = useParams<{ id?: string | string[] }>();
  const reportRequestId = useMemo(() => {
    const rawId = params?.id;
    return Array.isArray(rawId) ? rawId[0] : rawId ?? '';
  }, [params]);

  const [adminPin, setAdminPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [request, setRequest] = useState<ReportRequest | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [generatedAt] = useState(() => new Date().toISOString());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedPin = window.localStorage.getItem('yieldlensAdminPin');
    if (storedPin) setAdminPin(storedPin);
  }, []);

  const handleLoad = async () => {
    setError('');
    setLoading(true);
    setLoaded(false);
    setRequest(null);

    try {
      const remoteRequests = await getRemoteReportRequests(adminPin);
      const found = remoteRequests.find((item) => item.id === reportRequestId);

      if (!found) {
        setError('Report request not found.');
        return;
      }

      setRequest(found);
      setLoaded(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load the viability file.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const canRenderFile =
    request?.mode === 'commercial' && request?.paymentStatus === 'paid';

  if (!reportRequestId) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-sm text-stone-600">Missing report request reference.</p>
          <Link href="/admin/reports" className="text-teal-700 font-medium hover:underline">
            Back to admin reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 print:bg-white">
      <style jsx global>{`
        @media print {
          header,
          nav,
          footer,
          .admin-print-hide {
            display: none !important;
          }
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 print:hidden admin-print-hide">
          <div>
            <p className="text-xs uppercase tracking-widest text-teal-700 font-medium">
              Internal fulfilment view
            </p>
            <h1 className="text-2xl font-bold text-stone-900 mt-1">
              Paid commercial viability file
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Load the request with the admin PIN to open the printable fulfilment view.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/reports"
              className="inline-flex items-center justify-center rounded border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:border-teal-500"
            >
              Back to admin reports
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              disabled={!canRenderFile}
              className="inline-flex items-center justify-center rounded bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-50"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm print:hidden admin-print-hide mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:items-end">
            <div>
              <label className="block text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
                Admin PIN
              </label>
              <input
                type="password"
                value={adminPin}
                onChange={(event) => setAdminPin(event.target.value)}
                placeholder="Admin PIN"
                className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="button"
              onClick={handleLoad}
              disabled={!adminPin || loading}
              className="bg-stone-900 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-stone-800 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Open viability file'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          {loaded && request && !canRenderFile && (
            <p className="text-sm text-amber-700 mt-3">
              Available after payment.
            </p>
          )}
        </div>

        {!request ? (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-sm text-stone-600">
            Enter the admin PIN and open a paid commercial request to render the fulfilment view.
          </div>
        ) : !canRenderFile ? (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-sm text-stone-600">
            This viability file becomes available after payment. Return to the admin reports view to see payment status and the checkout state.
          </div>
        ) : (
          <main className="space-y-6">
            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-teal-700 font-medium">
                    YieldLens UK
                  </p>
                  <h2 className="text-3xl font-bold text-stone-900 mt-1">
                    Standard commercial viability file
                  </h2>
                  <p className="text-sm text-stone-500 mt-2">
                    Generated {formatDate(generatedAt)} · Reference {getReference(request)}
                  </p>
                </div>

                <div className="max-w-md rounded-lg bg-stone-50 border border-stone-200 p-4 text-sm text-stone-600">
                  YieldLens UK provides indicative decision-support only. It is not a valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
                </div>
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-3">
                Executive summary
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
                <div>
                  <p className="text-2xl font-bold text-stone-900">
                    {getCommercialVerdictLabel(request.verdictLabel)}
                  </p>
                  <p className="text-sm text-stone-600 mt-3 leading-7">
                    {getExecutiveSummary(request)}
                  </p>
                </div>

                <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 min-w-[220px]">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Score</p>
                  <p className="text-3xl font-bold text-stone-900 mt-1">{request.score}/100</p>
                </div>
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Site snapshot
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                {getSiteSnapshotRows(request).map((row) => (
                  <div key={row.label} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{row.label}</p>
                    <p className="font-semibold text-stone-900 mt-1 break-words">{row.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Key viability metrics
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                {getMetricRows(request).map((row) => (
                  <div key={row.label} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{row.label}</p>
                    <p className="font-semibold text-stone-900 mt-1">{row.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Upfront cash and survival
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                {getUpfrontCashRows(request).map((row) => (
                  <div key={row.label} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">{row.label}</p>
                    <p className="font-semibold text-stone-900 mt-1">{row.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-stone-700 leading-7 mt-4">
                {getSurvivalExplanation(request)}
              </p>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                What would need to improve?
              </p>
              <p className="text-sm text-stone-600 leading-7 mb-4">
                Treat 18% as the caution threshold and 12% as the healthier target. The question is whether the site mainly needs a better rent deal, stronger trading assumptions, or a stronger opening capital stack.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {getWhatWouldNeedToImprove(request).map((item) => (
                  <div key={item.title} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                        <p className="text-xs uppercase tracking-wide text-stone-400 mt-1">Current</p>
                        <p className="text-sm text-stone-700 mt-1">{item.current}</p>
                      </div>
                    </div>
                    <p className="text-xs uppercase tracking-wide text-stone-400 mt-3">Target</p>
                    <p className="text-sm text-stone-700 mt-1">{item.target}</p>
                    <p className="text-xs uppercase tracking-wide text-stone-400 mt-3">What would help</p>
                    <p className="text-sm text-stone-700 mt-1 leading-6">{item.action}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Stress-test scenarios
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="text-left border-b border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-700">Scenario</th>
                      <th className="py-3 pr-4 font-semibold text-stone-700">Estimated monthly revenue</th>
                      <th className="py-3 pr-4 font-semibold text-stone-700">Estimated monthly position</th>
                      <th className="py-3 pr-4 font-semibold text-stone-700">Break-even/day</th>
                      <th className="py-3 font-semibold text-stone-700">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getStressTestScenarios(request).map((row) => (
                      <tr key={row.label} className="border-b border-stone-100 align-top">
                        <td className="py-3 pr-4 font-medium text-stone-900">{row.label}</td>
                        <td className="py-3 pr-4 text-stone-700">{row.monthlyRevenue}</td>
                        <td className="py-3 pr-4 text-stone-700">{row.monthlyPosition}</td>
                        <td className="py-3 pr-4 text-stone-700">{row.breakEvenCustomers}</td>
                        <td className="py-3 text-stone-600 leading-6">{row.interpretation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Negotiation levers
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getNegotiationLevers(request).map((item) => (
                  <div key={item.title} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                      <span className="rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-sm text-stone-700 leading-6 mt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Evidence needed before signing
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {getEvidenceSections().map((section) => (
                  <div key={section.title} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <p className="text-sm font-semibold text-stone-900">{section.title}</p>
                    <ul className="mt-3 space-y-2 text-sm text-stone-700 leading-6">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Decision matrix
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="text-left border-b border-stone-200">
                      <th className="py-3 pr-4 font-semibold text-stone-700">Area</th>
                      <th className="py-3 pr-4 font-semibold text-stone-700">Current signal</th>
                      <th className="py-3 pr-4 font-semibold text-stone-700">What would improve it</th>
                      <th className="py-3 font-semibold text-stone-700">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDecisionMatrix(request).map((row) => (
                      <tr key={row.area} className="border-b border-stone-100 align-top">
                        <td className="py-3 pr-4 font-medium text-stone-900">{row.area}</td>
                        <td className="py-3 pr-4 text-stone-700 leading-6">{row.signal}</td>
                        <td className="py-3 pr-4 text-stone-700 leading-6">{row.improve}</td>
                        <td className="py-3 text-stone-700">{row.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Risk interpretation
              </p>

              <div className="space-y-3 text-sm text-stone-700 leading-7">
                {getRiskInterpretation(request).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Lease questions to verify
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {getChecklistItems().map((item) => (
                  <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-4">
                Due diligence checklist
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {getDueDiligenceItems().map((item) => (
                  <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-stone-200 rounded-xl p-6 shadow-sm break-inside-avoid">
              <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-3">
                Final view
              </p>
              {(() => {
                const assessment = getFinalAssessment(request);

                return (
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-stone-900">{assessment.verdict}</p>
                    <p className="text-sm text-stone-700 leading-7">{assessment.summary}</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">Main reason</p>
                        <p className="text-sm text-stone-700 leading-7 mt-1">{assessment.reason}</p>
                      </div>

                      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">What to renegotiate</p>
                        <p className="text-sm text-stone-700 leading-7 mt-1">{assessment.renegotiate}</p>
                      </div>

                      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">What to verify</p>
                        <p className="text-sm text-stone-700 leading-7 mt-1">{assessment.verify}</p>
                      </div>

                      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-stone-400 font-medium">Next step</p>
                        <p className="text-sm text-stone-700 leading-7 mt-1">{assessment.nextStep}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </section>
          </main>
        )}
      </div>
    </div>
  );
}
