import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface UserRightsProps {
  readonly data: PrivacyPolicyPage['blocks']['UserRights'];
}

export default function UserRights({ data }: UserRightsProps) {
  const { title, description, list, note } = data;
  return (
    <PolicySection
      title={title}
      description={description}
      list={list}
      note={note}
      dataTestId="PrivacyPolicy-userRights"
    />
  );
}
