export const styles = {
  partnerLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    '& img': {
      filter: 'grayscale(100%)',
      transition: 'filter 0.3s ease',
      willChange: 'filter'
    },
    '&:hover img': {
      filter: 'none'
    }
  }
};
