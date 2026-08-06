import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  wrapper: {
    display: 'contents'
  },

  sectionTitle: {
    mb: { xs: '48px', sm: '32px' },
    gridColumn: '1 / -1',
    mt: { xs: '80px', sm: '108px', md: '156px', lg: '121px' },
    fontSize: commonSx.layout.typography.heroTitle
  },

  donationFormWrapper: {
    gridColumn: { xs: '1 / -1', md: '1 / 11', lg: '1 / 6' },
    height: '565px'
  },

  infoSection: {
    width: '100%',
    mt: { xs: '70px', lg: 0 },
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 8',
      md: '1 / -5',
      lg: '7 / -1'
    }
  },

  sectionSubtitle: {
    width: '100%',
    mb: { xs: '32px', sm: '64px' },
    textAlign: 'left',
    textIndent: { xs: '26%', sm: '15%', md: '14%', lg: '60%', xl: '35%' },
    lineHeight: '160%',
    color: 'brown.700'
  }
};
