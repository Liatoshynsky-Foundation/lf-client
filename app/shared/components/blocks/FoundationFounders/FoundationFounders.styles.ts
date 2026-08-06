export const styles = {
  container: {
    gridColumn: '1 / -1',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    zIndex: -2,
    marginRight: '-50vw',
    width: '100vw',
    backgroundColor: 'brown.100',
    transform: 'skewY(-2deg)',
    transformOrigin: 'top left'
  },
  contentContainer: {
    maxWidth: '1728px',
    margin: '0 auto',
    transform: 'skewY(2deg)',
    transformOrigin: 'top left',
    padding: { xs: '35px 24px', sm: '40px 56px 57px', md: '40px 72px' }
  }
};
