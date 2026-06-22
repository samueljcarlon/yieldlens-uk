const SAFE_METADATA_KEYS = new Set([
  'page_path',
  'page_type',
  'funnel_area',
  'mode',
  'source_page',
  'cta_label',
  'destination',
  'result_band',
  'rentShareBand',
  'housingShareBand',
  'disposableBand',
  'hasBillsEntered',
  'hasDebtEntered',
  'hasTransportEntered',
  'cashFlowBand',
  'yieldBand',
  'costToRentBand',
  'hasMortgage',
  'hasVoidAllowance',
  'hasServiceCharge',
  'sourceTool',
]);

type Primitive = string | number | boolean;

function isPrimitive(value: unknown): value is Primitive {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

export function sanitizeToolEventMetadata(metadata: unknown): Record<string, Primitive> | null {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return null;
  }

  const result: Record<string, Primitive> = {};

  for (const [key, value] of Object.entries(metadata)) {
    if (!SAFE_METADATA_KEYS.has(key)) continue;
    if (!isPrimitive(value)) continue;

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) continue;
      result[key] = trimmed;
      continue;
    }

    result[key] = value;
  }

  return Object.keys(result).length > 0 ? result : null;
}
