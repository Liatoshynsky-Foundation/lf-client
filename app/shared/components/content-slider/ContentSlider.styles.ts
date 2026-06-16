export const styles = {
  sliderContainer: {
    position: 'relative',
    gridColumn: '1 / -1',
    width: '100%',
    overflow: 'visible',
    pb: { xs: '32px', sm: '40px' },
    '& .swiper': {
      overflow: 'visible !important'
    },
    '& .swiper-wrapper': {
      paddingBottom: '20px'
    },
    '& .swiper-slide': {
      height: 'auto',
      display: 'flex',
      width: '100%',
      '& > *': {
        width: '100%'
      }
    }
  },

  navigationContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    mb: { xs: '24px', sm: '32px', md: '40px' },
    gridColumn: '1 / -1'
  },

  navButton: {
    position: 'static !important',
    width: '64px !important',
    height: '48px !important',
    borderRadius: '100px',
    border: '2px solid',
    borderColor: 'black',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease-in-out',
    '&:after': {
      content: '""'
    },
    '&:before': {
      content: '""'
    },
    '& .swiper-navigation-icon': {
      display: 'none'
    },
    '& img': {
      filter: 'brightness(0)',
      transition: 'filter 0.3s ease-in-out'
    },
    '&:hover': {
      backgroundColor: 'black',
      '& img': {
        filter: 'brightness(0) invert(1)'
      }
    },
    '&.swiper-button-disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: 'transparent',
        '& svg': {
          filter: 'none'
        }
      }
    },
    margin: '0 !important'
  }
};
