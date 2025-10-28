import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import OfferCollaboration from '~/components/blocks/collaboration/offer-collaboration/OfferCollaboration';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { Language } from '~/types/types/language';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';

export default async function CollaborationPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <OfferCollaboration />
    </MainLayout>
  );
}
