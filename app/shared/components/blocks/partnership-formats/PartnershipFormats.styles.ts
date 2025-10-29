export const styles = {
  container: {
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
    },
    gridColumn: '1 / -1',
    mb: {
      xs: '16px',
      sm: '74px',
      md: '100px'
    }
  },
  title: {
    marginBottom: {
      xs: '10px',
      md: '15px'
    }
  },
  firstRow: {
    display: 'grid',
    height: {
      xs: 'auto',
      md: 'auto',
      lg: 'auto',
      xl: '480px'
    },
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
      md: '20px',
      lg: '40px',
      xl: '10px',
      xxl: '10px'
    },
    position: {
      lg: 'relative',
      xl: 'relative'
    }
  },
  secondRow: {
    display: 'grid',
    height: {
      xs: 'auto',
      md: 'auto',
      lg: 'auto',
      xl: '480px'
    },
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
      md: 'span 6',
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
      lg: '25px',
      xl: '60px'
    },
    gridColumn: {
      lg: '3 / 6',
      xl: 'span 3',
      xxl: '3 / 6'
    }
  },
  firstRowSecondCard: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: {
      xs: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '65px'
    },
    gridColumn: {
      lg: '10 / 13',
      xl: 'span 3',
      xxl: '7 / 10'
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
    justifyContent: 'center',
    marginTop: {
      xs: '0',
      lg: '0',
      xl: '28px'
    },
    gridColumn: {
      lg: '10 / 13',
      xl: 'span 3',
      xxl: '7 / 10'
    }
  },
  secondRowSecondCard: {
    marginTop: {
      xs: '0',
      lg: '12px',
      xl: '12px'
    },
    gridColumn: {
      lg: '10 / 13',
      xl: 'span 3',
      xxl: '10 / 13'
    }
  },
  emptyColumn: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: 'span 6',
      lg: '7 / 10',
      xl: 'span 3',
      xxl: '6 / 7'
    },
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'block',
      xl: 'block'
    }
  },
  emptyColumnSecond: {
    gridColumn: {
      lg: '7 / 10'
    },
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'block',
      xl: 'none'
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
    justifyContent: 'center',
    gridColumn: {
      lg: '10 / 13'
    }
  },
  firstRowImageContainer: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: 'span 6',
      lg: '3 / 6',
      xl: 'span 3',
      xxl: '10 / 13'
    }
  },
  firstRowImageWrapper: {
    transform: 'skewY(-2deg)',
    width: '100%',
    mt: { sm: '40px', lg: '25px', xl: '42px' },
    maxWidth: { xs: '100%', lg: '294px', xl: '294px' },
    marginLeft: { lg: 'auto', xl: 'auto' }
  },
  secondRowImageContainer: {
    transform: 'skewY(-2deg)',
    overflow: 'hidden',
    alignSelf: {
      xs: 'start',
      lg: 'start',
      xl: 'start'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 8',
      md: '1 / -1',
      lg: '3 / 10',
      xl: 'span 6',
      xxl: '3 / 7'
    },
    mt: {
      lg: '35px',
      xl: '50px'
    },
    overflowX: {
      xxl: 'hidden'
    },
    maxWidth: '100%'
  },
  secondRowImageWrapper: {
    width: '100%',
    mb: { sm: '40px', lg: '0', xl: '0' },
    maxWidth: { xs: '100%', lg: '618px', xl: '618px' }
  },
  descriptionContainer: {
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
    },
    gridColumn: '1 / -1',
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    }
  },
  descriptionText: {
    textIndent: '21em',
    gridColumn: {
      xs: '2 / -1',
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
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '6 / 13'
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
