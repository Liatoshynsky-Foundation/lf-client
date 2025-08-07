import { Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import FoundationFounders from '~/components/blocks/FoundationFounders/FoundationFounders';
import FoundationInfo from '~/components/blocks/FoundationInfo/FoundationInfo';
import IntroSection from '~/components/blocks/IntroSection/IntroSection';
import LiatoshynskyOffice from '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice';
import OurGoals from '~/components/blocks/our-goals/OurGoals';
import OurMission from '~/components/blocks/our-mission/OurMission';
import WhatWeDo from '~/components/blocks/what-we-do/WhatWeDo';

import { Language } from '~/types/types/language';

import { createRequestContainer } from '~/di/container';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';

export const metadata = createSeoMeta({
  title: 'Фундація Лятошинського',
  description: 'Ознайомтесь з Фундацією Лятошинського, її місією та цілями.',
  url: '/'
});

export default async function Home({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  const pageService = await createRequestContainer().resolve('pageService');

  const [page, t] = await Promise.all([
    pageService.getPageData('home', lang),
    getTranslations('home.liatoshynskyOffice')
  ]);

  if (!page) {
    return <Box />;
  }

  return (
    <>
      {page.IntroSection && <IntroSection data={page.IntroSection} />}
      {page.FoundationInfo && <FoundationInfo data={page.FoundationInfo} />}
      {page.OurMission && <OurMission data={page.OurMission} />}
      {page.OurGoals && <OurGoals data={page.OurGoals} />}
      {page.LiatoshynskyOffice && <LiatoshynskyOffice data={page.LiatoshynskyOffice} t={t} />}
      {page.WhatWeDo && <WhatWeDo data={page.WhatWeDo} />}
      {page.FoundationFounders && <FoundationFounders data={page.FoundationFounders} />}
    </>
  );
}
