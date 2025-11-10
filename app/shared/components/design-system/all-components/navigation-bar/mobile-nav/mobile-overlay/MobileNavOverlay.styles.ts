import { mainHexPallete } from '../../../theme/colors';

import { AppTypography } from '~/constants';

const baseColumn = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  maxHeight: { xs: '240px', md: '320px' },
  top: { sm: '33%', md: '30%' },
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
    // overflowY: 'auto' // ← ВАЖЛИВО
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
    order: {
      xs: 2,
      sm: 1
    },
    py: '8px'
  },

  rightColumn: {
    ...baseColumn,
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / span 5',
      md: '6 / span 7'
    },
    order: {
      xs: 1,
      sm: 2
    }
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  mediaTitles: {
    ...AppTypography.mulish18Regular,
    fontSize: { xs: '16px', md: '18px' },
    lineHeight: { xs: '150%', md: '160%' },
    color: mainHexPallete.brown[700],
    display: { xs: 'none', sm: 'block' }
  }
};
