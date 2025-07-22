import { Theme } from '@mui/material';

import { AppTypography } from '~/constants';

const containerHelper = {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)'
};

export const styles = (theme: Theme) => ({
  container: {
    ...containerHelper,
    gridColumn: '1 / -1',
    gridTemplateRows: 'repeat(6, auto)',
    columnGap: '40px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      columnGap: '16px',
      marginBottom: '90px'
    }
  },
  title: {
    ...AppTypography.oswald64Semibold,
    display: 'flex',
    gridColumnStart: '1',
    gridColumnEnd: '5',
    alignSelf: 'center',
    marginTop: '75px',
    fontSize: '64px',
    gridRow: '1',
    [theme.breakpoints.down('md')]: {
      fontSize: '40px'
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
      marginBottom: '60px',
      marginTop: '159px',
      fontSize: '40px'
    }
  },
  photoContainer: {
    ...containerHelper,
    gridColumn: '6/-1',
    gridRow: '1',
    marginTop: '159px',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '4/-1',
      gridRow: '2',
      marginTop: '0'
    }
  },
  quote: {
    gridRow: '2',
    gridColumn: '1/4',
    alignSelf: 'center',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
      gridRow: '3'
    }
  },
  ImageCaption: {
    [theme.breakpoints.down('md')]: { display: 'none' }
  },
  ImageContainer: {
    ml: '0',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '2/-1'
    }
  }
});
