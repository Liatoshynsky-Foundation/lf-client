export const styles = {
  wrapper: {
    position: 'relative',
  },
  eqButton: {
    color: '#5F0E0F',
    p: 1,
  },
  icon: {
    width: 3,
    borderRadius: 1,
    backgroundColor: '#5F0E0F',
  },
  iconStatic: {
    fontSize: 28,
  },
  iconAnimated: {
    fontSize: 28,
    animation: 'equalizerAnim 1s infinite ease-in-out',
    '@keyframes equalizerAnim': {
      '0%': { transform: 'scaleY(1)' },
      '25%': { transform: 'scaleY(1.25)' },
      '50%': { transform: 'scaleY(0.8)' },
      '75%': { transform: 'scaleY(1.2)' },
      '100%': { transform: 'scaleY(1)' },
    },
  },
};
