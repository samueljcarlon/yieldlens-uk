This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment

The app expects these environment variables for the commercial funnel and admin tools:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PIN`
- `NEXT_PUBLIC_SITE_URL`

Stripe test-mode checkout also needs:

- `STRIPE_SECRET_KEY`

Stripe webhooks are not implemented yet. When that sprint lands, add:

- `STRIPE_WEBHOOK_SECRET`

Stripe should remain in test mode at this stage. Payment status is recorded when the checkout session is created, and paid status is confirmed by the webhook.

Stripe webhook handling uses:

- `STRIPE_WEBHOOK_SECRET`
- webhook endpoint: `/api/stripe/webhook`

## Google Ads conversions

Google Ads tracking is optional. If these env vars are missing, nothing breaks:

- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_CHECK_STARTED_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_CHECK_SUBMITTED_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_SAMPLE_CLICK_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_CHECKOUT_STARTED_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_PAYMENT_COMPLETED_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_PAID_FILE_OPENED_LABEL`

Mapped events:

- `commercial_check_started`
- `commercial_check_submitted`
- `results_viability_file_requested_clicked`
- `checkout_started`
- `payment_completed`
- `paid_file_opened`

After setting the env vars, test:

- Run the free commercial check and confirm the start and submit conversions still fire.
- Open the sample file CTA and confirm the sample click conversion fires if configured.
- Start checkout and confirm the checkout conversion fires once.
- Complete payment and confirm the payment conversion fires once with GBP 49 when available.
- Open the paid file and confirm the open conversion fires if configured.

For local testing, point Stripe CLI at the local webhook route:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
