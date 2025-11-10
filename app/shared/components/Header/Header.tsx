'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

import Logo from '~/ds-components/logo/Logo';
import NavigationBar from '~/ds-components/navigation-bar/NavigationBar';

import { styles } from './Header.styles';
import RightActionsPanel from './RightActionsPanel/RightActionsPanel';
import { contactsData, LinkIcon } from '~/types/types/common.types';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import { useHideHeader } from '~/shared/hooks/use-hide-header/useHideHeader';
import { useScrollDirection } from '~/shared/hooks/use-scroll-direction/useScrollDirection';

interface HeaderData {
  navigation: NavigationDTO[];
  specialNavigation: NavigationDTO | null;
  supportButtonLink: string;
}

interface HeaderProps {
  contacts: contactsData;
  socialLinks: LinkIcon[];
  headerData: HeaderData;
}

export default function Header({ headerData, contacts, socialLinks }: HeaderProps) {
  const scrollDirection = useScrollDirection(100);
  const hideHeader = useHideHeader(0.3);
  const t = useTranslations('header');

  return (
    <Box component="header" sx={styles.mainContainer(scrollDirection === 'down' || hideHeader)}>
      <Box sx={styles.logoContainer}>
        <Logo />
      </Box>

      <Box sx={styles.navigationContainer}>
        <NavigationBar
          navLabels={headerData.navigation}
          specialNav={headerData.specialNavigation}
          scrollDirection={scrollDirection}
          contacts={contacts}
          socialLinks={socialLinks}
        />
      </Box>

      <Box sx={styles.rightActionsContainer}>
        <RightActionsPanel
          supportButtonData={{
            text: t('supportButton'),
            link: headerData.supportButtonLink
          }}
          scrollDirection={scrollDirection}
        />
      </Box>
    </Box>
  );
}
