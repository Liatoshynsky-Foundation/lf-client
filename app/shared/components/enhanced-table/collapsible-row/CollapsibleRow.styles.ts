import { SxProps, Theme } from '@mui/material';

import { mainHexPallete } from '../../design-system/all-components/theme/colors';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';

const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);

export const collapsibleRowStyles = {
  row: (collapsed: boolean): SxProps<Theme> => ({
    py: collapsed ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'height 400ms ease',
    backgroundColor: collapsed ? mainHexPallete.blue[75] : 'transparent'
  }),
  cell: {
    py: 2,
    px: 0,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: `2px solid ${borderWithOpacity}`
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
    borderBottom: collapsed ? `2px solid ${borderWithOpacity}` : 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    backgroundColor: collapsed ? mainHexPallete.blue[75] : 'transparent'
  })
};
