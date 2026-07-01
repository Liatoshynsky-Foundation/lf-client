import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const CustomBorderTextField = styled(TextField)(({ theme }) => {
  const buttonLikeTransition =
    theme?.transitions?.create?.(['background-color', 'border-color', 'box-shadow', 'color', 'border-radius'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    }) ??
    'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, border-radius 0.3s ease';

  return {
    borderColor: `${theme.palette.primary.main} !important`,
    '& .MuiOutlinedInput-root': {
      borderColor: `${theme.palette.primary.main} !important`,
      transition: `${buttonLikeTransition}, width 0.6s ease`,
      '& fieldset': {
        borderColor: `${theme.palette.primary.main} !important`
      },
      '&:hover fieldset': {
        borderColor: `${theme.palette.primary.main} !important`
      },
      '&.Mui-focused fieldset': {
        borderColor: `${theme.palette.primary.main} !important`
      }
    },
    '&.search-collapsed .MuiOutlinedInput-root:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      cursor: 'pointer'
    }
  };
});

export const SearchStyles = {
  icon: {
    padding: 8,
    height: 40,
    overflow: 'hidden'
  },
  list: {
    width: '280px'
  },
  listbox: {
    padding: 0,
    margin: 0,
    overflow: 'hidden',
    maxHeight: 'none'
  }
};

export const iconStyles = {
  height: '24px',
  cursor: 'pointer'
};
