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
    overflow: 'hidden',
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
    alignItems: 'center',
    px: {
      xs: '10px'
    }
  },
  cardWrapper: {
    width: '294px',
    maxWidth: '294px',
    minWidth: '294px'
  },
  imageWrapper: {
    transform: 'skewY(-2deg)',
    width: '294px',
    maxWidth: '294px',
    minWidth: '294px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    overflow: 'visible'
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
