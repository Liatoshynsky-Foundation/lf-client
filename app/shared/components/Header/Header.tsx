'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Logo from '~/ds-components/logo/Logo';
import NavigationBar from '~/ds-components/navigation-bar/NavigationBar';

import { styles } from './Header.styles';
import RightActionsPanel from './RightActionsPanel/RightActionsPanel';

import { useScrollDirection } from '~/shared/hooks/use-scroll-direction/useScrollDirection';

export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const scrollDirection = useScrollDirection(100);
  const t = useTranslations('header');

  useEffect(() => {
    setIsNavVisible(scrollDirection !== 'down');
  }, [scrollDirection]);
  const navLabels = {
    liatoshynsky: t('navLabels.liatoshynsky'),
    biography: t('navLabels.biography'),
    artistry: t('navLabels.artistry'),
    research: t('navLabels.research'),
    foundation: t('navLabels.foundation'),
    about: t('navLabels.foundationHome'),
    news: t('navLabels.news'),
    media: t('navLabels.mediaAboutUs'),
    archive: t('navLabels.archive'),
    collaboration: t('navLabels.collaboration')
  };

  const supportButtonLink = '/support-us';

  return (
    <Box component="header" sx={styles.mainContainer}>
      <Box sx={styles.logoContainer}>
        <Logo />
      </Box>
      <Box sx={styles.navigationContainer(isNavVisible)}>
        <NavigationBar navLabels={navLabels} />
      </Box>
      <RightActionsPanel
        supportButtonData={{
          text: t('supportButton'),
          link: supportButtonLink
        }}
      />
    </Box>
  );
}
