export const styles = {
  container: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: {
      xs: 'repeat(1, 258px)',
      sm: 'repeat(2, 258px)',
      md: 'repeat(2, 296px)',
      lg: 'repeat(3, 296px)',
      xl: 'repeat(4, 296px)'
    },
    gap: { xs: '56px', sm: '40px' }
  },
  logo: {
    mt: '44px'
  }
};
