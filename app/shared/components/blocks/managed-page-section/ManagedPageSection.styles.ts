import { bulletIconSizes, bulletIconWrapper, sectionMainContainer } from '../section-block.styles';

export const styles = {
  mainContainer: sectionMainContainer,

  items: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: { xs: '2 / -1', sm: '4 / 8', md: '6 / 11', lg: '6 / -1' },
    gap: {
      xs: '24px',
      md: '32px'
    },
    mt: { xs: '40px', md: '75px' }
  },

  bulletItem: {
    display: 'flex',
    gap: { xs: '8px', sm: '16px', md: '20px' },
    alignItems: 'flex-start'
  },

  iconWrapper: bulletIconWrapper
};

export const iconSizes = bulletIconSizes;
