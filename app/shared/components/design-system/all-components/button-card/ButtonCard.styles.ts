export const styles = {
  container: {
    position: 'relative',
    width: { xs: '296px', md: '272px' },
    height: '351px',
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover .background': {
      transform: 'translate(-50%, -50%) rotate(0deg)'
    }
  },
  background: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '402px',
    height: '337px',
    background: 'yellow.500',
    transform: 'translate(-50%, -50%) rotate(-2deg)',
    transition: 'all 0.3s ease-in-out'
  },
  content: {
    position: 'relative',
    padding: { xs: '25px 20px', sm: '40px 30px', lg: '48px 40px' },
    width: { xs: '100%', sm: '296px' },
    height: '351px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    background: 'transparent'
  },
  arrowDown: {
    position: 'absolute',
    bottom: '40px',
    right: '40px'
  }
};
