export const styles = {
  container: {
    gridColumn: '1 / -1',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    width: '100vw',
    backgroundColor: '#EDE8DF',
    clipPath: { xs: 'polygon( 0% 1%, 100% 0%, 100% 99%, 0% 100%)', sm: 'polygon( 0% 2%, 100% 0%, 100% 98%, 0% 100%)' }
  },
  contentContainer: {
    maxWidth: '1920px',
    margin: '0 auto',
    padding: { xs: '40px 24px', sm: '40px 72px' }
  }
};
