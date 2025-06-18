import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

export const buttonGroupTheme: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme> = {
  MuiButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        padding: '2px',
        fontFamily: 'Mulish, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        width: 'fit-content',
        border: 'none',
        lineHeight: '150%',
        backgroundColor: theme.palette.buttonGroup.primary.groupBackgroundColor,
        color: theme.palette.buttonGroup.primary.buttonTextColor
      })
    }
  }
};
