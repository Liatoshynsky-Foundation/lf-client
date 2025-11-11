import { mainHexPallete } from '../../../theme/colors';

import { AppTypography } from '~/constants';

export const styles = {
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  mediaTitles: {
    ...AppTypography.mulish18Regular,
    fontSize: { xs: '16px', md: '18px' },
    lineHeight: { xs: '150%', md: '160%' },
    color: mainHexPallete.brown[700],
    display: { xs: 'none', sm: 'block' }
  },
  socialMediaBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { sm: '8px', md: '10px' }
  }
};
