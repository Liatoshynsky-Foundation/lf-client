'use client';

import { Box, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { Chip } from '../chip/Chip';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import { filterSelectStyles } from './FilterSelect.styles';
import { PositionEnum } from '~/types/enums/common.enums';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  defaultValues?: string[];
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  maxSelections?: number;
  onAdd?: (value: string, label: string, allSelected: string[]) => void;
  onRemove?: (value: string, label: string, allSelected: string[]) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  defaultValues = [],
  variant = 'filled',
  disabled = false,
  maxSelections,
  onAdd,
  onRemove
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const defaultValuesKey = JSON.stringify(defaultValues);

  useEffect(() => {
    setSelectedValues(defaultValues);
  }, [defaultValuesKey]);

  const handleToggleMenu = () => {
    if (!disabled && iconRef.current) {
      setAnchorEl(iconRef.current);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: FilterOption) => {
    const isSelected = selectedValues.includes(option.value);
    let newValues: string[];

    if (isSelected) {
      newValues = selectedValues.filter((val) => val !== option.value);
      onRemove?.(option.value, option.label, newValues);
    } else if (!maxSelections || selectedValues.length < maxSelections) {
      newValues = [...selectedValues, option.value];
      onAdd?.(option.value, option.label, newValues);
    } else {
      return;
    }

    setSelectedValues(newValues);
  };

  const handleChipDelete = () => {
    setSelectedValues([]);
    onRemove?.('', '', []);
  };

  const selectedOptionsCount = selectedValues.length;
  const isMaxReached = maxSelections ? selectedValues.length >= maxSelections : false;

  const menuList = options.map((option) => {
    const isSelected = selectedValues.includes(option.value);
    const isDisabled = !isSelected && isMaxReached;

    return (
      <MenuItem
        key={option.value}
        onClick={() => !isDisabled && handleOptionClick(option)}
        selected={isSelected}
        disabled={isDisabled}
        sx={filterSelectStyles.menuItem}
      >
        <span>{option.label}</span>
      </MenuItem>
    );
  });

  return (
    <>
      <Box sx={filterSelectStyles.root(variant, disabled)} onClick={handleToggleMenu}>
        <Typography sx={filterSelectStyles.label(disabled)}>{label}</Typography>
        <Box sx={filterSelectStyles.chipContainer}>
          {selectedOptionsCount > 0 && (
            <Chip
              label={`${selectedOptionsCount} обрано`}
              variant={variant}
              disabled={disabled}
              onDelete={handleChipDelete}
              size="small"
            />
          )}
          <Box ref={iconRef} sx={filterSelectStyles.dropdownIcon(disabled)}>
            <Image src="/icons/chevron-down.svg" alt="dropdown" width={16} height={16} />
          </Box>
        </Box>
      </Box>

      <DropdownMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: PositionEnum.Bottom,
          horizontal: PositionEnum.Center
        }}
        transformOrigin={{
          vertical: PositionEnum.Top,
          horizontal: PositionEnum.Center
        }}
        maxHeight={300}
        menuList={menuList}
      />
    </>
  );
};
