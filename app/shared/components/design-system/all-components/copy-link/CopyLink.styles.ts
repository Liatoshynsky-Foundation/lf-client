const commonCopyLinkBaseStyles = {
  fontFamily: 'Mulish, Sans-serif',
  transition: 'color 0.2s ease',
  lineHeight: '110%',
  textDecoration: 'none',
  wordBreak: 'break-all',
  overflowWrap: 'break-word'
};

interface ColorConfig {
  defaultColor: string;
  hoverColor: string;
  activeColor: string;
  disabledColor: string;
}

const getColorConfig = (type: 'primary' | 'secondary'): ColorConfig => {
  if (type === 'primary') {
    return {
      defaultColor: 'black',
      hoverColor: 'burgundy.800',
      activeColor: 'black',
      disabledColor: 'blue.500'
    };
  }

  return {
    defaultColor: 'blue.800',
    hoverColor: 'black',
    activeColor: 'blue.800',
    disabledColor: 'blue.500'
  };
};

const getCopyLinkStates = (config: ColorConfig) => ({
  color: config.defaultColor,
  cursor: 'pointer',
  '& svg *': {
    stroke: config.defaultColor,
    transition: 'stroke 0.2s ease'
  },
  '&:hover': {
    color: config.hoverColor,
    textDecoration: 'underline',
    textDecorationColor: config.hoverColor,
    '& svg *': {
      stroke: config.hoverColor
    }
  },
  '&:active': {
    color: config.activeColor,
    '& svg *': {
      stroke: config.activeColor
    }
  },
  '&[aria-disabled="true"]': {
    color: config.disabledColor,
    pointerEvents: 'none',
    cursor: 'not-allowed',
    textDecoration: 'none',
    '& svg *': {
      stroke: config.disabledColor
    }
  }
});

export const getCopyLinkStyles = (type: 'primary' | 'secondary' = 'primary') => {
  const colorConfig = getColorConfig(type);
  const stateStyles = getCopyLinkStates(colorConfig);

  return {
    ...commonCopyLinkBaseStyles,
    ...stateStyles
  };
};

export const getIconStroke = (type: 'primary' | 'secondary' = 'primary', disabled: boolean = false) => {
  if (disabled) {
    return 'blue.500';
  }
  if (type === 'secondary') {
    return 'blue.800';
  }
  return 'black';
};

export const getMobileDisabledStyles = () => ({
  color: 'blue.500',
  pointerEvents: 'none',
  cursor: 'not-allowed'
});

export const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    border: 'none',
    background: 'none',
    padding: 0,
    margin: 0,
    font: 'inherit',
    outline: 'none',
    maxWidth: '100%',
    textAlign: 'left'
  },

  iconWrapper: {
    transition: 'stroke 0.2s ease',
    flexShrink: 0
  }
};
