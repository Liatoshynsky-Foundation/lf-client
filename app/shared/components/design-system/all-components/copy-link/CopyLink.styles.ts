import { mainHexPallete } from '~/ds-components/theme/colors';

const commonCopyLinkBaseStyles = {
  fontFamily: 'Mulish, Sans-serif',
  transition: 'color 0.2s ease',
  lineHeight: '110%',
  textDecoration: 'none'
};

const getPrimaryCopyLinkStates = (palette = mainHexPallete) => ({
  color: palette.black,
  cursor: 'pointer',
  '& svg *': {
    stroke: palette.black,
    transition: 'stroke 0.2s ease'
  },
  '&:hover': {
    color: palette.burgundy[800],
    textDecoration: 'underline',
    textDecorationColor: palette.burgundy[800],
    '& svg *': {
      stroke: palette.burgundy[800]
    }
  },

  '&:active': {
    color: palette.black,
    '& svg *': {
      stroke: palette.black
    }
  },

  '&[aria-disabled="true"]': {
    color: palette.blue[500],
    pointerEvents: 'none',
    cursor: 'not-allowed',
    textDecoration: 'none',
    '& svg *': {
      stroke: palette.blue[500]
    }
  }
});

const getSecondaryCopyLinkStates = (palette = mainHexPallete) => ({
  color: palette.blue[800],
  cursor: 'pointer',
  '& svg *': {
    stroke: palette.blue[800],
    transition: 'stroke 0.2s ease'
  },
  '&:hover': {
    color: palette.black,
    textDecoration: 'underline',
    textDecorationColor: palette.black,
    '& svg *': {
      stroke: palette.black
    }
  },

  '&:active': {
    color: palette.blue[800],
    '& svg *': {
      stroke: palette.blue[800]
    }
  },

  '&[aria-disabled="true"]': {
    color: palette.blue[500],
    pointerEvents: 'none',
    cursor: 'not-allowed',
    textDecoration: 'none',
    '& svg *': {
      stroke: palette.blue[500]
    }
  }
});

export const getCopyLinkStyles = (type: 'primary' | 'secondary' = 'primary') => {
  const stateStyles = type === 'primary' ? getPrimaryCopyLinkStates() : getSecondaryCopyLinkStates();

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

export const getMobileLinkStyles = () => ({
  padding: '8px 0',
  margin: '-8px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center'
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
