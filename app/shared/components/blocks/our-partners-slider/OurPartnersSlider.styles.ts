export const styles = {
  wrapper: {
    gridColumn: '1 / -1',
    mb: { xs: '80px', sm: '104px', md: '128px', lg: '144px' }
  },

  sliderContainer: {
    gridColumn: '1 / -1',
    overflow: 'hidden',
    width: '100%'
  },

  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    gap: 0,
    WebkitOverflowScrolling: 'touch',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    touchAction: 'pan-x'
  },

  slideItem: {
    flex: '0 0 20%',
    minWidth: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
  },

  logoImage: {
    objectFit: 'contain',
    height: 'auto',
    maxHeight: '112px',
    width: '100%',
    maxWidth: '200px'
  }
};
