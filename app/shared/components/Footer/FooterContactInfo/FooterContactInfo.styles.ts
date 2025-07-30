const commonTextStyle = {
  fontFamily: 'Mulish, Sans-serif',
  color: '#190D03',
  letterSpacing: '0px',
  whiteSpace: 'pre-line',
  fontSize: { xs: '14px', sm: '16px' }
};

const commonLinkStyle = {
  textDecoration: 'underline',
  '&:hover': {
    cursor: 'pointer'
  }
};

export const styles = {
  container: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    ...commonTextStyle,
    fontWeight: 700,
    fontSize: { xs: '16px', sm: '20px' },
    lineHeight: '140%',
    marginBottom: { xs: '32px', sm: '24px' }
  },
  text: {
    ...commonTextStyle,
    fontWeight: 400,
    lineHeight: '150%'
  },
  weakText: {
    ...commonTextStyle,
    color: '#574139',
    marginRight: '10px'
  },
  link: {
    ...commonTextStyle,
    ...commonLinkStyle,
    marginTop: '2px'
  },
  linkContainer: {
    display: 'flex'
  }
};
