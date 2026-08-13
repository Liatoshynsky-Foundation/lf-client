import { alpha, Theme } from '@mui/material/styles';

export const styles = {
  iconButton: (theme: Theme) => ({
    backgroundColor: alpha(theme.palette.common.black, 0.8),
    color: 'white',
    borderRadius: '50%',
    width: 64,
    height: 64,
    '&:hover': {
      backgroundColor: 'black'
    },
    '&:active': {
      backgroundColor: 'black'
    }
  })
};
