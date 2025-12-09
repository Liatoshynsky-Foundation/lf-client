export const styles = {
  mediaContainer: {
    display: { xs: 'block', sm: 'grid' },
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      sm: '24px',
      md: '40px'
    }
  },
  tabsBox: {
    gridColumn: { sm: '4/ -1', md: '6/-1' }
    //whiteSpace: { xs: 'nowrap', sm: 'normal' }
  }
};
