import { mainHexPallete } from '../../../theme/colors';

const columnBase = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100%',
  overflowY: 'auto',
  scrollBehavior: 'smooth',
  flexGrow: 1,
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
};

export const styles = {
  overlay: {
    position: 'fixed',
    top: { xs: '-30px', md: '-48px' },
    left: 0,
    width: '100vw',
    height: '107vh',
    backgroundColor: mainHexPallete.yellow[500],
    zIndex: 900,
    clipPath: {
      xs: 'polygon(0 0, 100% 0, 100% 98%, 0 100%)',
      sm: 'polygon(0 0, 100% 0, 100% 94%, 0 100%)'
    }
  },

  overlayContent: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: { xs: '16px', sm: '24px', md: '40px' },

    paddingInline: { xs: '24px', sm: '56px', md: '72px' },
    paddingTop: { xs: '63px', sm: '112px', md: '112px' },

    height: '100vh',
    overflow: 'hidden',
    position: 'relative'
  },

  leftColumn: {
    ...columnBase,
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / span 3',
      md: '2 / span 4'
    }
  },

  rightColumn: {
    ...columnBase,
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / span 5',
      md: '6 / span 7'
    },
    gap: { xs: '64px', sm: 0 },
    pb: { xs: '24px', sm: 0 },
    pt: { xs: '6.2rem', sm: 0 },
    justifyContent: { xs: 'space-between', sm: 'unset' }
  },

  contactsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },

  leftColumnInner: {
    position: 'absolute',
    top: { sm: '23%' },
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: { sm: '240px', md: '320px' },
    py: { sm: '4px', md: '8px' }
  },

  rightAccordionWrapper: {
    position: { xs: 'static', sm: 'absolute' },
    top: { sm: '23%' },
    width: '100%'
  },

  mobileContactsWrapper: {
    position: { xs: 'static', sm: 'absolute' },
    bottom: 0,
    width: '100%',
    height: '212px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    justifyContent: 'space-between'
  }
};
