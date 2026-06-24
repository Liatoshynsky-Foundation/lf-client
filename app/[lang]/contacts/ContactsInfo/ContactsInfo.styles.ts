import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  root: {
    mt: { xs: '35px', sm: '70px' },
    mb: { xs: '55px', sm: '90px', md: '105px' },
    gridColumn: '1 / -1',
    maxWidth: '1728px',
    width: '100%',
    mx: 'auto'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: { xs: 'column', sm: 'row' }
  },

  titleMain: {
    fontSize: commonSx.layout.typography.heroTitle,
    lineHeight: '120%'
  },

  title: {
    fontSize: '20px',
    fontFamily: 'Oswald',
    fontWeight: 700,
    lineHeight: '160%',
    color: mainHexPallete.black,
    textTransform: 'uppercase',
    maxWidth: '305px'
  },

  contactsInfoWrapper: {
    pt: { xs: '80px', lg: '116px' }
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
  contactLabel: {
    fontSize: '18px'
  },
  formWrapper: {
    padding: { xs: '40px 24px 80px', sm: '64px 32px', md: '75px 53px', lg: '75px 96px' },
    margin: { xs: '0px -24px', sm: 'unset' },
    maxWidth: { sm: '400px', md: '496px', lg: '646px', xl: '744px' },
    width: { xs: '100vw', sm: '100%' },
    backgroundColor: mainHexPallete.white
  }
};
