# Carlon Analytics bridge V0

## Purpose

This build adds a high-intent bridge from YieldLens into a deeper Carlon Analytics commercial underwriting request without turning the free YieldLens screen into a full P&L model.

## What changed

- Visual header lockup: **YieldLens** / **Carlon Investment Group**.
- New noindex intake route: `/carlon-analytics/commercial-underwriting`.
- Latest commercial YieldLens check prefills overlapping assumptions in-browser; the user is told those values remain unverified assumptions.
- Intake captures the deeper fields needed for full underwriting: gross margin, lease terms, service charge, operating costs, startup capital, funding, evidence readiness, and concerns.
- New API inserts `requested_report_type = carlon_analytics_underwriting` into the existing `report_requests` CRM infrastructure.
- Bespoke requests use `payment_status = not_required`; the existing £49 Stripe checkout remains limited to Standard file request types.
- Admin report detail shows the Carlon Analytics intake separately.
- Carlon Analytics CTA added only to high-intent locations: commercial results, sample Standard file, and paid Standard file.
- Privacy/terms copy updated operationally to describe the new intake. This is product copy, not a substitute for professional legal review before material scale.
- V0 does **not** upload lease documents. It records which evidence exists so documents can be requested through a secure process later.
- Legacy private-site identifiers were removed from mock/sample repository content in this delivery.

## Deployment notes

1. Do not replace the live repository blindly. Review this as a branch/build against the current production repo.
2. Run `npm install` or `npm ci` in a normal networked development environment.
3. Run `npm run lint` and `npm run build`.
4. Run `node scripts/verify-carlon-analytics-bridge.mjs`.
5. Test a real commercial result -> Carlon Analytics intake prefill -> submit -> admin report request.
6. Verify the analytics request cannot create a £49 Stripe checkout.
7. Test direct intake with no local YieldLens result.
8. Keep the route noindex during pilot use; decide on public indexing only after offer/pricing/legal presentation is settled.

## Database

No schema migration is required by this V0. The deeper intake is stored under `input_json.carlonAnalyticsIntake` on the existing `report_requests` row.

## Known next steps

- Secure document upload/evidence storage.
- Final pricing/quote workflow.
- Client-facing sample underwriting page or redacted PDF download.
- Email acknowledgement/notification workflow.
- More granular admin filtering for Carlon Analytics leads.
