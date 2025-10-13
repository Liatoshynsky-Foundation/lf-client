import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  mainContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: { sm: '889px', md: '939px', lg: '921px' }
  },
  paper: {
    position: 'absolute',
    left: 0,
    zIndex: 0,
    height: '100%',
    backgroundColor: mainHexPallete.brown[100]
  },
  container: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    pt: '38px',
    pl: { xs: '24px', sm: '56px', md: '78px', ultra: '170px' },
    pr: { sm: '57px', md: '72px', xxl: '206px', ultra: '303px' },
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  }
};
