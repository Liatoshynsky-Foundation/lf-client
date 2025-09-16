export const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    mt: { xs: '216px', sm: '154px', md: '172px', lg: '204px' },
    mb: '20em',
    boxSizing: 'border-box'
  },
  imageContainer: {
    position: 'relative'
  },
  carStyles: {
    position: 'absolute',
    bottom: 0,
    left: '53%'
  },
  text: {
    pt: { xs: '40px', lg: '56px' }
  },
  subtext: {},
  oops: (breakpoints: any) => {
    if (breakpoints.isMobile) {
      return {
        width: '272px',
        height: '132px'
      };
    } else if (breakpoints.isTablet) {
      return {
        width: '546px',
        height: '264px'
      };
    } else if (breakpoints.isLaptop) {
      return {
        width: '713px',
        height: '344px'
      };
    }
    return {
      width: '821px',
      height: '396px'
    };
  },
  carSize: (breakpoints: any) => {
    if (breakpoints.isMobile) {
      return {
        width: 90.04,
        height: 58.25
      };
    } else if (breakpoints.isTablet) {
      return {
        width: 164.87,
        height: 116.49
      };
    } else if (breakpoints.isLaptop) {
      return {
        width: 220.59,
        height: 151.79
      };
    }
    return {
      width: 260.09,
      height: 174.73
    };
  }
};
