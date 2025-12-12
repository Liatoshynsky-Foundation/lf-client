import { mainHexPallete } from '~/ds-components/theme/colors';

const commonCopyLinkBaseStyles = {
  fontFamily: 'Mulish, Sans-serif',
  transition: 'color 0.2s ease',
  lineHeight: '110%',
  textDecoration: 'none'
};

interface ColorConfig {
  defaultColor: string;
  hoverColor: string;
  activeColor: string;
  disabledColor: string;
}

const getColorConfig = (type: 'primary' | 'secondary', palette = mainHexPallete): ColorConfig => {
  if (type === 'primary') {
    return {
      defaultColor: palette.black,
      hoverColor: palette.burgundy[800],
      activeColor: palette.black,
      disabledColor: palette.blue[500]
    };
  }

  return {
    defaultColor: palette.blue[800],
    hoverColor: palette.black,
    activeColor: palette.blue[800],
    disabledColor: palette.blue[500]
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

export const getIconStroke = (
  type: 'primary' | 'secondary' = 'primary',
  disabled: boolean = false,
  palette = mainHexPallete
) => {
  if (disabled) {
    return palette.blue[500];
  }
  if (type === 'secondary') {
    return palette.blue[800];
  }
  return palette.black;
};

export const getMobileDisabledStyles = (palette = mainHexPallete) => ({
  color: palette.blue[500],
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
    outline: 'none'
  },

  iconWrapper: {
    transition: 'stroke 0.2s ease'
  }
};
