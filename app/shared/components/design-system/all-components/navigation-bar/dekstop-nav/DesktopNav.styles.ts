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
    backgroundColor: 'grey.250',
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
    backgroundColor: 'grey.250',
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
      backgroundColor: 'grey.350'
    },
    '&.Mui-focusVisible, &:focus-visible': {
      outline: '3px solid #000000',
      outlineOffset: '2px'
    }
  },
  warInUkraineButtonActive: {
    backgroundColor: 'black !important',
    color: 'white',
    '&:hover': {
      backgroundColor: 'black'
    }
  }
};
