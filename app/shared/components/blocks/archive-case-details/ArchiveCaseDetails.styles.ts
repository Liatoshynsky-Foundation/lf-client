import type { SxProps, Theme } from '@mui/material/styles';

import { commonSx } from '~/shared/styles/commonSx';

export const styles: Record<string, SxProps<Theme>> = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    columnGap: commonSx.layout.standardGrid.columnGap,
    gridColumn: '1 / -1',
    mt: {
      xs: '32px',
      sm: '88px'
    },
    mb: {
      xs: '96px',
      sm: '104px'
    },
    rowGap: {
      xs: '16px',
      sm: '24px'
    }
  },

  sectionTitle: {
    fontFamily: 'Oswald',
    fontSize: {
      xs: '24px',
      md: '40px'
    },
    fontWeight: 700,
    lineHeight: {
      xs: '160%',
      md: '120%'
    },
    textTransform: 'uppercase',
    mb: {
      xs: '0',
      md: '32px'
    },
    gridColumn: '1 / -1'
  },

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
