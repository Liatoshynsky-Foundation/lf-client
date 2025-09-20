import React from 'react';

import ActionsHelp from '~/shared/components/blocks/actions-help/ActionsHelp';
import { actionsHelpPageData } from '~/shared/components/blocks/actions-help/ActionsHelp.consts';
import Faq from '~/shared/components/blocks/FAQ/FAQ';
import { contacts, faqItems } from '~/shared/components/blocks/FAQ/FAQ.consts';
import SupportFoundation from '~/shared/components/blocks/support-foundation/SupportFoundation';

export default function SupportUs() {
  const faqData = {
    contacts,
    faq: faqItems
  };

  return (
    <>
      <SupportFoundation />
      <ActionsHelp data={actionsHelpPageData} />
      <Faq data={faqData} />
    </>
  );
}
