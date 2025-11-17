import { AppTypography } from '~/constants';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';

export const styles = {
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '8px', md: '6px' }
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
  },
  contactLabel: {
    fontSize: { sm: '16px', md: '18px' },
    lineHeight: { sm: '150%', md: '160%' },
    mb: { sm: '-6px', md: 0 }
  },
  contactLink: {
    fontSize: { xs: '16px', md: '18px' },
    textDecoration: 'underline',
    height: { xs: '34px', sm: '20px', md: '24px' },
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
