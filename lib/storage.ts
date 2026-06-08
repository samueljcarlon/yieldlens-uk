import type { Submission } from '@/types/property';

const SUBMISSIONS_KEY = 'yieldlens_submissions';
const LATEST_KEY = 'yieldlens_latest';

export function saveSubmission(submission: Submission): void {
  if (typeof window === 'undefined') return;
  const existing = getSubmissions();
  existing.unshift(submission);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(existing));
  localStorage.setItem(LATEST_KEY, JSON.stringify(submission));
}

export function getSubmissions(): Submission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Submission[];
  } catch {
    return [];
  }
}

export function getLatestSubmission(): Submission | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LATEST_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Submission;
  } catch {
    return null;
  }
}

export function clearSubmissions(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SUBMISSIONS_KEY);
  localStorage.removeItem(LATEST_KEY);
}
