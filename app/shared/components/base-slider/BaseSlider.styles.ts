import { mainHexPallete, rgbaSwitchColors } from '~/ds-components/theme/colors';

const commonNavButton = {
  position: 'static !important',
  width: '64px !important',
  height: '48px !important',
  padding: 0,
  borderRadius: '100px',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 !important',
  '&:after': { content: '""' },
  '&:before': { content: '""' },
  '& .swiper-navigation-icon': { display: 'none' }
};

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

  // Swiper's navigation stylesheet (`swiper/css/navigation`) applies its own
  // absolute positioning, fixed sizing and margins to the navigation buttons.
  // `!important` is required to override those built-in styles so the buttons
  // render inside our custom static flex layout instead.
  navButtonPrev: {
    ...commonNavButton,
    backgroundColor: 'transparent',
    border: `2px solid ${mainHexPallete.black}`,
    '& img': { filter: 'brightness(0)' },
    '&:hover': { backgroundColor: rgbaSwitchColors.focusBackground, '& img': { filter: 'brightness(0)' } },
    '&.swiper-button-disabled': {
      border: `2px solid ${mainHexPallete.blue[700]}`,
      backgroundColor: 'transparent',
      cursor: 'not-allowed',
      '&:hover': { backgroundColor: 'transparent' },
      '& img': {
        filter: 'invert(45%) sepia(10%) saturate(600%) hue-rotate(180deg) brightness(95%) contrast(90%)'
      }
    }
  },

  navButtonNext: {
    ...commonNavButton,
    backgroundColor: mainHexPallete.black,
    border: 'none',
    '& img': { filter: 'brightness(0) invert(1)' },
    '&:hover': { opacity: 0.8 },
    '&.swiper-button-disabled': {
      backgroundColor: mainHexPallete.blue[300],
      cursor: 'not-allowed',
      '&:hover': { backgroundColor: mainHexPallete.blue[300] },
      '& img': {
        filter: 'invert(46%) sepia(10%) saturate(723%) hue-rotate(180deg) brightness(96%) contrast(90%)'
      }
    }
  },

  navIcon: {
    width: 20,
    height: 20
  }
};
