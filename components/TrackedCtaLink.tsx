'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { logToolEvent } from '@/lib/logToolEvent';

interface TrackedCtaLinkProps {
  href: string;
  className: string;
  eventName: string;
  pagePath: string;
  ctaLabel: string;
  ctaLocation?: string;
  pageType: string;
  children: ReactNode;
}

export default function TrackedCtaLink({
  href,
  className,
  eventName,
  pagePath,
  ctaLabel,
  ctaLocation = 'body',
  pageType,
  children,
}: TrackedCtaLinkProps) {
  const handleClick = () => {
    void logToolEvent({
      event_name: eventName,
      page_path: pagePath,
      tool_name: 'commercial_funnel',
      result_label: ctaLabel,
      result_band: 'cta_click',
      metadata: {
        source_path: pagePath,
        page_path: pagePath,
        cta_label: ctaLabel,
        cta_location: ctaLocation,
        destination: href,
        destination_path: href,
        funnel_area: 'commercial',
        page_type: pageType,
      },
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
