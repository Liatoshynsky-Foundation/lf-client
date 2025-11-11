import { mainHexPallete } from '../../../theme/colors';

const baseColumn = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  top: { xs: '18%', sm: '33%', md: '30%' },
  overflowY: 'visible'
};

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
    ...baseColumn,
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / span 3',
      md: '2 / span 4'
    },
    justifyContent: 'space-between',
    gap: '16px',
    py: '8px'
  },

  rightColumn: {
    ...baseColumn,
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / span 5',
      md: '6 / span 7'
    },
    gap: '16%'
  },

  contactsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  }
};
