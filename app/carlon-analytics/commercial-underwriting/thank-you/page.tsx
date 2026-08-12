import Link from 'next/link';
import type { Metadata } from 'next';
import { primaryCtaClass, secondaryCtaClass } from '@/components/yieldLensUi';

export const metadata: Metadata = {
  title: 'Underwriting request received | Carlon Analytics',
  robots: { index: false, follow: false },
};

export default function CarlonAnalyticsThankYouPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
      <div className="rounded-[32px] border border-stone-200 bg-white p-7 sm:p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-[#5b7d58] font-semibold mb-3">
          Carlon Analytics
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-950">
          Your underwriting request has been received.
        </h1>
        <p className="mt-5 text-sm sm:text-base leading-7 text-stone-700 max-w-2xl">
          We will review the site, business assumptions and evidence gaps before confirming the scope of work. Submitting this intake is not a purchase and does not commit you to proceed.
        </p>
        <div className="mt-7 rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <p className="text-sm font-semibold text-stone-900">What happens next</p>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            The review starts with the information you supplied. If a key lease term, cost assumption or document is missing, we may ask for it before quoting or beginning the full underwriting.
          </p>
        </div>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link href="/check?mode=commercial" className={primaryCtaClass}>
            Run another commercial check
          </Link>
          <Link href="/" className={secondaryCtaClass}>
            Back to YieldLens
          </Link>
        </div>
      </div>
    </div>
  );
}
