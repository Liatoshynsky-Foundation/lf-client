import { mainHexPallete } from '~/ds-components/theme/colors';

const commonTextStyle = {
  fontFamily: 'Mulish, Sans-serif',
  color: mainHexPallete.black,
  letterSpacing: '0px',
  whiteSpace: 'pre-line',
  fontSize: { xs: '16px', sm: '16px' }
};

const commonLinkStyle = {
  textDecoration: 'underline',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: '#5F0E0F',
    cursor: 'pointer'
  },

  '&:active': {
    color: mainHexPallete.black
  },

  '&.Mui-disabled, &[aria-disabled="true"], &:disabled': {
    color: mainHexPallete.blue[500],
    pointerEvents: 'none',
    textDecoration: 'underline'
  }
};

export const styles = {
  container: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: { xs: '32px', md: '40px' }
  },
  title: {
    ...commonTextStyle,
    fontWeight: 700,
    fontSize: { xs: '18px', sm: '20px' },
    lineHeight: '135%'
  },
  text: {
    ...commonTextStyle,
    fontWeight: 400,
    lineHeight: '150%'
  },
  weakText: {
    ...commonTextStyle,
    color: mainHexPallete.brown[700],
    marginRight: '10px'
  },
  link: {
    ...commonTextStyle,
    ...commonLinkStyle,
    marginTop: '2px'
  },
  linkContainer: {
    display: 'flex'
  },
  titleAndAddressCont: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      xs: '15px',
      sm: '17px'
    }
  }
};
