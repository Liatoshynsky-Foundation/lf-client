export const styles = {
  gridContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    m: { xs: '56px 0 96px 0', sm: '104px 0', md: '128px 0 160px 0' }
  },
  contacts: {
    overflow: 'hidden',
    position: 'relative',
    gridColumn: '1 / 5',
    maxWidth: '400px',
    display: { xs: 'none', md: 'block' }
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
  faq: {
    gridColumn: { xs: '1 / -1', sm: '4 / -1', md: '6 / -1' },
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }
};
