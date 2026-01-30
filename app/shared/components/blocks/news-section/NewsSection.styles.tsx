export const styles = {
  mainContainer: {
    display: 'grid',
    gridColumn: '1 / -1',
    my: { xs: '80px', sm: '104px', md: '128px', lg: '144px' },
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
