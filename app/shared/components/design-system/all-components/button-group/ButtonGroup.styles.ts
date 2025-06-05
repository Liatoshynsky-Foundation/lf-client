export const defaultButtonGroupColorScheme = {
  selectedButtonColor: '#190D03',
  selectedButtonTextColor: '#FCFCFC',
  groupBackgroundColor: '#f0f0f0',
  buttonTextColor: '#190D03'
};

export const styles = {
  selectedButton: {
    position: 'absolute',
    top: 2,
    height: 'calc(100% - 4px)',
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
    width: 'fit-content'
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
    '&:last-child': {
      marginRight: 0
    }
  }
};
