export const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
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
    gridColumn: '1 / -1'
  },

  donationSection: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: 'subgrid'
  },

  donationFormWrapper: {
    pt: '43px',
    gridColumn: '1 / 6'
  },

  infoSection: {
    gridColumn: '7 / -1'
  },

  sectionSubtitle: {
    mb: '64px',
    textIndent: '50%',
    lineHeight: '160%'
  }
};
