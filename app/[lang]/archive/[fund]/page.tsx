'use client';

import MainLayout from '~/layouts/main-layout/MainLayout';
import DocumentTableSelection from '~/shared/components/tables/DocumentsTable/DocumentTableSelection';

export default function FundDetailsPage() {
  return (
    <MainLayout>
      <DocumentTableSelection />
    </MainLayout>
  );
}
