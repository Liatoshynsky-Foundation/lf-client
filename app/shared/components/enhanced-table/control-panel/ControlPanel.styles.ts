export const ControlPanelStyles = {
  root: {
    pr: { xs: '2%', sm: 0 }
  },
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
    gap: {
      xs: 1,
      sm: 2
    }
  },
  filtersBadge: {
    '& .MuiBadge-badge': {
      top: '5px',
      right: { xs: '0px', md: '5px' },
      minWidth: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px'
    }
  },
  filterButton: {
    '@media (max-width:400px)': {
      '& .filtersLabel': {
        display: 'none'
      },
      '& .MuiButton-startIcon': {
        margin: 0,
        mt: '5px'
      },
      minWidth: 'auto',
      width: 40,
      height: 40,
      padding: 0
    },
    '& .MuiButton-startIcon': {
      marginRight: '4px'
    }
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
  },
  iconButton: (searchActive: boolean) => ({
    width: 40,
    height: 40,
    backgroundColor: searchActive ? 'black' : 'white',
    color: searchActive ? 'white' : 'black',
    border: '1px solid',
    borderColor: 'black',
    '&:hover': {
      backgroundColor: searchActive ? 'black' : 'white'
    }
  })
};
