export const styles = {
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px'
  },
  buttonsContainer: (isMobile: boolean) => ({
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '18px'
  }),
  backgroundContainer: (isModile: boolean, isTablet: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isModile || isTablet ? 'none' : 'rgba(247, 245, 241, 1)',
    maxHeight: '52px',
    borderRadius: '40px',
    border: isModile || isTablet ? 'none' : '6px solid rgba(247, 245, 241, 1) '
  })
};
