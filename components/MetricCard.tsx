interface Props {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

export default function MetricCard({ label, value, sub, highlight }: 
Props) {
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        highlight
          ? 'bg-teal-50 border-teal-200'
          : 'bg-white border-stone-200'
      }`}
    >
      <p className="text-xs uppercase tracking-widest text-stone-400 
font-medium mb-1">{label}</p>
      <p className={`text-2xl font-semibold tabular-nums ${highlight ? 
'text-teal-800' : 'text-stone-900'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-stone-400 mt-1">{sub}</p>}
    </div>
  );
}
