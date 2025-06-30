import { Box } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import Logo from '~/ds-components/logo/Logo';

import NavigationBar from '../design-system/all-components/navigation-bar/NavigationBar';
import { styles } from './Header.styles';
import RightActionsPanel from './RightActionsPanel/RightActionsPanel';

import { createRequestContainer } from '~/di/container';

export default async function Header() {
  const t = await getTranslations('header');
  const locale = await getLocale();

  const { supportButtonLink } = await createRequestContainer().resolve('headerService').getHeaderData(locale);

  return (
    <Box component="header" sx={styles.mainContainer}>
      <Logo />
      <NavigationBar />
      <RightActionsPanel
        supportButtonData={{
          text: t('supportButton'),
          link: supportButtonLink
        }}
      />
    </Box>
  );
}
