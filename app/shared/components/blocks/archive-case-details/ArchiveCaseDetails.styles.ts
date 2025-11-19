import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    gridColumn: '1 / -1',
    mt: {
      xs: '32px',
      md: '88px'
    },
    mb: {
      xs: '96px',
      md: '104px'
    },
    rowGap: {
      xs: '16px',
      md: '24px'
    }
  },

  sectionTitle: {
    fontFamily: 'Oswald',
    fontSize: {
      xs: '24px',
      md: '40px'
    },
    fontWeight: 700,
    lineHeight: {
      xs: '160%',
      md: '120%'
    },
    textTransform: 'uppercase',
    mb: {
      sm: '8px',
      md: '32px'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / -1'
    }
  },

  contentGrid: {
    gridColumn: '1 / -1',
    display: 'contents'
  }
};
