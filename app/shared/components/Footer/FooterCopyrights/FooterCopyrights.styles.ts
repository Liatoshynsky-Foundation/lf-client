export const styles = {
  container: {
    width: '100%',
    maxWidth: '1300px',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: { xs: 'center', md: 'space-between' },
    alignItems: { xs: 'center', md: 'flex-start' },
    gap: '10px',
    fontFamily: 'Mulish, sans-serif'
  },
  text: {
    fontSize: '16px',
    color: '#5F0E0F',
    fontWeight: 400,
    textAlign: { xs: 'left', md: 'left' },
    maxWidth: '408px',
    width: '100%'
  },
  linkList: {
    display: 'flex',
    alignItems: { xs: 'center', md: 'start' },
    justifyContent: { xs: 'flex-start', md: 'center' },
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxWidth: '784px',
    flexWrap: { xs: 'wrap', lg: 'nowrap' },
    fontSize: '16px',
    color: '#5F0E0F',
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
        width: '16px',
        height: '16px',
        margin: '0 16px',
        verticalAlign: 'middle',
        backgroundImage: 'url(/icons/bullet-icon.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }
    }
  },
  link: {
    textDecoration: 'none',
    color: '#5F0E0F',
    '&:hover': {
      textDecoration: 'underline',
      color: '#000'
    },
    fontSize: { xs: '14px', md: '16px' },
    lineHeight: '150%'
  }
};
