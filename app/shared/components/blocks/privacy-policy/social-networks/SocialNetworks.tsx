import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface SocialNetworksProps {
  readonly data: PrivacyPolicyPage['blocks']['SocialNetworks'];
}

export default function SocialNetworks({ data }: SocialNetworksProps) {
  const { title, description } = data;
  return <PolicySection title={title} note={description} dataTestId="PrivacyPolicy-socialNetworks" />;
}
