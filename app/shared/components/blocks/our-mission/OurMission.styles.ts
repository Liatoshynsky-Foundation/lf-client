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
    mb: {
      xs: '19px',
      sm: '74px',
      md: '100px'
    }
  },
  title: {
    marginBottom: {
      xs: '40px',
      md: '75px'
    }
  },
  list: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      lg: 'repeat(2, 1fr)'
    },
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / 8',
      md: '6 / 11',
      lg: '6 / -1'
    },
    gridRow: {
      sm: '2 / 5'
    },
    gap: {
      xs: '48px',
      md: '56px'
    },
    mb: {
      xs: '72px',
      sm: '132px',
      md: '164px',
      lg: '179px'
    }
  },
  smallImg: {
    gridColumn: {
      xs: '1 / 3',
      md: '1 / 5',
      xl: '1 / 4'
    },
    gridRow: {
      sm: '4 / 6'
    },
    mt: {
      md: '-62px',
      lg: '-78px',
      xl: '-20px'
    },
    mb: {
      xs: '56px'
    }
  },
  bigImg: {
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    gridRow: {
      sm: '5 / 7'
    },
    mb: {
      xs: '56px'
    }
  },
  smallCaptionSx: {
    mt: {
      sm: '15px'
    }
  },
  bigCaptionSx: {
    mt: {
      sm: '10px',
      md: '14px'
    }
  }
};
