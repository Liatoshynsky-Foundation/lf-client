export const styles = {
  mainContainer: (hideHeader: boolean) => ({
    display: 'flex',
    transition: 'transform 0.4s ease',
    transform: hideHeader ? 'translateY(-200%)' : 'translateY(0)',
    position: 'fixed',
    top: {
      xs: '30px',
      md: '48px',
      lg: '40px'
    },
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100vw',
    maxWidth: '1728px',
    maxHeight: '52px',
    mx: 'auto',
    px: {
      xs: '24px',
      sm: '56px',
      lg: '67px',
      xl: '72px'
    },
    pointerEvents: 'auto'
  }),
  logoContainer: {
    flex: {
      xs: 1,
      lg: 'auto'
    },
    position: 'relative',
    transform: {
      xs: 'translate(-17px)',
      sm: 'translate(-22px)'
    }
  },
  navigationContainer: {
    marginRight: { xl: '35px', xxl: '70px' },
    fontSize: { md: '15px', lg: '16px' }
  },
  rightActionsContainer: {
    flex: {
      xs: 1,
      lg: 'auto'
    },
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '20px'
  },
  navWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: { sm: '60px', md: '200px' }
  }
};
