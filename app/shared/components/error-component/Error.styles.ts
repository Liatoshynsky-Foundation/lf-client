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
    position: 'relative',
    '& svg': {
      width: {
        xs: '272px',
        sm: '546px',
        md: '713px',
        lg: '821px'
      },
      height: {
        xs: '132px',
        sm: '264px',
        md: '344px',
        lg: '396px'
      }
    }
  },
  carContainer: {
    position: 'absolute',
    bottom: 0,
    left: '53%',
    width: {
      xs: '90.04px',
      sm: '164.87px',
      md: '220.59px',
      lg: '260.09px'
    },
    height: {
      xs: '58.25px',
      sm: '116.49px',
      md: '151.79px',
      lg: '174.73px'
    }
  },
  text: {
    pt: { xs: '40px', lg: '56px' }
  }
};
