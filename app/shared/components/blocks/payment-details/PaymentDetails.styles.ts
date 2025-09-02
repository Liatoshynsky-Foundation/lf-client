import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  buttonGroup: {
    backgroundColor: mainHexPallete.brown[50],
    p: '4px',

    div: {
      p: '0px',
      m: '0px'
    },

    button: {
      width: '67px'
    },

    '& [aria-label="indicator"]': {
      width: '66px'
    }
  },

  currencyBtn: {
    width: '68px',
    height: '28px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',

    '&, &:hover': {
      borderRadius: '28px'
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
