import React from 'react';

import FoundationFounders from '~/components/FoundationFounders/FoundationFounders';
import LiatoshynskyOffice from '~/components/Liatoshynsky-office/LiatoshynskyOffice';
import AboutFoundation from '~/components/main-page-sections/about-foundation/AboutFoundation';
import OurGoals from '~/components/our-goals/OurGoals';
import OurMission from '~/components/our-mission/OurMission';
import WhatWeDo from '~/components/what-we-do/WhatWeDo';

export default async function Home() {
  return (
    <>
      <AboutFoundation />
      <OurMission />
      <OurGoals />
      <LiatoshynskyOffice />
      <WhatWeDo />
      <FoundationFounders />
    </>
  );
}
