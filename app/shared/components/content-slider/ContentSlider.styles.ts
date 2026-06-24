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
  }
};
