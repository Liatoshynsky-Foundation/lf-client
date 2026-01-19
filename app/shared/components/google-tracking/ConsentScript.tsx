import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

import { Cookies } from '~/types/types/common.types';

import { consentObj, parseDaConsent } from '~/lib/utils/consent';

type ConsentScriptProps = Readonly<{
  trackingId: string;
  gtmId: string;
  consent_cookie: Cookies | null;
}>;

export default function ConsentScript({ trackingId, gtmId }: ConsentScriptProps) {
  return (
    <>
      <GoogleAnalytics gaId={trackingId} />
      <GoogleTagManager gtmId={gtmId} />
      <Script id="ga-consent" strategy="beforeInteractive">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}

                    gtag('js', new Date());
                    gtag('config', '${trackingId}');
                    gtag('consent', 'default', ${parseDaConsent(consentObj(true))});
                `}
      </Script>
    </>
  );
}
