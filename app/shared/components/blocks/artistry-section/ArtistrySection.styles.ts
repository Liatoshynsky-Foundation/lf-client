export const styles = {
  mainContainer: {
    gridColumn: '1 / -1',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    zIndex: 0,
    marginRight: '-50vw',
    width: '100vw',
    backgroundColor: 'yellow.500',
    transform: 'skewY(-2deg)',
    transformOrigin: 'top left'
  },

  transformContainer: {
    maxWidth: '1728px',
    margin: '0 auto',
    transform: 'skewY(2deg)',
    transformOrigin: 'top left',
    padding: { xs: '45px 24px 65px', sm: '20px 56px 57px', md: '35px 72px 80px', xl: '40px 72px 100px' }
  },

  contentContainer: {
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
    },
    width: '100%'
  },

  textStyle: {
    fontSize: {
      xs: '16px',
      md: '18px'
    },
    lineHeight: { xs: '150%', md: '160%' },
    textIndent: {
      xs: 'calc((100vw - 48px) / 4 * 1 + 4px)',
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    },
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' },
    color: 'black'
  },

  additionalTextStyle: {
    fontSize: {
      xs: '16px',
      md: '18px'
    },
    lineHeight: { xs: '150%', md: '160%' },
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' },
    color: 'black'
  },

  subTitle: {
    fontFamily: '"Oswald", sans-serif',
    fontSize: { xs: '28px', md: '42px', lg: '48px' },
    fontWeight: { xs: 700, md: 600 },
    lineHeight: { xs: '150%', md: '120%' },
    letterSpacing: '0%',
    textTransform: { xs: 'uppercase', md: 'none' },
    gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' }
  },

  buttonStyle: {
    maxWidth: { xs: '247px' },
    minWidth: { xs: '247px' },
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  }
};
