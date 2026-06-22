import type { PropertyMode } from '@/types/property';

interface Props {
  mode: PropertyMode;
  onChange: (mode: PropertyMode) => void;
}

export default function ModeSelector({ mode, onChange }: Props) {
  const activeClass = 'bg-stone-950 text-white border-stone-950 shadow-sm';
  const inactiveClass = 'bg-white text-stone-700 border-stone-200 hover:border-teal-600 hover:text-teal-700';

  return (
    <div className="inline-flex w-full rounded-2xl border border-stone-200 bg-stone-50 p-1 mb-8 gap-1">
      <button
        type="button"
        aria-pressed={mode === 'residential'}
        onClick={() => onChange('residential')}
        className={`flex-1 px-5 py-3 rounded-xl text-sm font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
          mode === 'residential' ? activeClass : inactiveClass
        }`}
      >
        Residential
      </button>

      <button
        type="button"
        aria-pressed={mode === 'commercial'}
        onClick={() => onChange('commercial')}
        className={`flex-1 px-5 py-3 rounded-xl text-sm font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
          mode === 'commercial' ? activeClass : inactiveClass
        }`}
      >
        Commercial
      </button>
    </div>
  );
}
