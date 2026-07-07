import type { Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const enhancedTableHeaderStyles = {
  row: (theme: Theme) => ({
    borderBottom: '1px solid',
    borderColor: alpha(theme.palette.blue?.[200] || '#D9DCE8', 0.4)
  }),

  cell: {
    py: 3,
    px: 0,
    border: 'none'
  }
};
