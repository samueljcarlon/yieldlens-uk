export interface ToolEventPayload {
  event_name: string;
  page_path?: string;
  tool_name?: string;
  result_label?: string;
  result_band?: string;
  metadata?: Record<string, unknown>;
}

export async function logToolEvent(payload: ToolEventPayload): Promise<void> {
  try {
    await fetch('/api/tool-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Fail silently. The UI must never crash due to analytics.
  }
}
