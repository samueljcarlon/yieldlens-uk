import type { ReactNode } from 'react';
import {
  sectionHeadingClass,
  surfaceCardClass,
  supportingTextClass,
} from '@/components/yieldLensUi';

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  eyebrow: string;
  title: string;
  description?: string;
  faqs: FaqItem[];
  sectionClassName?: string;
  children?: ReactNode;
};

export default function FaqSection({
  eyebrow,
  title,
  description,
  faqs,
  sectionClassName = 'bg-white border-y border-[var(--yieldlens-border)]',
  children,
}: FaqSectionProps) {
  return (
    <section className={sectionClassName}>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] mb-3">
            {eyebrow}
          </p>
          <h2 className={`${sectionHeadingClass} mb-3`}>{title}</h2>
          {description && <p className={supportingTextClass}>{description}</p>}
        </div>

        {children}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`${surfaceCardClass} border-t-4 p-5 sm:p-6 ${
                index % 3 === 0
                  ? 'border-t-[var(--yieldlens-caution)]'
                  : index % 3 === 1
                    ? 'border-t-[var(--yieldlens-primary)]'
                    : 'border-t-[var(--yieldlens-fragile)]'
              }`}
            >
              <p className="font-semibold text-stone-900 mb-2">{faq.question}</p>
              <p className="text-sm text-[var(--yieldlens-muted)] leading-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
