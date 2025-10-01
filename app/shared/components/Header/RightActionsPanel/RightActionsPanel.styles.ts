import { backgroundColors } from '~/ds-components/theme/colors';

export const styles = {
  controls: (isMobile: boolean) => ({
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '4px'
  }),
  backgroundContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: backgroundColors.white,
    maxHeight: '52px',
    borderRadius: '40px',
    border: `6px solid ${backgroundColors.white}`,
    gap: '16px'
  }
};
