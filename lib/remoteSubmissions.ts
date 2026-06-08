import type { Submission } from '@/types/property';

export async function saveRemoteSubmission(submission: Submission): Promise<void> {
  try {
    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('Remote submission save failed:', body);
    }
  } catch (error) {
    console.error('Remote submission save failed:', error);
  }
}

export async function getRemoteSubmissions(adminPin: string): Promise<Submission[]> {
  const response = await fetch('/api/submissions', {
    method: 'GET',
    headers: {
      'x-admin-pin': adminPin,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || 'Failed to load submissions.');
  }

  const data = await response.json();
  return data.submissions as Submission[];
}
