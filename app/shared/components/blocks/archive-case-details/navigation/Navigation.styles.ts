import type { SxProps, Theme } from '@mui/material/styles';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    gridColumn: '1 / -1',
    mt: {
      xs: '32px',
      md: '40px'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '16px'
  },

  navItemLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },

  navItemRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    textAlign: 'right',
    marginLeft: 'auto'
  },

  navButton: {
    minWidth: 0,
    width: {
      xs: '40px',
      sm: 'auto'
    },
    height: {
      xs: '40px',
      sm: 'auto'
    },
    justifyContent: {
      xs: 'center',
      sm: 'space-between'
    },
    color: mainHexPallete.black,
    borderRadius: '28px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: mainHexPallete.black,
    padding: {
      xs: '0',
      sm: '8px 20px'
    },

    '&:hover': {
      background: mainHexPallete.blue[100]
    }
  },

  navIcon: {
    flexShrink: 0,
    width: {
      xs: '24px',
      sm: '20px'
    },
    height: {
      xs: '24px',
      sm: '20px'
    }
  },

  navButtonLabel: {
    display: {
      xs: 'none',
      sm: 'inline'
    },
    fontSize: '16px',
    lineHeight: '150%',

    '&:hover': {
      border: '0'
    }
  },

  navMetaLeft: {
    mt: '8px',
    ml: {
      xs: '0px',
      sm: '46px'
    },
    color: mainHexPallete.blue[700]
  },

  navMetaRight: {
    mt: '8px',
    mr: {
      xs: '0px',
      sm: '46px'
    },
    color: mainHexPallete.blue[700]
  },

  navCaseIndex: {
    fontFamily: 'Mulish',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '150%',
    textTransform: 'lowercase'
  },

  navCaseTitle: {
    fontFamily: 'Mulish',
    fontSize: '14px',
    lineHeight: '150%'
  }
};
