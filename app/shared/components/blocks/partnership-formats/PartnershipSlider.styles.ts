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
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    mt: '16px'
  },
  indicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#D9D9D9',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#B0B0B0'
    }
  },
  indicatorActive: {
    width: '24px',
    borderRadius: '4px',
    backgroundColor: '#000000'
  }
};
