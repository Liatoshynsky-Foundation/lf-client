import { Locale } from 'next-intl';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';

import { createRootContainer } from '~/di/container';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import ActionsHelp from '~/shared/components/blocks/actions-help/ActionsHelp';
import { actionsHelpPageData } from '~/shared/components/blocks/actions-help/ActionsHelp.consts';
import Faq from '~/shared/components/blocks/FAQ/FAQ';
import { faqItems } from '~/shared/components/blocks/FAQ/FAQ.consts';
import SupportFoundation from '~/shared/components/blocks/support-foundation/SupportFoundation';
import MainLayout from '~/shared/layouts/main-layout/MainLayout';

export const metadata = createSeoMeta({
  title: 'Підтримати Фундацію',
  description:
    'Усі внески надходять безпосередньо на рахунок Фундації Лятошинського та спрямовуються на реалізацію її місії.',
  url: '/support-us'
});

type SupportUsProps = {
  params: {
    lang: Locale;
  };
};

export default async function SupportUs({ params: { lang } }: SupportUsProps) {
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

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <SupportFoundation />
      <ActionsHelp data={actionsHelpPageData} />
      <Faq data={faqData} />
    </MainLayout>
  );
}
