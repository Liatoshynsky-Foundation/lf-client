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
    alignItems: 'flex-start',
    gap: { xs: '32px', md: '40px' }
  },
  title: {
    ...commonTextStyle,
    fontWeight: 700,
    fontSize: { xs: '16px', sm: '20px' },
    lineHeight: '140%'
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
  },
  titleAndAddressCont: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
};
