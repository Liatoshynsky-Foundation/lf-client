export const styles = {
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: {
      xs: '8px',
      sm: '16px',
      md: '20px'
    },
    maxWidth: '425px',
    '&:nth-child(2)': {
      order: { xs: '1', lg: '0' }
    }
  },
  bulletIcon: {
    marginTop: {
      xs: '6px',
      md: '8px'
    }
  },
  typography: {
    fontFamily: 'Mulish',
    fontSize: { xs: '16px', md: '20px' },
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '0px',
    color: '#190D03'
  }
};
