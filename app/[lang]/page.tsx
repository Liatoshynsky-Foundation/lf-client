import React from 'react';

import LiatoshynskyOffice from '~/components/Liatoshynsky-office/LiatoshynskyOffice';

import FoundationFounders from '~/shared/components/FoundationFounders/FoundationFounders';
import OurMission from '~/shared/components/our-mission/OurMission';

export default async function Home() {
  return (
    <>
      <OurMission />
      <LiatoshynskyOffice />
      <FoundationFounders />
    </>
  );
}
