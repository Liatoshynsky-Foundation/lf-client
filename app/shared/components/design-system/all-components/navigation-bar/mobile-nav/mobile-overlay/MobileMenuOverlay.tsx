import { Box, Slide /*, Typography*/ } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { NavAccordion } from '../../../menu-title/NavAccordion';
import { styles } from './MobileNavOverlay.styles';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import { ColumnGuides } from '~/shared/components/column-guides/ColumnGuides';

interface MobileMenuOverlayProps {
  open: boolean;
  navLabels: NavigationDTO[];
}

const MobileMenuOverlay = ({ open, navLabels }: MobileMenuOverlayProps) => {
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

        <Box sx={styles.leftColumn}></Box>
        <Box sx={styles.rightColumn}>
          <NavAccordion
            navLabels={navItems}
            sx={{
              position: 'absolute',
              top: { sm: 'calc(50vh - 80px)', md: 'calc(50vh - 110px)' }
            }}
          />
        </Box>
      </Box>
    </Slide>
  );
};

export default MobileMenuOverlay;
