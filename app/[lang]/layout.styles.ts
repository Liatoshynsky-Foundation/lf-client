import { theme } from '~/ds-components/theme/Theme';

export const layoutStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100vw'
  },
  grid: {
    padding: '20px 72px',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    columnGap: '40px',
    maxWidth: '1920px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    flex: '1',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(8, 1fr)',
      paddingLeft: '56px',
      paddingRight: '56px',
      columnGap: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      paddingLeft: '24px',
      paddingRight: '24px',
      columnGap: '16px'
    }
  }
};
