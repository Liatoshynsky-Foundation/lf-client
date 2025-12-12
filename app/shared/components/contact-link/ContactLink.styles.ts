import type { SxProps, Theme } from '@mui/material';

import { mainHexPallete } from '~/ds-components/theme/colors';

const commonLinkBaseStyles = {
  fontFamily: 'Mulish, Sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '110%',
  transition: 'color 0.2s ease',
  textDecoration: 'none'
};

const commonTextStyle = {
  fontFamily: 'Mulish, Sans-serif',
  color: mainHexPallete.black,
  letterSpacing: '0px',
  whiteSpace: 'pre-line',
  fontSize: { xs: '16px', sm: '16px' }
};

const getCommonLinkStates = (palette = mainHexPallete) => ({
  color: palette.black,
  '&:hover': {
    color: '#5F0E0F',
    cursor: 'pointer'
  },

  '&:active': {
    color: palette.black
  },

  '&.Mui-disabled, &[aria-disabled="true"]': {
    color: palette.blue[500],
    pointerEvents: 'none',
    textDecoration: 'none'
  }
});

const commonLinkStates = getCommonLinkStates(mainHexPallete);

export const getContentBoxStyle = (direction: 'row' | 'column'): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: direction,
  alignItems: direction === 'column' ? 'flex-start' : 'center',
  gap: direction === 'column' ? 0 : '8px',
  width: '100%'
});

export const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative'
  },

  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: 'rgba(25, 13, 3, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },

  weakText: {
    ...commonTextStyle,
    color: mainHexPallete.brown[700]
  },

  weakTextSmall: {
    ...commonTextStyle,
    color: mainHexPallete.brown[700],
    marginRight: '4px'
  },

  valueBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  link: {
    ...commonLinkBaseStyles,
    ...commonLinkStates
  },

  mobileStretchedLink: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      cursor: 'pointer'
    }
  }
};
