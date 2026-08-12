import type { SxProps, Theme } from '@mui/material/styles';

import { commonSx } from '~/shared/styles/commonSx';

export const styles: Record<string, SxProps<Theme>> = {
  gridContainer: commonSx.detailsGrid.gridContainer,

  sectionTitle: commonSx.detailsGrid.sectionTitle,

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
