import styled from '@emotion/styled';
import { TextField } from '@mui/material';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const CustomBorderTextField = styled(TextField)(() => ({
  borderColor: `${mainHexPallete.black} !important`,
  '& .MuiOutlinedInput-root': {
    borderColor: `${mainHexPallete.black} !important`,
    '& fieldset': {
      borderColor: `${mainHexPallete.black} !important`
    },
    '&:hover fieldset': {
      borderColor: `${mainHexPallete.black} !important`
    },
    '&.Mui-focused fieldset': {
      borderColor: `${mainHexPallete.black} !important`
    }
  }
}));

export const MusicSearchStyles = {
  icon: {
    padding: 8,
    height: 40,
    transition: 'width 0.6s ease',
    overflow: 'hidden'
  },
  list: {
    width: '280px'
  }
};
