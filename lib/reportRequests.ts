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
  status: string;
  input: unknown;
  result: unknown;
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
  status: string;
  adminPin: string;
}): Promise<void> {
  const response = await fetch('/api/report-interest', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-pin': adminPin,
    },
    body: JSON.stringify({ id, status }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || 'Failed to update report request status.');
  }
}
