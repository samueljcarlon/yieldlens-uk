import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import AnalyticsProvider from '@/components/AnalyticsProvider';

const siteStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YieldLens UK',
    url: 'https://yieldlens.co.uk',
    description:
      'Independent UK commercial lease viability and rent affordability decision-support, with selected residential property checks.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YieldLens UK',
    url: 'https://yieldlens.co.uk',
    description:
      'Independent UK commercial lease viability and rent affordability decision-support.',
    email: 'yieldlensuk@gmail.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'yieldlensuk@gmail.com',
      areaServed: 'GB',
      availableLanguage: 'en-GB',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'YieldLens UK',
    url: 'https://yieldlens.co.uk',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Independent UK commercial lease viability and rent affordability decision-support with a free commercial check and optional £49 Standard commercial viability file.',
  },
];

export const metadata: Metadata = {
  metadataBase: new URL('https://yieldlens.co.uk'),
  title: {
    default: 'YieldLens UK | Commercial Lease Viability and Rent Affordability',
    template: '%s | YieldLens UK',
  },
  description:
    'Independent UK commercial lease viability and rent affordability decision-support, with selected residential property checks.',
  openGraph: {
    title: 'YieldLens UK',
    description:
      'Independent UK commercial lease viability and rent affordability decision-support, with selected residential property checks.',
    url: 'https://yieldlens.co.uk',
    siteName: 'YieldLens UK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased">
        <JsonLd data={siteStructuredData} />
        <Header />
        <main>{children}</main>
        <Footer />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
