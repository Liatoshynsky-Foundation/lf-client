import { AppTypography } from '~/constants';

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    margin: {
      xs: '80px 0 64px',
      sm: '105px 0 66px',
      md: '132px 0 52px',
      lg: '140px 0 54px'
    },
    position: 'relative'
  },

  title: {
    ...AppTypography.oswald64Semibold,
    display: 'flex',
    alignSelf: 'center',
    fontSize: {
      xs: '40px',
      md: '64px'
    },
    margin: {
      xs: '0 0 66px',
      sm: '20px 0 68px',
      md: '42px 0 50px',
      xl: '42px 0 127px'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '1 / 6',
      lg: '1 / 5'
    },
    gridRow: '1',
    lineHeight: {
      sm: '120%'
    }
  },

  photoContainer: {
    marginBottom: {
      xs: '40px',
      sm: 0
    },
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    gridRow: {
      xs: '2 / 3',
      sm: '1 / 3'
    }
  },

  quote: {
    gridRow: {
      xs: '3',
      sm: '2'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '1 / 6',
      lg: '1 / 5'
    },
    alignSelf: 'center',
    position: 'relative'
  },

  imageCaption: {
    display: {
      xs: 'none',
      md: 'block'
    }
  },

  imageContainer: {
    marginLeft: 0,
    gridColumn: {
      xs: '2 / -1',
      sm: 'auto'
    }
  },

  quoteBlock: {
    gap: { xs: '25px', md: '36px' }
  }
};
