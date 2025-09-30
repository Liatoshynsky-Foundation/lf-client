const textBase = {
  fontFamily: 'Mulish',
  fontWeight: 400,
  fontSize: {
    xs: '18px',
    md: '24px'
  },
  lineHeight: {
    xs: '150%',
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
  lineHeight: '177%',
  textTransform: 'uppercase'
};

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    position: 'relative',
    marginBottom: {
      xs: '59px',
      sm: '132px',
      md: '155px',
      lg: '180px'
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
      xs: '55px',
      sm: '62px',
      md: '100px'
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
    marginBottom: { xs: '40px', md: '53px', xl: '90px', xxl: '51px' }
  },

  explanationText: {
    ...textHeading,
    fontWeight: 500,
    textAlign: {
      xs: 'left',
      sm: 'justify'
    }
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
