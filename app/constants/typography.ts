import { TypographyVariantsOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    oswald116Bold: React.CSSProperties
    oswald64Semibold: React.CSSProperties
    oswald64Regular: React.CSSProperties
    oswald28Bold: React.CSSProperties
    mulish24Bold: React.CSSProperties
    mulish24Regular: React.CSSProperties
    mulish20Regular: React.CSSProperties
    mulish20Semibold: React.CSSProperties
    mulish20Bold: React.CSSProperties
    mulish18Regular: React.CSSProperties
    mulish18Italic: React.CSSProperties
    mulish18Medium: React.CSSProperties
    mulish16Regular: React.CSSProperties
    mulish16Medium: React.CSSProperties
    mulish16Italic: React.CSSProperties
    mulish16Caption: React.CSSProperties
    mulish14Italic: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    oswald116Bold?: React.CSSProperties
    oswald64Semibold?: React.CSSProperties
    oswald64Regular?: React.CSSProperties
    oswald28Bold?: React.CSSProperties
    mulish24Bold?: React.CSSProperties
    mulish24Regular?: React.CSSProperties
    mulish20Regular?: React.CSSProperties
    mulish20Semibold?: React.CSSProperties
    mulish20Bold?: React.CSSProperties
    mulish18Regular?: React.CSSProperties
    mulish18Italic?: React.CSSProperties
    mulish18Medium?: React.CSSProperties
    mulish16Regular?: React.CSSProperties
    mulish16Medium?: React.CSSProperties
    mulish16Italic?: React.CSSProperties
    mulish16Caption?: React.CSSProperties
    mulish14Italic?: React.CSSProperties
  }
}

export const AppTypography: TypographyVariantsOptions = {
  oswald116Bold: {
    fontFamily: 'Oswald',
    fontWeight: 700,
    fontSize: '116px',
    lineHeight: '100%',
    letterSpacing: '-2px',
  },
  oswald64Semibold: {
    fontFamily: 'Oswald',
    fontWeight: 600,
    fontSize: '64px',
    lineHeight: '100%',
    letterSpacing: '-2%',
    textTransform: 'capitalize',
  },
  oswald64Regular: {
    fontFamily: 'Oswald',
    fontWeight: 400,
    fontSize: '64px',
    lineHeight: '100%',
    letterSpacing: '2%',
    textTransform: 'capitalize',
  },
  oswald28Bold: {
    fontFamily: 'Oswald',
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '160%',
    textTransform: 'uppercase',
  },

  mulish24Bold: {
    fontFamily: 'Mulish',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '140%',
  },
  mulish24Regular: {
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '160%',
  },
  mulish20Regular: {
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '160%',
  },
  mulish20Semibold: {
    fontFamily: 'Mulish',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '160%',
  },
  mulish20Bold: {
    fontFamily: 'Mulish',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '140%',
  },
  mulish18Regular: {
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '160%',
  },
  mulish18Italic: {
    fontFamily: 'Mulish',
    fontSize: '18px',
    fontStyle: 'italic',
    lineHeight: '160%',
  },
  mulish18Medium: {
    fontFamily: 'Mulish',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '150%',
  },
  mulish16Regular: {
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
  },
  mulish16Medium: {
    fontFamily: 'Mulish',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
  },
  mulish16Italic: {
    fontFamily: 'Mulish',
    fontSize: '16px',
    fontStyle: 'italic',
    lineHeight: 'auto',
  },
  mulish16Caption: {
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '140%',
  },
  mulish14Italic: {
    fontFamily: 'Mulish',
    fontSize: '14px',
    fontStyle: 'italic',
    lineHeight: '140%',
  },
} 