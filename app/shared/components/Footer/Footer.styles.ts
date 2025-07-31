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
    left: '-60px',
    width: '150%',
    height: '150%',
    backgroundColor: '#FCBD28',
    transform: 'rotate(-2deg)',
    transformOrigin: 'top left',
    zIndex: 0
  },
  footerContent: {
    padding: {
      xs: '48px 24px 88px',
      sm: '35px 56px 40px',
      md: '24px 72px 40px',
      lg: '36px 72px 48px'
    },
    position: 'relative',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: {
      sm: 'auto auto auto 1fr auto auto auto',
      lg: 'auto'
    }
  },
  switcherWrapper: {
    justifySelf: { xs: 'start', sm: 'end' },
    marginBottom: {
      xs: '64px',
      sm: '0'
    },
    gridColumn: '1 / 13',
    gridRow: {
      xs: '6',
      sm: '1'
    }
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: {
      xs: 'center',
      sm: 'flex-start'
    },
    width: '100%',
    marginBottom: { xs: '35px', sm: '32px' },
    gridColumn: '1 / 13',
    transform: { sm: 'translate(-23px)' }
  },
  contactInfoWrapper: {
    marginBottom: { xs: '32px', sm: '40px', md: '60px' },
    gridColumn: {
      xs: '1 / 13',
      sm: '1 / 9',
      md: '1 / 6',
      lg: '1 / 5',
      xl: '1 / 6'
    },
    alignSelf: { lg: 'stretch' }
  },
  contactAndSupportWrapper: {
    marginBottom: { xs: '64px', md: '28px', lg: 0 },
    gridColumn: {
      xs: '1 / 13',
      sm: '1 / 9',
      md: '1 / 6',
      lg: '1 / 7'
    },
    alignSelf: 'stretch'
  },
  socialWrapper: {
    marginBottom: {
      xs: '64px',
      sm: '24px',
      md: '137px',
      lg: '120px',
      xl: '112px'
    },
    justifySelf: { md: 'end' },
    gridColumn: {
      xs: '1 / 13',
      sm: '1 / 8',
      md: '1 / 13',
      lg: '7 / 13'
    },
    gridRow: {
      lg: '4 / 5'
    }
  },
  navigationWrapper: {
    marginBottom: {
      xs: '64px',
      sm: '58px',
      md: '28px',
      lg: '32px',
      xl: '56px'
    },
    gridColumn: {
      xs: '1 / 13',
      sm: '9 / 13',
      md: '6 / 13',
      lg: '5 / 13',
      xl: '6 / 13'
    },
    gridRow: {
      sm: '3 / 5',
      lg: '3 / 4'
    }
  },
  copyrightWrapper: {
    gridColumn: {
      xs: '1 / 13',
      lg: '1 / 10'
    }
  },
  openTechWrapper: {
    position: 'absolute',
    right: '0',
    bottom: {
      xs: '34px',
      sm: '202px',
      md: '155px',
      lg: '48px',
      xl: '51px'
    }
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
