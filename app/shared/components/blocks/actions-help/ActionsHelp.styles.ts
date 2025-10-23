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
  title: {
    display: 'flex',
    width: '100%',
    gap: { xs: '10%', sm: '25%', md: '40%' }
  },
  typography: {
    textAlign: { xs: 'center', sm: 'right', lg: 'left' },
    gridColumn: { xs: '1', sm: '9/ 4', md: '6 / -1' },
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
    columnGap: { xs: '0px', md: '5px', lg: '15px', xl: '40px' },
    rowGap: { xs: '0px', sm: '30px', md: '50px', lg: '0px' },
    justifyContent: { xs: 'center', md: 'end', lg: 'center' },
    mt: { xs: '64px', md: '132px' }
  },
  paper: (index: number) => ({
    position: 'relative',
    top: `-${index * 12}px`
  })
};
