'use client';
import React, { useState } from 'react';

import ConsentScript from '../google-tracking/ConsentScript';
import { CookieModal } from './modal/CookieModal';
import { CookiePreferencesModal } from './preferances/CookiePreferencesModal';
import { Cookies } from '~/types/types/common.types';

type ConsentProps = Readonly<{
  trackingId: string;
  gtmId: string;
  consent_cookie: Cookies | null;
}>;

const CookieModalWrapper = ({ trackingId, gtmId, consent_cookie }: ConsentProps) => {
  const [open, setOpen] = useState(true);
  const [openPreferences, setOpenPreferences] = useState(false);
  const [collectAnalytics, setCollectAnalytics] = useState(true);
  const [analiticsEnabled, setAnaliticsEnabled] = useState(Boolean(consent_cookie));

  if (analiticsEnabled) {
    return <ConsentScript trackingId={trackingId} gtmId={gtmId} consent_cookie={consent_cookie} />;
  }

  const setCookies = (analytics: boolean) => {
    if (analytics) {
      setAnaliticsEnabled(true);
    }
    document.cookie = `cookie_consent=${JSON.stringify({ analytics })}; path=/; max-age=31536000`;
  };

  return openPreferences ? (
    <CookiePreferencesModal
      open={openPreferences}
      onClose={() => {
        setCollectAnalytics(false);
        setOpenPreferences(false);
      }}
      saveSettings={() => {
        setCookies(collectAnalytics);
        setOpenPreferences(false);
      }}
      checked={collectAnalytics}
      onChecked={(value) => setCollectAnalytics(value)}
    />
  ) : (
    <CookieModal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      showPreferences={() => {
        setOpenPreferences(true);
        setOpen(false);
      }}
      acceptAll={() => {
        setCookies(true);
        setOpen(false);
      }}
    />
  );
};

export default CookieModalWrapper;
