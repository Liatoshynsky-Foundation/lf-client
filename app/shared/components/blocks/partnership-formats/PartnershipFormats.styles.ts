export const styles = {
  mainContainer: {
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
  row1: {
    display: 'grid',
    height: {
      xs: 'auto',
      md: 'auto',
      lg: '427px'
    },
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    gap: {
      xs: '24px',
      sm: '0',
      md: '24px',
      lg: '0'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    }
  },
  row2: {
    display: 'grid',
    height: {
      xs: 'auto',
      md: 'auto',
      lg: '427px'
    },
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    gap: {
      xs: '24px',
      sm: '0',
      md: '24px',
      lg: '0'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
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
  card1: {
    alignSelf: {
      xs: 'start',
      lg: 'end'
    }
  },
  card2: {
    marginTop: {
      xs: '0',
      sm: '0',
      md: '0',
      lg: '20px'
    }
  },
  card5: {
    marginTop: {
      xs: '0',
      lg: '15px'
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
  row2Image: {
    alignSelf: {
      xs: 'start',
      lg: 'end'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 8',
      md: '1 / -1',
      lg: 'span 6'
    }
  },
  row3Container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    }
  },
  row3Text: {
    gridColumn: {
      xs: '2 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '6 / 13'
    }
  },
  row4Container: {
    display: 'flex',
    justifyContent: 'center',
    gridColumn: '1 / -1',
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
