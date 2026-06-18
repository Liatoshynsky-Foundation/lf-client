import { alpha, SxProps, Theme } from '@mui/material/styles';

const PrimaryIconStyles = {
  color: 'black',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'brown.50'
  },
  '&:active': {
    backgroundColor: 'brown.200'
  },
  '&:disabled': {
    color: 'blue.700'
  }
};

const SecondaryIconStyles = (theme: Theme) => ({
  color: 'white',
  backgroundColor: 'black',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.16)
  },
  '&:focused': {
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.34)
  },
  '&:pressed': {
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.12)
  },
  '&:disabled': {
    color: 'blue.700'
  }
});

export const IconButtonStyles = {
  primary: {
    fontSize: '0',
    color: 'white',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black'
    },
    '&:disabled': {
      color: 'blue.700',
      backgroundColor: 'blue.200'
    }
  },
  primaryIcon: {
    fontSize: '0',
    ...PrimaryIconStyles
  },
  primaryOutlined: {
    fontSize: '0',
    ...PrimaryIconStyles,
    border: '1px solid',
    borderColor: 'black'
  },
  secondary: {
    fontSize: '0',
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white'
    },
    '&:disabled': {
      color: 'blue.700',
      backgroundColor: 'blue.200'
    }
  },
  secondaryIcon: {
    fontSize: '0',
    ...SecondaryIconStyles
  },
  secondaryOutlined: {
    fontSize: '0',
    ...SecondaryIconStyles,
    border: '1px solid',
    borderColor: 'white'
  },
  tertiary: {
    fontSize: '0',
    color: 'black',
    backgroundColor: 'yellow.500',
    '&:hover': {
      color: 'white',
      backgroundColor: 'black'
    },
    '&:focused': {
      // Исправили :focused
      color: 'black',
      backgroundColor: 'yellow.500'
    },
    '&:active': {
      color: 'black',
      backgroundColor: 'yellow.500'
    },
    '&:disabled': {
      color: 'blue.700',
      backgroundColor: 'blue.200'
    }
  },
  error: ((theme: Theme) => ({
    fontSize: '0',
    color: 'error.main',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, 0.08)
    },
    '&:active': {
      backgroundColor: alpha(theme.palette.error.main, 0.08)
    },
    '&:disabled': {
      color: 'blue.700'
    }
  })) as SxProps<Theme>
};
