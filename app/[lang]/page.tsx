import React from 'react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import { LangType } from '~/types/types/lang.type';

export default async function Home({
  params
}: Readonly<LangType>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations('home');

  return <h1>{t('text')}</h1>;
}
