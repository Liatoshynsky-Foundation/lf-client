import { mainHexPallete } from '~/ds-components/theme/colors';

const commonTextStyle = {
  fontFamily: 'Mulish, Sans-serif',
  color: mainHexPallete.black,
  letterSpacing: '0px',
  whiteSpace: 'pre-line',
  fontSize: { xs: '16px', sm: '16px' }
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
    lineHeight: '135%',
    textWrap: 'balance'
  },
  text: {
    ...commonTextStyle,
    fontWeight: 400,
    lineHeight: '150%'
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
