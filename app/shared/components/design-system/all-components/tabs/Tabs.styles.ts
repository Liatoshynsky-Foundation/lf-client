import type { SxProps, Theme } from '@mui/material';

import { rgbaTabColors } from '~/ds-components/theme/colors';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: 'relative',
    display: 'block',

    left: { xs: '50%', md: 'auto' },
    right: { xs: '50%', md: 'auto' },
    marginLeft: { xs: '-50vw', md: 0 },
    marginRight: { xs: '-50vw', md: 0 },
    width: { xs: '100vw', md: '100%' },

    overflowX: { xs: 'auto', md: 'visible' },
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  },

  root: {
    minWidth: 'max-content',

    '& .MuiTabs-flexContainer': {
      display: {
        xs: 'inline-flex',
        md: 'flex'
      },

      width: {
        xs: 'max-content',
        md: '100%'
      },

      whiteSpace: 'nowrap',
      position: 'relative',

      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '2px',
        backgroundColor: rgbaTabColors.defaultLineColor,
        zIndex: 1
      }
    },

    '& .MuiTabs-indicator': {
      height: '2px',
      backgroundColor: rgbaTabColors.activeLineColor,
      bottom: 0,
      zIndex: 2
    },

    '& .MuiTab-root': {
      flex: {
        xs: '0 0 auto',
        md: '1 1 0'
      },

      textTransform: 'none',
      justifyContent: 'center',

      fontFamily: 'Mulish, sans-serif',
      fontSize: { xs: '16px', md: '18px' },
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '0px',
      whiteSpace: 'nowrap',

      color: rgbaTabColors.defaultTextColor,

      '&:hover': {
        color: rgbaTabColors.hoveredTextColor
      },
      '&:active': {
        color: rgbaTabColors.pressedTextColor
      },
      '&.Mui-selected': {
        color: rgbaTabColors.activeTextColor
      }
    }
  },

  indicator: {
    height: '2px',
    backgroundColor: rgbaTabColors.activeLineColor,
    bottom: 0,
    zIndex: 2
  }
};
