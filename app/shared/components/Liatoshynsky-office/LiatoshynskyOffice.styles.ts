export const styles = {
  mainContainer: {
    maxWidth: '1582px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: { xs: 'auto', sm: '640px', md: '680px', lg: '768px' },
    position: 'relative',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  trapezoid: {
    background: '#FCBD28',
    clipPath: 'polygon( 0% 2%, 100% 0%, 100% 98%, 0% 100%)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  contentContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
    gap: { xs: 3, sm: 4 },
    paddingTop: { xs: '20px', sm: '30px' },
    paddingBottom: { xs: '60px', sm: '80px' }
  },
  quoteBlock: {
    position: { xs: 'relative', sm: 'absolute' },
    top: { md: '50px' },
    alignSelf: { xs: 'flex-end' },
    right: { xs: '30px', sm: '50px', md: '65px', lg: '80px' },
    zIndex: 2
  },
  textBlock: {
    position: 'relative',
    paddingLeft: { xs: '20px', sm: '30px', md: '40px', lg: '80px', xl: '130', xxl: '130px', ultra: '130px' },
    paddingTop: { xs: 0, sm: '260px', md: '200px', lg: '165px' },
    textAlign: { xs: 'left' }
  },
  indentedLine: {
    display: 'block',
    paddingLeft: { xs: '10px', sm: '28px', md: '110px', lg: '125px' }
  },
  buttonBlock: {
    position: { xs: 'relative', sm: 'absolute' },
    bottom: { xs: 0, sm: '85px', md: '100px', lg: '140px' },
    left: { xs: 0, sm: '30px', md: '60px', lg: '110px', xl: '160px', xxl: '160px', ultra: '160px' },
    alignSelf: { xs: 'center' }
  },
  text: {
    fontFamily: 'Oswald, sans-serif',
    fontSize: { xs: '44px', sm: '68px', md: '92px', lg: '116px' },
    lineHeight: '100%',
    letterSpacing: '-2px',
    color: 'white'
  },
  media: {
    position: { xs: 'relative', sm: 'absolute' },
    bottom: { xs: '45px', sm: '120px', md: '120px', lg: '145px', xl: '130px', xxl: '125px', ultra: '125px' },
    right: { xs: 'auto', sm: '30px', md: '50px', lg: '80px', xl: '80px', xxl: '175px', ultra: '175px' },
    alignSelf: { xs: 'center' }
  }
};
