export const styles = {
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: { xs: '96px', sm: '132px', md: '156px' }
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: { xs: 'flex-start', sm: 'space-between' },
    alignSelf: 'flex-start',
    gridColumn: '1 / -1',
    mt: { xs: '72px', sm: '132px', md: '164px', lg: '180px' }
  },
  list: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
    gridColumn: { xs: '2 / -1', sm: '4 / -1', md: '6 / -1' },
    gap: '56px'
  }
};
