export const styles = {
  container: {
    width: '100%',
    maxWidth: '1300px',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: { xs: '24px', md: '8px' },
    fontFamily: 'Mulish, sans-serif'
  },
  text: {
    fontSize: { xs: '14px', sm: '16px' },
    color: '#412B21',
    fontWeight: 400,
    textAlign: { xs: 'left', md: 'left' },
    width: '100%'
  },
  linkList: {
    display: 'flex',
    gap: { xs: '8px', md: 0 },
    alignItems: 'start',
    justifyContent: { xs: 'flex-start', md: 'center' },
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexWrap: { xs: 'wrap', lg: 'nowrap' },
    fontSize: '16px',
    color: '#412B21',
    fontWeight: 400,
    width: { xs: '100%', md: 'auto' },
    marginLeft: '0',
    flexDirection: { xs: 'column', md: 'row' },
    '& li': {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: { xs: 'normal', md: 'nowrap' },
      position: 'relative',
      '&:not(:first-of-type)::before': {
        content: '""',
        display: { xs: 'none', md: 'inline-block' },
        width: '2px',
        height: '16px',
        margin: '0 16px',
        verticalAlign: 'middle',
        backgroundColor: '#574139'
      }
    }
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: '#000'
    },
    fontSize: '16px',
    lineHeight: '150%'
  }
};
