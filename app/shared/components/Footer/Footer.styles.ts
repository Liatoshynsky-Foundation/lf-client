export const styles = {
  footerContainer: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    paddingTop: 'calc(100vw * 0.035)',
    marginTop: 'calc((100vw * 0.035) * -1)',
    zIndex: '2',
    left: 0
  },
  backgroundBox: {
    position: 'absolute',
    left: '0',
    width: '100vw',
    height: '150%',
    backgroundColor: '#FCBD28',
    transform: 'skewY(-2deg)',
    transformOrigin: 'top left',
    zIndex: 0
  },
  footerContent: {
    position: 'relative',
    width: '100%',
    maxWidth: '1728px',
    padding: {
      xs: '48px 24px 86px',
      sm: '35px 56px 56px',
      md: '24px 72px 72px',
      lg: '36px 72px 72px',
      xl: '36px 72px 50px'
    },
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    gridTemplateRows: {
      xs: 'auto auto auto 1fr auto auto auto',
      lg: 'auto'
    }
  },
  switcherWrapper: {
    justifySelf: { xs: 'start', sm: 'end' },
    marginBottom: {
      xs: '72px',
      sm: '0'
    },
    gridColumn: '1 / -1',
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
    gridColumn: '1 / -1',
    transform: { sm: 'translate(-23px)' }
  },
  contactInfoWrapper: {
    marginBottom: { xs: '38px', sm: '40px', md: '60px' },
    gridColumn: {
      xs: '1 / 5',
      sm: '1 / 6',
      md: '1 / 7',
      lg: '1 / 5',
      xl: '1 / 6'
    },
    alignSelf: { lg: 'stretch' }
  },
  contactAndSupportWrapper: {
    marginBottom: { xs: '40px', md: 0 },
    gridColumn: {
      xs: '1 / 5',
      sm: '1 / 6',
      md: '1 / 7'
    },
    alignSelf: 'stretch'
  },
  socialWrapper: {
    marginBottom: {
      xs: '48px',
      sm: '24px',
      md: '0px'
    },
    display: 'flex',
    justifySelf: { md: 'end' },
    alignItems: { md: 'end' },
    gridColumn: {
      xs: '1 / -1',
      md: '7 / 13'
    },
    gridRow: {
      md: '4 / 5'
    }
  },
  navigationWrapper: {
    marginBottom: {
      xs: '48px',
      sm: '72px',
      md: '28px',
      lg: '32px',
      xl: '56px'
    },
    gridColumn: {
      xs: '1 / 5',
      sm: '6 / 9',
      md: '7 / 13',
      lg: '5 / 13',
      xl: '6 / 13'
    },
    gridRow: {
      sm: '3 / 5',
      md: '3 / 4'
    }
  },
  copyrightWrapper: {
    marginTop: { md: '126px', lg: '72px' },
    gridColumn: {
      xs: '1 / 5',
      sm: '1 / -1',
      lg: '1 / 10'
    }
  },

  openTechWrapper: {
    position: 'absolute',
    right: '0',
    bottom: {
      xs: '64px',
      sm: '306px',
      md: '278px',
      lg: '218px',
      xxl: '250px'
    }
  },

  svgContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: {
      xs: '320px',
      sm: '768px',
      md: '1024px',
      lg: '1280px',
      xl: '1448px',
      xxl: '1728px'
    },
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
