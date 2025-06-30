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

export const styles = {
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: { xs: '116px', md: '104px', lg: '132px', xxl: '196px' },
    mt: { xs: '120px', sm: '116px', md: '128px' }
  },

  grid: {
    display: 'grid',
    gridColumn: { xs: '2 / 4', sm: '4/7', md: '6 / 10', lg: '3 / 12' },
    gridTemplateColumns: {
      xs: '1fr',
      lg: '1fr 1fr 1fr'
    },
    gap: '40px',
    rowGap: {
      xs: '48px',
      md: '56px'
    },
    mt: { xs: '40px', md: '72px' }
  },

  item: {
    display: 'flex',
    gap: { xs: '16px', md: '20px' },
    alignItems: 'flex-start'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      xs: '48px',
      md: '56px'
    }
  },

  icon: {
    width: {
      xs: '12px',
      md: '16px'
    },
    height: {
      xs: '12px',
      md: '16px'
    },
    marginTop: { xs: '6px', lg: '8px' },
    flexShrink: 0,
    position: 'relative'
  }
};
