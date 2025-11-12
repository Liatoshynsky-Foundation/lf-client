import { AppTypography } from '~/constants';

export const styles = {
  container: {
    maxHeight: '50vh',
    overflowY: 'auto'
  },
  typography: {
    ...AppTypography.mulish20Regular,
    mb: '24px',
    fontSize: {
      xs: '16px',
      sm: '16px'
    }
  }
};
