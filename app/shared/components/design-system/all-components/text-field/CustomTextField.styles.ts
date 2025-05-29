const black = '#190D03';
const blue700 = '#63666E';
const error = '#E63C14';
const yellow900 = '#673E0F';

export const standardStyles = {
  '& .MuiInput-root': {
    width: '385px',
    height: '46px',
    '&:before': {
      borderBottom: `1px solid ${black}`,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${black}`,
    },
    '&.Mui-focused:after': {
      borderBottom: `2px solid ${black}`,
    },
    '&.Mui-error:before': {
      borderBottom: `2px solid ${error}`,
    },
    '&.Mui-error:after': {
      borderBottom: `2px solid ${error}`,
    },
    '&.Mui-error:hover:before': {
      borderBottom: `2px solid ${error}`,
    },
    '&.Mui-error:hover:after': {
      borderBottom: `2px solid ${error}`,
    },
    '&.Mui-disabled:before': {
      borderBottom: `2px dotted ${blue700}`,
    },
    '&:after': {
      borderBottom: `1px solid ${black}`,
    },
  },
  '&.MuiFormControl-root.Mui-error': {
    borderBottom: `2px solid ${error}`,
  },

  '& .MuiInputLabel-root': {
    color: yellow900,
    '&.Mui-focused': {
      color: black,
    },
    '&.Mui-hover': {
      color: blue700,
    },
    '&.Mui-disabled': {
      color: blue700,
    },
    '&.Mui-error': {
      color: error,
    },
  },
  '& .MuiInputBase-input': {
    color: yellow900,
  },

  '& .Mui-disabled .MuiInputBase-input': {
    color: blue700,
  },

  '& .Mui-focused .MuiInputBase-input': {
    color: black,
  },

  '& .Mui-error .MuiInputBase-input': {
    color: black,
  },
};

export const outlinedStyles = {
  '& .MuiOutlinedInput-root': {
    width: '280px',
    height: '48px',
    borderRadius: '8px',
    padding: '0 16px',
    '& fieldset': {
      border: '1px solid rgba(13, 3, 61, 0.24)',
    },
    '&:hover fieldset': {
      border: '1px solid rgba(13, 3, 61, 0.5)',
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${black}`,
    },
    '&.Mui-disabled fieldset': {
      border: `1px solid ${blue700}`,
    },
    '&.Mui-error fieldset': {
      border: `1px solid ${error}`,
    },
  },
  '& .MuiInputLabel-root': {
    color: '#52545a',
    '&.Mui-focused': {
      color: black,
    },
    '&.Mui-hover': {
      color: blue700,
    },
    '&.Mui-disabled': {
      color: blue700,
    },
    '&.Mui-error': {
      color: error,
    },
  },
  '& .MuiOutlinedInput-input.Mui-disabled': {
    color: blue700,
    WebkitTextFillColor: blue700,
  },
};
