import { SxProps, Theme } from '@mui/material';

import { mainHexPallete } from '../../design-system/all-components/theme/colors';

export const collapsibleRowStyles = {
  row: (collapsed: boolean): SxProps<Theme> => ({
    height: collapsed ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'height 400ms ease'
  }),
  cell: {
    py: 2,
    px: 0,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: `2px solid ${mainHexPallete.blue[200]}`
  },
  cellInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  labelBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  collapsedCell: (collapsed: boolean): SxProps<Theme> => ({
    py: collapsed ? 2 : 0,
    px: 0,
    borderBottom: collapsed ? `2px solid ${mainHexPallete.blue[200]}` : 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none'
  })
};
