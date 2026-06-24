import type { SxProps, Theme } from '@mui/material';

import { rgbaTabColors } from '~/ds-components/theme/colors';

import { commonSx } from '~/shared/styles/commonSx';
const gutter = '24px';
export const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'block',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    width: { xs: `calc(100% + ${gutter})`, sm: '100%' },
    mr: { xs: `-${gutter}`, sm: 0 },
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  },

  root: {
    minWidth: 'max-content',

    '& .MuiTabs-flexContainer': {
      display: {
        xs: 'inline-flex',
        sm: 'flex'
      },

      width: {
        xs: 'max-content',
        sm: '100%'
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
        sm: '1 1 0'
      },

      textTransform: 'none',
      justifyContent: 'center',
      padding: '12px 28px',

      fontFamily: 'Mulish, sans-serif',
      fontSize: commonSx.layout.typography.bodyMedium,
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
