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
    minWidth: '40px',
    justifyContent: {
      xs: 'center',
      sm: 'space-between'
    },
    borderRadius: '28px',
    paddingInline: {
      xs: '5px',
      sm: '16px'
    },
    paddingBlock: {
      xs: '5px',
      sm: '8px'
    },
    borderColor: mainHexPallete.black,
    color: mainHexPallete.black,

    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      marginLeft: 0,
      marginRight: 0
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
    lineHeight: '150%'
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
