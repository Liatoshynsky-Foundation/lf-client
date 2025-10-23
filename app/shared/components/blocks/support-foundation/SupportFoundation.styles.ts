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
    mt: '120px'
  },

  sectionTitle: {
    mb: '34px',
    gridColumn: { xs: '1 / -1', sm: '1 / -1' },
    fontSize: {
      xs: '36px',
      lg: '64px'
    }
  },

  donationSection: {
    display: 'grid',
    gridColumn: { xs: '1', md: '1 / 7', lg: '1 / -1' },
    gridTemplateColumns: {
      xs: '90vw',
      sm: 'subgrid'
    }
  },

  donationFormWrapper: {
    pt: '43px',
    gridColumn: { xs: '1', md: '1 / 4' },
    maxWidth: { xs: 320, sm: 'none' }
  },

  infoSection: {
    width: '100%',
    mt: { xs: '70px', lg: 0 },
    gridColumn: { xs: '1 / 1', md: '1 / 7', lg: '7 / -1' }
  },
  sectionSubtitle: {
    mb: { xs: '32px', sm: '64px' },
    textAlign: { xs: 'left', lg: 'right' },
    textIndent: { xs: '15%', sm: '10%', lg: '25%' },
    lineHeight: '160%'
  }
};
