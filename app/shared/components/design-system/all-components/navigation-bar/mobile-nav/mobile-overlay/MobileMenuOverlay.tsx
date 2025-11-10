import { Box, Slide, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';

import { NavAccordion } from '../../../menu-title/NavAccordion';
import { styles } from './MobileNavOverlay.styles';
import { contactsData, LinkIcon } from '~/types/types/common.types';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import MailIcon from '~/public/icons/mail.svg';
import PhoneIcon from '~/public/icons/phone.svg';
import { ColumnGuides } from '~/shared/components/column-guides/ColumnGuides';
import { ContactLink } from '~/shared/components/contact-link/ContactLink';
import FooterSocialMedia from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface MobileMenuOverlayProps {
  open: boolean;
  navLabels: NavigationDTO[];
  contacts: contactsData;
  socialLinks: LinkIcon[];
}

const MobileMenuOverlay = ({ open, navLabels, contacts, socialLinks }: MobileMenuOverlayProps) => {
  const t = useTranslations('contactsInfoPage');
  const { isMobile } = useBreakpoints();

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
    <Slide direction="down" in={open} mountOnEnter unmountOnExit appear={false} timeout={600}>
      <Box sx={styles.overlay}>
        <ColumnGuides lineColor="rgba(239, 233, 224, 0.3)" />

        <Box sx={styles.leftColumn}>
          <Box sx={styles.links}>
            <ContactLink
              type="phone"
              label={isMobile ? undefined : t('phoneNumber')}
              value={contacts.phone}
              isMobile={isMobile}
              direction={isMobile ? 'row' : 'column'}
              data-testid="ContactsInfo-phoneLink"
              icon={isMobile ? PhoneIcon : null}
            />
            <ContactLink
              type="email"
              label={isMobile ? undefined : t('email')}
              value={contacts.email}
              isMobile={isMobile}
              direction={isMobile ? 'row' : 'column'}
              data-testid="ContactsInfo-emailLink"
              icon={isMobile ? MailIcon : null}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { sm: '8px', md: '10px' } }}>
            <Typography sx={styles.mediaTitles} data-testid="ContactsInfo-socialMediaLabel">
              {t('socialMedia')}:
            </Typography>

            <FooterSocialMedia media={socialLinks} containerSx={{ gap: { xs: '18px', sm: '14px', md: '16px' } }} />
          </Box>
        </Box>
        <Box sx={styles.rightColumn}>
          <NavAccordion items={navItems} />
        </Box>
      </Box>
    </Slide>
  );
};

export default MobileMenuOverlay;
