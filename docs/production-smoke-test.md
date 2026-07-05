# Production Smoke Test

This is a lightweight route check for YieldLens UK v1. It exists so deployment verification is repeatable and does not depend on a manual browser pass every time.

## What the script checks

The smoke test requests a fixed list of public routes and reports whether each one returns a healthy status code.

- `200` is a pass
- `3xx` is a warning unless a route is intentionally redirected
- `4xx` or `5xx` is a fail

The current route list covers:

- core public pages
- the commercial check and compare pages
- the sample file and paid-file explanation pages
- the restaurant, salon, cafe, shop, takeaway, and barber shop pages
- the commercial lease checklist and supporting before-signing pages
- trust pages such as About, Contact, Terms, Privacy, and How it works
- `sitemap.xml` and `robots.txt`

The script does not include:

- `/admin`
- API routes
- checkout URLs
- Stripe session URLs
- tokenised paid-file URLs
- dynamic customer access routes

## How to run it

```bash
npm run smoke:routes
```

## How to run it against another base URL

```bash
BASE_URL=https://yieldlens.co.uk npm run smoke:routes
```

```bash
BASE_URL=http://localhost:3000 npm run smoke:routes
```

The script defaults to:

```bash
BASE_URL=https://yieldlens.co.uk
```

## When to run it

- after deployment
- after a production or preview release
- after any change that could affect routing, redirects, or page availability
- before checking search or funnel metrics, so route failures do not pollute the signal

## What failures mean

- `4xx` usually means the route is missing or misconfigured
- `5xx` usually means a server or build problem
- `3xx` is usually only acceptable when the route is intentionally redirecting
- a network failure means the host, base URL, or local environment needs checking

If a required public route fails, treat that as a release issue before looking at conversion or SEO data.

## What not to include

Do not add:

- admin routes
- API routes
- Stripe or checkout URLs
- tokenised access URLs
- private or customer-specific paths
- internal debug endpoints

Keep the list focused on public routes that should be available to search, users, and monitoring tools.

## Safety

YieldLens provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, a RICS valuation, building survey, planning advice, licensing advice, employment advice, food safety advice, or a substitute for professional due diligence.
