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
  metadata?: Record<string, unknown>;
  children: ReactNode;
}

const BUSINESS_PAGE_TYPES: Record<string, string> = {
  '/how-much-rent-can-a-cafe-afford': 'cafe',
  '/restaurant-lease-viability-check': 'restaurant',
  '/salon-lease-viability-check': 'salon',
  '/how-much-rent-can-a-barber-shop-afford': 'barber_shop',
  '/how-much-rent-can-a-coffee-shop-afford': 'coffee_shop',
  '/how-much-rent-can-a-nail-salon-afford': 'nail_salon',
  '/how-much-rent-can-a-gym-afford': 'gym',
  '/how-much-rent-can-a-shop-afford': 'shop',
  '/how-much-rent-can-a-takeaway-afford': 'takeaway',
};

function getBusinessPageType(pagePath: string): string {
  return BUSINESS_PAGE_TYPES[pagePath] ?? '';
}

export default function TrackedCtaLink({
  href,
  className,
  eventName,
  pagePath,
  ctaLabel,
  ctaLocation = 'body',
  pageType,
  metadata,
  children,
}: TrackedCtaLinkProps) {
  const handleClick = () => {
    const inferredBusinessType = getBusinessPageType(pagePath);

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
        ...(inferredBusinessType ? { business_type: inferredBusinessType } : {}),
        ...(inferredBusinessType ? { product_area: 'business_type_page' } : {}),
        ...(metadata ?? {}),
      },
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
