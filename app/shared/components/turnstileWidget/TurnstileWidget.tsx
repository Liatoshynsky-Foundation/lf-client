'use client';

import { Locale } from 'next-intl';
import Turnstile from 'react-cloudflare-turnstile';
interface TurnstileWidgetProps {
  onSuccessAction: (token: string) => void;
  language: Locale;
}

export default function TurnstileWidget({ onSuccessAction, language }: TurnstileWidgetProps) {
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
