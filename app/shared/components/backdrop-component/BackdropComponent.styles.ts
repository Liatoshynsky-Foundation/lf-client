import { alpha, SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: (theme) => alpha(theme.palette.common.black, 0.25),
  backdropFilter: 'blur(4px)'
};
