export const styles = {
  cardsContainer: {
    gridColumn: '1 / -1',
    mt: 4,
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)'
    },
    gap: { xs: '32px', sm: '40px' }
  },
  paginationWrapper: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    py: 7,
    gap: { xs: 3 },
    alignItems: 'center'
  },
  loadMoreButton: {
    p: { xs: '12px 58px' }
  }
};
