import { theme } from '../design-system/all-components/theme/Theme';

import { commonSx } from '~/shared/styles/commonSx';

export const styles = {
  buttonGroup: {
    position: 'fixed',
    bottom: '5%',
    left: '50%',
    transform: 'translate(-50%)',
    borderRadius: '48px',
    p: '4px',
    zIndex: theme.zIndex.stickyYearsTab,

    '& [aria-label="indicator"]': {
      ...commonSx.layout.activeTabIndicator
    }
  },
  yearButton: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',

    '&, &:hover': {
      background: 'transparent'
    }
  }
};
