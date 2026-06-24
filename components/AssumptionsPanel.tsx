import { surfaceCardClass } from '@/components/yieldLensUi';

interface AssumptionsPanelProps {
  assumptions?: string[];
  missingDataWarnings?: string[];
}

export default function AssumptionsPanel({
  assumptions = [],
  missingDataWarnings = [],
}: AssumptionsPanelProps) {
  const hasWarnings = missingDataWarnings.length > 0;
  const hasAssumptions = assumptions.length > 0;

  if (!hasWarnings && !hasAssumptions) {
    return (
      <div className={`${surfaceCardClass} p-5 text-sm text-stone-500`}>
        No assumptions or missing data warnings were recorded for this check.
      </div>
    );
  }

  return (
    <div className={`${surfaceCardClass} p-5 space-y-4 text-sm`}>
      {hasWarnings && (
        <div>
          <p className="font-semibold text-orange-700 mb-2 uppercase tracking-wide text-xs">
            Missing data warnings
          </p>

          <ul className="space-y-2">
            {missingDataWarnings.map((warning) => (
              <li key={warning} className="text-orange-800">
                • {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasAssumptions && (
        <div>
          <p className="font-semibold text-stone-900 mb-2">
            Assumptions used
          </p>

          <ul className="space-y-2">
            {assumptions.map((assumption) => (
              <li key={assumption} className="text-stone-600">
                • {assumption}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
