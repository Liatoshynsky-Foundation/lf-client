import { mainHexPallete } from '../../design-system/all-components/theme/colors';

export const styles = {
  controls: (isMobile: boolean) => ({
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '18px'
  }),
  backgroundContainer: (isModile: boolean, isTablet: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isModile || isTablet ? 'none' : mainHexPallete.white,
    maxHeight: '52px',
    borderRadius: '40px',
    border: isModile || isTablet ? 'none' : `6px solid ${mainHexPallete.white}`,
    gap: '18px'
  })
};
