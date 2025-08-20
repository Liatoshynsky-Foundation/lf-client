import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import ResearchAndScientificWork from '~/components/research-and-scientific-work/ResearchAndScientificWork';

import WorkTableSection from './WorksTable/WorkTableSelection';
import { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';

export const metadata = createSeoMeta({
  title: 'Дослідження та наукові роботи - Фундація Лятошинського',
  description: 'Ознайомтесь з дослідженнями та науковими роботами Бориса Лятошинського.',
  url: '/research'
});

export default async function Research({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <>
      <ResearchAndScientificWork />
      <WorkTableSection lang={lang} />
    </>
  );
}
