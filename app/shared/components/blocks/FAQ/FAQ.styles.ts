export const styles = {
  gridContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: 'subgrid',
    m: '160px 0'
  },
  contacts: {
    gridColumn: '1 / 5',
    maxWidth: '400px'
  },
  typography: {
    fontFamily: 'Mulish',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '150%'
  },
  contactsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    mt: '32px'
  },
  contactsItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  linkItem: {
    fontFamily: 'Mulish',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '110%',
    textDecoration: 'underline'
  },
  iconButton: {
    backgroundColor: 'rgba(25, 13, 3, 0.1)',
    '&:disabled': {
      backgroundColor: 'rgba(25, 13, 3, 0.1)'
    }
  },
  faq: {
    gridColumn: { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' },
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }
};
