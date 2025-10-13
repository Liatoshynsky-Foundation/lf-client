import { setRequestLocale } from 'next-intl/server';

import { Language } from '~/types/types/language';

import OfferCollaboration from '~/shared/components/blocks/collaboration/offer-collaboration/OfferCollaboration';

export default async function CollaborationPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <OfferCollaboration />;
}
