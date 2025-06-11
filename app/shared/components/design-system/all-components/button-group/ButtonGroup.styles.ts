export const defaultButtonGroupColorScheme = {
  selectedButtonColor: '#190D03',
  selectedButtonTextColor: '#FCFCFC',
  groupBackgroundColor: '#f0f0f0',
  buttonTextColor: '#190D03'
};

export const styles = {
  selectedButton: {
    position: 'absolute',
    borderRadius: '9999px',
    transition: 'all 0.3s ease',
    zIndex: 0
  },
  defaultButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    padding: '4px',
    fontFamily: 'Mulish, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    width: 'fit-content',
    border: 'none',
    lineHeight: '150%'
  },
  defaultButton: {
    display: 'inline-block',
    borderRadius: '9999px',
    color: 'inherit',
    fontFamily: 'inherit',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
    marginRight: '4px',
    padding: '1px 16px',
    textTransform: 'none',
    lineHeight: '150%',
    border: 'none',
    backgroundColor: 'transparent',
    '&:last-child': {
      marginRight: 0
    },
    '&>button': {
      backgroundColor: 'transparent',
      color: 'inherit',
      textDecoration: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
      cursor: 'inherit',
      border: 'none',
      padding: 0,
      margin: 0,
      display: 'inline-block',
      height: '100%',
      '&:hover': {
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: 'inherit'
      },
      '& *:not(.lf-btn-label)': {
        display: 'none'
      }
    }
  }
};
