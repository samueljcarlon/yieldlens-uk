'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ModeSelector from '@/components/ModeSelector';
import ResidentialForm from '@/components/ResidentialForm';
import CommercialForm from '@/components/CommercialForm';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import { disclaimerClass, surfaceCardClass, surfaceCardSoftClass } from '@/components/yieldLensUi';
import { calculateResidentialResult } from '@/lib/calculations/residential';
import { calculateCommercialResult } from '@/lib/calculations/commercial';
import { saveSubmission } from '@/lib/storage';
import { saveRemoteSubmission } from '@/lib/remoteSubmissions';
import { logToolEvent } from '@/lib/logToolEvent';
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
  const hasTrackedCommercialStart = useRef(false);

  useEffect(() => {
    if (mode !== 'commercial' || hasTrackedCommercialStart.current) return;

    hasTrackedCommercialStart.current = true;

    void logToolEvent({
      event_name: 'commercial_check_started',
      page_path: '/check',
      tool_name: 'commercial_funnel',
      result_label: 'Commercial check started',
      result_band: 'form_opened',
      metadata: {
        page_path: '/check',
        page_type: 'commercial_check',
        funnel_area: 'commercial',
        mode: 'commercial',
        source_page: '/check?mode=commercial',
      },
    });
  }, [mode]);

  const handleResidentialSubmit = async (input: ResidentialInput) => {
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
    await saveRemoteSubmission(submission);
    router.push('/results');
  };

  const handleCommercialSubmit = async (input: CommercialInput) => {
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
    await saveRemoteSubmission(submission);
    router.push('/results');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      {mode === 'commercial' && (
        <FunnelEventTracker
          eventName="inbound_page_view"
          pagePath="/check"
          pageType="commercial_check"
          mode="commercial"
          eventLabel="Commercial check page viewed"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:items-start">
        <div>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-teal-700 font-semibold mb-2">
              Free property check
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-stone-950 mb-3">
              Run an indicative property pressure-test
            </h1>

            <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-7">
              Choose residential or commercial, enter the key numbers, and get a
              yield estimate, risk flags, and clear verdict. This is decision-support
              only.
            </p>
          </div>

          <div className={`${surfaceCardClass} p-5 sm:p-6`}>
            <ModeSelector mode={mode} onChange={setMode} />

            {mode === 'residential' ? (
              <ResidentialForm onSubmit={handleResidentialSubmit} />
            ) : (
              <CommercialForm onSubmit={handleCommercialSubmit} />
            )}

            <p className={`${disclaimerClass} mt-6`}>
              By submitting this check, you agree to the Privacy Notice and Terms.
              We use your email to save the check and follow up about this submission or report access.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className={`${surfaceCardClass} p-5`}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-teal-700 font-semibold mb-2">
              Commercial workflow
            </p>

            <h2 className="text-xl font-bold text-stone-950 mb-3">
              Use commercial mode when the lease is the decision
            </h2>

            <p className="text-sm text-stone-600 leading-6">
              The commercial check pressure-tests rent burden, break-even customers,
              opening cash, downside trading, and lease questions before you commit.
            </p>
          </div>

          <div className={`${surfaceCardSoftClass} border-teal-200 bg-teal-50 p-5`}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-teal-700 font-semibold mb-2">
              What you get
            </p>

            <ul className="space-y-2 text-sm text-teal-950">
              <li>Rent burden and break-even pressure test</li>
              <li>Upfront cash and opening buffer detail</li>
              <li>Downside survival and risk flags</li>
              <li>Clear next steps before spending more time</li>
            </ul>
          </div>

          <div className={`${surfaceCardSoftClass} p-5 text-sm text-stone-600`}>
            <p className="font-semibold text-stone-900 mb-2">Important disclaimer</p>

            <p className="leading-6">
              YieldLens UK provides indicative property pressure-tests and
              decision-support analysis only. It is not financial advice, legal
              advice, tax advice, a valuation, or a substitute for professional due
              diligence.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function CheckPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className={`${surfaceCardClass} p-8`}>
            <p className="text-sm text-stone-500">Loading property check...</p>
          </div>
        </div>
      }
    >
      <CheckPageContent />
    </Suspense>
  );
}
