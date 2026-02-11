export const styles = {
  container: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    py: { xs: 8, md: 12 },
    px: { xs: 2, sm: 4 },
    minHeight: { xs: '300px', md: '400px' }
  },
  title: {
    mb: 2,
    color: 'text.primary',
    fontWeight: 500
  },
  description: {
    maxWidth: { xs: '100%', sm: '600px', md: '700px' },
    color: 'text.secondary',
    lineHeight: 1.6
  }
};
