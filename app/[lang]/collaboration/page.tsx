import { setRequestLocale } from 'next-intl/server';

import OfferCollaboration from '~/components/blocks/collaboration/offer-collaboration/OfferCollaboration';

import { Language } from '~/types/types/language';

import MainLayout from '~/layouts/main-layout/MainLayout';

export default async function CollaborationPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  return (
    <MainLayout withLines>
      <OfferCollaboration />
    </MainLayout>
  );
}
