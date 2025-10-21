export const styles = {
  container: (color: string) => ({
    width: '100%',
    minHeight: 'calc(100vh + (100vw * 0.035))',
    background: color,
    pt: {
      xs: '70px',
      sm: '82px',
      md: '100px',
      lg: '92px'
    },
    pb: 'calc(100% * 0.035)'
  }),
  childrenBox: {
    pt: { xs: '120px', sm: '120px', md: '136px', lg: '136px', xl: '55px' },
    pb: { xs: '45px', sm: '160px' }
  }
};
