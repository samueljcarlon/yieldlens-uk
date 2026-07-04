import Script from 'next/script';

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? '';

export default function GoogleAdsScripts() {
  if (!GOOGLE_ADS_ID) return null;

  const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ADS_ID)}`;

  return (
    <>
      <Script id="google-ads-loader" src={gtagSrc} strategy="afterInteractive" />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            window.gtag('js', new Date());
            window.gtag('config', ${JSON.stringify(GOOGLE_ADS_ID)});
          `,
        }}
      />
    </>
  );
}
