'use client';
import React, { useState } from 'react';

import { CookieModal } from './modal/CookieModal';
import { CookiePreferencesModal } from './preferances/CookiePreferencesModal';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

function initGoogleAnalitics(trackingId: string) {
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
  };
}

const CookieModalWrapper = ({ cookie_consent, tracking_id }: { cookie_consent: string; tracking_id: string }) => {
  const [open, setOpen] = useState(true);
  const [openPreferences, setOpenPreferences] = useState(false);
  const [collectAnalytics, setCollectAnalytics] = useState(true);

  const shouldRenderModal = !(cookie_consent && JSON.parse(cookie_consent).analytics);

  const setCookies = (analytics: boolean) => {
    const cookies = {
      analytics,
      marketing: false,
      functional: false,
      necessary: true
    };
    if (analytics) {
      initGoogleAnalitics(tracking_id);
    }
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
