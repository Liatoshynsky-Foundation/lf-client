import { theme } from '../../theme/Theme';

export const styles = {
  iconButton: (isMobile: boolean) => ({
    borderRadius: '32px',
    width: isMobile ? '88px' : '112px',
    height: isMobile ? '40px' : '52px',
    backgroundColor: 'brown.100 !important',
    border: `${isMobile ? 4 : 6}px solid`,
    borderColor: 'white',
    zIndex: theme.zIndex.mobileNavButton,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '.line': {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      transition: `
        transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.3s ease
      `
    },

    '&.menu:not(.opened) .top': {
      transform: 'translateY(0px) rotate(0)'
    },
    '&.menu:not(.opened) .bottom': {
      transform: 'translateY(0px) rotate(0)'
    },

    '&.menu.opened .top': {
      transform: 'translateY(5px) rotate(39deg) scale(0.9)'
    },
    '&.menu.opened .bottom': {
      transform: 'translateY(-5px) rotate(-39deg) scale(0.9)'
    }
  })
};
