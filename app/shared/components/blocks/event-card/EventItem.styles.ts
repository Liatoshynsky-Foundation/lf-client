import type { SxProps, Theme } from '@mui/material/styles';

import { mainHexPallete, rgbButtonColors } from '~/ds-components/theme/colors';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'subgrid'
    },
    gridColumn: {
      xs: 'auto',
      sm: '1 / -1'
    },
    width: {
      xs: '100%'
    },
    columnGap: {
      xs: '0',
      sm: '24px',
      md: '40px'
    },
    rowGap: {
      xs: '24px',
      sm: '0px'
    },
    alignSelf: 'start'
  },

  leftSide: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '1 / 6'
    },
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row'
    },
    alignItems: 'stretch',
    justifySelf: 'start',
    justifyContent: {
      xs: 'space-between',
      lg: 'space-between'
    },
    gap: {
      xs: '8px',
      md: '24px',
      lg: '0'
    },
    width: '100%'
  },

  dateBlock: {
    width: {
      xs: 'auto',
      lg: '155px'
    },
    display: 'flex',
    flexDirection: {
      xs: 'row',
      lg: 'column'
    },
    flexShrink: 0,
    alignSelf: 'flex-start',
    gap: {
      xs: '14px',
      lg: '0px'
    }
  },

  dateRange: {
    fontFamily: 'var(--font-oswald)',
    fontWeight: 600,
    fontSize: {
      xs: '20px',
      md: '28px'
    },
    lineHeight: '135%',
    textTransform: 'uppercase'
  },

  yearLabel: {
    fontFamily: 'var(--font-oswald)',
    fontWeight: 600,
    fontSize: {
      xs: '20px',
      md: '28px'
    },
    lineHeight: '135%',
    textTransform: 'uppercase',
    mt: {
      md: '0px',
      lg: '8px'
    }
  },

  status: {
    fontFamily: 'var(--font-oswald)',
    fontWeight: 600,
    fontSize: {
      xs: '20px',
      md: '28px'
    },
    lineHeight: '135%',
    textTransform: 'uppercase',
    color: mainHexPallete.brown[500]
  },

  imageWrapper: {
    flexShrink: 0,
    display: 'flex',
    alignItems: {
      md: 'flex-end',
      lg: 'center'
    },
    alignSelf: {
      xs: 'flex-end',
      lg: 'auto'
    },
    py: {
      xs: '10px',
      sm: '5px',
      lg: '0px'
    },
    overflow: 'hidden',
    width: {
      xs: '100%',
      sm: 'auto'
    }
  },

  imageFrame: {
    position: 'relative',
    width: {
      xs: '100%',
      sm: '230px',
      md: '251px',
      lg: '295px'
    },
    aspectRatio: '272 / 173',
    height: {
      sm: '161px',
      md: '182px',
      lg: '214px'
    },
    overflow: 'hidden',
    flexShrink: 0,
    ml: {
      lg: 'auto'
    },
    clipPath: 'polygon(0% 5.5%, 100% 0%, 100% 94.5%, 0% 100%)'
  },

  content: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    display: 'flex',
    flexDirection: 'column'
  },

  title: {
    fontFamily: 'var(--font-oswald)',
    fontWeight: 700,
    fontSize: {
      xs: '18px',
      md: '24px'
    },
    lineHeight: '150%',
    textTransform: 'uppercase',
    mb: '4px',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  publishedAt: {
    fontFamily: 'var(--font-mulish)',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '150%',
    color: mainHexPallete.blue[700]
  },

  description: {
    fontFamily: 'var(--font-mulish)',
    fontSize: {
      xs: '16px',
      md: '18px'
    },
    fontWeight: 400,
    lineHeight: '150%',
    my: {
      xs: '12px',
      sm: '16px',
      md: '24px'
    },
    alignSelf: 'stretch',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: {
      xs: '12px',
      md: '20px'
    },
    mt: {
      xs: '4px',
      md: '0px'
    }
  },

  primaryLink: {
    px: '24px',
    py: '8px',
    height: '40px',
    borderRadius: '28px',
    border: `1px solid ${mainHexPallete.black}`,
    transition: 'background-color 0.35s ease',
    '&:hover': {
      backgroundColor: rgbButtonColors.primaryOutlinedHoveredBackground
    }
  },

  primaryLinkLabel: {
    fontFamily: 'var(--font-mulish)',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: 0,
    transition: 'color 0.35s ease',
    color: mainHexPallete.black,
    '&:hover': {
      borderBottom: 'none'
    }
  },

  secondaryLink: {
    p: 0,
    minWidth: 0,
    width: {
      xs: '40px',
      sm: 'auto'
    },
    height: {
      xs: '40px',
      sm: 'auto'
    },
    borderRadius: {
      xs: '100px',
      sm: 0
    },
    justifyContent: {
      xs: 'center',
      sm: 'flex-start'
    },

    borderWidth: {
      xs: 1,
      sm: 0
    },
    borderStyle: 'solid',
    borderColor: {
      xs: mainHexPallete.black,
      sm: 'transparent'
    },

    '& .MuiButton-endIcon': {
      marginLeft: 0,
      marginRight: 0
    },

    '&:hover .MuiTypography-root': {
      color: mainHexPallete.burgundy[800],
      borderBottom: {
        xs: 'none',
        sm: `1px solid ${mainHexPallete.burgundy[800]}`
      }
    }
  },

  secondaryLinkLabel: {
    display: {
      xs: 'none',
      sm: 'inline'
    },
    fontFamily: 'var(--font-mulish)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '110%',
    color: mainHexPallete.black,
    borderBottom: '1px solid transparent',
    transition: 'color 0.35s ease, border-color 0.35s ease',
    '&:hover': {
      borderBottom: '1px solid transparent'
    }
  },

  registrationIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: {
        xs: '24px',
        sm: '20px'
      },
      height: {
        xs: '24px',
        sm: '20px'
      }
    }
  }
};
