const containerHelper = {
  display: 'grid',
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
};

const textBase = {
  fontFamily: 'Mulish',
  fontWeight: 400,
  fontSize: {
    xs: '18px',
    md: '24px'
  },
  lineHeight: {
    xs: '180%',
    md: '160%'
  }
};

const textHeading = {
  fontFamily: 'Mulish',
  fontWeight: 800,
  fontSize: {
    xs: '18px',
    md: '26px'
  },
  lineHeight: '180%',
  textTransform: 'uppercase'
};

export const styles = {
  container: {
    ...containerHelper,
    position: 'relative',
    marginBottom: {
      xs: '59px',
      sm: '132px',
      md: '180px'
    }
  },

  organisationSection: {
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    textAlign: 'justify',
    marginBottom: {
      xs: '56px',
      sm: '62px'
    }
  },

  organisationText: {
    ...textHeading,
    marginRight: { xs: 0 }
  },

  explanationSection: {
    gridRow: '2',
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 7',
      md: '1 / 9'
    },
    marginBottom: { xs: '40px' }
  },

  explanationText: {
    ...textHeading,
    fontWeight: 500
  },

  firstBulletIcon: {
    gridColumn: '1 / 2',
    justifySelf: 'start',
    display: { sm: 'none' }
  },

  secondBulletIcon: {
    gridColumn: {
      sm: '8',
      md: '10 / -1'
    },
    justifySelf: 'end',
    display: {
      xs: 'none',
      sm: 'block'
    }
  },

  textSection: {
    ...textBase,
    textIndent: {
      sm: '88px',
      md: 0
    }
  },

  textImage: {
    ...textBase,
    gridRow: '3',
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '1 / 6'
    },
    marginBottom: {
      xs: '40px',
      sm: 0
    }
  },

  bodyImage: {
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / 7',
      md: '6 / 10'
    },
    gridRow: { sm: '3' },
    position: 'relative',
    width: {
      xs: '199px',
      sm: '230px',
      lg: '295px',
      xl: '337px',
      xxl: '407px'
    },
    height: {
      xs: '260px',
      sm: '299px',
      lg: '350px',
      xl: '400px',
      xxl: '484px'
    }
  }
};
