import { mainHexPallete } from '../../theme/colors';

export const styles = {
  container: {
    backgroundColor: mainHexPallete.white,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '57px',
    pt: '24px',
    pl: '16px',
    pr: '16px'
  },
  textfieldContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px'
  },
  textfield: {
    width: '117px'
  },
  divider: {
    background: mainHexPallete.white,
    mt: '8px',
    mb: '8px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    pr: '8px',
    pl: '8px',
    mb: '8px'
  }
};
