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
      xs: '40px',
      md: '75px'
    }
  },
  firstRow: {
    display: 'grid',
    height: {
      xs: 'auto',
      md: 'auto',
      lg: '480px'
    },
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    gap: {
      xs: '24px',
      sm: '0',
      md: '24px',
      lg: '0'
    },
    columnGap: {
      lg: '12px'
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
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    gap: {
      xs: '24px',
      sm: '0',
      md: '24px',
      lg: '0'
    },
    columnGap: {
      lg: '12px'
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
    }
  },
  firstRowSecondCard: {
    marginTop: {
      xs: '0',
      sm: '0',
      md: '0',
      lg: '65px'
    }
  },
  secondRowFirstCard: {
    marginTop: {
      xs: '0',
      lg: '28px'
    }
  },
  secondRowSecondCard: {
    marginTop: {
      xs: '0',
      lg: '12px'
    }
  },
  emptyColumn: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: 'span 6',
      lg: 'span 3'
    },
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'block'
    }
  },
  firstRowImageWrapper: {
    width: '100%',
    mt: { sm: '40px', lg: '42px' },
    maxWidth: { xs: '100%', lg: '294px' },
    marginLeft: { lg: 'auto' }
  },
  secondRowImageContainer: {
    alignSelf: {
      xs: 'start',
      lg: 'start'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 8',
      md: '1 / -1',
      lg: 'span 6'
    },
    mt: {
      lg: '50px'
    }
  },
  secondRowImageWrapper: {
    width: '100%',
    mb: { sm: '40px', lg: '0' },
    maxWidth: { xs: '100%', lg: '618px' }
  },
  descriptionContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
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
