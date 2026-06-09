import { mainHexPallete } from '~/ds-components/theme/colors';

import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  card: {
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    minHeight: {
      xs: 'auto',
      sm: '94px',
      md: '140px'
    },
    '&:hover': {
      '& .fundLine': {
        transform: 'rotate(-2deg)'
      },
      '& .fundTitle': {
        color: mainHexPallete.yellow[600],
        transition: 'color 0.5s ease-in-out'
      }
    }
  },

  fundNumber: {
    fontFamily: 'Mulish',
    fontWeight: {
      xs: 500,
      md: 600
    },
    fontSize: commonSx.layout.typography.bodyMedium,
    lineHeight: '130%',
    letterSpacing: '0px',
    color: mainHexPallete.black,
    marginBottom: '6px'
  },

  fundTitle: {
    fontFamily: 'Oswald',
    fontWeight: {
      xs: 700,
      md: 600
    },
    fontSize: {
      xs: '20px',
      md: '24px'
    },
    lineHeight: {
      xs: '130%',
      md: '120%'
    },
    letterSpacing: '0%',
    textTransform: 'uppercase',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    color: mainHexPallete.brown[800],
    transition: 'color 0.3s ease'
  },

  fundLine: {
    width: '100%',
    height: {
      xs: '4px',
      md: '5px'
    },
    marginTop: {
      xs: '6px',
      md: '9.5px',
      lg: '8px'
    },
    marginBottom: {
      xs: '6px',
      md: '9.5px',
      lg: '8px'
    },
    display: 'block',
    backgroundColor: mainHexPallete.yellow[500],
    transformOrigin: 'center center',
    transition: 'transform 0.5s ease-in-out'
  }
};
