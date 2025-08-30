import { Theme } from '@mui/material';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = (theme: Theme) => ({
  container: {
    gridColumn: '1 / -1'
  },
  yearBlock: {
    position: 'relative',
    width: '100%',
    maxWidth: '1656px',
    height: '260px',
    margin: '0 auto'
  },
  line: (offset: number) => ({
    position: 'absolute',
    top: '47%',
    left: `${offset - 34}px`,
    height: '8px',
    width: `calc(100vw - ${offset}px)`,
    maxWidth: `calc(1656px - ${offset - 32}px)`,
    backgroundColor: mainHexPallete.yellow[300],
    transform: 'translateY(-50%) rotate(-3deg)',
    transformOrigin: 'left center',
    zIndex: 0,
    [theme.breakpoints.down('md')]: {
      top: '27%',
      left: `${offset - 25}px`
    },
    [theme.breakpoints.down('sm')]: {
      top: '23%',
      left: `${offset - 18}px`
    }
  }),
  year: {
    ...theme.typography.customBold236,
    [theme.breakpoints.down('md')]: {
      ...theme.typography.customBold132
    },
    [theme.breakpoints.down('sm')]: {
      ...theme.typography.customBold114
    },
    color: mainHexPallete.brown[200],
    zIndex: 2,
    position: 'relative'
  }
});
