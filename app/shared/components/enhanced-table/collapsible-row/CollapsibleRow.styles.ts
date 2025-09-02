import type { SxProps, Theme } from '@mui/material';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';

const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);

export const collapsibleRowStyles = {
  row: (collapsed: boolean): SxProps<Theme> => ({
    py: collapsed ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'height 400ms ease',
    backgroundColor: collapsed ? mainHexPallete.blue[50] : 'transparent'
  }),

  // базова клітинка + "парасолька" для внутрішніх <TableCell>, щоб не було другого бордера
  cell: {
    py: 1.5,
    px: 0,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: `2px solid ${borderWithOpacity}`,
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      padding: 0
    }
  },

  cellInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },

  cellInnerCentered: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    pl: { xs: 1, sm: 2, md: 0 },
    justifyContent: {
      xs: 'flex-start',
      sm: 'flex-start',
      md: 'center'
    }
  },

  labelBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },

  collapsedCell: (collapsed: boolean): SxProps<Theme> => ({
    py: collapsed ? 1.5 : 0,
    px: 0,
    borderBottom: collapsed ? `2px solid ${borderWithOpacity}` : 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    backgroundColor: collapsed ? mainHexPallete.blue[75] : 'transparent'
  })
};
