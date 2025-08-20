import React from 'react';

import Faq from '~/shared/components/blocks/faq/Faq';
import { contacts, faqItems } from '~/shared/components/blocks/faq/Faq.consts';

export default function SupportUs() {
  const faqData = {
    contacts,
    faq: faqItems
  };

  return <Faq data={faqData} />;
}
