import React from 'react';

import Faq from '~/shared/components/blocks/FAQ/FAQ';
import { contacts, faqItems } from '~/shared/components/blocks/FAQ/FAQ.consts';

export default function SupportUs() {
  const faqData = {
    contacts,
    faq: faqItems
  };

  return <Faq data={faqData} />;
}
