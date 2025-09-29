import { mainHexPallete } from '../theme/colors';

export const styles = {
  container: {
    width: '294px',
    height: '386px',
    backgroundColor: mainHexPallete.yellow[200],
    px: '34px',
    py: '48px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    marginBottom: '16px'
  },
  listItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  listText: {
    marginBottom: '4px'
  }
};
