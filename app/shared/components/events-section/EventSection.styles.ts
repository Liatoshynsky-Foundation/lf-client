import { navButtonStyles } from '../content-slider/ContentSlider.styles';
import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  sectionContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    ...commonSx.layout.standardGrid,
    width: '100%',
    my: { xs: '80px' }
  },
  sliderWrapper: {
    gridColumn: { xs: '1 / -1', sm: '1 / -1' },
    width: '100%',
    minWidth: 0,
    overflow: 'hidden'
  },
  sliderNavContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    mb: '20px'
  },
  title: {
    gridColumn: '1 / -1',
    gridRow: '1',
    fontSize: { xs: '48px', sm: '64px', md: '88px', lg: '104px', xl: '120px' },
    fontStyle: 'SemiBold',
    color: 'black',
    lineHeight: 1.1,
    fontWeight: 600,
    mb: { xs: '52px', sm: '52px', md: '52px', lg: '52px', xl: '52px' }
  },

  textStyle: {
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn,
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

  eventItem: {
    display: { xs: 'flex', md: 'grid' },
    flexDirection: 'column',
    gridTemplateRows: { xs: 'auto auto', sm: 'auto auto', md: 'auto auto', lg: '1fr' },
    gridTemplateColumns: {
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: commonSx.layout.standardGrid.columnGap,
    width: '100%'
  },

  eventDate: {
    gridColumn: { xs: '1 / -1', sm: '1 / 4', md: '1 / 5', lg: '1 / 3', xl: '1 / 3' },
    gridRow: { xs: '1', sm: '1', md: '1' },
    fontSize: { xs: '20px', sm: '20px', md: '28px', lg: '28px' },
    fontWeight: 700,
    color: 'black',
    lineHeight: 1.4,
    fontStyle: 'SemiBold',
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    whiteSpace: {
      xs: 'nowrap',
      '@media (min-width: 1280px)': { whiteSpace: 'normal' }
    },

    maxWidth: {
      '@media (min-width: 1280px) and (max-width: 1439px)': {
        maxWidth: '120px'
      },
      '@media (min-width: 1440px)': {
        maxWidth: 'none'
      }
    },

    mb: { xs: '12px', md: '0px' }
  },

  eventTitle: {
    fontSize: { xs: '18px', sm: '18px', md: '24px', lg: '24px' },
    lineHeight: 1.5,
    fontWeight: 700,
    fontStyle: 'Bold',
    color: 'black',
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
    color: 'black',
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
    color: 'black',
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
    border: '1px solid black',
    color: 'black',
    pr: '20px',
    textTransform: 'none'
  },
  navButton: navButtonStyles,

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
    border: { xs: '1px solid black', sm: 'none' },
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
