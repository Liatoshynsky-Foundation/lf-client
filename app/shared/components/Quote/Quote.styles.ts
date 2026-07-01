import { ResponsiveStyleValue, SxProps, Theme } from '@mui/system';

import type { Align } from '~/types/types/quoteComponent';

import { commonSx } from '~/shared/styles/commonSx';

export const quoteSizes = {
  height: 'fit-content',
  width: { xs: '272px', sm: '231px', md: '305px', lg: '367px', xl: '408px' },
  icon: { xs: '33px', sm: '48px', md: '60px' },
  textGap: { xs: '16px', md: '24px' }
};

export const quoteColors = {
  burgundy: 'burgundy.800',
  black: 'black',
  sourceText: 'blue.800',
  white: 'white'
} as const;

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
  fontWeight: 500,
  lineHeight: '150%',
  fontSize: commonSx.layout.typography.bodyMedium,
  letterSpacing: 0
};

export const sourceTextStyles = {
  fontWeight: 500,
  lineHeight: '140%',
  fontStyle: 'italic',
  fontSize: { xs: '14px', md: '16px' },
  letterSpacing: 0
};

export const styles = {
  mainContainer: (
    align: Align,
    width?: Record<string, string> | string,
    gap?: ResponsiveStyleValue<string | number> | null
  ) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignments[align].alignItems,
    width: width ?? quoteSizes.width,
    gap: gap ?? { xs: '32px', md: '40px' }
  }),
  image: (color: keyof typeof quoteColors, align: Align, width?: ResponsiveStyleValue<string | number> | null) => ({
    width: width ?? quoteSizes.icon,
    height: 'auto',
    color: quoteColors[color],
    transform: alignments[align].iconTransform
  }),
  textContainer: (align: Align, textGap?: ResponsiveStyleValue<string | number> | null): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignments[align].alignItems,
    gap: textGap ?? quoteSizes.textGap
  }),
  mainText: (color: keyof typeof quoteColors, align: Align) => ({
    ...quoteTextStyles,
    color: quoteColors[color],
    fontStyle: 'normal',
    textAlign: alignments[align].textAlign
  }),
  sourceText: (align: Align) => ({
    ...sourceTextStyles,
    color: quoteColors.sourceText,
    textAlign: alignments[align].textAlign
  })
};
