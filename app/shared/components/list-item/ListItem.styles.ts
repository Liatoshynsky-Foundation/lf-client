export const styles = {
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: '20px',
    maxWidth: '425px',
    '&:nth-child(2)': {
      order: { xs: '1', lg: '0' }
    }
  },
  bulletIcon: {
    marginTop: '8px'
  },
  typography: {
    fontFamily: 'Mulish',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '160%',
    letterSpacing: '0px',
    color: '#190D03'
  }
};
