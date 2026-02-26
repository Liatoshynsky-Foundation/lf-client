import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

import { Cookies } from '~/types/types/common.types';

type ConsentScriptProps = Readonly<{
  trackingId: string;
  gtmId: string;
  consent_cookie: Cookies | null;
}>;

export default function ConsentScript({ trackingId, gtmId, consent_cookie }: ConsentScriptProps) {
  const consentStatus = consent_cookie?.analytics ? 'granted' : 'denied';

  return (
    <>
      <GoogleAnalytics gaId={trackingId} />
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <Script id="ga-consent" strategy="beforeInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}

            gtag('js', new Date());
            gtag('consent', 'update', {
              'analytics_storage': '${consentStatus}',
              'ad_storage': '${consentStatus}'
            });
            gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  );
}
