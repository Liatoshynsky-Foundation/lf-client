'use client';

import { Box } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

import Logo from '~/ds-components/logo/Logo';
import NavigationBar from '~/ds-components/navigation-bar/NavigationBar';

import { styles } from './Header.styles';
import RightActionsPanel from './RightActionsPanel/RightActionsPanel';

import { headerClientService } from '~/services/client/headerService';
import useQuery from '~/shared/hooks/query/useQuery';
import { useHideHeader } from '~/shared/hooks/use-hide-header/useHideHeader';
import { useScrollDirection } from '~/shared/hooks/use-scroll-direction/useScrollDirection';

export default function Header() {
  const scrollDirection = useScrollDirection(100);
  const hideHeader = useHideHeader(0.3);
  const t = useTranslations('header');
  const locale = useLocale();

  const { data: headerData, isLoading } = useQuery({
    queryKey: ['header', locale],
    queryFn: () => headerClientService.getHeaderData(locale),
    options: {
      staleTime: Infinity
    }
  });

  if (isLoading || !headerData) return null;

  return (
    <Box component="header" sx={styles.mainContainer(scrollDirection === 'down' || hideHeader)}>
      <Box sx={styles.logoContainer}>
        <Logo />
      </Box>
      <Box sx={styles.navigationContainer}>
        <NavigationBar navLabels={headerData.navigation} />
      </Box>
      <Box sx={styles.rightActionsContainer}>
        <RightActionsPanel
          supportButtonData={{
            text: t('supportButton'),
            link: headerData.supportButtonLink
          }}
        />
      </Box>
    </Box>
  );
}
