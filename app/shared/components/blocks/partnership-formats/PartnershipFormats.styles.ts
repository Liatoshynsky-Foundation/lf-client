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
      lg: '480px'
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
      lg: '0'
    },
    position: {
      lg: 'relative'
    }
  },
  secondRow: {
    display: 'grid',
    height: {
      xs: 'auto',
      md: 'auto',
      lg: '480px'
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
      lg: '0'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    },
    position: {
      lg: 'relative'
    }
  },
  card: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: 'span 6',
      lg: 'span 3'
    }
  },
  lastCardInRow: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  firstRowFirstCard: {
    alignSelf: {
      xs: 'start',
      lg: 'end'
    },
    marginTop: {
      lg: '60px'
    },
    gridColumn: {
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
      lg: '65px'
    },
    gridColumn: {
      xxl: '7 / 10'
    }
  },
  secondRowFirstCard: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: {
      xs: '0',
      lg: '28px'
    },
    gridColumn: {
      xxl: '7 / 10'
    }
  },
  secondRowSecondCard: {
    marginTop: {
      xs: '0',
      lg: '12px'
    },
    gridColumn: {
      xxl: '10 / 13'
    }
  },
  emptyColumn: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: 'span 6',
      lg: 'span 3',
      xxl: '6 / 7'
    },
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'block'
    }
  },
  firstRowImageWrapper: {
    transform: 'skewY(-2deg)',
    width: '100%',
    mt: { sm: '40px', lg: '42px' },
    maxWidth: { xs: '100%', lg: '294px' },
    marginLeft: { lg: 'auto' },
    gridColumn: {
      xxl: '10 / 13'
    }
  },
  secondRowImageContainer: {
    transform: 'skewY(-2deg)',
    overflow: 'hidden',
    alignSelf: {
      xs: 'start',
      lg: 'start'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 8',
      md: '1 / -1',
      lg: 'span 6',
      xxl: '3 / 7'
    },
    mt: {
      lg: '50px'
    },
    overflowX: {
      xxl: 'hidden'
    },
    maxWidth: '100%'
  },
  secondRowImageWrapper: {
    width: '100%',
    mb: { sm: '40px', lg: '0' },
    maxWidth: { xs: '100%', lg: '618px' }
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
