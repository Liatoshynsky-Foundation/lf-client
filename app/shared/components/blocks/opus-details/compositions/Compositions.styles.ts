import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  spacing: {
    mt: {
      xs: '16px',
      md: '24px'
    }
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
