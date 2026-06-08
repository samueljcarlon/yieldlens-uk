'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ModeSelector from '@/components/ModeSelector';
import ResidentialForm from '@/components/ResidentialForm';
import CommercialForm from '@/components/CommercialForm';
import { calculateResidentialResult } from '@/lib/calculations/residential';
import { calculateCommercialResult } from '@/lib/calculations/commercial';
import { saveSubmission } from '@/lib/storage';
import type {
  CommercialInput,
  PropertyMode,
  ResidentialInput,
  Submission,
} from '@/types/property';

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `submission-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function CheckPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode =
    searchParams.get('mode') === 'commercial' ? 'commercial' : 'residential';

  const [mode, setMode] = useState<PropertyMode>(initialMode);

  const handleResidentialSubmit = (input: ResidentialInput) => {
    const result = calculateResidentialResult(input);

    const submission: Submission = {
      id: createId(),
      mode: 'residential',
      createdAt: new Date().toISOString(),
      input,
      result,
      score: result.score,
      verdict: result.verdict,
    };

    saveSubmission(submission);
    router.push('/results');
  };

  const handleCommercialSubmit = (input: CommercialInput) => {
    const result = calculateCommercialResult(input);

    const submission: Submission = {
      id: createId(),
      mode: 'commercial',
      createdAt: new Date().toISOString(),
      input,
      result,
      score: result.score,
      verdict: result.verdict,
    };

    saveSubmission(submission);
    router.push('/results');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
          Free property check
        </p>

        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          Run an indicative property return check
        </h1>

        <p className="text-sm text-stone-600 max-w-2xl">
          Choose residential or commercial, enter the key numbers, and get a
          yield estimate, risk flags, and clear verdict. This is decision-support
          only, not a formal valuation.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <ModeSelector mode={mode} onChange={setMode} />

        {mode === 'residential' ? (
          <ResidentialForm onSubmit={handleResidentialSubmit} />
        ) : (
          <CommercialForm onSubmit={handleCommercialSubmit} />
        )}
      </div>

      <div className="mt-8 bg-stone-100 border border-stone-200 rounded-xl p-5 text-sm text-stone-600">
        <p className="font-semibold text-stone-800 mb-2">Important disclaimer</p>

        <p>
          YieldLens UK provides indicative property return checks and
          decision-support analysis only. It is not a formal valuation, financial
          advice, mortgage advice, legal advice, tax advice, or a substitute for
          professional due diligence.
        </p>
      </div>
    </div>
  );
}

export default function CheckPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
            <p className="text-sm text-stone-500">Loading property check...</p>
          </div>
        </div>
      }
    >
      <CheckPageContent />
    </Suspense>
  );
}
