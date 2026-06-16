import type { Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const enhancedTableRowStyles = {
  cell: (theme: Theme) => ({
    py: 1.5,
    px: 0,
    pl: { xs: 1, sm: 2, md: 0 },
    border: 'none',
    borderBottom: '2px solid',
    borderColor: alpha(theme.palette.blue?.[200] || '#D9DCE8', 0.4)
  })
};
