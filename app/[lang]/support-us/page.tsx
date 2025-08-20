import React from 'react';

import FAQ from '~/components/blocks/FAQ/FAQ';
import { contacts, faqItems } from '~/components/blocks/FAQ/FAQ.consts';

export default function SupportUs() {
  const faqData = {
    contacts,
    faq: faqItems
  };

  return <FAQ data={faqData} />;
}
