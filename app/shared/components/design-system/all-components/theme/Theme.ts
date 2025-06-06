import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    ultra: true;
  }
}
export const theme = createTheme({
  breakpoints: {
    values: {
      ultra: 1920,
      xxl: 1728,
      xl: 1448,
      lg: 1280,
      md: 1024,
      sm: 768,
      xs: 376
    }
  }
});
