const Colors = {
  white: '#FCFCFC',
  black: '#190D03',
  gray: '#63666E',
  lightGray: '#D9DCE8',
  yellow: '#FCBD28',
  error: '#E63C14',

  hoverTransparent: '#FCFCFC29',
  focusTransparent: '#FCFCFC57',
  pressTransparent: '#FFFFFF1F',
  hoverOutlined: '#F7F5F1',
  activeOutlined: '#D3CAC0',
  hoverError: '#E63C1414',
  activeError: '#E63C143D'
};

const PrimaryIconStyles = {
  fontSize: '0',
  color: Colors.black,
  backgroundColor: Colors.white,
  '&:hover': {
    backgroundColor: Colors.hoverOutlined
  },
  '&:active': {
    backgroundColor: Colors.activeOutlined
  },
  '&:disabled': {
    color: Colors.gray
  }
};

const SecondaryIconStyles = {
  fontSize: '0',
  color: Colors.white,
  backgroundColor: Colors.black,
  '&:hover': {
    backgroundColor: Colors.hoverTransparent
  },
  '&:focused': {
    backgroundColor: Colors.focusTransparent
  },
  '&:pressed': {
    backgroundColor: Colors.pressTransparent
  },
  '&:disabled': {
    color: Colors.gray
  }
};
export const IconButtonStyles = {
  primary: {
    fontSize: '0',
    color: Colors.white,
    backgroundColor: Colors.black,
    '&:hover': {
      backgroundColor: Colors.black
    },
    '&:disabled': {
      color: Colors.gray,
      backgroundColor: Colors.lightGray
    }
  },
  primaryIcon: {
    PrimaryIconStyles
  },
  primaryOutlined: {
    PrimaryIconStyles,
    border: '1px black solid'
  },
  secondary: {
    fontSize: '0',
    color: Colors.black,
    backgroundColor: Colors.white,
    '&:hover': {
      backgroundColor: Colors.white
    },
    '&:disabled': {
      color: Colors.gray,
      backgroundColor: Colors.lightGray
    }
  },
  secondaryIcon: {
    SecondaryIconStyles
  },
  secondaryOutlined: {
    SecondaryIconStyles,
    border: '1px white solid'
  },
  tertiary: {
    fontSize: '0',
    color: Colors.black,
    backgroundColor: Colors.yellow,
    '&:hover': {
      color: Colors.white,
      backgroundColor: Colors.black
    },
    '&:focused': {
      color: Colors.black,
      backgroundColor: Colors.yellow
    },
    '&:active': {
      color: Colors.black,
      backgroundColor: Colors.yellow
    },
    '&:disabled': {
      color: Colors.gray,
      backgroundColor: Colors.lightGray
    }
  },
  error: {
    fontSize: '0',
    color: Colors.error,
    backgroundColor: Colors.white,
    '&:hover': {
      backgroundColor: Colors.hoverError
    },
    '&:active': {
      backgroundColor: Colors.activeError
    },
    '&:disabled': {
      color: Colors.gray
    }
  }
};
