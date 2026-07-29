'use client';

import { Box, Slide } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';

import { styles } from './MobileOverlay.styles';
import { contactsData, LinkIcon } from '~/types/types/common.types';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import { ColumnGuides } from '~/shared/components/column-guides/ColumnGuides';
import {
  NavAccordion,
  NavItem
} from '~/shared/components/design-system/all-components/navigation-accordion/NavAccordion';
import { ContactsSection } from '~/shared/components/design-system/all-components/navigation-bar/mobile-nav/mobile-overlay/nav-contacts/NavContactsSection';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface MobileMenuOverlayProps {
  open: boolean;
  navLabels: NavigationDTO[];
  contacts: contactsData;
  socialLinks: LinkIcon[];
}

const MobileMenuOverlay = ({ open, navLabels, contacts, socialLinks }: MobileMenuOverlayProps) => {
  const { isMobile } = useBreakpoints();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = Array.from(
        document.querySelectorAll<HTMLElement>('header button, header a[href], header [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const navItems = useMemo<NavItem[]>(() => {
    return navLabels.map((group) => {
      const dropdown = group.links.map((link) => ({
        label: link.label,
        href: link.href
      }));

      if (dropdown.length === 1) {
        return {
          label: group.title,
          href: dropdown[0].href
        };
      }

      return {
        label: group.title,
        dropdown
      };
    });
  }, [navLabels]);

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit appear={false} timeout={600}>
      <Box
        ref={containerRef}
        data-testid={`MobileMenuOverlay${open ? '--open' : '--closed'}`}
        sx={styles.overlay}
        id="MobileMenuOverlay"
      >
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
