import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gridColumn: '1 / -1',
    mb: {
      xs: '8px',
      sm: '0px'
    }
  },

  link: {
    p: '0px',
    gap: '0px',
    transition: 'border-bottom 0.3s ease-in-out',
    borderBottom: '1px solid transparent',
    '&:hover': {
      borderBottom: '1px solid',
      borderColor: 'blue.800'
    }
  },

  label: {
    fontSize: '16px',
    lineHeight: '150%',
    fontWeight: 500,
    color: 'blue.800',
    '&:hover': {
      borderBottom: 'none'
    }
  },

  icon: {
    flexShrink: 0
  }
};
