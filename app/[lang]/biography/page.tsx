import React, { ReactElement } from 'react';

import MainLayout from '~/layouts/main-layout/MainLayout';

export default function Biography(): ReactElement {
  return (
    <MainLayout withLines>
      <div>Biography</div>
    </MainLayout>
  );
}
