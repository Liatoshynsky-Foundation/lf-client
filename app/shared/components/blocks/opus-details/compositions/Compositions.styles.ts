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
      xs: '16px',
      md: '24px'
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

  list: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    gridRow: {
      md: '2'
    },
    listStyle: 'none',
    m: 0,
    p: 0,
    display: 'flex',
    flexDirection: 'column'
  },

  item: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    alignItems: {
      xs: 'flex-start',
      sm: 'center'
    },
    justifyContent: 'space-between',
    gap: {
      xs: '12px',
      sm: '16px'
    },
    py: '16px',
    borderBottom: '1px solid',
    borderColor: 'brown.100'
  },

  title: {
    flex: '1 1 auto',
    minWidth: 0,
    fontFamily: 'Mulish',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    color: 'black'
  },

  buttonCell: {
    flexShrink: 0
  }
};
