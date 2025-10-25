import { setRequestLocale } from 'next-intl/server';

import { Language } from '~/types/types/language';

import CharitableContributions from '~/shared/components/blocks/charitable-contributions/CharitableContributions';

export default async function CollaborationPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  return (
    <>
      <CharitableContributions />
      {/* <OfferCollaboration /> */}
    </>
  );
}
