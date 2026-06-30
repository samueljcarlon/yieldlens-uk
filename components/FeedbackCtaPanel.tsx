import { surfaceCardClass } from '@/components/yieldLensUi';

type FeedbackCtaPanelProps = {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
  note?: string;
};

export default function FeedbackCtaPanel({
  eyebrow,
  title,
  body,
  ctaLabel,
  href,
  note,
}: FeedbackCtaPanelProps) {
  return (
    <div className={`${surfaceCardClass} p-5 sm:p-6`}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--yieldlens-caution)] font-semibold mb-2">
        {eyebrow}
      </p>
      <h3 className="text-lg font-bold text-stone-950">{title}</h3>
      <p className="mt-3 text-sm text-stone-700 leading-7">{body}</p>

      {note ? (
        <p className="mt-3 text-xs text-stone-500 leading-5">{note}</p>
      ) : null}

      <div className="mt-4">
        <a
          href={href}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-400 hover:bg-[var(--yieldlens-panel)]"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
