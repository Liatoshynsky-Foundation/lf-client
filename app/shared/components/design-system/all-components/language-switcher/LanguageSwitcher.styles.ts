import { alpha, SxProps, Theme } from '@mui/material/styles';

export const styles = {
  menuItem: {
    minWidth: '153px',
    minHeight: '36px'
  },
  dropdownMenu: {
    minHeight: '88px',
    padding: '8px 0'
  },
  item: (isActive: boolean): SxProps<Theme> => {
    return ((theme: Theme) => ({
      fontFamily: 'Mulish, sans-serif',
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '145%',
      color: isActive ? 'black' : alpha(theme.palette.brown?.[800] || '#412B21', 0.6),
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '2px',
      outline: 'none',
      '&:focus-visible': {
        outline: '2px solid #631B2B',
        outlineOffset: '2px'
      }
    })) as SxProps<Theme>;
  },
  mobileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    height: '40px'
  }
};
