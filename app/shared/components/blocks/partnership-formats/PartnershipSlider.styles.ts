export const sliderStyles = {
  container: {
    width: '100%',
    overflow: 'hidden',
    mb: {
      xs: '24px'
    }
  },
  sliderWrapper: {
    width: '100%',
    py: '8px',
    position: 'relative',
    touchAction: 'pan-y'
  },
  slidesContainer: {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out',
    willChange: 'transform'
  },
  slide: {
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardWrapper: {
    width: {
      xs: '100%',
      sm: '294px'
    },
    maxWidth: {
      xs: '100%',
      sm: '294px'
    },
    minWidth: {
      xs: '100%',
      sm: '294px'
    },
    '& > *': {
      width: '100% !important',
      maxWidth: '100%'
    }
  },
  imageWrapper: {
    transform: 'skewY(-2deg)',
    width: {
      xs: '100%',
      sm: '294px'
    },
    maxWidth: {
      xs: '100%',
      sm: '294px'
    },
    minWidth: {
      xs: '100%',
      sm: '294px'
    },
    height: '386px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    '& > *': {
      width: '100% !important',
      maxWidth: '100%',
      height: '100%'
    }
  }
};
