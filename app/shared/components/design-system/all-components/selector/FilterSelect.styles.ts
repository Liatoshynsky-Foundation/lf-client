import { SxProps } from '@mui/material';

export const FilterSelectColors = {
  text: '#190D03',
  bgFilledDefault: '#D9DCE8',
  bgFilledDisabled: '#F7F8FC',
  textDisabled: '#63666E',
  borderOutlined: '#190D03',
  borderDisabled: '#D9D9D9'
};

function getBackgroundColor(variant: 'filled' | 'outlined', disabled: boolean): string {
  if (disabled) return FilterSelectColors.bgFilledDisabled;
  if (variant === 'outlined') return 'transparent';
  return FilterSelectColors.bgFilledDefault;
}

function getBorder(variant: 'filled' | 'outlined', disabled: boolean): string {
  if (variant !== 'outlined') return 'none';
  const borderColor = disabled ? FilterSelectColors.borderDisabled : FilterSelectColors.borderOutlined;
  return `1px solid ${borderColor}`;
}

export const filterSelectStyles = {
  root: (variant: 'filled' | 'outlined', disabled: boolean): SxProps => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      borderRadius: '8px',
      padding: '6px 8px 6px 16px',
      backgroundColor: getBackgroundColor(variant, disabled),
      border: getBorder(variant, disabled),
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s',

      fontFamily: 'Mulish',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0%'
    };
  },

  label: (disabled: boolean): SxProps => ({
    fontFamily: 'Mulish',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0%',
    color: disabled ? FilterSelectColors.textDisabled : FilterSelectColors.text
  }),

  chipContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  chipList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    flex: 1
  },

  placeholderChip: {
    pointerEvents: 'none',
    opacity: 0.7,
    flex: 1
  },

  dropdownIcon: (disabled: boolean): SxProps => ({
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1
  }),

  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    fontFamily: 'Mulish',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0%'
  }
};
