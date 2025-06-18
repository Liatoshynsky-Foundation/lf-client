import { mainHexPallete } from '../design-system/all-components/theme/colors';

export const enhancedTableStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    py: 20,
    mx: -3,
    gap: 3
  },
  container: {
    width: '100%',
    boxShadow: 'none',
    border: 'none'
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 3,
    alignItems: 'center'
  },
  tableCell: {
    border: 'none',
    borderBottom: `2px solid ${mainHexPallete.blue[200]}`
  },
  title: {
    pl: 9
  }
};
