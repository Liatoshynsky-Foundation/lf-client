import { mainHexPallete } from '../../design-system/all-components/theme/colors';

export const styles = {
  buttonContainer: {
    width: '273px',
    height: '36px',
    backgroundColor: mainHexPallete.brown[50],
    borderRadius: '28px',
    p: '4px',

    '& .MuiToggleButton-root': {
      transition: 'background-color 420ms ease, color 420ms ease'
    },

    '& .MuiToggleButton-root.Mui-selected': {
      transition: 'background-color 420ms ease, color 420ms ease'
    }
  },

  currencyBtn: {
    width: '68px',
    height: '28px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '28px',

    '&:hover, &.MuiToggleButtonGroup-lastButton, &.MuiToggleButtonGroup-firstButton, &.MuiToggleButtonGroup-middleButton':
      {
        borderRadius: '28px'
      },

    '&[aria-pressed="true"], &[aria-pressed="true"]:hover': {
      borderRadius: '28px',
      backgroundColor: mainHexPallete.black,
      color: mainHexPallete.white
    }
  },

  paymentDetailsContainer: {
    mt: '48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '& h6.MuiTypography-root': {
      lineHeight: '150%',
      color: mainHexPallete.brown[500],
      width: '115px'
    },

    '& p.MuiTypography-root': {
      lineHeight: '150%'
    }
  },

  paymentDetailsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },

  iban: {
    borderRadius: '40px',
    p: '12px 15px 12px 24px',
    backgroundColor: mainHexPallete.brown[100],
    ml: '-24px'
  },

  copyIcon: {
    ml: '92px'
  }
};
