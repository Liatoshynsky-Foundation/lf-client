import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import { mainHexPallete, rgbButtonColors } from '~/ds-components/theme/colors';

export const CustomBorderTextField = styled(TextField)(({ theme }) => {
  const buttonLikeTransition =
    theme?.transitions?.create?.(['background-color', 'border-color', 'box-shadow', 'color', 'border-radius'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    }) ??
    'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, border-radius 0.3s ease';

  return {
    borderColor: `${mainHexPallete.black} !important`,
    '& .MuiOutlinedInput-root': {
      borderColor: `${mainHexPallete.black} !important`,
      transition: `${buttonLikeTransition}, width 0.6s ease`,
      '& fieldset': {
        borderColor: `${mainHexPallete.black} !important`
      },
      '&:hover fieldset': {
        borderColor: `${mainHexPallete.black} !important`
      },
      '&.Mui-focused fieldset': {
        borderColor: `${mainHexPallete.black} !important`
      }
    },
    '&.search-collapsed .MuiOutlinedInput-root:hover': {
      backgroundColor: rgbButtonColors.primaryOutlinedHoveredBackground,
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
