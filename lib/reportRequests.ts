export type ReportRequestStatus =
  | 'requested'
  | 'reviewed'
  | 'contacted'
  | 'awaiting_info'
  | 'converted'
  | 'closed'
  | 'quoted'
  | 'lost';

export type ReportRequestLeadQuality =
  | 'unqualified'
  | 'low'
  | 'warm'
  | 'high'
  | 'priority';

export type ReportRequestFulfilmentStatus =
  | 'not_started'
  | 'awaiting_info'
  | 'in_review'
  | 'ready'
  | 'sent'
  | 'closed';

export type ReportRequestPaymentStatus =
  | 'not_required'
  | 'unpaid'
  | 'checkout_started'
  | 'paid'
  | 'refunded'
  | 'failed';

export interface ReportRequest {
  id: string;
  createdAt: string;
  submissionId: string | null;
  mode: 'residential' | 'commercial';
  address: string | null;
  postcode: string | null;
  email: string;
  score: number;
  verdictLabel: string;
  requestedReportType: string;
  status: ReportRequestStatus;
  fulfilmentStatus: ReportRequestFulfilmentStatus;
  leadQuality: ReportRequestLeadQuality | null;
  internalNotes: string | null;
  paymentStatus: ReportRequestPaymentStatus;
  amountDuePence: number | null;
  amountPaidPence: number | null;
  currency: string;
  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
  customerAccessToken: string | null;
  updatedAt: string;
  contactedAt: string | null;
  input: unknown;
  result: unknown;
}

export interface UpdateReportRequestInput {
  id: string;
  adminPin: string;
  status?: ReportRequestStatus;
  fulfilmentStatus?: ReportRequestFulfilmentStatus;
  leadQuality?: ReportRequestLeadQuality | null;
  internalNotes?: string | null;
}

export async function getRemoteReportRequests(adminPin: string): Promise<ReportRequest[]> {
  const response = await fetch('/api/report-interest', {
    method: 'GET',
    headers: {
      'x-admin-pin': adminPin,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || 'Failed to load report requests.');
  }

  const data = await response.json();

  return data.reportRequests as ReportRequest[];
}

export async function updateReportRequestStatus({
  id,
  status,
  adminPin,
}: {
  id: string;
  status: ReportRequestStatus;
  adminPin: string;
}): Promise<void> {
  await updateReportRequest({ id, status, adminPin });
}

export async function updateReportRequest({
  id,
  status,
  fulfilmentStatus,
  leadQuality,
  internalNotes,
  adminPin,
}: UpdateReportRequestInput): Promise<void> {
  const body: Record<string, unknown> = { id };

  if (status !== undefined) body.status = status;
  if (fulfilmentStatus !== undefined) body.fulfilment_status = fulfilmentStatus;
  if (leadQuality !== undefined) body.lead_quality = leadQuality;
  if (internalNotes !== undefined) body.internal_notes = internalNotes;

  const response = await fetch('/api/report-interest', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-pin': adminPin,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || 'Failed to update report request status.');
  }
}
