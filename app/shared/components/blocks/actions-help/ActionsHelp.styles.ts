import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  gridContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    mt: '160px'
  },
  typography: {
    textAlign: { xs: 'center', sm: 'right', md: 'left' },
    gridColumn: { xs: '1', sm: '4 / 9', md: '6 / -1' },
    textIndent: { xs: '7em', sm: '10em', md: '15em' },
    color: mainHexPallete.brown[700]
  },
  papersContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1 / -1',
      sm: 'repeat(2, 296px)',
      lg: 'repeat(4, 272px)',
      xl: 'repeat(4, 296px)'
    },
    gridColumn: { xs: '1', sm: '1 / -1' },
    columnGap: { xs: '0px', sm: '40px', md: '25px', lg: '15px', xl: '40px' },
    rowGap: { xs: '0px', sm: '45px', md: '35px', lg: '0px' },
    justifyContent: { xs: 'center', sm: 'end', lg: 'center' },
    mt: { xs: '64px', md: '132px' }
  },
  paper: (index: number) => ({
    position: 'relative',
    top: `-${index * 12}px`
  })
};
