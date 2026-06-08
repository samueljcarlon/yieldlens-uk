interface Props {
  assumptions: string[];
  missingDataWarnings: string[];
}

export default function AssumptionsPanel({ assumptions, 
missingDataWarnings }: Props) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 
space-y-4 text-sm">
      {missingDataWarnings.length > 0 && (
        <div>
          <p className="font-semibold text-orange-700 mb-2 uppercase 
tracking-wide text-xs">
            Missing data warnings
          </p>
          <ul className="space-y-1">
            {missingDataWarnings.map((w, i) => (
              <li key={i} className="text-orange-700 flex items-start 
gap-2">
                <span className="mt-0.5">⚠</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <p className="font-semibold text-stone-500 mb-2 uppercase 
tracking-wide text-xs">
          Assumptions used
        </p>
        <ul className="space-y-1">
          {assumptions.map((a, i) => (
            <li key={i} className="text-stone-500 flex items-start gap-2">
              <span className="text-stone-300 mt-0.5">–</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
