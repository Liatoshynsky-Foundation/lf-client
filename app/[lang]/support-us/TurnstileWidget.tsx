'use client';

import Turnstile from 'react-cloudflare-turnstile';
export default function TurnstileWidget({
  onSuccess,
  language
}: {
  language: 'uk' | 'en';
  onSuccess: (token: string) => void;
}) {
  return (
    <div className="mt-4">
      <Turnstile
        language={language}
        turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} // <-- Replace with real key
        callback={onSuccess}
        theme="light"
      />
    </div>
  );
}
