import { SxProps, Theme } from '@mui/material';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const playCellSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.2s ease',
  visibility: 'hidden',
  opacity: 0,
  '.MuiTableRow-root:hover &': {
    visibility: 'visible',
    opacity: 1
  },
  [theme.breakpoints.down('md')]: {
    visibility: 'visible',
    opacity: 1
  }
});

export const headerTypographySx: SxProps<Theme> = {
  color: mainHexPallete.blue[800]
};

export const actionsCellContainerSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
  pr: { xs: 1, sm: 2, md: 5 }
};

export const iconButtonSecondaryOutlinedSx: SxProps<Theme> = {
  border: '1px solid black'
};

export const iconButtonSecondaryPlainSx: SxProps<Theme> = {
  bgcolor: 'none'
};

export const groupLabelCellSx = (border: string): SxProps<Theme> => ({
  pl: 0,
  pr: { xs: 1, sm: 2, md: 5 },
  borderBottom: `2px solid ${border}`
});

export const groupLabelRowSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};
