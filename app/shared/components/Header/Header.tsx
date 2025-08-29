'use client';

import { Box } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Logo from '~/ds-components/logo/Logo';
import NavigationBar from '~/ds-components/navigation-bar/NavigationBar';

import { styles } from './Header.styles';
import RightActionsPanel from './RightActionsPanel/RightActionsPanel';

import { headerClientService } from '~/services/client/headerService';
import useQuery from '~/shared/hooks/query/useQuery';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useScrollDirection } from '~/shared/hooks/use-scroll-direction/useScrollDirection';

export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { isTablet, isLaptop } = useBreakpoints();

  const scrollDirection = useScrollDirection(100);
  const t = useTranslations('header');
  const locale = useLocale();

  useEffect(() => {
    setIsNavVisible(scrollDirection !== 'down');
  }, [scrollDirection]);

  const { data: headerData, isLoading } = useQuery({
    queryKey: ['header', locale],
    queryFn: () => headerClientService.getHeaderData(locale),
    options: {
      staleTime: Infinity
    }
  });

  if (isLoading || !headerData) return null;

  return (
    <Box component="header" sx={styles.mainContainer}>
      <Box sx={styles.logoContainer}>
        <Logo />
      </Box>
      {isTablet || isLaptop ? (
        <Box sx={styles.desktopNavWrapper}>
          <Box sx={styles.navigationContainer(isNavVisible)}>
            <NavigationBar navLabels={headerData.navigation} />
          </Box>
          <RightActionsPanel
            supportButtonData={{
              text: t('supportButton'),
              link: headerData.supportButtonLink
            }}
          />
        </Box>
      ) : (
        <>
          <Box sx={styles.navigationContainer(isNavVisible)}>
            <NavigationBar navLabels={headerData.navigation} />
          </Box>
          <RightActionsPanel
            supportButtonData={{
              text: t('supportButton'),
              link: headerData.supportButtonLink
            }}
          />
        </>
      )}
    </Box>
  );
}
