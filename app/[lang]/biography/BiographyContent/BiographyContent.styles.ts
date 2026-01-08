import { ImagesSizes } from '~/types/page/biography.types';

export const biographyContentStyles = {
  mainContainer: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    rowGap: { xs: '48px', sm: '64px', md: '80px' },
    marginBottom: '80px',
    marginTop: { xs: '96px', md: '128px', lg: '144px', ultra: '80px' }
  },

  imageAccentRectangle: {
    position: 'absolute',
    top: {
      xs: '-16px',
      sm: '-26px',
      md: '-38px',
      lg: '-40px',
      xl: '-36px'
    },
    left: {
      xs: '-16px',
      sm: '-24px',
      md: '-40px'
    },
    width: {
      xs: '32px',
      sm: '48px',
      md: '80px'
    },
    height: {
      xs: '122px',
      sm: '198px',
      md: '252px',
      lg: '336px'
    },
    backgroundImage: 'url(/icons/rectangleYellow.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: -1,
    pointerEvents: 'none'
  },

  leftImageVertical: {
    gridColumn: {
      xs: '1 / -1',
      md: '2 / 4'
    },
    justifySelf: 'start'
  },

  leftImageHorizontal: {
    gridColumn: {
      xs: '1 / -1',
      md: '1 / 4'
    },
    justifySelf: 'start'
  },

  chronologyListColumn: {
    width: '100%',
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '12px', sm: '16px' }
  },

  chronologyItemContainer: {
    gridTemplateColumns: 'none',
    gap: 'none'
  },

  ChronologyListItemText: {
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    lineHeight: '160%'
  },

  excerptBlock: {
    gridColumn: '1 / -1'
  },

  onlyImageLeft: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 3',
      md: '2 / 4'
    },
    width: 'fit-content'
  },

  onlyImageRight: {
    position: 'relative',
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    alignSelf: 'end'
  },

  imageContainer: {
    display: 'flex',
    flexDirection: 'column'
  },

  smallHorizontal: {
    width: { xs: 199, sm: 230, md: 307, lg: 392, xl: 448, xxl: 541 },
    height: { xs: 120, sm: 155, md: 207, lg: 276, xl: 316, xxl: 382 }
  },

  smallVerticalThin: {
    width: { xs: 144, sm: 194, md: 231, lg: 279, xl: 336, xxl: 363 },
    height: { xs: 188, sm: 288, md: 342, lg: 400, xl: 562, xxl: 520 }
  },

  smallVerticalWide: {
    width: { xs: 144, sm: 231, md: 231, lg: 253, xl: 336, xxl: 405 },
    height: { xs: 188, sm: 276, md: 276, lg: 302, xl: 436, xxl: 482 }
  },

  bigVertical: {
    width: { xs: 199, sm: 401, md: 496, lg: 646, xl: 744, xxl: 907 },
    height: { xs: 264, sm: 556, md: 640, lg: 834, xl: 960, xxl: 1170 }
  },

  bigHorizontal: {
    width: { xs: 199, sm: 400, md: 496, lg: 646, xl: 744 },
    height: { xs: 150, sm: 280, md: 350, lg: 452, xl: 506, xxl: 560 }
  },

  fullWidth: {
    width: { xs: 205, sm: 400, md: 496, lg: 646, xl: 1510, xxl: 1775, ultra: 2000 },
    height: { xs: 260, sm: 380, md: 500, lg: 650, xl: 730, xxl: 850, ultra: 950 }
  },

  fullWidthBlock: {
    gridColumn: '1 / -1'
  },

  fullWidthContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  fullWidthImage: {
    position: 'relative',
    left: '53%',
    right: '53%',
    marginLeft: '-55vw',
    marginRight: '-55vw',
    width: '105vw',
    maxWidth: '105vw',
    transform: 'rotate(-2deg)',
    overflow: 'visible'
  },

  leftImageCaption: {
    alignSelf: 'start',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '140%'
  },

  rigthImageCaption: {
    alignSelf: 'end',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '140%'
  }
} as const;

export function imageLeftPossition(key: ImagesSizes) {
  if (ImagesSizes.SmallHorizontal === key) {
    return biographyContentStyles.leftImageHorizontal;
  }
  return biographyContentStyles.leftImageVertical;
}
