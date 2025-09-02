import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  gridContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: 'subgrid',
    mt: '160px'
  },
  typography: {
    gridColumn: '6 / -1',
    textIndent: '17em',
    color: mainHexPallete.brown[700]
  },
  papersContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 296px)',
    gridColumn: '1 / -1',
    columnGap: '40px',
    justifyContent: 'center',
    mt: '132px'
  },
  paper: (index: number) => ({
    position: 'relative',
    top: `-${index * 12}px`
  })
};
