import type {
  CommercialResult,
  ResidentialResult,
  Submission,
} from '@/types/property';

function formatCurrency(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 'Not available';
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 'Not available';
  }

  return `${value.toFixed(1)}%`;
}

function formatNumber(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 'Not available';
  }

  return value.toFixed(1);
}

function formatMonths(value?: number): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return 'No monthly burn';
  }

  return `${value.toFixed(1)} months`;
}

function getNumber(input: unknown, key: string): number | undefined {
  if (!input || typeof input !== 'object') return undefined;

  const value = (input as Record<string, unknown>)[key];

  if (typeof value === 'number' && Number.isFinite(value)) return value;

  return undefined;
}

function ScenarioCard({
  title,
  value,
  helper,
  tone = 'neutral',
}: {
  title: string;
  value: string;
  helper: string;
  tone?: 'neutral' | 'warning' | 'danger' | 'positive';
}) {
  const toneClass = {
    neutral: 'bg-white border-stone-200',
    warning: 'bg-orange-50 border-orange-200',
    danger: 'bg-red-50 border-red-200',
    positive: 'bg-green-50 border-green-200',
  }[tone];

  return (
    <div className={`border rounded-xl p-4 ${toneClass}`}>
      <p className="text-xs uppercase tracking-wide text-stone-500 font-medium mb-1">
        {title}
      </p>

      <p className="text-xl font-bold text-stone-900">
        {value}
      </p>

      <p className="text-xs text-stone-600 mt-2 leading-5">
        {helper}
      </p>
    </div>
  );
}

function getCashFlowTone(value?: number): 'positive' | 'warning' | 'danger' | 'neutral' {
  if (value === undefined) return 'neutral';
  if (value >= 250) return 'positive';
  if (value >= 0) return 'warning';
  return 'danger';
}

function getMarginTone(value?: number): 'positive' | 'warning' | 'danger' | 'neutral' {
  if (value === undefined) return 'neutral';
  if (value >= 5000) return 'positive';
  if (value >= 0) return 'warning';
  return 'danger';
}

function ResidentialScenarios({ submission }: { submission: Submission }) {
  const result = submission.result as ResidentialResult;
  const input = submission.input;

  const expectedMonthlyRent =
    getNumber(input, 'expectedMonthlyRent') ?? getNumber(input, 'monthlyRent');

  const baseCashFlow = result.monthlyCashFlow;

  const monthlyCosts =
    typeof result.annualOwnershipCosts === 'number'
      ? result.annualOwnershipCosts / 12
      : expectedMonthlyRent !== undefined && baseCashFlow !== undefined
        ? expectedMonthlyRent - baseCashFlow
        : undefined;

  const downsideCashFlow =
    expectedMonthlyRent !== undefined && monthlyCosts !== undefined
      ? expectedMonthlyRent * 0.95 - monthlyCosts * 1.1 - expectedMonthlyRent / 12
      : undefined;

  const stressCashFlow =
    expectedMonthlyRent !== undefined && monthlyCosts !== undefined
      ? expectedMonthlyRent * 0.9 - monthlyCosts * 1.2 - (expectedMonthlyRent * 2) / 12
      : undefined;

  const questions = [
    'Can the expected rent be supported by real comparable listings?',
    'What happens if the property is empty for one or two months?',
    'Could service charge, insurance, maintenance, or mortgage costs rise?',
    'Are lease length, ground rent, restrictions, and major works fully understood?',
    'Does the deal still work if rent is slightly lower than expected?',
  ];

  return (
    <ScenarioLayout
      intro="This stress test checks whether the residential return survives more realistic downside assumptions."
      cards={
        <>
          <ScenarioCard
            title="Base case"
            value={formatCurrency(baseCashFlow)}
            helper="Estimated monthly cash flow from the submitted assumptions."
            tone={getCashFlowTone(baseCashFlow)}
          />

          <ScenarioCard
            title="Downside case"
            value={formatCurrency(downsideCashFlow)}
            helper="Rent 5% lower, known costs 10% higher, and one month annual void allowance."
            tone={getCashFlowTone(downsideCashFlow)}
          />

          <ScenarioCard
            title="Stress case"
            value={formatCurrency(stressCashFlow)}
            helper="Rent 10% lower, known costs 20% higher, and two months annual void allowance."
            tone={getCashFlowTone(stressCashFlow)}
          />
        </>
      }
      questions={questions}
    />
  );
}

function CommercialScenarios({ submission }: { submission: Submission }) {
  const result = submission.result as CommercialResult;
  const input = submission.input;

  const averageSpend = getNumber(input, 'averageSpendPerCustomer');
  const openingDays = getNumber(input, 'openingDaysPerMonth');

  const baseRevenue = result.estimatedMonthlyRevenue;
  const baseCosts = result.estimatedMonthlyCostBase;
  const baseMargin =
    typeof baseRevenue === 'number' && typeof baseCosts === 'number'
      ? baseRevenue - baseCosts
      : undefined;

  const stressedCosts =
    typeof baseCosts === 'number' ? baseCosts * 1.15 : undefined;

  const stressedBreakEvenCustomers =
    typeof stressedCosts === 'number' &&
    typeof averageSpend === 'number' &&
    typeof openingDays === 'number' &&
    averageSpend > 0 &&
    openingDays > 0
      ? stressedCosts / averageSpend / openingDays
      : undefined;

  const survivalIntro = result.survivesSixBadMonths
    ? 'This site passes the six-month survival test on the current downside assumptions, but the inputs still need evidence before any lease commitment.'
    : 'This site does not pass the six-month survival test on the current downside assumptions. The upfront cash requirement, downside burn, or rent terms need careful review.';

  const questions = [
    'What evidence supports the expected customers per day?',
    'What happens if average spend is lower than expected?',
    'Can the business fund fit-out, deposit, fees, opening stock, and still keep enough cash buffer?',
    'How would the site cope with six weak trading months after opening?',
    'Are staff costs, business rates, utilities, insurance, and service charge fully included?',
    'What lease terms, break clauses, rent reviews, repairing obligations, and permitted use restrictions apply?',
  ];

  return (
    <ScenarioLayout
      intro={survivalIntro}
      cards={
        <>
          <ScenarioCard
            title="Base margin"
            value={formatCurrency(baseMargin)}
            helper="Estimated monthly revenue minus rent and known monthly costs."
            tone={getMarginTone(baseMargin)}
          />

          <ScenarioCard
            title="Downside burn"
            value={formatCurrency(result.monthlyBurnInDownside)}
            helper={`${formatPercent(result.downsideRevenuePercentage)} revenue case minus known monthly cost base.`}
            tone={result.monthlyBurnInDownside && result.monthlyBurnInDownside > 0 ? 'danger' : 'positive'}
          />

          <ScenarioCard
            title="Survival runway"
            value={formatMonths(result.survivalMonths)}
            helper="Cash left after opening divided by downside monthly burn."
            tone={result.survivesSixBadMonths ? 'positive' : 'danger'}
          />

          <ScenarioCard
            title="Cash after opening"
            value={formatCurrency(result.availableCashAfterOpening)}
            helper="Starting cash minus fit-out, deposit, fees, opening stock, and setup costs."
            tone={
              result.availableCashAfterOpening !== undefined && result.availableCashAfterOpening >= 0
                ? 'positive'
                : 'danger'
            }
          />

          <ScenarioCard
            title="Upfront cash needed"
            value={formatCurrency(result.upfrontCashNeeded)}
            helper="Estimated cash needed before opening."
            tone="neutral"
          />

          <ScenarioCard
            title="Stressed break-even/day"
            value={formatNumber(stressedBreakEvenCustomers)}
            helper="Known monthly costs increased by 15%, divided by spend and opening days."
            tone={
              stressedBreakEvenCustomers !== undefined &&
              result.expectedCustomersPerDay !== undefined &&
              stressedBreakEvenCustomers <= result.expectedCustomersPerDay
                ? 'positive'
                : 'danger'
            }
          />
        </>
      }
      questions={questions}
    />
  );
}


function ScenarioLayout({
  intro,
  cards,
  questions,
}: {
  intro: string;
  cards: React.ReactNode;
  questions: string[];
}) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-2">
          Scenario pressure test
        </p>

        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Does the deal still work if assumptions get worse?
        </h2>

        <p className="text-sm text-stone-600 leading-6">
          {intro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {cards}
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
        <p className="font-semibold text-stone-900 mb-3">
          Questions to verify before committing
        </p>

        <ol className="space-y-2 text-sm text-stone-700 list-decimal list-inside">
          {questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function ScenarioPanel({ submission }: { submission: Submission }) {
  if (submission.mode === 'residential') {
    return <ResidentialScenarios submission={submission} />;
  }

  return <CommercialScenarios submission={submission} />;
}
