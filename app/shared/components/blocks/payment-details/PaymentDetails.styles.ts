import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  tabsScroller: {
    maxWidth: '100%',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  },

  buttonGroup: {
    backgroundColor: 'brown.50',
    p: '4px',
    height: '36px',
    width: 'fit-content',
    minWidth: { xs: '100%', sm: 'auto' },

    div: {
      p: '0px',
      m: '0px',
      display: 'flex',
      flex: { xs: 1, sm: 'unset' }
    },
    button: {
      minWidth: '67px',
      px: '12px',
      width: '100%',
      whiteSpace: 'nowrap'
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
    width: '100%',
    minWidth: 0
  }
};
