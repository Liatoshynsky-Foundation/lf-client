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
  onClose?: () => void;
  navLabels: NavigationDTO[];
  contacts: contactsData;
  socialLinks: LinkIcon[];
}

const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const header = container.closest('header') || document.querySelector('header') || container;

  const selector =
    'button:not([disabled]), a[href]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  return Array.from(header.querySelectorAll<HTMLElement>(selector)).filter((el) => {
    const isVisibleInLayout = Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    const isNotHiddenInStyle = el.style.display !== 'none' && el.style.visibility !== 'hidden';
    const isVisible = isVisibleInLayout || isNotHiddenInStyle;

    return isVisible && el.getAttribute('aria-hidden') !== 'true';
  });
};

const MobileMenuOverlay = ({ open, onClose, navLabels, contacts, socialLinks }: MobileMenuOverlayProps) => {
  const { isMobile } = useBreakpoints();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      if (containerRef.current) {
        const focusables = getFocusableElements(containerRef.current);
        focusables[0]?.focus();
      }
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = getFocusableElements(containerRef.current);

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

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
