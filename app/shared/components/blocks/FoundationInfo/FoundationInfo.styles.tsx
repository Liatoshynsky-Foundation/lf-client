import { Theme } from '@mui/material';

import { theme } from '~/ds-components/theme/Theme';

const conatinerHelper = {
  display: 'grid',
  gridTemplateColumns: 'subgrid'
};
const mainText = {
  fontFamily: 'Mulish',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '160%',
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
    lineHeight: '180%'
  }
};
export const styles = (theme: Theme) => ({
  container: {
    ...conatinerHelper,
    gridColumn: '1 / -1',
    gridTemplateRows: 'repeat(6, auto)',
    columnGap: '40px',
    position: 'relative',
    marginBottom: '180px',
    [theme.breakpoints.down('sm')]: {
      columnGap: '16px',
      marginBottom: '90px'
    }
  },
  organisationSection: {
    gridRow: '4',
    gridColumnStart: '6',
    gridColumnEnd: '-1',
    textAlign: 'justify',
    marginTop: '75px',
    marginBottom: '96px',
    [theme.breakpoints.down('md')]: {
      gridColumnStart: '4'
    },
    [theme.breakpoints.down('sm')]: {
      gridColumnStart: '2'
    }
  },
  organisationText: {
    fontFamily: 'Mulish',
    fontWeight: 800,
    fontSize: '28px',
    lineHeight: '160%',
    textTransform: 'uppercase',
    marginRight: '200px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      lineHeight: '180%'
    }
  },
  explanationSection: {
    ...conatinerHelper,
    gridRow: '5',
    gridColumn: 'span 12',
    marginBottom: '94px',
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 4'
    }
  },
  explanationText: {
    fontFamily: 'Mulish',
    fontWeight: 500,
    fontSize: '28px',
    lineHeight: '160%',
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      lineHeight: '180%'
    }
  },
  FirstBulletIcon: {
    gridColumn: '12',
    justifySelf: 'end',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  textSection: {
    ...mainText,
    gridColumn: '1/9',
    [theme.breakpoints.down('md')]: { gridColumn: '1/7', fontSize: '18px', lineHeight: '180%' },
    [theme.breakpoints.down('sm')]: { gridColumn: '1/6' }
  },
  textImage: {
    ...mainText,
    gridRow: '6',
    gridColumn: '1/6',
    [theme.breakpoints.down('md')]: { gridColumn: '1/4', fontSize: '18px' },
    [theme.breakpoints.down('sm')]: { gridColumn: '1/-2' }
  },
  bodyImage: {
    gridColumn: '6/-5',
    gridRow: '6',
    width: '100%',
    height: '450px',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      gridColumn: '4/span 3',
      width: '230px',
      height: '300px'
    },
    [theme.breakpoints.down('sm')]: {
      gridRow: '7',
      gridColumn: '2/-1',
      width: '230px',
      height: '300px',
      marginTop: '40px',
      marginBottom: '96px'
    }
  }
});
