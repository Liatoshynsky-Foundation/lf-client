import { mainHexPallete } from '~/ds-components/theme/colors';

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
    width: '48px !important',
    height: '48px !important',
    borderRadius: '50%',
    border: `2px solid ${mainHexPallete.black}`,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease-in-out',
    '&:after': {
      fontSize: '20px !important',
      fontWeight: 'bold',
      color: mainHexPallete.black
    },
    '&:hover': {
      backgroundColor: mainHexPallete.black,
      '&:after': {
        color: mainHexPallete.white
      }
    },
    '&.swiper-button-disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: 'transparent',
        '&:after': {
          color: mainHexPallete.black
        }
      }
    },
    margin: '0 !important'
  }
};
