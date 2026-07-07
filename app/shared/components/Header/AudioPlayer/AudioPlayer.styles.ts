export const styles = {
  wrapper: {
    position: 'relative'
  },
  eqButton: {
    color: 'red.900'
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
