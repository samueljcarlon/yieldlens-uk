import { primaryCtaClass, secondaryCtaClass, surfaceCardClass } from '@/components/yieldLensUi';

const plans = [
  {
    name: 'Basic check',
    price: 'Free',
    description: 'Indicative yield estimate, risk score, cash flow snapshot, and verdict.',
    cta: 'Start free check',
    href: '/check',
    available: true,
    highlight: false,
  },
  {
    name: 'Mini PDF report',
    price: '£9',
    description: 'Downloadable one-page property return summary.',
    cta: 'Coming soon',
    href: '#',
    available: false,
    highlight: true,
  },
  {
    name: 'Standard report',
    price: '£29',
    description: 'Full property return check with comparable analysis and detailed assumptions.',
    cta: 'Coming soon',
    href: '#',
    available: false,
    highlight: false,
  },
  {
    name: 'Human-reviewed report',
    price: '£79 to £99',
    description: 'Analyst-reviewed property return report with written commentary.',
    cta: 'Coming soon',
    href: '#',
    available: false,
    highlight: false,
  },
];

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`${surfaceCardClass} p-5 flex flex-col gap-3 ${
            plan.highlight
              ? 'border-teal-200 bg-gradient-to-br from-teal-50 via-white to-amber-50'
              : 'border-stone-200 bg-white'
          }`}
        >
          <div>
            <p className="font-semibold text-stone-900">{plan.name}</p>
            <p className="text-2xl font-bold text-teal-700 mt-1 tracking-tight">{plan.price}</p>
          </div>

          <p className="text-sm text-stone-600 flex-1">{plan.description}</p>

          {plan.available ? (
            <a
              href={plan.href}
              className={`${primaryCtaClass} text-center`}
            >
              {plan.cta}
            </a>
          ) : (
            <span className={`${secondaryCtaClass} cursor-default text-center`}>
              {plan.cta}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
