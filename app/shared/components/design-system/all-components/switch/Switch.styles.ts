export const switchStyles = {
  '& .MuiSwitch-switchBase': {
    color: '#fcfcfc',
    '&.Mui-checked': {
      color: '#FCBD28',
      '& + .MuiSwitch-track': {
        backgroundColor: '#FCBD28'
      },
      '&:hover': {
        backgroundColor: '#fcbd280a'
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#fcbd284d'
      }
    },

    '&:hover': {
      backgroundColor: '#190d030a'
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#190d0314'
    },
    '&.Mui-disabled': {
      '& + .MuiSwitch-track': {
        backgroundColor: '#190d031f'
      }
    }
  }
};
