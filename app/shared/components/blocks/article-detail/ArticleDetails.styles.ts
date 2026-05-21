const smallLabel = {
  fontFamily: 'Mulish',
  fontWeight: 500,
  fontSize: { xs: '12px', md: '16px' },
  lineHeight: '150%'
} as const;

export const styles = {
  container: {
    gridColumn: '1 / -1',
    width: { xs: '100%', sm: '80%', md: '57%' },
    marginLeft: { xs: 0, sm: 'auto', md: 'auto' },
    marginRight: { xs: 0, sm: 'auto', md: 0 },
    mb: { xs: '80px', md: '130px' },
    '& .MuiTypography-body1': {
      fontFamily: 'Mulish',
      fontWeight: 400,
      lineHeight: '160%',
      fontSize: '20px'
    }
  },
  bodyRow: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { xs: 'flex-start', md: 'stretch' },
    mb: { xs: '80px', md: '130px' }
  },
  registrationColumn: {
    width: { xs: '100%', md: '43%' },
    flexShrink: 0,
    mb: { xs: '50px', md: 0 },
    display: 'flex',
    flexDirection: 'column'
  },
  contentColumn: {
    width: { xs: '100%', md: '57%' },
    '& .MuiTypography-body1': {
      fontFamily: 'Mulish',
      fontWeight: 400,
      lineHeight: '160%',
      fontSize: '20px'
    }
  },
  newsHeader: {
    gridColumn: '1 / -1',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: { xs: '12px', md: '24px' },
    mb: { xs: '32px', md: '64px' },
    mt: { xs: '50px', md: '97px' }
  },
  newsHeaderTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    width: '100%'
  },
  newsTitle: {
    fontFamily: 'Mulish',
    fontWeight: 600,
    fontSize: { xs: '24px', md: '40px' },
    lineHeight: '150%',
    textTransform: 'uppercase',
    mt: 0,
    mb: 0
  },
  backLink: {
    paddingLeft: 0
  },
  backLinkLabel: smallLabel,
  publicDate: {
    ...smallLabel,
    whiteSpace: 'nowrap',
    flexShrink: 0
  }
};
