import { mainHexPallete } from '../theme/colors';

export const BreadCrumbsStyles = {
  typography: {
    color: mainHexPallete.black
  },
  box: {
    '&hover': {
      textDecoration: 'underline'
    }
  }
};
