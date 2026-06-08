interface Props {
  label: string;
  value: string | number;
  helper?: string;
}

export default function MetricCard({ label, value, helper }: Props) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-stone-400 font-medium mb-1">
        {label}
      </p>

      <p className="text-2xl font-bold text-stone-900">
        {value}
      </p>

      {helper && (
        <p className="text-xs text-stone-500 mt-2">
          {helper}
        </p>
      )}
    </div>
  );
}
