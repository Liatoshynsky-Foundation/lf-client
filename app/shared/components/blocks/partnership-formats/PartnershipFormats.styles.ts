export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: {
      xs: '16px',
      sm: '74px',
      md: '100px'
    }
  },
  title: {
    marginBottom: {
      xs: '30px',
      sm: '40px',
      md: '40px',
      lg: '50px',
      xl: '15px'
    }
  },
  mobileSlider: {
    display: {
      xs: 'block',
      sm: 'none'
    },
    gridColumn: '1 / -1',
    mb: {
      xs: '24px'
    }
  },
  firstRow: {
    display: {
      xs: 'none',
      sm: 'grid',
      md: 'contents',
      lg: 'contents',
      xl: 'contents'
    },
    height: {
      xs: 'auto',
      md: 'auto',
      lg: 'auto',
      xl: '480px'
    },
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    rowGap: {
      xs: '24px',
      sm: '24px',
      md: '24px',
      lg: '24px',
      xl: '0'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '30px',
      lg: '10px',
      xl: '10px',
      xxl: '10px'
    },
    position: {
      lg: 'relative',
      xl: 'relative'
    }
  },
  secondRow: {
    display: {
      xs: 'none',
      sm: 'grid',
      md: 'contents',
      lg: 'contents',
      xl: 'contents'
    },
    height: {
      xs: 'auto',
      md: 'auto',
      lg: 'auto',
      xl: '480px'
    },
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    rowGap: {
      xs: '24px',
      sm: '24px',
      md: '24px',
      lg: '24px',
      xl: '0'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    },
    position: {
      lg: 'relative',
      xl: 'relative'
    }
  },
  card: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: 'span 3',
      lg: 'span 3',
      xl: 'span 3'
    }
  },
  lastCardInRow: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  firstRowFirstCard: {
    alignSelf: {
      xs: 'start',
      lg: 'start',
      xl: 'end'
    },
    marginTop: {
      lg: '24px',
      xl: '60px'
    },
    gridColumn: {
      md: '4 / 10',
      lg: '3 / 6',
      xl: 'span 3',
      xxl: '3 / 6'
    },
    mb: {
      md: '0',
      lg: '24px'
    }
  },
  firstRowSecondCard: {
    justifySelf: {
      lg: 'end',
      xxl: 'end'
    },
    marginTop: {
      xs: '0',
      sm: '13px',
      md: '25px',
      lg: '0',
      xl: '55px'
    },
    gridColumn: {
      md: '4 / 10',
      lg: '9 / 13',
      xl: 'span 3',
      xxl: '7 / 10'
    },
    mb: {
      md: '24px',
      lg: '24px'
    }
  },
  secondRowFirstCard: {
    display: {
      xs: 'flex',
      sm: 'flex',
      md: 'flex',
      lg: 'none',
      xl: 'flex'
    },
    justifySelf: {
      xxl: 'end'
    },
    marginTop: {
      xs: '0',
      sm: '12px',
      md: '15px',
      lg: '0',
      xl: '28px'
    },
    gridColumn: {
      md: '4 / 10',
      lg: '10 / 13',
      xl: 'span 3',
      xxl: '7 / 10'
    }
  },
  secondRowSecondCard: {
    justifySelf: {
      sm: 'end',
      md: 'end',
      lg: 'end',
      xxl: 'end'
    },
    marginTop: {
      xs: '0',
      md: '0',
      lg: '0',
      xl: '12px'
    },
    gridColumn: {
      md: '10 / 13',
      lg: '10 / 13',
      xl: 'span 3',
      xxl: '10 / 13'
    }
  },
  emptyColumn: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: '10 / 13',
      lg: 'span 1',
      xl: 'span 3',
      xxl: '6 / 7'
    },
    display: {
      xs: 'none',
      sm: 'block',
      md: 'block',
      lg: 'block',
      xl: 'block'
    },
    mb: {
      md: '24px',
      lg: '24px'
    }
  },
  secondRowFirstCardLg: {
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'flex',
      xl: 'none'
    },
    justifySelf: {
      lg: 'end'
    },
    gridColumn: {
      lg: '6 / 10'
    },
    width: {
      lg: '294px'
    }
  },
  emptyColumnSecond: {
    gridColumn: {
      lg: '9 / 13'
    },
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'block',
      xl: 'none'
    },
    mb: {
      lg: '24px'
    }
  },
  firstRowImageContainer: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: '10 / 13',
      lg: '3 / 6',
      xl: 'span 3',
      xxl: '10 / 13'
    },
    justifySelf: {
      md: 'end',
      lg: 'start',
      xl: 'end'
    },
    mt: {
      lg: '15px',
      xl: '0'
    },
    mb: {
      md: '24px',
      lg: '0',
      xl: '24px'
    },
    height: '100%',
    width: {
      md: '294px'
    },
    display: 'flex',
    alignItems: 'stretch'
  },
  firstRowImageWrapper: {
    transform: 'skewY(-2deg)',
    mt: { sm: '0', md: '10px', lg: '0', xl: '42px' },
    width: '100%',
    height: { xs: '386px', sm: '386px', md: '386px', lg: '386px', xl: '386px' },
    position: 'relative',
    flex: 1
  },
  secondRowImageContainer: {
    alignSelf: {
      xs: 'start',
      lg: 'start',
      xl: 'start'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 8',
      md: '4 / 13',
      lg: '3 / 10',
      xl: 'span 6',
      xxl: '3 / 7'
    },
    mt: {
      lg: '20px',
      xl: '50px'
    },
    mb: {
      md: '0',
      lg: '0'
    },
    height: '100%',
    display: 'flex',
    alignItems: 'stretch'
  },
  secondRowImageWrapper: {
    transform: 'skewY(-2deg)',
    mb: { sm: '40px', lg: '0', xl: '0' },
    width: '100%',
    height: { xs: '386px', sm: '386px', md: '386px', lg: '386px', xl: '386px' },
    position: 'relative',
    flex: 1
  },
  descriptionContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mt: {
      md: '40px',
      lg: '50px',
      xxl: '50px'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    }
  },
  descriptionText: {
    textIndent: {
      sm: '15em',
      md: '21em'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '6 / 13'
    }
  },
  descriptionTypography: {
    fontSize: { xs: '16px', md: '18px' }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: {
      xs: 'center',
      sm: 'flex-start'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '6 / -1'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    }
  },
  modalContent: {
    p: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    },
    maxWidth: {
      xs: '90vw',
      sm: '600px',
      md: '800px'
    }
  }
};
