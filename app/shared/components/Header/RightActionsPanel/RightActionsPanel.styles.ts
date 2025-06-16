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
  })
};
