# Pre-Release QA Checklist

## 1. Purpose

This checklist exists so every change is checked consistently before it is pushed or treated as live-ready.

## 2. Standard Command Sequence

Run these commands in order:

```bash
cd ~/Desktop/yieldlens-returns
git status --short
npm run build
npm run smoke:routes
git diff --check
git diff --stat
```

## 3. Core Route Checks

Use the production smoke test as the standard route check:

```bash
npm run smoke:routes
```

It checks:

- homepage
- free commercial check
- compare
- viability file
- sample file
- business-type pages
- before-signing guide pages
- trust/legal pages
- sitemap
- robots

The route list must not include:

- admin
- API routes
- checkout URLs
- Stripe session URLs
- tokenised paid file URLs
- dynamic customer access routes

## 4. Manual Product Journey Checks

### Homepage

- Hero loads
- Primary CTA goes to free commercial check
- Sample file link works
- Compare link works
- No internal wording

### Free Check

- Form loads
- Business type dropdown works
- Address/postcode field works
- Break clause label is clear
- Submit works

### Results

- Verdict appears
- Metrics appear
- Evidence gaps appear
- Questions appear
- Free snapshot print works if present
- Paid-file CTA works
- No undefined, null, or NaN

### Compare

- Site A and Site B are clear
- Illustrative example is clearly fictional
- Form submits
- Comparison output is not contradictory
- Address/postcode display works
- Paid-file bridge says one selected site

### Sample File

- Sample loads
- Sample is clearly illustrative
- CTA to run free check works
- Value comparison is safe

### Paid Flow

- Checkout starts
- Payment success route is safe
- Paid file opens only with valid access
- Invalid access is safe
- No tokens or Stripe IDs rendered

### Admin

- Admin protection still works
- Event counts look sane
- No sensitive IDs or raw metadata in broad tables

## 5. Safety Scan Commands

Run these exact commands:

```bash
rg -n "guaranteed saving|save £2,500|avoid solicitor|skip due diligence|replace professionals|formal valuation|investment advice|safe investment|recommended investment|approved|fake testimonial|fake review|fake rating|aggregateRating|ratingValue|samueljcarlon@gmail.com|229 Kilburn|\\x{2014}|\\x{2013}" app components lib docs scripts
```

```bash
rg -n "customer_access_token|stripe_payment_intent|stripe_checkout_session|request_id|raw metadata|metadata JSON" app components lib docs scripts
```

Notes:

- Matches in server-only implementation files may be legitimate
- Sensitive IDs must not be rendered in public UI, admin broad tables, sitemap, schema, or docs
- Support email should remain `yieldlensuk@gmail.com` for now

## 6. Copy and CTA Scan Commands

Run:

```bash
rg -n "paid report|full report|preview report|Run a single free commercial check|Explore commercial viability|wedge|MVP|beta|prototype|early access|coming soon|Roomier|YieldLens UK \\| YieldLens UK|undefined|null|NaN" app components lib docs
```

Approved wording:

- Run a free commercial check
- View sample viability file
- Compare two sites
- Check one site instead
- £49 Standard Commercial Viability File
- first-pass viability screen
- viability snapshot
- preliminary decision memo
- Spend £49 before you spend £2,500+

## 7. Analytics Event Checks

Verify these events in admin after relevant manual journeys:

### Core

- commercial_check_started
- commercial_check_submitted
- results_viability_file_requested_clicked
- checkout_started
- payment_completed
- paid_file_opened

### Optional if present

- free_snapshot_print_clicked
- compare_started
- compare_submitted
- compare_print_clicked
- sample_file_clicked

## 8. GSC and Indexing Checks

After SEO or content changes, check:

- sitemap reachable
- robots reachable
- priority pages indexable
- key pages requested in Search Console if needed
- do not judge ranking changes immediately

## 9. When to Stop

Stop building if:

- build passes
- route smoke test passes
- no public safety issues found
- manual core journey works
- no checkout or access bug exists

Only continue if:

- a route fails
- a payment or access path breaks
- admin shows missing or unsafe events
- public copy has an obvious trust issue
- GSC shows a page with real signal that needs tuning

## 10. Validation

Before editing:

```bash
cd ~/Desktop/yieldlens-returns
git status --short
```

After editing:

```bash
npm run build
npm run smoke:routes
git diff --check
git diff --stat
```

Run:

```bash
rg -n "pre-release|smoke:routes|npm run build|git diff --check|commercial_check_started|checkout_started|paid_file_opened|yieldlensuk@gmail.com|Run a free commercial check|Standard Commercial Viability File" docs
```

Safety scan:

```bash
rg -n "guaranteed saving|save £2,500|avoid solicitor|skip due diligence|replace professionals|formal valuation|investment advice|safe investment|recommended investment|approved|fake testimonial|fake review|fake rating|aggregateRating|ratingValue|samueljcarlon@gmail.com|229 Kilburn|\\x{2014}|\\x{2013}" docs scripts app components lib
```

