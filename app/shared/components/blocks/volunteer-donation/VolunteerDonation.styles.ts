export const styles = {
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: {
      xs: '16px',
      sm: '74px',
      md: '100px'
    }
  },
  title: {
    marginBottom: {
      xs: '24px',
      md: '40px',
      xxl: '40px'
    }
  },
  contentWrapper: {
    gridColumn: {
      xs: '1 / 5',
      sm: '3 / 8',
      md: '6 / 11',
      lg: '6 / 12'
    },
    mb: {
      xs: '40px',
      md: '60px',
      xxl: '136px'
    }
  },
  card: {
    mb: {
      xs: '16px',
      md: '24px'
    }
  },
  paypalLink: {
    display: 'inline-block',
    textDecoration: 'underline',
    '&:hover': {
      opacity: 0.8
    }
  },
  img: {
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / -1',
      md: '6 / 12'
    },
    gridRow: {
      sm: '5 / 7'
    },
    mb: {
      xs: '56px'
    }
  },
  captionSx: {
    mt: {
      xs: '9px',
      sm: '10px',
      md: '14px'
    },
    maxWidth: {
      xs: '224px',
      sm: '457px',
      md: '569px',
      lg: '718px',
      xl: '816px',
      xxl: '1001px'
    },
    width: {
      xs: '200px',
      sm: '400px',
      md: '496px',
      lg: '645px',
      xl: '744px',
      xxl: '806px',
      ultra: '1001px'
    }
  }
};
