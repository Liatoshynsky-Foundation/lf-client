import React from 'react';
import {getTranslations} from '~/lib/i18n';
export default async function Home({
   params,
}: {
  params: Promise<{ readonly lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslations(lang, 'home');

  return (
    <>
      <h1>{t('text')}</h1>
    </>
  );
}
