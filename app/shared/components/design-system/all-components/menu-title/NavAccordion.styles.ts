import { mainHexPallete } from '../theme/colors';

export const textStates = {
  default: {
    color: mainHexPallete.brown[900]
  },
  hover: {
    '@media (min-width: 900px)': { color: mainHexPallete.burgundy[700] }
  },
  pressed: {
    color: mainHexPallete.burgundy[900]
  },
  active: {
    color: mainHexPallete.burgundy[700]
  }
};

export const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '10px', md: 0 }
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },

  titleButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: 0,
    color: textStates.default.color,
    transition: 'color 0.2s ease',

    '&:hover': {
      ...textStates.hover,
      '& > div > svg': {
        stroke: mainHexPallete.burgundy[700]
      }
    },

    '&:active': {
      ...textStates.pressed,
      '& > div > svg': {
        stroke: mainHexPallete.burgundy[900]
      }
    }
  },

  title: (isActive: boolean) => ({
    fontSize: { xs: '24px', md: '40px' },
    fontFamily: 'Oswald',
    fontWeight: 600,
    lineHeight: '160%',
    textTransform: 'uppercase',
    transition: 'color 0.2s ease',
    color: isActive ? textStates.active : 'inherit'
  }),

  // activeTitle: textStates.active,

  submenuItem: {
    fontSize: { xs: '22px', md: '28px' },
    fontFamily: 'Oswald',
    fontWeight: 500,
    lineHeight: '120%',
    cursor: 'pointer',
    color: textStates.default.color,
    transition: 'color 0.2s ease',

    '&:hover': textStates.hover,
    '&:active': textStates.pressed
  },
  dropdownBox: (isOpen: boolean) => ({
    overflow: 'hidden',
    maxHeight: isOpen ? '13rem' : 0,

    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',

    transition: isOpen
      ? `
        max-height 700ms cubic-bezier(0.215, 0.610, 0.355, 1.000),
        opacity 500ms ease-out,
        transform 700ms cubic-bezier(0.215, 0.610, 0.355, 1.000),
        padding 500ms ease-out
      `
      : `
        max-height 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950),
        opacity 400ms ease-in,
        transform 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950),
        padding 400ms ease-in
      `,

    py: isOpen ? '12px' : 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  })
};
