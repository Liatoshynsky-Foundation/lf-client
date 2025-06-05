import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';
import LiatoshynskyOffice from '~/components/Liatoshynsky-office/LiatoshynskyOffice';

export default async function Home() {
  return (
    <h1>
      {' '}
      <LiatoshynskyOffice />{' '}
    </h1>
  );
}
