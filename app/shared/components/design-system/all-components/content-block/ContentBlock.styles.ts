export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumn: '1 / -1',
    gap: '24px',
    marginTop: '144px'
  },
  textContent: {
    gridColumn: { xs: '3/ -1', sm: '6/ -1' },
    gap: '8px'
  }
};
