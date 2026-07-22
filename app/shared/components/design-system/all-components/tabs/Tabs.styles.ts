import type { SxProps, Theme } from '@mui/material';

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
        backgroundColor: 'grey.150',
        zIndex: 1
      }
    },

    '& .MuiTabs-indicator': {
      height: '2px',
      backgroundColor: 'black',
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

      fontFamily: 'Mulish, sans-serif',
      fontSize: commonSx.layout.typography.bodyMedium,
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '0px',
      whiteSpace: 'nowrap',

      color: 'blue.500',

      '&:hover': {
        color: 'blue.800'
      },
      '&:focus': {
        outline: '2px solid black',
        outlineOffset: '-7px'
      },
      '&:active': {
        color: 'blue.900'
      },
      '&.Mui-selected': {
        color: 'black'
      }
    }
  },

  indicator: {
    height: '2px',
    backgroundColor: 'black',
    bottom: 0,
    zIndex: 2
  }
};
