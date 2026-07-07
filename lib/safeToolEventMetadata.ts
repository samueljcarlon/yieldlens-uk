import { normalizeFunnelPath } from '@/lib/funnelAttribution';

const SAFE_METADATA_KEYS = new Set([
  'page_path',
  'page_type',
  'funnel_area',
  'mode',
  'source_page',
  'source_path',
  'landing_page',
  'current_page_path',
  'current_page_type',
  'current_mode',
  'current_seen_at',
  'first_page_path',
  'first_page_type',
  'first_mode',
  'first_seen_at',
  'last_page_path',
  'last_page_type',
  'last_mode',
  'last_seen_at',
  'referrer_type',
  'referrer_host',
  'cta_label',
  'cta_location',
  'destination',
  'destination_path',
  'business_type',
  'product_area',
  'postcode',
  'has_address',
  'utm_source',
  'utm_medium',
  'utm_campaign',
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

      if (
        key.endsWith('_page_path') ||
        key === 'page_path' ||
        key === 'source_page' ||
        key === 'destination'
      ) {
        const normalized = normalizeFunnelPath(trimmed);
        if (normalized) {
          result[key] = normalized;
        }
        continue;
      }

      if (key === 'referrer_host') {
        result[key] = trimmed.toLowerCase();
        continue;
      }

      result[key] = trimmed;
      continue;
    }

    result[key] = value;
  }

  return Object.keys(result).length > 0 ? result : null;
}
