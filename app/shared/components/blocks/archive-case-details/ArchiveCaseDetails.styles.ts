import type { SxProps, Theme } from '@mui/material/styles';

import { commonSx } from '~/shared/styles/commonSx';

export const styles: Record<string, SxProps<Theme>> = {
  gridContainer: commonSx.detailsGrid.gridContainer,

  sectionTitle: commonSx.detailsGrid.sectionTitle,

  contentGrid: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: 'subgrid'
  },

  pdfButtonWrapper: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '2 / 4',
      lg: '2 / 5'
    },
    gridRow: '2',

    position: {
      xs: 'static',
      sm: 'sticky'
    },

    top: {
      sm: '48px'
    },

    mt: '24px',
    alignSelf: 'flex-start',

    zIndex: {
      sm: 1
    }
  }
};
