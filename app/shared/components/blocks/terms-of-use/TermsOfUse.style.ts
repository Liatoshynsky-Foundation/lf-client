import { alignments, quoteColors } from '../../Quote/Quote.styles';
import { Align } from '~/types/types/quoteComponent';

const quoteSizes = {
  height: { xs: '279px', sm: '293px', md: '315px', lg: '266px', xl: '266px' },
  width: { xs: '300px', md: '408px', lg: '430px', xl: '442px' },
  icon: { xs: '60px', ultra: '65px' },
  textGap: { xs: '16px', md: '24px' }
};

export const skewedBlockHeight = {
  xs: '357px',
  sm: '465px',
  md: '602px',
  lg: '767px',
  xl: '835px',
  ultra: '852px'
};

export const style = {
  gridContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: 'subgrid'
  },
  textBlockContainer: {
    gridColumn: {
      xs: '1 / 5',
      sm: '4 / -1',
      md: '6 / -1'
    },
    textIndent: { xs: '70px', sm: '230px', md: '229px', lg: '295px', xl: '335px', xxl: '407px' },
    alignSelf: { lg: 'end' },
    paddingTop: { sm: '40px', md: '24px', lg: '140px' },
    maxWidth: '910px'
  },
  backgroundContainer: {
    my: { xs: '130px', md: '150px' },
    backgroundSize: { xs: '135%', sm: '125%', md: '120%', xl: '125%', ultra: '115%' },
    backgroundPosition: {
      xs: '5% 50%',
      sm: '80% 38%',
      md: '60% 45%',
      lg: '60% 40%',
      xl: '60% 35%',
      xxl: '50% 29%',
      ultra: '80% 30%'
    }
  },
  titleSection: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 6',
      md: '1 / 8',
      lg: '1/5'
    },
    display: { lg: 'flex' }
  },

  titleText: {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 600,
    lineHeight: '120%',
    letterSpacing: '0px',
    color: 'black',
    whiteSpace: 'pre-line',
    mt: {
      xs: '160px',
      sm: '172px',
      md: '224px',
      lg: '236px'
    },
    mb: { xs: '44px', sm: '0px' },
    fontSize: {
      xs: '40px',
      md: '64px'
    },
    width: { md: '570px', lg: '560px' }
  },

  downArrowLabel: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '100px',
    color: '#87756b',
    fontFamily: 'Mulish',
    fontWeight: 600,
    fontSize: { xs: '14px', md: '16px' }
  },

  quoteContainer: {
    position: 'absolute',
    right: { xs: '0', sm: '60px', md: '40px', xl: '0px', ultra: '200px' },
    bottom: { xs: '10px', md: '-10px', lg: '65px', xl: '110px', xxl: '90px', ultra: '100px' },
    transform: 'skewY(2deg)',
    zIndex: 1
  },
  mainContainer: (align: Align) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignments[align].alignItems,
    width: quoteSizes.width,
    height: quoteSizes.height,
    gap: { xs: '32px', md: '40px' }
  }),

  textContainer: (align: Align) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignments[align].alignItems,
    gap: quoteSizes.textGap,
    width: quoteSizes.width,
    maxWidth: { xs: '272px', sm: '300px', md: '408px', ultra: '453px' }
  }),
  image: (color: keyof typeof quoteColors, align: Align) => ({
    width: quoteSizes.icon,
    height: 'auto',
    color: quoteColors[color],
    transform: alignments[align].iconTransform
  })
};
