import { Theme } from '@mui/material/styles';

import { mainHexPallete } from '~/ds-components//theme/colors';

export const ControlPanelStyles = {
  root: (theme: Theme) => ({
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
    ['@media (max-width:400px)']: {
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
    backgroundColor: searchActive ? mainHexPallete.black : mainHexPallete.white,
    color: searchActive ? mainHexPallete.white : mainHexPallete.black,
    border: `1px solid ${mainHexPallete.black}`,
    '&:hover': {
      backgroundColor: searchActive ? mainHexPallete.black : mainHexPallete.white
    }
  })
};
