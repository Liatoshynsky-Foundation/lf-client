import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { TargetedAdsProps } from '~/types/page/privacy-policy.types';

export default function TargetedAds({ data }: Readonly<TargetedAdsProps>) {
  const { title, description } = data;
  return <PolicySection title={title} note={description} dataTestId="PrivacyPolicy-targetedAds" />;
}
