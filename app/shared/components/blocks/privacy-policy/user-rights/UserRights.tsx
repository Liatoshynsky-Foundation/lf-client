import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { UserRightsProps } from '~/types/page/privacy-policy.types';

export default function UserRights({ data }: Readonly<UserRightsProps>) {
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
