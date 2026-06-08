'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Submission } from '@/types/property';
import { getLatestSubmission } from '@/lib/storage';
import ReportPreview from '@/components/ReportPreview';
import { exampleResidentialResult } from '@/lib/mockData';

const exampleSubmission: Submission = {
  id: 'example',
  mode: 'residential',
  createdAt: new Date().toISOString(),
  input: {
    address: 'Example Flat, Southwark',
    postcode: 'SE1 7PB',
    propertyType: 'Flat',
    bedrooms: 2,
    userObjective: 'Buy-to-let',
    purchasePrice: 400000,
    expectedMonthlyRent: 1733,
  },
  result: exampleResidentialResult,
  score: exampleResidentialResult.score,
  verdict: exampleResidentialResult.verdict,
};

export default function ReportPage() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [usingExample, setUsingExample] = useState(false);

  useEffect(() => {
    const latest = getLatestSubmission();
    if (latest) {
      setSubmission(latest);
    } else {
      setSubmission(exampleSubmission);
      setUsingExample(true);
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {usingExample && (
        <div className="bg-stone-50 border border-stone-200 rounded-lg 
px-4 py-3 mb-6 text-sm text-stone-600 flex items-center justify-between 
gap-4 flex-wrap">
          <span>Showing example report. Run a check to see your own 
results.</span>
          <Link href="/check" className="text-teal-700 font-medium 
hover:underline shrink-0">
            Start a check →
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between mb-6 flex-wrap 
gap-3 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-stone-900">Report 
preview</h1>
          <p className="text-xs text-stone-400">
            Use your browser's print function to save as PDF.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="bg-teal-700 text-white px-5 py-2 rounded text-sm 
font-medium hover:bg-teal-800 transition-colors"
          >
            Print / save as PDF
          </button>
          <Link
            href="/results"
            className="bg-white text-stone-700 border border-stone-300 
px-5 py-2 rounded text-sm font-medium hover:border-stone-400 
transition-colors"
          >
            Back to results
          </Link>
        </div>
      </div>

      {submission && <ReportPreview submission={submission} />}

      <p className="text-xs text-stone-400 text-center mt-6 print:hidden">
        YieldLens UK provides indicative return checks only. Not 
financial advice.
      </p>
    </div>
  );
}
