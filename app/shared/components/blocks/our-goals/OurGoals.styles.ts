import { bulletIconSizes, bulletIconWrapper, sectionMainContainer } from '../section-block.styles';

export const styles = {
  mainContainer: sectionMainContainer,

  goalsGrid: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row'
    },
    flexWrap: {
      lg: 'wrap'
    },
    gridColumn: { xs: '2 / -1', sm: '4 / 8', md: '6 / 11', lg: '6 / -1' },
    gap: {
      xs: '47px',
      md: '56px',
      lg: '22px 56px'
    },
    mt: { xs: '40px', md: '75px' }
  },

  cardWithIcon: {
    maxWidth: {
      lg: '295px',
      xl: '344px',
      xxl: '425px'
    },
    display: 'flex',
    gap: { xs: '8px', sm: '16px', md: '20px' },
    alignItems: 'flex-start'
  },

  iconWrapper: bulletIconWrapper
};

export const iconSizes = bulletIconSizes;
