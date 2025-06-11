import React from 'react';

import FoundationFounders from '~/components/FoundationFounders/FoundationFounders';
import LiatoshynskyOffice from '~/components/Liatoshynsky-office/LiatoshynskyOffice';
import OurMission from '~/components/our-mission/OurMission';
import AboutFoundation from '~/components/main-page-sections/about-foundation/AboutFoundation';

export default async function Home() {
  return (
    <>
      <AboutFoundation />
      <OurMission />
      <LiatoshynskyOffice />
      <FoundationFounders />
    </>
  );
}
