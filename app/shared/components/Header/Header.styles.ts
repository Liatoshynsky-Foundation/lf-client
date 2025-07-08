export const styles = {
  mainContainer: {
    display: 'flex',
    position: 'fixed',
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1920px',
    maxHeight: '52px',
    mx: 'auto',
    px: 9,
    pointerEvents: 'auto'
  },
  logoContainer: {
    position: 'relative',
    right: '22px'
  },
  navigationContainer: (isVisible: boolean) => ({
    marginRight: { xl: '35px', xxl: '70px' },
    fontSize: { md: '15px', lg: '16px' },
    transition: 'transform 0.4s ease',
    transform: isVisible ? 'translateY(0)' : 'translateY(-150%)'
  })
};
