'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  getRemoteReportRequests,
  updateReportRequest,
  type ReportRequest,
} from '@/lib/reportRequests';

import {
  calculateCarlonUnderwriting,
  getRunwayMonths,
} from '@/lib/carlonAnalyticsUnderwriting';

import type {
  CarlonAnalyticsIntake,
  CarlonAnalyticsReview,
} from '@/types/carlonAnalytics';

type RecordLike = Record<string, unknown>;

function asRecord(value: unknown): RecordLike | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as RecordLike)
    : null;
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function formatCurrency(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return 'Not available';
  return `${value.toFixed(1)}%`;
}

function formatNumber(value: number | null, digits = 1): string {
  if (value === null || !Number.isFinite(value)) return 'Not available';

  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: digits,
  }).format(value);
}

function formatDate(value: string | null | undefined): string {
  if (!value) return 'Not available';

  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatStage(value: string): string {
  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getIntake(request: ReportRequest): CarlonAnalyticsIntake | null {
  const input = asRecord(request.input);
  const raw = input?.carlonAnalyticsIntake;

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;

  return raw as CarlonAnalyticsIntake;
}

function getReview(request: ReportRequest): CarlonAnalyticsReview | null {
  const result = asRecord(request.result);
  const raw = result?.carlonAnalyticsReview;

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;

  return raw as CarlonAnalyticsReview;
}


function getDecisionLabel(
  decision: CarlonAnalyticsReview['decision']
): string {
  if (decision === 'proceed') return 'PROCEED';
  if (decision === 'renegotiate') return 'RENEGOTIATE';
  if (decision === 'pause') return 'PAUSE';
  return 'NOT DECIDED';
}

function getDecisionDescription(
  decision: CarlonAnalyticsReview['decision']
): string {
  if (decision === 'proceed') {
    return 'The case is sufficiently supportable to continue, subject to the evidence and professional checks identified in this review.';
  }

  if (decision === 'renegotiate') {
    return 'The underlying opportunity may remain viable, but the current commercial terms should be improved before commitment.';
  }

  if (decision === 'pause') {
    return 'The current case should not progress to commitment until the material weaknesses identified in this review are resolved and retested.';
  }

  return 'The analyst review has not yet reached a final decision.';
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">
        {label}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-stone-950">
        {value}
      </p>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="memo-section mt-9">
      <div className="flex items-baseline gap-3 border-b border-stone-300 pb-2">
        <span className="text-xs font-bold text-[#5b7d58]">{number}</span>
        <h2 className="text-xl font-bold tracking-tight text-stone-950">
          {title}
        </h2>
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function CarlonAnalyticsUnderwritingMemoPage() {
  const params = useParams<{ id?: string | string[] }>();

  const reportRequestId = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw ?? '';
  }, [params]);

  const [adminPin, setAdminPin] = useState('');
  const [request, setRequest] = useState<ReportRequest | null>(null);
  const [intake, setIntake] = useState<CarlonAnalyticsIntake | null>(null);
  const [review, setReview] = useState<CarlonAnalyticsReview | null>(null);

  const [loading, setLoading] = useState(false);
  const [deliverySaving, setDeliverySaving] = useState(false);
  const [error, setError] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedPin = window.localStorage.getItem('yieldlensAdminPin');
    if (storedPin) setAdminPin(storedPin);
  }, []);

  const metrics = useMemo(
    () => (intake ? calculateCarlonUnderwriting(intake) : null),
    [intake]
  );

  const handleLoad = async () => {
    setError('');
    setDeliveryMessage('');
    setLoading(true);

    try {
      const requests = await getRemoteReportRequests(adminPin);
      const found = requests.find((item) => item.id === reportRequestId);

      if (!found) {
        throw new Error('Underwriting request not found.');
      }

      if (found.requestedReportType !== 'carlon_analytics_underwriting') {
        throw new Error(
          'This request is not a Carlon Analytics underwriting case.'
        );
      }

      const foundIntake = getIntake(found);
      const foundReview = getReview(found);

      if (!foundIntake) {
        throw new Error('Carlon Analytics intake data is missing.');
      }

      if (!foundReview) {
        throw new Error(
          'No analyst review has been saved for this request yet.'
        );
      }

      setRequest(found);
      setIntake(foundIntake);
      setReview(foundReview);
    } catch (err) {
      setRequest(null);
      setIntake(null);
      setReview(null);

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load underwriting memo.'
      );
    } finally {
      setLoading(false);
    }
  };


  const handleMarkDelivered = async () => {
    if (!request || !review) return;

    setError('');
    setDeliveryMessage('');

    if (review.status === 'delivered') {
      setDeliveryMessage('This underwriting memo is already marked delivered.');
      return;
    }

    if (review.status !== 'reviewed') {
      setError('The analyst review must be marked reviewed before delivery.');
      return;
    }

    setDeliverySaving(true);

    try {
      const now = new Date().toISOString();

      const nextReview: CarlonAnalyticsReview = {
        ...review,
        status: 'delivered',
        deliveredAt: now,
      };

      await updateReportRequest({
        id: request.id,
        adminPin,
        fulfilmentStatus: 'sent',
        carlonAnalyticsReview: nextReview,
      });

      setReview(nextReview);

      setRequest((current) =>
        current
          ? {
              ...current,
              fulfilmentStatus: 'sent',
              updatedAt: now,
              result: {
                ...(asRecord(current.result) ?? {}),
                carlonAnalyticsReview: nextReview,
              },
            }
          : current
      );

      setDeliveryMessage(
        'Memo marked delivered. Fulfilment is now Sent and the delivery timestamp has been recorded.'
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to mark underwriting memo as delivered.'
      );
    } finally {
      setDeliverySaving(false);
    }
  };

  const readyForClient =
    review?.status === 'reviewed' ||
    review?.status === 'delivered';

  if (!reportRequestId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-sm text-stone-600">
          Missing underwriting request reference.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4ef] text-stone-900 print:bg-white">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 13mm 14mm 15mm;
          }

          body {
            background: white !important;
          }

          header:not(.memo-document-header),
          nav,
          footer:not(.memo-document-footer),
          .memo-print-hide {
            display: none !important;
          }

          .memo-page {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: 0 !important;
          }

          .memo-section {
            break-inside: avoid;
          }

          .memo-break-before {
            break-before: page;
          }
        }
      `}</style>

      <div className="memo-print-hide mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5">
        <div>
          <Link
            href={`/admin/reports/${reportRequestId}/underwriting`}
            className="text-sm font-semibold text-green-800 hover:underline"
          >
            ← Back to analyst workspace
          </Link>
        </div>

        {request && review ? (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              disabled={!readyForClient}
              className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Print / save PDF
            </button>

            {review.status === 'reviewed' ? (
              <button
                type="button"
                onClick={handleMarkDelivered}
                disabled={deliverySaving}
                className="rounded-xl bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-50"
              >
                {deliverySaving ? 'Saving...' : 'Mark delivered'}
              </button>
            ) : null}

            {review.status === 'delivered' ? (
              <span className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-800">
                Delivered
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      {!request ? (
        <div className="mx-auto max-w-5xl px-4 pb-12">
          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
              Carlon Analytics
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Load underwriting memo
            </h1>

            <p className="mt-2 text-sm leading-6 text-stone-600">
              The memo becomes client-ready only after the analyst review has
              been marked reviewed.
            </p>

            <div className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="password"
                value={adminPin}
                onChange={(event) => setAdminPin(event.target.value)}
                placeholder="Admin PIN"
                className="w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={handleLoad}
                disabled={!adminPin || loading}
                className="shrink-0 rounded-xl bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load memo'}
              </button>
            </div>

            {error ? (
              <p className="mt-4 text-sm font-medium text-red-600">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {request && intake && review && metrics ? (
        <article className="memo-page mx-auto mb-14 max-w-5xl border border-stone-200 bg-white px-7 py-9 shadow-sm sm:px-12 sm:py-12">
          {error ? (
            <div className="memo-print-hide mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          {deliveryMessage ? (
            <div className="memo-print-hide mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800">
              {deliveryMessage}
            </div>
          ) : null}

          {!readyForClient ? (
            <div className="memo-print-hide mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
              <strong>Draft preview only.</strong> The analyst review is still
              marked {review.status}. Mark it reviewed before producing the
              client PDF.
            </div>
          ) : null}

          <header className="memo-document-header border-b-2 border-stone-950 pb-7">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5b7d58]">
                  Carlon Analytics
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
                  Commercial Underwriting Review
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
                  Analyst-reviewed decision support for a single UK commercial
                  site and operating concept.
                </p>
              </div>

              <div className="text-left text-xs leading-6 text-stone-500 sm:text-right">
                <p>
                  <strong className="text-stone-800">Reference:</strong>{' '}
                  {request.id.slice(0, 8).toUpperCase()}
                </p>
                <p>
                  <strong className="text-stone-800">Reviewed:</strong>{' '}
                  {formatDate(review.reviewedAt)}
                </p>
                <p>
                  <strong className="text-stone-800">Client:</strong>{' '}
                  {intake.contactName}
                </p>
                <p>
                  <strong className="text-stone-800">Status:</strong>{' '}
                  {review.status === 'delivered'
                    ? review.deliveredAt
                      ? `Delivered ${formatDate(review.deliveredAt)}`
                      : 'Delivered'
                    : 'Reviewed'}
                </p>
              </div>
            </div>
          </header>

          <section className="mt-8 rounded-2xl border border-stone-300 bg-stone-950 px-6 py-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-300">
              Executive decision
            </p>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-3xl font-bold tracking-tight">
                {getDecisionLabel(review.decision)}
              </h2>

              <p className="max-w-2xl text-sm leading-6 text-stone-300">
                {getDecisionDescription(review.decision)}
              </p>
            </div>
          </section>

          <Section number="01" title="Executive summary">
            <p className="whitespace-pre-line text-sm leading-7 text-stone-700">
              {review.executiveSummary}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                label="Site"
                value={
                  intake.siteAddress ||
                  intake.postcode ||
                  request.address ||
                  request.postcode ||
                  'Not provided'
                }
              />
              <MetricCard
                label="Business"
                value={intake.businessName || intake.businessType}
              />
              <MetricCard
                label="Decision stage"
                value={formatStage(intake.currentStage)}
              />
              <MetricCard
                label="Annual rent"
                value={formatCurrency(toNumber(intake.annualRent))}
              />
            </div>
          </Section>

          <Section number="02" title="Operating economics">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                label="Target monthly revenue"
                value={formatCurrency(metrics.revenue)}
              />
              <MetricCard
                label="Gross margin"
                value={formatPercent(metrics.grossMargin)}
              />
              <MetricCard
                label="Gross profit / month"
                value={formatCurrency(metrics.grossProfit)}
              />
              <MetricCard
                label="Rent burden"
                value={formatPercent(metrics.rentBurden)}
              />
              <MetricCard
                label="Occupancy cost / month"
                value={formatCurrency(metrics.monthlyOccupancy)}
              />
              <MetricCard
                label="Operating costs / month"
                value={formatCurrency(metrics.monthlyOperatingCosts)}
              />
              <MetricCard
                label="Debt service / month"
                value={formatCurrency(metrics.monthlyDebtService)}
              />
              <MetricCard
                label="Base monthly position"
                value={formatCurrency(metrics.baseMonthlyPosition)}
              />
            </div>

            {metrics.revenueConsistencyFlag ? (
              <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                  Operating assumption cross-check
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-950">
                  The customer-volume assumptions imply monthly revenue of{' '}
                  {formatCurrency(metrics.impliedMonthlyRevenue)}, compared
                  with the stated target of {formatCurrency(metrics.revenue)}.
                  This is a{' '}
                  {metrics.revenueConsistencyDifferencePct !== null &&
                  metrics.revenueConsistencyDifferencePct > 0
                    ? '+'
                    : ''}
                  {metrics.revenueConsistencyDifferencePct?.toFixed(1)}%
                  difference and should be reconciled before the revenue case
                  is treated as fully supported.
                </p>
              </div>
            ) : null}

            {metrics.impliedMonthlyRevenue !== null &&
            metrics.revenueConsistencyDifferencePct !== null ? (
              <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Revenue assumption cross-check
                </p>

                <p className="mt-2 text-sm leading-6 text-stone-700">
                  Average spend, customer volume and opening days imply monthly
                  revenue of {formatCurrency(metrics.impliedMonthlyRevenue)},
                  compared with the stated target of{' '}
                  {formatCurrency(metrics.revenue)} ({metrics.revenueConsistencyDifferencePct > 0
                    ? '+'
                    : ''}
                  {metrics.revenueConsistencyDifferencePct.toFixed(1)}%).
                </p>
              </div>
            ) : null}

            <p className="mt-4 text-xs leading-5 text-stone-500">
              Composite figures are shown only where the required supplied
              inputs are complete. Blank intake fields are treated as unknown,
              not zero.
            </p>
          </Section>

          <Section number="03" title="Opening capital and funding">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                label="Fit-out"
                value={formatCurrency(toNumber(intake.fitOutBudget))}
              />
              <MetricCard
                label="Equipment"
                value={formatCurrency(toNumber(intake.equipmentBudget))}
              />
              <MetricCard
                label="Opening stock"
                value={formatCurrency(toNumber(intake.openingStock))}
              />
              <MetricCard
                label="Rent deposit"
                value={formatCurrency(toNumber(intake.rentDeposit))}
              />
              <MetricCard
                label="Opening capital required"
                value={formatCurrency(metrics.openingCapital)}
              />
              <MetricCard
                label="Own cash"
                value={formatCurrency(toNumber(intake.startingCash))}
              />
              <MetricCard
                label="External funding"
                value={formatCurrency(toNumber(intake.externalFundingAmount))}
              />
              <MetricCard
                label="Opening funding buffer"
                value={formatCurrency(metrics.openingBuffer)}
              />
            </div>
          </Section>

          <Section number="04" title="Downside sensitivity">
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-stone-100 text-xs uppercase tracking-wide text-stone-600">
                  <tr>
                    <th className="px-4 py-3">Scenario</th>
                    <th className="px-4 py-3 text-right">
                      Monthly position
                    </th>
                    <th className="px-4 py-3 text-right">
                      Opening-buffer runway
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-200">
                  {[
                    {
                      label: 'Base assumptions',
                      position: metrics.baseMonthlyPosition,
                    },
                    {
                      label: 'Revenue -10%',
                      position: metrics.revenueDown10Position,
                    },
                    {
                      label: 'Revenue -20%',
                      position: metrics.revenueDown20Position,
                    },
                    {
                      label: 'Gross margin -5 percentage points',
                      position: metrics.marginDown5Position,
                    },
                    {
                      label: 'Operating costs +10%',
                      position: metrics.costsUp10Position,
                    },
                    {
                      label:
                        'Combined: revenue -20%, margin -5pp, costs +10%',
                      position: metrics.combinedDownsidePosition,
                    },
                  ].map((scenario) => {
                    const runway = getRunwayMonths(
                      metrics.openingBuffer,
                      scenario.position
                    );

                    const runwayLabel =
                      scenario.position === null
                        ? 'Not available'
                        : scenario.position >= 0
                          ? 'No monthly burn'
                          : runway === null
                            ? 'Not available'
                            : `${runway.toFixed(1)} months`;

                    return (
                      <tr key={scenario.label}>
                        <td className="px-4 py-3 font-medium text-stone-800">
                          {scenario.label}
                        </td>

                        <td className="px-4 py-3 text-right font-semibold text-stone-950">
                          {formatCurrency(scenario.position)}
                        </td>

                        <td className="px-4 py-3 text-right text-stone-700">
                          {runwayLabel}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-5 text-stone-500">
              These scenarios are sensitivity tests rather than forecasts. They
              hold other supplied assumptions constant except where stated.
            </p>
          </Section>

          <Section number="05" title="Lease exposure">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                label="Lease term"
                value={
                  toNumber(intake.leaseTermYears) === null
                    ? 'Not provided'
                    : `${formatNumber(toNumber(intake.leaseTermYears))} years`
                }
              />
              <MetricCard
                label="Rent-free period"
                value={
                  toNumber(intake.rentFreeMonths) === null
                    ? 'Not provided'
                    : `${formatNumber(toNumber(intake.rentFreeMonths), 0)} months`
                }
              />
              <MetricCard
                label="Service charge / year"
                value={formatCurrency(toNumber(intake.annualServiceCharge))}
              />
              <MetricCard
                label="Business rates / year"
                value={formatCurrency(toNumber(intake.annualBusinessRates))}
              />
              <MetricCard
                label="Deposit"
                value={formatCurrency(toNumber(intake.rentDeposit))}
              />
              <MetricCard
                label="Personal guarantee"
                value={
                  intake.personalGuarantee
                    ? formatStage(intake.personalGuarantee)
                    : 'Not provided'
                }
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-stone-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Break clause
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-700">
                  {intake.breakClause || 'Not provided'}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Repairing obligations
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-700">
                  {intake.repairingObligations || 'Not provided'}
                </p>
              </div>
            </div>
          </Section>

          <Section number="06" title="Evidence assessment">
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-stone-100 text-xs uppercase tracking-wide text-stone-600">
                  <tr>
                    <th className="px-4 py-3">Evidence</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Analyst note</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-200">
                  {review.evidenceAssessment.map((item) => (
                    <tr key={item.item}>
                      <td className="px-4 py-3 font-medium text-stone-900">
                        {item.item}
                      </td>
                      <td className="px-4 py-3">
                        {formatStage(item.status)}
                      </td>
                      <td className="px-4 py-3 text-stone-600">
                        {item.note || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section number="07" title="Key reasons behind the decision">
            <div className="space-y-4">
              {review.keyReasons
                .filter(
                  (item) =>
                    item.title.trim() ||
                    item.detail.trim()
                )
                .map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-xl border border-stone-200 p-4"
                  >
                    <div className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-950 text-xs font-bold text-white">
                        {index + 1}
                      </span>

                      <div>
                        <h3 className="font-bold text-stone-950">
                          {item.title || `Reason ${index + 1}`}
                        </h3>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-stone-700">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Section>

          <Section number="08" title="Negotiation priorities">
            {review.negotiationPriorities.filter(
              (item) =>
                item.title.trim() ||
                item.rationale.trim() ||
                item.target.trim()
            ).length ? (
              <div className="space-y-4">
                {[...review.negotiationPriorities]
                  .filter(
                    (item) =>
                      item.title.trim() ||
                      item.rationale.trim() ||
                      item.target.trim()
                  )
                  .sort((a, b) => a.priority - b.priority)
                  .map((item) => (
                    <div
                      key={`${item.priority}-${item.title}`}
                      className="rounded-xl border border-stone-200 p-4"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5b7d58]">
                        Priority {item.priority}
                      </p>

                      <h3 className="mt-1 font-bold text-stone-950">
                        {item.title}
                      </h3>

                      {item.rationale ? (
                        <p className="mt-2 text-sm leading-6 text-stone-700">
                          {item.rationale}
                        </p>
                      ) : null}

                      {item.target ? (
                        <div className="mt-3 rounded-lg bg-stone-100 px-3 py-2.5">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-500">
                            Target
                          </p>
                          <p className="mt-1 text-sm font-medium text-stone-900">
                            {item.target}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-stone-600">
                No specific negotiation priorities were recorded.
              </p>
            )}
          </Section>

          <Section number="09" title="Recommended next actions">
            <div className="space-y-3">
              {review.decision === 'pause' ? (
                <div className="rounded-xl border border-stone-200 p-4 text-sm leading-6 text-stone-700">
                  Do not make a binding commitment until the material issues
                  identified in this review have been resolved and the case has
                  been retested.
                </div>
              ) : null}

              {review.decision === 'renegotiate' ? (
                <div className="rounded-xl border border-stone-200 p-4 text-sm leading-6 text-stone-700">
                  Address the ranked negotiation priorities before signing or
                  moving to a binding commitment, then retest the economics on
                  the revised terms.
                </div>
              ) : null}

              {review.decision === 'proceed' ? (
                <div className="rounded-xl border border-stone-200 p-4 text-sm leading-6 text-stone-700">
                  Continue to the next stage of due diligence while completing
                  the outstanding evidence and professional checks identified
                  in this review.
                </div>
              ) : null}

              {review.evidenceAssessment.some(
                (item) => item.status === 'missing'
              ) ? (
                <div className="rounded-xl border border-stone-200 p-4 text-sm leading-6 text-stone-700">
                  Obtain and review the evidence currently marked Missing before
                  relying on the related assumptions for a final commitment.
                </div>
              ) : null}

              {metrics.revenueConsistencyFlag ? (
                <div className="rounded-xl border border-stone-200 p-4 text-sm leading-6 text-stone-700">
                  Reconcile the stated target revenue with the average-spend,
                  customer-volume and opening-day assumptions before relying on
                  the base operating case.
                </div>
              ) : null}

              <div className="rounded-xl border border-stone-200 p-4 text-sm leading-6 text-stone-700">
                Have the final lease and any legal, tax, accounting, licensing
                or funding matters reviewed by appropriately qualified
                professionals before signing or drawing funds.
              </div>
            </div>
          </Section>

          <Section number="10" title="Scope and limitations">
            <div className="space-y-3 text-xs leading-6 text-stone-600">
              <p>
                This review is commercial decision support based on the
                information supplied by the customer and the evidence status
                recorded during the analyst review. Figures marked by
                incomplete inputs should not be treated as verified financial
                forecasts.
              </p>

              <p>
                Scenario analysis is illustrative and does not predict actual
                trading performance. Commercial performance can differ
                materially from the assumptions used.
              </p>

              <p>
                Carlon Analytics has not provided legal advice, a property
                valuation, tax advice, accounting assurance or regulated
                financial advice through this review. Relevant professional
                advice should be obtained before entering into a lease,
                borrowing arrangement or other binding commitment.
              </p>
            </div>
          </Section>

          <footer className="memo-document-footer mt-10 border-t border-stone-300 pt-5">
            <div className="flex flex-col justify-between gap-3 text-[10px] leading-5 text-stone-500 sm:flex-row">
              <p>
                Carlon Analytics · Commercial Underwriting Review ·{' '}
                {request.id.slice(0, 8).toUpperCase()}
              </p>

              <p>
                Prepared {formatDate(review.reviewedAt)}
              </p>
            </div>
          </footer>
        </article>
      ) : null}
    </div>
  );
}
