import { SxProps, Theme } from '@mui/material';

export const sxToArray = (s?: SxProps<Theme>) => {
  if (!s) {
    return [];
  }

  if (Array.isArray(s)) {
    return s;
  }

  return [s];
};
