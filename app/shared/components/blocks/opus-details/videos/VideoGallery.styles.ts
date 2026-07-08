import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  spacing: {
    mt: {
      xs: '24px',
      md: '48px'
    }
  },

  grid: {
    gridColumn: '1 / -1',
    gridRow: {
      md: '2'
    },
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(4, 1fr)'
    },
    gap: {
      xs: '16px',
      md: '24px'
    }
  }
};
