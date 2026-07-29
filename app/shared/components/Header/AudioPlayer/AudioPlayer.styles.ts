export const styles = {
  wrapper: {
    position: 'relative'
  },
  eqButton: {
    color: 'red.900',
    padding: '6px 8px',
    borderRadius: '20px',
    transition: 'background-color 0.2s ease',
    outline: 'none !important',

    '&:hover, &:focus, &:focus-visible': {
      backgroundColor: 'rgba(25, 13, 3, 0.08)',
      outline: 'none !important'
    }
  },
  icon: {
    width: 2,
    borderRadius: 1,
    backgroundColor: 'red.900'
  },
  iconStatic: {
    fontSize: 28
  },
  iconAnimated: {
    fontSize: 28,
    animation: 'equalizerAnim 1s infinite ease-in-out',
    '@keyframes equalizerAnim': {
      '0%': { transform: 'scaleY(1)' },
      '25%': { transform: 'scaleY(1.25)' },
      '50%': { transform: 'scaleY(0.8)' },
      '75%': { transform: 'scaleY(1.2)' },
      '100%': { transform: 'scaleY(1)' }
    }
  }
};
