import { setRequestLocale } from 'next-intl/server';
import React, { ReactElement } from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { BiographyContent } from './BiographyContent/BiographyContent';
import { Language } from '~/types/types/language';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { HeroSection } from '~/shared/components/blocks/HeroSection/HeroSection';

export const metadata = createSeoMeta({
  title: 'ЖиТтєПиС ЛятОшИнсьКогО',
  description: 'Ознайомтесь з життєписом Бориса Лятошинського.',
  url: '/biography'
});

export default async function Biography({ params }: Readonly<Language>): Promise<ReactElement> {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const pageService = await createRequestContainer().resolve('pagesDataService');

  const page = await pageService.getPageData('biography', lang);

  if (!page) {
    return <></>;
  }

  const years = page.blocks.biographyContent.map((year) => year.yearTitle).filter((year) => year !== null);

  return (
    <MainLayout withLines>
      {page.blocks.heroSection && <HeroSection data={page.blocks.heroSection} years={years} />}
      {page.blocks.biographyContent && <BiographyContent data={page.blocks.biographyContent} />}
    </MainLayout>
  );
}
