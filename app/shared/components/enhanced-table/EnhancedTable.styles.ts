import type { Theme } from '@mui/material';

export const enhancedTableStyles = {
  root: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    py: 20,
    gap: 4,
    gridColumn: '1 / -1',

    marginLeft: `-${theme.spacing(2.5)}`,
    marginRight: `-${theme.spacing(2.5)}`,
    width: `calc(100% + ${theme.spacing(2.5)} * 2)`,

    [theme.breakpoints.up('sm')]: {
      marginLeft: `-${theme.spacing(7)}`,
      marginRight: `-${theme.spacing(7)}`,
      width: `calc(100% + ${theme.spacing(7)} * 2)`
    },

    [theme.breakpoints.up('md')]: {
      marginLeft: `-${theme.spacing(9)}`,
      marginRight: `-${theme.spacing(9)}`,
      width: `calc(100% + ${theme.spacing(9)} * 2)`
    }
  }),

  container: {
    width: '100%',
    boxShadow: 'none',
    border: 'none'
  },

  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    pt: 3,
    gap: { xs: 3, md: 4 },
    alignItems: 'center'
  },

  title: {
    pl: 9
  },

  loaderBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px'
  },

  loadMoreButton: {
    p: { xs: '12px 56.5px', sm: '12px 89.5px', md: '16px 48px' },
    fontSize: { xs: '16px', md: '18px' },
    fontWeight: { xs: '500', md: '600' }
  }
} as const;
