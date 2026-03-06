import { mainHexPallete } from '~/components/design-system/all-components/theme/colors';

export const styles = {
  mainContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    my: { sm: '104px', md: '128px', lg: '144px' },
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  },
  textStyle: {
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    },
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  },
  img: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / 12'
    },
    gridRow: {
      sm: '5 / 7'
    },
    mb: {
      xs: '56px'
    },
    mt: {
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

export const imageSizes = {
  sizes: {
    width: { xs: 224, sm: 457, md: 569, lg: 718, xl: 816, xxl: 979, ultra: 816 },
    height: { xs: 175, sm: 292, md: 336, lg: 498, xl: 498, xxl: 498, ultra: 498 }
  },
  border: {
    sizes: {
      width: { xs: 31, sm: 38, md: 57, lg: 80 },
      height: { xs: 134, sm: 134, md: 204, lg: 360 }
    },
    top: { xs: 16, sm: 20, md: 36, lg: 38, xl: 40 },
    left: { xs: 16, sm: 26, md: 41, lg: 40, xl: 40 },
    color: mainHexPallete.yellow[300]
  },
  imageSx: {
    width: { xs: '272px', sm: '400px', md: '496px', lg: '645px', xl: '744px', xxl: '806px', ultra: '1001px' }
  }
};
