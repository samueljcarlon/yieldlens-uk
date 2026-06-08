import type { MetadataRoute } from 'next';

const baseUrl = 'https://yieldlens.co.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/reports',
        '/api',
        '/results',
        '/report',
        '/thank-you',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
