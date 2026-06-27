import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface CookiesProps {
  readonly data: PrivacyPolicyPage['blocks']['Cookies'];
}

export default function Cookies({ data }: CookiesProps) {
  const { title, description, list, note } = data;
  return (
    <PolicySection title={title} description={description} list={list} note={note} dataTestId="PrivacyPolicy-cookies" />
  );
}
