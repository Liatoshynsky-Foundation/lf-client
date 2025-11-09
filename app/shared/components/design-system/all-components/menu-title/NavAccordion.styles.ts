import { mainHexPallete } from '../theme/colors';

export const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '10px', md: 0 },
    maxHeight: { xs: '240px', md: '320px' },
    overflowY: 'scroll'
  },
  itemWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
    // gap: { xs: '14px', md: '10px' }
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
    maxHeight: isOpen ? '500px' : '0px',
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
  icon: {
    width: { xs: '20px', md: '28px' },
    height: { xs: '20px', md: '28px' },
    mr: '5px'
  },
  activeTitle: {
    color: mainHexPallete.burgundy[700]
  }
};
