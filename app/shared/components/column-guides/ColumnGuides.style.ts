import { SxProps, Theme } from '@mui/material';

export const containerSx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  height: '100%',
  display: 'grid',
  pointerEvents: 'none',
  zIndex: 0
};

export const lineSx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '1px',
  backgroundColor: 'rgba(239, 233, 224, 1)'
};

export const dynamicLineBaseSx = {
  position: 'absolute',
  width: '1px',
  zIndex: 0
};
