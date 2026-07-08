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
    gridTemplateColumns: 'subgrid',
    rowGap: {
      xs: '32px',
      sm: '0'
    }
  },

  rightColumn: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    gridRow: {
      xs: 'auto',
      sm: '1'
    },
    display: 'flex',
    flexDirection: 'column'
  }
};
