import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { isProductionMode } from '~/lib/utils/isProductionMode';
import { IntroAnimation } from '~/shared/components/blocks/home-page-hero/animation/IntroAnimation';
import { HeroSection } from '~/shared/components/blocks/home-page-hero/HeroSection';
import { heroQuote, heroQuoteSource } from '~/shared/components/blocks/home-page-hero/HeroSectionData';
import UnderDevelopment from '~/shared/components/under-development/UnderDevelopment';
import MainLayout from '~/shared/layouts/main-layout/MainLayout';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.home');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: '/',
    locale: lang
  });
}

export default async function Home({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  const heroContent = {
    heroQuote: heroQuote[lang],
    heroQuoteSource: heroQuoteSource[lang]
  };

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <IntroAnimation>
      <MainLayout withLines>
        <HeroSection {...heroContent} />
      </MainLayout>
    </IntroAnimation>
  );
}
