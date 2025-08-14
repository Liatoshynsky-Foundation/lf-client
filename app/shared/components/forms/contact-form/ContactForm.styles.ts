import { mainHexPallete } from '../../design-system/all-components/theme/colors';

export const styles = {
  wrapper: {
    width: '744px',
    backgroundColor: mainHexPallete.white,
    p: '90px 95.5px',
    clipPath: 'polygon(0 3%, 100% 0%, 100% 97%, 0% 100%)'
  },

  formTitle: {
    color: mainHexPallete.brown[900],
    textTransform: 'uppercase',
    lineHeight: '160%',
    mb: '8px'
  },

  formSubtitle: {
    color: mainHexPallete.brown[700],
    textIndent: '230px',
    mb: '24px'
  },

  formWarning: {
    lineHeight: '130%',
    color: mainHexPallete.brown[500],
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
      color: mainHexPallete.blue[800]
    }
  },

  textFieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
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
    mt: '15px'
  },

  requestButton: {
    width: '100%',
    mt: '27px'
  }
};
