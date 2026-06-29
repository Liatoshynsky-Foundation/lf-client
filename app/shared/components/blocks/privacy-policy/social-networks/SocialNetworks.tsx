import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { SocialNetworksProps } from '~/types/page/privacy-policy.types';

export default function SocialNetworks({ data }: Readonly<SocialNetworksProps>) {
  const { title, description } = data;
  return <PolicySection title={title} note={description} dataTestId="PrivacyPolicy-socialNetworks" />;
}
