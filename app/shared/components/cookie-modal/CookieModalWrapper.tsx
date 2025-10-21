'use client';
import React, { useState } from 'react';

import { CookieModal } from './modal/CookieModal';
import { CookiePreferencesModal } from './preferances/CookiePreferencesModal';

import { consentObj } from '~/lib/utils/consent';

type GtagConsentParams = ReturnType<typeof consentObj>;

declare global {
  interface Window {
    gtag: (command: 'consent', action: 'update' | 'default', params: GtagConsentParams) => void;
  }
}

const CookieModalWrapper = ({ cookie_consent }: { cookie_consent: string }) => {
  const [open, setOpen] = useState(true);
  const [openPreferences, setOpenPreferences] = useState(false);
  const [collectAnalytics, setCollectAnalytics] = useState(true);

  const shouldRenderModal = !cookie_consent;

  const setCookies = (analytics: boolean) => {
    if (analytics) {
      window.gtag('consent', 'update', consentObj(true));
    }
    document.cookie = `cookie_consent=${analytics ? 1 : 0}; path=/; max-age=31536000`;
  };

  const showPreferences = () => {
    setOpenPreferences(true);
    setOpen(false);
  };

  if (!shouldRenderModal) {
    return null;
  }

  return openPreferences ? (
    <CookiePreferencesModal
      open={openPreferences}
      onClose={() => {
        setCookies(false);
        setOpenPreferences(false);
      }}
      saveSettings={() => {
        setCookies(collectAnalytics);
        setOpenPreferences(false);
      }}
      checked={collectAnalytics}
      onChecked={(value) => {
        setCollectAnalytics(value);
      }}
    />
  ) : (
    <CookieModal
      open={open}
      onClose={() => {
        setCookies(false);
        setOpen(false);
      }}
      showPreferences={showPreferences}
      acceptAll={() => {
        setCookies(true);
        setOpen(false);
      }}
    />
  );
};

export default CookieModalWrapper;
