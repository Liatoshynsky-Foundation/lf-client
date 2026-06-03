import { theme } from '../design-system/all-components/theme/Theme';

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
      height: 'calc(100% - 8px)',
      top: 4
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
