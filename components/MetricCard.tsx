interface Props {
  label: string;
  value: string | number;
  helper?: string;
}

export default function MetricCard({ label, value, helper }: Props) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-3 h-1.5 w-14 rounded-full bg-teal-600/20" />
      <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-medium mb-1">
        {label}
      </p>

      <p className="text-2xl font-bold text-stone-950 tabular-nums leading-none">
        {value}
      </p>

      {helper && (
        <p className="text-xs text-stone-500 mt-3 leading-5">
          {helper}
        </p>
      )}
    </div>
  );
}
