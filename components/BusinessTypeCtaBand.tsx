'use client';

import TrackedCtaLink from '@/components/TrackedCtaLink';

interface BusinessTypeCtaBandProps {
  pagePath: string;
  businessType: string;
  copy: string;
  sampleLabel?: string;
  compareHref?: string;
  compareLabel?: string;
  showCompare?: boolean;
}

export default function BusinessTypeCtaBand({
  pagePath,
  businessType,
  copy,
  sampleLabel = 'View the sample Standard Commercial Viability File.',
  compareHref = '/compare',
  compareLabel = 'Compare two sites before taking one further.',
  showCompare = true,
}: BusinessTypeCtaBandProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      <div className="rounded-3xl border border-[var(--yieldlens-border)] bg-white p-6 sm:p-7 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
              Test the rent before you take the lease further
            </p>
            <p className="text-sm text-stone-700 leading-7 max-w-2xl">
              {copy}
            </p>
            <p className="mt-3 text-sm text-stone-500 leading-7">
              No account required. YieldLens gives a first-pass viability screen only.
            </p>
            <p className="mt-2 text-sm text-stone-600 leading-7">
              Want to see what the paid file looks like first?{' '}
              <TrackedCtaLink
                href="/sample-commercial-viability-file"
                eventName="commercial_viability_page_cta_clicked"
                pagePath={pagePath}
                ctaLabel="business_page_sample_file_cta"
                ctaLocation="business_page_cta_band"
                pageType="seo_page"
                metadata={{
                  business_type: businessType,
                  product_area: 'business_type_page',
                }}
                className="font-medium text-[var(--yieldlens-caution)] hover:text-[var(--yieldlens-primary)]"
              >
                {sampleLabel}
              </TrackedCtaLink>
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <TrackedCtaLink
              href="/check?mode=commercial"
              eventName="commercial_home_cta_clicked"
              pagePath={pagePath}
              ctaLabel="business_page_free_check_cta"
              pageType="seo_page"
              metadata={{
                business_type: businessType,
                product_area: 'business_type_page',
              }}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--yieldlens-primary)] px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-[var(--yieldlens-primary-hover)] transition-colors"
            >
              Run a free commercial check
            </TrackedCtaLink>
            {showCompare ? (
              <TrackedCtaLink
                href={compareHref}
                eventName="commercial_viability_page_cta_clicked"
                pagePath={pagePath}
                ctaLabel="business_page_compare_cta"
                ctaLocation="business_page_cta_band"
                pageType="seo_page"
                metadata={{
                  business_type: businessType,
                  product_area: 'business_type_page',
                }}
                className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-stone-50 px-6 py-3 text-sm font-medium text-stone-700 hover:border-stone-400 hover:bg-stone-100 transition-colors"
              >
                {compareLabel}
              </TrackedCtaLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
