import type { SxProps, Theme } from '@mui/material';

import { mainHexPallete } from '../design-system/all-components/theme/colors';
import { theme } from '../design-system/all-components/theme/Theme';

const accentColor = mainHexPallete.yellow[500];
const baseBackgroundColor = mainHexPallete.black;
const baseTextColor = mainHexPallete.white;

export const styles: Record<string, SxProps<Theme>> = {
  link: {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -100%)',
    opacity: 0,
    pointerEvents: 'none',
    zIndex: theme.zIndex.cursor,

    borderRadius: '0 0 28px 28px',
    padding: '12px 24px',
    textDecoration: 'none',
    backgroundColor: baseBackgroundColor,
    color: baseTextColor,
    fontWeight: 500,
    fontSize: '1rem',
    transition: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',

    '&:hover': {
      backgroundColor: accentColor,
      color: baseBackgroundColor
    },

    '&:focus-visible': {
      opacity: 1,
      transform: 'translate(-50%, 0)',
      pointerEvents: 'auto',
      outline: 'none',
      boxShadow: `0 8px 24px rgba(3, 3, 3, 0.3), 0 0 0 2px ${baseTextColor}, 0 0 0 4px ${accentColor}`
    }
  }
};
