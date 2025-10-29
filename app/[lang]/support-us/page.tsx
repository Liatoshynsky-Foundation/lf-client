import React from 'react';

import ActionsHelp from '~/components/blocks/actions-help/ActionsHelp';
import { actionsHelpPageData } from '~/components/blocks/actions-help/ActionsHelp.consts';
import Faq from '~/components/blocks/FAQ/FAQ';
import { contacts, faqItems } from '~/components/blocks/FAQ/FAQ.consts';
import SupportFoundation from '~/components/blocks/support-foundation/SupportFoundation';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';

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
