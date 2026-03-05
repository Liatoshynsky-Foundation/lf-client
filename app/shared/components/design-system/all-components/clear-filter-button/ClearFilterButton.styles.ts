import { mainHexPallete, rgbaClearFilterButton } from '~/ds-components/theme/colors';

export const styles = {
  button: {
    lineHeight: '140%',
    width: '100%',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    color: rgbaClearFilterButton.defaultTextColor,
    paddingRight: '14px',
    paddingLeft: '14px',

    '& svg path, & svg circle, & svg line, & svg rect': {
      stroke: 'currentColor'
    },

    '&:hover': {
      backgroundColor: mainHexPallete.red[50]
    },

    '&:focus-visible': {
      color: mainHexPallete.red[700]
    },

    '&:active': {
      color: mainHexPallete.red[700]
    }
  }
};
