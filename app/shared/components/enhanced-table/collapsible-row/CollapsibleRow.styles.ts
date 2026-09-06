import type { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const collapsibleRowStyles = {
  row: (isExpanded: boolean): SxProps<Theme> => ({
    py: isExpanded ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'height 400ms ease',
    backgroundColor: isExpanded ? 'blue.75' : 'transparent',
    cursor: 'pointer'
  }),

  cell: (theme: Theme) => ({
    py: 1.5,
    px: 0,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: '2px solid',
    borderColor: alpha(theme.palette.blue?.[200] || '#D9DCE8', 0.4),
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      padding: 0
    }
  }),

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

  toggleButton: {
    bgcolor: 'none',
    '&:focus-visible': {
      outline: '2px solid black'
    }
  },

  labelBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },

  expandedCell: (isExpanded: boolean): SxProps<Theme> => {
    return (theme) => ({
      py: isExpanded ? 1.5 : 0,
      px: 0,
      borderBottom: isExpanded ? '2px solid' : 'none',
      borderColor: isExpanded ? alpha(theme.palette.blue?.[200] || '#D9DCE8', 0.4) : 'transparent',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      backgroundColor: isExpanded ? 'blue.75' : 'transparent'
    });
  }
};
