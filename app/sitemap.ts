import type { MetadataRoute } from 'next';

const baseUrl = 'https://yieldlens.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/check',
    '/contact',
    '/privacy',
    '/terms',
    '/commercial-lease-checklist-before-signing',
    '/commercial-lease-costs-before-signing',
    '/commercial-rent-free-period-before-signing',
    '/commercial-lease-deposit-before-signing',
    '/commercial-service-charge-before-signing',
    '/restaurant-lease-viability-check',
    '/salon-lease-viability-check',
    '/commercial-lease-viability-check',
    '/commercial-rent-affordability-calculator',
    '/commercial-rent-burden-calculator',
    '/break-even-customers-calculator',
    '/commercial-lease-survival-calculator',
    '/how-much-rent-can-a-cafe-afford',
    '/rental-valuation-vs-rent-affordability',
    '/sample-commercial-viability-file',
    '/how-it-works',
    '/buy-to-let-yield-calculator',
    '/property-cash-flow-calculator',
    '/rent-affordability-check',
    '/viability-file',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/check' ? 0.8 : 0.7,
  }));
}
