import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface DataUsageProps {
  readonly data: PrivacyPolicyPage['blocks']['DataUsage'];
}

export default function DataUsage({ data }: DataUsageProps) {
  const { title, description, list } = data;
  return <PolicySection title={title} description={description} list={list} dataTestId="PrivacyPolicy-dataUsage" />;
}
