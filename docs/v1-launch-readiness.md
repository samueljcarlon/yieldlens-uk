# V1 Launch Readiness Snapshot

This note is for internal use. It captures the current public product state, what is live, what is deferred, and what to watch over the next 3, 7, and 14 days.

## 1. V1 executive status

V1 is now a functioning paid screening product.

The product is credible enough to observe real user behaviour.

The next goal is not more features. It is proving whether strangers will complete the free check and whether at least one unaffiliated user will pay £49.

New features should be paused unless they directly fix conversion, trust, or broken UX.

## 2. What is live

### Core
- Homepage
- Free commercial check
- Results page
- Free printable viability snapshot
- Compare two sites
- Sample commercial viability file
- £49 Standard Commercial Viability File
- Stripe checkout
- Payment success and paid file access
- Contact, about, terms, privacy, and how it works

### Commercial SEO and product pages
- Commercial lease viability check
- Commercial rent affordability calculator
- Commercial lease checklist before signing
- Commercial before-signing cluster
- Business-type pages for cafe, coffee shop, shop, takeaway, barber shop, restaurant, salon, nail salon, and gym

### Tracking and admin
- Organic funnel tracking
- CTA and source attribution where present
- Admin analytics
- Google Ads conversion hooks prepared, but not actively used

### Docs and monitoring
- GSC monitoring
- AI Overview monitoring
- Address intelligence future notes

## 3. Current V1 strengths

- Clear core user problem
- Honest safety framing
- Real sample file
- Free check before payment
- £49 paid file has enough detail to justify testing demand
- Business-type tailoring
- Address and postcode prompts
- Evidence gaps and lease questions
- Compare feature gives a useful first-pass screen
- SEO has early commercial and niche signals
- AI Overview and source-panel signal has appeared for restaurant lease viability
- Controlled next-step business-type tests now include coffee shop, nail salon, and gym pages after early signal from cafe, restaurant, salon, and barber pages

## 4. Known rough edges to watch

- No custom domain email yet, intentionally deferred until customer proof
- No live data verification yet
- Address and postcode context organise prompts only, they do not verify local facts
- Paid file still needs real customer feedback
- Compare is V1 and should not become a workspace until usage is proven
- No paid ads for now because budget is tight
- No manual outreach or Reddit strategy
- Residential and rental valuation traffic is noisy and not core product intent
- New controlled business-type SEO tests should stay narrow until GSC and funnel data show which pages deserve more attention

## 5. Intentional deferrals

| Item | Why deferred | Trigger to revisit |
| --- | --- | --- |
| Domain-matched email | No customer proof yet | First unaffiliated paying customer |
| Paid ads | Budget is tight | First unaffiliated paying customer or clear CAC signal |
| Live business rates lookup | Not needed for V1 prompting | Repeated user complaint or repeated request |
| Commercial rent comparable data | No verified data layer yet | GSC demand, repeated user request, or data partner option |
| EPC or building data integration | Future location intelligence only | Repeated user request or clear conversion benefit |
| Accounts or saved dashboards | V1 does not need a workspace | Compare usage proves repeat behaviour |
| Multi-site workspace | Compare is only a first-pass screen | Compare usage becomes meaningful |
| More SEO pages | Current clusters still need proof | Current clusters are indexed and showing signal |
| Controlled next-step business-type pages | Early signal exists but traffic is still tiny | New pages show impressions, position, and check-start signal |
| B2B or API product | Not proven yet | First unaffiliated paying customer or repeat demand |
| Custom PDF generation | Current print flow is enough | Print flow no longer meets customer needs |

## 6. 3-day monitoring plan

Check daily:
- Site loads
- Homepage CTAs work
- `/check?mode=commercial` works
- Results page works
- Compare page works
- Sample file loads
- Stripe checkout starts
- Payment success path still works in test mode or with a known safe process
- Paid file access still works
- Admin analytics loads
- No obvious public wording leaks
- No broken low-contrast buttons

Admin metrics to check:
- `commercial_check_started`
- `commercial_check_submitted`
- `results_viability_file_requested_clicked`
- `checkout_started`
- `payment_completed`
- `paid_file_opened`
- `compare_started` if present
- `compare_submitted` if present
- `free_snapshot_print_clicked` if present
- `compare_print_clicked` if present

## 7. 7-day monitoring plan

Check weekly:
- GSC page indexing
- Impressions by page
- Queries by page
- Pages appearing for wrong intent
- Business-type pages starting to move
- AI Overview checks for likely queries
- Compare page usage if analytics exists
- Free check drop-off
- Sample file clicks
- Checkout starts
- Payment completions
- Coffee shop, nail salon, and gym page impressions and check starts

Pages and queries to watch:
- restaurant lease viability check
- salon lease viability check
- how much rent can a cafe afford
- how much rent can a shop afford
- how much rent can a takeaway afford
- how much rent can a barber shop afford
- commercial lease checklist before signing
- commercial rent affordability calculator
- commercial lease viability check
- sample commercial viability file
- compare two commercial sites

## 8. 14-day decision rules

If relevant impressions rise but clicks stay zero:
- Improve titles, metadata, and first-screen clarity on pages already getting impressions.

If clicks happen but no check starts:
- Improve CTA placement and landing-page journey.

If checks start but few submissions:
- Reduce form friction and improve helper text.

If results are viewed but no sample or paid CTA clicks:
- Improve the paid-file bridge and sample-file proof.

If checkout starts but no payments:
- Review price trust, sample clarity, refund and access concerns, and payment page copy.

If one unaffiliated user pays:
- Do not immediately build features.
- Interview or survey the user if possible.
- Inspect what page, query, and path led them there.
- Improve the same funnel before expanding.

If wrong-intent rental valuation impressions dominate:
- Do not chase those queries.
- Keep `/rent-affordability-check` as a bridge.
- Focus on commercial-intent pages that show rankings.

## 9. GSC and SEO actions

- Do not build more pages until current clusters are indexed and showing signal.
- Tune pages already ranking before expanding.
- Prioritise restaurant, salon, cafe, shop, takeaway, barber, checklist, and commercial calculator pages.
- Keep answer blocks concise.
- Keep FAQs useful rather than padded.
- Add internal links only where useful.
- Avoid generic blog content.

## 10. AI Overview and source-panel actions

Check weekly:
- Restaurant lease viability check
- How much rent can a cafe afford
- Commercial lease checklist before signing
- Commercial rent affordability calculator
- Business type queries

For each check record:
- Query
- Whether YieldLens appears
- Page cited
- Wording Google pulled
- Competitor or source shown
- Action needed

## 11. Product roadmap guardrails

V1:
- Paid screening product

V2:
- Evidence-aware local viability product, only after customer proof or repeated demand

V3:
- Multi-site decision workspace, only if compare usage is meaningful

V4:
- Benchmark and market intelligence layer, only if data quality can be trusted

V5:
- Transaction support platform, much later

V6:
- Embedded B2B or API product, only after proof of repeat demand

V7:
- Commercial property operating intelligence network, long-term vision only

Do not over-plan V4 to V7 until V1 proves demand.

## 12. Next actions this week

- Commit the current fixes if not already committed
- Run a live route smoke test
- Manually test the free check
- Manually test compare
- Manually test the sample file and paid-file path
- Request indexing for important pages if not already done
- Check GSC after a few days
- Check admin funnel events daily
- Note any user-facing bugs immediately

## 13. Stop-doing list

- Stop adding new SEO pages this week
- Stop adding new product features this week
- Stop rewriting copy that already works
- Stop worrying about noisy rental valuation impressions
- Stop spending money before proof of demand
- Stop trying to make the product look bigger than it is

## 14. Launch readiness checklist

### Technical
- Build passes
- Route smoke test passes
- Sitemap and robots reachable
- No public admin link
- Checkout starts
- Payment success path works
- Paid file opens
- Invalid paid-file access is safe
- Cancelled checkout is safe

### UX
- Homepage CTA clear
- Free check form usable
- Results readable
- Compare readable
- Sample file persuasive
- Paid file bridge clear
- Mobile acceptable
- Buttons readable

### Safety
- No unsafe claims
- No fake testimonials, reviews, or ratings
- No sensitive IDs
- Support email unchanged
- No em dash characters
- No personal Gmail except `yieldlensuk@gmail.com` where intentionally shown
- No 229 Kilburn or private examples

### Analytics
- Check started event
- Check submitted event
- Paid CTA clicked event
- Checkout started event
- Payment completed event
- Paid file opened event
- Compare events if present
- Print events if present

## 15. Monitoring plan summary

If V1 behaves well for 3 days, keep watching without adding features.

If the 7-day data shows intent but friction, fix the funnel before expanding the product.

If the 14-day data shows no intent or no payment, keep the product narrow and improve the strongest pages before building anything new.

YieldLens is currently a screening product. Treat it that way until the market proves otherwise.

## Safety

YieldLens provides indicative decision-support only.

It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, a RICS valuation, building survey, planning advice, licensing advice, tax advice, legal advice, employment advice, food safety advice, or a substitute for professional due diligence.
