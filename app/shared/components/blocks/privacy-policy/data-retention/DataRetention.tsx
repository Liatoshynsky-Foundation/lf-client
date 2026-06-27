import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface DataRetentionProps {
  readonly data: PrivacyPolicyPage['blocks']['DataRetention'];
}

export default function DataRetention({ data }: DataRetentionProps) {
  const { title, description } = data;
  return <PolicySection title={title} note={description} dataTestId="PrivacyPolicy-dataRetention" />;
}
