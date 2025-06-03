const black = '#190D03';
const blue600 = '#898C95';
const blue700 = '#63666E';
const blue800 = '#52545A';
const error = '#E63C14';

export const standardStyles = {
  '& .MuiInput-root': {
    width: '385px',
    height: '46px',
    '&:before': {
      borderBottom: '1px solid rgba(13, 3, 61, 0.25)',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid rgba(13, 3, 61, 0.5)',
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
    '&.Mui-disabled:before': {
      borderBottom: `1px solid ${blue600}`,
    },
    '&:not(.Mui-focused):not(.Mui-error):after': {
      borderBottom: `1px solid ${black}`,
    },
  },

  '& .MuiInputLabel-root': {
    color: black,
  },

  '& .MuiInputBase-input': {
    color: blue800,
    WebkitTextFillColor: blue800,
  },

  '& .Mui-disabled .MuiInputBase-input': {
    color: blue600,
    WebkitTextFillColor: blue600,
  },

  '& .Mui-focused .MuiInputBase-input': {
    color: black,
    WebkitTextFillColor: black,
  },

  '& .Mui-error .MuiInputBase-input': {
    color: black,
    WebkitTextFillColor: black,
  },
};

export const outlinedStyles = {
  '& .MuiOutlinedInput-root': {
    width: '280px',
    height: '48px',
    borderRadius: '8px',
    padding: '0 16px',
    '& fieldset': {
      border: '1px solid rgba(13, 3, 61, 0.25)',
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
    color: blue800,
    WebkitTextFillColor: blue800,
    '&:not(.Mui-disabled):hover': {
      color: blue700,
      WebkitTextFillColor: blue700,
    },
    '&.Mui-focused': {
      color: black,
      WebkitTextFillColor: black,
    },
    '&.Mui-disabled': {
      color: blue700,
      WebkitTextFillColor: blue700,
    },
    '&.Mui-error': {
      color: error,
      WebkitTextFillColor: error,
    },
  },
  '& .MuiOutlinedInput-input.Mui-disabled': {
    color: blue700,
    WebkitTextFillColor: blue700,
  },
};
