export const ControlPanelStyles = {
  root: (theme: any) => ({
    display: 'column',
    gap: 8,
    pl: 3,
    [theme.breakpoints.up('sm')]: { pr: '30px' },
    [theme.breakpoints.up('md')]: { pr: '60px' }
  }),
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    mb: 2
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    marginRight: '40px'
  },
  mobileSearchBox: {
    marginRight: '30px',
    marginBottom: '10px'
  },
  searchIconButton: {
    padding: '6px',
    minWidth: '40px',
    borderRadius: '8px'
  },
  filtersBadge: {
    '& .MuiBadge-badge': { top: '5px', right: '5px', borderRadius: '50%', minWidth: '18px', height: '18px' }
  },
  controlsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  filtersContainer: {
    marginBottom: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 2
  }
};
