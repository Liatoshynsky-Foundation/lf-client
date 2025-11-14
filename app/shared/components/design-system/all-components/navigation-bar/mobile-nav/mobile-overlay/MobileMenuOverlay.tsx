import { Box, Slide } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { NavAccordion } from '../../../menu-title/NavAccordion';
import { ContactsSection } from '../nav-contacts-section/NavContacts';
import { styles } from './MobileNavOverlay.styles';
import { contactsData, LinkIcon } from '~/types/types/common.types';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import { ColumnGuides } from '~/shared/components/column-guides/ColumnGuides';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface MobileMenuOverlayProps {
  open: boolean;
  navLabels: NavigationDTO[];
  contacts: contactsData;
  socialLinks: LinkIcon[];
}

const MobileMenuOverlay = ({ open, navLabels, contacts, socialLinks }: MobileMenuOverlayProps) => {
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
      <Box data-testid={`MobileMenuOverlay${open ? '--open' : '--closed'}`} sx={styles.overlay}>
        <Box sx={styles.overlayContent}>
          <ColumnGuides lineColor="rgba(239, 233, 224, 0.3)" />

          {!isMobile && (
            <Box data-testid="MobileMenuOverlay-leftColumn" sx={styles.leftColumn}>
              <Box sx={styles.leftColumnInner}>
                <ContactsSection contacts={contacts} socialLinks={socialLinks} isMobile={false} />
              </Box>
            </Box>
          )}

          <Box data-testid="MobileMenuOverlay-rightColumn" sx={styles.rightColumn}>
            <NavAccordion items={navItems} sx={styles.rightAccordionWrapper} />

            {isMobile && (
              <Box sx={styles.mobileContactsWrapper} data-testid="MobileMenuOverlay-contacts">
                <ContactsSection contacts={contacts} socialLinks={socialLinks} isMobile={true} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Slide>
  );
};

export default MobileMenuOverlay;
