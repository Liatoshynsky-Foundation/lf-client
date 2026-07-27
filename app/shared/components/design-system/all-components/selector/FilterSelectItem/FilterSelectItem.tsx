import { Box, Checkbox, Typography } from '@mui/material';
import React from 'react';

import { styles } from './FilterSelectItem.styles';

export interface FilterSelectItemProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  sx?: object;
}

const FilterSelectItem = ({ label, selected = false, disabled = false, onClick, sx }: FilterSelectItemProps) => (
  <Box
    role="option"
    aria-selected={selected}
    aria-disabled={disabled || undefined}
    tabIndex={disabled ? -1 : 0}
    onClick={disabled ? undefined : onClick}
    onKeyDown={(e) => {
      if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    }}
    sx={{ ...styles.container, ...sx, cursor: disabled ? 'default' : 'pointer' }}
  >
    <Checkbox checked={selected} disabled={disabled} tabIndex={-1} disableRipple />
    <Typography variant="customMedium16">{label}</Typography>
  </Box>
);

export default FilterSelectItem;
