import React from 'react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import { ParamsWithLanguage } from '~/types/types/paramsWithLanguage';

export default async function Home({
  params
}: Readonly<ParamsWithLanguage>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations('home');

  return <h1>{t('text')}</h1>;
}
