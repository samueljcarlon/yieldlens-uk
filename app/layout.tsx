import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

const siteStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YieldLens UK',
    url: 'https://yieldlens.co.uk',
    description:
      'YieldLens UK helps users pressure-test UK residential and commercial property decisions before committing.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'YieldLens UK',
    url: 'https://yieldlens.co.uk',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'A UK property viability tool for checking yield, cash flow, break-even risk, downside scenarios, and property decision risk.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
    },
  },
];

export const metadata: Metadata = {
  metadataBase: new URL('https://yieldlens.co.uk'),
  title: {
    default: 'YieldLens UK | Property Return and Viability Checks',
    template: '%s | YieldLens UK',
  },
  description:
    'YieldLens UK helps users pressure-test UK residential and commercial property decisions with yield, cash flow, break-even, risk flags, and scenario checks.',
  openGraph: {
    title: 'YieldLens UK',
    description:
      'Pressure-test UK residential and commercial property decisions before you commit.',
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
      </body>
    </html>
  );
}
