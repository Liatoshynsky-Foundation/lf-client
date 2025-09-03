import { backgroundColors } from '../../theme/colors';

export const styles = {
  iconButton: (isMobile: boolean) => ({
    borderRadius: '32px',
    minWidth: isMobile ? '88px' : '112px',
    minHeight: isMobile ? '32px' : '52px',
    backgroundColor: backgroundColors.offWhite,
    border: `${isMobile ? 4 : 6}px solid ${backgroundColors.white}`,
    '&:hover': {
      backgroundColor: backgroundColors.lightGray
    }
  })
};
