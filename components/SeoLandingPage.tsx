import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import {
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  memoBandClass,
  secondaryCtaClass,
  surfaceCardClass,
  surfaceCardSoftClass,
} from '@/components/yieldLensUi';

interface SeoLandingPageProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  useCases: string[];
  metrics: {
    title: string;
    description: string;
  }[];
  risks: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function SeoLandingPage({
  eyebrow,
  title,
  description,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
  useCases,
  metrics,
  risks,
  faqs,
}: SeoLandingPageProps) {
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <JsonLd data={faqStructuredData} />
      <section className="bg-[var(--yieldlens-panel)] border-b border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-4">
            {eyebrow}
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">
            {title}
          </h1>

          <p className="text-lg text-[var(--yieldlens-muted)] max-w-3xl mx-auto mb-8 leading-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={primaryHref}
            className={heroPrimaryCtaClass}
          >
            {primaryCta}
          </Link>

          {secondaryCta && secondaryHref && (
            <Link
              href={secondaryHref}
              className={secondaryCtaClass}
            >
              {secondaryCta}
            </Link>
          )}
          </div>

          <p className="text-xs text-[var(--yieldlens-muted)] mt-5">
            Indicative decision-support only. Not a valuation or financial advice.
          </p>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-stone-900 text-center mb-3">
          Who this is for
        </h2>

        <p className="text-sm text-[var(--yieldlens-muted)] text-center max-w-2xl mx-auto mb-8">
          Use YieldLens UK when you need a quick, structured commercial pressure
          test before spending more time, money, or emotional energy on a lease decision.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((useCase, index) => (
            <div
              key={useCase}
              className={`${surfaceCardClass} border-l-4 p-5 ${
                index % 4 === 0
                  ? 'border-l-[var(--yieldlens-caution)]'
                  : index % 4 === 1
                    ? 'border-l-[var(--yieldlens-primary)]'
                    : index % 4 === 2
                      ? 'border-l-[var(--yieldlens-positive)]'
                      : 'border-l-[var(--yieldlens-fragile)]'
              }`}
            >
              <p className="text-sm font-medium text-stone-900">{useCase}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold text-stone-900 text-center mb-3">
            What the check looks at
          </h2>

          <p className="text-sm text-[var(--yieldlens-muted)] text-center max-w-2xl mx-auto mb-8">
            The aim is not to produce decorative waffle. The aim is to expose
            whether the numbers survive realistic assumptions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.title}
                className={`${surfaceCardSoftClass} border-l-4 p-5 ${
                  index % 3 === 0
                    ? 'border-l-[var(--yieldlens-caution)]'
                    : index % 3 === 1
                      ? 'border-l-[var(--yieldlens-primary)]'
                      : 'border-l-[var(--yieldlens-fragile)]'
                }`}
              >
                <p className="font-semibold text-stone-900 mb-2">
                  {metric.title}
                </p>

                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-stone-900 text-center mb-3">
          Risks the free check can flag
        </h2>

        <p className="text-sm text-[var(--yieldlens-muted)] text-center max-w-2xl mx-auto mb-8">
          A commercial site can look attractive until one or two assumptions move
          against you. The check is designed to make those weak points obvious.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {risks.map((risk, index) => (
            <div
              key={risk}
              className={`${surfaceCardClass} border-l-4 p-4 text-sm text-stone-700 ${
                index % 3 === 0
                  ? 'border-l-[var(--yieldlens-caution)]'
                  : index % 3 === 1
                    ? 'border-l-[var(--yieldlens-primary)]'
                    : 'border-l-[var(--yieldlens-fragile)]'
              }`}
            >
              {risk}
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-[var(--yieldlens-panel)] border-y border-[var(--yieldlens-border)]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold text-stone-900 text-center mb-8">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className={`${surfaceCardSoftClass} border-l-4 border-l-[var(--yieldlens-caution)] p-5`}
              >
                <h3 className="font-semibold text-stone-900 mb-2">
                  {faq.question}
                </h3>

                <p className="text-sm text-[var(--yieldlens-muted)] leading-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${memoBandClass} mx-4 sm:mx-6 lg:mx-auto lg:max-w-4xl my-14`}>
        <div className="px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Run the free check before you commit.
          </h2>

          <p className="text-sm text-stone-300 leading-6 max-w-2xl mx-auto mb-6">
            The free check gives you the headline metrics, key risks, and a
            scenario pressure test. If the numbers look serious, you can request
            a fuller viability file afterwards.
          </p>

          <Link
            href={primaryHref}
            className={heroPrimaryCtaClass}
          >
            {primaryCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
