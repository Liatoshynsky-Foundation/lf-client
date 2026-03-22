import { mainHexPallete } from '~/components/design-system/all-components/theme/colors';

export const styles = {
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: {
      xs: '80px',
      sm: '96px',
      md: '180px'
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
      sm: '4 / -1',
      md: '6 / -1'
    },
    mb: {
      xs: '57px',
      sm: '65px',
      md: '97px'
    }
  },
  card: {
    mb: {
      xs: '16px',
      sm: '0px',
      md: '8px'
    }
  },
  paymentMethodContainer: {
    display: 'flex',
    alignItems: { xs: 'flex-start', sm: 'center' },
    flexDirection: { xs: 'column', sm: 'row' }
  },
  label: {
    fontFamily: 'Mulish, Sans-serif',
    color: mainHexPallete.brown[600],
    letterSpacing: '0px',
    whiteSpace: 'pre-line',
    fontWeight: 600,
    lineHeight: '150%',
    fontSize: { xs: '16px', md: '20px' },
    width: '91px'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: { xs: 'flex-start', sm: 'center' },
    gap: '8px'
  },
  value: {
    fontFamily: 'Mulish, Sans-serif',
    fontSize: { xs: '16px', md: '20px' },
    fontWeight: 600,
    lineHeight: '150%',
    color: mainHexPallete.black,
    overflowWrap: 'anywhere',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: mainHexPallete.burgundy[800],
      cursor: 'pointer'
    },
    '&:active': {
      color: mainHexPallete.black
    }
  },
  img: {
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '6 / -1'
      // xl: '6 / -1'
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
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%',
      xl: '100%',
      xxl: '1001px'
    },
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%',
      xl: '100%',
      xxl: '806px',
      ultra: '1001px'
    }
  }
};

export const imageSizes = {
  sizes: {
    width: { xs: 224, sm: 457, md: 569, lg: 718, xl: 816, xxl: 979, ultra: 816 },
    height: { xs: 138, sm: 292, md: 336, lg: 498, xl: 498, xxl: 498, ultra: 498 }
  },
  border: {
    sizes: {
      width: { xs: 31, sm: 38, md: 57, lg: 80 },
      height: { xs: 134, sm: 134, md: 204, lg: 360 }
    },
    top: { xs: 16, sm: 20, md: 36, lg: 38, xl: 40 },
    left: { xs: 16, sm: 26, md: 41, lg: 40, xl: 40 },
    color: mainHexPallete.blue[300]
  },
  imageSx: {
    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', xxl: '806px', ultra: '1001px' },
    height: { xs: 'auto', sm: 'auto', md: 'auto' },
    aspectRatio: { xs: '224 / 138', sm: '457 / 292', md: '569 / 336' }
  }
};
