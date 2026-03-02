export const styles = {
  card: {
    position: 'relative',
    width: { xs: '296px', md: '272px' },
    height: '351px',
    overflow: 'hidden'
  },
  background: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '402px',
    height: '337px',
    background: 'rgba(237, 232, 223, 1)',
    transform: 'translate(-50%, -50%) rotate(-2deg)'
  },
  content: {
    position: 'relative',
    padding: { xs: '20px', sm: '40px 30px', lg: '48px 40px' },
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'transparent'
  },
  description: {
    fontFamily: 'Mulish, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    color: '#190D03',
    maxWidth: '216px'
  },
  title: {
    fontFamily: 'Mulish, sans-serif',
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '130%',
    color: '#190D03',
    marginTop: { xs: '80px', md: '30px', lg: '50px' }
  }
};
