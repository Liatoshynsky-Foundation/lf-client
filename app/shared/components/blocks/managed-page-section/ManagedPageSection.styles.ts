export const styles = {
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: { xs: '110px', sm: '130px', md: '148px', lg: '175px', xl: '169px', xxl: '228px' }
  },

  items: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: { xs: '2 / -1', sm: '4 / 8', md: '6 / 11', lg: '6 / -1' },
    gap: {
      xs: '24px',
      md: '32px'
    },
    mt: { xs: '40px', md: '75px' }
  },

  bulletItem: {
    display: 'flex',
    gap: { xs: '8px', sm: '16px', md: '20px' },
    alignItems: 'flex-start'
  },

  iconWrapper: {
    flexShrink: 0,
    marginTop: { xs: '6px', lg: '8px' },
    position: 'relative',
    width: {
      xs: '12px',
      md: '16px'
    },
    height: {
      xs: '12px',
      md: '16px'
    }
  }
};

export const iconSizes = {
  width: {
    xs: 12,
    md: 16
  },
  height: {
    xs: 16,
    md: 16
  }
};
