export const sliderStyles = {
  container: {
    width: {
      xs: 'calc(100% + 24px)',
      sm: '100%'
    },
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
    gap: '16px',
    transition: 'transform 0.3s ease-in-out',
    willChange: 'transform'
  },
  slide: {
    flexShrink: 0,
    maxWidth: 'max-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardWrapper: {
    width: {
      xs: '272px',
      sm: '294px'
    },
    maxWidth: {
      xs: 'max-content',
      sm: '294px'
    },
    minWidth: {
      xs: '272px',
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
      xs: '272px',
      sm: '294px'
    },
    maxWidth: {
      xs: '272px',
      sm: '294px'
    },
    minWidth: {
      xs: '272px',
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
