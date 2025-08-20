import { mainHexPallete } from '../design-system/all-components/theme/colors';

export const styles = {
  container: {
    backgroundColor: mainHexPallete.white,
    padding: {
      xs: '40px 24px',
      sm: '64px 32px',
      md: '76px 53px',
      lg: '90px 80px'
    },
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  block: {
    transform: 'skewY(-2deg)',
    minHeight: { xs: 710, sm: 740, md: 823 },
    minWidth: { xs: 320, sm: 400, md: 496, lg: 646 },
    my: '160px'
  },

  modal: {
    maxHeight: '824px',
    maxWidth: '744px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) skewY(-2deg)',
    zIndex: 1300
  },

  icon: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    zIndex: 10
  },
  children: {
    transform: 'skewY(2deg)',
    width: '100%'
  }
};
