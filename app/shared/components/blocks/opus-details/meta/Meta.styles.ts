import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '2 / 4',
      lg: '2 / 5'
    },
    gridRow: {
      xs: 'auto',
      sm: '1'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: {
      xs: '24px',
      md: '32px'
    }
  },

  metaBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },

  metaLabel: {
    fontFamily: 'Mulish',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    color: 'brown.500'
  },

  metaValue: {
    fontFamily: 'Mulish',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '110%',
    color: 'black'
  },

  metaValueAccent: {
    fontFamily: 'Mulish',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '110%',
    color: 'black',
    textDecoration: 'underline',
    textUnderlineOffset: '4px'
  },

  movements: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },

  movementItem: {
    fontFamily: 'Mulish',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '150%',
    color: 'black'
  }
};
