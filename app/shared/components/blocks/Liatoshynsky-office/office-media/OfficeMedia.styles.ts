const basePhoto = {
  position: 'relative',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.09)',
    zIndex: 2
  },
  width: { xs: 110, sm: 133, md: 167, lg: 210, xl: 230 },
  aspectRatio: '3 / 4',
  cursor: 'pointer',
  backgroundPosition: 'center',
  backgroundSize: 'cover'
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
    width: { xs: '78px', sm: '97px', md: '130px', lg: '186px' },
    height: { xs: '105px', sm: '130px', md: '176px', lg: '251px' },
    transform: 'rotate(-7.65deg)'
  },
  photo2: {
    ...basePhoto,
    width: { xs: '82.8px', sm: '102px', md: '138px', lg: '197px' },
    height: { xs: '111.6px', sm: '138px', md: '186px', lg: '266px' },
    transform: {
      xs: 'rotate(5.09deg)',
      sm: 'rotate(5.09deg) translateY(10px)',
      lg: 'rotate(5.09deg) translateY(35px)'
    },
    top: '4px'
  },
  photo3: {
    ...basePhoto,
    width: { xs: '78.9px', sm: '97px', md: '132px', lg: '188px' },
    height: { xs: '107.9px', sm: '132px', md: '178px', lg: '256px' },
    transform: {
      xs: 'rotate(2.68deg)',
      sm: 'rotate(1deg)',
      md: 'rotate(2deg)'
    },
    left: '3px'
  },
  logo: {
    position: 'absolute',
    bottom: { xs: '-15px', sm: '-30px', md: '-30px', lg: '-50px' },
    right: { xs: '35px', sm: '-23px', md: '20px', lg: '40px' },
    zIndex: 3
  }
};
