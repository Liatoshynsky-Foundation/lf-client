'use client';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { theme } from './Theme';
interface ThemeProviderProps {
  children: React.ReactNode;
}
export default function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
