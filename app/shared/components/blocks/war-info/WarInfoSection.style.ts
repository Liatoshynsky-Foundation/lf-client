export const style = {
  gridContainer: {
    display: { sm: 'grid' },
    gridColumn: '1 / -1',
    gridTemplateColumns: 'subgrid'
  },

  textBlockContainer: {
    gridColumn: { xs: '1 / -1', sm: '1 / -1', md: '6 / 13', lg: '6 / 13' },
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 6px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1448px - 144px) / 12 * 3 + 11px)'
    },
    alignSelf: { md: 'end', lg: 'end' },
    marginTop: { sm: '40px', lg: '155px' },
    marginBottom: { xs: '80px', lg: '96px' },
    maxWidth: '910px'
  },

  titleSection: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 6',
      md: '1 / 6',
      lg: '1/6'
    },
    display: { sm: 'flex' }
  },

  titleText: {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 600,
    lineHeight: '120%',
    letterSpacing: '0px',
    color: 'black',
    whiteSpace: 'pre-line',
    mt: {
      xs: '80px',
      md: '108px',
      lg: '156px'
    },
    mb: { xs: '40px', sm: '0px' },
    fontSize: {
      xs: '40px',
      md: '64px'
    },
    width: { sm: '343px', lg: '393px' }
  },

  contentText: {
    gridColumn: '1 / -1',
    maxWidth: { md: '907px' },
    pt: { md: '230px', lg: '120px' }
  }
};
