import { Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import FoundationInfo from '~/components/blocks/about-foundation/FoundationInfo/FoundationInfo';
import IntroSection from '~/components/blocks/about-foundation/IntroSection/IntroSection';
import FoundationFounders from '~/components/blocks/FoundationFounders/FoundationFounders';
import LiatoshynskyOffice from '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice';
import OurGoals from '~/components/blocks/our-goals/OurGoals';
import OurMission from '~/components/blocks/our-mission/OurMission';
import WhatWeDo from '~/components/blocks/what-we-do/WhatWeDo';

import { Language } from '~/types/types/language';

import { createRequestContainer } from '~/di/container';

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
