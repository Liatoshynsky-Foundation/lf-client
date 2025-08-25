import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import { oswald } from '~/shared/components/design-system/all-components/theme/Theme';

export const styles = {
  root: {
    gridColumn: '1 / -1',
    background: '#F2EEE8',
    p: { xs: '20px 24px', sm: '20px 56px', md: '20px 72px' },
    m: { xs: '-20px -24px', sm: '-20px -56px', md: '-20px -72px' }
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    mt: { xs: '120px', md: '136px' },
    mb: { xs: '45px', sm: '160px' },
    flexDirection: { xs: 'column', sm: 'row' }
  },

  title: {
    fontSize: { xs: '40px', md: '64px' },
    lineHeight: '120%'
  },

  contactsInfoWrapper: {
    pt: '56px'
  },

  contactsDetails: {
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    gap: { xs: '16px', lg: '68px' },
    mt: '40px',

    h6: {
      color: mainHexPallete.brown[700]
    },

    a: {
      lineHeight: '110%'
    }
  },

  contacts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  socialMediaWrapper: {
    mt: '40px',
    mb: '72px',

    h6: {
      mb: '10px'
    }
  },

  formWrapper: {
    backgroundColor: mainHexPallete.white,
    clipPath: { xs: 'polygon(0 1%, 100% 0%, 100% 99%, 0% 100%)', sm: 'polygon(0 3%, 100% 0%, 100% 97%, 0% 100%)' },
    padding: { xs: '40px 24px 80px', sm: '64px 32px', md: '75px 53px', lg: '93.5px 95.5px' },
    margin: { xs: '0px -24px', sm: 'unset' },
    maxWidth: { sm: '400px', md: '496px', lg: '744px' }
  },

  formTitle: {
    fontFamily: oswald.style.fontFamily,
    color: mainHexPallete.brown[900],
    textTransform: 'uppercase',
    mb: '8px',
    fontSize: { xs: '20px', md: '28px' }
  },

  formSubtitle: {
    color: mainHexPallete.brown[700],
    textIndent: { xs: '70px', md: '240px' },
    mb: '24px',
    fontSize: { xs: '16px', md: '18px' }
  }
};
