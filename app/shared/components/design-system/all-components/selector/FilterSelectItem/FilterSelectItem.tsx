import { Box, Checkbox, MenuItemProps, Typography } from '@mui/material';
import React from 'react';

import { styles } from './FilterSelectItem.styles';

export interface FilterSelectItemProps extends MenuItemProps {
  label: string;
  onClick?: () => void;
}

const FilterSelectItem = ({ label, onClick, sx, selected, disabled }: FilterSelectItemProps) => {
  return (
    <Box onClick={onClick} sx={{ ...sx, ...styles.container }}>
      <Checkbox checked={selected} onChange={onClick} disabled={disabled} />
      <Typography variant="customMedium16">{label}</Typography>
    </Box>
  );
};

export default FilterSelectItem;
