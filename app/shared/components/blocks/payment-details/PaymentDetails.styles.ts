import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  buttonGroup: {
    backgroundColor: 'brown.50',
    p: '4px',
    height: '36px',
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
      ...commonSx.layout.activeTabIndicator
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
    width: '100%',

    '& h6.MuiTypography-root': {
      lineHeight: '150%',
      color: 'brown.500',
      width: { xs: '100%', sm: '115px' },
      flexShrink: 0
    },

    '& p.MuiTypography-root': {
      lineHeight: '150%',
      width: '100%'
    }
  },

  paymentDetailsRow: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'flex-start',
    alignItems: { xs: 'flex-start', sm: 'flex-start' },
    gap: { xs: '4px', sm: '24px' },
    width: '100%',
    py: '4px'
  },

  iban: {
    gap: '8px',
    alignItems: { xs: 'flex-start', sm: 'center' }
  },

  ibanIcon: {
    mt: { xs: '4px', sm: '0' }
  },

  ibanText: {
    fontSize: '20px',
    whiteSpace: { xs: 'normal', sm: 'nowrap' },
    wordBreak: { xs: 'break-all', sm: 'normal' }
  }
};
