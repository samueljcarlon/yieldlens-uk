import type { PropertyMode } from '@/types/property';

interface Props {
  mode: PropertyMode;
  onChange: (mode: PropertyMode) => void;
}

export default function ModeSelector({ mode, onChange }: Props) {
  const activeClass = 'bg-teal-700 text-white border-teal-700';
  const inactiveClass = 'bg-white text-stone-700 border-stone-300 hover:border-teal-600 hover:text-teal-700';

  return (
    <div className="flex gap-3 mb-8">
      <button
        type="button"
        onClick={() => onChange('residential')}
        className={`px-5 py-2.5 rounded text-sm font-medium border transition-colors ${
          mode === 'residential' ? activeClass : inactiveClass
        }`}
      >
        Residential
      </button>

      <button
        type="button"
        onClick={() => onChange('commercial')}
        className={`px-5 py-2.5 rounded text-sm font-medium border transition-colors ${
          mode === 'commercial' ? activeClass : inactiveClass
        }`}
      >
        Commercial
      </button>
    </div>
  );
}
