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
    display: 'flex',
    flexDirection: 'column',
    gap: '56px',
    mt: '80px',
    width: '100%'
  },

  eventItem: {
    display: { xs: 'flex', md: 'grid' },
    flexDirection: 'column',
    gridTemplateRows: { xs: 'auto auto', sm: 'auto auto', md: 'auto auto', lg: '1fr' },
    gridTemplateColumns: {
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: { xs: '16px', sm: '24px', md: '40px' },
    width: '100%'
  },

  eventDate: {
    gridColumn: { xs: '1 / -1', sm: '1 / 4', md: '1 / 5', lg: '1 / 2', xl: '1 / 3' },
    gridRow: { xs: '1', sm: '1', md: '1' },
    fontSize: { xs: '20px', sm: '20px', md: '28px', lg: '28px' },
    fontWeight: 700,
    color: '#190D03',
    lineHeight: 1.4,
    fontStyle: 'SemiBold',
    fontFamily: 'Oswald'
  },

  eventTitle: {
    fontSize: { xs: '18px', sm: '18px', md: '24px', lg: '24px' },
    lineHeight: 1.5,
    fontWeight: 700,
    fontStyle: 'Bold',
    color: '#190D03',
    textTransform: 'uppercase',
    maxWidth: { sm: '100%', md: '100%', lg: '90%' },
    mb: '5px',
    mt: { xs: '32px', sm: '0px' },
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: { xs: 2, sm: 'none' }
  },

  publishDate: {
    fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '16px' },
    color: '#08090b',
    lineHeight: 1.5,
    fontWeight: 500,
    fontStyle: 'Medium',
    mb: { xs: '10px', sm: '15px', md: '25px', lg: '25px' },
    display: 'block'
  },

  eventDescription: {
    fontSize: { xs: '16px', sm: '16px', md: '18px', lg: '18px' },
    lineHeight: 1.6,
    fontWeight: 400,
    color: '#000000',
    mb: { xs: '24px', sm: '0px', md: '20px', lg: '24px', xl: '24px' },

    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',

    WebkitLineClamp: {
      xs: 3,
      sm: 2,
      md: 2,
      lg: 2,
      xl: 3
    }
  },

  eventImage: {
    gridColumn: { xs: '1 / -1', sm: '1 / 4', md: '2 / 6', lg: '3 / 6' },
    gridRow: { xs: '2', sm: '2', md: '2', lg: '1' },
    width: '100%',
    height: { xs: '183px', sm: '169px', md: '191px', lg: '224px', xl: '248px' },
    clipPath: 'polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%)',
    pl: { xs: '0px', md: '0px', lg: '0px', xl: '40px' },
    objectFit: 'cover'
  },

  eventInfo: {
    gridColumn: { xs: '1 / -1', sm: '4 / 9', md: '6 / 13', lg: '6 / 12' },
    gridRow: { xs: '3', sm: '1 / 3', md: '1 / 3', lg: '1' },
    display: 'flex',
    flexDirection: 'column'
  },

  buttonGroup: {
    display: 'flex',
    mt: { xs: 'auto', sm: '10px', md: 'auto', lg: 'auto' },
    alignItems: 'center',
    gap: { xs: '12px' }
  },

  actionButton: {
    borderRadius: '30px',
    fontSize: { xs: '16px', sm: '16px', md: '16px', lg: '16px' },
    lineHeight: 1.5,
    fontWeight: 500,
    fontStyle: 'Medium',
    border: '1px solid #190D03',
    color: '#190D03',
    pr: '20px',
    textTransform: 'none'
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
  },

  regButton: {
    textTransform: 'none',
    pl: { xs: '0px', sm: '20px' },
    p: { xs: 0, sm: '8px 24px' },
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: 1.1,
    display: 'flex',
    gap: '4px',
    minWidth: { xs: '40px', sm: 'auto' },
    width: { xs: '40px', sm: 'auto' },
    height: { xs: '40px', sm: 'auto' },
    borderRadius: { xs: '50%', sm: '30px' },
    border: { xs: '1px solid #190D03', sm: 'none' },
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    '& .MuiButton-endIcon': {
      m: 0,
      '& img': {
        width: 20,
        height: 20
      }
    }
  }
};
