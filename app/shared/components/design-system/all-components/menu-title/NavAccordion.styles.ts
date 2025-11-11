import { mainHexPallete } from '../theme/colors';

export const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '10px', md: 0 }
  },
  itemWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  titleButton: {
    width: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'color 0.2s ease, transform 0.15s ease',
    '&:hover': {
      color: mainHexPallete.burgundy[700]
    },

    '&:active': {
      color: mainHexPallete.burgundy[900]
    }
  },
  title: {
    fontSize: { xs: '24px', md: '40px' },
    fontFamily: 'Oswald',
    fontWeight: 600,
    lineHeight: '160%',
    color: mainHexPallete.brown[900],
    textTransform: 'uppercase'
  },
  submenuWrapper: (isOpen: boolean) => ({
    // maxHeight: isOpen ? '500px' : '0px',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }),
  submenuItem: {
    textDecoration: 'none',
    fontSize: { xs: '22px', md: '28px' },
    fontFamily: 'Oswald',
    fontWeight: 500,
    lineHeight: '120%',
    letterSpacing: '1%',
    color: mainHexPallete.brown[900]
  },
  activeTitle: {
    color: mainHexPallete.burgundy[700]
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
