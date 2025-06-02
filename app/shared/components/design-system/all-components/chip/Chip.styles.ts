export const ChipColors = {
  text: '#190D03',
  bgFilledDefault: '#FCFCFC',
  bgFilledHover: '#EFE9E0',
  bgFilledPressed: '#C6B6A9',
  bgFilledDisabled: '#F7F8FC',
  textDisabled: '#63666E',
  borderOutlined: '#190D03',
  bgOutlinedHovered: '#190D0314',
  bgOutlinedPressed: '#190D033D',
  borderDisabled: '#D9D9D9'
};

export const baseChipStyles = (variant: 'filled' | 'outlined') => {
  const isOutlined = variant === 'outlined';

  return {
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'inherit',
    color: ChipColors.text,
    backgroundColor: isOutlined ? 'transparent' : ChipColors.bgFilledDefault,
    border: isOutlined ? `1px solid ${ChipColors.borderOutlined}` : 'none',

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
