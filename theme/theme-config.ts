import { PaletteColorOptions } from '@mui/material';
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    containedPrimary: true;
  }
}
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
  interface Palette {
    tertiary: PaletteColor;
  }
}

declare module '@mui/material/styles' {
  interface PaletteOptions {
    myColor: PaletteColorOptions;
  }
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
declare module '@mui/material' {
  interface TypographyPropsVariantOverrides {
    customSemiBold20: true;
    customBold20: true;
    customItalic18: true;
    customMedium18: true;
    customMedium16: true;
    customItalic16: true;
    customItalic14: true;
  }
}
declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    customSemiBold20?: React.CSSProperties;
    customBold20?: React.CSSProperties;
    customItalic18?: React.CSSProperties;
    customMedium18?: React.CSSProperties;
    customMedium16?: React.CSSProperties;
    customItalic16?: React.CSSProperties;
    customCaption?: React.CSSProperties;
    customItalic14?: React.CSSProperties;
  }
  interface TypographyVariants {
    customSemiBold20: React.CSSProperties;
    customBold20: React.CSSProperties;
    customItalic18: React.CSSProperties;
    customMedium18: React.CSSProperties;
    customMedium16: React.CSSProperties;
    customItalic16: React.CSSProperties;
    customCaption: React.CSSProperties;
    customItalic14: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    customSemiBold20?: React.CSSProperties;
    customBold20?: React.CSSProperties;
    customItalic18?: React.CSSProperties;
    customMedium18?: React.CSSProperties;
    customMedium16?: React.CSSProperties;
    customItalic16?: React.CSSProperties;
    customCaption?: React.CSSProperties;
    customItalic14?: React.CSSProperties;
  }
}
