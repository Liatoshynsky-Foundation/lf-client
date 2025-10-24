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
    height: '427px',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(4, 1fr)'
    },
    gridColumn: '1 / -1',
    gap: {
      xs: '16px',
      sm: '20px',
      md: '24px'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    }
  },
  row2: {
    display: 'grid',
    height: '427px',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(4, 1fr)'
    },
    gridColumn: '1 / -1',
    gap: {
      xs: '16px',
      sm: '20px',
      md: '24px'
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
      sm: 'span 1'
    }
  },
  card1: {
    alignSelf: 'end'
  },
  card2: {},
  emptyColumn: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 1'
    },
    display: {
      xs: 'none',
      sm: 'block'
    }
  },
  row2Image: {
    alignSelf: 'end',
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 2'
    }
  },
  row3Container: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(4, 1fr)'
    },
    gridColumn: '1 / -1',
    gap: {
      xs: '16px',
      sm: '20px',
      md: '24px'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    }
  },
  row3Text: {
    gridColumn: {
      xs: '1 / -1',
      sm: '3 / span 12'
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
