import { SxProps, Theme } from '@mui/material';

export const collapsibleRowStyles = {
  row: (collapsed: boolean): SxProps<Theme> => ({
    height: collapsed ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'height 400ms ease'
  }),
  cell: {
    py: 2,
    px: 0,
    borderBottom: '2px solid rgba(217, 220, 232, 0.4)',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none'
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
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none'
  }),
  collapsedContent: {
    px: 0,
    py: 1
  }
};
