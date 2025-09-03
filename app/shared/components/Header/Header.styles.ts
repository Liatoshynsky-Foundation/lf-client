export const styles = {
  mainContainer: (hideHeader: boolean) => ({
    display: 'flex',
    transition: 'transform 0.4s ease',
    transform: hideHeader ? 'translateY(-200%)' : 'translateY(0)',
    position: 'fixed',
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1920px',
    maxHeight: '52px',
    mx: 'auto',
    px: '24px',
    pointerEvents: 'auto'
  }),
  logoContainer: {
    position: 'relative'
  },
  navigationContainer: {
    marginRight: { xl: '35px', xxl: '70px' },
    fontSize: { md: '15px', lg: '16px' }
  },
  rightActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  desktopNavWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: { sm: '60px', md: '200px' }
  }
};
