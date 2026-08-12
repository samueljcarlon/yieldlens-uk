'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModeSelector from '@/components/ModeSelector';
import ResidentialForm from '@/components/ResidentialForm';
import CommercialForm from '@/components/CommercialForm';
import FunnelEventTracker from '@/components/FunnelEventTracker';
import { saveSubmission } from '@/lib/storage';
import { saveRemoteSubmission } from '@/lib/remoteSubmissions';
import { logToolEvent } from '@/lib/logToolEvent';
import { calculateResidentialResult } from '@/lib/calculations/residential';
import { calculateCommercialResult } from '@/lib/calculations/commercial';
import type { CommercialInput, PropertyMode, ResidentialInput, Submission } from '@/types/property';

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `submission-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function CheckPageClient({
  initialMode,
  initialBusinessType,
}: {
  initialMode: PropertyMode;
  initialBusinessType?: string;
}) {
  const router = useRouter();
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
        ...(initialBusinessType ? { business_type: initialBusinessType } : {}),
      },
    });
  }, [mode, initialBusinessType]);

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
    <div>
      {mode === 'commercial' ? (
        <FunnelEventTracker
          eventName="inbound_page_view"
          pagePath="/check"
          pageType="commercial_check"
          mode="commercial"
          eventLabel="Commercial check page viewed"
        />
      ) : null}

      <ModeSelector mode={mode} onChange={setMode} />

      {mode === 'residential' ? (
        <ResidentialForm onSubmit={handleResidentialSubmit} />
      ) : (
        <CommercialForm onSubmit={handleCommercialSubmit} initialBusinessType={initialBusinessType} />
      )}
    </div>
  );
}
