'use client';

import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { Chip } from '~/ds-components/chip/Chip';
import DropdownMenu from '~/ds-components/dropdown-menu/DropdownMenu';
import FilterSelectItem from '~/ds-components/selector/FilterSelectItem/FilterSelectItem';

import ClearFilterButton from '../clear-filter-button/ClearFilterButton';
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
  defaultValues,
  variant = 'filled',
  disabled = false,
  maxSelections,
  onAdd,
  onRemove
}) => {
  const t = useTranslations('filtering');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>(() => defaultValues ?? []);
  const menuAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedValues(defaultValues ?? []);
  }, [defaultValues]);

  const handleToggleMenu = () => {
    if (!disabled && menuAnchorRef.current) {
      setAnchorEl(menuAnchorRef.current);
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

  const menuList = (
    <Box>
      <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled = !isSelected && isMaxReached;

          return (
            <FilterSelectItem
              label={option.label}
              key={option.value}
              onClick={() => !isDisabled && handleOptionClick(option)}
              selected={isSelected}
              disabled={isDisabled}
              sx={filterSelectStyles.menuItem}
            />
          );
        })}
      </Box>
      <Divider sx={{ my: 1 }} />
      <ClearFilterButton onClick={handleChipDelete}>{t('clear')}</ClearFilterButton>
    </Box>
  );

  return (
    <Box>
      <Box ref={menuAnchorRef} sx={filterSelectStyles.root(variant, disabled)} onClick={handleToggleMenu}>
        <Typography sx={filterSelectStyles.label(disabled)}>{label}</Typography>
        <Box sx={filterSelectStyles.chipContainer}>
          {selectedOptionsCount > 0 && (
            <Chip
              label={`${selectedOptionsCount} ${t('selected')}`}
              variant={variant}
              disabled={disabled}
              onDelete={handleChipDelete}
              size="small"
            />
          )}
          <Box sx={filterSelectStyles.dropdownIcon(disabled)}>
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
    </Box>
  );
};
