export const styles = {
  container: {
    display: { xs: 'block', md: 'flex' },
    position: { xs: 'relative', md: 'initial' },
    left: { xs: '50%', md: 'auto' },
    right: { xs: '50%', md: 'auto' },
    marginLeft: { xs: '-50vw', md: 0 },
    marginRight: { xs: '-50vw', md: 0 },
    width: { xs: '100vw', md: '100%' },
    overflowX: { xs: 'auto', md: 'visible' },
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
    px: { xs: '24px', sm: '56px', md: 0 }
  },
  row: {
    display: 'flex',
    gap: 2,
    alignItems: 'flex-start',
    whiteSpace: { xs: 'nowrap', md: 'normal' },
    minWidth: { xs: 'max-content', md: 'auto' }
  }
};
