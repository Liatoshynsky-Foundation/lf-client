import { mainHexPallete } from '~/ds-components/theme/colors';

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
    mt: {
      xs: '64px',
      md: '72px'
    },
    maxWidth: {
      xs: '488px',
      md: '632px'
    },
    backgroundColor: {
      xs: 'transparent',
      sm: mainHexPallete.white
    }
  },

  layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start'
  },
  wrapperLayout: {
    bgcolor: {
      xs: '#FCFCFC',
      sm: '#F2EEE8'
    }
  }
};
