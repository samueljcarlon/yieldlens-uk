import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
