import { AppTypography } from '~/constants';

export const styles = {
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '8px', sm: '16px' }
  },
  mediaTitles: {
    ...AppTypography.mulish18Regular,
    fontSize: { xs: '16px', md: '18px' },
    lineHeight: { xs: '150%', md: '160%' },
    color: 'brown.700',
    display: { xs: 'none', sm: 'block' }
  },
  socialMediaBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { sm: '8px', md: '10px' }
  },
  contactLabel: {
    fontSize: { sm: '16px', md: '18px' },
    lineHeight: { sm: '150%', md: '160%' }
  },
  contactLink: {
    fontSize: { xs: '16px', md: '18px' },
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
