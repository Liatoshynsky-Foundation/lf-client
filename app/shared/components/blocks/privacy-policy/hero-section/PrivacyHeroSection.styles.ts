export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1'
  },

  span: {
    fontWeight: 'bold'
  },

  title: {
    gridColumn: '1 / 6',
    gridRow: '1',
    lineHeight: '120%',
    fontSize: { xs: '40px', sm: '40px', md: '64px' },
    mt: { xs: '148px', md: '196px' },
    mb: { xs: '56px', sm: '40px', md: '56px', xl: '16px' }
  },

  textBlock1: {
    gridColumn: { xs: '1/-1', sm: '4/-1', md: '6/-1', xl: '6 / -1' },
    gridRow: '2',
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    lineHeight: 1.6,
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 6px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1448px - 144px) / 12 * 3 + 11px)'
    },
    mb: { xs: '40px', md: '64px' }
  },

  textBlock2: {
    gridColumn: { xs: '1/-1', sm: '1/7', md: '1/11', lg: '1 / 9' },
    gridRow: '3',
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    lineHeight: 1.6,
    textIndent: {
      xs: '0px',
      sm: 'calc((100vw - 112px) / 8 * 1 + 3px)',
      md: 'calc((100vw - 144px) / 12 * 1 + 40px)',
      lg: 'calc((1448px - 144px) / 12 * 1 + 3px)'
    }
  }
};
