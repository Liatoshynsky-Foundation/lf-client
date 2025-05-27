import React from 'react';
import {getTranslations} from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('home');
  return <h1>{t('text')}</h1>;
}
