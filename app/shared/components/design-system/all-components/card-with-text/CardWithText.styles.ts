import { mainHexPallete } from '../theme/colors';

export const styles = {
  container: {
    width: '294px',
    height: '386px',
    backgroundColor: mainHexPallete.yellow[200],
    px: '34px',
    pt: '34px',
    pb: '48px',
    boxSizing: 'border-box'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  },
  contentBox: {
    pt: '14px',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    marginBottom: '16px',
    flexShrink: 0
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  listItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start'
  },
  listIcon: {
    marginTop: '6px'
  },
  listText: {
    lineHeight: 1.5
  }
};
