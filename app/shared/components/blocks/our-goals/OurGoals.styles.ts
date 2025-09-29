export const styles = {
  mainContainer: {
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
    mb: { xs: '108px', sm: '130px', md: '148px', lg: '175px', xxl: '230px' }
  },

  goalsGrid: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row'
    },
    flexWrap: {
      lg: 'wrap'
    },
    gridColumn: { xs: '2 / -1', sm: '4 / 8', md: '6 / 12', lg: '6 / -1' },
    gap: {
      xs: '47px',
      md: '56px'
    },
    mt: { xs: '40px', md: '75px' }
  },

  cardWithIcon: {
    display: 'flex',
    gap: { xs: '6px', sm: '16px', md: '20px' },
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
