import { mainHexPallete } from '~/components/design-system/all-components/theme/colors';

import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  mainContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    my: { xs: '80px', sm: '96px', md: '112px', lg: '144px' },
    ...commonSx.layout.standardGrid
  },
  textStyle: {
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  },
  stickyButtonWrapper: {
    gridColumn: { xs: '1/-1', sm: '4/-1', md: '1/6' },
    gridRow: { md: '2/7' },
    position: { md: 'sticky' },
    top: { md: '96px' },
    alignSelf: { md: 'start' },
    display: 'flex',
    justifyContent: { xs: 'flex-start', md: 'flex-end' },
    alignItems: 'flex-start'
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
      width: { xs: 24, sm: 24, md: 41, lg: 41 },
      height: { xs: 139, sm: 153, md: 272, lg: 346 }
    },
    top: { xs: 12, sm: 20, md: 20, lg: 20, xl: 20 },
    left: { xs: 12, sm: 12, md: 20, lg: 20, xl: 20 },
    color: mainHexPallete.yellow[300]
  },
  imageSx: {
    width: { xs: '272px', sm: '400px', md: '496px', lg: '645px', xl: '744px', xxl: '806px', ultra: '1001px' }
  }
};
