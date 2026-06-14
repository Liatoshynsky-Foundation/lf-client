export const styles = {
  iconButtonSx: {
    background: 'none',
    boxShadow: 'none',
    ':hover, :focus, :active': {
      background: 'none',
      boxShadow: 'none'
    }
  },
  menuItem: {
    maxWidth: '212px',
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  },
  iconButtonInline: {
    display: 'flex',
    alignItems: 'center'
  },
  dropdownMenu: {
    marginTop: '8px',
    transform: 'translateX(-16px)'
  },
  buttonGroup: {
    height: '40px',
    backgroundColor: 'blue.50',
    p: '4px'
  },
  buttonGroupBackground: {
    backgroundColor: 'white',
    borderRadius: '999px',
    border: '6px solid',
    borderColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  warInUkraineWrapper: {
    backgroundColor: 'blue.50',
    borderRadius: '999px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px'
  },
  warInUkraineButton: {
    backgroundColor: 'transparent',
    verticalAlign: 'middle',
    fontWeight: 'normal',
    color: 'black',
    lineHeight: '140%',
    letterSpacing: 0,
    padding: '0 16px',
    height: '32px',

    '&:hover': {
      backgroundColor: 'blue.100'
    },
    '&:focus': {
      backgroundColor: 'black',
      color: 'white'
    }
  },
  warInUkraineButtonActive: {
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'black'
    }
  }
};
