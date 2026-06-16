export const styles = {
  mainContainer: {
    position: 'relative',
    width: '100vw',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    gridColumn: '1 / -1'
  },
  paper: {
    position: 'absolute',
    left: 0,
    zIndex: 0,
    height: '100%',
    backgroundColor: 'brown.100'
  },
  container: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    pt: '38px',
    pl: { xs: '24px', sm: '56px', md: '78px', ultra: '170px' },
    pr: { sm: '57px', md: '72px', xxl: '206px', ultra: '303px' },
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  }
};
