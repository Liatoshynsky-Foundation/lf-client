export const styles = {
  wrapper: {
    bgcolor: {
      xs: '#FCFCFC',
      sm: '#F2EEE8'
    }
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  paper: {
    mt: 'calc((100vw * 0.035) * -1)',
    maxWidth: 920,
    width: { xs: '272px', sm: '488px', md: '690px' },
    height: { xs: '380px', sm: '439px', md: '551px' },
    bgcolor: {
      xs: 'transparent',
      sm: '#FCFCFC'
    }
  },

  paperChildren: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  contentBox: {
    textAlign: 'center',
    width: '418px'
  },

  logoWrapper: {
    mb: '32px',
    display: 'flex',
    justifyContent: 'center'
  },

  logoBox: {
    width: { xs: '157px', md: '214px' }
  },

  title: {
    fontWeight: 600,
    mb: '16px',
    fontSize: { xs: '40px', md: '48px' },
    lineHeight: { xs: '120%' }
  },

  subtitle: {
    maxWidth: 720,
    mb: '24px',
    fontSize: '16px',
    fontWeight: 500,
    fontFamily: 'Mulish',
    lineHeight: { xs: '150%' }
  },

  button: {
    maxHeight: '40px',
    maxWidth: '242px',
    fontSize: '16px',
    fontWeight: 600
  }
};
