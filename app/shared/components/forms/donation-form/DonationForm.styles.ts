import { rgbaTextFieldColors } from '../../design-system/all-components/theme/colors';
import { mulish } from '../../design-system/all-components/theme/Theme';

export const style = {
  paper: {
    backgroundColor: 'brown.100',
    width: { xs: '100vw', sm: '490px' },
    height: '100%',
    borderLeft: '4px solid',
    borderColor: 'yellow.500',
    gridColumn: '1/-1',
    ml: { xs: '-24px', sm: 0 },
    mt: { sm: '40px' }
  },
  paperChildren: {
    padding: { xs: '42px 23px', sm: '54px 43px' },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '6rem', sm: '64px' }
  },
  btnGroup: {
    overflow: { xs: 'hidden', sm: 'visible' },
    margin: '32px 0 40px 0',
    justifySelf: 'center',
    width: '100%',
    justifyContent: 'space-between',
    '& .MuiBox-root': {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '& .MuiButtonBase-root': {
      display: 'flex',
      width: '100%'
    }
  },
  btnGroupText: {
    fontSize: { xs: '14px', sm: '18px' }
  },
  sumInputs: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    borderBottom: '1px dashed black',
    transition: 'border-color 0.3s ease'
  },
  errorBorder: {
    borderBottom: `1px dashed ${rgbaTextFieldColors.errorBorderBottom}`
  },
  moneyInput: {
    verticalAlign: 'bottom',
    fontSize: { xs: '56px', sm: '72px' },
    fontWeight: 600,
    lineHeight: '90%',
    letterSpacing: '0px',
    color: 'brown.700',
    fontFamily: mulish.style.fontFamily,
    maxHeight: { xs: '66px', sm: '81px' },
    pb: '15px',
    '& input[type=number]': {
      MozAppearance: 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    },
    '& input::placeholder': {
      color: 'brown.700',
      opacity: 1
    }
  },
  moneyInputError: {
    color: rgbaTextFieldColors.errorBorderBottom,
    '& input::placeholder': {
      color: rgbaTextFieldColors.errorBorderBottom,
      opacity: 1
    }
  },
  currencyInput: {
    minWidth: '90px',
    marginBottom: '16px',
    '& .MuiSelect-select': {
      paddingBottom: '0px'
    },
    '& .MuiSelect-select .MuiTypography-root': {
      fontWeight: 700,
      WebkitTextFillColor: 'black',
      lineHeight: 2
    }
  },
  currencySuggestion: {
    alignSelf: 'center',
    color: 'brown.600',
    fontSize: '16px',
    fontWeight: 400
  },
  currencySuggestionBtns: {
    display: 'flex',
    flexGrow: 1,
    gap: '8px'
  },
  addBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px'
  },
  turnstileWidget: {
    display: 'flex',
    justifyContent: 'center'
  },
  headerTexts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '3rem', sm: '40px' }
  },
  amountSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }
};
