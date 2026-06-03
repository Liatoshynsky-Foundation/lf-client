import type { SxProps, Theme } from '@mui/material/styles';

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
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  }
};
