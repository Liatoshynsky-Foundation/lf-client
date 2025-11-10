import { Box, Slide /*, Typography*/, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';

import { NavAccordion } from '../../../menu-title/NavAccordion';
import { styles } from './MobileNavOverlay.styles';
import { SocialMediaTypes } from '~/types/enums/common.enums';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import { ColumnGuides } from '~/shared/components/column-guides/ColumnGuides';
import { ContactLink } from '~/shared/components/contact-link/ContactLink';
import FooterSocialMedia from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';
import { useIsMobile } from '~/shared/hooks/is-mobile/useIsMobile';

interface MobileMenuOverlayProps {
  open: boolean;
  navLabels: NavigationDTO[];
  data?: any;
}

const MobileMenuOverlay = ({ open, navLabels }: MobileMenuOverlayProps) => {
  const isMobile = useIsMobile();
  const t = useTranslations('footer');

  const socialLinks = [
    {
      icon: SocialMediaTypes.Instagram,
      link: 'https://www.instagram.com/liatoshynsky_foundation/'
    },
    {
      icon: SocialMediaTypes.Facebook,
      link: 'https://www.facebook.com/LiatoshynskyFoundation/'
    },
    {
      icon: SocialMediaTypes.YouTube,
      link: 'https://www.youtube.com/'
    }
  ];

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navItems = useMemo(() => {
    return navLabels.map((group) => {
      const dropdown = group.links.map((link) => ({
        label: link.label,
        href: link.href
      }));

      return {
        label: group.title,
        dropdown: dropdown.length > 1 ? dropdown : undefined,
        href: dropdown.length === 1 ? dropdown[0].href : undefined
      };
    });
  }, [navLabels]);

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit timeout={600}>
      <Box sx={styles.overlay}>
        <ColumnGuides lineColor="rgba(239, 233, 224, 0.3)" />

        <Box sx={styles.leftColumn}>
          {/* <Box sx={styles.links}>
            <ContactLink
              type="phone"
              label={t('phoneLabel')}
              value={contacts.email}
              isMobile={isMobile}
              direction="column"
              data-testid="ContactsInfo-phoneLink"
            />
            <ContactLink
              type="email"
              label={'Email'}
              value={contacts.phone}
              direction="column"
              data-testid="ContactsInfo-emailLink"
            />
          </Box> */}
          <Box sx={styles.links}>
            <ContactLink
              type="phone"
              label={t('phoneLabel')}
              value={'oaidwuoawduow'}
              isMobile={isMobile}
              direction="column"
              data-testid="ContactsInfo-phoneLink"
            />
            <ContactLink
              type="email"
              label={'Email'}
              value={'068 736 9q83 8389'}
              direction="column"
              data-testid="ContactsInfo-emailLink"
            />
          </Box>
          <Box>
            <Typography sx={styles.mediaTitles} data-testid="ContactsInfo-socialMediaLabel">
              Ми в соцмережах:
            </Typography>
            <FooterSocialMedia media={socialLinks} />
          </Box>
        </Box>
        <Box sx={styles.rightColumn}>
          <NavAccordion navLabels={navItems} />
        </Box>
      </Box>
    </Slide>
  );
};

export default MobileMenuOverlay;
