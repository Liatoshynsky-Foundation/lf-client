export const styles = {
  wrapper: {
    gridColumn: '1 / -1'
  },

  titleContainer: {
    mb: '43px',
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 5',
      md: '1 / 8',
      lg: '1 / 9'
    }
  },

  text: {
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1448px - 144px) / 12 * 3 + 11px)'
    },
    gridColumn: { xs: '1 / -1', sm: '4 / -1', md: '6 / -1', xl: '6 / -1' },
    mb: { xs: '43px', sm: '104px' },
    maxWidth: { large: '743px' }
  },

  xsGrid: {
    display: { xs: 'grid', sm: 'none' },
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    gridTemplateColumns: 'repeat(2, 1fr)'
  },

  logoWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },

  logoImage: {
    objectFit: 'contain',
    height: 'auto',
    maxHeight: '112px',
    width: '100%'
  }
};
