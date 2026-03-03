export const styles = {
  wrapper: {
    gridColumn: '1 / -1',
    mb: { xs: '80px', sm: '104px', md: '128px', lg: '144px' }
  },

  titleContainer: {
    gap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  },

  text: {
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    },
    gridColumn: { xs: '1 / -1', sm: '4 / -1', md: '6 / -1', xl: '6 / -1' },
    mb: { xs: '43px', sm: '104px' },
    maxWidth: { large: '743px' }
  },

  xsGrid: {
    display: { xs: 'flex', sm: 'none' },
    justifyContent: 'flex-start',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    alignItems: 'center',
    gap: '4px',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },

  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '112px',
    height: '100%',
    flexShrink: 0
  },

  logoImage: {
    objectFit: 'contain',
    height: 'auto',
    maxHeight: '112px',
    width: '100%'
  }
};
