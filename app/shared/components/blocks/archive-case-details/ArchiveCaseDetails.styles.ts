import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
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
    gridColumn: '1 / -1'
  },

  contentGrid: {
    gridColumn: '1 / -1',
    display: 'contents'
  },

  pdfButtonWrapper: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '2 / 4',
      lg: '2 / 5'
    },
    gridRow: '4',
    position: 'sticky',
    top: {
      xs: '24px',
      sm: '48px'
    },
    mt: {
      xs: '8px',
      md: 0
    },
    mb: '40px',
    alignSelf: 'flex-start',
    zIndex: 1
  }
};
