export interface ToolEvent {
  id: string;
  createdAt: string;
  eventName: string;
  pagePath: string | null;
  toolName: string | null;
  resultLabel: string | null;
  resultBand: string | null;
  metadata: unknown;
  userAgent: string | null;
  referrer: string | null;
}

export async function getRemoteToolEvents(adminPin: string): Promise<ToolEvent[]> {
  const response = await fetch('/api/tool-events', {
    method: 'GET',
    headers: {
      'x-admin-pin': adminPin,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || 'Failed to load tool events.');
  }

  const data = await response.json();

  return data.events as ToolEvent[];
}
