import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import TermsOfUse from '~/components/blocks/terms-of-use/TermsOfUse';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import type { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.terms');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.TERMS,
    locale: lang
  });
}

export default function Terms() {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <TermsOfUse />
    </MainLayout>
  );
}
