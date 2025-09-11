import { Box } from '@mui/material';
import { draftMode } from 'next/headers';
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

  const { isEnabled } = await draftMode();

  const pageService = await createRequestContainer().resolve('pageService');

  const [page, t] = await Promise.all([
    isEnabled ? pageService.getDraftPageData('about-us', lang) : pageService.getPublishedPageData('about-us', lang),
    getTranslations('home.liatoshynskyOffice')
  ]);

  if (!page) return <Box />;

  return (
    <>
      {page.blocks.IntroSection && <IntroSection data={page.blocks.IntroSection} />}
      {page.blocks.FoundationInfo && <FoundationInfo data={page.blocks.FoundationInfo} />}
      {page.blocks.OurMission && <OurMission data={page.blocks.OurMission} />}
      {page.blocks.OurGoals && <OurGoals data={page.blocks.OurGoals} />}
      {page.blocks.LiatoshynskyOffice && <LiatoshynskyOffice data={page.blocks.LiatoshynskyOffice} t={t} />}
      {page.blocks.WhatWeDo && <WhatWeDo data={page.blocks.WhatWeDo} />}
      {page.blocks.FoundationFounders && <FoundationFounders data={page.blocks.FoundationFounders} />}
    </>
  );
}
