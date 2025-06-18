export const styles = {
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: { xs: '116px', md: '104px', lg: '132px', xxl: '196px' }
  },

  goalsGrid: {
    display: 'grid',
    gridColumn: { xs: '2 / 4', sm: '4 / 8', md: '6 / 12' },
    gridTemplateColumns: {
      xs: '1fr',
      lg: '1fr 1fr'
    },
    gap: {
      xs: '48px',
      md: '56px'
    },
    mt: { xs: '40px', md: '72px' }
  },

  cardWithIcon: {
    display: 'flex',
    gap: { xs: '16px', md: '20px' },
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
