import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-teal-700 font-medium mb-2">
        Privacy notice
      </p>

      <h1 className="text-3xl font-bold text-stone-900 mb-4">
        Privacy Notice
      </h1>

      <p className="text-sm text-stone-500 mb-8">
        Last updated: 8 June 2026
      </p>

      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-8 text-sm text-stone-700 leading-7">
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            1. Who we are
          </h2>

          <p>
            YieldLens UK is an independent UK property analysis tool. It provides
            indicative property return checks and decision-support analysis for
            residential and commercial property.
          </p>

          <p className="mt-3">
            For privacy questions, contact: samueljcarlon@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            2. What information we collect
          </h2>

          <p>
            When you submit a property check, we may collect the information you
            enter into the form, including:
          </p>

          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>email address</li>
            <li>property address or postcode</li>
            <li>listing URL, if provided</li>
            <li>residential or commercial property assumptions</li>
            <li>purchase price, rent, cost, revenue, and break-even inputs</li>
            <li>the calculated score, verdict, risk flags, and report output</li>
          </ul>

          <p className="mt-3">
            We also use browser storage to show your latest check and report
            preview on your own device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            3. Why we use your information
          </h2>

          <p>
            We use the information to provide the property check, calculate your
            results, save your submission, display your report preview, improve
            the product, and follow up about the submitted check or future report
            access.
          </p>

          <p className="mt-3">
            We do not sell your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            4. Lawful basis
          </h2>

          <p>
            For MVP operation, we process your information because it is necessary
            to provide the check you request and to take steps linked to that
            request. Where we contact you about your submitted check or early
            report access, we rely on your request and the context in which you
            provided your email.
          </p>

          <p className="mt-3">
            If YieldLens UK later sends wider marketing emails, we will add a
            clearer opt-in or unsubscribe mechanism before doing so.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            5. Who we share information with
          </h2>

          <p>
            We use service providers to run the product, including hosting and
            database infrastructure. This currently includes Vercel for hosting
            and Supabase for database storage.
          </p>

          <p className="mt-3">
            We may also disclose information if required by law, regulation, or
            to protect the security of the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            6. How long we keep information
          </h2>

          <p>
            During MVP testing, we expect to keep submitted checks for up to 12
            months unless deletion is requested earlier. This period may change
            as the product develops.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            7. Analytics, cookies, and browser storage
          </h2>

          <p>
            YieldLens UK uses Vercel Web Analytics to understand basic website
            usage, such as page views, referrers, devices, browsers, and general
            location information. Vercel Web Analytics is designed to work without
            third-party cookies and uses anonymised data.
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
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            8. Your rights
          </h2>

          <p>
            You may ask to access, correct, delete, or restrict use of your
            personal information. You can contact us at samueljcarlon@gmail.com.
          </p>

          <p className="mt-3">
            You can also raise concerns with the UK Information Commissioner’s
            Office if you are unhappy with how your information is handled.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            9. Changes to this notice
          </h2>

          <p>
            We may update this Privacy Notice as YieldLens UK develops. The date
            above shows when this version was last updated.
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-teal-700 font-medium hover:underline">
          Back to homepage →
        </Link>
      </div>
    </div>
  );
}
