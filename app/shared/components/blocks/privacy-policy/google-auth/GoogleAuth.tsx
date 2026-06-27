import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface GoogleAuthProps {
  readonly data: PrivacyPolicyPage['blocks']['GoogleAuth'];
}

export default function GoogleAuth({ data }: GoogleAuthProps) {
  const { title, description, list, note } = data;
  return (
    <PolicySection
      title={title}
      description={description}
      list={list}
      note={note}
      dataTestId="PrivacyPolicy-googleAuth"
    />
  );
}
