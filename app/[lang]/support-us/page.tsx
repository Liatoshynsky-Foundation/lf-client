import type { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import type { Language } from '~/types/types/language';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRootContainer } from '~/di/container';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import ActionsHelp from '~/shared/components/blocks/actions-help/ActionsHelp';
import { getActionsHelpData } from '~/shared/components/blocks/actions-help/ActionsHelp.consts';
import Faq from '~/shared/components/blocks/FAQ/FAQ';
import { faqItems } from '~/shared/components/blocks/FAQ/FAQ.consts';
import SupportFoundation from '~/shared/components/blocks/support-foundation/SupportFoundation';
import { ROUTES } from '~/shared/components/constants/routes';
import MainLayout from '~/shared/layouts/main-layout/MainLayout';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.supportUs');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.SUPPORT_US,
    locale: lang
  });
}

type SupportUsProps = Readonly<{
  params: Promise<{
    lang: Locale;
  }>;
}>;

export default async function SupportUs({ params }: SupportUsProps) {
  const { lang } = await params;

  const container = createRootContainer();
  const footerService = container.resolve('footerService');

  const footerData = await footerService.getFooterData(lang);

  const faqData = {
    contacts: {
      phone: footerData.contacts.phone,
      email: footerData.contacts.email
    },
    faq: faqItems
  };

  const actionsHelpData = await getActionsHelpData();

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <SupportFoundation />
      <ActionsHelp data={actionsHelpData} />
      <Faq data={faqData} />
    </MainLayout>
  );
}
