import { Theme } from '@mui/material';

import { theme } from '~/ds-components/theme/Theme';

import { AppTypography } from '~/constants';

const conatinerHelper = {
  display: 'grid',
  gridTemplateColumns: 'subgrid'
};
const mainText = {
  fontFamily: 'Mulish',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '160%',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '180%'
  }
};
export const styles = (theme: Theme) => ({
  conatiner: {
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
  title: {
    ...AppTypography.oswald64Semibold,
    display: 'flex',
    gridColumnStart: '1',
    gridColumnEnd: '5',
    alignSelf: 'center',
    marginTop: '75px',
    marginBottom: '125px',
    [theme.breakpoints.down('sm')]: {
      gridColumnEnd: '3',
      fontSize: '40px'
    }
  },
  photoContainer: {
    ...conatinerHelper,
    gridColumn: '5/12',
    gridRow: '1/ span 2',
    justifySelf: 'end',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1 / span 4',
      gridRow: '2'
    }
  },
  ImageCaption: {
    [theme.breakpoints.down('md')]: { display: 'none' }
  },
  imageFirst: {
    gridColumn: '3/9',
    marginLeft: '-40px',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '2/ span 4'
    }
  },
  quote: {
    gridRow: '2/span 2',
    gridColumn: '1/4',
    alignSelf: 'center',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      gridRow: '3'
    }
  },
  organisationSection: {
    gridRow: '4',
    gridColumn: '5/13',
    textAlign: 'justify',
    marginTop: '75px',
    marginBottom: '96px',
    [theme.breakpoints.down('md')]: {
      gridColumn: '2/4'
    }
  },
  organisationText: {
    fontFamily: 'Mulish',
    fontWeight: 800,
    fontSize: '28px',
    lineHeight: '160%',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '180%'
    }
  },
  explanationSection: {
    ...conatinerHelper,
    gridRow: '5',
    gridColumn: 'span 12',
    marginBottom: '70px',
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 4'
    }
  },
  explanationText: {
    display: 'grid',
    fontFamily: 'Mulish',
    fontWeight: 500,
    fontSize: '28px',
    lineHeight: '160%',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '180%'
    }
  },
  bulletIcon: {
    gridColumn: '12',
    gridRow: '5',
    justifySelf: 'end',
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1',
      gridRow: '3'
    }
  },
  textSection: {
    ...mainText,
    gridColumn: '1/9',
    [theme.breakpoints.down('sm')]: { gridColumn: '1/6' }
  },
  textImageSection: {
    ...conatinerHelper,
    gridRow: '6',
    gridColumn: '1/9',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/8'
    }
  },
  textImage: {
    ...mainText,
    gridColumn: '1/6',
    [theme.breakpoints.down('sm')]: { gridColumn: '1/3' }
  },
  bodyImage: {
    gridColumn: '6/9',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '5/span 3',
      width: '230px',
      height: '300px',
      maxWidth: '100%'
    },
    '@media (max-width:376px)': {
      gridRow: '7'
    }
  }
});
