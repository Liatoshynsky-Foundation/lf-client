import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = {
  buttonGroup: {
    backgroundColor: mainHexPallete.brown[50],
    p: '4px',

    width: { xs: '100%', sm: 'fit-content' },

    div: {
      p: '0px',
      m: '0px',
      width: { xs: '100%', sm: 'auto' },
      display: 'flex'
    },
    button: {
      width: { xs: 'auto', sm: '67px' },
      flex: { xs: 1, sm: 'unset' }
    },
    '& [aria-label="indicator"]': {
      height: 'calc(100% - 8px)',
      top: 4
    }
  },

  currencyBtn: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',

    '&, &:hover': {
      background: 'transparent',
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
    gap: { xs: '0px', sm: '25px' },
    flexWrap: { xs: 'wrap', sm: 'nowrap' }
  },

  iban: {
    display: 'flex',
    gap: '8px'
  },

  ibanText: {
    fontSize: '20px',
    whiteSpace: { xs: 'normal', sm: 'nowrap' },
    wordBreak: { xs: 'break-all', sm: 'normal' }
  }
};
