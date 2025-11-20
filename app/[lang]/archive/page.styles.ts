export const styles = {
  pageWrapper: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    rowGap: 0,
    alignItems: 'start',
    gridAutoRows: 'min-content',
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    paddingTop: {
      xs: '80px',
      sm: '89px',
      lg: '95px',
      xl: '97px'
    }
  },
  fundsGrid: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '32px',
      lg: '40px'
    },
    paddingBottom: {
      xs: '80px',
      sm: '96px',
      md: '80px',
      lg: '96px'
    }
  }
};
