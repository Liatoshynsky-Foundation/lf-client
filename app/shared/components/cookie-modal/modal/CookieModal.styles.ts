export const styles = {
  container: {
    maxWidth: '520px',
    height: '100%'
  },
  childrenBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
  },
  title: {
    fontWeight: 700,
    fontSize: '20px',
    fontFamily: 'var(--font-mulish)',
    lineHeight: '140%',
    letterSpaccing: 0
  },
  topSection: {
    marginBottom: '10px'
  },
  link: {
    fontWeight: '700',
    textDecoration: 'underline',
    lineHeight: '150%',
    letterSpaccing: 0
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: '8px',
    padding: '16px 8px'
  }
};
