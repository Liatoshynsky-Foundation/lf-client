const commonColors = {
  primary: '#FCBD28',
  primaryHover: 'rgba(0, 0, 0, 0.08)',
  secondary: '#FFA500',
  disabled: '#B2BEBE',
  valueLabelBackground: '#63666E',
};

const commonThumbSizes = {
  small: '12px',
  big: '20px',
};

const commonTrackRailHeights = {
  small: '4px',
  big: '6px',
};

export const sliderStyles = {
  base: {
    position: 'relative',
    width: '100%',
  },
  valueContainer: {
    position: 'relative',
    height: '25px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  valueLabel: {
    position: 'absolute',
    top: '0',
    transform: 'translateX(-50%)',
    fontSize: (size: 'small' | 'big') => (size === 'small' ? '10px' : '12px'),
    fontWeight: 'bold',
    background: commonColors.valueLabelBackground,
    color: '#fff',
    padding: '2px 6px',
    borderRadius: '4px',
    '&::after': {
      content: '',
      position: 'absolute',
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: `6px solid ${commonColors.valueLabelBackground}`,
    },
  },
  slider: {
    color: commonColors.primary,
    '& .MuiSlider-thumb': {
      width: (size: 'small' | 'big') => commonThumbSizes[size],
      height: (size: 'small' | 'big') => commonThumbSizes[size],
      backgroundColor: commonColors.primary,
      '&:hover': {
        boxShadow: `0px 0px 0px 8px ${commonColors.primaryHover}`,
      },
    },
    '& .MuiSlider-track': {
      height: (size: 'small' | 'big') => commonTrackRailHeights[size],
      backgroundColor: commonColors.primary,
    },
    '& .MuiSlider-rail': {
      height: (size: 'small' | 'big') => commonTrackRailHeights[size],
    },
    '& .MuiSlider-mark': {
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      backgroundColor: commonColors.primary,
      transform: 'translateX(-50%) translateY(-2px)',
    },
    '& .MuiSlider-markActive': {
      backgroundColor: commonColors.secondary,
    },
    '&.Mui-disabled .MuiSlider-thumb': {
      backgroundColor: commonColors.disabled,
    },
    '&.Mui-disabled .MuiSlider-track': {
      backgroundColor: commonColors.disabled,
    },
    '&.Mui-disabled .MuiSlider-rail': {
      backgroundColor: commonColors.disabled,
    },
    '&.Mui-disabled .MuiSlider-mark': {
      backgroundColor: commonColors.disabled,
    },
  },
  minMaxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  minMaxLabel: {
    fontSize: (size: 'small' | 'big') => (size === 'small' ? '12px' : '14px'),
  },
};
