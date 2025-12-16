export const styles = {
  container: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(auto-fit, minmax(200px, 1fr))',
      sm: 'subgrid'
    },
    columnGap: { xs: '24px' },
    rowGap: { xs: '40px' },
    mt: 7,
    alignContent: 'start'
  },
  paginationWrapper: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    pt: 8,
    pb: { xs: 10, sm: 13 },
    gap: { xs: 3, md: 4 },
    alignItems: 'center'
  },
  loadMoreButton: {
    p: { xs: '12px 56.5px', sm: '12px 89.5px', md: '16px 48px' },
    fontSize: { xs: '16px', md: '18px' },
    fontWeight: { xs: '500', md: '600' }
  }
};
