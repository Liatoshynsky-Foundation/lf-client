export const styles = {
  footerContainer: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    paddingTop: '105px',
    marginTop: { md: '-100px', xs: '-150px' },
    zIndex: '2',
    left: 0
  },
  backgroundBox: {
    position: 'absolute',
    left: '-50px',
    width: '150%',
    height: '150%',
    backgroundColor: '#FCBD28',
    transform: 'rotate(-2deg)',
    transformOrigin: 'top left',
    zIndex: 0
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
    width: '100%',
    zIndex: '2'
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
    width: { xs: '100%', xxl: '1728px' },
    overflow: 'hidden',
    margin: '0 auto',
    padding: 0,
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }
};
