export const styles = {
  footerContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#FCBD28',
    overflow: 'hidden',
    paddingTop: '75px'
  },
  skewedTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '55px',
    backgroundColor: '#FFF',
    clipPath: 'polygon(0 0, 100% 0, 100% 1%, 0 70%)'
  },
  footerContent: {
    padding: { xs: '80px 24px', md: '40px 24px' },
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    alignItems: { xs: 'center', md: 'flex-start' },
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  infoAndNavigationWrapper: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'center', md: 'flex-start' },
    gap: { xs: '16px', md: '24px' },
    flexWrap: { xs: 'nowrap', md: 'nowrap' },
    padding: '30px 0 40px 0',
    position: 'relative'
  },
  contactAndSupportWrapper: {
    padding: { xs: '0 0 25px 0', md: '0 0 70px 0' },
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  },
  switcherWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  copyrightWrapper: {
    position: 'absolute',
    right: '0',
    bottom: { xs: '8vh', md: '21vh', lg: '28vh' }
  },
  svgContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    marginBottom: 0,
    padding: 0,
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }
};
