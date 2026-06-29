import Link from 'next/link';

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--yieldlens-caution)] mb-2">
        {eyebrow}
      </p>
      <h2 className="text-lg font-bold text-stone-900">{title}</h2>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-2">
        Terms and disclaimer
      </p>

      <h1 className="text-3xl font-bold text-stone-900 mb-4">
        Terms and Disclaimer
      </h1>

      <p className="text-sm text-stone-500 mb-8">
        Last updated: 8 June 2026
      </p>

      <div className="bg-white border border-[var(--yieldlens-border)] rounded-2xl p-6 shadow-sm space-y-8 text-sm text-stone-700 leading-7">
        <section>
          <SectionTitle eyebrow="1. What YieldLens UK provides" title="The product in plain English" />
          <p className="mt-3">
            YieldLens UK provides indicative property return checks and
            decision-support analysis for residential and commercial property.
            The tool uses user-provided inputs and simple assumptions to estimate
            yield, cash flow, break-even figures, risk flags, and an indicative
            verdict.
          </p>
          <p className="mt-3">
            The free commercial check shows the headline pressure points. The
            Standard commercial viability file is unlocked from a saved
            commercial result and can be opened, printed, or saved as PDF.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="2. Not a valuation or advice" title="What the tool is not" />
          <p className="mt-3">
            YieldLens UK is not a valuation, RICS valuation, financial advice,
            mortgage advice, tax advice, legal advice, investment recommendation,
            or substitute for professional due diligence.
          </p>
          <p className="mt-3">
            You should not rely on the tool as the only basis for buying,
            renting, investing in, lending against, or signing a lease for any
            property.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="3. User-provided information" title="Why the inputs matter" />
          <p className="mt-3">
            The output depends on the information you enter. If the purchase
            price, rent, costs, revenue assumptions, or other inputs are wrong,
            incomplete, or optimistic, the result may be misleading.
          </p>
          <p className="mt-3">
            The commercial file is tied to the saved result it was requested
            from. If your assumptions change, rerun the free check so the file
            reflects the latest numbers.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="4. Payment" title="What happens when you pay" />
          <p className="mt-3">
            Payment is handled through Stripe. After checkout completes, the
            Standard commercial viability file is unlocked for the saved result
            and the file can be opened from the success page.
          </p>
          <p className="mt-3">
            After payment, you can print the file or save it as PDF.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="5. Placeholder assumptions" title="Where live data is not available" />
          <p className="mt-3">
            Some MVP scores use placeholder assumptions where live data is not
            yet connected. These include local demand, transport, local
            competition, area suitability, and comparable market data.
          </p>
          <p className="mt-3">
            Any placeholder assumptions are shown in the results and report
            preview. They should be treated cautiously.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="6. No guarantee" title="No promise of outcome" />
          <p className="mt-3">
            YieldLens UK does not guarantee any rent, yield, sale price, profit,
            cash flow, business revenue, customer volume, or investment outcome.
            Property and business decisions carry risk.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="7. Professional checks still required" title="Use the results alongside proper due diligence" />
          <p className="mt-3">
            Before making a property or business decision, you should check
            comparable market evidence, lease terms, service charges, business
            rates, planning or licensing issues, mortgage terms, legal documents,
            tax position, and any other relevant due diligence.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="8. Availability" title="The product may change as it develops" />
          <p className="mt-3">
            YieldLens UK may change, pause, or remove features as the product
            develops. The current product may still contain assumptions and
            limitations, so users should review the output alongside normal due
            diligence.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="9. Contact" title="Questions and support" />
          <p className="mt-3">
            For questions, please contact us through the website. If something
            looks unclear, ask before paying or signing so the assumptions can be
            checked again.
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-[var(--yieldlens-caution)] font-medium hover:underline">
          Back to homepage →
        </Link>
      </div>
    </div>
  );
}
