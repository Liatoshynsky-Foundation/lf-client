'use client';

import { Locale } from 'next-intl';
import { useEffect, useState } from 'react';
import Turnstile from 'react-cloudflare-turnstile';

import { ApiRoutes } from '~/constants/routes/api-routes';
interface TurnstileWidgetProps {
  onSuccessAction: (token: string) => void;
  language: Locale;
}

export default function TurnstileWidget({ onSuccessAction, language }: Readonly<TurnstileWidgetProps>) {
  const [siteKey, setSiteKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchTurnstile = async () => {
      const response = await fetch(ApiRoutes.TURNSTILE);
      const data = await response.json();
      if (data.turnstileSiteKey) {
        setSiteKey(data.turnstileSiteKey);
      }
    };
    fetchTurnstile();
  }, []);

  if (!siteKey) {
    return null;
  }

  return <Turnstile language={language} turnstileSiteKey={siteKey} callback={onSuccessAction} theme="light" />;
}
