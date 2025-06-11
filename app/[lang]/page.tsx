import React from 'react';

import LiatoshynskyOffice from '~/components/Liatoshynsky-office/LiatoshynskyOffice';

import FoundationFounders from '~/shared/components/FoundationFounders/FoundationFounders';

export default async function Home() {
  return (
    <>
      <LiatoshynskyOffice />
      <FoundationFounders />
    </>
  );
}
