'use client';
import React, { useState } from 'react';

import { CookieModal } from './modal/CookieModal';
import { CookiePreferencesModal } from './preferances/CookiePreferencesModal';

const CookieModalWrapper = ({ cookie_consent }: { cookie_consent: string }) => {
  const [open, setOpen] = useState(true);
  const [openPreferences, setOpenPreferences] = useState(false);
  const [collectAnalytics, setCollectAnalytics] = useState(true);

  // Determine whether to render the modal based on cookie_consent
  const shouldRenderModal = !(cookie_consent && JSON.parse(cookie_consent).analytics);

  const setCookies = (analytics: boolean) => {
    const cookies = {
      analytics,
      marketing: false,
      functional: false,
      necessary: true
    };
    document.cookie = `cookie_consent=${JSON.stringify(cookies)}; path=/; max-age=${analytics ? 31536000 : 0}`;
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
