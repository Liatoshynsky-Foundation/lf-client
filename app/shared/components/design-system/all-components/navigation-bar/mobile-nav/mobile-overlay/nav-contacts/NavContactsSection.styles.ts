import { AppTypography } from '~/constants';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '8px', sm: '16px' }
  },
  mediaTitles: {
    ...AppTypography.mulish18Regular,
    fontSize: commonSx.layout.typography.bodyMedium,
    lineHeight: { xs: '150%', md: '160%' },
    color: mainHexPallete.brown[700],
    display: { xs: 'none', sm: 'block' }
  },
  socialMediaBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { sm: '8px', md: '10px' }
  },
  contactLabel: {
    fontSize: commonSx.layout.typography.bodyMedium,
    lineHeight: { sm: '150%', md: '160%' }
  },
  contactLink: {
    fontSize: commonSx.layout.typography.bodyMedium,
    height: { xs: '34px', sm: '44px', md: '24px' },
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: '20px',
    height: '20px',
    background: 'none',
    mr: '8px'
  }
};
