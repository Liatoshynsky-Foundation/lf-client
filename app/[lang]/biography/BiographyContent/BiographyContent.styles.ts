export const biographyContentStyles = {
  mainContainer: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    rowGap: { xs: '40px', md: '64px' },
    marginBottom: '160px'
  },

  blockContainer: {
    display: 'contents'
  },

  chronologyImageColumn: {
    gridColumn: {
      xs: '1 / -1',
      md: '1 / 7'
    },
    justifySelf: 'start'
  },

  chronologyListColumn: {
    width: { xs: '100%', sm: '400px', md: '496px', lg: '646px', xl: '744px', xxl: '906px' },
    gridColumn: {
      xs: '1 / -1',
      sm: '7 / -1'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '12px', sm: '16px' },
    '& *': {
      fontSize: { xs: '16px', sm: '18px', md: '20px' }
    },
    lineHeight: '160%'
  },

  chronologyListRow: {
    display: 'flex'
  },

  excerptBlock: {
    gridColumn: '1 / -1'
  },

  onlyImageLeft: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 3',
      md: '2 / 4',
      lg: '2 / 4',
      xl: '2 / 4',
      xxl: '2 / 4'
    },
    width: 'fit-content'
  },

  onlyImageRight: {
    gridColumn: {
      xs: '2 / -1',
      sm: '7 / -1',
      md: '7 / -1',
      lg: '7 / -1',
      xl: '7 / -1',
      xxl: '7 / -1'
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
    width: { xs: 199, sm: 400, md: 496, lg: 646, xl: 744, xxl: 744 },
    height: { xs: 120, sm: 244, md: 302, lg: 394, xl: 454, xxl: 490 }
  },

  fullWidth: {
    width: { xs: 199, sm: 400, md: 496, lg: 646, xl: 1510, xxl: 1775, ultra: 1955 },
    height: { xs: 120, sm: 244, md: 302, lg: 394, xl: 741, xxl: 870, ultra: 870 }
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
    marginLeft: '-53vw',
    marginRight: '-53vw',
    width: '103vw',
    maxWidth: '103vw',
    transform: 'rotate(-2deg)',
    overflow: 'visible'
  },

  imageCaption: {
    alignSelf: 'end'
  }
} as const;
