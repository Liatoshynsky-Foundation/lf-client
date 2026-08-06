export const styles = {
  formWarning: {
    lineHeight: '130%',
    color: 'brown.500',
    fontStyle: 'unset',
    mb: '16px'
  },

  textArea: {
    '& .MuiInputBase-root': {
      height: '112px',
      p: '12px 16px'
    }
  },

  input: {
    width: '100%',
    '&::placeholder': {
      color: 'blue.800'
    }
  },

  textFieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '& .MuiInputLabel-root[data-shrink="false"]': {
      transform: 'translate(14px, 12px) scale(1)',
      color: 'blue.800'
    },
    '& .MuiFormHelperText-root': {
      ml: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      fontStyle: 'unset',
      '&.Mui-error::before': {
        content: '""',
        display: 'inline-block',
        width: 12,
        height: 12,
        background: 'no-repeat center / contain url("/icons/info-error.svg")'
      }
    }
  },

  confidentialPolicyContainer: {
    display: 'flex',
    alignItems: 'center',
    pl: '12px',
    mt: '24px',

    a: {
      textDecoration: 'underline'
    }
  },

  confidentialPolicyText: {
    lineHeight: '130%',
    fontStyle: 'unset',
    mt: { xs: '8px' }
  },

  requestButton: {
    width: '100%',
    mt: '16px'
  },

  checkboxError: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontStyle: 'unset'
  }
};
