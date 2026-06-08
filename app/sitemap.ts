import type { MetadataRoute } from 'next';

const baseUrl = 'https://yieldlens-uk.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/check',
    '/report',
    '/privacy',
    '/terms',
    '/commercial-lease-viability-check',
    '/buy-to-let-yield-calculator',
    '/property-cash-flow-calculator',
    '/rent-affordability-check',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
