import type { Metadata } from 'next';
import Link from 'next/link';
import {
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  memoBandClass,
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
} from '@/components/yieldLensUi';
import FeedbackCtaPanel from '@/components/FeedbackCtaPanel';

export const metadata: Metadata = {
  title: 'Contact YieldLens UK',
  description:
    'Contact YieldLens UK about product questions, payment access, privacy queries, or report corrections.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact YieldLens UK',
    description:
      'Email YieldLens UK for product questions, payment access issues, privacy queries, or report corrections.',
    url: 'https://yieldlens.co.uk/contact',
  },
};

const supportTopics = [
  'Questions about the product or how the commercial check works',
  'Access after payment or trouble opening a paid file',
  'Privacy questions or a request to correct information',
  'Report issues if the output or assumptions look wrong',
];

const whatToInclude = [
  'A short description of the issue',
  'The page you were using',
  'Whether the issue happened before or after payment',
  'Any error message shown on screen',
];

function SectionTitle({
  eyebrow,
  title,
  description,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';

  return (
    <div className="mb-8">
      <p className={`text-xs font-medium uppercase tracking-widest mb-3 ${isDark ? 'text-[#DCCDA8]' : 'text-[var(--yieldlens-caution)]'}`}>
        {eyebrow}
      </p>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-900'}`}>{title}</h2>
      {description && (
        <p className={`text-sm leading-7 max-w-3xl ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function mailtoHref() {
  return 'mailto:yieldlensuk@gmail.com?subject=YieldLens%20support';
}

export default function ContactPage() {
  return (
    <div className="bg-[var(--yieldlens-page)] text-stone-900">
      <section className="bg-[var(--yieldlens-hero)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#DCCDA8] mb-4">
                Contact
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                Contact YieldLens UK
              </h1>
              <p className="text-base sm:text-lg text-stone-300 max-w-2xl mb-8 leading-8">
                For product questions, access after payment, privacy queries, or
                report corrections, email YieldLens UK at{' '}
                <a className="underline decoration-white/30 underline-offset-4 hover:decoration-white" href={mailtoHref()}>
                  yieldlensuk@gmail.com
                </a>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={mailtoHref()} className={heroPrimaryCtaClass}>
                  Email support
                </a>
                <Link href="/check?mode=commercial" className={heroSecondaryCtaClass}>
                  Run a free commercial check
                </Link>
              </div>
            </div>

            <div className={`${memoBandClass} p-6 sm:p-7`}>
              <p className="text-xs uppercase tracking-widest text-[#DCCDA8] font-medium mb-3">
                Support route
              </p>
              <p className="text-2xl font-bold leading-tight text-white">
                One email for product help, file access, and privacy questions.
              </p>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#DCCDA8] font-semibold mb-3">
                  Use it for
                </p>
                <ul className="space-y-2 text-sm text-stone-300 leading-6">
                  {supportTopics.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="What to include"
            title="Send enough context to diagnose the issue quickly."
            description="A short description is usually enough. If the issue is about a paid file or saved result, include the page you were using and what happened."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatToInclude.map((item, index) => (
              <div
                key={item}
                className={`${surfaceCardSoftClass} border-l-4 ${
                  index % 4 === 0
                    ? 'border-l-[var(--yieldlens-caution)]'
                    : index % 4 === 1
                      ? 'border-l-[var(--yieldlens-primary)]'
                      : index % 4 === 2
                        ? 'border-l-[var(--yieldlens-positive)]'
                        : 'border-l-[var(--yieldlens-fragile)]'
                } p-5 text-sm leading-7 text-stone-700`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Product boundary"
            title="What support can and cannot cover."
            description="YieldLens can help with product questions and report access. It cannot provide professional advice or replace due diligence."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-4">
            <div className={`${surfaceCardClass} p-5`}>
              <p className="text-sm font-semibold text-stone-900 mb-2">Can help with</p>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>Commercial check questions</li>
                <li>Paid file access after checkout</li>
                <li>Privacy or correction requests</li>
                <li>General report corrections</li>
              </ul>
            </div>
            <div className={`${surfaceCardClass} p-5`}>
              <p className="text-sm font-semibold text-stone-900 mb-2">Cannot cover</p>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>Financial advice</li>
                <li>Legal advice</li>
                <li>Tax advice</li>
                <li>Mortgage advice</li>
                <li>Valuation or professional due diligence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Operator feedback"
            title="Useful feedback comes from real commercial users."
            description="Cafes, restaurants, salons, retailers, and first-time commercial tenants can all send a short note if the free check or sample file misses something important."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4">
            <FeedbackCtaPanel
              eyebrow="Send feedback"
              title="Tell us what the free check missed."
              body="If you are comparing a real lease, send a short note about what felt useful, unclear, or missing. That helps shape the Standard file around operator questions rather than assumptions alone."
              ctaLabel="Email feedback"
              href={`mailto:yieldlensuk@gmail.com?subject=${encodeURIComponent(
                'YieldLens feedback on commercial check'
              )}&body=${encodeURIComponent(
                'Business type:\nType of unit:\nWhat felt useful:\nWhat was unclear:\nWhat would make the £49 Standard file more useful:\n'
              )}`}
              note="Please do not send card details. Avoid sending confidential lease documents unless specifically requested."
            />

            <div className={`${surfaceCardSoftClass} p-5`}>
              <p className="text-sm font-semibold text-stone-900 mb-2">Use this when you are:</p>
              <ul className="space-y-2 text-sm text-stone-700 leading-7">
                <li>Comparing two or more units</li>
                <li>Testing a cafe, restaurant, salon, or retail lease</li>
                <li>Deciding whether the rent still works after fit-out and deposit</li>
                <li>Checking if the £49 file would add useful pressure-test detail</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-hero)] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionTitle
            eyebrow="Quick links"
            title="Use the support route, or continue the commercial journey."
            tone="dark"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={mailtoHref()} className={heroPrimaryCtaClass}>
              Email yieldlensuk@gmail.com
            </a>
            <Link href="/sample-commercial-viability-file" className={heroSecondaryCtaClass}>
              View sample file
            </Link>
            <Link href="/how-it-works" className={secondaryCtaClass}>
              Read how it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
