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
  },
  textStyle: {
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    },
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  }
};
