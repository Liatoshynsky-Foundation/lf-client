import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface DataWeCollectProps {
  readonly data: PrivacyPolicyPage['blocks']['DataWeCollect'];
}

export default function DataWeCollect({ data }: DataWeCollectProps) {
  const { title, description, sections, note } = data;
  return (
    <PolicySection
      title={title}
      description={description}
      sections={sections}
      note={note}
      dataTestId="PrivacyPolicy-dataWeCollect"
    />
  );
}
