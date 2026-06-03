import { mainHexPallete } from '~/ds-components/theme/colors';

export const baseSliderStyles = {
  container: {
    position: 'relative',
    width: '100%'
  },

  navContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    mb: '24px'
  },

  navButton: {
    position: 'static !important',
    width: '64px !important',
    height: '48px !important',
    padding: 0,
    borderRadius: '100px',
    border: `2px solid ${mainHexPallete.black}`,
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease-in-out',
    margin: '0 !important',
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
      backgroundColor: mainHexPallete.black,
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
    }
  },

  navIcon: {
    width: 20,
    height: 20
  }
};
