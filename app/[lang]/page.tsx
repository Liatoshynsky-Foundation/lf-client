import { Box } from '@mui/material';
import React from 'react';

import FoundationFounders from '~/components/FoundationFounders/FoundationFounders';
import LiatoshynskyOffice from '~/components/Liatoshynsky-office/LiatoshynskyOffice';
import AboutFoundation from '~/components/main-page-sections/about-foundation/AboutFoundation';
import OurGoals from '~/components/our-goals/OurGoals';
import OurMission from '~/components/our-mission/OurMission';
import WhatWeDo from '~/components/what-we-do/WhatWeDo';

import MusicTableSection from '~/shared/components/enhanced-table/MusicTableSelection';

export default async function Home() {
  const musicData = [
    { id: 1, name: '«Після бою», сл. І. Буніна, укр. пер. М. Стріхи', year: 1997, opus: 'op.1' },
    { id: 2, name: 'Довше ім’я...', year: 1997, opus: 'op.1' },
    { id: 3, name: 'Коротке ім’я', year: 1997, opus: 'op.1' },
    { id: 4, name: 'Твір із надзвичайно довгою назвою...', year: 1997, opus: 'op.2' },
    { id: 5, name: 'Пісня', year: 1997, opus: 'op.2' },
    { id: 6, name: 'Композиція для голосу і фортепіано', year: 1997, opus: 'op.2' },
    { id: 7, name: 'Інструментальна п’єса', year: 1997 },
    { id: 8, name: 'Романтична балада', year: 1997 },
    { id: 9, name: 'Симфонічний твір', year: 1997 },
    { id: 10, name: 'Етюд', year: 1997 },
    { id: 11, name: 'Ода невідомому герою...', year: 1997 },
    { id: 12, name: 'Мелодія', year: 1998 },
    { id: 13, name: 'Прелюдія світанку', year: 1998, opus: 'op.3' },
    { id: 14, name: 'Соната для скрипки', year: 1998, opus: 'op.3' },
    { id: 15, name: 'Ноктюрн', year: 1998, opus: 'op.3' },
    { id: 16, name: 'Весняна фантазія', year: 1998, opus: 'op.4' },
    { id: 17, name: 'Дует для двох флейт', year: 1998, opus: 'op.4' },
    { id: 18, name: 'Марш перемоги', year: 1998, opus: 'op.4' },
    { id: 19, name: 'Елегія', year: 1999 },
    { id: 20, name: 'Баркарола', year: 1999 },
    { id: 21, name: 'Фантазія на народну тему', year: 1999 },
    { id: 22, name: 'Скерцо', year: 1999 },
    { id: 23, name: 'Гімн світу', year: 1999 },
    { id: 24, name: 'Арія', year: 1999 }
  ];
  return (
    <>
      <Box sx={{ gridColumn: '1 / -1' }}>
        <MusicTableSection data={musicData} />
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
