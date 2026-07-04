import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import GoogleAdsScripts from '@/components/GoogleAdsScripts';

const siteStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YieldLens UK',
    url: 'https://yieldlens.co.uk',
    description:
      'A commercial rent affordability and lease viability decision-support tool for UK commercial sites, with selected residential property checks.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YieldLens UK',
    url: 'https://yieldlens.co.uk',
    description:
      'A commercial rent affordability and lease viability decision-support tool for UK commercial sites, with selected residential property checks.',
    email: 'yieldlensuk@gmail.com',
    sameAs: ['https://www.linkedin.com/in/sam-carlon-81729b222/'],
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
    '@type': 'SoftwareApplication',
    name: 'YieldLens UK',
    url: 'https://yieldlens.co.uk',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'A commercial rent affordability and lease viability decision-support tool for UK commercial sites, with a free commercial check and optional £49 Standard Commercial Viability File.',
  },
];

export const metadata: Metadata = {
  metadataBase: new URL('https://yieldlens.co.uk'),
  title: {
    default: 'YieldLens UK | Commercial Lease Viability and Rent Affordability',
    template: '%s | YieldLens UK',
  },
  description:
    'A commercial rent affordability and lease viability decision-support tool for UK commercial sites, with selected residential property checks.',
  openGraph: {
    title: 'YieldLens UK',
    description:
      'A commercial rent affordability and lease viability decision-support tool for UK commercial sites, with selected residential property checks.',
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
        <GoogleAdsScripts />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
