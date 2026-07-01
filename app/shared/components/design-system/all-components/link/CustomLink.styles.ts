export const linkStyles = {
  button: {
    cursor: 'pointer',
    color: 'blue.800',
    display: 'flex',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:active': {
      backgroundColor: 'transparent'
    }
  },
  typography: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    '&:hover': {
      borderBottom: '1px solid',
      borderBottomColor: 'currentColor'
    }
  }
};
