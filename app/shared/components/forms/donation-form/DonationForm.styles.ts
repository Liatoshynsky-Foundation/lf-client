import { mainHexPallete, rgbaTextFieldColors } from '../../design-system/all-components/theme/colors';
import { mulish } from '../../design-system/all-components/theme/Theme';

export const style = {
  paper: {
    background: mainHexPallete.brown[100],
    width: '490px',
    borderLeft: `4px solid ${mainHexPallete.yellow[500]}`,
    gridColumn: '1/-1'
  },
  paperChildren: {
    padding: '42px 60px'
  },
  btnGroup: {
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
  sumInputs: {
    margin: '10px',
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
    fontSize: '72px',
    fontWeight: 600,
    lineHeight: '90%',
    letterSpacing: '0px',
    color: mainHexPallete.brown[700],
    fontFamily: mulish.style.fontFamily,
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
    }
  },
  moneyInputError: {
    color: rgbaTextFieldColors.errorBorderBottom
  },
  currencyInput: {
    minWidth: '90px',
    verticalAlign: 'bottom',
    marginBottom: '16px'
  },
  currencySuggestion: {
    alignSelf: 'stretch',
    color: mainHexPallete.brown[600]
  },
  addBtns: {
    display: 'flex',
    gap: '8px',
    margin: '32px 0'
  }
};
