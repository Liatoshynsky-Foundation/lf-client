import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface TargetedAdsProps {
  readonly data: PrivacyPolicyPage['blocks']['TargetedAds'];
}

export default function TargetedAds({ data }: TargetedAdsProps) {
  const { title, description } = data;
  return <PolicySection title={title} note={description} dataTestId="PrivacyPolicy-targetedAds" />;
}
