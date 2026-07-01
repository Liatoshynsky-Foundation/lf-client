const commonThumbSizes = {
  small: '12px',
  big: '20px'
};

const commonTrackRailHeights = {
  small: '2px',
  big: '4px'
};

export const sliderStyles = {
  base: {
    position: 'relative',
    width: '100%'
  },
  valueContainer: {
    position: 'relative',
    height: '25px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  valueLabel: {
    position: 'absolute',
    top: '0',
    transform: 'translateX(-50%)',
    fontSize: (size: 'small' | 'big') => (size === 'small' ? '10px' : '14px'),
    fontWeight: 'bold',
    backgroundColor: 'blue.700',
    color: 'background.default',
    padding: '2px 6px',
    borderRadius: '4px',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '6px solid',
      borderTopColor: 'blue.700'
    }
  },
  slider: {
    color: 'tertiary.main',
    '& .MuiSlider-thumb': {
      width: (size: 'small' | 'big') => commonThumbSizes[size],
      height: (size: 'small' | 'big') => commonThumbSizes[size],
      backgroundColor: 'tertiary.main',
      '&:hover': {
        boxShadow: '0px 0px 0px 8px rgba(25, 13, 3, 0.08)'
      }
    },
    '& .MuiSlider-track': {
      height: (size: 'small' | 'big') => commonTrackRailHeights[size],
      backgroundColor: 'tertiary.main'
    },
    '& .MuiSlider-rail': {
      height: (size: 'small' | 'big') => commonTrackRailHeights[size]
    },
    '& .MuiSlider-mark': {
      width: '2px',
      height: '2px',
      borderRadius: '50%',
      backgroundColor: 'tertiary.main'
    },
    '& .MuiSlider-markActive': {
      backgroundColor: 'yellow.600'
    },
    '&.Mui-disabled .MuiSlider-thumb': {
      backgroundColor: 'text.disabled'
    },
    '&.Mui-disabled .MuiSlider-track': {
      backgroundColor: 'text.disabled'
    },
    '&.Mui-disabled .MuiSlider-rail': {
      backgroundColor: 'text.disabled'
    },
    '&.Mui-disabled .MuiSlider-mark': {
      backgroundColor: 'text.disabled'
    }
  },
  minMaxContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  minMaxLabel: {
    fontSize: (size: 'small' | 'big') => (size === 'small' ? '12px' : '14px')
  }
};
