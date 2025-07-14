export const styles = {
  container: {
    position: 'relative',
    width: '296px',
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
    background: 'rgba(252, 189, 40, 1)',
    transform: 'translate(-50%, -50%) rotate(-2deg)',
    transition: 'all 0.3s ease-in-out'
  },
  content: {
    position: 'relative',
    padding: '48px 40px',
    width: '296px',
    height: '351px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    background: 'transparent'
  }
};
