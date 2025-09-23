'use client';

import { Locale } from 'next-intl';
import Turnstile from 'react-cloudflare-turnstile';
export default function TurnstileWidget({
  onSuccessAction,
  language
}: {
  language: Locale;
  onSuccessAction: (token: string) => void;
}) {
  return (
    <div className="mt-4">
      <Turnstile
        language={language}
        turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        callback={onSuccessAction}
        theme="light"
      />
    </div>
  );
}
