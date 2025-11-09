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
    py: '24px',
    overflow: 'hidden',
    display: 'grid',

    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },

    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },

    paddingInline: {
      xs: '24px',
      sm: '56px',
      md: '72px'
    },

    clipPath: 'polygon(0 0, 100% 0, 100% 87%, 0 90%)'
  },

  leftColumn: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / span 3',
      md: '2 / span 4'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
    order: {
      xs: 2,
      sm: 1
    }
  },

  rightColumn: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / span 5',
      md: '6 / span 7'
    },
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    order: {
      xs: 1,
      sm: 2
    }
  }
};
