'use client';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { theme } from './Theme';

export default function ThemeProvider({ children }: { children: Readonly<React.ReactNode> }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
