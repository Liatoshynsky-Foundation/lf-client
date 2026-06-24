import { mainHexPallete } from '~/ds-components/theme/colors';
import { oswald } from '~/ds-components/theme/Theme';

import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  formTitle: {
    fontFamily: oswald.style.fontFamily,
    color: mainHexPallete.brown[900],
    textTransform: 'uppercase',
    mb: '8px',
    fontSize: commonSx.layout.typography.sectionTitle
  },

  formSubtitle: {
    color: mainHexPallete.brown[700],
    textIndent: { xs: '70px', md: '240px' },
    mb: '24px',
    fontSize: commonSx.layout.typography.bodyMedium
  }
};
