import type { MetadataRoute } from 'next';

const baseUrl = 'https://yieldlens.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/check',
    '/privacy',
    '/terms',
    '/commercial-lease-viability-check',
    '/commercial-rent-burden-calculator',
    '/break-even-customers-calculator',
    '/commercial-lease-survival-calculator',
    '/how-much-rent-can-a-cafe-afford',
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
