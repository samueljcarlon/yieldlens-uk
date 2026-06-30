import Link from 'next/link';
const supportHref = '/contact';

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

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-[var(--yieldlens-caution)] font-medium mb-2">
        Privacy notice
      </p>

      <h1 className="text-3xl font-bold text-stone-900 mb-4">
        Privacy Notice
      </h1>

      <p className="text-sm text-stone-500 mb-8">
        Last updated: 8 June 2026
      </p>

      <div className="bg-white border border-[var(--yieldlens-border)] rounded-2xl p-6 shadow-sm space-y-8 text-sm text-stone-700 leading-7">
        <section>
          <SectionTitle eyebrow="1. Who we are" title="YieldLens UK" />
          <p className="mt-3">
            YieldLens UK is an independent UK property decision-support tool. It
            provides indicative property pressure-tests for residential and
            commercial property.
          </p>
          <p className="mt-3">
            If you need help with privacy, support, or the payment flow, use
            the contact page or email yieldlensuk@gmail.com.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="2. What information we collect" title="The information you enter" />
          <p className="mt-3">
            When you use the check or request the Standard commercial viability
            file, we may collect the information you enter into the form or
            payment handoff, including:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>email address</li>
            <li>property address or postcode</li>
            <li>listing URL, if provided</li>
            <li>residential or commercial assumptions</li>
            <li>purchase price, rent, revenue, costs, and break-even inputs</li>
            <li>the calculated score, verdict, risk flags, and report output</li>
          </ul>
          <p className="mt-3">
            We also use browser storage to show your latest check and report
            preview on your own device.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="3. Why we use it" title="How the information is used" />
          <p className="mt-3">
            We use the information to calculate the check, save your result,
            display the report preview, return the Standard file to the saved
            commercial result, and improve the product.
          </p>
          <p className="mt-3">
            We do not sell your personal information.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="4. Payment" title="Stripe handles payment processing" />
          <p className="mt-3">
            Payments are handled through Stripe. When you complete checkout, we
            use the payment status to unlock the Standard file tied to the saved
            commercial result.
          </p>
          <p className="mt-3">
            After payment, you can open the file, print it, or save it as PDF.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="5. Who we share information with" title="Service providers" />
          <p className="mt-3">
            We use service providers to run the product, including hosting and
            database infrastructure. This currently includes Vercel for hosting,
            Supabase for database storage, and Stripe for payment processing.
          </p>
          <p className="mt-3">
            We may also disclose information if required by law, regulation, or
            to protect the security of the service.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="6. How long we keep it" title="Retention" />
          <p className="mt-3">
            During MVP testing, we expect to keep submitted checks for up to 12
            months unless deletion is requested earlier. This period may change
            as the product develops.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="7. Analytics and browser storage" title="Usage data" />
          <p className="mt-3">
            YieldLens UK uses Vercel Web Analytics to understand basic website
            usage, such as page views, referrers, devices, browsers, and general
            location information. Vercel Web Analytics is designed to work
            without third-party cookies and uses anonymised data.
          </p>
          <p className="mt-3">
            The app also uses browser storage to remember your latest check and
            show your results, report preview, and local admin data on your own
            device.
          </p>
          <p className="mt-3">
            YieldLens UK does not currently use advertising cookies.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="8. Your rights" title="Access, correction, and deletion" />
          <p className="mt-3">
            You may ask to access, correct, delete, or restrict use of your
            personal information. Please use the contact page if you need to
            make a request.
          </p>
          <p className="mt-3">
            You can also raise concerns with the UK Information Commissioner’s
            Office if you are unhappy with how your information is handled.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow="9. Changes" title="Updates to this notice" />
          <p className="mt-3">
            We may update this Privacy Notice as YieldLens UK develops. The date
            above shows when this version was last updated.
          </p>
        </section>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link href={supportHref} className="text-[var(--yieldlens-caution)] hover:underline">
            Contact
          </Link>
          <Link href="/" className="text-[var(--yieldlens-caution)] hover:underline">
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
