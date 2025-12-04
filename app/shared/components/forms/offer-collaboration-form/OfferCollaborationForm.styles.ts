import { mainHexPallete } from '~/ds-components/theme/colors';
import { oswald } from '~/ds-components/theme/Theme';

export const styles = {
  formTitle: {
    fontFamily: oswald.style.fontFamily,
    color: mainHexPallete.brown[900],
    textTransform: 'uppercase',
    mb: '8px',
    fontSize: { xs: '20px', md: '28px' }
  },

  formSubtitle: {
    color: mainHexPallete.brown[700],
    textIndent: { xs: '70px', md: '240px' },
    mb: '24px',
    fontSize: { xs: '16px', md: '18px' }
  }
};
