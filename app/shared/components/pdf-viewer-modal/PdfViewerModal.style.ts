import { alpha, SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  backdrop: {
    backgroundColor: (theme) => alpha(theme.palette.common.black, 0.7)
  },

  paper: {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    maxHeight: 'none',
    margin: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },

  container: {
    width: '100vw',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 25px',
    overflow: 'hidden'
  },

  header: {
    position: 'relative',
    width: '100%',
    padding: '25px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  headerBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '17px'
  },

  closeButton: {
    backgroundColor: 'transparent'
  },

  caption: {
    fontFamily: 'Mulish',
    fontSize: '16px',
    color: '#ffffff'
  }
};
