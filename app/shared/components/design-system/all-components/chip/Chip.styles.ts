import { mainHexPallete } from '../theme/colors';

export const ChipColors = {
  text: mainHexPallete.black,
  textDisabled: mainHexPallete.blue[700],

  bgFilledDefault: mainHexPallete.white,
  bgFilledHover: mainHexPallete.blue[50],
  bgFilledPressed: mainHexPallete.blue[100],
  bgFilledDisabled: mainHexPallete.blue[50],

  borderOutlined: mainHexPallete.black,
  borderDisabled: mainHexPallete.blue[700],

  bgOutlinedHovered: `${'#190D03'}14`,
  bgOutlinedPressed: `${'#190D03'}3D`
};

export const baseChipStyles = (variant: 'filled' | 'outlined') => {
  const isOutlined = variant === 'outlined';

  return {
    height: 28,
    CSSMathMaxWidth: 115,
    fontSize: '16px',
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: '100%',
    letterSpacing: '0%',
    padding: '0 8px',
    color: ChipColors.text,
    backgroundColor: isOutlined ? 'transparent' : ChipColors.bgFilledDefault,
    border: isOutlined ? `1px solid ${ChipColors.borderOutlined}` : 'none',

    alignItems: 'center',
    justifyContent: 'space-between',

    '&:hover': {
      backgroundColor: isOutlined ? ChipColors.bgOutlinedHovered : ChipColors.bgFilledHover
    },
    '&:active': {
      backgroundColor: isOutlined ? ChipColors.bgOutlinedPressed : ChipColors.bgFilledPressed
    },
    '&.Mui-disabled': {
      backgroundColor: isOutlined ? 'transparent' : ChipColors.bgFilledDisabled,
      color: ChipColors.textDisabled,
      border: isOutlined ? `1px solid ${ChipColors.borderDisabled}` : 'none'
    },
    '.MuiChip-deleteIcon': {
      width: 16,
      height: 16,
      cursor: 'pointer',
      opacity: 1,
      '&:hover': {
        opacity: 0.8
      },
      '&:active': {
        opacity: 0.6
      },
      '.Mui-disabled &': {
        opacity: 0.5,
        cursor: 'default'
      }
    }
  };
};
