export const styles = {
  wrapper: {
    position: 'relative'
  },
  equalizer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: { xs: '2.5px', sm: '4px' },
    width: { xs: '22px', sm: '32px' },
    height: { xs: '18px', sm: '30px' },
    '& > div': {
      transform: { xs: 'scaleY(0.7)', sm: 'scaleY(1)' }
    }
  },
  eqButton: {
    color: 'black',
    width: { xs: '40px', sm: 'auto' },
    height: { xs: '40px', sm: 'auto' },
    padding: { xs: 0, sm: '6px 8px' },
    borderRadius: '20px',
    transition: 'background-color 0.2s ease',
    outline: 'none',

    '&:hover, &:focus-visible': {
      backgroundColor: 'rgba(25, 13, 3, 0.08)',
      outline: 'none'
    }
  },
  icon: {
    width: '2px',
    borderRadius: '1px',
    backgroundColor: 'black'
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
