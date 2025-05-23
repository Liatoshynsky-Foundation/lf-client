const commonTextStyle = {
  fontFamily: 'Mulish, Sans-serif',
  color: '#190D03',
  letterSpacing: '0px',
  whiteSpace: 'pre-line',
  fontSize: { xs: '14px', sm: '16px' },
};

const commonLinkStyle = {
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export const styles = {
  container: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: '24px 0',
  },
  title: {
    ...commonTextStyle,
    fontWeight: 700,
    fontSize: { xs: '16px', sm: '20px' },
    lineHeight: '140%',
    marginBottom: '40px',
  },
  text: {
    ...commonTextStyle,
    fontWeight: 400,
    lineHeight: '150%',
  },
  weakText: {
    ...commonTextStyle,
    color: '#574139',
    marginRight: '10px',
  },
  link: {
    ...commonTextStyle,
    ...commonLinkStyle,
    marginTop: '2px',
  },
  copy: {
    cursor: 'pointer',
    display: 'block',
    width: '24px',
    height: '24px',
    marginTop: '4px',
    verticalAlign: 'middle',
    background: 'transparent no-repeat center center',
    marginBottom: '8px',
    marginLeft: '10px',
    padding: '0',
  },
  linkContainer: {
    display: 'flex',
  },
  iconSize: 20,
};