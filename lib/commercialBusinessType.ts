export type CommercialBusinessTypeKey =
  | 'cafe'
  | 'restaurant'
  | 'shop_retail'
  | 'takeaway'
  | 'salon'
  | 'barber_shop'
  | 'other';

export interface CommercialBusinessTypeInfo {
  key: CommercialBusinessTypeKey;
  label: string;
  shortLabel: string;
  breakEvenLabel: string;
  helperText: string;
  summaryLine: string;
  evidenceGaps: string[];
  questions: string[];
  assumptionHints: string[];
}

export const COMMERCIAL_BUSINESS_TYPE_OPTIONS: Array<{
  value: CommercialBusinessTypeKey;
  label: string;
}> = [
  { value: 'cafe', label: 'Cafe' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'shop_retail', label: 'Shop / retail' },
  { value: 'takeaway', label: 'Takeaway' },
  { value: 'salon', label: 'Salon' },
  { value: 'barber_shop', label: 'Barber shop' },
  { value: 'other', label: 'Other commercial site' },
];

const BUSINESS_TYPE_INFO: Record<CommercialBusinessTypeKey, CommercialBusinessTypeInfo> = {
  cafe: {
    key: 'cafe',
    label: 'Cafe',
    shortLabel: 'Cafe',
    breakEvenLabel: 'Break-even covers/day',
    helperText:
      'Include covers/customers, staffing, service charge, rates, and opening cash in your assumptions.',
    summaryLine:
      'For a cafe, covers, staffing, service charge, and quieter trading periods often matter more than the headline rent.',
    evidenceGaps: [
      'Expected covers or customers per day',
      'Local footfall and peak trading assumptions',
    ],
    questions: [
      'What customer volume is needed at quieter periods?',
      'Are service charge and business rates included in the cost base?',
    ],
    assumptionHints: ['Covers/customers', 'Staffing', 'Service charge', 'Rates', 'Opening cash'],
  },
  restaurant: {
    key: 'restaurant',
    label: 'Restaurant',
    shortLabel: 'Restaurant',
    breakEvenLabel: 'Break-even covers/day',
    helperText:
      'Think about covers, food costs, staffing, fit-out, service charge, rates, and weaker trading periods.',
    summaryLine:
      'For a restaurant, covers, food costs, staffing, fit-out, and weaker service periods drive the real pressure.',
    evidenceGaps: [
      'Covers per service',
      'Food cost and staffing assumptions',
    ],
    questions: [
      'Are fit-out and staffing assumptions realistic for the concept?',
      'What happens if covers are 15% to 25% lower than expected?',
    ],
    assumptionHints: ['Covers', 'Food costs', 'Staffing', 'Fit-out', 'Service charge'],
  },
  shop_retail: {
    key: 'shop_retail',
    label: 'Shop / retail',
    shortLabel: 'Shop / retail',
    breakEvenLabel: 'Break-even sales/day',
    helperText:
      'Think about stock, margin, footfall, staffing, rates, service charge, and fit-out.',
    summaryLine:
      'For a shop, footfall, stock margin, and conversion matter as much as the rent headline.',
    evidenceGaps: [
      'Stock margin and conversion assumptions',
      'Footfall evidence',
    ],
    questions: [
      'How much stock cash is tied up before opening?',
      'What footfall and conversion evidence supports the sales assumption?',
    ],
    assumptionHints: ['Stock', 'Margin', 'Footfall', 'Staffing', 'Fit-out'],
  },
  takeaway: {
    key: 'takeaway',
    label: 'Takeaway',
    shortLabel: 'Takeaway',
    breakEvenLabel: 'Break-even orders/day',
    helperText:
      'Think about orders, average order value, delivery-platform costs, equipment, extraction, rates, and opening cash.',
    summaryLine:
      'For a takeaway, orders, delivery-platform costs, equipment, and opening cash set the real pressure point.',
    evidenceGaps: [
      'Average order value',
      'Delivery-platform cost assumptions',
    ],
    questions: [
      'Is extraction or ventilation already suitable?',
      'Are delivery-platform fees included in the margin assumption?',
    ],
    assumptionHints: ['Orders', 'Average order value', 'Delivery-platform costs', 'Equipment', 'Extraction'],
  },
  salon: {
    key: 'salon',
    label: 'Salon',
    shortLabel: 'Salon',
    breakEvenLabel: 'Break-even bookings/day',
    helperText:
      'Think about chairs or treatment rooms, utilisation, staffing, fit-out, rates, and service charge.',
    summaryLine:
      'For a salon, chair or treatment-room utilisation and appointment volume decide whether the lease feels manageable.',
    evidenceGaps: [
      'Chair or treatment-room utilisation',
      'Appointment capacity',
    ],
    questions: [
      'How many chairs or treatment rooms need to be active?',
      'What appointment capacity is realistic on quieter days?',
    ],
    assumptionHints: ['Chairs or treatment rooms', 'Utilisation', 'Staffing', 'Fit-out', 'Service charge'],
  },
  barber_shop: {
    key: 'barber_shop',
    label: 'Barber shop',
    shortLabel: 'Barber shop',
    breakEvenLabel: 'Break-even appointments/day',
    helperText:
      'Think about chair utilisation, appointments, walk-ins, average spend, staffing, and fit-out.',
    summaryLine:
      'For a barber shop, chair utilisation, walk-ins, and appointment volume matter more than a simple rent rule of thumb.',
    evidenceGaps: [
      'Chair utilisation',
      'Walk-in versus appointment mix',
    ],
    questions: [
      'How many appointments or cuts are needed per day?',
      'What walk-in versus appointment mix is realistic?',
    ],
    assumptionHints: ['Chair utilisation', 'Appointments', 'Walk-ins', 'Average spend', 'Fit-out'],
  },
  other: {
    key: 'other',
    label: 'Other commercial site',
    shortLabel: 'Other commercial site',
    breakEvenLabel: 'Break-even level',
    helperText:
      'Use the best available estimates for rent, revenue, costs, fit-out, and opening cash.',
    summaryLine:
      'Use the best available assumptions and test the deal against rent, cash, and downside trading rather than the headline rent alone.',
    evidenceGaps: [
      'Comparable rent evidence',
      'Revenue assumption evidence',
    ],
    questions: [
      'What evidence supports the revenue assumption?',
      'How much cash remains after fit-out, deposit, and opening costs?',
      'What lease terms could change the downside?',
    ],
    assumptionHints: ['Rent', 'Revenue', 'Costs', 'Fit-out', 'Opening cash'],
  },
};

function normalizeCommercialBusinessTypeKey(value?: string | null): CommercialBusinessTypeKey {
  const raw = typeof value === 'string' ? value.trim().toLowerCase() : '';

  if (!raw) return 'other';

  const normalized = raw.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');

  if (normalized.includes('cafe') || normalized.includes('coffee')) return 'cafe';
  if (normalized.includes('restaurant')) return 'restaurant';
  if (normalized.includes('shop / retail') || normalized.includes('shop retail')) return 'shop_retail';
  if (
    normalized === 'shop' ||
    normalized === 'retail' ||
    normalized.includes('retail unit') ||
    normalized.includes('retail shop') ||
    normalized.includes('shop and retail')
  ) {
    return 'shop_retail';
  }
  if (normalized.includes('takeaway')) return 'takeaway';
  if (normalized.includes('salon')) return 'salon';
  if (normalized.includes('barber shop') || normalized.includes('barbershop') || normalized.includes('barber')) {
    return 'barber_shop';
  }

  return 'other';
}

export function getCommercialBusinessTypeInfo(
  value?: string | null
): CommercialBusinessTypeInfo {
  return BUSINESS_TYPE_INFO[normalizeCommercialBusinessTypeKey(value)];
}

export function getCommercialBusinessTypeLabel(value?: string | null): string {
  return getCommercialBusinessTypeInfo(value).label;
}

export function getCommercialBusinessTypeOptions() {
  return COMMERCIAL_BUSINESS_TYPE_OPTIONS;
}

export function getCommercialBusinessTypeValue(input: unknown): string {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return '';
  }

  const value = (input as Record<string, unknown>).businessType;

  return typeof value === 'string' ? value : '';
}
