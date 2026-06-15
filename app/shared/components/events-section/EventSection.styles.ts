import { mainHexPallete } from '~/ds-components/theme/colors';
export const styles = {
  sectionContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    width: '100%',
    my: { xs: '80px' }
  },
  sliderWrapper: {
    gridColumn: { xs: '1 / -1', sm: '1 / -1' },
    width: '100%',
    minWidth: 0,
    overflow: 'hidden'
  },
  title: {
    gridColumn: '1 / -1',
    gridRow: '1',
    fontSize: { xs: '48px', sm: '64px', md: '88px', lg: '104px', xl: '120px' },
    fontStyle: 'SemiBold',
    color: '#190D03',
    lineHeight: 1.1,
    fontWeight: 600,
    mb: { xs: '52px', sm: '52px', md: '52px', lg: '52px', xl: '52px' }
  },

  textStyle: {
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    },
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  },
  eventsList: {
    gridColumn: '1 / -1',
    gridRow: '3',
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'subgrid'
    },
    rowGap: { xs: '48px', md: '56px' },
    mt: '80px',
    width: '100%'
  },

  navButton: {
    position: 'static !important',
    width: '64px !important',
    height: '48px !important',
    borderRadius: '100px',
    border: `2px solid ${mainHexPallete.black}`,
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
    },
    margin: '0 !important'
  }
};
