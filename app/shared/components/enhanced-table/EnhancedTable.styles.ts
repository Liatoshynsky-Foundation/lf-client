export const enhancedTableStyles = {
  root: (theme: any) => ({
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
    gap: 4,
    alignItems: 'center'
  },
  title: {
    pl: 9
  }
};
