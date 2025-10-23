import React from 'react';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import ActionsHelp from '~/shared/components/blocks/actions-help/ActionsHelp';
import { actionsHelpPageData } from '~/shared/components/blocks/actions-help/ActionsHelp.consts';
import Faq from '~/shared/components/blocks/FAQ/FAQ';
import { contacts, faqItems } from '~/shared/components/blocks/FAQ/FAQ.consts';
import SupportFoundation from '~/shared/components/blocks/support-foundation/SupportFoundation';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';
import MainLayout from '~/shared/layouts/main-layout/MainLayout';

export const metadata = createSeoMeta({
  title: 'Підтримати Фундацію',
  description:
    'Усі внески надходять безпосередньо на рахунок Фундації Лятошинського та спрямовуються на реалізацію її місії.',
  url: '/research'
});
export default function SupportUs() {
  const faqData = {
    contacts,
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
