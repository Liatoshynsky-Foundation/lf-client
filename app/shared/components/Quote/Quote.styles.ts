import type { Align } from '~/types/types/quoteComponent';

export const quoteSizes = {
  width: { xs: '241px', sm: '231px', md: '305px', lg: '367px', xl: '408px' },
  icon: { xs: '50px', sm: '60px' },
  textGap: { xs: '16px', md: '24px' }
};

export const quoteColors = {
  burgundy: '#600E0F',
  black: '#190D03',
  sourceText: '#52545A'
};

export const alignments = {
  left: {
    alignItems: 'flex-start',
    textAlign: 'left',
    iconTransform: 'scaleX(1)'
  },
  right: {
    alignItems: 'flex-end',
    textAlign: 'right',
    iconTransform: 'scaleX(-1)'
  }
};

export const quoteTextStyles = {
  fontFamily: 'Mulish',
  fontWeight: 500,
  fontSize: { xs: '16px', md: '18px' },
  letterSpacing: 0
};

export const sourceTextStyles = {
  fontFamily: 'Mulish',
  fontWeight: 500,
  fontStyle: 'italic',
  fontSize: { xs: '14px', md: '16px' },
  letterSpacing: 0
};

export const styles = {
  mainContainer: (align: Align) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignments[align].alignItems,
    width: quoteSizes.width,
    gap: '40px'
  }),
  image: (color: keyof typeof quoteColors, align: Align) => ({
    width: quoteSizes.icon,
    height: '50px',
    color: quoteColors[color],
    transform: alignments[align].iconTransform
  }),
  textContainer: (align: Align) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignments[align].alignItems,
    gap: quoteSizes.textGap,
    width: quoteSizes.width
  }),
  mainText: (color: keyof typeof quoteColors, align: Align) => ({
    ...quoteTextStyles,
    color: quoteColors[color],
    textAlign: alignments[align].textAlign
  }),
  sourceText: (align: Align) => ({
    ...sourceTextStyles,
    color: quoteColors.sourceText,
    textAlign: alignments[align].textAlign
  })
};
