import React from 'react';

import FoundationFounders from '~/components/FoundationFounders/FoundationFounders';
import LiatoshynskyOffice from '~/components/Liatoshynsky-office/LiatoshynskyOffice';
import OurMission from '~/components/our-mission/OurMission';

export default async function Home() {
  return (
    <>
      <OurMission />
      <LiatoshynskyOffice />
      <FoundationFounders />
    </>
  );
}
