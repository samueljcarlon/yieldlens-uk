'use client';

type PrintSaveButtonProps = {
  label?: string;
  className?: string;
};

export default function PrintSaveButton({
  label = 'Print or save as PDF',
  className = 'bg-white text-stone-900 border border-stone-300 px-6 py-3 rounded font-medium hover:border-stone-400 transition-colors text-sm',
}: PrintSaveButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
    >
      {label}
    </button>
  );
}
