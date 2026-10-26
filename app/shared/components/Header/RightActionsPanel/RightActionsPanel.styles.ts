export const styles = {
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  languageSwitcher: (isMobile: boolean) => ({
    display: isMobile ? 'none' : 'block'
  }),
  backgroundContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    height: { xs: '40px', sm: '52px' },
    borderRadius: '40px',
    border: { xs: 'none', sm: '6px solid' },
    borderColor: { xs: 'none', sm: 'white' },
    width: { xs: '80px', sm: 'auto' },
    gap: { xs: 0, sm: '16px' }
  }
};
