'use client';

import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logToolEvent } from '@/lib/logToolEvent';
import { heroSecondaryCtaClass, heroBackdropClass, primaryCtaClass, surfaceCardClass } from '@/components/yieldLensUi';

interface ToolConversionPanelProps {
  sourceTool: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function ToolConversionPanel({
  sourceTool,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: ToolConversionPanelProps) {
  const router = useRouter();
  const [clickedLabel, setClickedLabel] = useState<string | null>(null);

  const handleClick = async (
    event: MouseEvent<HTMLAnchorElement>,
    label: string,
    href: string
  ) => {
    event.preventDefault();
    setClickedLabel(label);

    await logToolEvent({
      event_name: 'conversion_cta_clicked',
      page_path: window.location.pathname,
      tool_name: sourceTool,
      result_label: label,
      result_band: 'cta_click',
      metadata: {
        destination: href,
        sourceTool,
      },
    });

    router.push(href);
  };

  return (
    <div className={`${surfaceCardClass} ${heroBackdropClass} p-7 text-white`}>
      <p className="text-xs uppercase tracking-widest text-green-300 font-medium mb-3">
        Next step
      </p>

      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-sm text-stone-300 leading-7 max-w-3xl mb-6">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={primaryHref}
          onClick={(event) => handleClick(event, primaryLabel, primaryHref)}
          className={primaryCtaClass}
        >
          {clickedLabel === primaryLabel ? 'Opening...' : primaryLabel}
        </a>

        {secondaryLabel && secondaryHref && (
          <a
            href={secondaryHref}
            onClick={(event) => handleClick(event, secondaryLabel, secondaryHref)}
            className={heroSecondaryCtaClass}
          >
            {clickedLabel === secondaryLabel ? 'Opening...' : secondaryLabel}
          </a>
        )}
      </div>

      <p className="text-xs text-stone-400 mt-4 leading-5">
        The full check saves a property-specific result and can be used to request a fuller viability file.
      </p>
    </div>
  );
}
