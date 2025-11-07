import { mainHexPallete } from '../../../theme/colors';

export const styles = {
  overlay: {
    position: 'fixed',
    top: { xs: '-30px', md: '-48px' },
    left: 0,
    width: '100vw',
    height: '115vh',
    backgroundColor: mainHexPallete.yellow[500],
    zIndex: 900,
    padding: '24px',
    overflow: 'hidden',
    display: 'grid',
    clipPath: 'polygon(0 0, 100% 0, 100% 87%, 0% 90%)'
  }
};
