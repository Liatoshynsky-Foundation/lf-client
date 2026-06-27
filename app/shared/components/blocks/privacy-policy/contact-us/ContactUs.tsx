import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface ContactUsProps {
  readonly data: PrivacyPolicyPage['blocks']['ContactUs'];
}

export default function ContactUs({ data }: ContactUsProps) {
  const { title, description } = data;
  return <PolicySection title={title} description={description} dataTestId="PrivacyPolicy-contactUs" />;
}
