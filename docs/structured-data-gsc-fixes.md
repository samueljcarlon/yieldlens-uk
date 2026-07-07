# Structured Data GSC Fixes

## What GSC reported

Google Search Console flagged the following structured data issues:

- Product snippets
  - Missing field `aggregateRating`
  - Missing field `review`
- Merchant listings
  - Missing field `image`
  - Missing field `hasMerchantReturnPolicy` in `offers`
  - Missing field `shippingDetails` in `offers`

## What was found

The only public page using Product structured data was:

- `/viability-file`

That page was acting like a digital decision-support page, not a physical product listing.

## What was changed

Product structured data was removed from `/viability-file`.

It was replaced with conservative schema that matches the page truthfully:

- `WebPage`
- `SoftwareApplication`

The page still shows the £49 price in visible copy, but the structured data no longer advertises it as a Product or Merchant listing.

## Why reviews and ratings were not added

No fake reviews, fake ratings, fake testimonials, or fake case studies were added.

The site does not have visible user review content on these pages, so adding `aggregateRating`, `review`, `ratingValue`, or similar fields would be misleading.

## How image, shipping, and return policy warnings were handled

- No fake `image` field was added
- No `shippingDetails` were added
- No `hasMerchantReturnPolicy` was added

Those fields are not appropriate for a digital decision-support file unless the page genuinely behaves like a shippable retail product with a visible returns policy. YieldLens does not.

## Current schema types in use

Relevant public schema types now include:

- `WebSite`
- `Organization`
- `SoftwareApplication`
- `WebPage`
- `FAQPage`
- `BreadcrumbList`
- `ItemList`

## What to validate

Check the following in Google Rich Results Test and Search Console:

- `/viability-file` no longer appears as a Product or Merchant listing page
- no `aggregateRating` or `review` warnings remain for public pages
- no image, shipping, or return policy warnings are attached to the digital file page
- the homepage still uses conservative site-level schema
- the sample file page remains informational, not a Product listing

## Safety

YieldLens provides indicative decision-support only. It is not financial advice, legal advice, tax advice, mortgage advice, a valuation, a RICS valuation, building survey, planning advice, licensing advice, employment advice, food safety advice, or a substitute for professional due diligence.

