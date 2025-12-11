export const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: '1fr',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    gridColumn: '1 / -1',
    mt: { xs: '80px', sm: '108px', md: '156px', lg: '121px' }
  },

  sectionTitle: {
    mb: { xs: '48px', sm: '32px' },
    gridColumn: { xs: '1 / -1', sm: '1 / -1' },
    fontSize: {
      xs: '40px',
      md: '64px'
    }
  },

  donationSection: {
    display: 'grid',
    gridColumn: { xs: '1', md: '1 / 9', lg: '1 / -1' },
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  },

  donationFormWrapper: {
    gridColumn: { xs: '1', md: '1 / 11', lg: '1/6' },
    height: '565px'
  },

  infoSection: {
    width: '100%',
    mt: { xs: '70px', lg: 0 },
    gridColumn: { xs: '1 / -1', sm: '1/ 6', md: '1 / -1', lg: '7 / -1' }
  },
  sectionSubtitle: {
    width: '100%',
    mb: { xs: '32px', sm: '64px' },
    textAlign: 'left',
    textIndent: { xs: '15%', sm: '10%', lg: '25%' },
    lineHeight: '160%'
  }
};
