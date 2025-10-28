import { mainHexPallete } from '../../design-system/all-components/theme/colors';

export const styles = {
  imageContainer: {
    position: 'relative',
    height: {
      xs: '89.16px',
      md: '133px'
    },
    width: {
      xs: '212px',
      md: '252px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    p: {
      sm: '51.42px 35px',
      md: '80.5px 103px'
    }
  },
  wrapper: {
    maxWidth: {
      xs: '488px',
      md: '632px'
    },
    backgroundColor: {
      xs: 'transparent',
      sm: mainHexPallete.white
    }
  }
};
