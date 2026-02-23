export const styles = {
  gridContainer: {
    mt: '80px',
    mb: { xs: '64px', sm: '56px', md: '72px' },
    display: 'grid',
    gridColumn: '1 / -1',
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
  textBlockContainer: {
    pt: { xs: '40px', sm: '16px', lg: '44px' },
    gridColumn: {
      xs: '1 / 5',
      sm: '4 / -1',
      md: '6 / -1'
    }
  },
  titleSection: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '1 / 6'
    },
    height: 'fit-content'
  },
  titleText: {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 600,
    lineHeight: '120%',
    letterSpacing: '0px',
    color: 'black',
    whiteSpace: 'pre-line',
    // mt: {
    //   xs: '80px',
    //   sm: '108px',
    //   md: '156px'
    // },
    // mb: { xs: '44px', sm: '0px' },
    fontSize: {
      xs: '40px',
      md: '64px'
    }
    // width: { md: '570px', lg: '560px' }
  },
  longText: {
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    },
    gridColumn: '1 / -1'
  }
};
