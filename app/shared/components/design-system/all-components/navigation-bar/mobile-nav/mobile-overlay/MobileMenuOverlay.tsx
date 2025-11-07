import { Box, Slide } from '@mui/material';
import { useEffect } from 'react';

import { styles } from './MobileNavOverlay.styles';

import { ColumnGuides } from '~/shared/components/column-guides/ColumnGuides';

interface MobileMenuOverlayProps {
  open: boolean;
}

const MobileMenuOverlay = ({ open }: MobileMenuOverlayProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit timeout={600}>
      <Box sx={styles.overlay}>
        <ColumnGuides lineColor="rgba(239, 233, 224, 0.3)" />
      </Box>
    </Slide>
  );
};

export default MobileMenuOverlay;
