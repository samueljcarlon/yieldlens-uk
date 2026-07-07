# Funnel Integrity QA

YieldLens UK v1 is now in observe, bug-fix, and signal-tuning mode. This note maps the funnel, the current event sources, the safe metadata fields, and the manual checks to run when monitoring conversion health.

## V1 funnel map

Homepage or SEO page
-> free commercial check started
-> commercial check submitted
-> results page viewed
-> sample file viewed or paid-file CTA clicked
-> checkout started
-> payment completed
-> paid file opened

Compare path

Compare page viewed
-> compare page interaction recorded through page view tracking
-> user compares Site A and Site B
-> optional print comparison snapshot
-> user is directed back to check one selected site
-> paid file remains one selected site only

## Event source audit

### Core event coverage

| Event name | Where it fires | Trigger | Safe properties | Admin use | Notes |
| --- | --- | --- | --- | --- | --- |
| `commercial_check_started` | `app/check/CheckPageClient.tsx` | Fires once when the commercial form mode becomes active | `page_path`, `page_type`, `funnel_area`, `mode`, `source_page` | Funnel stage 1 and top-of-funnel counts | Triggered from user engagement, not render-only logic. |
| `commercial_check_submitted` | `app/results/page.tsx` | Fires once after a commercial submission is loaded and not yet tracked | `page_path`, `page_type`, `funnel_area`, `mode`, `source_page`, `postcode`, `has_address`, `business_type` | Funnel stage 2 and submission counts | Guarded by local tracking state and submission ID tracking to reduce duplicate fires. |
| `results_viability_file_requested_clicked` | `components/ReportInterestButton.tsx` and results CTA surfaces | Fires on paid-file CTA click | `source_path`, `page_path`, `cta_label`, `cta_location`, `destination`, `destination_path`, `funnel_area`, `mode`, `source_page`, `postcode`, `has_address`, `business_type` | Funnel stage for sample or paid-file intent | This is the paid-file request signal. It fires before the request is sent so click intent is captured even if the request fails. |
| `results_report_preview_clicked` | `components/ResultsConversionPanel.tsx` and `app/results/page.tsx` | Fires on sample file link clicks and paid-file preview CTAs | `source_path`, `page_path`, `cta_label`, `cta_location`, `destination`, `destination_path`, `funnel_area`, `page_type` | Raw event view, CTA analysis | This single event name currently covers both the sample file and the paid-file preview CTA. Use `cta_label` to separate them. |
| `commercial_viability_page_cta_clicked` | `TrackedCtaLink` instances on compare, sample, and bridge surfaces | Fires on bridge CTAs such as `Check one site instead` and business-page sample file clicks | `source_path`, `page_path`, `cta_label`, `cta_location`, `destination`, `destination_path`, `funnel_area`, `page_type`, `business_type`, `product_area` | Source page and bridge CTA analysis | Useful for understanding whether users exit compare or SEO pages back into the main check. Business pages use `business_page_free_check_cta`, `business_page_sample_file_cta`, and `business_page_compare_cta` labels. |
| `checkout_started` | `app/api/report-payment/create-checkout-session/route.ts` | Fires when Stripe checkout is actually created | `page_path`, `page_type`, `funnel_area`, `mode`, `source_page`, `current_page_path`, `current_page_type`, `current_mode`, `business_type`, `postcode`, `has_address`, attribution fields | Funnel stage 4 and checkout starts | Server-side event. Also mirrored into Google Ads conversion tracking from the thank-you page. |
| `payment_completed` | `app/api/stripe/webhook/route.ts` | Fires when Stripe confirms payment completion | `page_path`, `page_type`, `funnel_area`, `mode`, `source_page`, `current_page_path`, `current_page_type`, `current_mode`, `report_request_stage`, `business_type`, `postcode`, `has_address` | Funnel stage 5 and payment counts | Server-side webhook event. This is the source of truth for paid conversions. |
| `paid_file_opened` | `app/commercial-viability-file/[id]/page.tsx` | Fires when paid file access is confirmed and the memo opens | `page_path`, `page_type`, `funnel_area`, `mode`, `business_type`, `postcode`, `has_address` | Funnel stage 6 and paid-file opens | Server-side safe metadata plus client-side Google Ads conversion dedupe. |
| `inbound_page_view` | `FunnelEventTracker` on commercial pages and compare page | Fires once per page view for tracked funnel pages | `page_path`, `page_type`, `funnel_area`, `mode`, `source_page`, attribution fields | Top-of-funnel page view analysis | Useful for page-level entry analysis, not a conversion stage by itself. |

### Events that are not currently dedicated funnel events

- `compare_started`
- `compare_submitted`
- `compare_print_clicked`
- `free_snapshot_print_clicked`
- `sample_file_clicked`
- `viability_file_page_viewed`
- `paid_file_access_failed`

Compare pages and print buttons are currently observable through page view tracking, CTA clicks, and browser print actions, but they do not emit dedicated compare events yet. Sample file clicks are currently captured through `results_report_preview_clicked` with `cta_label` set to `View sample viability file`.

## Funnel integrity findings

- `commercial_check_started` is fired from the commercial form engagement path, not on render.
- `commercial_check_submitted` is fired after a valid commercial submission is available and is guarded against duplicate logging.
- `results_viability_file_requested_clicked` is fired on the paid-file CTA click, which is the right user action for conversion intent.
- `checkout_started` is created server-side when checkout is actually initialised. The thank-you page only mirrors the Google Ads conversion label.
- `payment_completed` is recorded in the Stripe webhook, which is the correct source of truth.
- `paid_file_opened` is recorded when the paid file is actually opened after access is confirmed.
- Safe metadata is already centralised in `lib/safeToolEventMetadata.ts` and strips anything outside the allowed key set.
- Compare currently has page-view and CTA tracking, but no dedicated compare start or submission events.
- Sample file clicks are visible, but they share an event name with the paid-file preview CTA and must be split by `cta_label` if analysed.
- The ranking business-type pages are also conversion source pages. Use `source_path`, `page_path`, `cta_label`, and `business_type` to connect search entry pages to the free check, sample file, compare, checkout, and paid-file steps.
- On the results page, `business_type` context should shape the memo-style bridge and paid-file interpretation. `source_path` and `landing_page` stay for attribution only and should not be shown publicly.
- The paid-file bridge stays for one selected site only, and the sample file is the proof asset before payment.
- Checkout metadata should stay safe and narrow. Keep `business_type`, `source_path`, `landing_page`, `page_path`, `cta_label`, `product_area`, and related safe attribution only.
- The paid-file CTA remains for one selected site only. Compare remains a screening tool, not a two-site paid file.

## Safe metadata rules

Allowed fields in the funnel are intentionally narrow:

- `source_path`
- `landing_page`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `business_type`
- `postcode`
- `has_address`
- `cta_label`
- `cta_location`
- `page_path`
- `page_type`
- `destination`
- `destination_path`
- `mode`
- `funnel_area`
- `product_area`

Do not add:

- full address to analytics payloads
- customer access tokens
- request IDs
- Stripe IDs
- raw metadata JSON
- internal debug fields

## Admin surfaces to use

- `app/admin/funnel/page.tsx` for stage counts and windowed funnel movement.
- `app/admin/page.tsx` for summary counts by event, business type, postcode, and source path.
- `app/admin/events/page.tsx` for raw safe events and CTA analysis.
- `app/admin/reports/page.tsx` for request details. Full address remains in the detail view only, not the broad list.

## Manual test script

| Test | Action | Expected event | Expected admin visibility | Sensitive-data check |
| --- | --- | --- | --- | --- |
| 1 | Open the homepage and click `Run a free commercial check`. | `commercial_check_started` from the commercial form path. | Visible in the funnel page and raw events page. | No tokens, request IDs, or Stripe IDs. |
| 2 | Open a relevant SEO page and follow the commercial check journey. | `commercial_check_started` plus normal attribution fields. | Source path and landing page should help attribute the entry point. | No full address in analytics. |
| 3 | Submit the commercial form. | `commercial_check_submitted` once. | Visible as a stage 2 submission in the funnel page and recent events. | Safe metadata only. |
| 4 | View results and click the sample file or paid-file CTA. | `results_report_preview_clicked` for sample or preview, `results_viability_file_requested_clicked` for the paid-file intent. | Raw events page should show the CTA label and destination. | No raw metadata or customer data. |
| 5 | Start checkout from the thank-you path. | `checkout_started` once checkout is created. | Funnel stage 4 and Stripe-linked summaries should increase. | No Stripe session IDs in public UI. |
| 6 | Open the paid file after payment. | `paid_file_opened` once the memo opens. | Funnel stage 6 and paid-file open counts should increase. | No customer access token exposed publicly. |
| 7 | Use the compare page and submit two valid sites. | No dedicated compare submission event is currently emitted. Track as page view and CTA activity. | Compare usage is visible only through page views and bridge clicks unless compare events are added later. | No full address in analytics payloads. |
| 8 | Print the free snapshot or comparison snapshot if available. | `free_snapshot_print_clicked` and `compare_print_clicked` are not currently dedicated events. | Monitor through page usage and browser behaviour if present. | Print output must not include tokens, request IDs, or Stripe IDs. |

## Monitoring notes

- Check the funnel page and raw events page daily while the product is in observe mode.
- Use the report detail view only when a specific saved result needs address or postcode review.
- Treat compare and sample-file usage as supporting signals, not as the primary paid funnel.
- For the business-type pages, read the chain as: impression -> click -> free check start -> free check submission -> sample or paid CTA -> checkout -> payment.
- Keep title, description, CTA, and event names stable unless there is a clear bug.

## Safety reminder

YieldLens UK provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, a RICS valuation, building survey, planning advice, licensing advice, employment advice, food safety advice, or a substitute for professional due diligence.
