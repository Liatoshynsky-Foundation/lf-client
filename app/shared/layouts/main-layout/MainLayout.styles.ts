import type { SxProps, Theme } from '@mui/material/styles';

import { commonSx } from '~/shared/styles/commonSx';

export const styles: Record<string, SxProps<Theme>> = {
  wrapper: {
    width: '100%',
    maxWidth: '1728px',
    minHeight: 'inherit',
    m: '0 auto',
    position: 'relative',
    pt: {
      xs: '70px',
      sm: '82px',
      md: '100px',
      lg: '92px'
    },
    px: {
      xs: '24px',
      sm: '56px',
      md: '72px'
    }
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: commonSx.layout.standardGrid.gridTemplateColumns,
    columnGap: commonSx.layout.standardGrid.columnGap
  }
};
