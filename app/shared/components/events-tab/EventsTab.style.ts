export const styles = {
  container: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(auto-fit, minmax(200px, 1fr))',
      sm: 'subgrid'
    },
    columnGap: { xs: '32px' },
    rowGap: { xs: '48px', md: '64px' },
    mt: 7
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
    width: { xs: '100%', sm: 'auto' },
    p: { xs: '8px 24px', md: '16px 48px' },
    fontSize: { xs: '16px', md: '18px' },
    fontWeight: { xs: '500', md: '600' }
  }
};
