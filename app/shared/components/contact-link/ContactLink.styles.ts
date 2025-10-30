import { mainHexPallete, rgbButtonColors } from '~/ds-components/theme/colors';

const commonLinkBaseStyles = {
  fontFamily: 'Mulish, Sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '110%',
  textDecoration: 'underline',
  transition: 'color 0.2s ease'
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
const pressedBg = rgbButtonColors.primaryOutlinedPressedBackground;

export const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  iconButton: {
    backgroundColor: pressedBg,
    '&:disabled': {
      backgroundColor: pressedBg
    }
  },

  weakText: {
    ...commonTextStyle,
    color: mainHexPallete.brown[700]
  },

  link: {
    ...commonLinkBaseStyles,
    ...commonLinkStates
  }
};
