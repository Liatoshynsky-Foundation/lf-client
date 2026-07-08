import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    rowGap: {
      xs: '16px',
      md: '24px'
    },
    mt: {
      xs: '24px',
      md: '48px'
    }
  },

  headingRow: {
    gridColumn: '1 / -1',
    display: {
      xs: 'flex',
      md: 'contents'
    },
    alignItems: 'center',
    gap: '10px'
  },

  accent: {
    gridColumn: {
      md: '1 / 2'
    },
    gridRow: {
      md: '1'
    },
    display: 'flex',
    alignItems: 'center'
  },

  noteHead: {
    width: {
      xs: '22px',
      md: '32px'
    },
    height: {
      xs: '15px',
      md: '22px'
    },
    borderRadius: '50%',
    backgroundColor: 'yellow.500',
    transform: 'rotate(-20deg)',
    flexShrink: 0
  },

  heading: {
    gridColumn: {
      md: '6 / -1'
    },
    gridRow: {
      md: '1'
    },
    fontFamily: 'Oswald',
    fontSize: {
      xs: '20px',
      md: '28px'
    },
    fontWeight: 700,
    lineHeight: '120%',
    textTransform: 'uppercase',
    color: 'black'
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
