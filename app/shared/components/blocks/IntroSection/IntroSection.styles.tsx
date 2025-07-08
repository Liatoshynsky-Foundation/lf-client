import { Theme } from '@mui/material';

import { AppTypography } from '~/constants';

const conatinerHelper = {
  display: 'grid',
  gridTemplateColumns: 'subgrid'
};

export const styles = (theme: Theme) => ({
  container: {
    ...conatinerHelper,
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
    marginBottom: '125px',
    [theme.breakpoints.down('md')]: {
      fontSize: '40px'
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
      marginBottom: '60px'
    }
  },
  photoContainer: {
    ...conatinerHelper,
    gridColumn: '6/-1',
    gridRow: '1/ span 2',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
      gridRow: '2'
    }
  },
  quote: {
    gridRow: '2/span 2',
    gridColumn: '1/4',
    alignSelf: 'center',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
      gridRow: '3'
    }
  },
  SecondBulletIcon: {
    gridColumn: '1',
    justifySelf: 'start',
    marginTop: '75px',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
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
