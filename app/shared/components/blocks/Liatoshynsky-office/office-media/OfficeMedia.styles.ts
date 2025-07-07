const basePhoto = {
  position: 'relative',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.09)',
    zIndex: 2
  },
  width: { xs: 110, sm: 133, md: 167, lg: 210, xl: 230 },
  aspectRatio: '3 / 4',
  cursor: 'pointer'
};

export const styles = {
  mainContainer: {
    position: 'relative',
    width: 'fit-content'
  },
  mediaContainer: {
    display: 'flex'
  },
  photo1: {
    ...basePhoto,
    top: '0px',
    marginLeft: 0
  },
  photo2: {
    ...basePhoto,
    top: { xs: '5px', md: '35px' },
    marginLeft: { xs: '-15px', md: '-27px' }
  },
  photo3: {
    ...basePhoto,
    top: '5px',
    marginLeft: { xs: '-2px', md: '-5px' }
  },
  logo: {
    position: 'absolute',
    bottom: '-38px',
    right: { xs: '0', sm: '20px', md: '30px', lg: '55px' },
    zIndex: 3
  }
};
