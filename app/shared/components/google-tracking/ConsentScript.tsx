import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

import { consentObj, parseDaConsent } from '~/lib/utils/consent';

type ConsentScriptProps = Readonly<{
  trackingId: string;
  gtmId: string;
  consent_cookie: string;
}>;

export default function ConsentScript({ trackingId, gtmId, consent_cookie }: ConsentScriptProps) {
  const hasUserAlreadyConsented = consent_cookie === '1';

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
                    gtag('consent', 'default', ${parseDaConsent(consentObj(hasUserAlreadyConsented))});
                `}
      </Script>
    </>
  );
}
