export const styles = {
  button: {
    lineHeight: '140%',
    width: '100%',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'red.600',
    paddingRight: '14px',
    paddingLeft: '14px',

    '& svg path, & svg circle, & svg line, & svg rect': {
      stroke: 'currentColor'
    },

    '&:hover': {
      backgroundColor: 'red.50'
    },

    '&:focus-visible': {
      color: 'red.700'
    },

    '&:active': {
      color: 'red.700'
    }
  }
};
