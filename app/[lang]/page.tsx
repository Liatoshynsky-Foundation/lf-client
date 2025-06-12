import { Box } from '@mui/material';
import React from 'react';

import MusicTable from '~/components/enhanced-table/MusicTable';
import FoundationFounders from '~/components/FoundationFounders/FoundationFounders';
import LiatoshynskyOffice from '~/components/Liatoshynsky-office/LiatoshynskyOffice';
import AboutFoundation from '~/components/main-page-sections/about-foundation/AboutFoundation';
import OurGoals from '~/components/our-goals/OurGoals';
import OurMission from '~/components/our-mission/OurMission';
import WhatWeDo from '~/components/what-we-do/WhatWeDo';

export default async function Home() {
  return (
    <>
      <Box sx={{ gridColumn: '1 / -1' }}>
        <MusicTable />
      </Box>
      <AboutFoundation />
      <OurMission />
      <OurGoals />
      <LiatoshynskyOffice />
      <WhatWeDo />
      <FoundationFounders />
    </>
  );
}
