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

function getRequestStatusLabel(status: ReportRequest['status']): string {
  if (status === 'awaiting_info') return 'Awaiting info';

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getShortReference(id: string): string {
  return id.slice(0, 8).toUpperCase();
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
    return 'The opening capital stack does not work on the current inputs. The site needs more starting cash or lower upfront costs before it can be treated as viable.';
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

function getFinalView(request: ReportRequest): string {
  const result = request.result && typeof request.result === 'object'
    ? (request.result as Record<string, unknown>)
    : {};

  const rentBurden = toNumber(result.rentBurdenPercentage);
  const cashAfterOpening = toNumber(result.availableCashAfterOpening);
  const downsideMonthlyPosition = toNumber(result.downsideMonthlyPosition);
  const survivesSixBadMonths = result.survivesSixBadMonths === true;

  if (cashAfterOpening !== null && cashAfterOpening < 0) {
    return 'Pause unless assumptions improve.';
  }

  if (
    (rentBurden !== null && rentBurden > 18) ||
    (cashAfterOpening !== null && cashAfterOpening < 15000) ||
    (downsideMonthlyPosition !== null && downsideMonthlyPosition < 0) ||
    !survivesSixBadMonths
  ) {
    return 'Renegotiate rent and upfront terms before signing.';
  }

  return 'Proceed to deeper due diligence.';
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
    lines.push('The opening capital stack does not work on these inputs. Lower fit-out spend, deposit pressure, or additional starting cash would be needed.');
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
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 print:hidden">
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

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm print:hidden mb-6">
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
                  YieldLens UK provides indicative decision-support only. It is not a formal valuation, financial advice, mortgage advice, legal advice, tax advice, or a substitute for professional due diligence.
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
                  <p className="text-xs text-stone-500 mt-2">
                    Request status: {getRequestStatusLabel(request.status)}
                  </p>
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
              <p className="text-lg font-semibold text-stone-900">
                {getFinalView(request)}
              </p>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}
